import { IncomingForm, Fields, Files } from 'formidable';
import { Storage } from '@google-cloud/storage';
import type { NextApiRequest, NextApiResponse } from 'next';
import * as fs from 'fs';

// Disable body parsing for file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

// Skip API route for static builds
let handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>;
if (process.env.GITHUB_PAGES === 'true') {
  handler = async function(req: NextApiRequest, res: NextApiResponse) {
    return res.status(404).json({ error: 'API routes not available in static export' });
  }
} else {
  handler = async function(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
      const form = new IncomingForm();
      const [fields, files] = await new Promise<[Fields, Files]>((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          if (err) reject(err);
          resolve([fields, files]);
        });
      });

      const uploadedFile = Array.isArray(files.file) ? files.file[0] : files.file;
      if (!uploadedFile) {
        return res.status(400).json({ error: 'No file provided' });
      }

      const { bucket: bucketName } = fields;
      if (!bucketName) {
        return res.status(400).json({ error: 'Missing bucket name' });
      }

      // Initialize storage with credentials
      const storage = new Storage({
        projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
        credentials: {
          client_email: process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
          private_key: process.env.GOOGLE_CLOUD_PRIVATE_KEY?.replace(/\\n/g, '\n')
        }
      });

      const bucket = storage.bucket(bucketName[0]);
      const blob = bucket.file(uploadedFile.originalFilename || 'unnamed');
      
      const blobStream = blob.createWriteStream({
        resumable: false,
        metadata: {
          contentType: uploadedFile.mimetype || 'application/pdf'
        }
      });

      const fileStream = fs.createReadStream(uploadedFile.filepath);

      await new Promise((resolve, reject) => {
        fileStream.pipe(blobStream)
          .on('error', reject)
          .on('finish', resolve);
      });

      await fs.promises.unlink(uploadedFile.filepath);

      return res.status(200).json({ 
        success: true,
        message: 'File uploaded successfully'
      });

    } catch (error) {
      console.error('Error uploading file:', error);
      return res.status(500).json({ 
        error: 'Failed to upload file',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
}