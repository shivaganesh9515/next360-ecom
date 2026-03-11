'use client'

import { motion } from 'framer-motion'
import { Star, Users, RefreshCw, ChevronRight } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { cn } from '@/lib/utils'

const plans = [
  { id: 'PLN-01', name: 'Fresh Weekly', price: 499, period: 'week', subscribers: 324, renewal: '87%', color: 'text-secondary bg-secondary/10 border-secondary/20' },
  { id: 'PLN-02', name: 'Organic Monthly', price: 1799, period: 'month', subscribers: 891, renewal: '92%', color: 'text-blue-400 bg-blue-400/10 border-blue-400/20' },
  { id: 'PLN-03', name: 'Family Quarterly', price: 4999, period: 'quarter', subscribers: 145, renewal: '78%', color: 'text-amber-400 bg-amber-400/10 border-amber-400/20' },
  { id: 'PLN-04', name: 'Enterprise Annual', price: 18000, period: 'year', subscribers: 32, renewal: '96%', color: 'text-purple-400 bg-purple-400/10 border-purple-400/20' },
]

const recentSubs = [
  { name: 'Arjun Sharma', plan: 'Organic Monthly', since: '2 months', status: 'Active' },
  { name: 'Priya Nair', plan: 'Fresh Weekly', since: '3 weeks', status: 'Active' },
  { name: 'Rajesh Kumar', plan: 'Family Quarterly', since: '5 months', status: 'Paused' },
]

export default function AdminSubscriptionsPage() {
  return (
    <div className="space-y-12 font-sans pb-20">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Recurring Revenue</span>
        </div>
        <h1 className="text-6xl font-display font-black text-white tracking-tighter leading-none">Subscriptions</h1>
      </div>

      {/* Plan Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {plans.map((plan, i) => (
          <motion.div key={plan.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.09 }}>
            <Card className="bg-[#111] border-white/5 p-8 group hover:border-white/10 transition-all">
              <div className={cn("inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest py-1.5 px-3 rounded-xl border mb-6", plan.color)}>
                <Star className="w-3 h-3" /> {plan.period}
              </div>
              <h3 className="text-lg font-display font-black text-white">{plan.name}</h3>
              <p className="text-4xl font-display font-black text-white mt-3">₹{plan.price.toLocaleString('en-IN')}</p>
              <p className="text-[10px] text-white/30 font-medium">per {plan.period}</p>
              <div className="mt-6 pt-6 border-t border-white/5 space-y-3">
                <div className="flex justify-between">
                  <span className="text-[10px] font-black uppercase text-white/30 tracking-widest flex items-center gap-1.5"><Users className="w-3 h-3" /> Subscribers</span>
                  <span className="text-sm font-black text-white">{plan.subscribers}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[10px] font-black uppercase text-white/30 tracking-widest flex items-center gap-1.5"><RefreshCw className="w-3 h-3" /> Renewal</span>
                  <span className="text-sm font-black text-secondary">{plan.renewal}</span>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Recent Subscriptions */}
      <Card className="bg-[#0A0A0A] border-white/5 p-0 overflow-hidden">
        <div className="p-8 border-b border-white/5 flex justify-between items-center">
          <h3 className="text-sm font-black uppercase tracking-widest text-white/70">Recent Subscribers</h3>
          <button className="text-[10px] font-black uppercase text-secondary tracking-widest hover:underline">View All</button>
        </div>
        <div className="divide-y divide-white/5">
          {recentSubs.map((sub) => (
            <div key={sub.name} className="p-8 hover:bg-white/[0.02] flex items-center justify-between group">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-xl font-display font-black text-secondary">
                  {sub.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-bold text-white group-hover:text-secondary transition-colors">{sub.name}</p>
                  <p className="text-[10px] font-medium text-white/30 mt-1">{sub.plan} • {sub.since}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={cn(
                  "text-[10px] font-black uppercase tracking-widest py-1.5 px-3 rounded-xl border",
                  sub.status === 'Active' ? "border-secondary text-secondary bg-secondary/5" : "border-amber-500 text-amber-500 bg-amber-500/5"
                )}>
                  {sub.status}
                </span>
                <button className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40 hover:text-white transition-all">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
