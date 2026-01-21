import express from 'express';
import cookieParser from 'cookie-parser';
import { errorMiddleware } from './middlewares/error.middleware';
import healthRouter from './modules/health/health.route';
import authRouter from './modules/auth/auth.route';
import bookmarkRouter from './modules/bookmark/bookmark.route';
import cors from 'cors';
import { env } from './config';

const app = express();

app.use(cookieParser());

app.use(express.json());

app.use(cors({
    origin: env.CLIENT_URL || 'http://localhost:3000',
    credentials: true
}))

app.use("/api/v1/health", healthRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/bookmarks", bookmarkRouter);

app.use(errorMiddleware);

export default app;