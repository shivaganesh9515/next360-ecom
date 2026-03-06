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
    <div className="sticky top-24 space-y-4">
      <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm">
        <h2 className="font-display text-2xl font-bold text-primary mb-6 flex items-center gap-2">
          Order Summary
          <span className="w-6 h-6 rounded-full bg-primary/5 text-primary text-[10px] flex items-center justify-center border border-primary/10">
            {itemCount}
          </span>
        </h2>

        <div className="space-y-4">
          <div className="flex justify-between items-center text-sm font-medium">
            <span className="text-slate-500">Subtotal ({itemCount} items)</span>
            <span className="text-slate-800">{formatPrice(subtotal)}</span>
          </div>

          <div className="flex justify-between items-center text-sm font-medium">
            <span className="text-slate-500">Delivery</span>
            {isFreeDelivery ? (
              <span className="text-secondary font-bold">FREE</span>
            ) : (
              <span className="text-slate-800">{formatPrice(deliveryFee)}</span>
            )}
          </div>

          {discount > 0 && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="flex justify-between items-center text-sm font-medium text-secondary"
            >
              <span>Discount {coupon?.code && `(${coupon.code})`}</span>
              <span>-{formatPrice(discount)}</span>
            </motion.div>
          )}

          <div className="border-t border-slate-50 pt-4 mt-2">
            <div className="flex justify-between items-end mb-1">
              <span className="font-display text-xl font-bold text-primary">Total</span>
              <span className="font-display text-2xl font-black text-primary">{formatPrice(total)}</span>
            </div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest text-right">
              Inclusive of all taxes
            </p>
          </div>
        </div>

        {showCoupon && <CouponInput />}

        {showCheckoutButton && (
          <Button 
            onClick={() => router.push('/checkout')}
            className="w-full h-14 rounded-[1.25rem] font-black text-lg mt-8 shadow-xl shadow-primary/20 group"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        )}

        <div className="mt-8 flex flex-col gap-4">
          <div className="flex items-center justify-center gap-6 opacity-30 grayscale contrast-125">
             <CreditCard size={24} />
             <Wallet size={24} />
             <ShoppingBag size={24} />
          </div>
          <div className="flex items-center justify-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
            <ShieldCheck size={14} className="text-secondary" />
            Secure & Encrypted Checkout
          </div>
        </div>
      </div>

      {savings > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-secondary/5 rounded-3xl p-4 border border-secondary/10 flex flex-col items-center gap-1"
        >
          <p className="text-secondary font-bold text-sm">🎉 Great choice!</p>
          <p className="text-secondary/70 text-xs font-medium">
            You are saving <span className="font-black">{formatPrice(savings)}</span> on this order
          </p>
        </motion.div>
      )}
    </div>
  )
}
