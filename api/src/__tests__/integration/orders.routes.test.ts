import { describe, it, expect, vi, beforeEach } from 'vitest'
import request from 'supertest'
import { app } from '../../app'
import { prisma } from '../../config/database'

vi.mock('../../config/database', () => ({
  prisma: {
    address: { findUnique: vi.fn() },
    order: { findFirst: vi.fn(), findMany: vi.fn(), create: vi.fn(), update: vi.fn() },
    orderTracking: { create: vi.fn() },
    cart: { findUnique: vi.fn(), update: vi.fn() },
    cartItem: { deleteMany: vi.fn() },
    product: { update: vi.fn(), findUnique: vi.fn() },
    $transaction: vi.fn(async (cb) => {
      if (typeof cb === 'function') return cb(prisma)
      return cb
    }),
  }
}))

// Mock Razorpay
vi.mock('razorpay', () => ({
  default: class {
    orders = { create: vi.fn().mockResolvedValue({ id: 'rzp123' }) }
  }
}))

describe('Orders Routes', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('POST /api/orders', () => {
    it('should create order and return razorpayOrderId', async () => {
      vi.mocked(prisma.cart.findUnique).mockResolvedValue({
        id: 'c1',
        items: [{ productId: 'p1', quantity: 1, product: { name: 'P1', price: 1000, images: [], stockCount: 10, inStock: true } }]
      } as any)
      vi.mocked(prisma.address.findUnique).mockResolvedValue({ id: 'a1', userId: 'user-123' } as any)
      vi.mocked(prisma.order.create).mockResolvedValue({ id: 'o1', total: 1000 } as any)

      const res = await request(app)
        .post('/api/orders')
        .send({ addressId: 'a1', paymentMethod: 'RAZORPAY' })

      expect(res.status).toBe(200)
      expect(res.body.razorpayOrder).toBeDefined()
    })
  })

  describe('GET /api/orders/:id', () => {
    it('customer A cannot GET customer Bs order', async () => {
      vi.mocked(prisma.order.findFirst).mockResolvedValue(null) // Not found for this user

      const res = await request(app).get('/api/orders/other-order-id')

      expect(res.status).toBe(404)
    })
  })
})
