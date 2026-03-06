"use client"

import React from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Trash2, ArrowLeft, Heart, Truck } from 'lucide-react'
import { Button, Badge } from '@next360/ui'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import { formatPrice } from '@next360/utils'
import CartSummary from '@/components/cart/CartSummary'
import CartItem from '@/components/cart/CartItem' // Assuming this exists or using standard cart item

export default function CartPage() {
  const { items, removeItem, clearCart, getSubtotal, getItemCount } = useCartStore()
  const { toggleWishlist } = useWishlistStore()

  const subtotal = getSubtotal()
  const itemCount = getItemCount()
  const deliveryThreshold = 49900 // ₹499
  const remainingForFree = Math.max(0, deliveryThreshold - subtotal)
  const isFreeDelivery = subtotal >= deliveryThreshold
  const progressPercent = Math.min(100, (subtotal / deliveryThreshold) * 100)

  const handleMoveToWishlist = (item: any) => {
    toggleWishlist(item.product)
    removeItem(item.id)
  }

  if (itemCount === 0) {
    return (
      <main className="min-h-[80vh] flex flex-col items-center justify-center p-4 bg-gray-50 pt-32">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-32 h-32 bg-primary/5 rounded-[3rem] flex items-center justify-center text-primary mx-auto mb-8 border border-primary/10">
            <ShoppingCart size={48} strokeWidth={1} />
          </div>
          <h1 className="font-display text-4xl font-black text-primary mb-4">Your cart is empty</h1>
          <p className="text-slate-500 font-body text-lg mb-10 leading-relaxed">
            Your cart is waiting to be filled with fresh, nutrient-dense organic goodness. 
          </p>
          <Link href="/shop">
            <Button size="lg" className="rounded-2xl px-12 h-14 font-black shadow-xl shadow-primary/20">
              Start Shopping
            </Button>
          </Link>
        </motion.div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 pt-20 pb-24">
      {/* Header */}
      <div className="bg-cream/40 border-b border-white/20 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-4">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <span className="text-primary">Cart</span>
          </div>
          <div className="flex items-end gap-4">
             <h1 className="font-display text-5xl md:text-6xl font-black text-primary tracking-tighter">Your Cart</h1>
             <Badge variant="organic" className="mb-2 bg-primary/10 text-primary border-none px-3 font-black h-8 flex items-center">{itemCount} items</Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Left: Item List */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
               <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                  <div>
                    <h2 className="font-display text-2xl font-bold text-slate-800">Order Items</h2>
                    <p className="text-sm text-slate-400 font-medium mt-1">Check your selection before proceeding</p>
                  </div>
                  <button 
                    onClick={() => { if(confirm('Are you sure you want to clear your cart?')) clearCart() }}
                    className="flex items-center gap-2 text-xs font-bold text-red-400 hover:text-red-500 transition-colors uppercase tracking-widest px-4 py-2 hover:bg-red-50 rounded-xl"
                  >
                    <Trash2 size={14} />
                    Clear Cart
                  </button>
               </div>

               <div className="divide-y divide-slate-50">
                 {items.map((item) => (
                   <div key={item.id} className="p-8 group">
                      <CartItem item={item} />
                      <div className="mt-6 flex items-center gap-6 pl-24 md:pl-32">
                         <button 
                            onClick={() => handleMoveToWishlist(item)}
                            className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-secondary transition-colors"
                         >
                            <Heart size={14} />
                            Move to Wishlist
                         </button>
                      </div>
                   </div>
                 ))}
               </div>

               {/* Promo Strip */}
               <div className="bg-secondary/5 border-t border-slate-100 p-8">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                     <div className="flex items-center gap-3">
                        <div className={isFreeDelivery ? "text-secondary" : "text-slate-400"}>
                           <Truck size={24} />
                        </div>
                        <p className="text-sm font-bold text-slate-700">
                          {isFreeDelivery ? (
                            <span className="text-secondary">🎉 You've unlocked <span className="font-black">FREE delivery</span>!</span>
                          ) : (
                            <span>Add <span className="font-black text-secondary">{formatPrice(remainingForFree)}</span> more for FREE delivery</span>
                          )}
                        </p>
                     </div>
                     {!isFreeDelivery && (
                       <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                         Threshold: {formatPrice(deliveryThreshold)}
                       </p>
                     )}
                  </div>
                  <div className="h-2 w-full bg-white rounded-full overflow-hidden border border-slate-100 p-0.5">
                     <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercent}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full bg-secondary rounded-full"
                     />
                  </div>
               </div>
            </div>

            <Link 
              href="/shop" 
              className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:gap-3 transition-all"
            >
              <ArrowLeft size={18} />
              Continue Shopping
            </Link>
          </div>

          {/* Right: Summary */}
          <div className="lg:col-span-1">
             <CartSummary />
          </div>
        </div>
      </div>
    </main>
  )
}
