import { describe, it, expect, vi, beforeEach } from 'vitest'
import request from 'supertest'
import { app } from '../../app'
import { prisma } from '../../config/database'

vi.mock('../../config/database', () => ({
  prisma: {
    product: {
      findMany: vi.fn(),
      count: vi.fn(),
      findUnique: vi.fn(),
    }
  }
}))

describe('Products Routes', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('GET /api/products', () => {
    it('should return paginated list of products', async () => {
      vi.mocked(prisma.product.findMany).mockResolvedValue([
        { id: 'p1', name: 'Product 1', price: 1000, category: 'FRUITS' }
      ] as any)
      vi.mocked(prisma.product.count).mockResolvedValue(1)

      const res = await request(app).get('/api/products?page=1&limit=10')

      expect(res.status).toBe(200)
      expect(res.body.data).toHaveLength(1)
      expect(res.body.pagination).toBeDefined()
    })
  })

  describe('GET /api/products/:slug', () => {
    it('should return 404 for unknown slug', async () => {
      vi.mocked(prisma.product.findUnique).mockResolvedValue(null)

      const res = await request(app).get('/api/products/non-existent')

      expect(res.status).toBe(404)
    })
  })
})
