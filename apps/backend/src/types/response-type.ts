import type { Response } from "express";

export enum MessageType {
  SUCCESS = "success",
  ERROR = "error",
  WARNING = "warning",
  INFO = "info",
}
export interface APIResponse<T = unknown> {
  res: Response;
  success?: boolean;
  message?: string;
  errors?: string[];
  data: T;
  statusCode?: number;
  type?: MessageType;
}
