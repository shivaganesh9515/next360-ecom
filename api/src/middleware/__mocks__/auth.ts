import { vi } from 'vitest'

export const authenticate = vi.fn((req, res, next) => {
  req.user = { id: 'user-123', email: 'test@example.com', role: 'CUSTOMER' }
  next()
})

export const optionalAuth = vi.fn((req, res, next) => {
  req.user = { id: 'user-123', email: 'test@example.com', role: 'CUSTOMER' }
  next()
})

export const requireRole = vi.fn((role) => (req, res, next) => next())
