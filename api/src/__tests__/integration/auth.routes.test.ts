import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mocks must be BEFORE imports that use them
vi.mock('../../middleware/auth', () => ({
  authenticate: (req: any, res: any, next: any) => {
    req.user = { id: 'user-123', email: 'test@example.com', role: 'CUSTOMER' }
    next()
  },
  optionalAuth: (req: any, res: any, next: any) => next(),
  requireRole: () => (req: any, res: any, next: any) => next(),
}))

vi.mock('../../middleware/rateLimit', () => ({
  authRateLimit: (req: any, res: any, next: any) => next(),
  registerRateLimit: (req: any, res: any, next: any) => next(),
  apiRateLimit: (req: any, res: any, next: any) => next(),
  adminRateLimit: (req: any, res: any, next: any) => next(),
}))

vi.mock('../../middleware/validate', () => ({
  validate: () => (req: any, res: any, next: any) => next(),
}))

import request from 'supertest'
import { app } from '../../app'
import { prisma } from '../../config/database'
import { redis } from '../../config/redis'

vi.mock('../../config/database', () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
      create: vi.fn(),
    }
  }
}))

vi.mock('../../config/redis', () => ({
  redis: {
    set: vi.fn(),
    get: vi.fn(),
    del: vi.fn(),
  }
}))

describe('Auth Routes', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('POST /api/auth/register', () => {
    it('should return 201 on valid data', async () => {
      vi.mocked(prisma.user.findUnique).mockResolvedValue(null)
      vi.mocked(prisma.user.create).mockResolvedValue({
        id: 'u1',
        email: 'test@test.com',
        role: 'CUSTOMER'
      } as any)

      const res = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'test@test.com',
          password: 'Password123!',
          name: 'Test'
        })

      expect(res.status).toBe(201)
      expect(res.body.accessToken).toBeDefined()
    })
  })
})
