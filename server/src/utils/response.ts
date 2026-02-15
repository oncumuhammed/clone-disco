/**
 * Response utility functions for standardized API responses.
 * Ensures all API responses follow the same format across the application.
 */
import type { Response } from 'express';
import type { ApiResponse } from '@concord/shared';

export function sendSuccess<T>(res: Response, data: T, statusCode = 200): void {
  const response: ApiResponse<T> = {
    success: true,
    data,
    error: null,
  };
  res.status(statusCode).json(response);
}

export function sendError(
  res: Response,
  code: string,
  message: string,
  statusCode = 400,
): void {
  const response: ApiResponse<null> = {
    success: false,
    data: null,
    error: {
      code,
      message,
    },
  };
  res.status(statusCode).json(response);
}
