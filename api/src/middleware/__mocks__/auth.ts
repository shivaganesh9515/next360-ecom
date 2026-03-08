import { vi } from 'vitest'

export const authenticate = vi.fn((req: any, res: any, next: any) => {
  req.user = { id: 'user-123', email: 'test@example.com', role: 'CUSTOMER' }
  next()
})

export const optionalAuth = vi.fn((req: any, res: any, next: any) => {
  req.user = { id: 'user-123', email: 'test@example.com', role: 'CUSTOMER' }
  next()
})

export const requireRole = vi.fn((role: any) => (req: any, res: any, next: any) => next())
