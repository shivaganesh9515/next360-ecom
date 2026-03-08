import { vi } from 'vitest'

// Mock common middlewares
vi.mock('../../middleware/auth', () => ({
  authenticate: vi.fn((req: any, res: any, next: any) => {
    req.user = { id: 'user-123', email: 'test@example.com', role: 'CUSTOMER' }
    next()
  }),
  optionalAuth: vi.fn((req: any, res: any, next: any) => {
    req.user = { id: 'user-123', email: 'test@example.com', role: 'CUSTOMER' }
    next()
  }),
  requireRole: vi.fn((role: any) => (req: any, res: any, next: any) => next()),
}))

vi.mock('../../middleware/rateLimit', () => {
  const passthrough = (req: any, res: any, next: any) => next()
  return {
    authRateLimit: passthrough,
    registerRateLimit: passthrough,
    apiRateLimit: passthrough,
    adminRateLimit: passthrough,
  }
})

vi.mock('../../middleware/validate', () => ({
  validate: (schema: any) => (req: any, res: any, next: any) => next(),
}))

// Mock Configs / Databases
vi.mock('../../config/database', () => ({
  prisma: {
    user: { findUnique: vi.fn(), create: vi.fn(), findFirst: vi.fn(), update: vi.fn(), delete: vi.fn(), count: vi.fn() },
    product: { findUnique: vi.fn(), create: vi.fn(), findFirst: vi.fn(), update: vi.fn(), delete: vi.fn(), count: vi.fn(), findMany: vi.fn() },
    cart: { findUnique: vi.fn(), create: vi.fn(), findFirst: vi.fn(), update: vi.fn(), delete: vi.fn(), count: vi.fn() },
    cartItem: { findUnique: vi.fn(), create: vi.fn(), findFirst: vi.fn(), update: vi.fn(), delete: vi.fn(), count: vi.fn(), deleteMany: vi.fn() },
    order: { findUnique: vi.fn(), create: vi.fn(), findFirst: vi.fn(), update: vi.fn(), delete: vi.fn(), count: vi.fn(), findMany: vi.fn() },
    address: { findUnique: vi.fn() },
    coupon: { findUnique: vi.fn(), update: vi.fn() },
    orderTracking: { create: vi.fn() },
    $transaction: vi.fn(async (cb) => {
      if (typeof cb === 'function') return cb({
         user: { findUnique: vi.fn(), create: vi.fn(), findFirst: vi.fn(), update: vi.fn(), delete: vi.fn(), count: vi.fn() },
         product: { findUnique: vi.fn(), create: vi.fn(), findFirst: vi.fn(), update: vi.fn(), delete: vi.fn(), count: vi.fn(), findMany: vi.fn() },
         cartItem: { deleteMany: vi.fn() },
         cart: { update: vi.fn() },
         order: { create: vi.fn(), update: vi.fn() },
         coupon: { update: vi.fn() },
         orderTracking: { create: vi.fn() }
      })
      return cb
    }),
  }
}))

vi.mock('../../config/redis', () => ({
  redis: {
    on: vi.fn(),
    get: vi.fn().mockResolvedValue(null),
    set: vi.fn().mockResolvedValue('OK'),
    del: vi.fn().mockResolvedValue(1),
  }
}))

vi.mock('../../config/algolia', () => ({
  searchIndex: {
    saveObject: vi.fn(),
    deleteObject: vi.fn(),
    search: vi.fn(),
  }
}))

vi.mock('algoliasearch', () => ({
  algoliasearch: vi.fn(() => ({
    initIndex: vi.fn(() => ({
      saveObject: vi.fn(),
      deleteObject: vi.fn(),
      search: vi.fn(),
    }))
  }))
}))

vi.mock('razorpay', () => ({
  default: class {
    orders = { create: vi.fn().mockResolvedValue({ id: 'rzp123' }) }
  }
}))
