import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ProfileCard from "./components/ProfileCard";
import Categories from "./components/Categories";
import Footer from "./components/Footer";
import BottomNav from "./components/BottomNav";
import ProductListPage from "./components/ProductListPage";
import ProductDetailPage from "./components/ProductDetailPage";
import CartPage from "./components/CartPage";
import CheckoutPage from "./components/CheckoutPage";
import PaymentPage from "./components/PaymentPage";
import { products } from "./data/products";
import { sendReceiptToTelegram } from "./lib/receipt";
import type { CartItem } from "./types";

type View =
  | { name: "home" }
  | { name: "list"; categoryId: string }
  | { name: "detail"; categoryId: string; productId: string }
  | { name: "cart"; categoryId: string }
  | { name: "checkout"; categoryId: string }
  | { name: "payment"; categoryId: string; amount: number };

export default function App() {
  const [view, setView] = useState<View>({ name: "home" });
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [toast, setToast] = useState<string | null>(null);

  const selectedProduct =
    view.name === "detail" ? products.find((p) => p.id === view.productId) ?? null : null;

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 1800);
  };

  const handleAddToCart = (
    categoryId: string,
    payload: {
      product: (typeof products)[number];
      quantity: number;
      toppings: string[];
      sugar: string;
      ice: string;
      note: string;
      total: number;
    },
  ) => {
    const unitPrice = payload.total / payload.quantity;
    const newItem: CartItem = {
      id: `${payload.product.id}-${Date.now()}`,
      product: payload.product,
      quantity: payload.quantity,
      toppings: payload.toppings,
      sugar: payload.sugar,
      ice: payload.ice,
      note: payload.note,
      unitPrice,
    };
    setCartItems((prev) => [...prev, newItem]);
    setView({ name: "cart", categoryId });
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  };

  const updateNote = (id: string, note: string) => {
    setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, note } : item)));
  };

  const clearCart = () => setCartItems([]);

  const handlePaymentSuccess = async (amount: number, items: CartItem[]) => {
    try {
      const orderNumber = `BN${Date.now()}`;
      await sendReceiptToTelegram(items, amount, orderNumber);
      showToast("បញ្ជាទិញរបស់អ្នកបានជោគជ័យ!");
    } catch (error) {
      console.error("Receipt sending failed", error);
      showToast("បញ្ជាទិញរបស់អ្នកបានជោគជ័យ!");
    }

    setCartItems([]);
    setView({ name: "home" });
  };

  return (
    <div className="min-h-screen w-full bg-slate-200 sm:py-6">
      <div className="relative mx-auto flex h-screen w-full max-w-md flex-col overflow-hidden bg-[#eaf5ef] shadow-2xl sm:h-[calc(100vh-3rem)] sm:rounded-3xl">
        {view.name === "home" && (
          <div className="flex h-full flex-col overflow-y-auto">
            <div className="relative">
              <Header />
              <Hero />
            </div>

            <div className="flex-1 px-4">
              <ProfileCard />
              <Categories
                onSelectCategory={(categoryId) => setView({ name: "list", categoryId })}
              />
              <Footer />
            </div>

            <BottomNav />
          </div>
        )}

        {view.name === "list" && (
          <ProductListPage
            initialCategoryId={view.categoryId}
            onBack={() => setView({ name: "home" })}
            onSelectProduct={(productId) =>
              setView({ name: "detail", categoryId: view.categoryId, productId })
            }
          />
        )}

        {view.name === "detail" && selectedProduct && (
          <ProductDetailPage
            product={selectedProduct}
            onBack={() => setView({ name: "list", categoryId: view.categoryId })}
            onAddToCart={(payload) => {
              handleAddToCart(view.categoryId, payload);
              showToast("បានបន្ថែមទៅកន្ត្រកដោយជោគជ័យ!");
            }}
          />
        )}

        {view.name === "cart" && (
          <CartPage
            items={cartItems}
            onBack={() => setView({ name: "list", categoryId: view.categoryId })}
            onClearAll={clearCart}
            onUpdateQuantity={updateQuantity}
            onUpdateNote={updateNote}
            onCheckout={() => setView({ name: "checkout", categoryId: view.categoryId })}
          />
        )}

        {view.name === "checkout" && (
          <CheckoutPage
            subtotal={cartItems.reduce(
              (sum, item) => sum + item.unitPrice * item.quantity,
              0,
            )}
            onBack={() => setView({ name: "cart", categoryId: view.categoryId })}
            onConfirm={() => {
              const amount = cartItems.reduce(
                (sum, item) => sum + item.unitPrice * item.quantity,
                0,
              );
              setView({ name: "payment", categoryId: view.categoryId, amount });
            }}
          />
        )}

        {view.name === "payment" && (
          <PaymentPage
            amount={view.amount}
            onBack={() => setView({ name: "checkout", categoryId: view.categoryId })}
            onPaid={() => {
              void handlePaymentSuccess(view.amount, cartItems);
            }}
          />
        )}

        {toast && (
          <div className="pointer-events-none absolute left-1/2 top-6 z-50 -translate-x-1/2 rounded-full bg-slate-900/95 px-4 py-2 text-xs font-medium text-white shadow-lg">
            {toast}
          </div>
        )}

        {cartCount > 0 && view.name === "home" && (
          <div className="pointer-events-none absolute bottom-24 right-6 z-40 flex h-6 min-w-6 items-center justify-center rounded-full bg-red-500 px-1 text-[11px] font-bold text-white">
            {cartCount}
          </div>
        )}
      </div>
    </div>
  );
}
