"use client"

import React, { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Check, Package, Truck, Calendar, ShoppingBag, ArrowRight } from 'lucide-react'
import { Button, Badge } from '@next360/ui'
import { useQuery } from '@tanstack/react-query'
import { orderService } from '@/services/orderService'
import { formatPrice } from '@next360/utils'
import { format } from 'date-fns'

export default function OrderSuccessPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = React.use(params)
  const router = useRouter()

  const { data: order, isLoading } = useQuery({
    queryKey: ['order', id],
    queryFn: () => orderService.getById(id),
    retry: 3,
  })

  useEffect(() => {
    if (order) {
      // Dynamic import to avoid SSR issues with canvas-confetti
      import('canvas-confetti').then((confetti) => {
        confetti.default({
          particleCount: 200,
          spread: 100,
          origin: { y: 0.6 },
          colors: ['#16a34a', '#6366f1', '#0f172a', '#ffffff']
        })
      })
    }
  }, [order])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="text-4xl"
        >
          🌱
        </motion.div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-white">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Order Not Found</h2>
        <Link href="/shop">
          <Button className="rounded-full px-10 h-14 font-black uppercase tracking-widest text-xs">Back to Marketplace</Button>
        </Link>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-white pt-40 pb-24">
      <div className="max-w-4xl mx-auto px-4 text-center">
        {/* Animated Check */}
        <div className="relative mb-12 flex justify-center">
           <motion.div 
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", damping: 10, stiffness: 150 }}
              className="w-32 h-32 rounded-full bg-primary flex items-center justify-center text-white shadow-2xl shadow-primary/30 relative z-10"
           >
              <Check size={64} strokeWidth={4} />
           </motion.div>
           
           {/* Decorative Pulses */}
           <motion.div 
             animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0, 0.2] }}
             transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
             className="absolute inset-0 w-32 h-32 rounded-full bg-primary/20 mx-auto -z-10"
           />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-4 tracking-tighter italic">Haul Confirmed!</h1>
          <p className="text-slate-400 font-black tracking-[0.3em] uppercase text-[10px] mb-12 leading-relaxed">
            Deployment Successful • Order ID: <span className="text-slate-900 font-black">{order.orderNumber}</span>
          </p>

          <div className="inline-flex items-center gap-4 bg-slate-50 px-8 py-4 rounded-full border border-slate-100 mb-16 shadow-inner">
             <Truck className="text-primary" size={20} strokeWidth={3} />
             <p className="text-sm font-black text-slate-900 uppercase tracking-widest">
               ETA: <span className="text-primary">
                 {order.expectedBy ? format(new Date(order.expectedBy), 'MMMM do') : 'TBD'}
               </span>
             </p>
          </div>
        </motion.div>

        {/* Order Details Card */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 text-left mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/50 p-10 md:p-14"
          >
             <h2 className="text-2xl font-black text-slate-900 mb-10 tracking-tight flex items-center justify-between">
               Inventory Haul
               <span className="text-[10px] bg-slate-900 text-white px-3 py-1 rounded-full uppercase tracking-widest font-black">
                  {order.items.length} Nodes
               </span>
             </h2>
             
             <div className="space-y-8 mb-10">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center group">
                     <div className="flex items-center gap-5">
                        <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center p-2 border border-slate-100 group-hover:scale-105 transition-transform duration-500">
                           <ShoppingBag size={24} className="text-primary/40" />
                        </div>
                        <div>
                           <p className="font-black text-slate-800 text-base tracking-tight leading-tight line-clamp-1">{item.productName}</p>
                           <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest mt-1">{item.quantity} × {item.selectedWeight}</p>
                        </div>
                     </div>
                     <p className="font-black text-slate-900 text-base">{formatPrice(item.totalPrice)}</p>
                  </div>
                ))}
             </div>

             <div className="space-y-4 pt-10 border-t border-slate-50 italic">
                <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
                   <span>Basket Subtotal</span>
                   <span>{formatPrice(order.subtotal)}</span>
                </div>
                <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
                   <span>Logistics Fee</span>
                   {order.deliveryFee === 0 ? (
                      <span className="text-primary font-black tracking-widest">0.00 FREE</span>
                   ) : (
                      <span>{formatPrice(order.deliveryFee)}</span>
                   )}
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-xs font-bold text-primary uppercase tracking-widest">
                     <span>Protocol Applied</span>
                     <span>-{formatPrice(order.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between items-end pt-8 border-t border-slate-50 mt-4">
                   <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">Total Settlement</span>
                   <span className="text-5xl font-black text-slate-900 tracking-tighter leading-none">{formatPrice(order.total)}</span>
                </div>
             </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-10"
          >
            {/* Next Steps */}
            <div className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl shadow-slate-900/40 h-full relative overflow-hidden">
               <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl" />
               <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-10 relative z-10">Deployment Pipeline</h3>
               
               <div className="space-y-10 relative z-10 pl-2">
                  <div className="flex gap-6 group">
                     <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20 shrink-0">
                        <Check size={24} strokeWidth={4} />
                     </div>
                     <div className="space-y-1">
                        <p className="font-black text-white text-sm uppercase tracking-widest">Node Confirmed</p>
                        <p className="text-xs text-slate-400 font-bold leading-relaxed">Inventory allocated and reservation locked.</p>
                     </div>
                  </div>

                  <div className="flex gap-6 group opacity-50 contrast-75">
                     <div className="w-12 h-12 rounded-2xl bg-white/10 text-white/40 flex items-center justify-center shrink-0">
                        <Package size={24} strokeWidth={2} />
                     </div>
                     <div className="space-y-1">
                        <p className="font-black text-white/60 text-sm uppercase tracking-widest">Neural Sorting</p>
                        <p className="text-xs text-slate-500 font-bold leading-relaxed">Items are being hand-picked from the farm origin.</p>
                     </div>
                  </div>

                  <div className="flex gap-6 group opacity-50 contrast-75">
                     <div className="w-12 h-12 rounded-2xl bg-white/10 text-white/40 flex items-center justify-center shrink-0">
                        <Truck size={24} strokeWidth={2} />
                     </div>
                     <div className="space-y-1">
                        <p className="font-black text-white/60 text-sm uppercase tracking-widest">Outbound Transit</p>
                        <p className="text-xs text-slate-500 font-bold leading-relaxed">Logistics partner assigned for final delivery node.</p>
                     </div>
                  </div>
               </div>

               <div className="mt-20 pt-10 border-t border-white/5">
                  <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.4em] leading-loose text-center">
                    Real-time monitoring enabled • End-to-end trust
                  </p>
               </div>
            </div>
          </motion.div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-2xl mx-auto items-center">
           <Button 
             className="w-full h-18 py-8 rounded-full font-black text-base uppercase tracking-widest shadow-2xl shadow-primary/20 group gap-3"
             onClick={() => router.push('/shop')}
           >
              <span>Back to Marketplace</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" strokeWidth={3} />
           </Button>
           <button 
             className="text-slate-400 font-black uppercase tracking-widest text-[10px] hover:text-slate-900 transition-colors h-14"
             onClick={() => router.push('/account/orders')}
           >
              Monitor Fleet Dispatch
           </button>
        </div>
      </div>
    </main>
  )
}
