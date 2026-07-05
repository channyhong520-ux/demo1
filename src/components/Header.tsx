import { ChevronDown } from "lucide-react";
import { FacebookIcon, TelegramIcon, YoutubeIcon } from "./icons";

export default function Header() {
  return (
    <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-end gap-2 px-3 pt-3">
      <button className="flex items-center gap-1 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm">
        NT26 Coffee
        <ChevronDown size={14} className="text-slate-500" />
      </button>
      <div className="flex items-center gap-1.5">
        <a
          href="#"
          className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1877F2] text-white shadow-sm"
          aria-label="Facebook"
        >
          <FacebookIcon size={14} />
        </a>
        <a
          href="#"
          className="flex h-7 w-7 items-center justify-center rounded-full bg-[#29A9EA] text-white shadow-sm"
          aria-label="Telegram"
        >
          <TelegramIcon size={13} />
        </a>
        <a
          href="#"
          className="flex h-7 w-7 items-center justify-center rounded-full bg-[#FF0000] text-white shadow-sm"
          aria-label="Youtube"
        >
          <YoutubeIcon size={14} />
        </a>
      </div>
    </div>
  );
}
