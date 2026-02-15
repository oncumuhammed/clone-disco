/**
 * Global error handling middleware.
 * Catches all errors and formats them into standardized API error responses.
 */
import type { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../utils/errors.js';
import { sendError } from '../utils/response.js';
import { env } from '../config/env.js';

interface PrismaError extends Error {
  code?: string;
}

export function errorHandler(
  error: Error,
  _req: Request,
  res: Response,
  next: NextFunction,
): void {
  if (res.headersSent) {
    return next(error);
  }

  if (error instanceof AppError) {
    sendError(res, error.code, error.message, error.statusCode);
    return;
  }

  if (error instanceof ZodError) {
    const message = error.errors.map((err) => `${err.path.join('.')}: ${err.message}`).join(', ');
    sendError(res, 'VALIDATION_ERROR', message, 400);
    return;
  }

  const prismaError = error as PrismaError;
  if (prismaError.code) {
    if (prismaError.code === 'P2002') {
      sendError(res, 'UNIQUE_CONSTRAINT', 'A record with this value already exists', 409);
      return;
    }
    if (prismaError.code === 'P2025') {
      sendError(res, 'NOT_FOUND', 'Record not found', 404);
      return;
    }
    if (prismaError.code === 'P2003') {
      sendError(res, 'FOREIGN_KEY_CONSTRAINT', 'Related record not found', 400);
      return;
    }
  }

  if (error.name === 'JsonWebTokenError') {
    sendError(res, 'INVALID_TOKEN', 'Invalid authentication token', 401);
    return;
  }

  if (error.name === 'TokenExpiredError') {
    sendError(res, 'TOKEN_EXPIRED', 'Authentication token has expired', 401);
    return;
  }

  if (error.name === 'MulterError') {
    sendError(res, 'FILE_UPLOAD_ERROR', error.message, 400);
    return;
  }

  console.error('Unhandled error:', error);

  const message =
    env.NODE_ENV === 'development' ? error.message : 'An unexpected error occurred';
  const stack = env.NODE_ENV === 'development' ? error.stack : undefined;

  sendError(res, 'INTERNAL_ERROR', message, 500);

  if (stack && env.NODE_ENV === 'development') {
    console.error(stack);
  }
}
