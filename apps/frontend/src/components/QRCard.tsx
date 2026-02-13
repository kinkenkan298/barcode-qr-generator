import QRCode from "react-qr-code";
import { Card, CardContent } from "./ui/card";
import { Progress } from "./ui/progress";
import { CheckIcon, CopyIcon, RefreshCw, Timer } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "./ui/input-group";
import { useState } from "react";

type QRCardProps = {
  qrValue: string;
  timeLeft: number;
  isRefreshing: boolean;
  progressPercent: number;
  onGenerateQR: () => void;
};

export const QRCard = ({
  qrValue,
  timeLeft,
  isRefreshing,
  progressPercent,
  onGenerateQR,
}: QRCardProps) => {
  const [isCopied, setIsCopied] = useState(false);

  return (
    <Card className="overflow-hidden border-none shadow-2xl shadow-blue-500/10 p-0">
      <Progress value={progressPercent} />
      <CardContent>
        <div className="p-10 flex flex-col items-center text-center">
          <div className="mb-8">
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Scan QR Barcode
            </h2>
          </div>

          <div className="relative group">
            <div
              className={`
                  relative p-6 bg-white dark:bg-slate-900 rounded-2xl border-2 transition-all duration-700
                  ${isRefreshing ? "opacity-30 scale-90 blur-md translate-y-2" : "opacity-100 scale-100 translate-y-0"}
                  ${timeLeft < 10 ? "border-rose-100 shadow-rose-100" : "border-slate-50 shadow-lg "}
                `}
            >
              <div className="bg-white p-2 rounded-xl">
                {qrValue && <QRCode value={qrValue} size={220} />}
              </div>
            </div>

            {isRefreshing && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <div className="p-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full shadow">
                  <RefreshCw className="h-8 w-8 text-blue-600 animate-spin" />
                </div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
                  Generating...
                </span>
              </div>
            )}
          </div>

          <div className="w-full max-w-[20rem] mt-5">
            <InputGroup>
              <InputGroupInput
                name="qrCodeValue"
                placeholder="QR Code"
                value={qrValue}
                disabled
                readOnly
              />
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  aria-label="Copy"
                  title="Copy"
                  size="icon-xs"
                  onClick={() => {
                    setIsCopied(true);
                    navigator.clipboard.writeText(qrValue);
                    setTimeout(() => setIsCopied(false), 2000);
                  }}
                >
                  {isCopied ? <CheckIcon /> : <CopyIcon />}
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </div>

          <div className="mt-10 w-full space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                  <Timer size={14} />
                  <span className="text-[10px] uppercase tracking-widest font-bold">
                    Kadaluarsa
                  </span>
                </div>
                <span
                  className={`text-2xl font-mono font-black tracking-tighter ${timeLeft < 10 ? "text-rose-500 animate-pulse" : "text-slate-900 dark:text-white"}`}
                >
                  {timeLeft}s
                </span>
              </div>

              <button
                onClick={() => onGenerateQR()}
                disabled={isRefreshing}
                className="flex flex-col items-center p-4 bg-white dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-600 transition-all active:scale-95 group shadow-sm"
              >
                <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                  <RefreshCw
                    size={14}
                    className={
                      isRefreshing
                        ? "animate-spin"
                        : "group-hover:rotate-180 transition-transform duration-700"
                    }
                  />
                  <span className="text-[10px] uppercase tracking-widest font-bold">
                    Ganti
                  </span>
                </div>
                <span className="text-sm font-bold text-blue-600 group-hover:text-blue-700">
                  Refresh Kode
                </span>
              </button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
