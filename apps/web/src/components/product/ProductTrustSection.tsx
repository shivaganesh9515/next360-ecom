import { CertificationBadge } from '@/components/ui/CertificationBadge'
import { Card } from '@/components/ui/Card'
import { Check, Shield } from 'lucide-react'

export function ProductTrustSection({ certificate }) {
  const steps = [
    { title: 'Soil Audit', desc: 'Pre-sowing chemical analysis completed.' },
    { title: 'Harvest Log', desc: 'Picked manually 6 hours ago.' },
    { title: 'Lab Test', desc: 'Pesticide residue check: PASSED.' }
  ]

  return (
    <div className="space-y-8 my-10 font-sans">
       <div className="flex items-center justify-between">
          <h3 className="text-xl font-display font-black text-text">Purity & Traceability</h3>
          <CertificationBadge type="NPOP" size="md" />
       </div>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {steps.map((step, i) => (
             <div key={step.title} className="bg-white border border-border p-5 rounded-2xl flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-600 flex-shrink-0">
                   <Check className="w-4 h-4" />
                </div>
                <div>
                   <p className="text-xs font-black uppercase tracking-widest text-text mb-1">{step.title}</p>
                   <p className="text-[11px] text-muted leading-relaxed">{step.desc}</p>
                </div>
             </div>
          ))}
       </div>

       <Card className="bg-[#2D5016] text-white p-6 rounded-[2rem] border-none flex items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
             <Shield className="w-8 h-8" />
          </div>
          <div>
             <h4 className="text-lg font-display font-bold">100% Purity Guarantee</h4>
             <p className="text-sm text-white/70">Scan the QR on packaging to view the third-party lab analysis report for this specific batch.</p>
          </div>
       </Card>
    </div>
  )
}
