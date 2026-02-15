/**
 * Redis client configuration.
 * Creates and exports an ioredis client instance for caching and session storage.
 */
import Redis from 'ioredis';
import { env } from './env.js';

export const redis = new Redis(env.REDIS_URL, {
  maxRetriesPerRequest: 3,
  enableReadyCheck: true,
  lazyConnect: false,
});

redis.on('error', (error) => {
  console.error('Redis connection error:', error);
});

redis.on('ready', () => {
  console.log('Redis connected successfully');
});

redis.on('close', () => {
  console.log('Redis connection closed');
});
