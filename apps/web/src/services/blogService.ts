import type { ApiResponse, BlogPost } from '@next360/types'
import { api } from './api'

export const blogService = {
  getBlogPosts: async (params?: { category?: string; tag?: string }) => {
    const res = await api.get<ApiResponse<BlogPost[]>>('/blog', { params })
    return res.data.data
  },

  getBlogPostBySlug: async (slug: string) => {
    const res = await api.get<ApiResponse<BlogPost>>(`/blog/${slug}`)
    return res.data.data
  },

  getCategories: async () => {
    const res = await api.get<ApiResponse<string[]>>('/blog/categories')
    return res.data.data
  },
}
