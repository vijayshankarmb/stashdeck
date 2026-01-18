import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { failure } from "../http/response";
import { env } from "../config";

export const protect = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;

    if (!token) {
        return failure(res, "Not authorized to access this route", 401);
    }

    try {
        const decoded = jwt.verify(token, env.JWT_SECRET) as { id: number, email: string };
        req.user = decoded;
        next();
    } catch (error) {
        return failure(res, "Not authorized to access this route", 401);
    }
}