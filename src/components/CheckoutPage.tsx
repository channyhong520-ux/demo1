import { useState } from "react";
import {
  ArrowLeft,
  Search,
  ShoppingCart,
  CheckCircle2,
  ChevronRight,
  ListFilter,
  Clock,
  X,
  Gift,
  Sparkles,
  ShoppingBag,
} from "lucide-react";
import { formatPrice } from "../data/products";

interface Props {
  subtotal: number;
  onBack: () => void;
  onConfirm: () => void;
}

type DeliveryMethod = "pickup" | "delivery";

const quickTimes = ["ឥឡូវនេះ", "15 នាទី", "30 នាទី", "60 នាទី"];

export default function CheckoutPage({ subtotal, onBack, onConfirm }: Props) {
  const [method, setMethod] = useState<DeliveryMethod>("pickup");
  const [phone, setPhone] = useState("");
  const [hour, setHour] = useState("00");
  const [minute, setMinute] = useState("00");
  const [activeQuickTime, setActiveQuickTime] = useState<string | null>("ឥឡូវនេះ");
  const [note, setNote] = useState("");
  const [usePoints, setUsePoints] = useState(false);

  const deliveryFee = method === "delivery" ? 1000 : 0;
  const total = subtotal + deliveryFee;

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
          បញ្ជាក់ការបញ្ជាទិញ
        </h1>
        <div className="w-9" />
      </div>

      {/* step indicator */}
      <div className="mt-4 px-8">
        <div className="relative flex items-center justify-between">
          <div className="absolute left-5 right-5 top-1/2 h-[2px] -translate-y-1/2 border-t-2 border-dashed border-teal-600/40" />
          <div className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full border-2 border-teal-600 bg-white text-teal-700">
            <Search size={16} />
          </div>
          <div className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full border-2 border-teal-600 bg-white text-teal-700">
            <ShoppingCart size={16} />
          </div>
          <div className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full bg-teal-700 text-white shadow-md">
            <CheckCircle2 size={16} />
          </div>
        </div>
      </div>

      <div className="mt-4 flex-1 overflow-y-auto px-4 pb-28">
        {/* delivery method selection */}
        <div className="flex justify-center gap-6">
          <button
            onClick={() => setMethod("pickup")}
            className="flex flex-col items-center gap-2"
          >
            <div
              className={`flex h-24 w-24 items-center justify-center rounded-2xl border-2 ${
                method === "pickup"
                  ? "border-teal-600 bg-teal-600"
                  : "border-slate-200 bg-slate-300"
              }`}
            >
              <ShoppingBag size={36} className="text-white" strokeWidth={1.5} />
            </div>
            <span
              className={`text-xs font-semibold ${
                method === "pickup" ? "text-teal-700" : "text-slate-400"
              }`}
            >
              យកនៅហាងផ្ទាល់
            </span>
          </button>

          <button
            onClick={() => setMethod("delivery")}
            className="flex flex-col items-center gap-2"
          >
            <div
              className={`flex h-24 w-24 items-center justify-center rounded-2xl border-2 bg-white ${
                method === "delivery" ? "border-teal-600" : "border-slate-200"
              }`}
            >
              <img
                src="/images/delivery-icon.png"
                alt="Delivery"
                className="h-16 w-16 object-contain"
              />
            </div>
            <span
              className={`text-xs font-semibold ${
                method === "delivery" ? "text-teal-700" : "text-slate-400"
              }`}
            >
              ដឹកជញ្ជូនដល់ទីតាំង
            </span>
          </button>
        </div>

        {/* customer info */}
        <button className="mt-6 flex w-full items-center justify-between border-b border-slate-200 pb-3 text-left">
          <div>
            <p className="text-sm font-bold text-teal-700">ព័ត៌មានអតិថិជន</p>
            <p className="mt-1 text-xs text-slate-500">ឈ្មោះ: PHOEURN SOKPHENG</p>
            <div className="mt-1 flex items-center gap-1 text-xs text-slate-400">
              <span>លេខទូរស័ព្ទ</span>
              <span className="text-red-500">*</span>
              <span>:</span>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                placeholder="បញ្ចូលលេខទូរស័ព្ទ"
                className="ml-1 flex-1 bg-transparent text-xs text-slate-600 outline-none placeholder:text-slate-300"
              />
            </div>
          </div>
          <ChevronRight size={18} className="shrink-0 text-slate-400" />
        </button>

        {/* time selection */}
        <div className="mt-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-teal-700">ពេលវេលាទៅយក</p>
            <div className="flex items-center gap-1 text-slate-400">
              <ListFilter size={16} />
              <Clock size={16} />
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5">
            <select
              value={hour}
              onChange={(e) => setHour(e.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-sm text-slate-700 outline-none"
            >
              {Array.from({ length: 24 }).map((_, i) => {
                const v = String(i).padStart(2, "0");
                return (
                  <option key={v} value={v}>
                    {v}
                  </option>
                );
              })}
            </select>
            <span className="text-sm text-slate-500">ម៉ោង</span>
            <select
              value={minute}
              onChange={(e) => setMinute(e.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-sm text-slate-700 outline-none"
            >
              {Array.from({ length: 60 }).map((_, i) => {
                const v = String(i).padStart(2, "0");
                return (
                  <option key={v} value={v}>
                    {v}
                  </option>
                );
              })}
            </select>
            <span className="text-sm text-slate-500">នាទី</span>
            <button
              onClick={() => {
                setHour("00");
                setMinute("00");
                setActiveQuickTime(null);
              }}
              aria-label="Clear time"
              className="ml-auto text-slate-400"
            >
              <X size={16} />
            </button>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {quickTimes.map((t) => (
              <button
                key={t}
                onClick={() => setActiveQuickTime(t)}
                className={`rounded-full border px-4 py-1.5 text-xs font-medium ${
                  activeQuickTime === t
                    ? "border-teal-600 bg-teal-600 text-white"
                    : "border-teal-500 text-teal-600"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* note */}
        <div className="mt-5">
          <input
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="ចំណាំ"
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 shadow-sm outline-none placeholder:text-slate-400"
          />
        </div>

        {/* order summary */}
        <div className="mt-6">
          <p className="text-sm font-bold text-teal-700">សេចក្តីនៃការបញ្ជាទិញ</p>
          <div className="mt-2 space-y-1.5 text-sm text-slate-600">
            <div className="flex justify-between">
              <span>សរុប</span>
              <span>៛ {formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>ប្រថុះថ្មិ</span>
              <span>៛ {formatPrice(deliveryFee)}</span>
            </div>
            <div className="flex justify-between font-bold text-slate-800">
              <span>ប្រាក់សរុប</span>
              <span>៛ {formatPrice(total)}</span>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between rounded-xl bg-white px-3 py-2.5 shadow-sm">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Gift size={16} className="text-amber-500" />
              <span>ប្រើប្រាស់ 0 ពិន្ទុសម្រាប់នៅដឹងបង</span>
            </div>
            <button
              onClick={() => setUsePoints((v) => !v)}
              className={`h-6 w-11 shrink-0 rounded-full transition-colors ${
                usePoints ? "bg-teal-600" : "bg-slate-300"
              }`}
            >
              <span
                className={`block h-5 w-5 translate-y-0.5 rounded-full bg-white shadow transition-transform ${
                  usePoints ? "translate-x-5" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>
        </div>

        {/* lucky draw banner */}
        <div className="relative mt-6 overflow-hidden rounded-2xl bg-gradient-to-br from-teal-600 to-teal-700 px-4 py-6 text-center shadow-md">
          <Sparkles
            size={22}
            className="absolute left-4 top-4 text-amber-300"
          />
          <Sparkles
            size={16}
            className="absolute right-6 top-8 text-amber-200"
          />
          <Gift size={32} className="mx-auto mb-2 text-amber-300" strokeWidth={1.5} />
          <p className="font-moul text-lg text-white">លេខកូដប័ណ្ណ</p>
          <p className="mt-1 text-xs text-teal-50">
            ការបញ្ជាទិញនេះមានឱកាសទទួលបានរង្វាន់ពិសេស
          </p>
        </div>
      </div>

      {/* bottom bar */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between gap-3 bg-slate-900 px-4 py-3">
        <div className="text-white">
          <p className="text-[11px] text-slate-300">ប្រាក់សរុប</p>
          <p className="text-base font-bold">៛ {formatPrice(total)}</p>
        </div>
        <button
          onClick={onConfirm}
          className="flex items-center gap-1.5 rounded-full bg-amber-400 px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-sm active:bg-amber-500"
        >
          <CheckCircle2 size={16} />
          បញ្ជាទិញ
        </button>
      </div>
    </div>
  );
}
