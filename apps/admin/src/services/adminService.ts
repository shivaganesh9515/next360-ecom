import { api, getErrorMessage } from './api'

// Dashboard
// Products (with Algolia reindex)
// Categories + Suppliers
// Orders
// Users
// Vendors
// Coupons
// Content
// Analytics
// Settings

export const adminService = {
  // --- DASHBOARD ---
  getDashboardStats: async (period?: string) => {
    try {
      const { data } = await api.get('/admin/analytics', { params: { period } })
      return data
    } catch (e) {
      throw new Error(getErrorMessage(e))
    }
  },
  getRecentOrders: async (limit = 10) => {
    try {
      const { data } = await api.get('/admin/orders', { params: { limit, sort: 'newest' } })
      return data
    } catch (e) {
      throw new Error(getErrorMessage(e))
    }
  },
  getAlerts: async () => {
    try {
      const { data } = await api.get('/admin/alerts')
      return data
    } catch (e) {
      throw new Error(getErrorMessage(e))
    }
  },

  // --- PRODUCTS ---
  getProducts: async (filters?: any) => {
    try {
      const { data } = await api.get('/admin/products', { params: filters })
      return data
    } catch (e) {
      throw new Error(getErrorMessage(e))
    }
  },
  getProductById: async (id: string) => {
    try {
      const { data } = await api.get(`/admin/products/${id}`)
      return data
    } catch (e) {
      throw new Error(getErrorMessage(e))
    }
  },
  createProduct: async (productData: any) => {
    try {
      const { data } = await api.post('/admin/products', productData)
      return data
    } catch (e) {
      throw new Error(getErrorMessage(e))
    }
  },
  updateProduct: async (id: string, productData: any) => {
    try {
      const { data } = await api.put(`/admin/products/${id}`, productData)
      return data
    } catch (e) {
      throw new Error(getErrorMessage(e))
    }
  },
  deleteProduct: async (id: string) => {
    try {
      const { data } = await api.delete(`/admin/products/${id}`)
      return data
    } catch (e) {
      throw new Error(getErrorMessage(e))
    }
  },
  reindexProduct: async (id: string) => {
    try {
      const { data } = await api.post(`/search/index/${id}`)
      return data
    } catch (e) {
      throw new Error(getErrorMessage(e))
    }
  },
  reindexAll: async () => {
    try {
      const { data } = await api.post('/search/reindex')
      return data
    } catch (e) {
      throw new Error(getErrorMessage(e))
    }
  },
  uploadImages: async (files: File[]) => {
    try {
      const formData = new FormData()
      files.forEach((file) => formData.append('images', file))
      const { data } = await api.post('/admin/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      return data // Expecting array of URLs
    } catch (e) {
      throw new Error(getErrorMessage(e))
    }
  },

  // --- CATEGORIES & SUPPLIERS ---
  getCategories: async () => {
    try {
      const { data } = await api.get('/categories')
      return data
    } catch (e) {
      throw new Error(getErrorMessage(e))
    }
  },
  createCategory: async (categoryData: any) => {
    try {
      const { data } = await api.post('/admin/categories', categoryData)
      return data
    } catch (e) {
      throw new Error(getErrorMessage(e))
    }
  },
  updateCategory: async (id: string, categoryData: any) => {
    try {
      const { data } = await api.put(`/admin/categories/${id}`, categoryData)
      return data
    } catch (e) {
      throw new Error(getErrorMessage(e))
    }
  },
  deleteCategory: async (id: string) => {
    try {
      const { data } = await api.delete(`/admin/categories/${id}`)
      return data
    } catch (e) {
      throw new Error(getErrorMessage(e))
    }
  },
  getSuppliers: async () => {
    try {
      const { data } = await api.get('/admin/suppliers')
      return data
    } catch (e) {
      throw new Error(getErrorMessage(e))
    }
  },
  createSupplier: async (supplierData: any) => {
    try {
      const { data } = await api.post('/admin/suppliers', supplierData)
      return data
    } catch (e) {
      throw new Error(getErrorMessage(e))
    }
  },
  updateSupplier: async (id: string, supplierData: any) => {
    try {
      const { data } = await api.put(`/admin/suppliers/${id}`, supplierData)
      return data
    } catch (e) {
      throw new Error(getErrorMessage(e))
    }
  },

  // --- ORDERS ---
  getOrders: async (filters?: any) => {
    try {
      const { data } = await api.get('/admin/orders', { params: filters })
      return data
    } catch (e) {
      throw new Error(getErrorMessage(e))
    }
  },
  getOrderById: async (id: string) => {
    try {
      const { data } = await api.get(`/admin/orders/${id}`)
      return data
    } catch (e) {
      throw new Error(getErrorMessage(e))
    }
  },
  updateOrderStatus: async (id: string, statusData: any) => {
    try {
      const { data } = await api.put(`/admin/orders/${id}`, statusData)
      return data
    } catch (e) {
      throw new Error(getErrorMessage(e))
    }
  },
  initiateRefund: async (id: string) => {
    try {
      const { data } = await api.post(`/admin/orders/${id}/refund`)
      return data
    } catch (e) {
      throw new Error(getErrorMessage(e))
    }
  },

  // --- USERS ---
  getUsers: async (filters?: any) => {
    try {
      const { data } = await api.get('/admin/users', { params: filters })
      return data
    } catch (e) {
      throw new Error(getErrorMessage(e))
    }
  },
  getUserById: async (id: string) => {
    try {
      const { data } = await api.get(`/admin/users/${id}`)
      return data
    } catch (e) {
      throw new Error(getErrorMessage(e))
    }
  },
  updateUserRole: async (id: string, role: string) => {
    try {
      const { data } = await api.put(`/admin/users/${id}`, { role })
      return data
    } catch (e) {
      throw new Error(getErrorMessage(e))
    }
  },
  banUser: async (id: string) => {
    try {
      const { data } = await api.put(`/admin/users/${id}/ban`)
      return data
    } catch (e) {
      throw new Error(getErrorMessage(e))
    }
  },
  unbanUser: async (id: string) => {
    try {
      const { data } = await api.put(`/admin/users/${id}/unban`)
      return data
    } catch (e) {
      throw new Error(getErrorMessage(e))
    }
  },
  awardSeeds: async (id: string, seedsData: any) => {
    try {
      const { data } = await api.post(`/admin/users/${id}/seeds`, seedsData)
      return data
    } catch (e) {
      throw new Error(getErrorMessage(e))
    }
  },

  // --- VENDORS ---
  getVendors: async (status?: string) => {
    try {
      const { data } = await api.get('/admin/vendors', { params: { status } })
      return data
    } catch (e) {
      throw new Error(getErrorMessage(e))
    }
  },
  getVendorById: async (id: string) => {
    try {
      const { data } = await api.get(`/admin/vendors/${id}`)
      return data
    } catch (e) {
      throw new Error(getErrorMessage(e))
    }
  },
  approveVendor: async (id: string) => {
    try {
      const { data } = await api.post(`/admin/vendors/${id}/approve`)
      return data
    } catch (e) {
      throw new Error(getErrorMessage(e))
    }
  },
  rejectVendor: async (id: string, reason: string) => {
    try {
      const { data } = await api.post(`/admin/vendors/${id}/reject`, { reason })
      return data
    } catch (e) {
      throw new Error(getErrorMessage(e))
    }
  },
  processPayout: async (id: string, payoutId: string) => {
    try {
      const { data } = await api.post(`/admin/vendors/${id}/payout`, { payoutId })
      return data
    } catch (e) {
      throw new Error(getErrorMessage(e))
    }
  },

  // --- COUPONS ---
  getCoupons: async () => {
    try {
      const { data } = await api.get('/admin/coupons')
      return data
    } catch (e) {
      throw new Error(getErrorMessage(e))
    }
  },
  createCoupon: async (couponData: any) => {
    try {
      const { data } = await api.post('/admin/coupons', couponData)
      return data
    } catch (e) {
      throw new Error(getErrorMessage(e))
    }
  },
  updateCoupon: async (id: string, couponData: any) => {
    try {
      const { data } = await api.put(`/admin/coupons/${id}`, couponData)
      return data
    } catch (e) {
      throw new Error(getErrorMessage(e))
    }
  },
  deleteCoupon: async (id: string) => {
    try {
      const { data } = await api.delete(`/admin/coupons/${id}`)
      return data
    } catch (e) {
      throw new Error(getErrorMessage(e))
    }
  },

  // --- CONTENT ---
  getBlogPosts: async () => {
    try {
      const { data } = await api.get('/admin/blog')
      return data
    } catch (e) {
      throw new Error(getErrorMessage(e))
    }
  },
  getBlogPost: async (id: string) => {
    try {
      const { data } = await api.get(`/admin/blog/${id}`)
      return data
    } catch (e) {
      throw new Error(getErrorMessage(e))
    }
  },
  createBlogPost: async (postData: any) => {
    try {
      const { data } = await api.post('/admin/blog', postData)
      return data
    } catch (e) {
      throw new Error(getErrorMessage(e))
    }
  },
  updateBlogPost: async (id: string, postData: any) => {
    try {
      const { data } = await api.put(`/admin/blog/${id}`, postData)
      return data
    } catch (e) {
      throw new Error(getErrorMessage(e))
    }
  },
  deleteBlogPost: async (id: string) => {
    try {
      const { data } = await api.delete(`/admin/blog/${id}`)
      return data
    } catch (e) {
      throw new Error(getErrorMessage(e))
    }
  },
  getBanners: async () => {
    try {
      const { data } = await api.get('/admin/banners')
      return data
    } catch (e) {
      throw new Error(getErrorMessage(e))
    }
  },
  createBanner: async (bannerData: any) => {
    try {
      const { data } = await api.post('/admin/banners', bannerData)
      return data
    } catch (e) {
      throw new Error(getErrorMessage(e))
    }
  },
  updateBanner: async (id: string, bannerData: any) => {
    try {
      const { data } = await api.put(`/admin/banners/${id}`, bannerData)
      return data
    } catch (e) {
      throw new Error(getErrorMessage(e))
    }
  },
  deleteBanner: async (id: string) => {
    try {
      const { data } = await api.delete(`/admin/banners/${id}`)
      return data
    } catch (e) {
      throw new Error(getErrorMessage(e))
    }
  },
  broadcastNotification: async (notificationData: any) => {
    try {
      const { data } = await api.post('/admin/notifications/broadcast', notificationData)
      return data
    } catch (e) {
      throw new Error(getErrorMessage(e))
    }
  },
  getSubscriptions: async (filters?: any) => {
    try {
      const { data } = await api.get('/admin/subscriptions', { params: filters })
      return data
    } catch (e) {
      throw new Error(getErrorMessage(e))
    }
  },
  updateSubscriptionStatus: async (id: string, status: string) => {
    try {
      const { data } = await api.put(`/admin/subscriptions/${id}`, { status })
      return data
    } catch (e) {
      throw new Error(getErrorMessage(e))
    }
  },

  // --- ANALYTICS ---
  getAnalytics: async (start?: string, end?: string) => {
    try {
      const { data } = await api.get('/admin/analytics', { params: { start, end } })
      return data
    } catch (e) {
      throw new Error(getErrorMessage(e))
    }
  },

  // --- SETTINGS ---
  getSettings: async () => {
    try {
      const { data } = await api.get('/admin/settings')
      return data
    } catch (e) {
      throw new Error(getErrorMessage(e))
    }
  },
  updateSettings: async (settingsData: any) => {
    try {
      const { data } = await api.put('/admin/settings', settingsData)
      return data
    } catch (e) {
      throw new Error(getErrorMessage(e))
    }
  }
}
