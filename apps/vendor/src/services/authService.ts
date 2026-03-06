import { api, getErrorMessage } from './api'

export const authService = {
  login: async (email: string, password: string) => {
    try {
      const { data } = await api.post('/auth/login', { email, password })
      return data
    } catch (e) {
      throw new Error(getErrorMessage(e))
    }
  },
  register: async (registrationData: any) => {
    try {
      const { data } = await api.post('/auth/register', { ...registrationData, role: 'VENDOR' })
      return data
    } catch (e) {
      throw new Error(getErrorMessage(e))
    }
  },
  refreshToken: async () => {
    try {
      const { data } = await api.post('/auth/refresh-token')
      return data
    } catch (e) {
      throw new Error(getErrorMessage(e))
    }
  },
}
