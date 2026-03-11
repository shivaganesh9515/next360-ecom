'use client'

import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Users, Package, MapPin, Star } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { cn } from '@/lib/utils'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'

const revenueData = [
  { date: 'Jan', revenue: 180000 }, { date: 'Feb', revenue: 210000 },
  { date: 'Mar', revenue: 195000 }, { date: 'Apr', revenue: 260000 },
  { date: 'May', revenue: 310000 }, { date: 'Jun', revenue: 285000 },
  { date: 'Jul', revenue: 340000 }, { date: 'Aug', revenue: 420000 },
]

const zoneData = [
  { zone: 'Hyderabad', orders: 4200 }, { zone: 'Rangareddy', orders: 2800 },
  { zone: 'Kurnool', orders: 1500 }, { zone: 'Medak', orders: 900 },
]

const kpis = [
  { label: 'Platform GMV', value: '₹42.1L', trend: 12, up: true, icon: TrendingUp },
  { label: 'Avg. Order Value', value: '₹845', trend: 7, up: true, icon: Star },
  { label: 'Active Users', value: '18.4k', trend: 3, up: false, icon: Users },
  { label: 'Items Dispatched', value: '1.2L', trend: 18, up: true, icon: Package },
]

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-12 font-sans pb-20">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Platform Intelligence</span>
        </div>
        <h1 className="text-6xl font-display font-black text-white tracking-tighter leading-none">Analytics</h1>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, i) => (
          <motion.div key={kpi.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Card className="bg-[#111] border-white/5 p-8 group hover:border-secondary/30 transition-all">
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/50 group-hover:text-secondary group-hover:bg-secondary/10 transition-all">
                  <kpi.icon className="w-6 h-6" />
                </div>
                <span className={cn(
                  "text-[10px] font-black py-1 px-3 rounded-full flex items-center gap-1",
                  kpi.up ? "bg-secondary/10 text-secondary" : "bg-red-500/10 text-red-400"
                )}>
                  {kpi.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {kpi.trend}%
                </span>
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">{kpi.label}</p>
              <p className="text-4xl font-display font-black text-white">{kpi.value}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <Card className="bg-[#0A0A0A] border-white/5 p-8">
          <div className="flex items-center gap-3 mb-8">
            <MapPin className="w-4 h-4 text-secondary" />
            <h3 className="text-sm font-black uppercase tracking-widest text-white/70">Monthly Revenue</h3>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="adminRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22c55e" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="10 10" stroke="rgba(255,255,255,0.03)" vertical={false} />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: 'rgba(255,255,255,0.2)', fontSize: 10, fontWeight: 900 }} dy={15} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'rgba(255,255,255,0.2)', fontSize: 10, fontWeight: 900 }} dx={-10} />
                <Tooltip contentStyle={{ background: '#111', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', color: '#fff', fontSize: '11px', fontWeight: 900 }} />
                <Area type="monotone" dataKey="revenue" stroke="#22c55e" strokeWidth={3} fill="url(#adminRev)" activeDot={{ r: 8, fill: '#22c55e', stroke: '#111', strokeWidth: 4 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="bg-[#0A0A0A] border-white/5 p-8">
          <div className="flex items-center gap-3 mb-8">
            <MapPin className="w-4 h-4 text-secondary" />
            <h3 className="text-sm font-black uppercase tracking-widest text-white/70">Orders by Zone</h3>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={zoneData} barCategoryGap="35%">
                <CartesianGrid strokeDasharray="10 10" stroke="rgba(255,255,255,0.03)" vertical={false} />
                <XAxis dataKey="zone" axisLine={false} tickLine={false} tick={{ fill: 'rgba(255,255,255,0.2)', fontSize: 10, fontWeight: 900 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'rgba(255,255,255,0.2)', fontSize: 10, fontWeight: 900 }} dx={-10} />
                <Tooltip contentStyle={{ background: '#111', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', color: '#fff', fontSize: '11px', fontWeight: 900 }} />
                <Bar dataKey="orders" fill="#22c55e" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  )
}
