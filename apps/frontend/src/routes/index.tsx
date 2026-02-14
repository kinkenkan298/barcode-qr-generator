import { getTimeQueryKey, useGetTime } from "@/api/get-time";
import { QRCard } from "@/components/QRCard";
import { queryClient } from "@/lib/query-client";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/")({ component: App });

function App() {
  const [timeLeft, setTimeLeft] = useState(60);

  const {
    data: time,
    isError,
    refetch: refetchTime,
    isFetching,
  } = useGetTime({
    queryConfig: {
      staleTime: 0,
    },
  });

  useEffect(() => {
    if (time?.data.expiresInSeconds != null) {
      setTimeLeft(time?.data.expiresInSeconds);
    }
  }, [time?.data?.expiresInSeconds]);

  useEffect(() => {
    if (timeLeft <= 1) {
      refetchTime().then(() => {
        queryClient.invalidateQueries({
          queryKey: getTimeQueryKey(),
        });
      });
      setTimeLeft(60);
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const qrValue = useMemo(
    () => time?.data.payload.datetime ?? "payload",
    [time],
  );

  const progressPercent = (timeLeft / 60) * 100;
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full space-y-6">
        <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
          Barcode QR Generator
        </h1>

        <QRCard
          timeLeft={timeLeft}
          progressPercent={progressPercent}
          onGenerateQR={async () => {
            await refetchTime();
            await queryClient.invalidateQueries({
              queryKey: getTimeQueryKey(),
            });
          }}
          isRefreshing={isFetching}
          qrValue={qrValue}
        />
      </div>
    </div>
  );
}
