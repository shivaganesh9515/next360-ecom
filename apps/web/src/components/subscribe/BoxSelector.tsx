"use client"

import React from 'react'
import { Check } from 'lucide-react'
import { useSubscriptionStore } from '@/store/subscriptionStore'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { subscriptionService } from '@/services/subscriptionService'
import { formatPrice } from '@next360/utils'

export default function BoxSelector() {
  const router = useRouter()
  const { selectedBoxId, setBox } = useSubscriptionStore()

  const { data: boxes = [], isLoading } = useQuery({
    queryKey: ['subscription-boxes'],
    queryFn: () => subscriptionService.getBoxes(),
  })

  const handleContinue = () => {
    if (selectedBoxId) {
      router.push('/subscribe/customize')
    }
  }

  return (
    <div>
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin mb-4"></div>
          <p className="font-bold text-slate-400 uppercase tracking-widest text-sm">Loading options...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {boxes.map((box) => {
          const isSelected = selectedBoxId === box.id
          
          return (
            <div 
              key={box.id}
              onClick={() => setBox(box.id)}
              className={`relative bg-white rounded-[24px] border-2 p-6 md:p-8 cursor-pointer transition-all duration-300 ${
                isSelected 
                  ? 'border-primary shadow-xl shadow-primary/10 scale-[1.02]' 
                  : 'border-slate-100 hover:border-slate-300 hover:shadow-lg'
              }`}
            >
              {box.popular && (
                <div className="absolute top-0 right-6 bg-secondary text-white text-xs px-3 py-1 font-bold uppercase tracking-widest rounded-b-lg flex items-center gap-1 shadow-sm">
                  ★ Most Popular
                </div>
              )}
              
              <div className="text-5xl mb-4">{box.emoji}</div>
              
              <h3 className="font-display text-2xl font-black text-slate-800 leading-tight">{box.name}</h3>
              <p className="text-sm font-medium text-slate-500 mt-2 h-10">{box.description}</p>
              
              <div className="mt-6 mb-6">
                {box.price !== null ? (
                  <div className="flex items-end gap-1">
                    <span className="font-display text-3xl font-black text-primary">{formatPrice(box.price)}</span>
                    <span className="text-slate-400 font-bold mb-1">/week</span>
                  </div>
                ) : (
                  <div className="flex items-end gap-1">
                    <span className="font-display text-xl sm:text-2xl font-black text-slate-800">From ₹599</span>
                    <span className="text-slate-400 font-bold mb-1">/week</span>
                  </div>
                )}
              </div>
              
              <ul className="space-y-3 mb-8">
                {box.includes.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm font-medium text-slate-600 leading-snug">
                    <Check size={16} className="text-secondary shrink-0 mt-0.5" strokeWidth={3} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              
              <button
                className={`w-full py-4 rounded-xl font-bold transition-colors ${
                  isSelected 
                    ? 'bg-primary text-white shadow-md shadow-primary/20' 
                    : 'bg-slate-50 text-primary hover:bg-primary/10'
                }`}
              >
                {isSelected ? (
                  <span className="flex items-center justify-center gap-2">
                    <Check size={18} strokeWidth={3} /> Selected
                  </span>
                ) : 'Select This Box'}
              </button>
            </div>
          )
          })}
        </div>
      )}

      <div className="mt-12 text-center md:text-right">
        <button
          onClick={handleContinue}
          disabled={!selectedBoxId}
          className={`h-14 px-10 rounded-2xl font-bold text-lg transition-all ${
            selectedBoxId 
              ? 'bg-primary text-white shadow-xl shadow-primary/20 hover:-translate-y-1' 
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          Continue →
        </button>
      </div>
    </div>
  )
}
