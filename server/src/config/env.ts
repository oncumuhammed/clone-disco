/**
 * Environment configuration with Zod validation.
 * Validates and exports type-safe environment variables.
 */
import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().transform(Number).default('3001'),
  CLIENT_URL: z.string().url(),
  DATABASE_URL: z.string().url(),
  REDIS_URL: z.string().url(),
  JWT_ACCESS_SECRET: z.string().min(32),
  JWT_REFRESH_SECRET: z.string().min(32),
  JWT_ACCESS_EXPIRY: z.string().default('15m'),
  JWT_REFRESH_EXPIRY: z.string().default('7d'),
  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_CLIENT_SECRET: z.string().optional(),
  GOOGLE_CALLBACK_URL: z.string().url().optional(),
  GITHUB_CLIENT_ID: z.string().optional(),
  GITHUB_CLIENT_SECRET: z.string().optional(),
  GITHUB_CALLBACK_URL: z.string().url().optional(),
  S3_ENDPOINT: z.string().url(),
  S3_PORT: z.string().transform(Number).default('9000'),
  S3_ACCESS_KEY: z.string(),
  S3_SECRET_KEY: z.string(),
  S3_BUCKET_NAME: z.string().default('concord-uploads'),
  S3_REGION: z.string().default('us-east-1'),
  S3_USE_SSL: z
    .string()
    .transform((val) => val === 'true')
    .default('false'),
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.string().transform(Number).optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  EMAIL_FROM: z.string().email().optional(),
  MEDIASOUP_LISTEN_IP: z.string().ip().default('0.0.0.0'),
  MEDIASOUP_ANNOUNCED_IP: z.string().ip().default('127.0.0.1'),
  MEDIASOUP_MIN_PORT: z.string().transform(Number).default('40000'),
  MEDIASOUP_MAX_PORT: z.string().transform(Number).default('49999'),
  RATE_LIMIT_WINDOW_MS: z.string().transform(Number).default('60000'),
  RATE_LIMIT_MAX_REQUESTS: z.string().transform(Number).default('100'),
});

const parseResult = envSchema.safeParse(process.env);

if (!parseResult.success) {
  throw new Error(`Environment validation failed: ${parseResult.error.message}`);
}

export const env = parseResult.data;
