'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheck, CreditCard, Store, Info, Upload, CheckCircle2, AlertCircle, FileText, ChevronRight } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { CertificationBadge } from '@/components/ui/CertificationBadge'
import { cn } from '@/lib/utils'

export default function VendorSettingsPage() {
  const [tab, setTab] = useState('profile')

  const tabs = [
    { id: 'profile', label: 'Store Identity', icon: Store },
    { id: 'certs', label: 'Verification Vault', icon: ShieldCheck },
    { id: 'bank', label: 'Payout Route', icon: CreditCard },
  ]

  return (
    <div className="space-y-12 font-sans pb-20 p-8 lg:p-12">
       <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted">Node Config v2.4</span>
             </div>
             <h1 className="text-6xl font-display font-black text-text tracking-tighter leading-none">Settings</h1>
          </div>
          <Button className="bg-secondary text-white font-black uppercase text-xs tracking-widest px-10 h-14 rounded-2xl shadow-xl shadow-secondary/20">
             Synchronize Node
          </Button>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Tabs Sidebar */}
          <div className="lg:col-span-3 space-y-3">
             {tabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={cn(
                    "w-full flex items-center justify-between p-6 rounded-2xl transition-all duration-500 group",
                    tab === t.id ? "bg-white border-2 border-secondary shadow-lg shadow-secondary/10" : "bg-cream/50 border border-border hover:bg-cream"
                  )}
                >
                   <div className="flex items-center gap-4">
                      <t.icon className={cn("w-5 h-5", tab === t.id ? "text-secondary" : "text-muted")} />
                      <span className={cn("text-[10px] font-black uppercase tracking-widest", tab === t.id ? "text-text" : "text-muted")}>{t.label}</span>
                   </div>
                   {tab === t.id && <div className="w-1.5 h-1.5 rounded-full bg-secondary" />}
                </button>
             ))}
          </div>

          {/* Tab Content */}
          <div className="lg:col-span-9">
             <AnimatePresence mode="wait">
                {tab === 'profile' && (
                   <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                      <Card className="p-10 bg-white space-y-10">
                         <div className="grid md:grid-cols-2 gap-8">
                            <Input label="Farm Identification" defaultValue="Sri Lakshmi Bio-Farms" />
                            <Input label="Partner Sector" defaultValue="Premium Organics" />
                            <Input label="Primary Contact" defaultValue="+91 98765 43210" />
                            <Input label="Mandi Registration ID" defaultValue="TS-SR-M04" />
                         </div>
                         <div className="space-y-4">
                            <label className="text-[10px] font-black text-muted uppercase tracking-[0.2em]">Operating Narrative</label>
                            <textarea 
                              className="w-full bg-cream border border-border rounded-2xl p-6 text-sm font-medium focus:ring-1 focus:ring-secondary outline-none resize-none"
                              rows={4}
                              defaultValue="Leading provider of heritage rice varieties and high-curcumin turmeric in the Sanga Reddy sector. Full traceability documentation available for all batches."
                            />
                         </div>
                      </Card>
                   </motion.div>
                )}

                {tab === 'certs' && (
                   <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
                      <Card className="p-10 bg-slate-900 border-none relative overflow-hidden">
                         <div className="relative z-10 flex items-center justify-between">
                            <div className="space-y-2">
                               <p className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary">Trust Engine Status</p>
                               <h3 className="text-3xl font-display font-black text-white">Elite Partner Level</h3>
                               <p className="text-xs text-white/40 font-medium">Your credentials represent the highest standard of Next360 transparency.</p>
                            </div>
                            <div className="w-20 h-20 rounded-full bg-secondary/20 border border-secondary/30 flex items-center justify-center">
                               <ShieldCheck className="w-10 h-10 text-secondary" />
                            </div>
                         </div>
                         <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 blur-[100px] rounded-full" />
                      </Card>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         {[
                           { type: 'NPOP', status: 'Verified', expiry: 'Jan 2025', icon: CheckCircle2, color: 'text-secondary' },
                           { type: 'PGS', status: 'Renewing', expiry: 'Nov 2024', icon: AlertCircle, color: 'text-amber-500' },
                         ].map(cert => (
                            <Card key={cert.type} className="p-8 bg-white space-y-6">
                               <div className="flex justify-between items-start">
                                  <CertificationBadge type={cert.type} size="md" />
                                  <div className={cn("flex items-center gap-1 font-black uppercase text-[9px] tracking-widest", cert.color)}>
                                     <cert.icon className="w-4 h-4" /> {cert.status}
                                  </div>
                               </div>
                               <div>
                                  <p className="text-[10px] font-black uppercase text-muted tracking-widest">Valid Until: {cert.expiry}</p>
                                  <div className="mt-4 flex items-center justify-between p-4 bg-cream rounded-xl border border-border group cursor-pointer hover:border-secondary transition-all">
                                      <div className="flex items-center gap-3">
                                         <FileText className="w-4 h-4 text-muted group-hover:text-secondary" />
                                         <span className="text-xs font-bold text-text uppercase tracking-widest">cert_doc_0821.pdf</span>
                                      </div>
                                      <Upload className="w-4 h-4 text-muted" />
                                  </div>
                               </div>
                            </Card>
                         ))}
                         
                         <Card className="p-8 bg-white border-2 border-dashed border-border flex flex-col items-center justify-center text-center space-y-4 hover:border-secondary hover:bg-cream transition-all cursor-pointer group">
                             <div className="w-12 h-12 rounded-full bg-cream border border-border flex items-center justify-center text-muted group-hover:text-secondary group-hover:shadow-md transition-all">
                                <Plus className="w-6 h-6" />
                             </div>
                             <div>
                                <p className="text-xs font-black uppercase tracking-widest text-text">Add Documentation</p>
                                <p className="text-[10px] text-muted mt-1 font-medium italic">FSSAI, Water Audit, etc.</p>
                             </div>
                         </Card>
                      </div>
                   </motion.div>
                )}

                {tab === 'bank' && (
                   <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                      <Card className="p-10 bg-white space-y-10">
                         <div className="bg-cream p-6 rounded-2xl border border-border flex items-start gap-4">
                            <Info className="w-5 h-5 text-muted shrink-0 mt-1" />
                            <p className="text-xs text-muted leading-relaxed font-medium italic">Payouts are synchronized every Monday to your primary mandi-linked account. Ensure KYC details are up-to-date.</p>
                         </div>
                         <div className="grid md:grid-cols-2 gap-8">
                            <Input label="Banking Institution" defaultValue="HDFC Bank (Mandi Branch)" />
                            <Input label="Account Number" defaultValue="**** **** 8821" type="password" />
                            <Input label="IFSC Routing Code" defaultValue="HDFC000212" />
                            <Input label="PAN Identity" defaultValue="CHOPK****G" type="password" />
                         </div>
                      </Card>
                   </motion.div>
                )}
             </AnimatePresence>
          </div>
       </div>
    </div>
  )
}
