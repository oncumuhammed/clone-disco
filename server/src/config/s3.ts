/**
 * S3 client configuration for MinIO object storage.
 * Configures AWS SDK S3 client for file uploads and downloads.
 */
import { S3Client } from '@aws-sdk/client-s3';
import { env } from './env.js';

export const s3Client = new S3Client({
  endpoint: env.S3_ENDPOINT,
  region: env.S3_REGION,
  credentials: {
    accessKeyId: env.S3_ACCESS_KEY,
    secretAccessKey: env.S3_SECRET_KEY,
  },
  forcePathStyle: true,
  tls: env.S3_USE_SSL,
});

export const S3_BUCKET_NAME = env.S3_BUCKET_NAME;
