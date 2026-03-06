import type { Notification, ApiResponse } from '@next360/types'
import { api } from './api'

export const notificationService = {
  getAll: async () => {
    const res = await api.get<ApiResponse<Notification[]>>('/notifications')
    return res.data.data
  },

  getUnreadCount: async () => {
    const res = await api.get<ApiResponse<{ count: number }>>('/notifications/unread-count')
    return res.data.data
  },

  markAsRead: async (id: string) => {
    await api.patch(`/notifications/${id}/read`)
  },

  markAllAsRead: async () => {
    await api.post('/notifications/read-all')
  },
}
