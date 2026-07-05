import { Coffee, Package } from "lucide-react";
import { FacebookIcon, TelegramIcon } from "./icons";

export default function Hero() {
  return (
    <div className="relative h-[300px] w-full overflow-hidden bg-neutral-500">
      <img
        src="/images/hero-bg.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/10" />

      {/* Decorative sketch doodles */}
      <div className="absolute left-4 top-16 flex items-end gap-2 opacity-70">
        <Coffee
          size={46}
          strokeWidth={1}
          className="rotate-[-8deg] text-amber-200/80"
        />
        <Package
          size={54}
          strokeWidth={1}
          className="rotate-[6deg] text-white/70"
        />
      </div>

      {/* Big calligraphy-style logo text */}
      <div className="absolute right-5 top-10 flex flex-col items-center text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.5)]">
        <Coffee size={30} strokeWidth={1.2} className="mb-1 opacity-90" />
        <span className="font-moul text-[34px] leading-[1.15] tracking-wide">
          ដេគាហ្វេ
        </span>
      </div>

      {/* Contact bar near bottom */}
      <div className="absolute bottom-6 left-0 right-0 flex items-center justify-between px-6 text-sm font-medium text-white drop-shadow">
        <div className="flex items-center gap-2">
          <TelegramIcon size={16} className="text-white" />
          <span>016 786079</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-moul text-base">ដេគាហ្វេ</span>
          <FacebookIcon size={16} className="text-white" />
        </div>
      </div>
    </div>
  );
}
