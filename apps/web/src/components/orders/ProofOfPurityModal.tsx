'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheck, Star, Camera, Download, Share2, X, MapPin, CheckCircle2 } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { CertificationBadge } from '@/components/ui/CertificationBadge'

export function ProofOfPurityModal({ isOpen, onClose, orderData }) {
  const data = orderData || {
    id: 'HB82ZA',
    harvestDate: 'Oct 24, 2026',
    farmer: 'Narayana Rao',
    mandal: 'Sanga Reddy',
    proofImage: 'https://images.unsplash.com/photo-1599406565158-75c1d6860d5b?auto=format&fit=crop&q=80&w=600'
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Digital Proof of Purity" size="lg">
       <div className="space-y-8 font-sans">
          <div className="bg-secondary/10 p-6 rounded-[2rem] border border-secondary/20 flex flex-col items-center text-center">
             <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center text-white mb-4 shadow-lg shadow-secondary/20">
                <ShieldCheck className="w-8 h-8" />
             </div>
             <h3 className="text-2xl font-display font-black text-text tracking-tight">Verified Harvest Batch</h3>
             <p className="text-xs font-bold text-muted mt-1 uppercase tracking-widest">Order #N360-{data.id}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="space-y-6">
                <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-border shadow-md group">
                   <img src={data.proofImage} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                   <div className="absolute bottom-6 inset-x-6">
                      <Badge variant="organic" className="bg-white/20 backdrop-blur-md border-none text-white mb-2">Live Photo Proof</Badge>
                      <p className="text-white text-xs font-bold">Captured by Vendor at Mandi Warehouse</p>
                   </div>
                </div>
             </div>

             <div className="space-y-8 py-4">
                <section>
                   <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted mb-4">Harvest Metadata</h4>
                   <div className="space-y-4">
                      <div className="flex items-center justify-between">
                         <span className="text-xs font-medium text-muted">Harvest Date</span>
                         <span className="text-xs font-black text-text">{data.harvestDate}</span>
                      </div>
                      <div className="flex items-center justify-between">
                         <span className="text-xs font-medium text-muted">Field Origin</span>
                         <span className="text-xs font-black text-text flex items-center gap-1"><MapPin className="w-3 h-3" /> {data.mandal}</span>
                      </div>
                      <div className="flex items-center justify-between">
                         <span className="text-xs font-medium text-muted">Primary Cultivator</span>
                         <span className="text-xs font-black text-text">{data.farmer}</span>
                      </div>
                   </div>
                </section>

                <section>
                   <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted mb-4">Certifications Applied</h4>
                   <div className="flex flex-wrap gap-2">
                      <CertificationBadge type="NPOP" size="md" />
                      <CertificationBadge type="PGS" size="md" />
                      <CertificationBadge type="FSSAI" size="md" />
                   </div>
                </section>

                <Card className="p-6 bg-cream border-dashed border-border border-2">
                   <h4 className="text-sm font-display font-bold text-text mb-2">Rate this batch?</h4>
                   <p className="text-[10px] text-muted mb-4 leading-relaxed">Your feedback directly impacts the farmer's platform credit score.</p>
                   <div className="flex items-center gap-2 mb-6">
                      {[1,2,3,4,5].map(i => <Star key={i} className="w-6 h-6 text-border hover:text-accent cursor-pointer transition-colors" />)}
                   </div>
                   <Button className="w-full h-12 rounded-xl">Submit Rating & Share</Button>
                </Card>
             </div>
          </div>

          <div className="flex items-center gap-4 pt-4 border-t border-border/50">
             <Button variant="outline" className="flex-1 h-14 rounded-2xl border-border">
                <Download className="w-4 h-4 mr-2" /> Save Certificate
             </Button>
             <Button variant="outline" className="flex-1 h-14 rounded-2xl border-border">
                <Share2 className="w-4 h-4 mr-2" /> Share Result
             </Button>
          </div>
       </div>
    </Modal>
  )
}
