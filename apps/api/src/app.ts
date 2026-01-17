import express from 'express';
import { errorMiddleware } from './middlewares/error.middleware';
import router from './http/router';

const app = express();

app.use(express.json());

app.use("/api/v1/", router);

app.use(errorMiddleware);

export default app;