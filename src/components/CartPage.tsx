import { useState } from "react";
import {
  ArrowLeft,
  Search,
  ShoppingCart,
  CheckCircle2,
  Trash2,
  Minus,
  Plus,
  Pencil,
  ArrowUpRight,
} from "lucide-react";
import type { CartItem } from "../types";
import { formatPrice } from "../data/products";
import { categories } from "../data/products";

interface Props {
  items: CartItem[];
  onBack: () => void;
  onClearAll: () => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onUpdateNote: (id: string, note: string) => void;
  onCheckout: () => void;
}

export default function CartPage({
  items,
  onBack,
  onClearAll,
  onUpdateQuantity,
  onUpdateNote,
  onCheckout,
}: Props) {
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [draftNote, setDraftNote] = useState("");

  const total = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  const startEditingNote = (item: CartItem) => {
    setEditingNoteId(item.id);
    setDraftNote(item.note);
  };

  const saveNote = (id: string) => {
    onUpdateNote(id, draftNote);
    setEditingNoteId(null);
  };

  const categoryLabel = (categoryId: string) =>
    categories.find((c) => c.id === categoryId)?.label ?? "";

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
          ទំនិញដែលបានក្នុងកន្ត្រក
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
          <div className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full bg-teal-700 text-white shadow-md">
            <ShoppingCart size={16} />
          </div>
          <div className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full border-2 border-teal-600 bg-white text-teal-700">
            <CheckCircle2 size={16} />
          </div>
        </div>
      </div>

      {/* clear all */}
      {items.length > 0 && (
        <div className="mt-3 flex justify-end px-4">
          <button
            onClick={onClearAll}
            className="flex items-center gap-1 text-xs font-medium text-red-500"
          >
            <Trash2 size={13} />
            លុបទំនិញដែលបានក្នុងកន្ត្រក
          </button>
        </div>
      )}

      {/* cart items */}
      <div className="mt-3 flex-1 overflow-y-auto px-4 pb-24">
        {items.length === 0 ? (
          <div className="mt-16 flex flex-col items-center gap-2 text-center text-slate-400">
            <ShoppingCart size={40} strokeWidth={1.2} />
            <p className="text-sm">កន្ត្រកទំនិញរបស់អ្នកនៅទទេ</p>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 rounded-2xl bg-white p-3 shadow-sm"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="h-16 w-16 shrink-0 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-800">
                    {item.product.name}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    {categoryLabel(item.product.categoryId)}
                  </p>

                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-sm font-bold text-teal-700">
                      ៛ {formatPrice(item.unitPrice)}
                    </p>
                    <div className="flex items-center gap-2 rounded-full border border-slate-300 bg-white px-1.5 py-0.5">
                      <button
                        onClick={() =>
                          onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))
                        }
                        aria-label="Decrease quantity"
                        className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-slate-600"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="min-w-[14px] text-center text-sm font-semibold text-slate-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                        className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-teal-600 text-teal-600"
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                  </div>

                  {editingNoteId === item.id ? (
                    <div className="mt-2 flex items-center gap-2">
                      <input
                        autoFocus
                        value={draftNote}
                        onChange={(e) => setDraftNote(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && saveNote(item.id)}
                        placeholder="សរសេរចំណាំ..."
                        className="flex-1 rounded-lg border border-slate-200 px-2 py-1 text-xs text-slate-700 outline-none"
                      />
                      <button
                        onClick={() => saveNote(item.id)}
                        className="text-xs font-semibold text-teal-700"
                      >
                        រក្សាទុក
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => startEditingNote(item)}
                      className="mt-2 flex items-center gap-1 text-xs text-slate-400"
                    >
                      ចំណាំ{item.note ? `: ${item.note}` : ""}
                      <Pencil size={11} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* bottom bar */}
      {items.length > 0 && (
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between gap-3 bg-slate-900 px-4 py-3">
          <div className="text-white">
            <p className="text-[11px] text-slate-300">ប្រាក់សរុប</p>
            <p className="text-base font-bold">៛ {formatPrice(total)}</p>
          </div>
          <button
            onClick={onCheckout}
            className="flex items-center gap-1.5 rounded-full bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm active:bg-teal-700"
          >
            ទូទាត់ប្រាក់
            <ArrowUpRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
