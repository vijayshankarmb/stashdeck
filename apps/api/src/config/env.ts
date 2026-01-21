import dotenv from 'dotenv';

dotenv.config();

const requiredEnvVars = ['PORT', 'DATABASE_URL', 'JWT_SECRET', 'NODE_ENV', 'REDIS_URL', 'CLIENT_URL'];

requiredEnvVars.forEach((key) => {
    if(!process.env[key]) {
        throw new Error(`Missing env var: ${key}`);
    }
});

export const env = {
    PORT: Number(process.env.PORT),
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_SECRET: process.env.JWT_SECRET as string,
    NODE_ENV: process.env.NODE_ENV,
    REDIS_URL: process.env.REDIS_URL as string,
    CLIENT_URL: process.env.CLIENT_URL
}