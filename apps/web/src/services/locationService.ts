import { api } from './api'
import type { LocationResult, State, District, City, ApiResponse } from '@next360/types'

export const locationService = {
  detect: async (lat: number, lng: number) => {
    const res = await api.post<ApiResponse<LocationResult>>('/location/detect', { lat, lng })
    return res.data.data
  },

  checkPincode: async (pincode: string) => {
    const res = await api.post<ApiResponse<LocationResult>>('/location/check-pincode', { pincode })
    return res.data.data
  },

  getStates: async () => {
    const res = await api.get<ApiResponse<State[]>>('/location/states')
    return res.data.data
  },

  getDistricts: async (stateCode: string) => {
    const res = await api.get<ApiResponse<District[]>>(`/location/states/${stateCode}/districts`)
    return res.data.data
  },

  getCities: async (districtId: string) => {
    const res = await api.get<ApiResponse<City[]>>(`/location/districts/${districtId}/cities`)
    return res.data.data
  },

  addToWaitlist: async (data: { email: string; pincode: string; city?: string; state?: string }) => {
    const res = await api.post<ApiResponse<any>>('/location/waitlist', data)
    return res.data.data
  },
}
