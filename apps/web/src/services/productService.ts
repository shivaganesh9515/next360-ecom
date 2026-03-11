import type { Product, Category, ApiResponse } from '@next360/types'
import { api } from './api'
import { mockProducts } from '@next360/utils'
import type { DeliveryType, PlatformMode } from '@next360/types/location'

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
    zoneId?: string
    mode?: PlatformMode
    deliveryType?: DeliveryType
  }) => {
    try {
      const res = await api.get<ApiResponse<Product[]>>('/products', { params })
      return res.data
    } catch {
      const data = mockProducts.filter((product) => {
        if (params?.category && product.category?.slug !== params.category) return false
        if (params?.search && !`${product.name} ${product.shortDesc}`.toLowerCase().includes(params.search.toLowerCase())) return false
        if (params?.minPrice !== undefined && product.price < params.minPrice) return false
        if (params?.maxPrice !== undefined && product.price > params.maxPrice) return false
        if (params?.deliveryType && product.deliveryType !== params.deliveryType) return false
        if (params?.mode && !product.platformModes?.includes(params.mode)) return false
        if (params?.healthGoals?.length && !params.healthGoals.some((goal) => product.healthGoalTags.includes(goal))) return false
        return true
      })
      return {
        success: true,
        data,
        meta: {
          total: data.length,
          page: params?.page ?? 1,
          limit: params?.limit ?? data.length,
          totalPages: 1,
        },
      } as ApiResponse<Product[]>
    }
  },

  getBySlug: async (slug: string) => {
    try {
      const res = await api.get<ApiResponse<Product>>(`/products/${slug}`)
      return res.data.data
    } catch {
      return mockProducts.find((product) => product.slug === slug) ?? mockProducts[0]
    }
  },

  getFeatured: async (params?: { zoneId?: string; mode?: PlatformMode }) => {
    try {
      const res = await api.get<ApiResponse<Product[]>>('/products/featured', { params })
      return res.data.data
    } catch {
      return mockProducts.filter((product) => {
        if (!product.isFeatured) return false
        if (params?.mode && !product.platformModes?.includes(params.mode)) return false
        return true
      })
    }
  },

  getCategories: async () => {
    const res = await api.get<ApiResponse<Category[]>>('/categories')
    return res.data.data
  },

  getSeasonal: async () => {
    try {
      const res = await api.get<ApiResponse<Product[]>>('/products/seasonal')
      return res.data.data
    } catch {
      return mockProducts.slice(0, 3)
    }
  },

  getTrending: async () => {
    try {
      const res = await api.get<ApiResponse<Product[]>>('/products/trending')
      return res.data.data
    } catch {
      return [...mockProducts].sort((a, b) => b.orderCount - a.orderCount).slice(0, 4)
    }
  },

  getRelated: async (id: string) => {
    try {
      const res = await api.get<ApiResponse<Product[]>>(`/products/${id}/related`)
      return res.data.data
    } catch {
      return mockProducts.filter((product) => product.id !== id).slice(0, 4)
    }
  },

  getFBT: async (id: string) => {
    try {
      const res = await api.get<ApiResponse<Product[]>>(`/products/${id}/frequently-bought-together`)
      return res.data.data
    } catch {
      return mockProducts.filter((product) => product.id !== id).slice(1, 4)
    }
  },

  search: async (q: string) => {
    try {
      const res = await api.get<ApiResponse<Product[]>>('/products/search', { params: { q } })
      return res.data.data
    } catch {
      return mockProducts.filter((product) => product.name.toLowerCase().includes(q.toLowerCase()))
    }
  },

  getRecommendations: async () => {
    try {
      const res = await api.get<ApiResponse<Product[]>>('/products/recommendations')
      return res.data.data
    } catch {
      return mockProducts.slice(0, 4)
    }
  },
}
