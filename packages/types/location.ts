// ─── ENUMS ────────────────────────────────────────────────────

export type PlatformMode = 'ORGANIC' | 'NATURAL' | 'ECO' | 'RYTHU_BAZAR' | 'SUSTAINABLE'
export type DeliveryType = 'HYPERLOCAL' | 'ZONAL' | 'NATIONAL'
export type ZoneType = 'HYPERLOCAL' | 'DISTRICT' | 'STATE' | 'NATIONAL'
export type VendorAreaType = 'HYPERLOCAL' | 'ZONAL' | 'NATIONAL'

// ─── LOCATION RESULT (from /api/location/detect) ──────────────

export interface LocationResult {
  lat: number
  lng: number
  state: string
  district: string
  city: string
  pincode: string
  zoneId: string
  zoneName: string
  zoneType: ZoneType
  isServiceable: boolean
  hyperlocalActive: boolean
  deliveryPromise: string
  enabledModes: PlatformMode[]
  defaultMode: PlatformMode
}

// ─── STATE / DISTRICT / CITY ──────────────────────────────────

export interface State {
  id: string
  name: string
  code: string
  isActive: boolean
  displayOrder: number
  districts?: District[]
}

export interface District {
  id: string
  name: string
  stateId: string
  isActive: boolean
  state?: State
  cities?: City[]
}

export interface City {
  id: string
  name: string
  districtId: string
  isActive: boolean
  hyperlocalActive: boolean
  hyperlocalRadius: number
  deliveryPromise: string
  district?: District
}

// ─── ZONE ─────────────────────────────────────────────────────

export interface Zone {
  id: string
  name: string
  type: ZoneType
  stateId?: string | null
  districtId?: string | null
  cityId?: string | null
  isActive: boolean
  deliveryFee: number
  freeDeliveryThreshold: number
  codAvailable: boolean
  codMaxOrder: number
  modeConfigs?: ZoneModeConfig[]
  pincodes?: ZonePincode[]
}

export interface ZonePincode {
  zoneId: string
  pincode: string
}

export interface ZoneModeConfig {
  id: string
  zoneId: string
  mode: PlatformMode
  isEnabled: boolean
  isDefault: boolean
  label?: string | null
  description?: string | null
  accentColor?: string | null
}

// ─── VENDOR SERVICE AREA ──────────────────────────────────────

export interface VendorServiceArea {
  id: string
  vendorId: string
  cityId?: string | null
  stateId?: string | null
  type: VendorAreaType
  radiusKm: number
  lat?: number | null
  lng?: number | null
  isActive: boolean
}

// ─── PRODUCT ZONE ─────────────────────────────────────────────

export interface ProductZone {
  productId: string
  zoneId: string
  isAvailable: boolean
  priceOverride?: number | null
}

// ─── DELIVERY BLOCK ───────────────────────────────────────────

export interface DeliveryBlock {
  id: string
  zoneId: string
  date: string
  reason?: string | null
}

// ─── WAITLIST ─────────────────────────────────────────────────

export interface ZoneWaitlist {
  id: string
  email: string
  phone?: string | null
  pincode: string
  city?: string | null
  state?: string | null
  createdAt: string
}

// ─── MODE UTILITIES ───────────────────────────────────────────

export const PLATFORM_MODE_META: Record<PlatformMode, {
  label: string
  emoji: string
  color: string
  description: string
  teluguLabel?: string
}> = {
  ORGANIC: {
    label: 'Organic',
    emoji: '🌿',
    color: '#2D5016',
    description: 'NPOP Verified',
  },
  NATURAL: {
    label: 'Natural',
    emoji: '🌱',
    color: '#4A7C59',
    description: 'Chemical Free',
  },
  ECO: {
    label: 'Eco Friendly',
    emoji: '♻️',
    color: '#1B6CA8',
    description: 'Sustainable Packaging',
  },
  RYTHU_BAZAR: {
    label: 'Rythu Bazar',
    emoji: '🏪',
    color: '#C0392B',
    description: 'Direct from Farmer',
    teluguLabel: 'రైతు బజార్',
  },
  SUSTAINABLE: {
    label: 'Sustainable',
    emoji: '🌍',
    color: '#27AE60',
    description: 'Earth Friendly',
  },
}
