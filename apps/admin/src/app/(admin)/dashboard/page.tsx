'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { CertificationBadge } from '@/components/ui/CertificationBadge'
import { BarChart3, Users, Box, MapPin, ArrowUpRight, ArrowDownRight, ShieldCheck, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const stats = [
  { label: 'Global GMV', value: '₹4.2M', trend: 12, icon: BarChart3 },
  { label: 'Certified Batches', value: '1.2k', trend: 8, icon: Box },
  { label: 'Verified Vendors', value: '142', trend: -2, icon: Users },
  { label: 'Active Zones', value: '12', trend: 0, icon: MapPin },
]

const recentAudits = [
  { id: 'AUD-01', vendor: 'Sri Lakshmi Farms', type: 'NPOP', status: 'Passed', date: '2h ago' },
  { id: 'AUD-02', vendor: 'Heritage Organic', type: 'PGS', status: 'Pending', date: '5h ago' },
  { id: 'AUD-03', vendor: 'Green Roots', type: 'FSSAI', status: 'Expired', date: '1d ago' },
  { id: 'AUD-04', vendor: 'Sanga Reddy Co-op', type: 'NPOP', status: 'Passed', date: '2d ago' },
]

const regions = [
  { label: 'Hyderabad Central', value: 45, color: 'bg-secondary' },
  { label: 'Rangareddy East', value: 28, color: 'bg-primary' },
  { label: 'Kurnool Hub', value: 15, color: 'bg-amber-600' },
  { label: 'Others', value: 12, color: 'bg-white/10' },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-12 font-sans pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Real-time Platform Pulse</span>
          </div>
          <h1 className="text-6xl font-display font-black text-white tracking-tighter leading-none">Command Center</h1>
        </div>
        <div className="flex gap-4">
          <button className="bg-white/5 hover:bg-white/10 border border-white/10 px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all">
            Download Global Report
          </button>
          <button className="bg-secondary text-white px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-secondary/20 hover:scale-105 transition-all">
            New Verification Drill
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="bg-[#111] border-white/5 p-8 group hover:border-secondary/30 transition-all">
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/50 group-hover:text-secondary group-hover:bg-secondary/10 transition-all">
                  <stat.icon className="w-6 h-6" />
                </div>
                <span className={cn(
                  "text-[10px] font-black py-1 px-3 rounded-full flex items-center gap-1",
                  stat.trend > 0 ? "bg-secondary/10 text-secondary" :
                  stat.trend < 0 ? "bg-red-500/10 text-red-400" : "bg-white/5 text-white/40"
                )}>
                  {stat.trend > 0 && <ArrowUpRight className="w-3 h-3" />}
                  {stat.trend < 0 && <ArrowDownRight className="w-3 h-3" />}
                  {stat.trend === 0 ? 'Stable' : `${Math.abs(stat.trend)}%`}
                </span>
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">{stat.label}</p>
              <p className="text-4xl font-display font-black text-white">{stat.value}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Certification Audits */}
        <div className="lg:col-span-8">
          <Card className="bg-[#0A0A0A] border-white/5 p-0 overflow-hidden">
            <div className="p-8 border-b border-white/5 flex justify-between items-center">
              <h3 className="text-sm font-black uppercase tracking-widest text-white/70">Recent Certification Audits</h3>
              <button className="text-[10px] font-black uppercase text-secondary tracking-widest hover:underline">View All</button>
            </div>
            <div className="divide-y divide-white/5">
              {recentAudits.map((audit) => (
                <div key={audit.id} className="p-8 hover:bg-white/[0.02] transition-colors flex items-center justify-between group">
                  <div className="flex items-center gap-6">
                    <CertificationBadge type={audit.type} size="md" />
                    <div>
                      <p className="text-sm font-bold text-white group-hover:text-secondary transition-colors">{audit.vendor}</p>
                      <p className="text-[10px] font-medium text-white/30 mt-1 uppercase tracking-widest">Case ID: {audit.id} • {audit.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={cn(
                      "text-[10px] font-black uppercase tracking-widest py-1.5 px-4 rounded-xl border",
                      audit.status === 'Passed' ? "border-secondary text-secondary bg-secondary/5" :
                      audit.status === 'Pending' ? "border-amber-500 text-amber-500 bg-amber-500/5" :
                      "border-red-500 text-red-500 bg-red-500/5"
                    )}>
                      {audit.status}
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

        {/* Region Dominance */}
        <div className="lg:col-span-4">
          <Card className="bg-[#0A0A0A] border-white/5 p-8 flex flex-col h-full">
            <div className="flex items-center gap-3 mb-10">
              <MapPin className="w-5 h-5 text-secondary" />
              <h3 className="text-sm font-black uppercase tracking-widest text-white/70">Region Dominance</h3>
            </div>
            <div className="flex-1 space-y-8">
              {regions.map((region) => (
                <div key={region.label}>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[11px] font-bold text-white/50">{region.label}</span>
                    <span className="text-[11px] font-black text-white">{region.value}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${region.value}%` }}
                      transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
                      className={cn("h-full rounded-full shadow-lg", region.color)}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 pt-8 border-t border-white/5">
              <div className="p-5 bg-secondary/10 rounded-[1.5rem] border border-secondary/20 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-white">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Governance Score</p>
                  <p className="text-[10px] text-white/40 uppercase font-medium">Target: 98% • Current: 94.2%</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
