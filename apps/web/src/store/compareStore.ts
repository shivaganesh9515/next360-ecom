import { create } from 'zustand'

export const useCompareStore = create((set, get) => ({
  compareList: [],

  addToCompare: (product) => {
    const { compareList } = get()
    if (compareList.length >= 4) return false
    if (compareList.find(p => p.id === product.id)) return true
    set({ compareList: [...compareList, product] })
    return true
  },

  removeFromCompare: (productId) => {
    set({ compareList: get().compareList.filter(p => p.id !== productId) })
  },

  clearCompare: () => set({ compareList: [] })
}))
