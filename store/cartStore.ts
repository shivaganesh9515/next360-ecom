'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/types/product';
import { CartItem } from '@/types/cart';

interface CartStore {
  items: CartItem[];
  coupon: string | null;
  isDrawerOpen: boolean;
  addItem: (product: Product, qty: number, weight: string) => void;
  removeItem: (productId: string) => void;
  updateQty: (productId: string, qty: number) => void;
  applyCoupon: (code: string) => void;
  removeCoupon: () => void;
  toggleDrawer: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      coupon: null,
      isDrawerOpen: false,

      addItem: (product, qty, weight) => {
        const { items } = get();
        const existingIndex = items.findIndex(
          (item) => item.product.id === product.id && item.selectedWeight === weight
        );

        if (existingIndex > -1) {
          const updated = [...items];
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: updated[existingIndex].quantity + qty,
          };
          set({ items: updated });
        } else {
          set({
            items: [...items, { product, quantity: qty, selectedWeight: weight }],
          });
        }
      },

      removeItem: (productId) => {
        set({ items: get().items.filter((item) => item.product.id !== productId) });
      },

      updateQty: (productId, qty) => {
        if (qty <= 0) {
          get().removeItem(productId);
          return;
        }
        set({
          items: get().items.map((item) =>
            item.product.id === productId ? { ...item, quantity: qty } : item
          ),
        });
      },

      applyCoupon: (code) => set({ coupon: code }),
      removeCoupon: () => set({ coupon: null }),
      toggleDrawer: () => set({ isDrawerOpen: !get().isDrawerOpen }),
      openDrawer: () => set({ isDrawerOpen: true }),
      closeDrawer: () => set({ isDrawerOpen: false }),
      clearCart: () => set({ items: [], coupon: null }),

      getTotal: () => {
        return get().items.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        );
      },

      getItemCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },
    }),
    {
      name: 'Next360-cart',
      partialize: (state) => ({
        items: state.items,
        coupon: state.coupon,
      }),
    }
  )
);
