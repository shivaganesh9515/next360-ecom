import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem, Product, Coupon } from '@next360/types'
import { calculateDeliveryFee } from '@next360/utils'

interface CartStore {
  items:        CartItem[]
  coupon:       Coupon | null
  isDrawerOpen: boolean

  // Actions
  setCart:      (items: CartItem[], coupon: Coupon | null) => void
  addItem:      (item: CartItem) => void
  removeItem:   (cartItemId: string) => void
  updateQty:    (cartItemId: string, quantity: number) => void
  setCoupon:    (coupon: Coupon | null) => void
  
  toggleDrawer: () => void
  openDrawer:   () => void
  closeDrawer:  () => void
  clearCart:    () => void

  // Computed (not persisted)
  getSubtotal:    () => number
  getDiscount:    () => number
  getDeliveryFee: () => number
  getTotal:       () => number
  getItemCount:   () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      coupon: null,
      isDrawerOpen: false,

      setCart: (items, coupon) => set({ items, coupon }),

      addItem: (item) => {
        set((state) => {
          const existing = state.items.find(
            (i) => i.productId === item.productId && i.selectedWeight === item.selectedWeight
          )
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === existing.id
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            }
          }
          return { items: [...state.items, item] }
        })
      },

      removeItem: (cartItemId) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== cartItemId),
        })),

      updateQty: (cartItemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(cartItemId)
          return
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.id === cartItemId ? { ...i, quantity } : i
          ),
        }))
      },

      setCoupon: (coupon) => set({ coupon }),
      
      applyCoupon: (coupon: Coupon) => set({ coupon }),
      removeCoupon: () => set({ coupon: null }),
      
      toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),
      openDrawer: () => set({ isDrawerOpen: true }),
      closeDrawer: () => set({ isDrawerOpen: false }),
      clearCart: () => set({ items: [], coupon: null }),

      getSubtotal: () =>
        get().items.reduce((sum, i) => sum + (i.product?.price || 0) * i.quantity, 0),

      getDiscount: () => {
        const { coupon, getSubtotal } = get()
        if (!coupon) return 0
        const subtotal = getSubtotal()
        if (coupon.type === 'PERCENT') {
          return Math.round(subtotal * (coupon.value / 100))
        }
        return Math.min(coupon.value * 100, subtotal)
      },

      getDeliveryFee: () => calculateDeliveryFee(get().getSubtotal()),

      getTotal: () => {
        const { getSubtotal, getDiscount, getDeliveryFee } = get()
        return getSubtotal() - getDiscount() + getDeliveryFee()
      },

      getItemCount: () =>
        get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    {
      name: 'next360-cart',
      partialize: (state: CartStore) => ({
        items: state.items,
        coupon: state.coupon,
      }),
    }
  )
)
