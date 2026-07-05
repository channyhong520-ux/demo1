export interface ToppingOption {
  id: string;
  label: string;
  price: number;
}

export interface ChoiceOption {
  id: string;
  label: string;
  price: number;
}

export const toppingOptions: ToppingOption[] = [
  { id: "pearl", label: "គុជ", price: 1000 },
  { id: "cream", label: "ក្រែម", price: 1000 },
];

export const sugarOptions: ChoiceOption[] = [
  { id: "sugar-0", label: "ស្ករ 0%", price: 0 },
  { id: "sugar-25", label: "ស្ករ 25%", price: 0 },
  { id: "sugar-50", label: "ស្ករ 50%", price: 0 },
  { id: "sugar-75", label: "ស្ករ 75%", price: 0 },
  { id: "sugar-100", label: "ស្ករ 100%", price: 0 },
];

export const iceOptions: ChoiceOption[] = [
  { id: "ice-normal", label: "ទឹកកកធម្មតា", price: 0 },
  { id: "ice-less", label: "ទឹកកកតិច", price: 0 },
  { id: "ice-none", label: "ទឹកកកឥតទឹកកក", price: 0 },
];
