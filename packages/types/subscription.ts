export type SubscriptionBox =
  'VEGGIE' | 'FRUIT' | 'PROTEIN' | 'FAMILY' | 'CUSTOM'

export type SubscriptionFreq =
  'WEEKLY' | 'BIWEEKLY' | 'MONTHLY'

export type SubscriptionStatus =
  'ACTIVE' | 'PAUSED' | 'CANCELLED'

export interface Subscription {
  id: string
  userId: string
  boxType: SubscriptionBox
  frequency: SubscriptionFreq
  deliveryDay: number
  status: SubscriptionStatus
  price: number
  nextDelivery: string
  razorpaySubId?: string
  createdAt: string
  items: SubscriptionItem[]
}

export interface SubscriptionItem {
  id: string
  subscriptionId: string
  productId: string
  product?: import('./product').Product
  quantity: number
  selectedWeight: string
}
