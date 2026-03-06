"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Ticket, X, Loader2 } from 'lucide-react'
import { Button, Input } from '@next360/ui'
import { useCartStore } from '@/store/cartStore'
import { Coupon } from '@next360/types'

const MOCK_COUPONS: Record<string, Coupon> = {
  'FRESH10': { id: 'c1', code: 'FRESH10', type: 'PERCENT', value: 10, minOrder: 0, maxUses: 100, usedCount: 10, expiresAt: '2026-12-31', isActive: true },
  'ORGANIC50': { id: 'c2', code: 'ORGANIC50', type: 'FLAT', value: 50, minOrder: 0, maxUses: 50, usedCount: 5, expiresAt: '2026-12-31', isActive: true },
  'NEWUSER': { id: 'c3', code: 'NEWUSER', type: 'PERCENT', value: 15, minOrder: 29900, maxUses: 1000, usedCount: 50, expiresAt: '2026-12-31', isActive: true },
}

export default function CouponInput() {
  const { coupon, applyCoupon, removeCoupon, getSubtotal, getDiscount } = useCartStore()
  const [code, setCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!code) return

    setError('')
    setIsLoading(true)

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800))

    const upperCode = code.toUpperCase()
    const foundCoupon = MOCK_COUPONS[upperCode]

    if (foundCoupon) {
      const subtotal = getSubtotal()
      if (foundCoupon.minOrder && subtotal < foundCoupon.minOrder) {
        setError(`Minimum order of ₹${foundCoupon.minOrder / 100} required`)
      } else {
        applyCoupon(foundCoupon)
        setCode('')
      }
    } else {
      setError('Invalid or expired coupon code')
    }

    setIsLoading(false)
  }

  const discount = getDiscount()

  return (
    <div className="mt-6 border-t border-slate-100 pt-6">
      <AnimatePresence mode="wait">
        {coupon ? (
          <motion.div
            key="applied"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-secondary/10 rounded-2xl p-4 flex items-center justify-between border border-secondary/20"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                <Ticket size={18} />
              </div>
              <div>
                <p className="font-bold text-sm text-secondary tracking-wide">{coupon.code} Applied</p>
                <p className="text-xs text-secondary/70 font-medium">Saving ₹{(discount / 100).toFixed(2)}</p>
              </div>
            </div>
            <button 
              onClick={removeCoupon}
              className="w-8 h-8 rounded-full hover:bg-white transition-colors flex items-center justify-center text-secondary"
            >
              <X size={16} />
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="input"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onSubmit={handleApply}
            className="space-y-3"
          >
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Ticket size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <Input
                  placeholder="Enter coupon code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="pl-10 h-11 rounded-xl border-dashed border-2 focus:border-solid uppercase font-mono tracking-widest text-sm"
                />
              </div>
              <Button 
                type="submit" 
                disabled={isLoading || !code}
                className="h-11 px-6 rounded-xl font-bold"
              >
                {isLoading ? <Loader2 size={18} className="animate-spin" /> : 'Apply'}
              </Button>
            </div>
            {error && (
              <motion.p 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-xs font-bold text-red-500 pl-1"
              >
                {error}
              </motion.p>
            )}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
