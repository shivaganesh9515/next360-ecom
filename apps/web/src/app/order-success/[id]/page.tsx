"use client"

import React, { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Check, Package, Truck, Calendar, ShoppingBag, ArrowRight } from 'lucide-react'
import { Button, Badge } from '@next360/ui'
import { MOCK_PLACED_ORDER } from '@/lib/mockOrders'
import { formatPrice } from '@next360/utils'

export default function OrderSuccessPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = React.use(params)
  const router = useRouter()
  useEffect(() => {
    // Dynamic import to avoid SSR issues with canvas-confetti
    import('canvas-confetti').then((confetti) => {
      confetti.default({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#2D5016', '#7CB342', '#F4A300', '#FFFFFF']
      })
    })
  }, [])

  return (
    <main className="min-h-screen bg-cream/30 pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-4 text-center">
        {/* Animated Check */}
        <div className="relative mb-8 flex justify-center">
           <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 12, stiffness: 200 }}
              className="w-24 h-24 rounded-[2.5rem] bg-secondary flex items-center justify-center text-white shadow-2xl shadow-secondary/40"
           >
              <motion.div
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                 <Check size={48} strokeWidth={4} />
              </motion.div>
           </motion.div>
           
           {/* Decorative Pulses */}
           <motion.div 
             animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
             transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
             className="absolute inset-0 w-24 h-24 rounded-[2.5rem] bg-secondary/20 mx-auto -z-10"
           />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h1 className="font-display text-4xl md:text-5xl font-black text-primary mb-2">Order Placed Successfully!</h1>
          <p className="text-slate-500 font-medium tracking-wide uppercase text-sm mb-6">
            Order ID: <span className="text-primary font-black">{MOCK_PLACED_ORDER.orderNumber}</span>
          </p>

          <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-100 mb-12">
             <Truck className="text-secondary" size={20} />
             <p className="text-sm font-bold text-slate-700">
               Estimated Delivery: <span className="text-secondary">{MOCK_PLACED_ORDER.expectedBy}</span>
             </p>
          </div>
        </motion.div>

        {/* Order Details Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-[3rem] border border-slate-100 shadow-xl shadow-primary/5 p-8 md:p-12 text-left mb-12"
        >
           <h2 className="font-display text-2xl font-bold text-slate-800 mb-8 border-b border-slate-50 pb-6">Order Summary</h2>
           
           <div className="space-y-6 mb-8">
              {MOCK_PLACED_ORDER.items.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center p-2">
                         <ShoppingBag size={20} className="text-primary/40" />
                      </div>
                      <div>
                         <p className="font-bold text-slate-800 text-sm">{item.productName}</p>
                         <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{item.quantity} × {item.selectedWeight}</p>
                      </div>
                   </div>
                   <p className="font-black text-primary">{formatPrice(item.totalPrice)}</p>
                </div>
              ))}
           </div>

           <div className="space-y-4 pt-8 border-t border-slate-50">
              <div className="flex justify-between text-sm font-medium text-slate-500">
                 <span>Subtotal</span>
                 <span>{formatPrice(MOCK_PLACED_ORDER.subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm font-medium text-slate-500">
                 <span>Delivery Fee</span>
                 <span className="text-secondary font-black">FREE</span>
              </div>
              <div className="flex justify-between items-end pt-4">
                 <span className="font-display text-2xl font-bold text-primary">Total Paid</span>
                 <span className="font-display text-4xl font-black text-primary tracking-tighter">{formatPrice(MOCK_PLACED_ORDER.total)}</span>
              </div>
           </div>
        </motion.div>

        {/* Next Steps */}
        <div className="bg-white rounded-[2.5rem] border border-slate-100 p-10 text-left mb-12">
           <h3 className="font-display text-xl font-bold text-primary mb-8">What's Next?</h3>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              <div className="flex flex-col items-center md:items-start gap-4 text-center md:text-left group">
                 <div className="w-12 h-12 rounded-2xl bg-secondary text-white flex items-center justify-center shadow-lg shadow-secondary/20 group-hover:scale-110 transition-transform">
                    <Check size={24} strokeWidth={3} />
                 </div>
                 <div>
                    <p className="font-black text-slate-800 text-sm uppercase tracking-widest mb-1">Confirmed</p>
                    <p className="text-xs text-slate-400 font-medium">We've received your order and are preparing it.</p>
                 </div>
              </div>

              <div className="flex flex-col items-center md:items-start gap-4 text-center md:text-left group grayscale opacity-40">
                 <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center transition-all">
                    <Package size={24} />
                 </div>
                 <div>
                    <p className="font-black text-slate-800 text-sm uppercase tracking-widest mb-1">Processing</p>
                    <p className="text-xs text-slate-400 font-medium">Your items are being hand-picked from the farm.</p>
                 </div>
              </div>

              <div className="flex flex-col items-center md:items-start gap-4 text-center md:text-left group grayscale opacity-40">
                 <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center transition-all">
                    <Truck size={24} />
                 </div>
                 <div>
                    <p className="font-black text-slate-800 text-sm uppercase tracking-widest mb-1">On the way</p>
                    <p className="text-xs text-slate-400 font-medium">Our delivery partner will be at your door soon.</p>
                 </div>
              </div>
           </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
           <Button 
             className="h-14 px-10 rounded-2xl font-black text-lg shadow-xl shadow-primary/20"
             onClick={() => router.push('/shop')}
           >
              Continue Shopping
              <ArrowRight size={20} className="ml-2" />
           </Button>
           <Button 
             variant="outline"
             className="h-14 px-10 rounded-2xl font-black text-lg border-primary/20 text-primary"
             onClick={() => router.push('/account/orders')}
           >
              Track My Order
           </Button>
        </div>
      </div>
    </main>
  )
}
