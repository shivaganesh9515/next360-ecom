import type { Cart, ApiResponse } from '@next360/types'
import { api } from './api'

export const cartService = {
  getCart: async () => {
    const res = await api.get<ApiResponse<Cart>>('/cart')
    return res.data.data
  },

  addItem: async (productId: string, quantity: number, selectedWeight: string) => {
    const res = await api.post<ApiResponse<Cart>>('/cart/items', {
      productId,
      quantity,
      selectedWeight,
    })
    return res.data.data
  },

  updateQty: async (cartItemId: string, quantity: number) => {
    const res = await api.patch<ApiResponse<Cart>>(`/cart/items/${cartItemId}`, {
      quantity,
    })
    return res.data.data
  },

  removeItem: async (cartItemId: string) => {
    const res = await api.delete<ApiResponse<Cart>>(`/cart/items/${cartItemId}`)
    return res.data.data
  },

  applyCoupon: async (code: string) => {
    const res = await api.post<ApiResponse<Cart>>('/cart/coupon', { code })
    return res.data.data
  },

  removeCoupon: async () => {
    const res = await api.delete<ApiResponse<Cart>>('/cart/coupon')
    return res.data.data
  },

  clearCart: async () => {
    const res = await api.delete<ApiResponse<Cart>>('/cart')
    return res.data.data
  },
}
