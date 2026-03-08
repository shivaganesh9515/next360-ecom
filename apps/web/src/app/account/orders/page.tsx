"use client"

import React, { useState } from 'react'
import { Badge, Button } from '@next360/ui'
import OrderHistoryTable from '@/components/account/OrderHistoryTable'
import OrderDetailModal from '@/components/account/OrderDetailModal'
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
    <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm">
      {/* Header */}
      <div className="p-5 md:p-6 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="font-display text-2xl font-black text-text">My Orders</h1>
        
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-hide">
          {(['ALL', 'ACTIVE', 'DELIVERED', 'CANCELLED'] as FilterType[]).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${
                filter === f 
                  ? 'bg-primary text-white' 
                  : 'bg-cream text-muted hover:bg-secondary/10'
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
