export interface Product {
  id: string;
  name: string;
  categoryId: string;
  price: number;
  image: string;
  multipleToppings?: boolean;
}

export interface Category {
  id: string;
  label: string;
  shortLabel: string;
}

export const categories: Category[] = [
  { id: "all", label: "ទាំងអស់", shortLabel: "ទាំងអស់" },
  { id: "coffee", label: "កាហ្វេ", shortLabel: "កាហ្វេ" },
  { id: "milk", label: "ទឹកដោះគោ", shortLabel: "ទឹកដោះគោ" },
  { id: "macha", label: "ម៉ាឆា", shortLabel: "ម៉ាឆា" },
  { id: "tea", label: "តែ", shortLabel: "តែ" },
  { id: "frappe", label: "ក្រឡុក", shortLabel: "ក្រឡុក" },
  { id: "beverage", label: "ភេសជ្ជៈផ្សេងៗ", shortLabel: "ភេសជ្ជៈផ្សេងៗ" },
  { id: "other", label: "ផ្សេងៗ", shortLabel: "ផ្សេងៗ" },
];

export const products: Product[] = [

  // Coffee

  {
    id: "coffee-1",
    name: "កាហ្វេហ្វីនឡាតេ",
    categoryId: "coffee",
    price: 4000,
    image: "/images/IMG_0388.JPG",
    multipleToppings: true,
  },
  // {
  //   id: "coffee-2",
  //   name: "កាហ្វេទឹកដោះគោ",
  //   categoryId: "coffee",
  //   price: 6000,
  //   image: "/images/drink-coffee.jpg",
  //   multipleToppings: true,
  // },
  // {
  //   id: "coffee-3",
  //   name: "កាហ្វេទឹកកក",
  //   categoryId: "coffee",
  //   price: 5000,
  //   image: "/images/drink-coffee.jpg",
  // },

  // Milk

  // {
  //   id: "milk-1",
  //   name: "ទឹកដោះគោ",
  //   categoryId: "milk",
  //   price: 5000,
  //   image: "/images/drink-tea.jpg",
  // },

  // Macha

  {
    id: "macha-1",
    name: "ម៉ាឆាដូងគ្រីម",
    categoryId: "macha",
    price: 10000,
    image: "/images/IMG_0638.JPG",
  },
  {
    id: "macha-2",
    name: "ម៉ាឆាស្ទ្រប៊ឺរី",
    categoryId: "macha",
    price: 8000,
    image: "/images/IMG_0374.JPG",
  },
  {
    id: "macha-3",
    name: "ម៉ាឆាឡាតេគ្រីម",
    categoryId: "macha",
    price: 7500,
    image: "/images/IMG_0127.JPG",
  },

  // Tea

  {
    id: "tea-1",
    name: "តែបៃតង/ ក្រហមទឹកឃ្មុំក្រូចឆ្មា",
    categoryId: "tea",
    price: 4000,
    image: "/images/greetea1.PNG",
    multipleToppings: true,
  },
  {
    id: "tea-2",
    name: "តែបៃតង/ ក្រហមក្រូចឆ្មា",
    categoryId: "tea",
    price: 3500,
    image: "/images/IMG_7844.DNG",
    multipleToppings: true,
  },
  {
    id: "tea-3",
    name: "តែបៃតង/តែក្រហមឡាតេ",
    categoryId: "tea",
    price: 6000,
    image: "/images/IMG_0437.JPG",
    multipleToppings: true,
  },
  {
    id: "tea-4",
    name: "តែបៃតង/ តែក្រហមទឹកដោះគោ",
    categoryId: "tea",
    price: 6000,
    image: "/images/IMG_0446.JPG",
    multipleToppings: true,
  },
  {
    id: "tea-5",
    name: "Coffee Milk Red Tea/ Green Tea ",
    categoryId: "tea",
    price: 6000,
    image: "/images/IMG_0424.JPG",
    multipleToppings: true,
  },

  //Frappe

  // {
  //   id: "frappe-1",
  //   name: "ក្រឡុកកាហ្វេ",
  //   categoryId: "frappe",
  //   price: 7000,
  //   image: "/images/drink-frappe.jpg",
  //   multipleToppings: true,
  // },
  // {
  //   id: "frappe-2",
  //   name: "ក្រឡុកម៉ាតឆា",
  //   categoryId: "frappe",
  //   price: 7000,
  //   image: "/images/drink-frappe.jpg",
  //   multipleToppings: true,
  // },
  // {
  //   id: "frappe-3",
  //   name: "ក្រឡុកសូកូឡា",
  //   categoryId: "frappe",
  //   price: 7000,
  //   image: "/images/drink-frappe.jpg",
  // },

  // Beverage

  // {
  //   id: "beverage-1",
  //   name: "ភេសជ្ជៈផ្សេងៗ",
  //   categoryId: "beverage",
  //   price: 7000,
  //   image: "/images/drink-frappe.jpg",
  // },

  // Other

  {
    id: "other-1",
    name: "បារី Winston",
    categoryId: "other",
    price: 3500,
    image: "https://asadsmoking.com/wp-content/uploads/2025/10/Winston-Compact-Blue-Cigarettes-Asad-Smoking-Center-UAE.webp",
  },
  {
    id: "other-2",
    name: "បារី MEVIUS",
    categoryId: "other",
    price: 9000,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKQvHFydUq65hzLx9XkAndFq6oxRRcEAJwzmW5zsL1b9lal1mzTTPC9l4&s=10",
  },
  {
    id: "other-3",
    name: "បារី ESSE",
    categoryId: "other",
    price: 5500,
    image: "https://dukaan.b-cdn.net/500x500/webp/media/6461818a-5c92-42c5-8b3d-172021c1a344.webp",
  },
  // {
  //   id: "other-4",
  //   name: "នំសណ្តែករស់ជាតិខ្ទឹម",
  //   categoryId: "other",
  //   price: 3000,
  //   image: "/images/drink-tea.jpg",
  // },
  // {
  //   id: "other-5",
  //   name: "នំសណ្តែករស់ជាតិក្តាម",
  //   categoryId: "other",
  //   price: 3000,
  //   image: "/images/drink-tea2.jpg",
  // },
];

export function formatPrice(price: number) {
  return price.toLocaleString("en-US");
}
