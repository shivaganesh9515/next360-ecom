'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { LocationResult, PlatformMode } from '@next360/types/location'
import { locationService } from '@/services/locationService'

interface LocationState {
  lat: number | null
  lng: number | null
  state: string | null
  district: string | null
  city: string | null
  pincode: string | null
  zoneId: string | null
  zoneName: string
  isServiceable: boolean
  hyperlocalActive: boolean
  deliveryPromise: string
  enabledModes: PlatformMode[]
  isLocationSet: boolean
  isLoading: boolean
  error: string | null

  setFromGPS: () => Promise<void>
  setFromPincode: (pincode: string) => Promise<void>
  setManually: (result: LocationResult) => void
  clearLocation: () => void
}

export const useLocationStore = create<LocationState>()(
  persist(
    (set) => ({
      lat: null,
      lng: null,
      state: null,
      district: null,
      city: null,
      pincode: null,
      zoneId: null,
      zoneName: 'Select Location',
      isServiceable: false,
      hyperlocalActive: false,
      deliveryPromise: '',
      enabledModes: [],
      isLocationSet: false,
      isLoading: false,
      error: null,

      setFromGPS: async () => {
        set({ isLoading: true, error: null })
        try {
          const position = await new Promise<GeolocationPosition>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject)
          })
          const { latitude, longitude } = position.coords
          const result = await locationService.detect(latitude, longitude)
          set({
            ...result,
            isLocationSet: true,
            isLoading: false,
          })
        } catch (err: any) {
          set({ 
            isLoading: false, 
            error: err.message || 'Failed to detect location' 
          })
          throw err
        }
      },

      setFromPincode: async (pincode: string) => {
        set({ isLoading: true, error: null })
        try {
          const result = await locationService.checkPincode(pincode)
          set({
            ...result,
            isLocationSet: true,
            isLoading: false,
          })
        } catch (err: any) {
          set({ 
            isLoading: false, 
            error: err.response?.data?.message || 'Invalid pincode' 
          })
          throw err
        }
      },

      setManually: (result: LocationResult) => {
        set({
          ...result,
          isLocationSet: true,
          isLoading: false,
          error: null
        })
      },

      clearLocation: () => set({
        lat: null,
        lng: null,
        state: null,
        district: null,
        city: null,
        pincode: null,
        zoneId: null,
        zoneName: 'Select Location',
        isServiceable: false,
        hyperlocalActive: false,
        deliveryPromise: '',
        enabledModes: [],
        isLocationSet: false,
        isLoading: false,
        error: null,
      })
    }),
    {
      name: 'n360-location'
    }
  )
)
