import cors from "cors";
import express, { Express } from "express";
import { errorHandler } from "@/middleware/error-handler";
import {
  httpLogger,
  logBodyRequests,
  logQueryParams,
  addRequestId,
} from "@/logger";
import { connectDB } from "@/db";
import helmet from "helmet";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);
app.use(helmet());

app.use([httpLogger, addRequestId, logBodyRequests, logQueryParams]);

await connectDB();

// routes

app.get("/health", (req, res) => {
  res.status(200).json({
    status: true,
    message: "Backend is healthy",
  });
});

app.get("/", (req, res) => {
  res.send("Hallo backend!");
});

app.use(errorHandler);

export { app };
