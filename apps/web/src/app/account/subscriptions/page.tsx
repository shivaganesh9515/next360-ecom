"use client"

import React from 'react'
import { Button } from '@next360/ui'
import { MOCK_SUBSCRIPTIONS } from '@/lib/mockAccount'
import SubscriptionCard from '@/components/account/SubscriptionCard'
import { Plus } from 'lucide-react'
import Link from 'next/link'

export default function SubscriptionsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <h1 className="font-display text-2xl font-black text-slate-800">My Subscriptions</h1>
        <Link href="/subscribe">
          <Button variant="primary" className="font-bold">
            <Plus size={18} className="mr-2" />
            Add New Box
          </Button>
        </Link>
      </div>

      {/* Subscriptions List */}
      <div className="space-y-4">
        {MOCK_SUBSCRIPTIONS.length > 0 ? (
          MOCK_SUBSCRIPTIONS.map(sub => (
            <SubscriptionCard 
              key={sub.id} 
              subscription={sub} 
              onUpdate={(id, action) => console.log('Update', id, action)} 
            />
          ))
        ) : (
          <div className="p-12 text-center bg-white rounded-2xl border border-slate-100 flex flex-col items-center">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
              <span className="text-3xl">🥦</span>
            </div>
            <h3 className="font-display text-xl font-bold text-slate-800 mb-2">No active subscriptions</h3>
            <p className="text-slate-500 font-medium mb-6">Get fresh organic food delivered on your schedule.</p>
            <Link href="/subscribe">
              <Button variant="primary" className="font-bold">Start a Weekly Box</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
