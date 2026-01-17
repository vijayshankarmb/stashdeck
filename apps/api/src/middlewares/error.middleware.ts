import type { Request, Response, NextFunction } from "express";
import type { AppError } from "../http/error";
import { failure } from "../http/response";

export const errorMiddleware = (
    err: unknown,
    _req: Request,
    res: Response,
    _next: NextFunction
) => {

    if (
        typeof err === "object" &&
        err !== null &&
        "message" in err &&
        "statusCode" in err
    ) {
        const appError = err as AppError;
        return failure(res, appError.message, appError.statusCode);
    }

    if (err instanceof Error) {
        return failure(res, err.message, 500);
    }

    return failure(res, "Internal Server Error", 500);

}
