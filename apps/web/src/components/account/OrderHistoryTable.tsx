import React from 'react'
import { Badge, Button } from '@next360/ui'
import { Order } from '@next360/types'
import { formatPrice } from '@next360/utils'
import { Package } from 'lucide-react'
import { OrderStatusBadge } from '@/app/account/orders/page'
import Link from 'next/link'

interface OrderHistoryTableProps {
  orders: Order[]
  onViewDetail: (order: Order) => void
}

export default function OrderHistoryTable({ orders, onViewDetail }: OrderHistoryTableProps) {
  if (orders.length === 0) {
    return (
      <div className="p-12 text-center flex flex-col items-center justify-center">
        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
          <Package className="text-slate-300" size={32} />
        </div>
        <h3 className="font-display text-xl font-bold text-slate-800 mb-2">No orders found</h3>
        <p className="text-slate-500 font-medium mb-6">Looks like you haven't placed any orders yet.</p>
        <Link href="/shop">
          <Button variant="primary" className="font-bold">Start Shopping</Button>
        </Link>
      </div>
    )
  }

  return (
    <>
      {/* Desktop Table (hidden on md-) */}
      <div className="hidden md:block w-full overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-slate-50/50 text-slate-500 font-bold uppercase tracking-wider text-xs border-b border-slate-100">
            <tr>
              <th className="px-6 py-4">Order #</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Items</th>
              <th className="px-6 py-4">Total</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {orders.map(order => (
              <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 font-mono font-bold text-primary">{order.orderNumber}</td>
                <td className="px-6 py-4 font-medium">
                  {new Date(order.placedAt).toLocaleDateString('en-IN', {
                    day: 'numeric', month: 'short', year: 'numeric'
                  })}
                </td>
                <td className="px-6 py-4 font-medium text-xs">
                  <span className="font-bold">{order.items.length} items</span>
                  <span className="text-slate-400 block truncate max-w-[150px]">
                    {order.items[0].productName} {order.items.length > 1 ? '& more' : ''}
                  </span>
                </td>
                <td className="px-6 py-4 font-bold">{formatPrice(order.total)}</td>
                <td className="px-6 py-4">
                  <OrderStatusBadge status={order.status} />
                </td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => onViewDetail(order)}
                    className="text-primary font-bold hover:underline text-xs uppercase tracking-widest mr-4"
                  >
                    View Details
                  </button>
                  {order.status === 'DELIVERED' && (
                    <button className="text-secondary font-bold hover:underline text-xs uppercase tracking-widest">
                      Reorder
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards (hidden on md+) */}
      <div className="md:hidden divide-y divide-slate-100">
        {orders.map(order => (
          <div key={order.id} className="p-4 space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-mono font-bold text-primary text-sm">{order.orderNumber}</p>
                <p className="text-xs font-bold text-slate-400 mt-0.5">
                  {new Date(order.placedAt).toLocaleDateString('en-IN', {
                    day: 'numeric', month: 'short', year: 'numeric'
                  })}
                </p>
              </div>
              <OrderStatusBadge status={order.status} />
            </div>
            
            <div className="flex justify-between items-center text-sm font-medium">
              <span className="text-slate-600">{order.items.length} items</span>
              <span className="font-bold text-slate-900">{formatPrice(order.total)}</span>
            </div>

            <div className="flex gap-2 pt-1 border-t border-slate-50">
              <Button variant="outline" className="flex-1 py-2 text-xs" onClick={() => onViewDetail(order)}>
                View Details
              </Button>
              {order.status === 'DELIVERED' && (
                <Button variant="primary" className="flex-1 py-2 text-xs text-white bg-primary">
                  Reorder
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
