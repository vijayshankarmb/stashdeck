import type { Request, Response, NextFunction } from "express";
import { redis } from "../lib/redis";
import { failure } from "../http/response";
import { request } from "node:http";

export const rateLimiter = (limit: number, windowsSecond: number) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const ip = req.ip || req.headers['x-forwarded-for'] || 'unknown';
        const key = `rate-limit:${ip}`;

        try {
            const request = await redis.incr(key);

            if (request === 1) {
                await redis.expire(key, windowsSecond);
            }

            if (request > limit) {
                const ttl = await redis.ttl(key);
                return failure(res,
                    `Too many requests, please try again in ${ttl} seconds`,
                    429
                );
            }

            next();
        } catch (error) {
             console.error("Rate limiter error:", error);
             next()
        }
    }
}