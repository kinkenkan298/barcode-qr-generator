import { MessageType, type APIResponse } from "@/types/response-type";
import type { Response } from "express";

const successResponse = <T>({
  res,
  message,
  data,
  success = true,
  statusCode = 200,
  type = MessageType.SUCCESS,
}: APIResponse<T>): Response => {
  return res.status(statusCode).json({
    success,
    message,
    data,
    type,
  } as APIResponse<T>);
};
const errorResponse = <T>({
  res,
  message,
  data,
  errors,
  statusCode = 500,
  type = MessageType.ERROR,
}: APIResponse<T>) => {
  return res.status(statusCode).json({
    success: false,
    message,
    errors,
    data,
    type,
  } as APIResponse<T>);
};

export { errorResponse, successResponse };
