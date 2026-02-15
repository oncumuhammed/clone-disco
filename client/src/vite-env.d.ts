/**
 * Vite environment type definitions.
 * Provides TypeScript support for Vite-specific imports and features.
 */
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_SOCKET_URL: string;
  readonly VITE_S3_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
