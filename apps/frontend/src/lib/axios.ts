import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.APP_API_URL! || "http://localhost:3001/v1",
  headers: {
    "Content-Type": "application/json",
  },
});
