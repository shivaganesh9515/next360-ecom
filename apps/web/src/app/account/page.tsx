"use client"

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { Package, RefreshCw, Heart, Leaf, Target, ArrowRight, MessageSquare, MapPin } from 'lucide-react'
import { Button } from '@next360/ui'
import { orderService } from '@/services/orderService'
import { subscriptionService } from '@/services/subscriptionService'
import { useAuthStore } from '@/store/authStore'
import { useWishlistStore } from '@/store/wishlistStore'
import SeedsProgress from '@/components/account/SeedsProgress'
import SubscriptionCard from '@/components/account/SubscriptionCard'
import { formatPrice } from '@next360/utils'

export default function AccountDashboardPage() {
  const { user } = useAuthStore()
  const { items: wishlistItems } = useWishlistStore()

  const { data: orders = [], isLoading: isLoadingOrders } = useQuery({
    queryKey: ['orders'],
    queryFn: () => orderService.getAll(),
    staleTime: 5 * 60 * 1000,
  })

  const { data: subscriptions = [], isLoading: isLoadingSubs } = useQuery({
    queryKey: ['subscriptions'],
    queryFn: () => subscriptionService.getSubscriptions(),
    staleTime: 10 * 60 * 1000,
  })

  const activeSubs = subscriptions.filter(s => s.status === 'ACTIVE')
  const recentOrders = orders.slice(0, 3)

  return (
    <div className="space-y-10">
      {/* SECTION 1 - Performance Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <StatCard icon={Package} label="Total Deployments" value={orders.length} color="slate" />
        <StatCard icon={RefreshCw} label="Active Nodes" value={activeSubs.length} color="green" />
        <StatCard icon={Leaf} label="Seed Equity" value={(user?.seeds || 0).toLocaleString()} color="green" />
        <StatCard icon={Heart} label="Reservation Pool" value={wishlistItems.length} color="slate" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* SECTION 2 - Active Fleet Track */}
        <div className="bg-white rounded-[3rem] border border-slate-100 p-10 shadow-2xl shadow-slate-200/50 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-700" />
          
          <div className="flex items-center justify-between mb-10 relative z-10">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight italic">Active Fleet Track</h2>
            <Link href="/account/orders" className="text-[10px] font-black uppercase tracking-widest text-primary hover:text-slate-900 transition-colors">
              Full Log →
            </Link>
          </div>
          
          <div className="space-y-6 relative z-10">
            {recentOrders.length > 0 ? (
              recentOrders.map(order => (
                <div key={order.id} className="flex justify-between items-center py-5 border-b border-slate-50 last:border-0 group/item">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover/item:text-primary transition-colors">
                      <Package size={20} strokeWidth={3} />
                    </div>
                    <div>
                      <p className="font-black text-slate-900 text-sm tracking-tight mb-0.5">{order.orderNumber}</p>
                      <p className="text-[9px] text-slate-400 font-black uppercase tracking-[0.2em]">
                        {new Date(order.placedAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </p>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end gap-2">
                    <p className="font-black text-slate-900 text-sm tracking-tight italic">{formatPrice(order.total)}</p>
                    <Link href={`/account/orders/${order.id}`} className="text-[9px] font-black text-primary uppercase tracking-[0.25em] hover:text-slate-900 transition-colors">
                      Analyze
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs font-bold text-slate-300 uppercase tracking-widest text-center py-10 italic">No Active Deployments Found</p>
            )}
          </div>
        </div>

        {/* SECTION 3 - Logistics Management */}
        <div className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl shadow-slate-900/40 space-y-8 h-full relative overflow-hidden">
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/5 rounded-full -mr-20 -mb-20 blur-3xl" />
          
          <div className="flex items-center justify-between mb-2 relative z-10">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Logistics Management</h3>
            <Link href="/account/subscriptions" className="text-[10px] font-black uppercase tracking-widest text-primary hover:text-white transition-colors">
              Audit →
            </Link>
          </div>
          
          <div className="relative z-10">
            {activeSubs.length > 0 ? (
              activeSubs.map(sub => (
                <SubscriptionCard key={sub.id} subscription={sub} compact onUpdate={() => {}} />
              ))
            ) : (
              <div className="p-10 text-center border-2 border-dashed border-slate-700/60 rounded-[2.5rem] bg-white/5 group hover:border-primary/40 transition-colors">
                 <RefreshCw className="mx-auto text-slate-600 mb-5 group-hover:rotate-180 transition-transform duration-700" size={32} strokeWidth={2.5} />
                 <p className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6">Autonomous Supply Disabled</p>
                 <Link href="/subscribe">
                    <Button className="rounded-full bg-white text-slate-900 hover:bg-primary hover:text-white px-8 h-12 font-black uppercase tracking-widest text-[9px] transition-all">
                       Initialize Supply Node
                    </Button>
                 </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SECTION 4 - Ecosystem & Performance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <SeedsProgress seeds={user?.seeds || 0} compact={false} />
        
        <div className="bg-white rounded-[3rem] border border-slate-100 p-10 shadow-2xl shadow-slate-200/50">
          <div className="flex items-center gap-5 mb-10">
            <div className="w-14 h-14 rounded-[1.25rem] bg-slate-50 border border-slate-100 text-slate-900 flex items-center justify-center shadow-inner">
               <Target size={24} strokeWidth={3} />
            </div>
            <div>
               <h2 className="text-lg font-black text-slate-900 tracking-tight leading-none mb-2">Neural Health Targets</h2>
               <Link href="/account/health-goals" className="text-[10px] font-black uppercase tracking-[0.2em] text-primary hover:text-slate-900 transition-colors italic">Optimize Constraints</Link>
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            {(user?.healthGoals || []).length > 0 ? (
              user?.healthGoals.map(goal => (
                <span key={goal} className="px-6 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-[10px] font-black text-slate-900 uppercase tracking-widest shadow-sm hover:translate-y-[-2px] transition-transform">
                  {goal}
                </span>
              ))
            ) : (
              <p className="text-xs font-bold text-slate-300 italic uppercase tracking-widest">Targets Not Initialized</p>
            )}
          </div>
        </div>
      </div>

      {/* SECTION 5 - Protocol Shortcuts */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <QuickAction href="/account/orders" icon={Package} label="Track Units" />
        <QuickAction href="/account/orders" icon={RefreshCw} label="Clone Last Haul" />
        <QuickAction href="/account/orders" icon={MessageSquare} label="Submit Feedback" />
        <QuickAction href="/account/addresses" icon={MapPin} label="Deploy Node" />
      </div>
    </div>
  )
}

function StatCard({ icon: Icon, label, value, color }: { icon: any, label: string, value: string | number, color: string }) {
  const colorStyles = {
    slate: "bg-white text-slate-900 border-slate-100 shadow-2xl shadow-slate-200/50",
    green: "bg-primary text-white border-primary shadow-2xl shadow-primary/20",
  }[color === 'slate' ? 'slate' : 'green']

  return (
    <div className={`p-8 rounded-[2.5rem] border ${colorStyles} flex flex-col justify-between h-full group hover:translate-y-[-4px] transition-all duration-500`}>
      <div className={`w-10 h-10 rounded-2xl ${color === 'slate' ? 'bg-slate-50' : 'bg-white/20'} flex items-center justify-center mb-10 group-hover:scale-110 transition-transform duration-500`}>
         <Icon size={20} strokeWidth={3} className={color === 'slate' ? 'text-slate-400' : 'text-white'} />
      </div>
      <div>
        <p className={`text-[9px] font-black uppercase tracking-[0.25em] mb-2 ${color === 'slate' ? 'text-slate-400' : 'text-white/60'}`}>{label}</p>
        <p className="text-3xl font-black italic tracking-tighter leading-none">{value}</p>
      </div>
    </div>
  )
}

function QuickAction({ href, icon: Icon, label }: { href: string, icon: any, label: string }) {
  return (
    <Link href={href} className="p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50 hover:border-primary/20 hover:-translate-y-1 transition-all group flex items-center justify-between">
      <div className="flex items-center gap-5">
        <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all duration-500">
           <Icon size={18} strokeWidth={3} />
        </div>
        <span className="font-black text-xs text-slate-900 uppercase tracking-widest">{label}</span>
      </div>
      <ArrowRight size={16} strokeWidth={3} className="text-slate-300 group-hover:text-primary transition-colors group-hover:translate-x-1" />
    </Link>
  )
}

