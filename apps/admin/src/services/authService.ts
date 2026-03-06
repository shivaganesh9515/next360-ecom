import { api } from './api'
import { User } from '@next360/types'

export const authService = {
  login: async (email: string, password: string): Promise<{ user: User; token: string }> => {
    const { data } = await api.post('/auth/login', { email, password })
    return data
  },

  logout: async (): Promise<void> => {
    await api.post('/auth/logout')
  },

  getMe: async (): Promise<User> => {
    const { data } = await api.get('/auth/me')
    return data
  }
}
