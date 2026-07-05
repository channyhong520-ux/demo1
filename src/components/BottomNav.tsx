import { Home, ShoppingCart, Clock } from "lucide-react";

export default function BottomNav() {
  return (
    <div className="sticky bottom-0 left-0 right-0 z-30 flex justify-center pb-4 pt-2">
      <div className="flex items-center gap-6 rounded-full bg-white px-6 py-2 shadow-[0_4px_18px_rgba(0,0,0,0.15)]">
        <button
          aria-label="Home"
          className="flex h-9 w-9 items-center justify-center rounded-full text-teal-700"
        >
          <Home size={20} />
        </button>
        <button
          aria-label="Cart"
          className="-mt-6 flex h-14 w-14 items-center justify-center rounded-full bg-slate-900 text-white shadow-lg ring-4 ring-white"
        >
          <ShoppingCart size={22} />
        </button>
        <button
          aria-label="History"
          className="flex h-9 w-9 items-center justify-center rounded-full text-teal-700"
        >
          <Clock size={20} />
        </button>
      </div>
    </div>
  );
}
