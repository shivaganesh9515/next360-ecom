import type { Product, Category, ApiResponse } from '@next360/types'
import { api } from './api'

export const productService = {
  getAll: async (params?: {
    category?: string
    search?: string
    sort?: string
    page?: number
    limit?: number
    minPrice?: number
    maxPrice?: number
    healthGoals?: string[]
  }) => {
    const res = await api.get<ApiResponse<Product[]>>('/products', { params })
    return res.data
  },

  getBySlug: async (slug: string) => {
    const res = await api.get<ApiResponse<Product>>(`/products/${slug}`)
    return res.data.data
  },

  getFeatured: async () => {
    const res = await api.get<ApiResponse<Product[]>>('/products/featured')
    return res.data.data
  },

  getCategories: async () => {
    const res = await api.get<ApiResponse<Category[]>>('/categories')
    return res.data.data
  },

  getSeasonal: async () => {
    const res = await api.get<ApiResponse<Product[]>>('/products/seasonal')
    return res.data.data
  },

  getTrending: async () => {
    const res = await api.get<ApiResponse<Product[]>>('/products/trending')
    return res.data.data
  },

  getRelated: async (id: string) => {
    const res = await api.get<ApiResponse<Product[]>>(`/products/related/${id}`)
    return res.data.data
  },

  getFBT: async (id: string) => {
    const res = await api.get<ApiResponse<Product[]>>(`/products/fbt/${id}`)
    return res.data.data
  },

  search: async (q: string) => {
    const res = await api.get<ApiResponse<Product[]>>('/products/search', { params: { q } })
    return res.data.data
  },

  getRecommendations: async () => {
    const res = await api.get<ApiResponse<Product[]>>('/products/recommendations')
    return res.data.data
  },
}
