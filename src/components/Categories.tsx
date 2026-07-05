import { ChevronRight } from "lucide-react";
import { categories, products, formatPrice } from "../data/products";

interface Props {
  onSelectCategory: (categoryId: string) => void;
}

const displayCategories = categories.filter((c) => c.id !== "all");

export default function Categories({ onSelectCategory }: Props) {
  return (
    <div className="px-4 pt-6">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-base font-extrabold text-slate-800">
          ប្រភេទមុខទំនិញ
        </h2>
        <button
          onClick={() => onSelectCategory("all")}
          className="flex items-center gap-0.5 text-xs font-medium text-slate-400"
        >
          មើលទាំងអស់
          <ChevronRight size={14} />
        </button>
      </div>

      <div className="mb-3 grid grid-cols-3 gap-2 text-center text-xs font-bold text-teal-700">
        {displayCategories.map((c) => (
          <button
            key={c.id}
            onClick={() => onSelectCategory(c.id)}
            className="truncate"
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-3">
        {displayCategories.map((c) => {
          const product = products.find((p) => p.categoryId === c.id);
          if (!product) return null;
          return (
            <button
              key={c.id}
              onClick={() => onSelectCategory(c.id)}
              className="overflow-hidden rounded-2xl bg-white text-left shadow-sm"
            >
              <div className="relative h-24 w-full">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
                <span className="absolute bottom-1.5 right-1.5 rounded-full bg-teal-800/90 px-1.5 py-0.5 text-[10px] font-bold text-white">
                  ៛{formatPrice(product.price)}
                </span>
              </div>
              <p className="px-1.5 py-2 text-center text-[11px] font-medium leading-tight text-slate-700">
                {product.name}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
