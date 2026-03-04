export type OrderStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'PROCESSING'
  | 'PACKED'
  | 'DISPATCHED'
  | 'DELIVERED'
  | 'CANCELLED'
  | 'REFUNDED'

export interface Order {
  id: string
  orderNumber: string
  userId: string
  addressId: string
  address?: import('./user').Address
  paymentMethod: string
  paymentId?: string
  razorpayOrderId?: string
  status: OrderStatus
  subtotal: number
  deliveryFee: number
  discount: number
  total: number
  notes?: string
  placedAt: string
  expectedBy?: string
  items: OrderItem[]
  tracking?: OrderTracking[]
}

export interface OrderItem {
  id: string
  orderId: string
  productId: string
  productName: string
  productImage: string
  selectedWeight: string
  quantity: number
  unitPrice: number
  totalPrice: number
}

export interface OrderTracking {
  id: string
  orderId: string
  status: string
  message: string
  createdAt: string
}
