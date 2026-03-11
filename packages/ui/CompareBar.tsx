'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight, TableProperties } from 'lucide-react'
import { useCompareStore } from '@/lib/store/compareStore'
import { Button } from '@/components/ui/Button'
import { useRouter } from 'next/navigation'

export function CompareBar() {
  const { compareList, removeFromCompare, clearCompare } = useCompareStore()
  const router = useRouter()

  if (compareList.length === 0) return null

  return (
    <div className="fixed bottom-8 inset-x-0 z-[60] px-4 pointer-events-none">
       <motion.div
         initial={{ y: 100, opacity: 0 }}
         animate={{ y: 0, opacity: 1 }}
         exit={{ y: 100, opacity: 0 }}
         className="max-w-3xl mx-auto bg-white/90 backdrop-blur-xl border border-border shadow-2xl rounded-[2.5rem] p-4 flex items-center gap-6 pointer-events-auto"
       >
          <div className="flex -space-x-4 pl-2 overflow-visible">
             {compareList.map((item) => (
                <div key={item.id} className="relative group">
                   <div className="w-14 h-14 rounded-2xl border-2 border-white shadow-lg overflow-hidden bg-cream">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                   </div>
                   <button 
                     onClick={() => removeFromCompare(item.id)}
                     className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center scale-0 group-hover:scale-100 transition-transform shadow-md"
                   >
                     <X className="w-3 h-3" />
                   </button>
                </div>
             ))}
             {Array.from({ length: Math.max(0, 4 - compareList.length) }).map((_, i) => (
                <div key={i} className="w-14 h-14 rounded-2xl border-2 border-dashed border-border flex items-center justify-center text-muted text-xs font-bold">
                   +
                </div>
             ))}
          </div>

          <div className="flex-1">
             <h4 className="text-sm font-black text-text font-display uppercase tracking-widest">Comparison Hub</h4>
             <p className="text-[10px] text-muted font-bold">{compareList.length} of 4 items selected</p>
          </div>

          <div className="flex items-center gap-3 pr-2">
             <Button variant="ghost" size="sm" onClick={clearCompare} className="text-[10px] font-black uppercase text-muted hover:text-red-500">
                Reset
             </Button>
             <Button 
               size="md" 
               className="rounded-2xl px-6 h-12 shadow-lg shadow-secondary/20"
               onClick={() => router.push('/compare')}
               disabled={compareList.length < 2}
             >
                Compare Now <ArrowRight className="w-4 h-4 ml-2" />
             </Button>
          </div>
       </motion.div>
    </div>
  )
}
