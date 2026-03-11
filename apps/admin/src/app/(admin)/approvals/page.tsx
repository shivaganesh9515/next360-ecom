'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, XCircle, ChevronRight, Clock } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { CertificationBadge } from '@/components/ui/CertificationBadge'
import { cn } from '@/lib/utils'

const pendingApprovals = [
  { id: 'APR-012', vendor: 'Sunrise Organic Hub', region: 'Hyderabad', cert: 'NPOP', submitted: '1h ago', type: 'New Vendor' },
  { id: 'APR-011', vendor: 'Krishnaveni Farms', region: 'Nalgonda', cert: 'PGS', submitted: '4h ago', type: 'Batch Renewal' },
  { id: 'APR-010', vendor: 'Pure Harvest Co-op', region: 'Kurnool', cert: 'FSSAI', submitted: '8h ago', type: 'Product Update' },
  { id: 'APR-009', vendor: 'Mango Valley Exports', region: 'Rangareddy', cert: 'NPOP', submitted: '1d ago', type: 'New Vendor' },
  { id: 'APR-008', vendor: 'GreenLeaf Collective', region: 'Medak', cert: 'PGS', submitted: '2d ago', type: 'Batch Renewal' },
]

export default function AdminApprovalsPage() {
  const [dismissed, setDismissed] = useState<string[]>([])
  const items = pendingApprovals.filter(a => !dismissed.includes(a.id))

  return (
    <div className="space-y-12 font-sans pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Pending Review</span>
          </div>
          <h1 className="text-6xl font-display font-black text-white tracking-tighter leading-none">Approvals</h1>
        </div>
        <div className="flex items-center gap-3 bg-amber-500/10 border border-amber-500/20 px-6 py-3 rounded-2xl">
          <Clock className="w-5 h-5 text-amber-400" />
          <span className="text-sm font-black text-amber-400">{items.length} Awaiting Review</span>
        </div>
      </div>

      <Card className="bg-[#0A0A0A] border-white/5 p-0 overflow-hidden">
        <div className="p-8 border-b border-white/5 flex justify-between items-center">
          <h3 className="text-sm font-black uppercase tracking-widest text-white/70">Pending Queue</h3>
          <button className="text-[10px] font-black uppercase text-secondary tracking-widest hover:underline">Bulk Approve</button>
        </div>
        <div className="divide-y divide-white/5">
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              className="p-8 hover:bg-white/[0.02] flex items-center justify-between group"
            >
              <div className="flex items-center gap-6">
                <CertificationBadge type={item.cert} size="md" />
                <div>
                  <p className="text-sm font-bold text-white group-hover:text-secondary transition-colors">{item.vendor}</p>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="text-[10px] text-white/30 font-medium">{item.region}</span>
                    <span className="text-[10px] font-black uppercase text-amber-400/70 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded-lg">{item.type}</span>
                    <span className="text-[10px] text-white/20">{item.submitted}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => setDismissed(prev => [...prev, item.id])}
                  className="w-11 h-11 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 hover:bg-red-500 hover:text-white transition-all"
                >
                  <XCircle className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setDismissed(prev => [...prev, item.id])}
                  className="w-11 h-11 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary hover:bg-secondary hover:text-white transition-all"
                >
                  <CheckCircle className="w-5 h-5" />
                </button>
                <button className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))}
          {items.length === 0 && (
            <div className="p-20 text-center">
              <CheckCircle className="w-12 h-12 text-secondary/30 mx-auto mb-4" />
              <p className="text-sm font-bold text-white/30">No pending approvals</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
