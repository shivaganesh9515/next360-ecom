'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/types/product';

interface WishlistStore {
  items: Product[];
  toggleWishlist: (product: Product) => void;
  isWishlisted: (id: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      toggleWishlist: (product) => {
        const { items } = get();
        const exists = items.find((item) => item.id === product.id);
        if (exists) {
          set({ items: items.filter((item) => item.id !== product.id) });
        } else {
          set({ items: [...items, product] });
        }
      },

      isWishlisted: (id) => {
        return get().items.some((item) => item.id === id);
      },

      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: 'Next360-wishlist',
    }
  )
);
