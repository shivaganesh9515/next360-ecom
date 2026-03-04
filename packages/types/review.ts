export interface Review {
  id: string
  userId: string
  user?: {
    name: string
    avatar?: string
  }
  productId: string
  rating: number
  comment: string
  images: string[]
  vendorReply?: string
  isVerified: boolean
  isFlagged: boolean
  createdAt: string
}
