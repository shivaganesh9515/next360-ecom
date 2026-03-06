import type { User, ApiResponse } from '@next360/types'
import { api } from './api'

export const authService = {
  register: async (data: {
    name: string
    email: string
    phone: string
    password: string
  }) => {
    const res = await api.post<ApiResponse<{ user: User, token: string }>>('/auth/register', data)
    return res.data.data
  },

  login: async (data: { email: string; password: string }) => {
    const res = await api.post<ApiResponse<{ user: User, token: string }>>('/auth/login', data)
    return res.data.data
  },

  logout: async () => {
    await api.post('/auth/logout')
  },

  getMe: async () => {
    const res = await api.get<ApiResponse<User>>('/auth/me')
    return res.data.data
  },

  forgotPassword: async (email: string) => {
    await api.post('/auth/forgot-password', { email })
  },

  resetPassword: async (token: string, newPassword: string) => {
    await api.post('/auth/reset-password', { token, newPassword })
  },

  verifyEmail: async (token: string) => {
    await api.post('/auth/verify-email', { token })
  },

  googleLogin: () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`
  },
}
