import Redis from 'ioredis';
import { env } from '../config/env';

export const redis = new Redis(env.REDIS_URL, {
    lazyConnect: true,
    enableOfflineQueue: false,
    retryStrategy: (times) => {
        return Math.min(times * 500, 5000);
    }
});

redis.on('connect', () => {
    console.log('Redis connected successfully');
});

let lastLoggedError = 0;
redis.on('error', (err) => {
    const now = Date.now();
    if (now - lastLoggedError > 60000) {
        console.error('Redis connection error:', err);
        lastLoggedError = now;
    }
});