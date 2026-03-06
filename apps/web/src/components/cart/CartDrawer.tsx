"use client"

import React from 'react'
import { useRouter } from 'next/navigation'
import { X, ShoppingCart, ArrowRight, Truck } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { formatPrice } from '@next360/utils'
import { Button, EmptyState } from '@next360/ui'
import { useCartStore } from '@/store/cartStore'
import CartItem from './CartItem'

export default function CartDrawer() {
  const router = useRouter()
  const { 
    items, 
    isDrawerOpen, 
    closeDrawer, 
    getSubtotal, 
    getItemCount 
  } = useCartStore()

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
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
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
            <div className="p-6 border-b flex items-center justify-between bg-white sticky top-0">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-display font-bold text-slate-800">Your Cart</h2>
                <div className="bg-primary/10 text-primary px-2.5 py-0.5 rounded-full text-xs font-bold">
                  {getItemCount()} items
                </div>
              </div>
              <button 
                onClick={closeDrawer}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X size={24} className="text-slate-500" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-2">
              <AnimatePresence mode="popLayout" initial={false}>
                {items.length > 0 ? (
                  items.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))
                ) : (
                  <div className="h-full flex items-center justify-center p-8">
                    <EmptyState 
                      icon={<ShoppingCart size={48} />}
                      title="Your cart is empty"
                      description="Looks like you haven't added any premium organic products yet."
                      action={{ 
                        label: "Start Shopping", 
                        onClick: () => handleNavigate('/shop') 
                      }}
                    />
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t bg-slate-50">
                {/* Shipping Info */}
                <div className="mb-6 p-4 bg-white rounded-2xl border border-slate-100 flex items-start gap-4">
                  <div className="bg-primary/10 p-2 rounded-xl text-primary">
                    <Truck size={20} />
                  </div>
                  <div className="flex-1">
                    {subtotal >= freeShippingThreshold ? (
                      <div>
                        <p className="text-sm font-bold text-primary">🎉 Free delivery applied</p>
                        <p className="text-xs text-slate-500">Your order qualifies for free standard shipping.</p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-sm font-semibold text-slate-800">
                          Add <span className="text-primary font-bold">{formatPrice(remainingForFreeShipping)}</span> more for free delivery
                        </p>
                        <div className="mt-2 w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${(subtotal / freeShippingThreshold) * 100}%` }}
                            className="h-full bg-primary"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-between items-center mb-6">
                  <span className="text-slate-500 font-medium font-body">Subtotal</span>
                  <span className="text-2xl font-display font-bold text-slate-800">{formatPrice(subtotal)}</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    variant="outline" 
                    className="py-6 rounded-xl font-bold"
                    onClick={() => handleNavigate('/cart')}
                  >
                    View Cart
                  </Button>
                  <Button 
                    className="py-6 rounded-xl font-bold flex gap-2 group"
                    onClick={() => handleNavigate('/checkout')}
                  >
                    Checkout 
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
                <p className="text-center text-xs text-slate-400 mt-4">
                  Taxes and shipping calculated at checkout
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
