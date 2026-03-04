export interface Banner {
  id: string
  title: string
  subtitle?: string
  imageUrl: string
  mobileImageUrl?: string
  ctaText: string
  ctaLink: string
  displayOrder: number
  isActive: boolean
}

export interface AuditLog {
  id: string
  adminId: string
  action: string
  targetType: string
  targetId: string
  metadata?: Record<string, unknown>
  createdAt: string
}

export interface Payout {
  id: string
  vendorId: string
  amount: number
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED'
  reference?: string
  createdAt: string
}
