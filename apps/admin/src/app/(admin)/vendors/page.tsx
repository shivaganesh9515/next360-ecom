'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Search, Filter, ShieldCheck, MapPin, ChevronRight, Users, Star, BarChart3, Globe } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { CertificationBadge } from '@/components/ui/CertificationBadge'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const mockVendors = [
  { id: 'VEN-001', name: 'Sri Lakshmi Bio-Farms', location: 'Sanga Reddy, TS', rating: 4.9, activeBatches: 12, impact: '240 Acres', compliance: 98, certifications: ['NPOP', 'PGS'] },
  { id: 'VEN-002', name: 'Heritage Organic Collective', location: 'Rangareddy East, TS', rating: 4.7, activeBatches: 8, impact: '180 Acres', compliance: 92, certifications: ['NPOP', 'FSSAI'] },
  { id: 'VEN-003', name: 'Kurnool Spice Hub', location: 'Kurnool Hub, AP', rating: 4.8, activeBatches: 15, impact: '400 Acres', compliance: 95, certifications: ['PGS'] },
]

export default function AdminVendorsPage() {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className="space-y-12 font-sans pb-20">
       <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Verified Partner Network</span>
             </div>
             <h1 className="text-6xl font-display font-black text-white tracking-tighter leading-none">Vendor Network</h1>
          </div>
          <div className="flex gap-4">
             <button className="bg-white/5 hover:bg-white/10 border border-white/10 px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all">
                Access Partner API
             </button>
             <button className="bg-secondary text-white px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-secondary/20 hover:scale-105 transition-all flex items-center gap-2">
                <Plus className="w-4 h-4" strokeWidth={3} /> Onboard Partner
             </button>
          </div>
       </div>

       {/* Impact Map HUD */}
       <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
             <Card className="h-full bg-[#0A0A0A] border-white/5 p-0 overflow-hidden relative min-h-[400px]">
                <div className="absolute inset-0 opacity-20" style={{ 
                  backgroundImage: 'radial-gradient(#2D5016 0.5px, transparent 0.5px)', 
                  backgroundSize: '15px 15px' 
                }} />
                
                <div className="relative z-10 p-10 flex flex-col h-full">
                   <div className="flex items-center justify-between mb-auto">
                      <div>
                         <h3 className="text-2xl font-display font-black text-white tracking-tight">Regional Impact Map</h3>
                         <p className="text-xs font-bold text-white/30 mt-1 uppercase tracking-widest">Active Partner Density &amp; Zone Saturation</p>
                      </div>
                      <div className="flex gap-2">
                         <button className="bg-white/10 p-2 rounded-lg text-white hover:bg-white/20 transition-all"><Globe className="w-4 h-4" /></button>
                         <button className="bg-white/10 p-2 rounded-lg text-white hover:bg-white/20 transition-all"><BarChart3 className="w-4 h-4" /></button>
                      </div>
                   </div>

                   <div className="mt-12 space-y-4">
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-1.5 bg-secondary rounded-full shadow-lg shadow-secondary/20" />
                         <span className="text-[10px] font-black text-white/50 uppercase tracking-widest">High Saturation (Hyderabad-Core)</span>
                      </div>
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-1.5 bg-amber-600 rounded-full" />
                         <span className="text-[10px] font-black text-white/50 uppercase tracking-widest">Emerging (Kurnool Sector)</span>
                      </div>
                   </div>
                </div>

                {/* Map Mockup */}
                <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
                   <div className="w-[80%] aspect-video bg-white/5 rounded-full blur-[100px]" />
                </div>
             </Card>
          </div>

          <div className="lg:col-span-4 space-y-6">
             <Card className="bg-secondary/10 border-secondary/20 p-8 flex flex-col justify-center">
                <p className="text-[10px] font-black uppercase tracking-widest text-secondary mb-2">Network Health</p>
                <h4 className="text-4xl font-display font-black text-white">96.4%</h4>
                <p className="text-xs text-white/40 mt-2 font-medium">Compliance score across 42 active mandi partners.</p>
                <div className="h-1.5 w-full bg-white/5 rounded-full mt-6 overflow-hidden">
                   <motion.div initial={{ width: 0 }} animate={{ width: '96.4%' }} className="h-full bg-secondary" />
                </div>
             </Card>

             <Card className="bg-[#111] border-white/5 p-8">
                <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-8">Quick Stats</p>
                <div className="space-y-6">
                   <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-white/50">Total Acreage</span>
                      <span className="text-xs font-black text-white tracking-widest uppercase">12,450 AC</span>
                   </div>
                   <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-white/50">Live Batches</span>
                      <span className="text-xs font-black text-white tracking-widest uppercase">342 Units</span>
                   </div>
                   <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-white/50">Audit Pipeline</span>
                      <span className="text-xs font-black text-secondary tracking-widest uppercase">14 Pending</span>
                   </div>
                </div>
             </Card>
          </div>
       </div>

       {/* Vendor Table */}
       <div className="space-y-6">
          <div className="flex items-center gap-4">
             <div className="flex-1 relative">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                <input 
                  placeholder="Query vendor by name, mandi, or reg ID..." 
                  className="w-full bg-[#0A0A0A] border border-white/5 rounded-2xl h-14 pl-14 pr-6 text-sm text-white focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-all font-medium"
                   value={searchTerm}
                   onChange={e => setSearchTerm(e.target.value)}
                />
             </div>
             <button className="h-14 px-8 rounded-2xl bg-[#0A0A0A] border border-white/5 text-white/50 text-[10px] font-black uppercase tracking-widest hover:text-white transition-all">
                Export CSV
             </button>
          </div>

          <Card className="bg-[#0A0A0A] border-white/5 p-0 overflow-hidden">
             <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                   <thead>
                      <tr className="border-b border-white/5 bg-white/[0.02]">
                         <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/30 text-left">Partner Entity</th>
                         <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/30 text-left">Location (Zone)</th>
                         <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/30 text-left">Certifications</th>
                         <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/30 text-left">Impact Metric</th>
                         <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/30 text-right">Fidelity</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-white/5">
                      {mockVendors.map((vendor) => (
                         <tr key={vendor.id} className="group hover:bg-white/[0.01] transition-colors">
                            <td className="px-8 py-8">
                               <div className="flex items-center gap-5">
                                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white/20 group-hover:text-secondary group-hover:bg-secondary/10 transition-all border border-white/5">
                                     <Users className="w-5 h-5" />
                                  </div>
                                  <div>
                                     <p className="text-base font-bold text-white group-hover:text-secondary transition-colors">{vendor.name}</p>
                                     <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mt-1">ID: {vendor.id}</p>
                                  </div>
                               </div>
                            </td>
                            <td className="px-8 py-8">
                               <div className="flex items-center gap-2 text-white/60">
                                  <MapPin className="w-3.5 h-3.5 text-secondary/50" />
                                  <span className="text-xs font-medium">{vendor.location}</span>
                               </div>
                            </td>
                            <td className="px-8 py-8">
                               <div className="flex flex-wrap gap-2">
                                  {vendor.certifications.map(c => <CertificationBadge key={c} type={c} size="sm" />)}
                               </div>
                            </td>
                            <td className="px-8 py-8">
                               <div>
                                  <p className="text-sm font-black text-white font-sans">{vendor.impact}</p>
                                  <p className="text-[10px] text-white/30 uppercase font-bold mt-1">{vendor.activeBatches} Batches</p>
                               </div>
                            </td>
                            <td className="px-8 py-8 text-right">
                               <div className="flex items-center justify-end gap-6">
                                  <div className="text-right">
                                     <div className="flex items-center justify-end gap-1 mb-1">
                                        <Star className="w-3 h-3 fill-secondary text-secondary" />
                                        <span className="text-xs font-black text-white">{vendor.rating}</span>
                                     </div>
                                     <div className="w-20 h-1 bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full bg-secondary" style={{ width: `${vendor.compliance}%` }} />
                                     </div>
                                  </div>
                                  <button className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all">
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
       </div>
    </div>
  )
}
