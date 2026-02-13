import { errorResponse } from "@/utils/api-response";
import type { Request, Response } from "express";
import rateLimit from "express-rate-limit";

const LIMIT_MAX_REQUESTS = 5;

export const rateLimitter = rateLimit({
  legacyHeaders: true,
  limit: LIMIT_MAX_REQUESTS,
  message: "Terlalu banyak permintaan, silakan coba lagi nanti.",
  standardHeaders: true,
  windowMs: 15 * 60 * LIMIT_MAX_REQUESTS,
  handler: (req: Request, res: Response) => {
    errorResponse({
      res,
      message: "Terlalu banyak permintaan, silakan coba lagi nanti.",
      data: null,
      statusCode: 429,
    });
  },
});
