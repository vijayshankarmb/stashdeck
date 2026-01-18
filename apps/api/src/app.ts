import express from 'express';
import cookieParser from 'cookie-parser';
import { errorMiddleware } from './middlewares/error.middleware';
import healthRouter from './modules/health/health.route';
import authRouter from './modules/auth/auth.route';

const app = express();

app.use(cookieParser());

app.use(express.json());

app.use("/api/v1/health", healthRouter);
app.use("/api/v1/auth", authRouter);

app.use(errorMiddleware);

export default app;