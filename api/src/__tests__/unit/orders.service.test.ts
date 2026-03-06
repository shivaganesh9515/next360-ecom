import { describe, it, expect, vi, beforeEach } from 'vitest'
import * as ordersService from '../../modules/orders/orders.service'
import { prisma } from '../../config/database'
import * as cartService from '../../modules/cart/cart.service'
import * as cryptoUtils from '../../shared/utils/crypto'

vi.mock('../../config/database', () => ({
  prisma: {
    address: { findUnique: vi.fn() },
    order: { create: vi.fn(), update: vi.fn(), findFirst: vi.fn() },
    product: { update: vi.fn() },
    cartItem: { deleteMany: vi.fn() },
    cart: { update: vi.fn() },
    orderTracking: { create: vi.fn() },
    coupon: { update: vi.fn() },
    $transaction: vi.fn(async (cb) => {
      if (typeof cb === 'function') {
        return cb(prisma)
      }
      return cb
    }),
  }
}))

vi.mock('../../modules/cart/cart.service', () => ({
  getCart: vi.fn(),
}))

vi.mock('../../shared/utils/crypto', () => ({
  generateOrderNumber: vi.fn().mockReturnValue('N360-202311200001'),
  verifyRazorpaySignature: vi.fn().mockReturnValue(true),
}))

// Mock Razorpay
vi.mock('razorpay', () => {
  return {
    default: class {
      orders = {
        create: vi.fn().mockResolvedValue({ id: 'rzp_order_123' })
      }
    }
  }
})

describe('Orders Service', () => {
  const mockCart = {
    id: 'cart-123',
    items: [
      { productId: 'p1', quantity: 2, product: { name: 'Apples', price: 10000, images: ['img1.jpg'], stockCount: 10, inStock: true } }
    ],
    subtotal: 20000,
    deliveryFee: 4900,
    discount: 0,
    total: 24900,
    coupon: null,
  }

  const mockAddress = { id: 'addr-123', userId: 'user-123' }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('createOrder', () => {
    it('should create a Razorpay order from cart', async () => {
      vi.mocked(cartService.getCart).mockResolvedValue(mockCart as any)
      vi.mocked(prisma.address.findUnique).mockResolvedValue(mockAddress as any)
      vi.mocked(prisma.order.create).mockResolvedValue({ id: 'order-123', total: 24900 } as any)

      const result = await ordersService.createOrder('user-123', 'addr-123', 'RAZORPAY')

      expect(prisma.order.create).toHaveBeenCalled()
      expect(result.razorpayOrder).toBeDefined()
      expect(result.razorpayOrder?.id).toBe('rzp_order_123')
    })

    it('should throw BAD_REQUEST if cart is empty', async () => {
      vi.mocked(cartService.getCart).mockResolvedValue({ items: [] } as any)

      await expect(ordersService.createOrder('user-123', 'addr-123', 'COD'))
        .rejects.toThrow('Cart is empty')
    })
  })

  describe('verifyPayment', () => {
    it('should confirm order on valid signature', async () => {
      vi.mocked(prisma.order.findFirst).mockResolvedValue({ id: 'order-123' } as any)

      const result = await ordersService.verifyPayment('user-123', {
        razorpay_order_id: 'rzp123',
        razorpay_payment_id: 'pay123',
        razorpay_signature: 'sig123'
      })

      expect(result.success).toBe(true)
      expect(prisma.order.update).toHaveBeenCalledWith(expect.objectContaining({
        data: { status: 'CONFIRMED' }
      }))
    })

    it('should throw BAD_REQUEST on invalid signature', async () => {
      vi.mocked(cryptoUtils.verifyRazorpaySignature).mockReturnValue(false)

      await expect(ordersService.verifyPayment('user-123', {}))
        .rejects.toThrow('Invalid payment signature')
    })
  })
})
