"use client"

import React from 'react'
import { useRouter } from 'next/navigation'
import { X, ShoppingCart, ArrowRight, Truck } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { formatPrice } from '@next360/utils'
import { Button, EmptyState, AnimatedCounter } from '@next360/ui'
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
            <div className="p-6 border-b border-border flex items-center justify-between bg-white sticky top-0">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-display font-bold text-text">Your Cart</h2>
                <div className="bg-secondary/10 text-secondary px-2.5 py-0.5 rounded-full text-xs font-bold font-sans">
                  {getItemCount()} items
                </div>
              </div>
              <button 
                onClick={closeDrawer}
                className="p-2 hover:bg-cream rounded-full transition-colors text-muted hover:text-text"
              >
                <X size={24} />
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
                      action={
                        <Button onClick={() => handleNavigate('/shop')}>
                          Start Shopping
                        </Button>
                      }
                    />
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-border bg-white">
                {/* Shipping Info */}
                <div className="mb-6 p-4 bg-cream rounded-2xl border border-border flex items-start gap-4">
                  <div className="bg-secondary/10 p-2 rounded-xl text-secondary">
                    <Truck size={20} />
                  </div>
                  <div className="flex-1">
                    {subtotal >= freeShippingThreshold ? (
                      <div>
                        <p className="text-sm font-bold text-primary font-sans">🎉 Free delivery applied</p>
                        <p className="text-xs text-muted font-sans mt-0.5">Your order qualifies for free standard shipping.</p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-sm font-semibold text-text font-sans">
                          Add <span className="text-primary font-bold">{formatPrice(remainingForFreeShipping)}</span> more for free delivery
                        </p>
                        <div className="mt-2.5 w-full h-1.5 bg-border rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${(Math.min(subtotal / freeShippingThreshold, 1)) * 100}%` }}
                            className="h-full bg-secondary"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-between items-center mb-6">
                  <span className="text-muted font-medium font-sans">Subtotal</span>
                  <span className="text-2xl font-display font-bold text-text">
                    <AnimatedCounter to={subtotal / 100} prefix="₹" decimals={2} />
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    variant="outline" 
                    className="py-6 rounded-xl font-bold font-sans"
                    onClick={() => handleNavigate('/cart')}
                  >
                    View Cart
                  </Button>
                  <Button 
                    className="py-6 rounded-xl font-bold font-sans flex gap-2 group"
                    onClick={() => handleNavigate('/checkout')}
                  >
                    Checkout 
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
                <p className="text-center text-xs text-muted mt-4 font-sans">
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
