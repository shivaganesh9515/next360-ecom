'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Package, Truck, CheckCircle, XCircle, ChevronRight, Clock } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { cn } from '@/lib/utils'

const mockOrders = [
  { id: 'ORD-5521', customer: 'Arjun Sharma', zone: 'Banjara Hills', items: 4, total: 1240, status: 'Delivered', date: '2h ago' },
  { id: 'ORD-5520', customer: 'Priya Nair', zone: 'Madhapur', items: 2, total: 680, status: 'Processing', date: '5h ago' },
  { id: 'ORD-5519', customer: 'Rajesh Kumar', zone: 'Gachibowli', items: 6, total: 2100, status: 'Out for Delivery', date: '1d ago' },
  { id: 'ORD-5518', customer: 'Sneha Reddy', zone: 'Jubilee Hills', items: 3, total: 945, status: 'Pending', date: '1d ago' },
  { id: 'ORD-5517', customer: 'Vikram Rao', zone: 'Kondapur', items: 1, total: 340, status: 'Cancelled', date: '2d ago' },
  { id: 'ORD-5516', customer: 'Ananya Patel', zone: 'Hitech City', items: 5, total: 1875, status: 'Delivered', date: '3d ago' },
]

const statusConfig: Record<string, { color: string; icon: React.ElementType }> = {
  Delivered: { color: 'border-secondary text-secondary bg-secondary/5', icon: CheckCircle },
  Processing: { color: 'border-blue-400 text-blue-400 bg-blue-400/5', icon: Package },
  'Out for Delivery': { color: 'border-amber-400 text-amber-400 bg-amber-400/5', icon: Truck },
  Pending: { color: 'border-amber-600 text-amber-600 bg-amber-600/5', icon: Clock },
  Cancelled: { color: 'border-red-500 text-red-500 bg-red-500/5', icon: XCircle },
}

export default function AdminOrdersPage() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')

  const filtered = mockOrders.filter(o =>
    (filter === 'All' || o.status === filter) &&
    (o.id.toLowerCase().includes(search.toLowerCase()) || o.customer.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="space-y-12 font-sans pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Live Dispatch Grid</span>
          </div>
          <h1 className="text-6xl font-display font-black text-white tracking-tighter leading-none">Orders</h1>
        </div>
        <button className="bg-secondary text-white px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-secondary/20 hover:scale-105 transition-all">
          Export Orders
        </button>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex flex-wrap gap-3">
        {['All', 'Pending', 'Processing', 'Out for Delivery', 'Delivered', 'Cancelled'].map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={cn(
              "px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border",
              filter === s
                ? "bg-secondary text-white border-secondary shadow-lg shadow-secondary/20"
                : "bg-white/5 border-white/5 text-white/50 hover:text-white"
            )}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-lg group">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-secondary transition-colors" />
        <input
          placeholder="Search by order ID or customer name..."
          className="w-full bg-white/5 border border-white/5 rounded-2xl h-14 pl-14 pr-6 text-sm text-white focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-all font-medium"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Orders Table */}
      <Card className="bg-[#0A0A0A] border-white/5 p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/30 text-left">Order</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/30 text-left">Customer</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/30 text-left">Zone</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/30 text-left">Value</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/30 text-left">Status</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/30 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((order, i) => {
                const cfg = statusConfig[order.status]
                const StatusIcon = cfg.icon
                return (
                  <motion.tr
                    key={order.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="group hover:bg-white/[0.01] transition-colors"
                  >
                    <td className="px-8 py-7">
                      <p className="text-sm font-black text-white font-mono">{order.id}</p>
                      <p className="text-[10px] text-white/30 mt-1">{order.date}</p>
                    </td>
                    <td className="px-8 py-7">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-xs font-black text-secondary">
                          {order.customer.charAt(0)}
                        </div>
                        <span className="text-sm font-bold text-white">{order.customer}</span>
                      </div>
                    </td>
                    <td className="px-8 py-7 text-sm text-white/50 font-medium">{order.zone}</td>
                    <td className="px-8 py-7">
                      <p className="text-xl font-display font-black text-white">₹{order.total}</p>
                      <p className="text-[10px] text-white/30">{order.items} items</p>
                    </td>
                    <td className="px-8 py-7">
                      <span className={cn("inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest py-1.5 px-3 rounded-xl border", cfg.color)}>
                        <StatusIcon className="w-3 h-3" />
                        {order.status}
                      </span>
                    </td>
                    <td className="px-8 py-7 text-right">
                      <button className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center ml-auto text-white/40 hover:text-white hover:border-white/30 transition-all">
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </td>
                  </motion.tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
