import axios from 'axios'
import { prisma } from '../../config/database'
import { AppError } from '../../shared/errors/AppError'
import { PlatformMode, ZoneType } from '@prisma/client'

/**
 * Detect location from coordinates
 * Uses openstreetmap nominatim for free reverse geocoding
 */
export async function detectLocation(lat: number, lng: number) {
  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
      { headers: { 'User-Agent': 'Next360-API/1.0' } }
    )

    const address = response.data.address
    const pincode = address.postcode
    const cityName = address.city || address.town || address.village || address.suburb
    
    if (!pincode) {
      throw AppError.badRequest('Could not detect pincode for these coordinates')
    }

    return await checkPincode(pincode, lat, lng)
  } catch (error) {
    if (error instanceof AppError) throw error
    throw AppError.internal('Failed to detect location from coordinates')
  }
}

/**
 * Check serviceability for a pincode
 */
export async function checkPincode(pincode: string, lat?: number, lng?: number) {
  // 1. Find zone mapping for this pincode
  const zonePincode = await prisma.zonePincode.findFirst({
    where: { pincode },
    include: {
      zone: {
        include: {
          city: true,
          district: true,
          state: true,
          modeConfigs: {
            where: { isEnabled: true }
          }
        }
      }
    }
  })

  // 2. If no zone found, return unserviceable
  if (!zonePincode) {
    return {
      pincode,
      isServiceable: false,
      waitlistEnabled: true
    }
  }

  const zone = zonePincode.zone
  const enabledModes = zone.modeConfigs.map(mc => mc.mode)
  const defaultMode = zone.modeConfigs.find(mc => mc.isDefault)?.mode || enabledModes[0] || PlatformMode.ORGANIC

  return {
    lat,
    lng,
    state: zone.state?.name || '',
    district: zone.district?.name || '',
    city: zone.city?.name || '',
    pincode,
    zoneId: zone.id,
    zoneName: zone.name,
    zoneType: zone.type,
    isServiceable: zone.isActive,
    hyperlocalActive: zone.city?.hyperlocalActive || false,
    deliveryPromise: zone.city?.deliveryPromise || 'Delivers in 1-3 days',
    enabledModes,
    defaultMode
  }
}

/**
 * Get active states
 */
export async function getStates() {
  return prisma.state.findMany({
    where: { isActive: true },
    orderBy: { displayOrder: 'asc' }
  })
}

/**
 * Get districts in a state
 */
export async function getDistricts(stateCode: string) {
  return prisma.district.findMany({
    where: {
      isActive: true,
      state: { code: stateCode }
    },
    orderBy: { name: 'asc' }
  })
}

/**
 * Get cities in a district
 */
export async function getCities(districtId: string) {
  return prisma.city.findMany({
    where: {
      isActive: true,
      districtId
    },
    orderBy: { name: 'asc' }
  })
}

/**
 * Add to waitlist
 */
export async function addToWaitlist(data: {
  email: string
  phone?: string
  pincode: string
  city?: string
  state?: string
}) {
  return prisma.zoneWaitlist.create({
    data
  })
}
