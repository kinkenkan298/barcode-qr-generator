import "dotenv/config";
import { dbLogger } from "@/logger";
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    dbLogger.info("Trying to connect to MongoDB...");
    await mongoose.connect(process.env.DATABASE_URI!);
    dbLogger.info("Database MongoDB connected");
  } catch (error) {
    dbLogger.error("MongoDB connection error:", error);
  }
};
