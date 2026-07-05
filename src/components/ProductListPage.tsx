import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ShoppingCart,
  Search,
  CheckCircle2,
  Clock,
  SlidersHorizontal,
  Menu,
  ArrowUp,
} from "lucide-react";
import { categories, products, formatPrice } from "../data/products";

interface Props {
  initialCategoryId: string;
  onBack: () => void;
  onSelectProduct: (productId: string) => void;
}

export default function ProductListPage({ initialCategoryId, onBack, onSelectProduct }: Props) {
  const [activeCategory, setActiveCategory] = useState(initialCategoryId);
  const [query, setQuery] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const activeCat = categories.find((c) => c.id === activeCategory) ?? categories[0];

  const filtered = products.filter((p) => {
    const matchesCategory = activeCategory === "all" || p.categoryId === activeCategory;
    const matchesQuery = p.name.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => setShowScrollTop(el.scrollTop > 200);
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative flex h-full max-h-screen flex-1 flex-col bg-[#eaf5ef]">
      {/* Top header */}
      <div className="flex items-center justify-between px-4 pt-4">
        <button
          onClick={onBack}
          aria-label="Back"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-700 shadow-sm"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-bold text-slate-800">NT26 Coffee</h1>
        <button
          aria-label="Cart"
          className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-teal-600 text-teal-700"
        >
          <ShoppingCart size={18} />
        </button>
      </div>

      {/* Step indicator */}
      <div className="mt-4 px-8">
        <div className="relative flex items-center justify-between">
          <div className="absolute left-5 right-5 top-1/2 h-[2px] -translate-y-1/2 border-t-2 border-dashed border-teal-600/40" />
          <div className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full bg-teal-700 text-white shadow-md">
            <Search size={16} />
          </div>
          <div className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full border-2 border-teal-600 bg-white text-teal-700">
            <ShoppingCart size={16} />
          </div>
          <div className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full border-2 border-teal-600 bg-white text-teal-700">
            <CheckCircle2 size={16} />
          </div>
        </div>
      </div>

      {/* helper text */}
      <p className="mt-3 px-4 text-center text-[11px] leading-snug text-slate-400">
        អ្នកបានជ្រើសរើសម៉ឺនុយ សម្រាប់ការបញ្ជាទិញលើកនេះ ដូចខាងក្រោម
      </p>

      <div className="mt-2 flex items-center justify-center gap-1.5 text-xs font-medium text-teal-700">
        <Clock size={13} />
        <span>បានពេលបើក (06:00 → 18:00)</span>
      </div>

      {/* search bar */}
      <div className="px-4 pt-3">
        <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2.5 shadow-sm">
          <Search size={16} className="text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ស្វែងរកទំនិញ"
            className="flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
          />
          <SlidersHorizontal size={16} className="text-slate-400" />
        </div>
      </div>

      {/* category tabs */}
      <div className="mt-3 flex items-center gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <button className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-slate-500 shadow-sm">
          <Menu size={16} />
        </button>
        {categories.map((cat) => {
          const isActive = cat.id === activeCategory;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                isActive
                  ? "bg-slate-900 text-white"
                  : "bg-white text-slate-600 shadow-sm"
              }`}
            >
              {cat.shortLabel}
            </button>
          );
        })}
      </div>

      {/* mini progress track */}
      <div className="mx-4 mt-2 h-1 rounded-full bg-slate-300/50">
        <div className="h-1 w-1/3 rounded-full bg-teal-600" />
      </div>

      {/* scrollable product area */}
      <div ref={scrollRef} className="mt-4 flex-1 overflow-y-auto px-4 pb-24">
        <h2 className="mb-3 text-base font-extrabold text-slate-800">
          {activeCat.label}
        </h2>

        {filtered.length === 0 ? (
          <p className="mt-10 text-center text-sm text-slate-400">
            មិនមានទំនិញនៅក្នុងប្រភេទនេះទេ
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filtered.map((p) => (
              <button
                key={p.id}
                onClick={() => onSelectProduct(p.id)}
                className="overflow-hidden rounded-2xl bg-white text-left shadow-sm"
              >
                <div className="relative h-32 w-full">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-full w-full object-cover"
                  />
                  {p.multipleToppings && (
                    <span className="absolute left-2 top-2 rounded-md bg-black/50 px-1.5 py-0.5 text-[9px] font-medium text-white">
                      Multiple Toppings
                    </span>
                  )}
                </div>
                <div className="px-2.5 py-2">
                  <p className="truncate text-[13px] font-semibold text-slate-700">
                    {p.name}
                  </p>
                  <p className="mt-0.5 text-sm font-bold text-teal-700">
                    ៛ {formatPrice(p.price)}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="absolute bottom-6 right-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg"
        >
          <ArrowUp size={18} />
        </button>
      )}
    </div>
  );
}
