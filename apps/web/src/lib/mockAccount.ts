import { User, Order, OrderStatus, Subscription } from '@next360/types'
import { MOCK_PRODUCTS } from './mockData'
import { MOCK_ADDRESSES } from './mockOrders'

export const MOCK_USER: User = {
  id: 'user-001',
  name: 'Priya Sharma',
  email: 'priya@example.com',
  phone: '9876543210',
  role: 'CUSTOMER',
  avatar: undefined,
  healthGoals: ['protein', 'immunity'],
  seeds: 3240,
  isVerified: true,
  createdAt: '2024-06-15T00:00:00Z',
}

export const MOCK_ORDERS: Order[] = [
  {
    id: 'order-001',
    orderNumber: 'ORD-N360-8492',
    userId: 'user-001',
    addressId: MOCK_ADDRESSES?.[0]?.id || 'addr-1',
    address: MOCK_ADDRESSES?.[0] || ({} as any),
    paymentMethod: 'UPI',
    status: 'DELIVERED',
    subtotal: 145000,
    deliveryFee: 0,
    discount: 10000,
    total: 135000,
    placedAt: '2024-08-10T09:00:00Z',
    expectedBy: '2024-08-12T18:00:00Z',
    items: [
      {
        id: 'oi-1',
        orderId: 'order-001',
        productId: MOCK_PRODUCTS?.[0]?.id || 'p1',
        productName: MOCK_PRODUCTS?.[0]?.name || 'Product',
        productImage: MOCK_PRODUCTS?.[0]?.images?.[0] || '',
        selectedWeight: '500g',
        quantity: 2,
        unitPrice: MOCK_PRODUCTS?.[0]?.price || 0,
        totalPrice: (MOCK_PRODUCTS?.[0]?.price || 0) * 2,
      },
      {
        id: 'oi-2',
        orderId: 'order-001',
        productId: MOCK_PRODUCTS?.[1]?.id || 'p2',
        productName: MOCK_PRODUCTS?.[1]?.name || 'Product',
        productImage: MOCK_PRODUCTS?.[1]?.images?.[0] || '',
        selectedWeight: '1kg',
        quantity: 1,
        unitPrice: MOCK_PRODUCTS?.[1]?.price || 0,
        totalPrice: MOCK_PRODUCTS?.[1]?.price || 0,
      }
    ]
  },
  {
    id: 'order-002',
    orderNumber: 'ORD-N360-8501',
    userId: 'user-001',
    addressId: MOCK_ADDRESSES?.[0]?.id || 'addr-1',
    address: MOCK_ADDRESSES?.[0] || ({} as any),
    paymentMethod: 'CARD',
    status: 'DELIVERED',
    subtotal: 85000,
    deliveryFee: 5000,
    discount: 0,
    total: 90000,
    placedAt: '2024-08-01T14:30:00Z',
    expectedBy: '2024-08-03T18:00:00Z',
    items: [
      {
        id: 'oi-3',
        orderId: 'order-002',
        productId: MOCK_PRODUCTS?.[2]?.id || 'p3',
        productName: MOCK_PRODUCTS?.[2]?.name || 'Product',
        productImage: MOCK_PRODUCTS?.[2]?.images?.[0] || '',
        selectedWeight: '250g',
        quantity: 1,
        unitPrice: MOCK_PRODUCTS?.[2]?.price || 0,
        totalPrice: MOCK_PRODUCTS?.[2]?.price || 0,
      }
    ]
  },
  {
    id: 'order-003',
    orderNumber: 'ORD-N360-8555',
    userId: 'user-001',
    addressId: MOCK_ADDRESSES?.[1]?.id || 'addr-2',
    address: MOCK_ADDRESSES?.[1] || ({} as any),
    paymentMethod: 'NET_BANKING',
    status: 'DISPATCHED',
    subtotal: 210000,
    deliveryFee: 0,
    discount: 20000,
    total: 190000,
    placedAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    expectedBy: new Date(Date.now() + 86400000).toISOString(), // tomorrow
    items: [
      {
        id: 'oi-4',
        orderId: 'order-003',
        productId: MOCK_PRODUCTS?.[3]?.id || 'p4',
        productName: MOCK_PRODUCTS?.[3]?.name || 'Product',
        productImage: MOCK_PRODUCTS?.[3]?.images?.[0] || '',
        selectedWeight: '1L',
        quantity: 2,
        unitPrice: MOCK_PRODUCTS?.[3]?.price || 0,
        totalPrice: (MOCK_PRODUCTS?.[3]?.price || 0) * 2,
      },
      {
        id: 'oi-5',
        orderId: 'order-003',
        productId: MOCK_PRODUCTS?.[4]?.id || 'p5',
        productName: MOCK_PRODUCTS?.[4]?.name || 'Product',
        productImage: MOCK_PRODUCTS?.[4]?.images?.[0] || '',
        selectedWeight: '500g',
        quantity: 1,
        unitPrice: MOCK_PRODUCTS?.[4]?.price || 0,
        totalPrice: MOCK_PRODUCTS?.[4]?.price || 0,
      }
    ]
  },
  {
    id: 'order-004',
    orderNumber: 'ORD-N360-8602',
    userId: 'user-001',
    addressId: MOCK_ADDRESSES?.[0]?.id || 'addr-1',
    address: MOCK_ADDRESSES?.[0] || ({} as any),
    paymentMethod: 'UPI',
    status: 'CONFIRMED',
    subtotal: 54000,
    deliveryFee: 5000,
    discount: 5000,
    total: 54000,
    placedAt: new Date().toISOString(), // today
    expectedBy: new Date(Date.now() + 172800000).toISOString(), // 2 days
    items: [
      {
        id: 'oi-6',
        orderId: 'order-004',
        productId: MOCK_PRODUCTS?.[5]?.id || 'p6',
        productName: MOCK_PRODUCTS?.[5]?.name || 'Product',
        productImage: MOCK_PRODUCTS?.[5]?.images?.[0] || '',
        selectedWeight: '1kg',
        quantity: 1,
        unitPrice: MOCK_PRODUCTS?.[5]?.price || 0,
        totalPrice: MOCK_PRODUCTS?.[5]?.price || 0,
      }
    ]
  },
  {
    id: 'order-005',
    orderNumber: 'ORD-N360-8450',
    userId: 'user-001',
    addressId: MOCK_ADDRESSES?.[0]?.id || 'addr-1',
    address: MOCK_ADDRESSES?.[0] || ({} as any),
    paymentMethod: 'COD',
    status: 'CANCELLED',
    subtotal: 30000,
    deliveryFee: 5000,
    discount: 0,
    total: 35000,
    placedAt: '2024-07-20T10:00:00Z',
    expectedBy: '2024-07-22T18:00:00Z',
    items: [
      {
        id: 'oi-7',
        orderId: 'order-005',
        productId: MOCK_PRODUCTS?.[6]?.id || 'p7',
        productName: MOCK_PRODUCTS?.[6]?.name || 'Product',
        productImage: MOCK_PRODUCTS?.[6]?.images?.[0] || '',
        selectedWeight: '250g',
        quantity: 2,
        unitPrice: MOCK_PRODUCTS?.[6]?.price || 0,
        totalPrice: (MOCK_PRODUCTS?.[6]?.price || 0) * 2,
      }
    ]
  }
]

