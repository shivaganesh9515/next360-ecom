'use client'

import { Clock, Zap, ShieldCheck } from 'lucide-react'
import { useLocationStore } from '@/lib/store/locationStore'
import { useModeStore } from '@/lib/store/modeStore'
import { cn } from '@/lib/utils'

export function ZoneDeliveryPromise() {
  const { city, deliveryPromise, hyperlocalActive } = useLocationStore()
  const { activeMode } = useModeStore()

  return (
    <div className="bg-white border-2 border-border p-6 rounded-[2.5rem] font-sans">
       <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
             <div className="w-10 h-10 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
                <Clock className="w-5 h-5" />
             </div>
             <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-muted">Delivery Promise</p>
                <p className="text-sm font-black text-text">{deliveryPromise || 'Express Delivery'}</p>
             </div>
          </div>
          {hyperlocalActive && (
             <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-700 text-[10px] font-black uppercase">
                <Zap className="w-3 h-3 fill-green-700" /> Hyperlocal Active
             </div>
          )}
       </div>

       <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-border/50">
             <span className="text-xs font-bold text-muted">Zone Code</span>
             <span className="text-xs font-black text-text uppercase">HYD-CENTRAL-01</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-border/50">
             <span className="text-xs font-bold text-muted">Last Mile Hub</span>
             <span className="text-xs font-black text-text uppercase">Banjara Hills</span>
          </div>
          <div className="flex items-center justify-between py-3">
             <span className="text-xs font-bold text-muted">Delivery Mode</span>
             <span className="text-xs font-black text-secondary tracking-widest uppercase">{activeMode} STANDARD</span>
          </div>
       </div>

       <div className="mt-6 pt-6 border-t border-border flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-secondary" />
          <p className="text-[10px] text-muted leading-tight font-medium">
             Our <span className="font-bold">Fresh-Lock</span> promise ensures your items are kept at controlled temperatures from farm to hub.
          </p>
       </div>
    </div>
  )
}
