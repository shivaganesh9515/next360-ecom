import type { Address, User, ApiResponse } from '@next360/types'
import { api } from './api'

export const accountService = {
  getAddresses: async () => {
    const res = await api.get<ApiResponse<Address[]>>('/account/addresses')
    return res.data.data
  },

  addAddress: async (data: Omit<Address, 'id' | 'userId'>) => {
    const res = await api.post<ApiResponse<Address>>('/account/addresses', data)
    return res.data.data
  },

  updateAddress: async (id: string, data: Partial<Address>) => {
    const res = await api.patch<ApiResponse<Address>>(`/account/addresses/${id}`, data)
    return res.data.data
  },

  deleteAddress: async (id: string) => {
    await api.delete(`/account/addresses/${id}`)
  },

  getSeedsBalance: async () => {
    const res = await api.get<ApiResponse<{ balance: number }>>('/account/seeds')
    return res.data.data
  },

  getSubscription: async () => {
    const res = await api.get<ApiResponse<any>>('/account/subscription')
    return res.data.data
  },

  updateProfile: async (data: { name?: string; phone?: string; avatar?: string }) => {
    const res = await api.patch<ApiResponse<User>>('/account/profile', data)
    return res.data.data
  },

  changePassword: async (data: any) => {
    await api.post('/account/change-password', data)
  },

  updatePreferences: async (data: any) => {
    const res = await api.patch<ApiResponse<any>>('/account/preferences', data)
    return res.data.data
  },
}
