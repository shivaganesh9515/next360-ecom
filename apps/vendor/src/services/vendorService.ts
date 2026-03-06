import { api, getErrorMessage } from './api'

export const vendorService = {
  // --- DASHBOARD ---
  getDashboardStats: async () => {
    try {
      const { data } = await api.get('/vendor/dashboard')
      return data
    } catch (e) {
      throw new Error(getErrorMessage(e))
    }
  },

  // --- PRODUCTS ---
  getMyProducts: async (filters?: any) => {
    try {
      const { data } = await api.get('/vendor/products', { params: filters })
      return data
    } catch (e) {
      throw new Error(getErrorMessage(e))
    }
  },
  getProductById: async (id: string) => {
    try {
      const { data } = await api.get(`/vendor/products/${id}`)
      return data
    } catch (e) {
      throw new Error(getErrorMessage(e))
    }
  },
  createProduct: async (productData: any) => {
    try {
      const { data } = await api.post('/vendor/products', productData)
      return data
    } catch (e) {
      throw new Error(getErrorMessage(e))
    }
  },
  updateProduct: async (id: string, productData: any) => {
    try {
      const { data } = await api.put(`/vendor/products/${id}`, productData)
      return data
    } catch (e) {
      throw new Error(getErrorMessage(e))
    }
  },
  deleteProduct: async (id: string) => {
    try {
      const { data } = await api.delete(`/vendor/products/${id}`)
      return data
    } catch (e) {
      throw new Error(getErrorMessage(e))
    }
  },
  uploadImages: async (files: File[]) => {
    try {
      const formData = new FormData()
      files.forEach((file) => formData.append('images', file))
      const { data } = await api.post('/vendor/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      return data
    } catch (e) {
      throw new Error(getErrorMessage(e))
    }
  },

  // --- ORDERS ---
  getMyOrders: async (filters?: any) => {
    try {
      const { data } = await api.get('/vendor/orders', { params: filters })
      return data
    } catch (e) {
      throw new Error(getErrorMessage(e))
    }
  },
  getOrderById: async (id: string) => {
    try {
      const { data } = await api.get(`/vendor/orders/${id}`)
      return data
    } catch (e) {
      throw new Error(getErrorMessage(e))
    }
  },
  updateFulfillment: async (id: string, fulfillmentData: any) => {
    try {
      const { data } = await api.put(`/vendor/orders/${id}/fulfill`, fulfillmentData)
      return data
    } catch (e) {
      throw new Error(getErrorMessage(e))
    }
  },

  // --- PAYOUTS ---
  getPayouts: async () => {
    try {
      const { data } = await api.get('/vendor/payouts')
      return data
    } catch (e) {
      throw new Error(getErrorMessage(e))
    }
  },
  requestPayout: async (amount: number) => {
    try {
      const { data } = await api.post('/vendor/payouts', { amount })
      return data
    } catch (e) {
      throw new Error(getErrorMessage(e))
    }
  },

  // --- REVIEWS ---
  getProductReviews: async (productId?: string) => {
    try {
      const { data } = await api.get('/vendor/reviews', { params: { productId } })
      return data
    } catch (e) {
      throw new Error(getErrorMessage(e))
    }
  },

  // --- SETTINGS ---
  getProfile: async () => {
    try {
      const { data } = await api.get('/vendor/profile')
      return data
    } catch (e) {
      throw new Error(getErrorMessage(e))
    }
  },
  updateProfile: async (profileData: any) => {
    try {
      const { data } = await api.put('/vendor/profile', profileData)
      return data
    } catch (e) {
      throw new Error(getErrorMessage(e))
    }
  },
  updateBankDetails: async (bankData: any) => {
    try {
      const { data } = await api.put('/vendor/bank-details', bankData)
      return data
    } catch (e) {
      throw new Error(getErrorMessage(e))
    }
  },

  // --- CATEGORIES (read-only for product form) ---
  getCategories: async () => {
    try {
      const { data } = await api.get('/categories')
      return data
    } catch (e) {
      throw new Error(getErrorMessage(e))
    }
  },
}
