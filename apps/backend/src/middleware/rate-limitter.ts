import { errorResponse } from "@/utils/api-response";
import type { Request, Response } from "express";
import rateLimit, { ipKeyGenerator } from "express-rate-limit";

const LIMIT_MAX_REQUESTS = 5;
const LIMIT_WINDOW_MS = 30 * 1000;

export const rateLimitter = rateLimit({
  legacyHeaders: true,
  limit: LIMIT_MAX_REQUESTS,
  message: "Terlalu banyak permintaan, silakan coba lagi nanti.",
  standardHeaders: true,
  windowMs: LIMIT_WINDOW_MS,
  keyGenerator: (req: Request) => ipKeyGenerator(req.ip as string),
  handler: (req: Request, res: Response) => {
    errorResponse({
      res,
      message: "Terlalu banyak permintaan, silakan coba lagi nanti.",
      data: null,
      statusCode: 429,
    });
  },
});
