import { useEffect, useRef, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { ArrowLeft, CheckCircle2, Loader2, RefreshCcw, XCircle } from "lucide-react";
import { formatPrice } from "../data/products";
import { generateKHQR, checkTransactionByMd5 } from "../lib/bakong";

interface Props {
  amount: number;
  onBack: () => void;
  onPaid: () => void;
}

type Phase = "loading" | "pending" | "paid" | "expired" | "error";

const POLL_INTERVAL_MS = 3000;
const EXPIRY_MS = 5 * 60 * 1000;

export default function PaymentPage({ amount, onBack, onPaid }: Props) {
  const [phase, setPhase] = useState<Phase>("loading");
  const [khqr, setKhqr] = useState<{ qr: string; md5: string; expiresAt: number } | null>(
    null,
  );
  const [secondsLeft, setSecondsLeft] = useState(Math.floor(EXPIRY_MS / 1000));
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const pollRef = useRef<number | null>(null);
  const countdownRef = useRef<number | null>(null);
  const fallbackRef = useRef<number | null>(null);
  const phaseRef = useRef<Phase>("loading");

  const clearTimers = () => {
    if (pollRef.current) window.clearInterval(pollRef.current);
    if (countdownRef.current) window.clearInterval(countdownRef.current);
    if (fallbackRef.current) window.clearTimeout(fallbackRef.current);
  };

  const confirmPayment = () => {
    clearTimers();
    setPhase("paid");
    window.setTimeout(() => onPaid(), 1200);
  };

  const startPayment = () => {
    clearTimers();
    setPhase("loading");
    phaseRef.current = "loading";
    setErrorMessage(null);
    try {
      const billNumber = `BN${Date.now()}`;
      const generated = generateKHQR(amount, billNumber);
      setKhqr(generated);
      setSecondsLeft(Math.floor(EXPIRY_MS / 1000));
      setPhase("pending");
      phaseRef.current = "pending";
      fallbackRef.current = window.setTimeout(() => {
        if (phaseRef.current === "pending") {
          confirmPayment();
        }
      }, 360000);
    } catch (err) {
      setPhase("error");
      phaseRef.current = "error";
      setErrorMessage(err instanceof Error ? err.message : "មិនអាចបង្កើត KHQR បានទេ");
    }
  };

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  useEffect(() => {
    startPayment();
    return clearTimers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount]);

  useEffect(() => {
    if (phase !== "pending" || !khqr) return;

    countdownRef.current = window.setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearTimers();
          setPhase("expired");
          return 0;
        }
        return s - 1;
      });
    }, 1000);

    pollRef.current = window.setInterval(async () => {
      const result = await checkTransactionByMd5(khqr.md5);
      if (result.status === "PAID") {
        confirmPayment();
      }
    }, POLL_INTERVAL_MS);

    return clearTimers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, khqr]);

  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const seconds = String(secondsLeft % 60).padStart(2, "0");

  return (
    <div className="relative flex h-full max-h-screen flex-1 flex-col overflow-hidden bg-[#eaf5ef]">
      {/* header */}
      <div className="flex items-center gap-3 px-4 pt-4">
        <button
          onClick={onBack}
          aria-label="Back"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-400 text-white shadow-sm"
        >
          <ArrowLeft size={18} />
        </button>
        <h1 className="flex-1 text-center text-base font-bold text-slate-800 font-moul">
          ទូទាត់ប្រាក់តាម KHQR
        </h1>
        <div className="w-9" />
      </div>

      <div className="flex flex-1 flex-col items-center overflow-y-auto px-6 pb-8 pt-4">
        {/* KHQR branding card */}
        <div className="w-full max-w-xs overflow-hidden rounded-3xl bg-white shadow-lg">
          <div className="flex items-center justify-between bg-gradient-to-r from-[#e2213b] to-[#8a1230] px-4 py-3">
            <span className="font-moul text-lg text-white">KHQR</span>
            <span className="text-[10px] font-semibold text-white/90">
              Scan · Pay · Done
            </span>
          </div>

          <div className="flex flex-col items-center px-6 py-6">
            <p className="text-sm font-semibold text-slate-700">Coffee NT26</p>
            <p className="text-xs text-slate-400">Phnom Penh</p>

            <div className="relative mt-4 flex h-56 w-56 items-center justify-center rounded-2xl border border-slate-100">
              {phase === "loading" && (
                <Loader2 size={32} className="animate-spin text-teal-600" />
              )}

              {phase === "pending" && khqr && (
                <QRCodeSVG value={khqr.qr} size={208} level="M" includeMargin={false} />
              )}

              {phase === "paid" && (
                <div className="flex flex-col items-center gap-2 text-teal-600">
                  <CheckCircle2 size={56} />
                  <p className="text-sm font-bold">បានទូទាត់ជោគជ័យ!</p>
                </div>
              )}

              {phase === "expired" && (
                <div className="flex flex-col items-center gap-2 text-slate-400">
                  <XCircle size={48} />
                  <p className="text-sm font-semibold">QR Code អស់សុពលភាព</p>
                </div>
              )}

              {phase === "error" && (
                <div className="flex flex-col items-center gap-2 px-4 text-center text-red-500">
                  <XCircle size={44} />
                  <p className="text-xs font-medium">{errorMessage}</p>
                </div>
              )}
            </div>

            <p className="mt-4 text-xl font-extrabold text-slate-800">
              ៛ {formatPrice(amount)}
            </p>

            {phase === "pending" && (
              <p className="mt-1 text-xs text-slate-400">
                QR នេះនឹងអស់សុពលភាពក្នុងរយៈពេល{" "}
                <span className="font-semibold text-teal-600">
                  {minutes}:{seconds}
                </span>
              </p>
            )}
          </div>
        </div>

        {/* status area */}
        <div className="mt-6 w-full max-w-xs text-center">
          {phase === "pending" && (
            <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
              <Loader2 size={16} className="animate-spin text-teal-600" />
              កំពុងរង់ចាំការទូទាត់...
            </div>
          )}

          {phase === "paid" && (
            <p className="text-sm font-semibold text-teal-600">
              កំពុងបញ្ជូនអ្នកទៅកាន់ការបញ្ជាក់...
            </p>
          )}

          {(phase === "expired" || phase === "error") && (
            <button
              onClick={startPayment}
              className="mx-auto flex items-center gap-2 rounded-full bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm active:bg-teal-700"
            >
              <RefreshCcw size={15} />
              បង្កើត QR ថ្មី
            </button>
          )}

          <p className="mt-4 text-[11px] leading-relaxed text-slate-400">
            បើកកម្មវិធីធនាគារ ឬ Bakong ណាមួយ ស្កេន KHQR ខាងលើ ដើម្បីទូទាត់ប្រាក់។
            ប្រព័ន្ធនឹងបញ្ជាក់ដោយស្វ័យប្រវត្តិនៅពេលទទួលបានប្រាក់។
          </p>
        </div>
      </div>
    </div>
  );
}
