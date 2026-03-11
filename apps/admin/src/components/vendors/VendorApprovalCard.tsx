import { Check, X, Store, Mail, Phone, MapPin, Sparkles } from 'lucide-react'
import { cn } from '@next360/utils'
 
interface VendorApprovalCardProps {
  vendor: any
  onApprove: (id: string) => void
  onReject: (id: string, reason: string) => void
  isProcessing: boolean
}
 
export function VendorApprovalCard({ vendor, onApprove, onReject, isProcessing }: VendorApprovalCardProps) {
  return (
    <div className="glass group hover:bg-white/[0.04] transition-all duration-700 p-10 rounded-[3rem] border-white/5 shadow-[0_50px_100px_rgba(0,0,0,0.4)] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full -mr-12 -mt-12 group-hover:bg-primary/10 transition-all duration-1000" />
      
      <div className="flex flex-col gap-10">
        
        {/* Vendor Info */}
        <div className="space-y-8 flex-1">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-white/[0.03] text-primary flex items-center justify-center border border-white/5 shadow-inner group-hover:border-primary/40 transition-all duration-500">
              <Store className="w-7 h-7" />
            </div>
            <div>
               <div className="flex items-center gap-2 mb-1.5">
                  <Sparkles size={12} className="text-primary/40" />
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Pending Activation</span>
               </div>
              <h3 className="text-3xl font-black text-white tracking-tighter italic leading-none group-hover:text-primary transition-colors">{vendor.storeName}</h3>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-3">Principal Identity: <span className="text-slate-300 italic">{vendor.user?.name}</span></p>
            </div>
          </div>
 
          <div className="grid grid-cols-1 gap-6 text-[11px] font-black uppercase tracking-[0.1em]">
            <div className="flex items-center gap-4 text-slate-400 group-hover:text-slate-300 transition-colors bg-white/[0.02] p-4 rounded-xl border border-white/5">
              <Mail className="w-4 h-4 text-slate-600" />
              <span className="lowercase italic">{vendor.user?.email}</span>
            </div>
            <div className="flex items-center gap-4 text-slate-400 group-hover:text-slate-300 transition-colors bg-white/[0.02] p-4 rounded-xl border border-white/5">
              <Phone className="w-4 h-4 text-slate-600" />
              {vendor.phone || 'NO SIGNAL'}
            </div>
            <div className="flex items-start gap-4 text-slate-400 group-hover:text-slate-300 transition-colors bg-white/[0.02] p-4 rounded-xl border border-white/5">
              <MapPin className="w-4 h-4 text-slate-600 mt-0.5 shrink-0" />
              <span className="leading-relaxed opacity-80">{vendor.address}, {vendor.city}, {vendor.state} {vendor.pinCode}</span>
            </div>
          </div>
 
          {vendor.description && (
            <div className="pt-8 border-t border-white/5 relative">
               <div className="text-[9px] font-black text-slate-600 uppercase tracking-[0.5em] mb-4">Mission Statement</div>
               <p className="text-sm font-bold text-slate-400 leading-loose italic opacity-90 group-hover:opacity-100 transition-opacity">
                "{vendor.description}"
              </p>
            </div>
          )}
        </div>
 
        {/* Actions Interface */}
        <div className="flex gap-4 pt-4 border-t border-white/5">
          <button
            disabled={isProcessing}
            onClick={() => onApprove(vendor.id)}
            className="flex-1 flex items-center justify-center gap-3 py-5 bg-primary text-white font-black text-[10px] uppercase tracking-[0.3em] rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_20px_40px_rgba(22,163,74,0.2)] disabled:opacity-50 border-none"
          >
            <Check className="w-4 h-4" strokeWidth={4} /> ACTIVATE 
          </button>
          <button
            disabled={isProcessing}
            onClick={() => {
              const reason = window.prompt('Terminal rejection rationale:')
              if (reason) onReject(vendor.id, reason)
            }}
            className="flex-1 flex items-center justify-center gap-3 py-5 bg-white/[0.03] text-rose-500 font-black text-[10px] uppercase tracking-[0.3em] rounded-2xl border border-white/10 hover:border-rose-500/20 hover:bg-rose-500/5 transition-all disabled:opacity-50"
          >
            <X className="w-4 h-4" strokeWidth={4} /> REJECT
          </button>
        </div>
 
      </div>
    </div>
  )
}
