import type { Request, Response, NextFunction } from "express";
import type { ZodType } from "zod";
import { failure } from "../http/response";

export const validate = (schema: ZodType<any>) => (req: Request, res: Response, next: NextFunction) => {
  const parsed = schema.safeParse(req.body);

  if (!parsed.success) {
    const firstError = parsed.error?.issues?.[0]?.message ?? "Invalid request";
    return failure(res, firstError, 400);
  }

  req.body = parsed.data;
  next();
};
