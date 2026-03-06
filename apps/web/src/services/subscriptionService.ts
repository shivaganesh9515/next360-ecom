import type { Subscription, Box, ApiResponse } from '@next360/types'
import { api } from './api'


export const subscriptionService = {
  getBoxes: async () => {
    const res = await api.get<ApiResponse<Box[]>>('/subscriptions/boxes')
    return res.data.data
  },

  getSubscriptions: async () => {
    const res = await api.get<ApiResponse<Subscription[]>>('/subscriptions')
    return res.data.data
  },

  createSubscription: async (data: {
    boxId: string
    customProducts?: string[]
    deliveryDay: number
    frequency: string
  }) => {
    const res = await api.post<ApiResponse<Subscription>>('/subscriptions', data)
    return res.data.data
  },

  updateSubscription: async (id: string, data: Partial<Subscription>) => {
    const res = await api.patch<ApiResponse<Subscription>>(`/subscriptions/${id}`, data)
    return res.data.data
  },

  cancelSubscription: async (id: string) => {
    await api.post(`/subscriptions/${id}/cancel`)
  },
}
