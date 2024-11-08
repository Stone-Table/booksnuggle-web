import { NextApiRequest, NextApiResponse } from 'next';
import { Storage } from '@google-cloud/storage';
import formidable from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false, // Disable built-in parser for formidable
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const form = formidable();
    const [fields, files] = await new Promise<[formidable.Fields, formidable.Files]>((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve([fields, files]);
      });
    });

    // Type assertion and validation
    const uploadedFile = files.file?.[0];
    if (!uploadedFile) {
      return res.status(400).json({ error: 'No file provided' });
    }

    const { bucket: bucketName, serviceAccount, key } = fields;
    if (!bucketName || !serviceAccount || !key) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Validate service account key
    if (key[0] !== process.env.SERVICE_ROLE_KEY) {
      return res.status(401).json({ error: 'Invalid service account key' });
    }

    const storage = new Storage({
      projectId: process.env.GCP_PROJECT_ID,
      keyFilename: process.env.GCP_KEY_FILE_PATH,
    });

    const bucket = storage.bucket(bucketName[0]);
    const blob = bucket.file(uploadedFile.originalFilename || 'unnamed');
    const blobStream = blob.createWriteStream({
      resumable: false,
      metadata: {
        contentType: uploadedFile.mimetype || 'application/pdf'
      }
    });

    // Create read stream from temp file
    const fileStream = fs.createReadStream(uploadedFile.filepath);

    await new Promise((resolve, reject) => {
      fileStream.pipe(blobStream)
        .on('error', reject)
        .on('finish', resolve);
    });

    // Clean up temp file
    await fs.promises.unlink(uploadedFile.filepath);

    return res.status(200).json({ 
      message: 'File uploaded successfully',
      filename: uploadedFile.originalFilename
    });

  } catch (error) {
    console.error('Error uploading file:', error);
    return res.status(500).json({ 
      error: 'Failed to upload file',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}