import dotenv from 'dotenv';

dotenv.config();

const requiredEnvVars = ['PORT', 'DATABASE_URL'];

requiredEnvVars.forEach((key) => {
    if(!process.env[key]) {
        throw new Error(`Missing env var: ${key}`);
    }
});

export const env = {
    PORT: Number(process.env.PORT),
    DATABASE_URL: process.env.DATABASE_URL
}