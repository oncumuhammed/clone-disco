/**
 * Application-wide limits and constraints.
 * These constants define maximum sizes and lengths for various entities.
 */

export const MAX_FILE_SIZE = 25 * 1024 * 1024;
export const MAX_USERNAME_LENGTH = 32;
export const MAX_SERVER_NAME_LENGTH = 100;
export const MAX_CHANNEL_NAME_LENGTH = 100;
export const MAX_MESSAGE_LENGTH = 4000;
export const MAX_BIO_LENGTH = 190;
export const MAX_ROLE_NAME_LENGTH = 100;
export const MAX_EMOJI_NAME_LENGTH = 32;
export const MAX_WEBHOOK_NAME_LENGTH = 80;
export const MESSAGE_BATCH_SIZE = 50;
export const TYPING_TIMEOUT = 5000;

export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
export const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/quicktime'];
export const ALLOWED_AUDIO_TYPES = ['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/webm'];
export const ALLOWED_DOCUMENT_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'text/plain',
];

export const ALLOWED_FILE_TYPES = [
  ...ALLOWED_IMAGE_TYPES,
  ...ALLOWED_VIDEO_TYPES,
  ...ALLOWED_AUDIO_TYPES,
  ...ALLOWED_DOCUMENT_TYPES,
];
