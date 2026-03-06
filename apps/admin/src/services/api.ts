import axios, { AxiosError } from 'axios'
import { useAdminAuthStore } from '../store/adminAuthStore'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://api.next360.in/api',
  withCredentials: true,
  timeout: 10000,
})

api.interceptors.request.use((config) => {
  const token = useAdminAuthStore.getState().accessToken
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && originalRequest && !(originalRequest as any)._retry) {
      (originalRequest as any)._retry = true

      try {
        // Assume API has a refresh token cookie and this endpoint returns a new access token
        const { data } = await axios.post(`${api.defaults.baseURL}/auth/refresh-token`, {}, { withCredentials: true })
        useAdminAuthStore.getState().setToken(data.token)
        originalRequest.headers.Authorization = `Bearer ${data.token}`
        return api(originalRequest)
      } catch (refreshError) {
        useAdminAuthStore.getState().logout()
        if (typeof window !== 'undefined') {
          window.location.href = '/login'
        }
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || error.response?.data?.error || error.message || 'An API error occurred'
  }
  if (error instanceof Error) {
    return error.message
  }
  return 'An unexpected error occurred'
}
