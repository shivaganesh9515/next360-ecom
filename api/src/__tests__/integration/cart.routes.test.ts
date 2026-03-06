import { describe, it, expect, vi, beforeEach } from 'vitest'
import request from 'supertest'
import { app } from '../../app'
import { prisma } from '../../config/database'

vi.mock('../../config/database', () => ({
  prisma: {
    cart: {
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
    },
    cartItem: {
      findFirst: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
    product: {
      findUnique: vi.fn(),
    }
  }
}))

describe('Cart Routes', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('GET /api/cart', () => {
    it('should return cart for the user', async () => {
      vi.mocked(prisma.cart.findUnique).mockResolvedValue({
        id: 'c1',
        userId: 'user-123',
        items: []
      } as any)

      const res = await request(app).get('/api/cart')

      expect(res.status).toBe(200)
      expect(res.body.id).toBe('c1')
    })
  })

  describe('POST /api/cart/items', () => {
    it('should add item to cart', async () => {
      vi.mocked(prisma.product.findUnique).mockResolvedValue({ id: 'p1', inStock: true, stockCount: 10 } as any)
      vi.mocked(prisma.cart.findUnique).mockResolvedValue({ id: 'c1' } as any)

      const res = await request(app)
        .post('/api/cart/items')
        .send({ productId: 'p1', quantity: 1, selectedWeight: '1kg' })

      expect(res.status).toBe(200)
    })
  })
})
