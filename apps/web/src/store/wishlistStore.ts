import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product } from '@next360/types'

interface WishlistStore {
  items:           Product[]
  toggleWishlist:  (product: Product) => void
  isWishlisted:    (productId: string) => boolean
  clearWishlist:   () => void
  getCount:        () => number
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      toggleWishlist: (product) =>
        set((state) => {
          const exists = state.items.find((i) => i.id === product.id)
          return {
            items: exists
              ? state.items.filter((i) => i.id !== product.id)
              : [...state.items, product],
          }
        }),

      isWishlisted: (productId) =>
        get().items.some((i) => i.id === productId),

      clearWishlist: () => set({ items: [] }),

      getCount: () => get().items.length,
    }),
    {
      name: 'next360-wishlist',
    }
  )
)
