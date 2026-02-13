import "dotenv/config";
import mongoose from "mongoose";
import { app } from "./server";
import { logger } from "./logger";

const { PORT } = process.env;

const server = app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});

const onCloseSignal = async () => {
  logger.info("sigint received, shutting down");

  await mongoose.connection.close();
  logger.info("Database connection closed");

  server.close(() => {
    logger.info("Server closed");
  });
};

process.on("SIGINT", onCloseSignal);
process.on("SIGTERM", onCloseSignal);
