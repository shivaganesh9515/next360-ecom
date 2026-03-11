import { create } from 'zustand'

export const useBasketStore = create((set) => ({
  isOpen: false,
  openBasket: () => set({ isOpen: true }),
  closeBasket: () => set({ isOpen: false }),
  toggleBasket: () => set((state) => ({ isOpen: !state.isOpen }))
}))
