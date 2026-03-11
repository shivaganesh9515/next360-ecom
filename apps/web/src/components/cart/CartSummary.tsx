"use client"

import React from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ShoppingBag, ArrowRight, ShieldCheck, CreditCard, Wallet } from 'lucide-react'
import { Button } from '@next360/ui'
import { useCartStore } from '@/store/cartStore'
import { formatPrice } from '@next360/utils'
import CouponInput from './CouponInput'

interface CartSummaryProps {
  showCheckoutButton?: boolean
  showCoupon?: boolean
}

export default function CartSummary({ 
  showCheckoutButton = true, 
  showCoupon = true 
}: CartSummaryProps) {
  const router = useRouter()
  const { getSubtotal, getDiscount, getDeliveryFee, getTotal, getItemCount, coupon } = useCartStore()

  const subtotal = getSubtotal()
  const discount = getDiscount()
  const deliveryFee = getDeliveryFee()
  const total = getTotal()
  const itemCount = getItemCount()

  const isFreeDelivery = deliveryFee === 0
  const savings = discount + (isFreeDelivery ? 4900 : 0) // Assuming base fee is ₹49 for mock purposes

  if (itemCount === 0) return null

  return (
    <div className="sticky top-28 space-y-6">
      <div className="bg-white rounded-[3rem] border border-slate-100 p-10 shadow-2xl shadow-slate-200/50 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-700" />
        
        <h2 className="text-2xl font-black text-slate-900 mb-10 flex items-center gap-3 tracking-tight relative z-10">
          Order Summary
          <span className="text-[10px] bg-slate-900 text-white px-3 py-1 rounded-full uppercase tracking-widest font-black">
            {itemCount} Units
          </span>
        </h2>

        <div className="space-y-6 relative z-10">
          <div className="flex justify-between items-center text-sm font-bold text-slate-400 uppercase tracking-widest">
            <span>Basket Subtotal</span>
            <span className="text-slate-900">{formatPrice(subtotal)}</span>
          </div>

          <div className="flex justify-between items-center text-sm font-bold uppercase tracking-widest">
            <span className="text-slate-400">Logistics</span>
            {isFreeDelivery ? (
              <span className="text-primary font-black">0.00 FREE</span>
            ) : (
              <span className="text-slate-900">{formatPrice(deliveryFee)}</span>
            )}
          </div>

          {discount > 0 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex justify-between items-center text-sm font-bold text-primary uppercase tracking-widest italic"
            >
              <span>Protocol Applied</span>
              <span>-{formatPrice(discount)}</span>
            </motion.div>
          )}

          <div className="pt-8 border-t border-slate-50 mt-4 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">Total Settlement</span>
              <span className="text-4xl font-black text-slate-900 tracking-tighter leading-none italic">{formatPrice(total)}</span>
            </div>
            <p className="text-[9px] text-slate-300 font-bold uppercase tracking-[0.1em] text-right">
               Net Value • Taxes Included • 256-bit Secure
            </p>
          </div>
        </div>

        {showCoupon && <div className="mt-10"><CouponInput /></div>}

        {showCheckoutButton && (
          <Button 
            onClick={() => router.push('/checkout')}
            className="w-full h-18 py-8 rounded-full font-black text-lg uppercase mt-10 shadow-2xl shadow-primary/20 group relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
               Initialize Checkout
               <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" strokeWidth={3} />
            </span>
          </Button>
        )}

        <div className="mt-10 flex flex-col gap-5 relative z-10">
          <div className="flex items-center justify-center gap-8 opacity-20 hover:opacity-40 transition-opacity">
             <CreditCard size={20} strokeWidth={3} />
             <Wallet size={20} strokeWidth={3} />
             <ShoppingBag size={20} strokeWidth={3} />
          </div>
          <div className="flex items-center justify-center gap-2 text-[9px] font-black text-slate-300 uppercase tracking-[0.25em]">
            <ShieldCheck size={14} className="text-primary" />
            Verified Encrypted Node
          </div>
        </div>
      </div>

      {savings > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-primary/5 rounded-[2rem] p-6 border border-primary/10 flex items-center gap-5 shadow-sm"
        >
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm text-primary">
             <span className="text-xl">✨</span>
          </div>
          <div className="space-y-0.5">
            <p className="text-primary font-black text-[10px] uppercase tracking-widest">Optimized Value</p>
            <p className="text-primary/70 text-sm font-bold">
              You saved <span className="text-primary font-black">{formatPrice(savings)}</span> today
            </p>
          </div>
        </motion.div>
      )}
    </div>
  )
}
