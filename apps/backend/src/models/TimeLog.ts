import { model, Schema } from "mongoose";

export interface ITimeLog {
  minuteKey: string;
  payload: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ITimeLogDocument extends ITimeLog, Document {}

const TimeLogSchema = new Schema<ITimeLogDocument>(
  {
    minuteKey: { type: String, required: true, unique: true, index: true },
    payload: { type: String, required: true },
  },
  { timestamps: true },
);

export const TimeLogModel = model<ITimeLogDocument>("TimeLog", TimeLogSchema);
