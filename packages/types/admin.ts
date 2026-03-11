// Banner is now defined in cms.ts with zone/mode awareness

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
