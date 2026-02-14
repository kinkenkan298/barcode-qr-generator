import { asyncHandler } from "@/middleware/async-handler";
import { TimeLogModel } from "@/models/TimeLog";
import { successResponse } from "@/utils/api-response";
import { Request, Response, Router } from "express";

const qrRoutes: Router = Router();

function getMinuteStamp(date = new Date()) {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const hh = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd} ${hh}:${min}`;
}

qrRoutes.get(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    const now = new Date();
    const minuteKey = getMinuteStamp(now);

    const payload = {
      type: "minute-qr",
      datetime: minuteKey,
      iso: now.toISOString(),
    };

    const payloadString = JSON.stringify(payload);

    await TimeLogModel.updateOne(
      { minuteKey },
      {
        $setOnInsert: { minuteKey, payloadString },
      },
      { upsert: true },
    );

    successResponse({
      res,
      data: {
        payload,
        payloadString,
        expiresInSeconds: 60 - now.getSeconds(),
      },
      message: "Minute QR generated successfully",
    });
  }),
);

export { qrRoutes };
