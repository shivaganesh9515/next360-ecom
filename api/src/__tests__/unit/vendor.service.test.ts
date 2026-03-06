import { describe, it, expect, vi, beforeEach } from 'vitest'
import * as vendorService from '../../modules/vendor/vendor.service'
import { prisma } from '../../config/database'
import { AppError } from '../../shared/errors/AppError'

vi.mock('../../config/database', () => ({
  prisma: {
    vendorProfile: { findUnique: vi.fn(), update: vi.fn() },
    product: { findMany: vi.fn(), findFirst: vi.fn(), create: vi.fn(), update: vi.fn(), delete: vi.fn() },
    order: { findMany: vi.fn() },
    payout: { findMany: vi.fn(), create: vi.fn() },
    review: { findMany: vi.fn() },
  }
}))

describe('Vendor Service', () => {
  const mockVendor = { id: 'v-123', userId: 'user-v', storeName: 'Organic Shop' }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getProducts', () => {
    it('should only return products belonging to the active vendor', async () => {
      vi.mocked(prisma.product.findMany).mockResolvedValue([{ id: 'p1', vendorId: 'v-123' }] as any)
      
      const result = await vendorService.getProducts('user-v', {})
      
      expect(prisma.product.findMany).toHaveBeenCalledWith(expect.objectContaining({
        where: { vendor: { userId: 'user-v' } }
      }))
      expect(result).toHaveLength(1)
    })
  })

  describe('updateProduct', () => {
    it('should throw NOT_FOUND if product belongs to different vendor', async () => {
      vi.mocked(prisma.product.findFirst).mockResolvedValue(null)

      await expect(vendorService.updateProduct('user-v', 'p-other', {}))
        .rejects.toThrow('Product not found')
    })

    it('should update product if owned by vendor', async () => {
      vi.mocked(prisma.product.findFirst).mockResolvedValue({ id: 'p1', vendorId: 'v-123' } as any)
      vi.mocked(prisma.product.update).mockResolvedValue({ id: 'p1' } as any)

      await vendorService.updateProduct('user-v', 'p1', { name: 'Updated' })

      expect(prisma.product.update).toHaveBeenCalledWith(expect.objectContaining({
        where: { id: 'p1' },
        data: expect.objectContaining({ name: 'Updated' })
      }))
    })
  })

  describe('getPayouts', () => {
    it('should return payouts for the specific vendor', async () => {
      vi.mocked(prisma.vendorProfile.findUnique).mockResolvedValue(mockVendor as any)
      vi.mocked(prisma.payout.findMany).mockResolvedValue([{ id: 'pay-1', amount: 5000 }] as any)

      const result = await vendorService.getPayouts('user-v')

      expect(prisma.payout.findMany).toHaveBeenCalledWith({ where: { vendorId: 'v-123' } })
      expect(result).toHaveLength(1)
    })
  })
})
