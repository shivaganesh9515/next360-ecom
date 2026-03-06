import type { Review, ApiResponse } from '@next360/types'
import { api } from './api'

export const reviewService = {
  getReviews: async (productId: string) => {
    const res = await api.get<ApiResponse<Review[]>>(`/reviews/product/${productId}`)
    return res.data.data
  },

  createReview: async (data: {
    productId: string
    rating: number
    comment: string
    images?: string[]
  }) => {
    const res = await api.post<ApiResponse<Review>>('/reviews', data)
    return res.data.data
  },

  getReviewStats: async (productId: string) => {
    const res = await api.get<ApiResponse<{ average: number; count: number }>>(`/reviews/stats/${productId}`)
    return res.data.data
  },
}
