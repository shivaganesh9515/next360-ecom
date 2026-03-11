'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Search, Filter, Edit, Trash2, ShieldCheck, MapPin, ChevronRight, FileText, Download } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { CertificationBadge } from '@/components/ui/CertificationBadge'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const mockBatches = [
  { id: 'HB-821', name: 'Premium Aralu Paddy', mandi: 'Sanga Reddy', price: 120, stock: 450, certification: 'NPOP', status: 'Verified', date: '2d ago' },
  { id: 'HB-822', name: 'Cold-Pressed Groundnut Oil', mandi: 'Kurnool Hub', price: 340, stock: 120, certification: 'PGS', status: 'Pending', date: '5h ago' },
  { id: 'HB-823', name: 'Organic Alphonso Mangoes', mandi: 'Rangareddy', price: 850, stock: 15, certification: 'FSSAI', status: 'Expired', date: '1w ago' },
]

export default function AdminProductsPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredBatches = mockBatches.filter(b => 
    b.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    b.id.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-12 font-sans pb-20">
       <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Inbound Supply Chain</span>
             </div>
             <h1 className="text-6xl font-display font-black text-white tracking-tighter leading-none">Batch Registry</h1>
          </div>
          <div className="flex gap-4">
             <button className="bg-white/5 hover:bg-white/10 border border-white/10 px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all">
                Registry Manifest
             </button>
             <Link href="/products/new">
                <button className="bg-secondary text-white px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-secondary/20 hover:scale-105 transition-all flex items-center gap-2">
                   <Plus className="w-4 h-4" strokeWidth={3} /> Enroll New Batch
                </button>
             </Link>
          </div>
       </div>

       {/* Filters */}
       <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-[#0A0A0A] p-6 rounded-[2.5rem] border border-white/5">
          <div className="flex-1 max-w-2xl relative group">
             <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-secondary transition-colors" />
             <input 
               placeholder="Query harvest batches by ID, farmer or mandi origin..." 
               className="w-full bg-white/5 border border-white/5 rounded-2xl h-14 pl-14 pr-6 text-sm text-white focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-all font-medium"
               value={searchTerm}
               onChange={e => setSearchTerm(e.target.value)}
             />
          </div>
          <div className="flex items-center gap-4">
             <button className="h-14 px-6 rounded-2xl bg-white/5 border border-white/5 text-white/50 text-[10px] font-black uppercase tracking-widest hover:text-white transition-all flex items-center gap-2">
                <Filter className="w-4 h-4" /> Mode: All
             </button>
             <button className="h-14 px-6 rounded-2xl bg-white/5 border border-white/5 text-white/50 text-[10px] font-black uppercase tracking-widest hover:text-white transition-all flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" /> Cert: NPOP
             </button>
          </div>
       </div>

       {/* Registry Table */}
       <Card className="bg-[#0A0A0A] border-white/5 p-0 overflow-hidden">
          <div className="overflow-x-auto">
             <table className="w-full border-collapse">
                <thead>
                   <tr className="border-b border-white/5 bg-white/[0.02]">
                      <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/30 text-left">Harvest Batch Node</th>
                      <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/30 text-left">Governance Origin</th>
                      <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/30 text-left">Certification Audit</th>
                      <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/30 text-left">In-Stock Inventory</th>
                      <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/30 text-right">Interface</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                   {filteredBatches.map((batch) => (
                      <tr key={batch.id} className="group hover:bg-white/[0.01] transition-colors">
                         <td className="px-8 py-8">
                            <div className="flex items-center gap-5">
                               <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-white/20 group-hover:text-secondary group-hover:bg-secondary/10 transition-all overflow-hidden border border-white/5 group-hover:border-secondary/30">
                                  <FileText className="w-6 h-6" />
                               </div>
                               <div>
                                  <p className="text-lg font-display font-black text-white group-hover:text-secondary transition-colors">{batch.name}</p>
                                  <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mt-1">Batch Node: {batch.id}</p>
                               </div>
                            </div>
                         </td>
                         <td className="px-8 py-8">
                            <div className="flex items-center gap-2 text-white/60">
                               <MapPin className="w-4 h-4 text-secondary/50" />
                               <span className="text-xs font-bold">{batch.mandi}</span>
                            </div>
                         </td>
                         <td className="px-8 py-8">
                            <div className="flex items-center gap-4">
                               <CertificationBadge type={batch.certification} size="md" />
                               <span className={cn(
                                 "text-[10px] font-black uppercase px-3 py-1 rounded-lg border",
                                 batch.status === 'Verified' ? "bg-secondary/10 text-secondary border-secondary/20" :
                                 batch.status === 'Pending' ? "bg-amber-500/10 text-amber-500 border-amber-500/20" :
                                 "bg-red-500/10 text-red-500 border-red-500/20"
                               )}>
                                  {batch.status}
                               </span>
                            </div>
                         </td>
                         <td className="px-8 py-8">
                            <div className="space-y-2">
                               <p className="text-xl font-display font-black text-white">₹{batch.price}</p>
                               <Badge variant={batch.stock > 100 ? 'organic' : 'fresh'} className="scale-90 origin-left">
                                  {batch.stock} Units Ava.
                               </Badge>
                            </div>
                         </td>
                         <td className="px-8 py-8 text-right">
                            <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                               <button className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-all">
                                  <Edit className="w-5 h-5" />
                               </button>
                               <button className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-red-500 hover:border-red-500/30 transition-all">
                                  <Trash2 className="w-5 h-5" />
                               </button>
                               <button className="w-11 h-11 rounded-xl bg-secondary text-white flex items-center justify-center shadow-lg shadow-secondary/20 transition-all">
                                  <ChevronRight className="w-5 h-5" />
                               </button>
                            </div>
                         </td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>
       </Card>

       {/* Audit Controls */}
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="bg-[#111] border-dashed border-white/10 p-8 flex flex-col items-center text-center space-y-6">
             <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                <ShieldCheck className="w-8 h-8" />
             </div>
             <div>
                <h4 className="text-xl font-display font-bold text-white">Bulk Certification Drill</h4>
                <p className="text-xs text-white/40 mt-2 font-medium">Verify 12 expiring NPOP certificates across the Sanga Reddy sector.</p>
             </div>
             <button className="w-full py-4 rounded-2xl border border-white/10 text-white/70 hover:bg-white/5 text-xs font-black uppercase tracking-widest transition-all">Start Drill</button>
          </Card>
          
          <Card className="bg-[#111] border-dashed border-white/10 p-8 flex flex-col items-center text-center space-y-6">
             <div className="w-16 h-16 rounded-full bg-blue-400/10 flex items-center justify-center text-blue-400">
                <Download className="w-8 h-8" />
             </div>
             <div>
                <h4 className="text-xl font-display font-bold text-white">Provenance Export</h4>
                <p className="text-xs text-white/40 mt-2 font-medium">Generate JSON/PDF traceability logs for the current quarterly harvest.</p>
             </div>
             <button className="w-full py-4 rounded-2xl border border-white/10 text-white/70 hover:bg-white/5 text-xs font-black uppercase tracking-widest transition-all">Export Registry</button>
          </Card>

          <div className="bg-gradient-to-br from-secondary/20 to-primary/20 p-8 rounded-[2.5rem] border border-white/5 flex flex-col justify-center">
             <h4 className="text-2xl font-display font-black text-white tracking-tighter">Ready for Mandi Sync?</h4>
             <p className="text-xs text-secondary font-bold mt-2 uppercase tracking-widest">Hyd-Central Hub Connection: Online</p>
             <button className="mt-8 bg-white text-[#0A0A0A] hover:bg-white/90 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all">Trigger Live Inventory Sync</button>
          </div>
       </div>
    </div>
  )
}
