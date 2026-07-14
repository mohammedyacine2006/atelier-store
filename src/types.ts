export interface ColorOption {
  label: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'handbags' | 'watches' | 'footwear' | 'jewelry';
  description: string;
  shortDescription: string;
  details: string[];
  materials: string;
  shipping: string;
  images: string[]; // images[0] is main image, full array for thumbnails
  colors: ColorOption[];
  sizes: string[];
  stock?: number;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  chosenColor: ColorOption;
  selectedColor?: ColorOption;
  chosenSize: string;
  quantity: number;
  image: string;
  cartImage?: string;
  category: string;
  stock?: number;
}

export type PageType = 'home' | 'catalog' | 'product' | 'cart' | 'success';

export interface OrderDetails {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  zipCode: string;
  cardNumber: string;
  receiptId: string;
  total: number;
  items: CartItem[];
}
