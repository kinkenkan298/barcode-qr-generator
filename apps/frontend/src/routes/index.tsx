import { getTimeQueryKey, useGetTime } from "@/api/get-time";
import { QRCard } from "@/components/QRCard";
import { queryClient } from "@/lib/query-client";
import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/")({ component: App });

function App() {
  const [timeLeft, setTimeLeft] = useState(60);
  const qc = useQueryClient();

  const {
    data: time,
    refetch: refetchTime,
    isFetching,
    error,
    isError,
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
    const timer = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft <= 1) {
          refetchTime().then(() => {
            qc.invalidateQueries({
              queryKey: getTimeQueryKey(),
            });
          });
          return 60;
        }
        return prevTimeLeft - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const qrValue = useMemo(
    () => time?.data.payload.datetime ?? "payload",
    [time],
  );

  const progressPercent = (timeLeft / 60) * 100;
  const refreshNow = async () => {
    if (!isFetching && !isError) {
      await refetchTime();
      await queryClient.invalidateQueries({
        queryKey: getTimeQueryKey(),
      });
    }
  };
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full space-y-6">
        <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
          Barcode QR Generator
        </h1>

        <QRCard
          timeLeft={timeLeft}
          progressPercent={progressPercent}
          onGenerateQR={refreshNow}
          isRefreshing={isFetching}
          qrValue={qrValue}
        />
      </div>
    </div>
  );
}
