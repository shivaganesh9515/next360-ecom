import { prisma } from '../../config/database'
import { AppError } from '../../shared/errors/AppError'

export async function getCart(userId: string) {
  let cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: { include: { product: true } },
      coupon: true,
    }
  })

  // Create if doesn't exist
  if (!cart) {
    cart = await prisma.cart.create({
      data: { userId },
      include: {
        items: { include: { product: true } },
        coupon: true,
      }
    })
  }

  return calculateCartTotals(cart)
}

export async function addItem(userId: string, productId: string, quantity: number, selectedWeight: string) {
  const product = await prisma.product.findUnique({ where: { id: productId } })
  if (!product || !product.inStock) {
    throw AppError.badRequest('Product not available')
  }

  if (product.stockCount < quantity) {
    throw AppError.badRequest('Insufficient stock')
  }

  let cart = await prisma.cart.findUnique({ where: { userId } })
  if (!cart) {
    cart = await prisma.cart.create({ data: { userId } })
  }

  const existingItem = await prisma.cartItem.findFirst({
    where: {
      cartId: cart.id,
      productId,
      selectedWeight,
    }
  })

  if (existingItem) {
    await prisma.cartItem.update({
      where: { id: existingItem.id },
      data: { quantity: existingItem.quantity + quantity }
    })
  } else {
    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        quantity,
        selectedWeight,
      }
    })
  }

  return getCart(userId)
}

export async function updateQty(userId: string, cartItemId: string, quantity: number) {
  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: { items: true }
  })

  if (!cart) throw AppError.notFound('Cart not found')

  const item = cart.items.find(i => i.id === cartItemId)
  if (!item) throw AppError.notFound('Item not found in cart')

  if (quantity <= 0) {
    await prisma.cartItem.delete({ where: { id: cartItemId } })
  } else {
    // Check stock
    const product = await prisma.product.findUnique({ where: { id: item.productId } })
    if (!product || product.stockCount < quantity) {
      throw AppError.badRequest('Insufficient stock')
    }

    await prisma.cartItem.update({
      where: { id: cartItemId },
      data: { quantity }
    })
  }

  return getCart(userId)
}

export async function removeItem(userId: string, cartItemId: string) {
  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: { items: true }
  })

  if (!cart) throw AppError.notFound('Cart not found')

  const item = cart.items.find(i => i.id === cartItemId)
  if (!item) throw AppError.notFound('Item not found in cart')

  await prisma.cartItem.delete({ where: { id: cartItemId } })

  return getCart(userId)
}

export async function applyCoupon(userId: string, code: string) {
  const cart = await getCart(userId)
  
  if (cart.items.length === 0) {
    throw AppError.badRequest('Add items to cart before applying coupon')
  }

  const coupon = await prisma.coupon.findUnique({ where: { code } })
  if (!coupon) throw AppError.notFound('Invalid coupon code')

  if (!coupon.isActive || new Date() > coupon.expiresAt) {
    throw AppError.badRequest('Coupon expired or inactive')
  }

  if (coupon.maxUses > 0 && coupon.usedCount >= coupon.maxUses) {
    throw AppError.badRequest('Coupon usage limit reached')
  }

  if (cart.subtotal < coupon.minOrder) {
    throw AppError.badRequest(`Minimum order amount is ₹${coupon.minOrder / 100}`)
  }

  await prisma.cart.update({
    where: { id: cart.id },
    data: { couponId: coupon.id }
  })

  return getCart(userId)
}

export async function removeCoupon(userId: string) {
  await prisma.cart.update({
    where: { userId },
    data: { couponId: null }
  })
  
  return getCart(userId)
}

// Internal Helper
function calculateCartTotals(cart: any) {
  let subtotal = 0
  
  cart.items.forEach((item: any) => {
    subtotal += item.product.price * item.quantity
  })

  let discount = 0
  if (cart.coupon) {
    if (cart.coupon.discountType === 'PERCENTAGE') {
      discount = Math.floor(subtotal * (cart.coupon.amount / 100))
    } else {
      discount = cart.coupon.amount
    }
  }

  const deliveryFee = subtotal >= 49900 ? 0 : 4900
  const total = Math.max(0, subtotal - discount) + deliveryFee

  return {
    ...cart,
    subtotal,
    discount,
    deliveryFee,
    total,
  }
}
