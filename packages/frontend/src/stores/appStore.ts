import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { CartItem, User, Order } from '@/types';

interface AppState {
  // User state
  user: User | null;
  isAuthenticated: boolean;
  
  // Cart state
  cart: CartItem[];
  cartTotal: number;
  cartItemsCount: number;
  
  // Favorites
  favorites: string[];
  
  // Current order
  currentOrder: Order | null;
  
  // UI state
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setUser: (user: User | null) => void;
  
  // Cart actions
  addToCart: (item: Omit<CartItem, 'addedAt'>) => void;
  removeFromCart: (productId: string, sizeId: string, colorId: string) => void;
  updateCartItemQuantity: (productId: string, sizeId: string, colorId: string, quantity: number) => void;
  clearCart: () => void;
  
  // Favorites actions
  addToFavorites: (productId: string) => void;
  removeFromFavorites: (productId: string) => void;
  toggleFavorite: (productId: string) => void;
  
  // Order actions
  setCurrentOrder: (order: Order | null) => void;
  
  // UI actions
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

const calculateCartTotal = (cart: CartItem[]): number => {
  return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
};

const calculateCartItemsCount = (cart: CartItem[]): number => {
  return cart.reduce((count, item) => count + item.quantity, 0);
};

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        user: null,
        isAuthenticated: false,
        cart: [],
        cartTotal: 0,
        cartItemsCount: 0,
        favorites: [],
        currentOrder: null,
        isLoading: false,
        error: null,

        // User actions
        setUser: (user) => 
          set({ 
            user, 
            isAuthenticated: !!user 
          }, false, 'setUser'),

        // Cart actions
        addToCart: (newItem) => 
          set((state) => {
            const existingItemIndex = state.cart.findIndex(
              item => 
                item.productId === newItem.productId &&
                item.sizeId === newItem.sizeId &&
                item.colorId === newItem.colorId
            );

            let updatedCart;
            
            if (existingItemIndex >= 0) {
              // Увеличиваем количество существующего товара
              updatedCart = state.cart.map((item, index) =>
                index === existingItemIndex
                  ? { ...item, quantity: item.quantity + newItem.quantity }
                  : item
              );
            } else {
              // Добавляем новый товар
              const cartItem: CartItem = {
                ...newItem,
                addedAt: new Date().toISOString(),
              };
              updatedCart = [...state.cart, cartItem];
            }

            return {
              cart: updatedCart,
              cartTotal: calculateCartTotal(updatedCart),
              cartItemsCount: calculateCartItemsCount(updatedCart),
            };
          }, false, 'addToCart'),

        removeFromCart: (productId, sizeId, colorId) =>
          set((state) => {
            const updatedCart = state.cart.filter(
              item => !(
                item.productId === productId &&
                item.sizeId === sizeId &&
                item.colorId === colorId
              )
            );
            
            return {
              cart: updatedCart,
              cartTotal: calculateCartTotal(updatedCart),
              cartItemsCount: calculateCartItemsCount(updatedCart),
            };
          }, false, 'removeFromCart'),

        updateCartItemQuantity: (productId, sizeId, colorId, quantity) =>
          set((state) => {
            if (quantity <= 0) {
              // Удаляем товар если количество 0
              const updatedCart = state.cart.filter(
                item => !(
                  item.productId === productId &&
                  item.sizeId === sizeId &&
                  item.colorId === colorId
                )
              );
              
              return {
                cart: updatedCart,
                cartTotal: calculateCartTotal(updatedCart),
                cartItemsCount: calculateCartItemsCount(updatedCart),
              };
            }

            const updatedCart = state.cart.map(item =>
              item.productId === productId &&
              item.sizeId === sizeId &&
              item.colorId === colorId
                ? { ...item, quantity }
                : item
            );

            return {
              cart: updatedCart,
              cartTotal: calculateCartTotal(updatedCart),
              cartItemsCount: calculateCartItemsCount(updatedCart),
            };
          }, false, 'updateCartItemQuantity'),

        clearCart: () =>
          set({
            cart: [],
            cartTotal: 0,
            cartItemsCount: 0,
          }, false, 'clearCart'),

        // Favorites actions
        addToFavorites: (productId) =>
          set((state) => ({
            favorites: state.favorites.includes(productId)
              ? state.favorites
              : [...state.favorites, productId]
          }), false, 'addToFavorites'),

        removeFromFavorites: (productId) =>
          set((state) => ({
            favorites: state.favorites.filter(id => id !== productId)
          }), false, 'removeFromFavorites'),

        toggleFavorite: (productId) =>
          set((state) => ({
            favorites: state.favorites.includes(productId)
              ? state.favorites.filter(id => id !== productId)
              : [...state.favorites, productId]
          }), false, 'toggleFavorite'),

        // Order actions
        setCurrentOrder: (order) =>
          set({ currentOrder: order }, false, 'setCurrentOrder'),

        // UI actions
        setLoading: (loading) =>
          set({ isLoading: loading }, false, 'setLoading'),

        setError: (error) =>
          set({ error }, false, 'setError'),
      }),
      {
        name: 'rail-x-storage',
        partialize: (state) => ({
          user: state.user,
          cart: state.cart,
          favorites: state.favorites,
        }),
      }
    ),
    {
      name: 'Rail-X Store',
    }
  )
);

// Селекторы для оптимизации
export const useUser = () => useAppStore(state => state.user);
export const useCart = () => useAppStore(state => ({
  items: state.cart,
  total: state.cartTotal,
  itemsCount: state.cartItemsCount,
}));
export const useFavorites = () => useAppStore(state => state.favorites);
export const useCurrentOrder = () => useAppStore(state => state.currentOrder);
export const useLoading = () => useAppStore(state => state.isLoading);
export const useError = () => useAppStore(state => state.error); 