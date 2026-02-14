import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.APP_API_URL! || "http://localhost:3001/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export class ApiError extends Error {
  status?: number;
  retryAfterSeconds?: number;

  constructor(message: string, status?: number, retryAfterSeconds?: number) {
    super(message);
    this.status = status;
    this.retryAfterSeconds = retryAfterSeconds;
  }
}
