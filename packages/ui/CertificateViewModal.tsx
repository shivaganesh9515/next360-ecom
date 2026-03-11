'use client'

import { Modal } from './Modal'
import { Badge } from './Badge'
import { Button } from './Button'
import { cn } from '@/lib/utils'

const CertificateViewModal = ({ isOpen, onClose, certificate }) => {
  if (!certificate) return null

  const isExpiringSoon = certificate.daysRemaining && certificate.daysRemaining < 30 && certificate.status === 'VALID'

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Certificate Details" maxWidth="max-w-lg">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
           <div>
             <Badge variant={certificate.type === 'NPOP' || certificate.type === 'PGS' ? 'organic' : 'certified'} size="md">
                {certificate.type}
             </Badge>
             <p className="text-xs text-muted mt-1 uppercase tracking-wide">Issuing Authority: {certificate.authority}</p>
           </div>
        </div>

        <div className="w-full">
           <label className="text-xs text-muted uppercase tracking-wide mb-1.5 block">Certificate Number</label>
           <div className="bg-cream rounded-xl px-4 py-3 border border-border flex items-center justify-between group cursor-pointer active:scale-[0.99] transition-all">
              <span className="font-mono font-bold text-primary text-lg">{certificate.number}</span>
              <span className="text-[10px] uppercase font-black tracking-widest text-muted group-hover:text-primary transition-colors">Click to Copy</span>
           </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
           <div className="space-y-1">
              <label className="text-[10px] text-muted uppercase tracking-[0.2em] font-black">Issued To</label>
              <p className="text-sm font-bold text-text">{certificate.issuedTo}</p>
           </div>
           <div className="space-y-1 text-right">
              <label className="text-[10px] text-muted uppercase tracking-[0.2em] font-black">Issuing Body</label>
              <p className="text-sm font-bold text-text">{certificate.authority}</p>
           </div>
           <div className="space-y-1">
              <label className="text-[10px] text-muted uppercase tracking-[0.2em] font-black">Valid From</label>
              <p className="text-sm font-bold text-text">{certificate.from}</p>
           </div>
           <div className="space-y-1 text-right">
              <label className="text-[10px] text-muted uppercase tracking-[0.2em] font-black">Valid Until</label>
              <p className="text-sm font-bold text-text">{certificate.until}</p>
           </div>
        </div>

        <div className={cn(
          "p-4 rounded-xl border flex items-center justify-between",
          certificate.status === 'VALID' && !isExpiringSoon && "bg-green-50 border-green-200",
          isExpiringSoon && "bg-amber-50 border-amber-200",
          certificate.status === 'EXPIRED' && "bg-red-50 border-red-200"
        )}>
          <div className="flex flex-col gap-0.5">
             <span className={cn(
               "font-semibold text-sm",
               certificate.status === 'VALID' && !isExpiringSoon && "text-green-700",
               isExpiringSoon && "text-amber-700",
               certificate.status === 'EXPIRED' && "text-red-700"
             )}>
               {certificate.status === 'VALID' ? (isExpiringSoon ? '⚠️ Expiring Soon' : '✅ Active Certificate') : '❌ Expired Certificate'}
             </span>
             {certificate.daysRemaining && (
               <span className="text-xs text-muted opacity-80">
                 {certificate.daysRemaining} days remaining
               </span>
             )}
          </div>
        </div>

        <Button variant="outline" size="lg" className="w-full mt-2" onClick={() => window.open(certificate.documentUrl, '_blank')}>
          View Full Document →
        </Button>
      </div>
    </Modal>
  )
}

export { CertificateViewModal }
