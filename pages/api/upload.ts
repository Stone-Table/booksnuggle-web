import { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // For static exports, API routes are not supported
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return res.status(404).json({
      error: 'API routes are not supported in static exports'
    });
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  // Dynamically import dependencies only when needed (not during static build)
  const { Storage } = await import('@google-cloud/storage');
  const formidable = await import('formidable');
  const fs = await import('fs');

  try {
    const form = formidable.default();
    const [fields, files] = await new Promise<[formidable.Fields, formidable.Files]>((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve([fields, files]);
      });
    });

    const uploadedFile = files.file?.[0];
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