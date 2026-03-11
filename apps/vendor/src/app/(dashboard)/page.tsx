'use client'

import { useQuery } from '@tanstack/react-query'
import { vendorService } from '../../services/vendorService'
import { GlassCard, Badge } from '@next360/ui'
import { mockVendorDashboard, mockVendorOrders, mockProducts } from '@next360/utils'
import { cn } from '@next360/utils'
import { TrendingUp } from 'lucide-react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

export default function VendorDashboard() {
  const { data: stats } = useQuery({
    queryKey: ['vendor-dashboard-stats'],
    queryFn: () => vendorService.getDashboardStats(),
  })

  const displayStats = stats?.data || mockVendorDashboard
  const upcomingHarvests = mockProducts.slice(0, 4)

  return (
    <div className="space-y-10 pb-24 font-sans max-w-[1600px] mx-auto">
      <div className="grid gap-10 xl:grid-cols-[1.4fr_0.6fr]">
        <div className="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[100px] rounded-full -mr-48 -mt-48 group-hover:scale-125 transition-transform duration-1000" />
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6">
               <div className="h-1.5 w-12 bg-primary rounded-full" />
               <div className="text-[10px] uppercase tracking-[0.5em] font-black text-primary/60">Registry Control</div>
            </div>
            <h1 className="font-display text-7xl font-black text-slate-900 tracking-tighter italic leading-none mb-6">Harvest Dashboard</h1>
            <p className="max-w-2xl text-lg font-bold text-slate-500 leading-relaxed opacity-80 decoration-primary/20 underline underline-offset-8">
              Premium operating surface for verified produce providers. Monitoring revenue momentum, harvest readiness, and zone-aware order density across the network.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Badge variant="success" className="rounded-full px-6 py-2 border-none bg-primary text-white font-black text-[10px] uppercase tracking-widest shadow-lg shadow-primary/20">Authorized Node</Badge>
              <Badge className="rounded-full px-6 py-2 border border-slate-200 bg-white text-slate-600 font-black text-[10px] uppercase tracking-widest">Signal Reliability {displayStats.avgRating * 20}%</Badge>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 p-10 rounded-[3rem] border border-white/5 shadow-[0_50px_100px_rgba(15,23,42,0.3)] relative overflow-hidden flex flex-col justify-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_100%,rgba(22,163,74,0.1),transparent)] pointer-events-none" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
               <div className="h-1 w-6 bg-primary/40 rounded-full" />
               <div className="text-[10px] uppercase tracking-[0.4em] font-black text-slate-500 italic">Network Rhythm</div>
            </div>
            <div className="space-y-5">
              {[
                { label: 'Yield Value', value: `₹ ${(displayStats.revenue / 100).toLocaleString('en-IN')}`, isPrimary: true },
                { label: 'Command Count', value: String(displayStats.orders) },
                { label: 'Active Segments', value: String(displayStats.activeProducts) },
                { label: 'Signal Density', value: '3 Active Peaks' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.03] px-6 py-5 group hover:bg-white/[0.06] transition-all duration-500">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{item.label}</span>
                  <span className={cn("text-xl font-black italic tracking-tight transition-colors", item.isPrimary ? "text-primary group-hover:text-white" : "text-white")}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-10 xl:grid-cols-2">
        <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/50">
          <div className="flex items-center justify-between mb-10">
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-2">Network Yield</div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tighter italic">Earnings Velocity</h2>
            </div>
            <div className="h-12 w-12 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-center">
               <TrendingUp className="text-primary w-6 h-6" strokeWidth={2.5} />
            </div>
          </div>
          <div className="h-[380px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={displayStats.revenueHistory}>
                <defs>
                  <linearGradient id="vendorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#16a34a" stopOpacity={0.15} />
                    <stop offset="100%" stopColor="#16a34a" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="10 10" stroke="#f1f5f9" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 900 }} 
                  dy={15}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 900 }} 
                  dx={-10}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1)', padding: '16px' }}
                  itemStyle={{ fontWeight: 900, fontSize: '12px', color: '#16a34a', textTransform: 'uppercase' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#16a34a" 
                  strokeWidth={6} 
                  fill="url(#vendorRev)" 
                  animationDuration={2500}
                  activeDot={{ r: 10, fill: '#16a34a', stroke: '#fff', strokeWidth: 5 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/50">
          <div className="flex items-center justify-between mb-10">
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-2">Asset Timeline</div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tighter italic">Production Buffer</h2>
            </div>
            <div className="h-12 w-12 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-center font-black text-primary text-xl tracking-tighter italic">BP</div>
          </div>
          <div className="space-y-4">
            {upcomingHarvests.map((product, index) => (
              <div key={product.id} className="flex items-center gap-6 rounded-[2.25rem] border border-slate-50 bg-slate-50/50 p-6 group hover:bg-white hover:shadow-xl hover:border-slate-100 transition-all duration-500">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm border border-slate-100 font-black text-slate-400 group-hover:text-primary transition-colors">
                  0{index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-black text-slate-900 tracking-tight mb-1">{product.name}</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic mb-4">{product.region} / v2.1</div>
                  <div className="h-2 rounded-full bg-slate-200 relative overflow-hidden shadow-inner">
                    <div className="absolute inset-0 bg-primary/10 animate-pulse" />
                    <div 
                      className="absolute left-0 top-0 h-full rounded-full bg-primary shadow-[0_0_15px_rgba(22,163,74,0.5)] transition-all duration-1000 delay-300" 
                      style={{ width: `${Math.min(100, (product.stock / 70) * 100)}%` }} 
                    />
                  </div>
                </div>
                <div className="text-right">
                   <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{product.stock} Units</div>
                   <div className="text-lg font-black text-primary italic">READY</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-slate-900 p-12 rounded-[3.5rem] border border-white/5 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_100%_0%,rgba(22,163,74,0.05),transparent)] pointer-events-none" />
        <div className="relative z-10 mb-12">
          <div className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-500 mb-3">Signal Activity</div>
          <h2 className="text-4xl font-black text-white tracking-tighter italic">Proximity Matrix</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3 relative z-10">
          {mockVendorOrders.map((order) => (
            <div key={order.id} className="rounded-[2.5rem] border border-white/5 bg-white/[0.03] p-8 group hover:bg-white/[0.06] hover:scale-[1.03] transition-all duration-500 shadow-2xl shadow-black/20">
              <div className="flex items-center gap-3 mb-6">
                 <div className="w-2 h-2 rounded-full bg-primary" />
                 <div className="text-xs font-black text-white tracking-tight uppercase">{order.cluster}</div>
              </div>
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-6 italic opacity-60">ID: {order.id.split('-')[0]}</div>
              <div className="flex items-end justify-between">
                <div className="text-4xl font-black text-primary italic tracking-tighter">{order.distanceKm} <span className="text-sm uppercase not-italic opacity-40 ml-1">km</span></div>
                <Badge className="rounded-full px-5 py-2 border-none bg-white/5 text-slate-400 font-black text-[9px] uppercase tracking-widest group-hover:text-primary group-hover:bg-primary/10 transition-all">{order.status}</Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
