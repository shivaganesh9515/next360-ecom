import React from 'react'
import { Badge } from '@next360/ui'
import { OrderStatus } from '@next360/types'

interface OrderStatusBadgeProps {
  status: OrderStatus
}

const OrderStatusBadge = ({ status }: OrderStatusBadgeProps) => {
  const map: Record<OrderStatus, { variant: string, label: string }> = {
    PENDING:    { variant: 'warning',  label: '⏳ Pending' },
    CONFIRMED:  { variant: 'info',     label: '✅ Confirmed' },
    PROCESSING: { variant: 'info',     label: '🔄 Processing' },
    PACKED:     { variant: 'info',     label: '📦 Packed' },
    DISPATCHED: { variant: 'warning',  label: '🚚 On the Way' },
    DELIVERED:  { variant: 'success',  label: '✓ Delivered' },
    CANCELLED:  { variant: 'error',    label: '✗ Cancelled' },
    REFUNDED:   { variant: 'warning',  label: '↩ Refunded' },
  }
  const config = map[status] || map.PENDING
  return <Badge variant={config.variant as any} className="font-bold">{config.label}</Badge>
}

export default OrderStatusBadge
