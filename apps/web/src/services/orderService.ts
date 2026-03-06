import type { Order, ApiResponse } from '@next360/types'
import { api } from './api'

export const orderService = {
  create: async (data: {
    addressId: string
    paymentMethod: string
    couponCode?: string
    notes?: string
  }) => {
    const res = await api.post<ApiResponse<Order>>('/orders', data)
    return res.data.data
  },

  getAll: async () => {
    const res = await api.get<ApiResponse<Order[]>>('/orders')
    return res.data.data
  },

  getById: async (id: string) => {
    const res = await api.get<ApiResponse<Order>>(`/orders/${id}`)
    return res.data.data
  },

  cancel: async (id: string) => {
    await api.post(`/orders/${id}/cancel`)
  },

  getTracking: async (id: string) => {
    const res = await api.get(`/orders/${id}/tracking`)
    return res.data.data
  },
}
