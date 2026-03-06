"use client"

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import BoxCustomizer from '@/components/subscribe/BoxCustomizer'
import { useSubscriptionStore } from '@/store/subscriptionStore'
import { BOX_OPTIONS } from '@/lib/mockSubscribe'

export default function CustomizePage() {
  const router = useRouter()
  const { selectedBoxId, customProducts } = useSubscriptionStore()

  useEffect(() => {
    // Redirect back to start if no box selected
    if (!selectedBoxId) {
      router.push('/subscribe')
    }
  }, [selectedBoxId, router])

  if (!selectedBoxId) return null

  const boxDetails = BOX_OPTIONS.find(b => b.id === selectedBoxId)
  const isReady = customProducts.length >= 4

  return (
    <div className="min-h-[100dvh] bg-gray-50 pt-20 flex flex-col">
      {/* Page Header Mini */}
      <div className="bg-primary text-white py-6 md:py-8 shrink-0">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="font-display text-2xl md:text-3xl font-black mb-1">Customize Your {boxDetails?.name}</h1>
              <p className="text-sm text-primary-light font-medium">Select your preferred items for this week.</p>
            </div>
            
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary-light bg-black/10 px-4 py-2 rounded-full w-max">
              <span className="text-white">Step 2 of 3</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 max-w-6xl w-full mx-auto p-4 md:py-8 flex flex-col md:flex-row gap-6 md:gap-8 overflow-hidden">
        
        {/* LEFT: Customizer */}
        <div className="flex-1 md:h-[calc(100vh-280px)] min-h-[500px]">
          <BoxCustomizer />
        </div>

        {/* RIGHT: Summary & Navigation */}
        <div className="w-full md:w-80 shrink-0 flex flex-col gap-6">
          <div className="bg-white rounded-[24px] border border-slate-100 p-6 shadow-sm sticky top-24">
            <h3 className="font-display text-xl font-black text-slate-800 mb-4 pb-4 border-b border-slate-100">
              Box Summary
            </h3>
            
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary text-2xl">
                {boxDetails?.emoji}
              </div>
              <div>
                <p className="font-bold text-slate-800 leading-tight">{boxDetails?.name}</p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">Base Plan</p>
              </div>
            </div>

            <div className="space-y-3 mb-8">
              <div className="flex justify-between text-sm font-medium">
                <span className="text-slate-500">Items Selected</span>
                <span className="text-slate-800 font-bold">{customProducts.length} / 8</span>
              </div>
              <div className="flex justify-between text-sm font-medium">
                <span className="text-slate-500">Subtotal (Est.)</span>
                <span className="text-slate-800 font-bold">
                  {boxDetails?.price ? `₹${boxDetails.price}` : 'Calculated next'}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => router.push('/subscribe/schedule')}
                disabled={!isReady}
                className={`w-full py-4 rounded-xl font-bold transition-all shadow-md ${
                  isReady 
                    ? 'bg-primary text-white shadow-primary/20 hover:-translate-y-1' 
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed hidden shadow-none'
                }`}
              >
                Continue to Schedule →
              </button>
              
              {!isReady && (
                <div className="w-full py-4 rounded-xl font-bold bg-amber-50 text-amber-600 text-center text-sm border border-amber-100">
                  Select at least {4 - customProducts.length} more {4 - customProducts.length === 1 ? 'item' : 'items'}
                </div>
              )}
              
              <Link 
                href="/subscribe"
                className="block w-full text-center py-3 text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-widest"
              >
                ← Back to Boxes
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
