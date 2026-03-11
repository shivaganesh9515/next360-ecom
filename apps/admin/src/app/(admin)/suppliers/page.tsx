'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, MapPin, ShieldCheck, ChevronRight } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { CertificationBadge } from '@/components/ui/CertificationBadge'
import { cn } from '@/lib/utils'

const mockSuppliers = [
  { id: 'SUP-001', name: 'Sri Lakshmi Farms', owner: 'Ramaiah Reddy', region: 'Sanga Reddy', cert: 'NPOP', kyc: 'Verified', products: 14 },
  { id: 'SUP-002', name: 'Heritage Organic Co-op', owner: 'Laxmaiah Naidu', region: 'Kurnool', cert: 'PGS', kyc: 'Pending', products: 8 },
  { id: 'SUP-003', name: 'GreenRoots Agri', owner: 'Suresh Kumar', region: 'Rangareddy', cert: 'FSSAI', kyc: 'Verified', products: 21 },
  { id: 'SUP-004', name: 'Rythubhoomi Collective', owner: 'Anjaiah Varma', region: 'Nalgonda', cert: 'NPOP', kyc: 'Rejected', products: 6 },
  { id: 'SUP-005', name: 'Organic Valley Hub', owner: 'Padma Devi', region: 'Medak', cert: 'PGS', kyc: 'Verified', products: 11 },
]

const kycConfig: Record<string, string> = {
  Verified: 'border-secondary text-secondary bg-secondary/5',
  Pending: 'border-amber-500 text-amber-500 bg-amber-500/5',
  Rejected: 'border-red-500 text-red-500 bg-red-500/5',
}

export default function AdminSuppliersPage() {
  const [search, setSearch] = useState('')
  const filtered = mockSuppliers.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) || s.region.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-12 font-sans pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Supply Network</span>
          </div>
          <h1 className="text-6xl font-display font-black text-white tracking-tighter leading-none">Suppliers</h1>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-lg group">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-secondary transition-colors" />
        <input
          placeholder="Search by supplier name or region..."
          className="w-full bg-white/5 border border-white/5 rounded-2xl h-14 pl-14 pr-6 text-sm text-white focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-all font-medium"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Suppliers List */}
      <Card className="bg-[#0A0A0A] border-white/5 p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/30 text-left">Supplier</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/30 text-left">Region</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/30 text-left">Certification</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/30 text-left">KYC Status</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/30 text-left">Products</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/30 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((sup, i) => (
                <motion.tr
                  key={sup.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.06 }}
                  className="group hover:bg-white/[0.01] transition-colors"
                >
                  <td className="px-8 py-7">
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center text-xl font-display font-black text-secondary">
                        {sup.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white group-hover:text-secondary transition-colors">{sup.name}</p>
                        <p className="text-[10px] text-white/30 mt-0.5">Owner: {sup.owner}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-7">
                    <div className="flex items-center gap-2 text-white/60">
                      <MapPin className="w-3.5 h-3.5 text-secondary/50" />
                      <span className="text-xs font-bold">{sup.region}</span>
                    </div>
                  </td>
                  <td className="px-8 py-7">
                    <CertificationBadge type={sup.cert} size="md" />
                  </td>
                  <td className="px-8 py-7">
                    <span className={cn("inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest py-1.5 px-3 rounded-xl border", kycConfig[sup.kyc])}>
                      <ShieldCheck className="w-3 h-3" />
                      {sup.kyc}
                    </span>
                  </td>
                  <td className="px-8 py-7 text-white/60 font-bold text-sm">{sup.products}</td>
                  <td className="px-8 py-7 text-right">
                    <button className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center ml-auto text-white/40 hover:text-white hover:border-white/30 transition-all">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
