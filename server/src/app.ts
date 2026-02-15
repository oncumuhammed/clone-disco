/**
 * Express application configuration.
 * Sets up middleware, routes, and error handling for the API server.
 */
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { corsOptions } from './config/cors.js';
import { router } from './routes/index.js';
import { errorHandler } from './middleware/errorHandler.js';
import { env } from './config/env.js';
import { sendError } from './utils/response.js';

export const app = express();

app.use(helmet());
app.use(cors(corsOptions));
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

if (env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api', router);

app.use('*', (req, res) => {
  sendError(res, 'NOT_FOUND', `Route ${req.originalUrl} not found`, 404);
});

app.use(errorHandler);
