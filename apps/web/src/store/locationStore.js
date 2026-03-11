import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useLocationStore = create(
  persist(
    (set, get) => ({
      lat: null,
      lng: null,
      state: null,
      district: null,
      city: null,
      pincode: null,
      zoneId: null,
      zoneName: '',
      isServiceable: false,
      hyperlocalActive: false,
      deliveryPromise: '',
      enabledModes: [],
      isLocationSet: false,

      setFromGPS: async () => {
        if (!navigator.geolocation) {
          throw new Error('Geolocation not supported')
        }

        return new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords
            try {
              // Simulated API call to detect location from Lat/Lng
              // const res = await fetch('/api/location/detect', { method: 'POST', body: JSON.stringify({ lat: latitude, lng: longitude }) })
              // const data = await res.json()
              
              // Mock data for initial implementation
              set({
                lat: latitude.toString(),
                lng: longitude.toString(),
                city: 'Hyderabad',
                state: 'Telangana',
                district: 'Hyderabad District',
                zoneId: 'hyd-01',
                zoneName: 'Hyderabad Central',
                isServiceable: true,
                hyperlocalActive: true,
                deliveryPromise: 'Delivers in 45 min',
                enabledModes: ['ORGANIC', 'NATURAL', 'ECO', 'RYTHU_BAZAR'],
                isLocationSet: true
              })
              resolve(true)
            } catch (error) {
              reject(error)
            }
          }, (error) => reject(error))
        })
      },

      setFromPincode: async (pin) => {
        try {
          // Simulated API call
          // const res = await fetch('/api/location/check-pincode', { method: 'POST', body: JSON.stringify({ pincode: pin }) })
          // const data = await res.json()

          if (pin === '500001') {
            set({
              pincode: pin,
              city: 'Hyderabad',
              isServiceable: true,
              hyperlocalActive: true,
              deliveryPromise: 'Delivers in 45 min',
              enabledModes: ['ORGANIC', 'NATURAL', 'ECO', 'RYTHU_BAZAR'],
              isLocationSet: true
            })
            return true
          }
          return false
        } catch (error) {
          return false
        }
      },

      setManually: (data) => {
        set({ ...data, isLocationSet: true })
      },

      clearLocation: () => {
        set({
          lat: null, lng: null, city: null, state: null, district: null, pincode: null,
          zoneId: null, zoneName: '', isServiceable: false, hyperlocalActive: false,
          deliveryPromise: '', enabledModes: [], isLocationSet: false
        })
      }
    }),
    {
      name: 'n360-location'
    }
  )
)
