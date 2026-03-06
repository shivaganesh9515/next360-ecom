import { prisma } from '../../config/database'
import { AppError } from '../../shared/errors/AppError'
import Razorpay from 'razorpay'
import { env } from '../../config/env'
import { generateOrderNumber, verifyRazorpaySignature } from '../../shared/utils/crypto'

const razorpay = new Razorpay({
  key_id: env.RAZORPAY_KEY_ID || 'dummy_key',
  key_secret: env.RAZORPAY_KEY_SECRET || 'dummy_secret',
})

// Use getCart to recalculate and guarantee totals before checkout
import { getCart } from '../cart/cart.service'

export async function createOrder(userId: string, addressId: string, paymentMethod: string) {
  const cart = await getCart(userId)

  if (cart.items.length === 0) {
    throw AppError.badRequest('Cart is empty')
  }

  const address = await prisma.address.findUnique({
    where: { id: addressId, userId }
  })
  if (!address) throw AppError.notFound('Address not found')

  // Check inventory again
  for (const item of cart.items) {
    if (item.product.stockCount < item.quantity || !item.product.inStock) {
      throw AppError.badRequest(`Product ${item.product.name} is out of stock`)
    }
  }

  // Create order
  const orderNumber = generateOrderNumber()
  
  // Use a transaction for stock decrement and order creation
  const order = await prisma.$transaction(async (tx) => {
    
    // Decrement stock
    for (const item of cart.items) {
      await tx.product.update({
        where: { id: item.productId },
        data: { stockCount: { decrement: item.quantity } }
      })
    }

    const newOrder = await tx.order.create({
      data: {
        orderNumber,
        userId,
        addressId,
        paymentMethod,
        subtotal: cart.subtotal,
        deliveryFee: cart.deliveryFee,
        discount: cart.discount,
        total: cart.total,
        status: 'PENDING',
        items: {
          create: cart.items.map((i: any) => ({
            productId: i.productId,
            productName: i.product.name,
            productImage: i.product.images[0] || '',
            selectedWeight: i.selectedWeight,
            quantity: i.quantity,
            unitPrice: i.product.price,
            totalPrice: i.product.price * i.quantity,
          }))
        },
        tracking: {
          create: [{ status: 'PENDING', message: 'Order created, awaiting payment' }]
        }
      }
    })

    // Consume coupon if applicable
    if (cart.coupon) {
      await tx.coupon.update({
        where: { id: cart.coupon.id },
        data: { usedCount: { increment: 1 } }
      })
    }

    // Clear cart (don't delete cart entirely, just items and coupon)
    await tx.cartItem.deleteMany({ where: { cartId: cart.id } })
    await tx.cart.update({
      where: { id: cart.id },
      data: { couponId: null }
    })

    return newOrder
  })

  // If Razorpay, generate order ID
  let razorpayOrder = null
  if (paymentMethod !== 'COD') {
    try {
      razorpayOrder = await razorpay.orders.create({
        amount: order.total, // paise
        currency: 'INR',
        receipt: order.id,
      })
      
      await prisma.order.update({
        where: { id: order.id },
        data: { paymentId: razorpayOrder.id }
      })
      
    } catch (err: any) {
      // In case Razorpay fails, reverse the stock or leave as PENDING failed payment.
      // Usually, we'll leave as PENDING and handle expiration later via cron job.
      throw AppError.internal('Failed to initialize payment gateway')
    }
  } else {
    // For COD, mark as Confirmed immediately
    await prisma.order.update({
      where: { id: order.id },
      data: { status: 'CONFIRMED' }
    })
    await prisma.orderTracking.create({
      data: { orderId: order.id, status: 'CONFIRMED', message: 'Cash on delivery confirmed' }
    })
    
    // TODO: Publish Order Confirmed Event
  }

  return { order, razorpayOrder }
}

export async function verifyPayment(userId: string, data: any) {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = data

  const isValid = verifyRazorpaySignature(
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    env.RAZORPAY_KEY_SECRET || 'dummy_secret'
  )

  if (!isValid) {
    throw AppError.badRequest('Invalid payment signature')
  }

  const order = await prisma.order.findFirst({
    where: { paymentId: razorpay_order_id, userId }
  })

  if (!order) throw AppError.notFound('Order not found')

  await prisma.$transaction([
    prisma.order.update({
      where: { id: order.id },
      data: { status: 'CONFIRMED' }
    }),
    prisma.orderTracking.create({
      data: { orderId: order.id, status: 'CONFIRMED', message: 'Payment verified successfully' }
    })
  ])
  
  // TODO: Publish Order Confirmed Event (Emails, SMS)

  return { success: true, orderId: order.id }
}

export async function getMyOrders(userId: string) {
  return prisma.order.findMany({
    where: { userId },
    include: { items: true },
    orderBy: { placedAt: 'desc' }
  })
}

export async function getOrderById(userId: string, orderId: string) {
  const order = await prisma.order.findFirst({
    where: { id: orderId, userId },
    include: { items: true, tracking: { orderBy: { timestamp: 'desc' } }, address: true }
  })
  
  if (!order) throw AppError.notFound('Order not found')
  return order
}

export async function cancelOrder(userId: string, orderId: string) {
  const order = await prisma.order.findFirst({
    where: { id: orderId, userId },
    include: { items: true }
  })
  
  if (!order) throw AppError.notFound('Order not found')
  
  if (['DISPATCHED', 'DELIVERED', 'CANCELLED'].includes(order.status)) {
    throw AppError.badRequest(`Cannot cancel order in ${order.status} status`)
  }

  await prisma.$transaction(async (tx) => {
    // Restore stock
    for (const item of order.items) {
      await tx.product.update({
        where: { id: item.productId },
        data: { stockCount: { increment: item.quantity } }
      })
    }

    // Cancel order
    await tx.order.update({
      where: { id: order.id },
      data: { status: 'CANCELLED' }
    })

    await tx.orderTracking.create({
      data: { orderId: order.id, status: 'CANCELLED', message: 'Order cancelled by user' }
    })
  })
  
  // TODO: Publish Refund Event if already paid
  return { success: true }
}
