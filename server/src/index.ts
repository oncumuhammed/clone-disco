/**
 * Main server entry point.
 * Creates HTTP server, initializes Socket.IO, and starts the application.
 */
import { createServer } from 'http';
import { app } from './app.js';
import { setupSocketIO } from './socket/index.js';
import { env } from './config/env.js';
import { redis } from './config/redis.js';

const httpServer = createServer(app);

const io = setupSocketIO(httpServer);

const PORT = env.PORT;

async function gracefulShutdown(signal: string) {
  console.log(`\n${signal} received. Starting graceful shutdown...`);

  httpServer.close(() => {
    console.log('HTTP server closed');
  });

  io.close(() => {
    console.log('Socket.IO server closed');
  });

  await redis.quit();
  console.log('Redis connection closed');

  process.exit(0);
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${env.NODE_ENV} mode`);
  console.log(`API available at http://localhost:${PORT}/api`);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});
