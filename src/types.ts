import type { Product } from "./data/products";

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  toppings: string[];
  sugar: string;
  ice: string;
  note: string;
  unitPrice: number;
}
