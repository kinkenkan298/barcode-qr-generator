import type { NextFunction, Request, Response } from "express";
import { errorResponse } from "../utils/api-response";
import { HttpException } from "../utils/http-exception";
import { errorLogger, logger } from "@/logger";
import { MessageType } from "@/types/response-type";

export const errorHandler = (
  err: Error | HttpException,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof HttpException) {
    logger.error(err.message);

    errorResponse({
      res,
      message: err.message,
      statusCode: err.status,
      data: null,
      type: MessageType.ERROR,
    });
    return;
  }

  errorLogger(err, req, res, next);
};
