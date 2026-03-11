"use client"

import React, { useState } from 'react'
import { Badge, Button } from '@next360/ui'
import OrderHistoryTable from '@/components/account/OrderHistoryTable'
import OrderDetailModal from '@/components/account/OrderDetailModal' // This import will become unused if the modal is inlined
import { Order, OrderStatus } from '@next360/types'
import OrderStatusBadge from '@/components/account/OrderStatusBadge'

type FilterType = 'ALL' | 'ACTIVE' | 'DELIVERED' | 'CANCELLED'

import { useQuery } from '@tanstack/react-query'
import { orderService } from '@/services/orderService'

export default function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [filter, setFilter] = useState<FilterType>('ALL')

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: () => orderService.getAll(),
    staleTime: 5 * 60 * 1000,
  })

  const filteredOrders = orders.filter(order => {
    if (filter === 'ALL') return true
    if (filter === 'DELIVERED') return order.status === 'DELIVERED'
    if (filter === 'CANCELLED') return order.status === 'CANCELLED'
    if (filter === 'ACTIVE') return !['DELIVERED', 'CANCELLED', 'REFUNDED'].includes(order.status)
    return true
  })

  return (
    <div className="bg-white rounded-[3rem] border border-slate-100 overflow-hidden shadow-2xl shadow-slate-200/50">
      {/* Header */}
      <div className="p-10 md:p-14 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-8 h-full bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full -mr-16 -mt-16 opacity-50" />
        
        <div className="relative z-10">
           <h1 className="text-3xl font-black text-slate-900 tracking-tighter italic leading-none mb-2">Fleet Deployment Log</h1>
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Historical Trace • {orders.length} Operations Registered</p>
        </div>
        
        <div className="flex items-center gap-3 overflow-x-auto pb-1 md:pb-0 scrollbar-hide relative z-10">
          {(['ALL', 'ACTIVE', 'DELIVERED', 'CANCELLED'] as FilterType[]).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                filter === f 
                  ? 'bg-slate-900 text-white shadow-xl shadow-slate-900/20' 
                  : 'bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {f.charAt(0) + f.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="p-12 text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm font-bold text-muted uppercase tracking-widest">Loading orders...</p>
        </div>
      ) : (
        <OrderHistoryTable 
          orders={filteredOrders} 
          onViewDetail={(order) => setSelectedOrder(order)} 
        />
      )}

      <OrderDetailModal 
        order={selectedOrder} 
        isOpen={!!selectedOrder} 
        onClose={() => setSelectedOrder(null)} 
      />
    </div>
  )
}
