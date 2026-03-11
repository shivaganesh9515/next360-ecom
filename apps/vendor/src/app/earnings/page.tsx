'use client'

import { motion } from 'framer-motion'
import { Download, FileText, TrendingUp, Calendar, ArrowUpRight, ShieldCheck, Wallet, Receipt, ChevronRight, Search } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

const recentPayouts = [
  { id: 'PAY-8821', date: 'Oct 24, 2024', amount: '₹1,42,000', batches: 4, type: 'Mandi Transfer', status: 'Settled' },
  { id: 'PAY-8802', date: 'Oct 15, 2024', amount: '₹84,500', batches: 2, type: 'Direct Credit', status: 'Settled' },
  { id: 'PAY-8759', date: 'Sep 28, 2024', amount: '₹2,10,000', batches: 7, type: 'Mandi Transfer', status: 'Settled' },
]

const upcomingSettlements = [
  { id: 'SET-9011', batch: 'HB-821 (Aralu Paddy)', amount: '₹44,200', date: 'Est. Oct 28', status: 'Processing' },
  { id: 'SET-9012', batch: 'HB-822 (Groundnut Oil)', amount: '₹1,12,000', date: 'Est. Oct 30', status: 'Harvesting' },
]

export default function VendorEarnings() {
  return (
    <div className="space-y-12 font-sans pb-20 p-8 lg:p-12">
       <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted">Financial Governance Hub</span>
             </div>
             <h1 className="text-6xl font-display font-black text-text tracking-tighter leading-none">Earnings & Invoices</h1>
          </div>
          <div className="flex gap-4">
             <button className="bg-white hover:bg-cream border border-border px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-sm">
                Export Quarterly Statement
             </button>
             <button className="bg-secondary text-white px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-secondary/20 hover:scale-105 transition-all">
                Update Payout Details
             </button>
          </div>
       </div>

       {/* Financial HUD */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-8 bg-slate-900 border-none relative overflow-hidden">
             <div className="relative z-10 space-y-6">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-secondary">
                   <Wallet className="w-6 h-6" />
                </div>
                <div>
                   <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Total Yield Value (YTD)</p>
                   <p className="text-4xl font-display font-black text-white">₹14,22,800</p>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-secondary">
                   <TrendingUp className="w-4 h-4" /> +18% growth from 2023
                </div>
             </div>
             <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-secondary/10 blur-3xl rounded-full" />
          </Card>

          <Card className="p-8 bg-white space-y-6 border border-border">
             <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <ShieldCheck className="w-6 h-6" />
             </div>
             <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-muted mb-1">Pending Settlements</p>
                <p className="text-4xl font-display font-black text-text">₹1,56,200</p>
             </div>
             <div className="text-xs font-medium text-muted">
                2 Batches currently in governance audit
             </div>
          </Card>

          <Card className="p-8 bg-white border border-border space-y-6">
             <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
                <Receipt className="w-6 h-6" />
             </div>
             <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-muted mb-1">Next Payout Cycle</p>
                <p className="text-4xl font-display font-black text-text italic">Oct 28</p>
             </div>
             <button className="text-secondary font-black uppercase text-[10px] tracking-widest hover:underline flex items-center gap-2">
                View Forecast <ArrowUpRight className="w-3 h-3" />
             </button>
          </Card>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Recent Statements */}
          <div className="lg:col-span-8">
             <Card className="p-0 bg-white border border-border overflow-hidden shadow-sm">
                <div className="p-8 bg-cream border-b border-border flex justify-between items-center">
                   <h3 className="text-sm font-black uppercase tracking-widest text-muted">Verified Payout Records</h3>
                   <div className="flex gap-2">
                      <button className="h-10 px-4 rounded-xl bg-white border border-border text-[10px] font-black uppercase tracking-widest hover:bg-cream transition-all">2024</button>
                      <button className="h-10 px-4 rounded-xl bg-white/50 border border-border text-[10px] font-black uppercase tracking-widest text-muted opacity-50">2023</button>
                   </div>
                </div>
                <div className="divide-y divide-border">
                   {recentPayouts.map((pay) => (
                      <div key={pay.id} className="p-8 hover:bg-cream/10 transition-colors flex items-center justify-between group">
                         <div className="flex items-center gap-6">
                            <div className="w-12 h-12 rounded-xl bg-cream border border-border flex items-center justify-center text-muted group-hover:text-secondary group-hover:bg-secondary/10 group-hover:border-secondary/20 transition-all">
                               <FileText className="w-6 h-6" />
                            </div>
                            <div>
                               <p className="text-base font-bold text-text group-hover:text-secondary transition-colors">{pay.amount}</p>
                               <p className="text-[10px] font-black text-muted uppercase tracking-widest mt-1">{pay.date} • {pay.batches} Batches</p>
                            </div>
                         </div>
                         <div className="flex items-center gap-6">
                            <div className="hidden md:block text-right">
                               <p className="text-[10px] font-black text-muted uppercase tracking-widest">{pay.type}</p>
                               <p className="text-xs font-bold text-secondary mt-1 tracking-tighter italic">TXN: #00{pay.id.split('-')[1]}</p>
                            </div>
                            <button className="w-12 h-12 rounded-xl bg-cream border border-border flex items-center justify-center text-muted hover:text-secondary hover:border-secondary transition-all">
                               <Download className="w-5 h-5" />
                            </button>
                         </div>
                      </div>
                   ))}
                </div>
                <div className="p-6 bg-cream/30 border-t border-border text-center">
                   <button className="text-[10px] font-black uppercase tracking-widest text-muted hover:text-primary transition-colors">Load Archive Statements</button>
                </div>
             </Card>
          </div>

          {/* Pending / Audit Pipe */}
          <div className="lg:col-span-4 space-y-6">
             <Card className="p-8 bg-[#0A0A0A] border-none text-white relative h-full">
                <div className="flex items-center gap-3 mb-8">
                   <Calendar className="w-5 h-5 text-secondary" />
                   <h3 className="text-sm font-black uppercase tracking-widest text-white/40">Audit Pipe</h3>
                </div>
                <div className="space-y-6">
                   {upcomingSettlements.map(item => (
                      <div key={item.id} className="relative pl-6 border-l-2 border-secondary/20 group">
                         <div className="absolute left-[-5px] top-0 w-2 h-2 rounded-full bg-secondary shadow-[0_0_10px_rgba(45,80,22,0.8)]" />
                         <p className="text-xs font-bold text-white mb-1">{item.batch}</p>
                         <p className="text-[10px] font-medium text-white/30 uppercase tracking-widest">{item.date} • {item.amount}</p>
                         <div className="mt-3 flex items-center gap-2">
                             <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                                <motion.div 
                                  initial={{ width: 0 }} 
                                  animate={{ width: item.status === 'Processing' ? '60%' : '30%' }} 
                                  className="h-full bg-secondary shadow-[0_0_15px_rgba(45,80,22,0.5)]" 
                                />
                             </div>
                             <span className="text-[8px] font-black text-secondary tracking-widest uppercase">{item.status}</span>
                         </div>
                      </div>
                   ))}
                </div>

                <div className="mt-12 pt-8 border-t border-white/5">
                   <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10 group cursor-pointer hover:bg-white/10 transition-all">
                      <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                         <Receipt className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                         <p className="text-[10px] font-black uppercase tracking-widest text-white/70">Governance Report</p>
                         <p className="text-[10px] text-white/30">Batch Q3 Reliability Audit</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white transition-all" />
                   </div>
                </div>
             </Card>
          </div>
       </div>

       {/* Visual Invoicing Mock (Optional Highlight) */}
       <div className="bg-white border-2 border-dashed border-border rounded-[2.5rem] p-12 text-center space-y-4">
          <div className="w-20 h-20 bg-cream rounded-full flex items-center justify-center mx-auto mb-4 border border-border">
             <Search className="w-10 h-10 text-muted" />
          </div>
          <h4 className="text-2xl font-display font-black text-text">Legacy Ledger Access</h4>
          <p className="text-sm text-muted max-w-lg mx-auto font-medium">Historical records prior to Next360 platform migration (Phase 2) are available in the offline vault. Contact mandi governance for archival access.</p>
          <Button variant="outline" className="mt-6 border-border text-muted">Request Historical Ledger</Button>
       </div>
    </div>
  )
}
