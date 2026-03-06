export type Role = 'CUSTOMER' | 'VENDOR' | 'ADMIN'
export type VendorStatus = 'PENDING' | 'ACTIVE' | 'SUSPENDED'

export interface User {
  id: string
  name: string
  email: string
  phone?: string
  role: Role
  avatar?: string
  healthGoals: string[]
  seeds: number
  isVerified: boolean
  createdAt: string
}

export interface Address {
  id: string
  userId: string
  name: string
  phone: string
  street: string
  city: string
  state: string
  pincode: string
  landmark?: string
  type?: string // e.g. 'HOME', 'OFFICE'
  isDefault: boolean
}

export interface VendorProfile {
  id: string
  userId: string
  businessName: string
  gstin?: string
  certDocUrls: string[]
  bankAccount: {
    accountNumber: string
    ifsc: string
    accountName: string
  }
  commissionRate: number
  status: VendorStatus
  rejectionReason?: string
  createdAt: string
}
