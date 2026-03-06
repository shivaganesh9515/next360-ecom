"use client"

import React, { useState } from 'react'
import { Check } from 'lucide-react'
import { DELIVERY_DAYS, SubscriptionFreq } from '@/lib/mockSubscribe'
import { useSubscriptionStore } from '@/store/subscriptionStore'

export default function BoxSchedule() {
  const { deliveryDay, frequency, setDeliveryDay, setFrequency } = useSubscriptionStore()

  const frequencies: { id: SubscriptionFreq, label: string, desc: string }[] = [
    { id: 'WEEKLY', label: 'Weekly', desc: 'Every week' },
    { id: 'BIWEEKLY', label: 'Every 2 Weeks', desc: 'Every 14 days' },
    { id: 'MONTHLY', label: 'Monthly', desc: 'Every 4 weeks' },
  ]

  return (
    <div className="bg-white rounded-[32px] border border-slate-100 p-6 md:p-8 shadow-sm">
      <h2 className="font-display text-2xl md:text-3xl font-black text-slate-800 mb-2">Delivery & Schedule</h2>
      <p className="text-slate-500 font-medium text-lg mb-8">When would you like to receive your box?</p>

      {/* Delivery Day Section */}
      <div className="mb-10">
        <h3 className="font-display font-bold text-lg text-slate-800 mb-4 pb-3 border-b border-slate-100">
          1. Select Delivery Day
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {DELIVERY_DAYS.map((day) => {
            const isSelected = deliveryDay === day.day
            return (
              <button
                key={day.day}
                onClick={() => setDeliveryDay(day.day)}
                className={`p-4 rounded-2xl border-2 text-center transition-all ${
                  isSelected 
                    ? 'border-primary bg-primary/5 shadow-md shadow-primary/10' 
                    : 'border-slate-100 bg-white hover:border-slate-300'
                }`}
              >
                <span className={`block font-bold mb-1 ${isSelected ? 'text-primary' : 'text-slate-700'}`}>
                  {day.label}
                </span>
                {isSelected && (
                  <Check size={16} className="text-primary mx-auto" strokeWidth={3} />
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Frequency Section */}
      <div>
        <h3 className="font-display font-bold text-lg text-slate-800 mb-4 pb-3 border-b border-slate-100">
          2. Select Frequency
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {frequencies.map((freq) => {
            const isSelected = frequency === freq.id
            return (
              <button
                key={freq.id}
                onClick={() => setFrequency(freq.id)}
                className={`p-5 rounded-2xl border-2 text-left transition-all relative ${
                  isSelected 
                    ? 'border-secondary bg-secondary/5 shadow-md shadow-secondary/10' 
                    : 'border-slate-100 bg-white hover:border-slate-300'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-4 right-4 text-secondary">
                    <Check size={20} strokeWidth={3} />
                  </div>
                )}
                <span className={`block font-bold text-lg mb-1 leading-tight ${isSelected ? 'text-secondary-dark' : 'text-slate-800'}`}>
                  {freq.label}
                </span>
                <span className="text-sm font-medium text-slate-500">
                  {freq.desc}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
