import type { Product } from './product'

export interface CartItem {
  id: string
  cartId: string
  productId: string
  product: Product
  quantity: number
  selectedWeight: string
}

export interface Cart {
  id: string
  userId: string
  items: CartItem[]
  couponId?: string
  coupon?: Coupon
}

export interface Coupon {
  id: string
  code: string
  type: 'PERCENT' | 'FLAT'
  value: number
  minOrder: number
  maxUses: number
  usedCount: number
  expiresAt: string
  isActive: boolean
}
