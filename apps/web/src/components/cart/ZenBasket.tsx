'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShieldCheck } from 'lucide-react'
import { useBasketStore } from '@/lib/store/basketStore'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'

export function ZenBasket() {
  const { isOpen, closeBasket } = useBasketStore()
  const cartItems = useSelector(state => state.cart.items) || []
  const dispatch = useDispatch()
  
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)
  const deliveryCharge = subtotal > 500 ? 0 : 40

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeBasket}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full max-w-md bg-cream shadow-2xl z-[101] flex flex-col"
          >
            {/* Header */}
            <div className="p-8 flex items-center justify-between border-b border-border/50 bg-white">
               <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                     <ShoppingBag className="w-6 h-6" />
                  </div>
                  <div>
                     <h2 className="text-2xl font-display font-black text-text">Zen Basket</h2>
                     <p className="text-[10px] font-black uppercase tracking-widest text-muted">{cartItems.length} Batch Items</p>
                  </div>
               </div>
               <button onClick={closeBasket} className="w-10 h-10 rounded-full hover:bg-cream flex items-center justify-center transition-colors">
                  <X className="w-6 h-6" />
               </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-8 space-y-6">
               {cartItems.length === 0 ? (
                 <div className="h-full flex flex-col items-center justify-center text-center">
                    <span className="text-6xl mb-4">🧺</span>
                    <h3 className="text-xl font-display font-bold text-text">Your basket is zen</h3>
                    <p className="text-sm text-muted mt-2">Add some fresh harvest to get started.</p>
                 </div>
               ) : (
                 cartItems.map((item) => (
                   <div key={item.id} className="flex gap-4 group">
                      <div className="w-20 h-20 rounded-2xl overflow-hidden bg-white border border-border flex-shrink-0">
                         <img src={item.image} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 space-y-1">
                         <div className="flex items-center gap-2">
                           <Badge variant="organic" size="sm" className="scale-75 origin-left">Batch Verified</Badge>
                         </div>
                         <h4 className="text-sm font-bold text-text">{item.name}</h4>
                         <p className="text-xs text-muted font-sans">₹{item.price} / unit</p>
                         
                         <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center bg-white border border-border rounded-xl px-2 py-1 gap-4">
                               <button className="text-muted hover:text-text"><Minus className="w-3 h-3" /></button>
                               <span className="text-xs font-bold">{item.quantity}</span>
                               <button className="text-muted hover:text-text"><Plus className="w-3 h-3" /></button>
                            </div>
                            <button className="text-muted hover:text-red-500 transition-colors">
                               <Trash2 className="w-4 h-4" />
                            </button>
                         </div>
                      </div>
                   </div>
                 ))
               )}
            </div>

            {/* Footer */}
            <div className="p-8 bg-white border-t border-border space-y-6">
               <div className="space-y-3">
                  <div className="flex justify-between text-sm font-medium text-muted">
                     <span>Subtotal</span>
                     <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium text-muted">
                     <span>Zone Delivery</span>
                     <span>{deliveryCharge === 0 ? <span className="text-secondary font-bold">FREE</span> : `₹${deliveryCharge}`}</span>
                  </div>
                  <div className="flex justify-between text-xl font-black text-text pt-3 border-t border-border/50">
                     <span className="font-display">Total</span>
                     <span className="font-sans">₹{subtotal + deliveryCharge}</span>
                  </div>
               </div>

               <div className="bg-secondary/10 p-4 rounded-2xl flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-secondary" />
                  <p className="text-[10px] text-secondary font-bold leading-tight uppercase tracking-wider">
                     Next360 Fresh-Lock Harvest Promise Applied to this basket.
                  </p>
               </div>

               <Button 
                 className="w-full h-16 rounded-2xl text-xl shadow-xl shadow-primary/20"
                 disabled={cartItems.length === 0}
                 onClick={() => window.location.href = '/cart'}
               >
                  Go to Checkout <ArrowRight className="w-5 h-5 ml-2" />
               </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
