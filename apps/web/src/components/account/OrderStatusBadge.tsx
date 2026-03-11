import React from 'react'
import { Badge } from '@next360/ui'
import { OrderStatus } from '@next360/types'

interface OrderStatusBadgeProps {
  status: OrderStatus
}

const OrderStatusBadge = ({ status }: OrderStatusBadgeProps) => {
  const map: Record<OrderStatus, { variant: string, label: string }> = {
    PENDING:    { variant: 'warning',  label: 'PRE-TRACING' },
    CONFIRMED:  { variant: 'info',     label: 'LOCKED' },
    PROCESSING: { variant: 'info',     label: 'SORTING' },
    PACKED:     { variant: 'info',     label: 'STAGED' },
    DISPATCHED: { variant: 'warning',  label: 'IN-TRANSIT' },
    DELIVERED:  { variant: 'success',  label: 'DEPLOYED' },
    CANCELLED:  { variant: 'error',    label: 'TERMINATED' },
    REFUNDED:   { variant: 'warning',  label: 'RETURNED' },
  }
  const config = map[status] || map.PENDING
  return (
    <Badge 
      variant={config.variant as any} 
      className="font-black text-[8px] uppercase tracking-[0.4em] px-5 py-2 rounded-full border-none shadow-lg shadow-slate-900/5 group-hover:scale-105 transition-transform"
    >
      <span className="inline-block w-1.5 h-1.5 rounded-full bg-current mr-2 opacity-50" />
      {config.label}
    </Badge>
  )
}

export default OrderStatusBadge
