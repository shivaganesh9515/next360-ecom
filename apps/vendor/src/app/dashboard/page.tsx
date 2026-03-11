'use client'

import { motion } from 'framer-motion'
import { TrendingUp, ShieldCheck, Box, Users, MapPin, ArrowUpRight, Plus, Droplets, Leaf } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { cn } from '@/lib/utils'
import { useCmsStore } from '@/lib/store/cmsStore'

const data = [
  { date: 'Oct 18', value: 45000 },
  { date: 'Oct 19', value: 52000 },
  { date: 'Oct 20', value: 48000 },
  { date: 'Oct 21', value: 61000 },
  { date: 'Oct 22', value: 55000 },
  { date: 'Oct 23', value: 72000 },
  { date: 'Oct 24', value: 68000 },
]

export default function VendorDashboard() {
  const { requestPromotion } = useCmsStore()
  
  const handlePromoRequest = () => {
     requestPromotion({
        productId: Math.floor(Math.random() * 8) + 1, // Target one of the demo product IDs
        productName: 'Premium Harvest Batch (Demo)',
        vendorName: 'Sri Lakshmi Bio-Farms',
        type: 'BEST_SELLER'
     });
     alert('Promotion request passed to Admin Governance queue!');
  }

  return (
    <div className="space-y-12 font-sans pb-20 p-8 lg:p-12">
       <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted">Harvest Partner Surface</span>
             </div>
             <h1 className="text-6xl font-display font-black text-text tracking-tighter leading-none">Farmer Hub</h1>
          </div>
          <div className="flex gap-4">
             <button className="bg-white hover:bg-cream border border-border px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-sm">
                View Earnings History
             </button>
             <button className="bg-primary text-white px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 transition-all flex items-center gap-2">
                <Plus className="w-4 h-4" strokeWidth={3} /> Enroll New Harvest
             </button>
          </div>
       </div>

       {/* Top Stats HUD */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-8 bg-white border-2 border-primary space-y-6">
             <div className="flex justify-between items-start">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                   <TrendingUp className="w-6 h-6" />
                </div>
                <Badge variant="organic" className="animate-pulse">Active Yield</Badge>
             </div>
             <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-muted">Current Earnings (Oct)</p>
                <p className="text-4xl font-display font-black text-text mt-1">₹4,22,150</p>
             </div>
             <div className="flex items-center gap-2 text-xs font-bold text-secondary">
                <ArrowUpRight className="w-4 h-4" /> +12% from last cycle
             </div>
          </Card>

          <Card className="p-8 bg-white space-y-6">
             <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
                <Box className="w-6 h-6" />
             </div>
             <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-muted">Active Batches</p>
                <p className="text-4xl font-display font-black text-text mt-1">12</p>
             </div>
             <div className="text-xs font-medium text-muted">
                3 Batches awaiting Mandi pickup
             </div>
          </Card>

          <Card className="p-8 bg-slate-900 border-none space-y-6">
             <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white">
                <ShieldCheck className="w-6 h-6" />
             </div>
             <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Compliance Score</p>
                <p className="text-4xl font-display font-black text-white mt-1">98.4%</p>
             </div>
             <div className="text-xs font-bold text-secondary uppercase tracking-widest">
                Elite Partner Status
             </div>
          </Card>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Earnings Graph */}
          <div className="lg:col-span-8">
             <Card className="p-10 bg-white h-full">
                <div className="flex items-center justify-between mb-10">
                   <div>
                      <h3 className="text-xl font-display font-black text-text">Yield Analytics</h3>
                      <p className="text-xs font-medium text-muted mt-1 uppercase tracking-widest">Revenue Momentum / Per-Batch Basis</p>
                   </div>
                   <div className="flex gap-2">
                      <button className="px-4 py-2 rounded-lg bg-cream text-[10px] font-black uppercase">7D</button>
                      <button className="px-4 py-2 rounded-lg text-[10px] font-black uppercase text-muted hover:bg-cream">1M</button>
                   </div>
                </div>
                <div className="h-[300px] w-full">
                   <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={data}>
                         <defs>
                            <linearGradient id="yieldColor" x1="0" y1="0" x2="0" y2="1">
                               <stop offset="5%" stopColor="#2D5016" stopOpacity={0.1}/>
                               <stop offset="95%" stopColor="#2D5016" stopOpacity={0}/>
                            </linearGradient>
                         </defs>
                         <Area type="monotone" dataKey="value" stroke="#2D5016" strokeWidth={4} fillOpacity={1} fill="url(#yieldColor)" />
                         <Tooltip 
                            contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                            labelStyle={{ fontWeight: 900, marginBottom: '4px' }}
                         />
                      </AreaChart>
                   </ResponsiveContainer>
                </div>
             </Card>
          </div>

          {/* Quick Actions / Critical Tasks */}
          <div className="lg:col-span-4 space-y-6">
             <section className="bg-secondary/10 p-8 rounded-[2.5rem] border border-secondary/20">
                <h3 className="text-sm font-black uppercase tracking-widest text-secondary mb-6">Action Required</h3>
                <div className="space-y-4">
                   <div className="bg-white p-4 rounded-2xl border border-secondary shadow-sm flex items-center justify-between">
                      <div>
                         <p className="text-xs font-black text-text">Upload Batch #HB-821 LOGS</p>
                         <p className="text-[10px] text-muted">Aralu Paddy - Transit Started</p>
                      </div>
                      <button className="w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center shadow-lg"><Plus className="w-4 h-4" /></button>
                   </div>
                    <div className="bg-white/50 p-4 rounded-2xl border border-border flex items-center justify-between">
                       <div>
                          <p className="text-xs font-bold text-text">Drive Sales via Promotion</p>
                          <p className="text-[10px] text-muted">Request Best Seller placement</p>
                       </div>
                       <button onClick={handlePromoRequest} className="text-primary font-black uppercase text-[10px] tracking-widest hover:underline">Push Promo</button>
                    </div>
                </div>
             </section>

             <Card className="p-8 bg-[#111] border-none text-white">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-6">Mandi Pulse</h3>
                <div className="space-y-6">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-secondary">
                         <Droplets className="w-5 h-5" />
                      </div>
                      <div>
                         <p className="text-xs font-bold">Soil Hydration: Optimal</p>
                         <p className="text-[10px] text-white/40">Zone: Sanga Reddy B4</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-primary">
                         <Leaf className="w-5 h-5" />
                      </div>
                      <div>
                         <p className="text-xs font-bold">Organic Factor: 1.2x</p>
                         <p className="text-[10px] text-white/40">Premium Markup Applied</p>
                      </div>
                   </div>
                </div>
             </Card>
          </div>
       </div>

       {/* Bottom Registry Table Snippet */}
       <div className="pt-8">
          <div className="flex items-center justify-between mb-8">
             <h3 className="text-2xl font-display font-black text-text">Recent Harvest Nodes</h3>
             <button className="text-secondary font-black uppercase text-[10px] tracking-widest hover:underline">View All Registry</button>
          </div>
          
          <Card className="p-0 overflow-hidden bg-white border border-border shadow-sm">
             <div className="overflow-x-auto">
                <table className="w-full text-left">
                   <thead>
                      <tr className="bg-cream border-b border-border">
                         <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-muted">Batch ID</th>
                         <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-muted">Commodity</th>
                         <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-muted">Certification</th>
                         <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-muted">Current Value</th>
                         <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-muted">Status</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-border">
                      {[
                        { id: 'HB-821', name: 'Premium Aralu Paddy', cert: 'NPOP', value: '₹54,200', status: 'IN TRANSIT' },
                        { id: 'HB-822', name: 'Cold-Pressed Groundnut Oil', cert: 'PGS', value: '₹1,12,000', status: 'HUB REACHED' },
                        { id: 'HB-823', name: 'Organic Alphonso Mangoes', cert: 'FSSAI', value: '₹8,400', status: 'DELIVERED' },
                      ].map((batch) => (
                         <tr key={batch.id} className="hover:bg-cream/30 transition-colors">
                            <td className="px-8 py-6 text-sm font-black text-text">#{batch.id}</td>
                            <td className="px-8 py-6 text-sm font-bold text-text">{batch.name}</td>
                            <td className="px-8 py-6"><Badge variant="organic" size="sm" className="bg-cream text-muted border-border font-sans">{batch.cert}</Badge></td>
                            <td className="px-8 py-6 text-sm font-black text-primary">{batch.value}</td>
                            <td className="px-8 py-6">
                               <div className="flex items-center gap-2">
                                  <div className={cn("w-2 h-2 rounded-full", batch.status === 'DELIVERED' ? 'bg-secondary' : 'bg-primary animate-pulse')} />
                                  <span className="text-[10px] font-black uppercase text-muted tracking-widest">{batch.status}</span>
                               </div>
                            </td>
                         </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          </Card>
       </div>
    </div>
  )
}
