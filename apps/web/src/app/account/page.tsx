"use client"

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { Package, RefreshCw, Heart, Leaf, Target, ArrowRight, MessageSquare, MapPin } from 'lucide-react'
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
    <div className="space-y-6">
      {/* SECTION 1 - Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={Package} label="Total Orders" value={orders.length} color="blue" />
        <StatCard icon={RefreshCw} label="Active Subs." value={activeSubs.length} color="green" />
        <StatCard icon={Leaf} label="Seeds Balance" value={(user?.seeds || 0).toLocaleString()} color="earth" />
        <StatCard icon={Heart} label="Wishlist Items" value={wishlistItems.length} color="rose" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* SECTION 2 - Recent Orders */}
        <div className="bg-white rounded-[24px] border border-border p-6 shadow-[0_1px_0_rgba(17,38,29,0.08),0_10px_26px_rgba(31,48,40,0.06)]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-xl font-bold text-text">Recent Orders</h2>
            <Link href="/account/orders" className="text-sm font-bold text-primary hover:text-primary/80 transition-colors">
              View All →
            </Link>
          </div>
          
          <div className="space-y-4">
            {recentOrders.map(order => (
              <div key={order.id} className="flex justify-between items-center py-3 border-b border-border last:border-0">
                <div>
                  <p className="font-mono text-xs font-bold text-primary mb-1">{order.orderNumber}</p>
                  <p className="text-[10px] text-muted font-bold uppercase tracking-widest">
                    {new Date(order.placedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>
                <div className="text-right flex flex-col items-end">
                  <p className="font-bold text-text text-sm mb-1">{formatPrice(order.total)}</p>
                  <Link href={`/account/orders/${order.id}`} className="text-xs font-bold text-secondary uppercase tracking-widest hover:underline">
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 3 - Active Subscriptions */}
        <div className="bg-white rounded-[24px] border border-border p-6 shadow-[0_1px_0_rgba(17,38,29,0.08),0_10px_26px_rgba(31,48,40,0.06)] space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-display text-xl font-bold text-text">My Subscriptions</h2>
            <Link href="/account/subscriptions" className="text-sm font-bold text-primary hover:text-primary/80 transition-colors">
              Manage →
            </Link>
          </div>
          
          {activeSubs.length > 0 ? (
            activeSubs.map(sub => (
              <SubscriptionCard key={sub.id} subscription={sub} compact onUpdate={() => {}} />
            ))
          ) : (
            <div className="p-6 text-center border-2 border-dashed border-border/60 rounded-2xl bg-cream">
              <RefreshCw className="mx-auto text-muted mb-2" size={24} />
              <p className="text-sm font-bold text-muted mb-2">No active subscriptions</p>
              <Link href="/subscribe" className="text-secondary font-bold text-xs uppercase tracking-widest hover:underline">
                Start a Weekly Box →
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* SECTION 4 - Seeds + Health Goals */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SeedsProgress seeds={user?.seeds || 0} compact={false} />
        
        <div className="bg-gradient-to-br from-cream to-white rounded-2xl border border-primary/10 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <Target size={20} />
            </div>
            <div>
              <h2 className="font-display text-lg font-bold text-primary leading-tight">Active Health Goals</h2>
              <Link href="/account/health-goals" className="text-[10px] font-black uppercase tracking-widest text-muted hover:text-primary transition-colors">Edit Goals</Link>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {(user?.healthGoals || []).length > 0 ? (
              user?.healthGoals.map(goal => (
                <span key={goal} className="px-3 py-1.5 bg-white border border-border/60 rounded-lg text-xs font-bold text-text capitalize shadow-sm">
                  🎯 {goal}
                </span>
              ))
            ) : (
              <p className="text-xs font-medium text-muted">Set goals to personalize findings</p>
            )}
          </div>
        </div>
      </div>

      {/* SECTION 5 - Quick Actions */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <QuickAction href="/account/orders" icon={Package} label="Track Order" />
        <QuickAction href="/account/orders" icon={RefreshCw} label="Reorder Last" />
        <QuickAction href="/account/orders" icon={MessageSquare} label="Write Review" />
        <QuickAction href="/account/addresses" icon={MapPin} label="Add Address" />
      </div>
    </div>
  )
}

function StatCard({ icon: Icon, label, value, color }: { icon: any, label: string, value: string | number, color: string }) {
  const colorStyles = {
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    green: "bg-green-50 text-green-600 border-green-100",
    earth: "bg-secondary/10 text-secondary border-secondary/20",
    rose: "bg-rose-50 text-rose-600 border-rose-100",
  }[color]

  return (
    <div className={`p-4 rounded-2xl border ${colorStyles} flex flex-col justify-between`}>
      <Icon size={20} className="mb-3 opacity-80" />
      <div>
        <p className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-1">{label}</p>
        <p className="font-display text-2xl font-black">{value}</p>
      </div>
    </div>
  )
}

function QuickAction({ href, icon: Icon, label }: { href: string, icon: any, label: string }) {
  return (
    <Link href={href} className="p-4 bg-white rounded-2xl border border-border/60 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all group flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-cream flex items-center justify-center text-muted group-hover:bg-primary/5 group-hover:text-primary transition-colors">
          <Icon size={16} />
        </div>
        <span className="font-bold text-xs text-text">{label}</span>
      </div>
      <ArrowRight size={14} className="text-muted group-hover:text-primary transition-colors group-hover:translate-x-1" />
    </Link>
  )
}

