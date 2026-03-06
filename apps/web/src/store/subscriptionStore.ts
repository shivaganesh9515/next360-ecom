import { create } from 'zustand'
import { Product } from '@next360/types'
import { SubscriptionFreq } from '@/lib/mockSubscribe'

interface SubscriptionStoreState {
  selectedBoxId: string | null
  customProducts: Product[]
  deliveryDay: number | null
  frequency: SubscriptionFreq | null
  
  setBox: (id: string) => void
  setCustomProducts: (products: Product[]) => void
  toggleCustomProduct: (product: Product) => void
  setDeliveryDay: (day: number) => void
  setFrequency: (freq: SubscriptionFreq) => void
  reset: () => void
}

export const useSubscriptionStore = create<SubscriptionStoreState>((set) => ({
  selectedBoxId: null,
  customProducts: [],
  deliveryDay: null,
  frequency: null,

  setBox: (id) => set({ selectedBoxId: id, customProducts: [] }),
  setCustomProducts: (products) => set({ customProducts: products }),
  toggleCustomProduct: (product) => set((state) => {
    const exists = state.customProducts.some(p => p.id === product.id)
    if (exists) {
      return { customProducts: state.customProducts.filter(p => p.id !== product.id) }
    } else {
      if (state.customProducts.length >= 8) return state // max 8 enforced
      return { customProducts: [...state.customProducts, product] }
    }
  }),
  setDeliveryDay: (day) => set({ deliveryDay: day }),
  setFrequency: (freq) => set({ frequency: freq }),
  reset: () => set({
    selectedBoxId: null,
    customProducts: [],
    deliveryDay: null,
    frequency: null,
  })
}))
