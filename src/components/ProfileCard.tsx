import { Gift } from "lucide-react";

export default function ProfileCard() {
  return (
    <div className="relative z-10 -mt-10 rounded-3xl bg-[#eaf5ef] p-4 shadow-[0_10px_30px_rgba(0,0,0,0.08)] overflow-hidden">
      {/* decorative dot pattern top right */}
      <svg
        className="pointer-events-none absolute -right-2 -top-2 h-24 w-24 text-teal-600/25"
        viewBox="0 0 100 100"
        fill="currentColor"
      >
        {Array.from({ length: 6 }).map((_, row) =>
          Array.from({ length: 6 - row }).map((_, col) => (
            <circle
              key={`${row}-${col}`}
              cx={90 - row * 13}
              cy={10 + col * 13 + row * 6.5}
              r="5.5"
            />
          )),
        )}
      </svg>

      {/* profile row */}
      <div className="mb-3 flex items-center gap-3">
        <img
          src="/images/avatar.png"
          alt="Profile"
          className="h-12 w-12 shrink-0 rounded-full border-2 border-amber-300 object-cover shadow-sm"
        />
        <div>
          <p className="text-xs font-medium text-slate-500">សូមស្វាគមន៍ 🙏</p>
          <p className="text-lg font-extrabold tracking-wide text-teal-800">
            PHOEURN SOKPHENG
          </p>
        </div>
      </div>

      {/* balance + points row */}
      <div className="flex items-stretch gap-3">
        <div className="flex flex-1 flex-col justify-between rounded-2xl bg-white px-4 py-3 shadow-sm">
          <p className="text-xs font-semibold text-slate-500">សមតុល្យសរុប</p>
          <div className="my-1.5 h-1 w-full rounded-full bg-teal-700/90" />
          <div className="flex justify-end">
            <span className="rounded-full bg-teal-700 px-5 py-1.5 text-sm font-bold text-white shadow-sm">
              ៛ 0
            </span>
          </div>
        </div>

        <div className="relative flex w-28 flex-col items-center justify-center gap-1 rounded-2xl bg-white px-3 py-3 text-center shadow-sm">
          <Gift size={26} strokeWidth={1.6} className="text-teal-700" />
          <p className="text-sm font-bold text-slate-700">
            <span className="text-base">0</span> ពិន្ទុ
          </p>
        </div>
      </div>
    </div>
  );
}
