import { cn } from '@next360/utils'
 
export const ORDER_STATUS_COLORS: Record<string, string> = {
  PENDING: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
  CONFIRMED: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  PROCESSING: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  SHIPPED: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  DELIVERED: 'bg-primary/20 text-primary border-primary/30',
  CANCELLED: 'bg-rose-500/10 text-rose-500 border-rose-500/20',
  REFUNDED: 'bg-white/5 text-slate-500 border-white/10',
}
 
interface OrderStatusBadgeProps {
  status: string
  className?: string
}
 
export function OrderStatusBadge({ status, className = '' }: OrderStatusBadgeProps) {
  const color = ORDER_STATUS_COLORS[status] || 'bg-white/5 text-slate-500 border-white/10'
  return (
    <span className={cn(
      "px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.3em] border shadow-inner italic transition-all",
      color,
      className
    )}>
      {status} Protocol
    </span>
  )
}
