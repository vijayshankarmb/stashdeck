import type { Response } from "express";

export const success = <T>(
    res: Response,
    data: T,
    statusCode = 200
) => {
    return res.status(statusCode).json({
        status: true,
        data
    })
}

export const failure = (
    res: Response,
    error: string,
    statusCode = 400
) => {
    return res.status(statusCode).json({
        status: false,
        error
    })
}