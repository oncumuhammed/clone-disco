/**
 * Application constants and configuration.
 * Centralized configuration for API endpoints, file limits, and other constants.
 */

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
export const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3001';
export const S3_URL = import.meta.env.VITE_S3_URL || 'http://localhost:9000/concord-uploads';

export const MAX_FILE_SIZE = 25 * 1024 * 1024;

export const ALLOWED_FILE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'video/mp4',
  'video/webm',
  'video/quicktime',
  'audio/mpeg',
  'audio/wav',
  'audio/ogg',
  'audio/webm',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'text/plain',
];

export const MESSAGE_BATCH_SIZE = 50;
export const TYPING_TIMEOUT = 5000;
export const MAX_USERNAME_LENGTH = 32;
export const MAX_SERVER_NAME_LENGTH = 100;
export const MAX_CHANNEL_NAME_LENGTH = 100;
export const MAX_MESSAGE_LENGTH = 4000;
export const MAX_BIO_LENGTH = 190;
