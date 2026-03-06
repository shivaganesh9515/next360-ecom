"use client"

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { MapPin, Phone, CreditCard, CheckCircle2 } from 'lucide-react'
import { subscriptionService } from '@/services/subscriptionService'
import BoxSchedule from '@/components/subscribe/BoxSchedule'
import { useSubscriptionStore } from '@/store/subscriptionStore'
import { BOX_OPTIONS } from '@/lib/mockSubscribe'
import { formatPrice } from '@next360/utils'
import { toast } from 'sonner'

const BOX_OPTIONS: any[] = []
const MOCK_ADDRESSES: any[] = []

export default function SchedulePage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { selectedBoxId, customProducts, deliveryDay, frequency, reset } = useSubscriptionStore()

  useEffect(() => {
    // Redirect back if missing prev steps
    if (!selectedBoxId || (selectedBoxId === 'custom' && customProducts.length < 4)) {
      router.push('/subscribe')
    }
  }, [selectedBoxId, customProducts, router])

  if (!selectedBoxId) return null

  const boxDetails = BOX_OPTIONS.find(b => b.id === selectedBoxId)
  const isReady = deliveryDay !== null && frequency !== null

  const basePrice = boxDetails?.price || 599
  const subtotal = customProducts.reduce((acc, curr) => acc + curr.price, 0)
  const displayPrice = boxDetails?.id === 'custom' ? Math.max(subtotal, basePrice) : basePrice

  const handleSubscribe = async () => {
    if (!isReady || !selectedBoxId) return
    setIsSubmitting(true)

    try {
      await subscriptionService.createSubscription({
        boxId: selectedBoxId,
        customProducts: selectedBoxId === 'custom' ? customProducts.map(p => p.id) : undefined,
        deliveryDay: deliveryDay as number,
        frequency: frequency as string,
      })
      
      reset() // Clear store
      toast.success('Subscription activated successfully! 🌿')
      router.push('/account/subscriptions')
    } catch (err) {
      toast.error('Failed to activate subscription. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const defaultAddress = MOCK_ADDRESSES.find(a => a.isDefault) || MOCK_ADDRESSES[0]

  return (
    <div className="min-h-[100dvh] bg-gray-50 pt-20 flex flex-col">
      {/* Page Header Mini */}
      <div className="bg-primary text-white py-6 md:py-8 shrink-0">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="font-display text-2xl md:text-3xl font-black mb-1">Schedule & Checkout</h1>
              <p className="text-sm text-primary-light font-medium">Finalize your delivery preferences.</p>
            </div>
            
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary-light bg-black/10 px-4 py-2 rounded-full w-max">
              <span className="text-white">Step 3 of 3</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 max-w-6xl w-full mx-auto p-4 md:py-8 flex flex-col lg:flex-row gap-6 lg:gap-8">
        
        {/* LEFT: Schedule Form + Address */}
        <div className="flex-1 space-y-6 lg:space-y-8">
          <BoxSchedule />

          {/* Quick Info Review */}
          <div className="bg-white rounded-[32px] border border-slate-100 p-6 md:p-8 shadow-sm">
             <h3 className="font-display font-bold text-xl text-slate-800 mb-6 pb-4 border-b border-slate-100">
               Confirm Details
             </h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-slate-800 flex items-center gap-2">
                       <MapPin size={18} className="text-primary"/> Delivery Address
                    </h4>
                    <Link href="/account/addresses" className="text-xs font-bold text-primary uppercase tracking-widest hover:underline">Edit</Link>
                  </div>
                  <p className="text-sm font-medium text-slate-600 leading-relaxed mb-2">
                    {defaultAddress?.name}<br/>
                    {defaultAddress?.street}<br/>
                    {defaultAddress?.city}, {defaultAddress?.state} {defaultAddress?.pincode}
                  </p>
                  <p className="text-sm font-bold text-slate-500 flex items-center gap-2">
                    <Phone size={14} /> {defaultAddress?.phone}
                  </p>
                </div>

                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-slate-800 flex items-center gap-2">
                       <CreditCard size={18} className="text-primary"/> Payment Method
                    </h4>
                  </div>
                  <p className="text-sm font-medium text-slate-600 leading-relaxed">
                    Razorpay Secure Setup.<br/>
                    Your card will be charged automatically before each delivery.
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-xs font-bold text-green-600 bg-green-50 px-3 py-1.5 rounded-lg w-max">
                     <CheckCircle2 size={14} /> Free delivery applied
                  </div>
                </div>
             </div>
          </div>
        </div>

        {/* RIGHT: Order Total Summary */}
        <div className="w-full lg:w-96 shrink-0 flex flex-col gap-6">
          <div className="bg-white rounded-[24px] border border-slate-100 p-6 shadow-sm sticky top-24">
            <h3 className="font-display text-xl font-black text-slate-800 mb-4 pb-4 border-b border-slate-100">
              Subscription Total
            </h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-sm font-medium">
                <span className="text-slate-600">{boxDetails?.name}</span>
                <span className="text-slate-800 font-bold">{formatPrice(displayPrice)}</span>
              </div>
              <div className="flex justify-between text-sm font-medium">
                <span className="text-slate-600">Items Count</span>
                <span className="text-slate-800 font-bold">{customProducts.length} added</span>
              </div>
              <div className="flex justify-between text-sm font-medium text-green-600">
                <span>Delivery Fee</span>
                <span className="font-bold">Free</span>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-4 mb-8">
              <div className="flex justify-between items-end mb-1">
                <span className="font-bold text-slate-800">Total per box</span>
                <span className="font-display text-3xl font-black text-primary">{formatPrice(displayPrice)}</span>
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">
                Billed {frequency?.toLowerCase() || '...' }
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleSubscribe}
                disabled={!isReady || isSubmitting}
                className={`w-full py-4 rounded-xl font-bold transition-all shadow-md relative flex items-center justify-center ${
                  isReady 
                    ? 'bg-secondary text-white shadow-secondary/20 hover:-translate-y-1' 
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed hidden shadow-none'
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                     <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"/>
                     Processing Setup...
                  </span>
                ) : 'Activate Subscription →'}
              </button>
              
              {!isReady && (
                <div className="w-full py-3 rounded-xl font-bold bg-amber-50 text-amber-600 text-center text-sm border border-amber-100">
                  Select delivery day & frequency
                </div>
              )}
              
              <Link 
                href="/subscribe/customize"
                className="block w-full text-center py-3 text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-widest"
              >
                ← Edit Box Contents
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
