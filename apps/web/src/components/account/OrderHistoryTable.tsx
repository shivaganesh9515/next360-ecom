import React from 'react'
import { Badge, Button } from '@next360/ui'
import { Order } from '@next360/types'
import { formatPrice } from '@next360/utils'
import { Package } from 'lucide-react'
import OrderStatusBadge from '@/components/account/OrderStatusBadge'
import Link from 'next/link'

interface OrderHistoryTableProps {
  orders: Order[]
  onViewDetail: (order: Order) => void
}

export default function OrderHistoryTable({ orders, onViewDetail }: OrderHistoryTableProps) {
  if (orders.length === 0) {
    return (
      <div className="p-20 text-center flex flex-col items-center justify-center bg-white rounded-[3rem]">
        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-8 shadow-inner border border-slate-100">
          <Package className="text-slate-300" size={32} strokeWidth={2} />
        </div>
        <h3 className="text-2xl font-black text-slate-900 mb-2 tracking-tight italic">No Deployments Found</h3>
        <p className="text-slate-400 font-bold text-sm mb-10 uppercase tracking-widest">Protocol initialized but log is empty</p>
        <Link href="/shop">
          <Button className="rounded-full px-12 h-14 font-black uppercase tracking-widest text-xs shadow-2xl shadow-primary/20">Initialize Market Haul</Button>
        </Link>
      </div>
    )
  }

  return (
    <>
      {/* Desktop Table */}
      <div className="hidden md:block w-full overflow-hidden">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-slate-50 text-slate-400 font-black uppercase tracking-[0.25em] text-[9px] border-b border-slate-100">
            <tr>
              <th className="px-10 py-6">Unique ID</th>
              <th className="px-10 py-6">Timestamp</th>
              <th className="px-10 py-6">Inventory Load</th>
              <th className="px-10 py-6">Settlement</th>
              <th className="px-10 py-6">Operational Status</th>
              <th className="px-10 py-6 text-right">Audit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 text-slate-700 bg-white">
            {orders.map(order => (
              <tr key={order.id} className="group hover:bg-slate-50/50 transition-all duration-300">
                <td className="px-10 py-8 font-black text-slate-900 text-xs tracking-tight group-hover:text-primary transition-colors">{order.orderNumber}</td>
                <td className="px-10 py-8 font-bold text-slate-400 text-xs uppercase tracking-widest">
                  {new Date(order.placedAt).toLocaleDateString('en-IN', {
                    day: '2-digit', month: 'short', year: 'numeric'
                  })}
                </td>
                <td className="px-10 py-8">
                  <div className="flex flex-col gap-1">
                    <span className="font-black text-slate-900 text-xs">{order.items.length} Nodes Loaded</span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest truncate max-w-[200px]">
                      {order.items[0].productName} {order.items.length > 1 ? `+ ${order.items.length - 1} Others` : ''}
                    </span>
                  </div>
                </td>
                <td className="px-10 py-8 font-black text-slate-900 text-sm italic">{formatPrice(order.total)}</td>
                <td className="px-10 py-8">
                  <OrderStatusBadge status={order.status} />
                </td>
                <td className="px-10 py-8 text-right">
                  <div className="flex items-center justify-end gap-5">
                    <button 
                      onClick={() => onViewDetail(order)}
                      className="text-[10px] font-black text-primary uppercase tracking-[0.2em] hover:text-slate-900 transition-colors"
                    >
                      Analyze
                    </button>
                    {order.status === 'DELIVERED' && (
                      <button className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] hover:text-primary transition-colors">
                        Clone
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden divide-y divide-slate-50 bg-white">
        {orders.map(order => (
          <div key={order.id} className="p-8 space-y-6 group">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-black text-slate-900 text-sm tracking-tight mb-1 group-hover:text-primary transition-colors">{order.orderNumber}</p>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">
                  {new Date(order.placedAt).toLocaleDateString('en-IN', {
                    day: '2-digit', month: 'short', year: 'numeric'
                  })}
                </p>
              </div>
              <OrderStatusBadge status={order.status} />
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-0.5">
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{order.items.length} Nodes Loaded</span>
                 <span className="font-black text-slate-900 text-base italic">{formatPrice(order.total)}</span>
              </div>
            </div>

            <div className="flex gap-4 pt-2">
              <Button 
                variant="outline" 
                className="flex-1 rounded-full h-12 text-[10px] font-black uppercase tracking-widest border-slate-100 text-slate-400 hover:text-slate-900" 
                onClick={() => onViewDetail(order)}
              >
                Analyze
              </Button>
              {order.status === 'DELIVERED' && (
                <Button 
                  className="flex-1 rounded-full h-12 text-[10px] font-black uppercase tracking-widest"
                >
                  Clone Haul
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
