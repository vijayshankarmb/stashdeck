import type { Request, Response } from "express";
import { success } from "../../http/response";

export const health = (req: Request, res: Response) => {
    return success(res, { status: "ok", message: "API is healthy" });
}