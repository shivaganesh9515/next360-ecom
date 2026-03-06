import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface VendorAuthState {
  vendor: any | null
  accessToken: string | null
  isAuthenticated: boolean
  login: (vendor: any, token: string) => void
  logout: () => void
  setToken: (token: string) => void
}

export const useVendorAuthStore = create<VendorAuthState>()(
  persist(
    (set: any) => ({
      vendor: null,
      accessToken: null,
      isAuthenticated: false,
      login: (vendor: any, token: any) => set({ vendor, accessToken: token, isAuthenticated: true }),
      logout: () => set({ vendor: null, accessToken: null, isAuthenticated: false }),
      setToken: (token: any) => set({ accessToken: token, isAuthenticated: true }),
    }),
    {
      name: 'next360-vendor-auth',
    }
  )
)
