"use client"

import React, { useState } from 'react'
import { Modal, Button } from '@next360/ui'
import { useCartStore } from '@/store/cartStore'
import { Coupon } from '@next360/types'
import { Ticket, X, Check, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { formatPrice } from '@next360/utils'

interface CouponSelectorModalProps {
  isOpen: boolean
  onClose: () => void
  coupons: Coupon[]
}

export default function CouponSelectorModal({ isOpen, onClose, coupons }: CouponSelectorModalProps) {
  const { applyCoupon, removeCoupon, coupon: appliedCoupon, getSubtotal } = useCartStore()
  const [inputCode, setInputCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const subtotal = getSubtotal()

  const handleApply = async (code: string) => {
    setIsLoading(true)
    try {
      await applyCoupon(code)
      toast.success('Coupon applied successfully!')
      onClose()
    } catch (error: any) {
      toast.error(error.message || 'Failed to apply coupon')
    } finally {
      setIsLoading(false)
    }
  }

  const handleRemove = async () => {
    setIsLoading(true)
    try {
      await removeCoupon()
      toast.success('Coupon removed')
      onClose()
    } catch (error) {
      toast.error('Failed to remove coupon')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Apply Coupon">
      <div className="p-4 space-y-4">
        {/* Input Section */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter coupon code"
            className="flex-1 px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 font-bold uppercase"
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value.toUpperCase())}
          />
          <Button 
            disabled={!inputCode || isLoading}
            onClick={() => handleApply(inputCode)}
            className="font-bold"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : 'APPLY'}
          </Button>
        </div>

        {/* Applied Coupon */}
        {appliedCoupon && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex justify-between items-center">
            <div>
              <p className="font-black text-green-700 text-lg flex items-center gap-2">
                <Check size={20} /> {appliedCoupon.code}
              </p>
              <p className="text-green-600 text-sm font-medium">
                Applied successfully!
              </p>
            </div>
            <button 
              onClick={handleRemove}
              className="text-green-700 hover:text-green-900 font-bold text-sm"
            >
              REMOVE
            </button>
          </div>
        )}

        {/* Available Coupons List */}
        <div className="space-y-3 mt-4">
          <h3 className="font-bold text-muted text-sm uppercase tracking-wider">Available Offers</h3>
          
          {coupons.length === 0 ? (
            <div className="text-center py-8 text-muted">
              <Ticket size={48} className="mx-auto mb-2 opacity-20" />
              <p>No coupons available at the moment</p>
            </div>
          ) : (
            coupons.map((coupon) => {
              const isApplicable = subtotal >= (coupon.minOrder || 0)
              const saveAmount = coupon.discountType === 'PERCENTAGE' 
                ? (subtotal * coupon.amount) / 100 
                : coupon.amount

              return (
                <div 
                  key={coupon.id}
                  className={`border rounded-xl p-4 transition-all ${
                    isApplicable 
                      ? 'border-border hover:border-primary/50 bg-white' 
                      : 'border-border/50 bg-gray-50 opacity-60'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-lg text-sm font-black border border-yellow-200 border-dashed">
                      {coupon.code}
                    </div>
                    {isApplicable && (
                      <button
                        onClick={() => handleApply(coupon.code)}
                        className="text-primary font-bold text-sm hover:underline"
                        disabled={isLoading}
                      >
                        APPLY
                      </button>
                    )}
                  </div>

                  <p className="font-bold text-text mb-1">
                    {coupon.discountType === 'PERCENTAGE' 
                      ? `Get ${coupon.amount}% OFF` 
                      : `Save ${formatPrice(coupon.amount)}`}
                  </p>
                  
                  <p className="text-xs text-muted mb-2">
                    {coupon.minOrder > 0 
                      ? `Orders above ${formatPrice(coupon.minOrder)}` 
                      : 'No minimum order'}
                  </p>

                  {!isApplicable && (
                    <p className="text-xs text-red-500 font-medium">
                      Add items worth {formatPrice((coupon.minOrder || 0) - subtotal)} more
                    </p>
                  )}
                  
                  {isApplicable && (
                    <p className="text-xs text-green-600 font-bold">
                      You save approx {formatPrice(saveAmount)}
                    </p>
                  )}
                </div>
              )
            })
          )}
        </div>
      </div>
    </Modal>
  )
}
