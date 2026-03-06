import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User } from '@next360/types'

interface AdminAuthState {
  admin: User | null
  accessToken: string | null
  isAuthenticated: boolean
  login: (admin: User, token: string) => void
  logout: () => void
  setToken: (token: string) => void
}

export const useAdminAuthStore = create<AdminAuthState>()(
  persist(
    (set: any) => ({
      admin: null,
      accessToken: null,
      isAuthenticated: false,
      login: (admin: any, token: any) => set({ admin, accessToken: token, isAuthenticated: true }),
      logout: () => set({ admin: null, accessToken: null, isAuthenticated: false }),
      setToken: (token: any) => set({ accessToken: token, isAuthenticated: true }),
    }),
    {
      name: 'next360-admin-auth',
    }
  )
)
