export interface Notification {
  id: string
  userId: string
  type: string
  title: string
  message: string
  isRead: boolean
  createdAt: string
}

export interface SeedsTransaction {
  id: string
  userId: string
  action: string
  seeds: number
  balance: number
  createdAt: string
}
