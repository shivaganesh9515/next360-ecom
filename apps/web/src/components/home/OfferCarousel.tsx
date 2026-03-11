"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { TicketPercent, CreditCard, ChevronRight } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { cartService } from '@/services/cartService'
import { formatPrice } from '@next360/utils'

export default function OfferCarousel() {
  const { data: coupons = [] } = useQuery({
    queryKey: ['coupons'],
    queryFn: cartService.getCoupons,
    staleTime: 5 * 60 * 1000,
  })

  if (coupons.length === 0) return null

  return (
    <div className="py-8 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-4 px-2">
          <h2 className="font-display text-xl font-black text-text flex items-center gap-2">
            <TicketPercent className="text-secondary" size={24} />
            Offers For You
          </h2>
          <button className="text-primary font-bold text-sm flex items-center gap-1 group">
            See All <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
          {coupons.map((coupon) => (
            <motion.div
              key={coupon.id}
              whileHover={{ y: -4 }}
              className="flex-shrink-0 w-[280px] bg-white border border-border rounded-2xl p-4 shadow-sm hover:shadow-md transition-all flex gap-4 items-center relative overflow-hidden"
            >
              {/* Decorative Circle */}
              <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-primary/5 rounded-full" />
              
              <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary shrink-0">
                <CreditCard size={24} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-black uppercase tracking-[0.15em] text-muted">Limited Offer</span>
                </div>
                <p className="font-bold text-text truncate">
                  {coupon.discountType === 'PERCENTAGE' 
                    ? `${coupon.amount}% Off up to ₹${coupon.amount * 5}` // Mock cap logic
                    : `Flat ${formatPrice(coupon.amount)} Off`}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="bg-yellow-50 text-yellow-700 text-[10px] font-black px-2 py-0.5 rounded border border-yellow-200 border-dashed">
                    {coupon.code}
                  </span>
                  <p className="text-[10px] font-bold text-muted truncate">
                    {coupon.minOrder > 0 ? `Above ${formatPrice(coupon.minOrder)}` : 'No min order'}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
          
          {/* Mock Bank Offers for Zomato Feel */}
          <motion.div
            whileHover={{ y: -4 }}
            className="flex-shrink-0 w-[280px] bg-white border border-border rounded-2xl p-4 shadow-sm hover:shadow-md transition-all flex gap-4 items-center relative overflow-hidden"
          >
            <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-blue-50 rounded-full" />
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 shrink-0">
              <CreditCard size={24} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-black uppercase tracking-[0.15em] text-muted">Bank Offer</p>
              <p className="font-bold text-text truncate">10% Instant Discount</p>
              <p className="text-[10px] font-bold text-muted truncate">On ICICI Bank Cards</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
