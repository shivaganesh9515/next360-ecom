"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { X, ShoppingCart, ArrowRight, Truck, TicketPercent } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { formatPrice } from '@next360/utils'
import { Button, EmptyState, AnimatedCounter } from '@next360/ui'
import { useCartStore } from '@/store/cartStore'
import CartItem from './CartItem'
import CouponSelectorModal from './CouponSelectorModal'
import { useQuery } from '@tanstack/react-query'
import { cartService } from '@/services/cartService'

export default function CartDrawer() {
  const router = useRouter()
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false)
  const { 
    items, 
    isDrawerOpen, 
    closeDrawer, 
    getSubtotal, 
    getItemCount,
    coupon 
  } = useCartStore()

  const { data: coupons = [] } = useQuery({
    queryKey: ['coupons'],
    queryFn: cartService.getCoupons,
    staleTime: 5 * 60 * 1000,
    enabled: isDrawerOpen // Only fetch when drawer opens
  })

  const subtotal = getSubtotal()
  const freeShippingThreshold = 499
  const remainingForFreeShipping = freeShippingThreshold - subtotal

  const handleNavigate = (path: string) => {
    router.push(path)
    closeDrawer()
  }

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          <CouponSelectorModal 
            isOpen={isCouponModalOpen} 
            onClose={() => setIsCouponModalOpen(false)} 
            coupons={coupons}
          />
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-[101] flex flex-col"
          >
            {/* Header */}
            <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-white sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Daily Basket</h2>
                <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                  {getItemCount()} Items
                </div>
              </div>
              <button 
                onClick={closeDrawer}
                className="w-10 h-10 flex items-center justify-center bg-slate-50 rounded-full text-slate-400 hover:text-slate-900 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-4 py-4 md:px-6">
              <AnimatePresence mode="popLayout" initial={false}>
                {items.length > 0 ? (
                  <div className="space-y-6">
                    {items.map((item) => (
                      <CartItem key={item.id} item={item} />
                    ))}
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center p-8 text-center">
                    <div className="w-24 h-24 rounded-full bg-slate-50 flex items-center justify-center text-slate-200 mb-6">
                      <ShoppingCart size={40} />
                    </div>
                    <h3 className="text-xl font-black text-slate-900 mb-2">Basket is empty</h3>
                    <p className="text-sm text-slate-400 max-w-[200px] mb-8 font-medium leading-relaxed">
                      Looks like you haven't added any fresh produce yet.
                    </p>
                    <Button 
                      variant="primary" 
                      className="rounded-full px-8"
                      onClick={() => handleNavigate('/shop')}
                    >
                      Start Picking
                    </Button>
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-8 border-t border-slate-50 bg-white space-y-6">
                {/* Shipping Info */}
                <div className="p-5 bg-slate-50 rounded-3xl border border-slate-100">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary shadow-sm">
                      <Truck size={20} />
                    </div>
                    <div className="flex-1">
                      {subtotal >= freeShippingThreshold ? (
                        <p className="text-xs font-black text-primary uppercase tracking-widest">🎉 Free shipping applied</p>
                      ) : (
                        <p className="text-xs font-black text-slate-900 uppercase tracking-widest">
                          Add <span className="text-primary">{formatPrice(remainingForFreeShipping)}</span> for free
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(Math.min(subtotal / freeShippingThreshold, 1)) * 100}%` }}
                      className="h-full bg-primary"
                    />
                  </div>
                </div>

                <div className="flex justify-between items-end">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Basket Subtotal</span>
                    <span className="text-3xl font-black text-slate-900 leading-none">
                       {formatPrice(subtotal)}
                    </span>
                  </div>
                  <button 
                    onClick={() => setIsCouponModalOpen(true)}
                    className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-widest bg-primary/5 px-4 py-2 rounded-full hover:bg-primary/10 transition-colors"
                  >
                    <TicketPercent size={14} />
                    {coupon ? 'Discount Applied' : 'Add Coupon'}
                  </button>
                </div>

                <div className="flex flex-col gap-3">
                  <Button 
                    variant="primary" 
                    className="w-full h-14 rounded-full font-black uppercase tracking-[0.1em] text-sm shadow-2xl shadow-primary/10"
                    onClick={() => handleNavigate('/checkout')}
                  >
                    Go to Checkout 
                    <ArrowRight size={18} className="ml-2" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full h-12 rounded-full font-black uppercase tracking-[0.1em] text-[10px] text-slate-400 hover:text-slate-900"
                    onClick={() => handleNavigate('/cart')}
                  >
                    Expand Basket Info
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
