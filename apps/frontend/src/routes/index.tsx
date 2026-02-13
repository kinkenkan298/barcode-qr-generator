import { QRCard } from "@/components/QRCard";
import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";

export const Route = createFileRoute("/")({ component: App });

function App() {
  const [qrValue, setQrValue] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const generateNewToken = useCallback(() => {
    setIsRefreshing(true);
    const newToken = `AUTH-${Math.random().toString(36)?.substr(2, 9).toUpperCase()}-${Date.now()}`;

    setTimeout(() => {
      setQrValue(newToken);
      setTimeLeft(60);
      setIsRefreshing(false);
    }, 600);
  }, []);

  useEffect(() => {
    generateNewToken();
  }, [generateNewToken]);

  useEffect(() => {
    if (timeLeft <= 0) {
      generateNewToken();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, generateNewToken]);

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
          onGenerateQR={generateNewToken}
          isRefreshing={isRefreshing}
          qrValue={qrValue}
        />
      </div>
    </div>
  );
}
