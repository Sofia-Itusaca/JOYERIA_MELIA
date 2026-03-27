// Types for Joyas Meliá E-commerce

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'rings' | 'necklaces' | 'bracelets' | 'earrings' | 'watches' | 'for-him' | 'babys';
  materials: Array<{
    type: 'gold' | 'silver' | 'stainless-steel' | 'copper' | 'bronze' | 'rose-gold' | 'gems';
    images: string[];
  }>;
  sizes?: string[]; // For rings
  lengths?: number[]; // For necklaces (in cm)
  stock: number;
  active: boolean;
  soldCount: number;
  reviews: Review[];
  targetGender: 'ella' | 'ellos' | 'babys' | 'unisex';
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  isAdmin: boolean;
}

export interface CartItem {
  productId: string;
  product: Product;
  quantity: number;
  selectedMaterial: string;
  selectedSize?: string;
  selectedLength?: number;
}

export interface Order {
  id: string;
  userId: string;
  userName: string;
  userPhone: string;
  userAddress: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
}

export interface StoreInfo {
  welcomeTitle: string;
  welcomeText: string;
  aboutText: string;
  materialsText: string;
  storeImages: string[];
  address: string;
  phone: string;
  whatsapp: string;
  schedule: string;
  socialMedia: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
}
