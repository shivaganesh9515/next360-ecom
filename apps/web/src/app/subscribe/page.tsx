import React from 'react'
import BoxSelector from '@/components/subscribe/BoxSelector'
import { Check } from 'lucide-react'

export default function SubscribePage() {
  return (
    <div className="min-h-screen bg-cream/40 pt-20 pb-24">
      {/* Page Header */}
      <div className="bg-primary text-white py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-black mb-4">Your Weekly Organic Box</h1>
          <p className="text-lg text-primary-light font-medium mb-12">Fresh. Seasonal. Delivered.</p>
          
          {/* Step Indicator */}
          <div className="flex items-center justify-center max-w-lg mx-auto relative px-4 text-sm font-bold uppercase tracking-widest text-white/50">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/10 -z-10 -translate-y-1/2" />
            
            <div className="flex-1 text-center bg-primary px-2 text-white">
              <span className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center mx-auto mb-2 bg-primary">
                1
              </span>
              Choose Box
            </div>
            
            <div className="flex-1 text-center bg-primary px-2">
              <span className="w-8 h-8 rounded-full border-2 border-white/30 flex items-center justify-center mx-auto mb-2 bg-primary">
                2
              </span>
              Customize
            </div>
            
            <div className="flex-1 text-center bg-primary px-2">
              <span className="w-8 h-8 rounded-full border-2 border-white/30 flex items-center justify-center mx-auto mb-2 bg-primary">
                3
              </span>
              Schedule
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-12 relative z-10">
          <h2 className="font-display text-3xl font-black text-text mb-2">Choose Your Box</h2>
          <p className="text-muted font-medium">Start with a curated box or build your own from scratch.</p>
        </div>

        <BoxSelector />
      </div>
    </div>
  )
}
