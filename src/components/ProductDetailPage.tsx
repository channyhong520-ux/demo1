import { useMemo, useState } from "react";
import { ArrowLeft, Minus, Plus, ShoppingCart } from "lucide-react";
import type { Product } from "../data/products";
import { formatPrice } from "../data/products";
import { toppingOptions, sugarOptions, iceOptions } from "../data/options";

interface Props {
  product: Product;
  onBack: () => void;
  onAddToCart: (payload: {
    product: Product;
    quantity: number;
    toppings: string[];
    sugar: string;
    ice: string;
    note: string;
    total: number;
  }) => void;
}

export default function ProductDetailPage({ product, onBack, onAddToCart }: Props) {
  const [quantity, setQuantity] = useState(1);
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const [sugar, setSugar] = useState(sugarOptions[2]?.id ?? sugarOptions[0].id);
  const [ice, setIce] = useState(iceOptions[0].id);
  const [note, setNote] = useState("");

  const toppingsTotal = useMemo(
    () =>
      toppingOptions
        .filter((t) => selectedToppings.includes(t.id))
        .reduce((sum, t) => sum + t.price, 0),
    [selectedToppings],
  );

  const total = (product.price + toppingsTotal) * quantity;

  const toggleTopping = (id: string) => {
    setSelectedToppings((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id],
    );
  };

  const handleAddToCart = () => {
    onAddToCart({
      product,
      quantity,
      toppings: selectedToppings,
      sugar,
      ice,
      note,
      total,
    });
  };

  return (
    <div className="relative flex h-full max-h-screen flex-1 flex-col overflow-hidden bg-[#eaf5ef]">
      <div className="flex-1 overflow-y-auto pb-28">
        {/* image header */}
        <div className="relative h-72 w-full shrink-0">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
          <button
            onClick={onBack}
            aria-label="Back"
            className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-sm"
          >
            <ArrowLeft size={18} />
          </button>
        </div>

        {/* title + quantity stepper */}
        <div className="flex items-center justify-between px-4 pt-4">
          <h1 className="text-base font-bold text-slate-800">{product.name}</h1>
          <div className="flex items-center gap-3 rounded-full border border-slate-300 bg-white px-2 py-1">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              aria-label="Decrease quantity"
              className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-slate-600"
            >
              <Minus size={14} />
            </button>
            <span className="min-w-[16px] text-center text-sm font-semibold text-slate-800">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              aria-label="Increase quantity"
              className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-teal-600 text-teal-600"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>

        {/* toppings */}
        <div className="mt-4 px-4">
          <h2 className="mb-2 text-sm font-bold text-slate-700">បន្ថែម</h2>
          <div className="space-y-2.5">
            {toppingOptions.map((t) => (
              <label
                key={t.id}
                className="flex cursor-pointer items-center justify-between text-sm text-slate-700"
              >
                <span className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={selectedToppings.includes(t.id)}
                    onChange={() => toggleTopping(t.id)}
                    className="h-4 w-4 rounded border-slate-400 accent-teal-600"
                  />
                  {t.label}
                </span>
                <span className="text-slate-500">៛ {formatPrice(t.price)}</span>
              </label>
            ))}
          </div>
        </div>

        {/* sugar */}
        <div className="mt-5 px-4">
          <h2 className="mb-2 text-sm font-bold text-slate-700">ស្ករ</h2>
          <div className="space-y-2.5">
            {sugarOptions.map((s) => (
              <label
                key={s.id}
                className="flex cursor-pointer items-center justify-between text-sm text-slate-700"
              >
                <span className="flex items-center gap-2.5">
                  <input
                    type="radio"
                    name="sugar"
                    checked={sugar === s.id}
                    onChange={() => setSugar(s.id)}
                    className="h-4 w-4 border-slate-400 accent-teal-600"
                  />
                  {s.label}
                </span>
                <span className="text-slate-500">៛ {formatPrice(s.price)}</span>
              </label>
            ))}
          </div>
        </div>

        {/* ice */}
        <div className="mt-5 px-4">
          <h2 className="mb-2 text-sm font-bold text-slate-700">ទឹកកក</h2>
          <div className="space-y-2.5">
            {iceOptions.map((i) => (
              <label
                key={i.id}
                className="flex cursor-pointer items-center justify-between text-sm text-slate-700"
              >
                <span className="flex items-center gap-2.5">
                  <input
                    type="radio"
                    name="ice"
                    checked={ice === i.id}
                    onChange={() => setIce(i.id)}
                    className="h-4 w-4 border-slate-400 accent-teal-600"
                  />
                  {i.label}
                </span>
                <span className="text-slate-500">៛ {formatPrice(i.price)}</span>
              </label>
            ))}
          </div>
        </div>

        {/* note */}
        <div className="mt-5 px-4">
          <h2 className="mb-2 text-sm font-bold text-slate-700">ចំណាំ</h2>
          <input
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="សរសេរចំណាំបន្ថែម..."
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 shadow-sm outline-none placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* bottom summary bar */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between gap-3 bg-slate-900 px-4 py-3">
        <div className="text-white">
          <p className="text-[11px] text-slate-300">ថ្លៃ</p>
          <p className="text-base font-bold">៛ {formatPrice(total)}</p>
        </div>
        <button
          onClick={handleAddToCart}
          className="flex items-center gap-2 rounded-full bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm active:bg-teal-700"
        >
          <ShoppingCart size={16} />
          បន្ថែមទៅកន្ត្រក
        </button>
      </div>
    </div>
  );
}
