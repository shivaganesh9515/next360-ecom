'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Camera, MapPin, ShieldCheck, Leaf, Tractor, ArrowRight, ArrowLeft, Upload, CheckCircle2, Info } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/lib/utils'

export default function BatchEnrollment() {
  const [step, setStep] = useState(1)

  const steps = [
    { id: 1, title: 'Harvest Core', icon: Tractor },
    { id: 2, title: 'Provenance Lab', icon: MapPin },
    { id: 3, title: 'Cert Proofs', icon: ShieldCheck },
  ]

  return (
    <div className="space-y-12 font-sans pb-20 p-8 lg:p-12 max-w-5xl mx-auto">
       <div className="space-y-2">
          <div className="flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
             <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted">Enrollment Portal v4.0</span>
          </div>
          <h1 className="text-5xl font-display font-black text-text tracking-tighter leading-none">Enroll New Batch</h1>
       </div>

       {/* Step Indicator */}
       <div className="flex items-center gap-4 bg-white p-6 rounded-[2.5rem] border border-border shadow-sm">
          {steps.map((s, idx) => (
             <div key={s.id} className="flex-1 flex items-center gap-4 group">
                <div className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500",
                  step >= s.id ? "bg-secondary text-white shadow-lg shadow-secondary/20 scale-110" : "bg-cream text-muted border border-border"
                )}>
                   <s.icon className="w-6 h-6" />
                </div>
                <div className="hidden md:block">
                   <p className={cn("text-[9px] font-black uppercase tracking-widest", step >= s.id ? "text-secondary" : "text-muted")}>Step 0{s.id}</p>
                   <p className={cn("text-xs font-bold", step >= s.id ? "text-text" : "text-muted")}>{s.title}</p>
                </div>
                {idx < steps.length - 1 && <div className="flex-1 h-px bg-border mx-4" />}
             </div>
          ))}
       </div>

       {/* Form Content */}
       <AnimatePresence mode="wait">
          {step === 1 && (
             <motion.div 
               key="step1"
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -20 }}
               className="space-y-8"
             >
                <Card className="p-10 bg-white space-y-10">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <Input label="Commodity Name" placeholder="e.g. Premium Aralu Paddy" />
                      <Input label="Batch Category" placeholder="Select Category" />
                      <Input label="Estimated Yield (Units)" type="number" placeholder="0" />
                      <Input label="Base Price / Unit" type="number" placeholder="₹" />
                   </div>

                   <section>
                      <label className="text-xs font-black uppercase tracking-widest text-muted block mb-4">Batch Images (Mandi Standards)</label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                         <div className="aspect-square rounded-3xl border-2 border-dashed border-border bg-cream flex flex-col items-center justify-center text-muted hover:border-secondary hover:text-secondary transition-all cursor-pointer group">
                            <Camera className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Capture Photo</span>
                         </div>
                         <div className="aspect-square rounded-3xl bg-slate-100 animate-pulse border border-border" />
                         <div className="aspect-square rounded-3xl bg-slate-100 animate-pulse border border-border" />
                      </div>
                   </section>
                </Card>
             </motion.div>
          )}

          {step === 2 && (
             <motion.div 
               key="step2"
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -20 }}
               className="space-y-8"
             >
                <Card className="p-10 bg-white space-y-10">
                   <div className="bg-secondary/10 p-6 rounded-[2rem] border border-secondary/20 flex items-start gap-4">
                      <Info className="w-6 h-6 text-secondary shrink-0" />
                      <div>
                         <h4 className="text-sm font-bold text-text">Zone Delta Calibration</h4>
                         <p className="text-xs text-muted mt-1 leading-relaxed">System has detected your mandi origin as <span className="text-secondary font-black">SANGA REDDY HUB-04</span>. Coordinates will be embedded in the batch metadata.</p>
                      </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <Input label="Soil Health Audit Date" type="date" />
                      <Input label="Water Source" placeholder="e.g. Traditional Rain-fed" />
                      <Input label="Organic Factor (1.0 - 1.5)" type="number" step="0.1" placeholder="1.2" />
                      <div className="flex flex-col gap-2">
                         <label className="text-[11px] font-black uppercase tracking-widest text-muted">Harvest Timing</label>
                         <div className="flex gap-2">
                            <Button variant="outline" className="flex-1 text-[10px] uppercase font-black tracking-widest">Early Morning</Button>
                            <Button variant="outline" className="flex-1 text-[10px] uppercase font-black tracking-widest">Noon Batch</Button>
                         </div>
                      </div>
                   </div>
                </Card>
             </motion.div>
          )}

          {step === 3 && (
             <motion.div 
               key="step3"
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -20 }}
               className="space-y-8"
             >
                <Card className="p-10 bg-white space-y-10 border-2 border-secondary shadow-2xl shadow-secondary/10">
                   <div className="flex items-center gap-4 mb-8">
                      <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center text-white">
                         <ShieldCheck className="w-8 h-8" />
                      </div>
                      <div>
                         <h3 className="text-2xl font-display font-black text-text">Certification Proofs</h3>
                         <p className="text-xs font-medium text-muted">Upload high-res PDFs for batch audit.</p>
                      </div>
                   </div>

                   <div className="space-y-4">
                      {['NPOP Certificate', 'PGS Organic ID', 'Mandi Clearance'].map((doc) => (
                         <div key={doc} className="flex items-center justify-between p-6 bg-cream rounded-2xl border border-dashed border-border hover:border-secondary transition-all group">
                            <div className="flex items-center gap-4">
                               <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-muted group-hover:text-secondary group-hover:shadow-md transition-all">
                                  <Upload className="w-5 h-5" />
                               </div>
                               <p className="text-sm font-bold text-text">{doc}</p>
                            </div>
                            <Button variant="ghost" className="text-secondary font-black text-[10px] uppercase tracking-widest">Attach File</Button>
                         </div>
                      ))}
                   </div>
                </Card>
             </motion.div>
          )}
       </AnimatePresence>

       {/* Controls */}
       <div className="flex items-center justify-between pt-8 border-t border-border">
          <Button 
            variant="ghost" 
            onClick={() => setStep(s => Math.max(1, s - 1))}
            className={cn("h-14 px-8 rounded-2xl font-black uppercase text-[10px] tracking-widest", step === 1 ? 'invisible' : '')}
          >
             <ArrowLeft className="w-4 h-4 mr-2" /> Previous Step
          </Button>

          <Button 
            onClick={() => step < 3 ? setStep(s => s + 1) : alert('Batch Sent for Admin Audit!')}
            className="h-16 px-10 rounded-[2rem] text-lg font-display font-black shadow-xl shadow-primary/20 group"
          >
             {step === 3 ? 'Launch Harvest Batch' : 'Continue to next'}
             <ArrowRight className="w-5 h-5 ml-4 group-hover:translate-x-1 transition-transform" />
          </Button>
       </div>
    </div>
  )
}
