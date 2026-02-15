/**
 * Socket.IO server initialization and configuration.
 * Sets up Socket.IO with authentication and event handlers.
 */
import type { Server as HttpServer } from 'http';
import { Server } from 'socket.io';
import { corsOptions } from '../config/cors.js';

export function setupSocketIO(httpServer: HttpServer): Server {
  const io = new Server(httpServer, {
    cors: corsOptions,
    path: '/socket.io',
    transports: ['websocket', 'polling'],
  });

  io.use((socket, next) => {
    const token = socket.handshake.auth.token;

    if (!token) {
      return next(new Error('Authentication token required'));
    }

    next();
  });

  io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    socket.on('disconnect', (reason) => {
      console.log(`Socket disconnected: ${socket.id}, reason: ${reason}`);
    });

    socket.on('error', (error) => {
      console.error(`Socket error: ${socket.id}`, error);
    });
  });

  return io;
}
