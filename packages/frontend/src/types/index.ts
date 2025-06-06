// Telegram WebApp types
export interface TelegramWebApp {
  ready: () => void;
  expand: () => void;
  close: () => void;
  MainButton: {
    text: string;
    color: string;
    textColor: string;
    show: () => void;
    hide: () => void;
    setText: (text: string) => void;
    onClick: (callback: () => void) => void;
    offClick: (callback: () => void) => void;
  };
  BackButton: {
    show: () => void;
    hide: () => void;
    onClick: (callback: () => void) => void;
    offClick: (callback: () => void) => void;
  };
  HapticFeedback: {
    impactOccurred: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => void;
    notificationOccurred: (type: 'error' | 'success' | 'warning') => void;
    selectionChanged: () => void;
  };
  initDataUnsafe: {
    user?: {
      id: number;
      first_name: string;
      last_name?: string;
      username?: string;
      language_code?: string;
    };
  };
  colorScheme: 'light' | 'dark';
  themeParams: {
    bg_color: string;
    text_color: string;
    hint_color: string;
    link_color: string;
    button_color: string;
    button_text_color: string;
  };
}

declare global {
  interface Window {
    Telegram: {
      WebApp: TelegramWebApp;
    };
  }
}

// Product types
export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  images: string[];
  description: string;
  sizes: Size[];
  category: Category;
  subcategory?: string;
  colors: Color[];
  rating: number;
  reviewsCount: number;
  deliveryTime: {
    min: number; // hours
    max: number; // hours
  };
  sellerId: string;
  sellerLocation: Location;
  inStock: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Size {
  id: string;
  name: string; // XS, S, M, L, XL, XXL
  available: boolean;
  measurements?: {
    chest?: number;
    waist?: number;
    hips?: number;
    length?: number;
  };
}

export interface Color {
  id: string;
  name: string;
  hex: string;
  available: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  subcategories?: Subcategory[];
}

export interface Subcategory {
  id: string;
  name: string;
  slug: string;
}

// Cart & Order types
export interface CartItem {
  productId: string;
  product: Product;
  sizeId: string;
  colorId: string;
  quantity: number;
  addedAt: string;
}

export interface Order {
  id: string;
  items: OrderItem[];
  status: OrderStatus;
  total: number;
  deliveryFee: number;
  subtotal: number;
  delivery: DeliveryInfo;
  payment: PaymentInfo;
  createdAt: string;
  updatedAt: string;
  estimatedDelivery: string;
  courier?: CourierInfo;
  tracking?: TrackingInfo[];
}

export interface OrderItem {
  productId: string;
  product: Product;
  sizeId: string;
  sizeName: string;
  colorId: string;
  colorName: string;
  quantity: number;
  price: number;
  sellerId: string;
}

export type OrderStatus = 
  | 'pending'
  | 'confirmed' 
  | 'preparing'
  | 'courier_assigned'
  | 'picked_up'
  | 'in_transit'
  | 'delivered'
  | 'cancelled';

export interface DeliveryInfo {
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  district: string;
  instructions?: string;
  timeSlot?: {
    from: string;
    to: string;
  };
}

export interface PaymentInfo {
  method: 'telegram_payments' | 'card' | 'apple_pay' | 'google_pay';
  status: 'pending' | 'paid' | 'failed' | 'refunded';
  transactionId?: string;
}

export interface CourierInfo {
  id: string;
  name: string;
  phone: string;
  photo?: string;
  rating: number;
  currentLocation?: {
    lat: number;
    lng: number;
  };
  vehicle: 'foot' | 'bike' | 'car' | 'motorcycle';
}

export interface TrackingInfo {
  status: OrderStatus;
  timestamp: string;
  description: string;
  location?: {
    lat: number;
    lng: number;
  };
}

// User types
export interface User {
  id: string;
  telegramId: number;
  firstName: string;
  lastName?: string;
  username?: string;
  phoneNumber?: string;
  email?: string;
  addresses: Address[];
  preferences: UserPreferences;
  orders: string[]; // order IDs
  favorites: string[]; // product IDs
  createdAt: string;
}

export interface Address {
  id: string;
  label: string; // Дом, Работа, etc.
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  district: string;
  isDefault: boolean;
  instructions?: string;
}

export interface UserPreferences {
  notifications: {
    orderUpdates: boolean;
    promotions: boolean;
    newArrivals: boolean;
  };
  theme: 'dark' | 'light' | 'auto';
  language: 'ru' | 'en';
  currency: 'RUB' | 'USD' | 'EUR';
}

// Seller types
export interface Seller {
  id: string;
  name: string;
  description: string;
  logo?: string;
  rating: number;
  reviewsCount: number;
  location: Location;
  isVerified: boolean;
  responseTime: number; // minutes
  products: string[]; // product IDs
  stats: SellerStats;
}

export interface SellerStats {
  totalSales: number;
  averageDeliveryTime: number; // hours
  returnRate: number; // percentage
  satisfaction: number; // percentage
}

export interface Location {
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  district: string;
}

// Filter & Search types
export interface ProductFilters {
  category?: string;
  subcategory?: string;
  priceRange?: [number, number];
  sizes?: string[];
  colors?: string[];
  brands?: string[];
  rating?: number;
  deliveryTime?: number; // max hours
  inStock?: boolean;
  discount?: boolean;
}

export interface SearchQuery {
  query: string;
  filters: ProductFilters;
  sortBy: 'relevance' | 'price_low' | 'price_high' | 'rating' | 'delivery_time' | 'newest';
  page: number;
  limit: number;
}

export interface SearchResult {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
  suggestions?: string[];
}

// Review types
export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userPhoto?: string;
  rating: number;
  comment: string;
  photos?: string[];
  size: string;
  color: string;
  fit: 'small' | 'true_to_size' | 'large';
  helpful: number;
  createdAt: string;
  verified: boolean; // purchased
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// Store state types
export interface AppState {
  user: User | null;
  cart: CartItem[];
  favorites: string[];
  currentOrder: Order | null;
  isLoading: boolean;
  error: string | null;
}

import { ReactNode } from 'react';

// Component props types
export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
} 