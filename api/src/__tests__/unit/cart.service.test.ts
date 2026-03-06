import { describe, it, expect, vi, beforeEach } from 'vitest'
import * as cartService from '../../modules/cart/cart.service'
import { prisma } from '../../config/database'
import { AppError } from '../../shared/errors/AppError'

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
      deleteMany: vi.fn(),
    },
    product: {
      findUnique: vi.fn(),
    },
    coupon: {
      findUnique: vi.fn(),
    }
  }
}))

describe('Cart Service', () => {
  const mockProduct = {
    id: 'prod-123',
    name: 'Organic Apples',
    price: 10000,
    inStock: true,
    stockCount: 50,
  }

  const mockCart = {
    id: 'cart-123',
    userId: 'user-123',
    items: [],
    coupon: null,
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('addItem', () => {
    it('should create a new cart if none exists and add item', async () => {
      vi.mocked(prisma.product.findUnique).mockResolvedValue(mockProduct as any)
      vi.mocked(prisma.cart.findUnique).mockResolvedValue(null)
      vi.mocked(prisma.cart.create).mockResolvedValue(mockCart as any)
      vi.mocked(prisma.cartItem.findFirst).mockResolvedValue(null)

      // Mocking getCart return (it's called at the end of addItem)
      vi.mocked(prisma.cart.findUnique).mockResolvedValueOnce(null).mockResolvedValue({
        ...mockCart,
        items: [{ id: 'item-1', productId: 'prod-123', quantity: 2, product: mockProduct }]
      } as any)

      const result = await cartService.addItem('user-123', 'prod-123', 2, '1kg')

      expect(prisma.cart.create).toHaveBeenCalled()
      expect(prisma.cartItem.create).toHaveBeenCalled()
      expect(result.items).toHaveLength(1)
    })

    it('should throw BAD_REQUEST if stock is insufficient', async () => {
      vi.mocked(prisma.product.findUnique).mockResolvedValue({ ...mockProduct, stockCount: 1 } as any)

      await expect(cartService.addItem('user-123', 'prod-123', 5, '1kg'))
        .rejects.toThrow('Insufficient stock')
    })
  })

  describe('applyCoupon', () => {
    it('should apply a valid coupon', async () => {
      const activeCart = {
        ...mockCart,
        items: [{ product: mockProduct, quantity: 2 }],
        subtotal: 20000,
      }
      const mockCoupon = {
        id: 'coupon-123',
        code: 'SAVE10',
        isActive: true,
        expiresAt: new Date(Date.now() + 86400000),
        minOrder: 10000,
        amount: 1000,
        discountType: 'FIXED',
        usedCount: 0,
        maxUses: 100,
      }

      vi.mocked(prisma.cart.findUnique).mockResolvedValue(activeCart as any)
      vi.mocked(prisma.coupon.findUnique).mockResolvedValue(mockCoupon as any)

      await cartService.applyCoupon('user-123', 'SAVE10')

      expect(prisma.cart.update).toHaveBeenCalledWith({
        where: { id: 'cart-123' },
        data: { couponId: 'coupon-123' }
      })
    })

    it('should throw BAD_REQUEST if subtotal is below minOrder', async () => {
      const lowValueCart = {
        ...mockCart,
        items: [{ product: mockProduct, quantity: 1 }],
      }
      const mockCoupon = {
        id: 'coupon-123',
        code: 'SAVE10',
        isActive: true,
        expiresAt: new Date(Date.now() + 86400000),
        minOrder: 10000,
        amount: 1000,
        discountType: 'FIXED',
        usedCount: 0,
        maxUses: 100,
      }

      // Mocking getCart inside applyCoupon
      vi.mocked(prisma.cart.findUnique).mockResolvedValue({
        ...lowValueCart,
        items: [{ product: { ...mockProduct, price: 5000 }, quantity: 1 }] // subtotal 5000
      } as any)
      vi.mocked(prisma.coupon.findUnique).mockResolvedValue(mockCoupon as any)

      await expect(cartService.applyCoupon('user-123', 'SAVE10'))
        .rejects.toThrow(/Minimum order amount is ₹100/)
    })
  })
})