export const MOCK_SUBSCRIPTIONS: Subscription[] = [
  {
    id: 'sub-001',
    userId: 'user-001',
    boxType: 'VEGGIE',
    frequency: 'WEEKLY',
    status: 'ACTIVE',
    price: 69900,
    deliveryDay: 5,
    nextDelivery: new Date(Date.now() + 86400000 * 3).toISOString(),
    createdAt: new Date(Date.now() - 86400000 * 30).toISOString(),
    items: [
      { id: 'si-1', subscriptionId: 'sub-001', productId: 'p1', quantity: 1, selectedWeight: '1kg' },
      { id: 'si-2', subscriptionId: 'sub-001', productId: 'p2', quantity: 1, selectedWeight: '500g' },
    ]
  },
  {
    id: 'sub-002',
    userId: 'user-001',
    boxType: 'PROTEIN',
    frequency: 'BIWEEKLY',
    status: 'PAUSED',
    price: 99900,
    deliveryDay: 1,
    nextDelivery: new Date(Date.now() + 86400000 * 14).toISOString(),
    createdAt: new Date(Date.now() - 86400000 * 60).toISOString(),
    items: [
      { id: 'si-3', subscriptionId: 'sub-002', productId: 'p4', quantity: 2, selectedWeight: '1L' },
    ]
  }
]

export interface SeedsTransaction {
  id: string
  action: string
  amount: number
  balance: number
  date: string
}

export const MOCK_SEEDS_TRANSACTIONS: SeedsTransaction[] = [
  { id: 'tx-1', action: 'Referral Success', amount: 300, balance: 3240, date: new Date(Date.now() - 86400000 * 2).toISOString() },
  { id: 'tx-2', action: 'Subscription Created', amount: 75, balance: 2940, date: new Date(Date.now() - 86400000 * 5).toISOString() },
  { id: 'tx-3', action: 'Goal Completed', amount: 100, balance: 2865, date: new Date(Date.now() - 86400000 * 10).toISOString() },
  { id: 'tx-4', action: 'Order Placed', amount: 50, balance: 2765, date: new Date(Date.now() - 86400000 * 15).toISOString() },
  { id: 'tx-5', action: 'New Product Tried', amount: 30, balance: 2715, date: new Date(Date.now() - 86400000 * 20).toISOString() },
  { id: 'tx-6', action: 'Review Posted', amount: 40, balance: 2685, date: new Date(Date.now() - 86400000 * 25).toISOString() },
  { id: 'tx-7', action: 'Order Placed', amount: 45, balance: 2645, date: new Date(Date.now() - 86400000 * 30).toISOString() },
  { id: 'tx-8', action: 'First Order', amount: 50, balance: 2600, date: new Date(Date.now() - 86400000 * 45).toISOString() },
]

export const MOCK_IMPACT = {
  farmersSupported: 7,
  organicOrders: 34,
  pesticidesAvoided: 18.4,
  waterSaved: 2400,
  plasticFreeDeliveries: 31,
  carbonSaved: 12.3
}
