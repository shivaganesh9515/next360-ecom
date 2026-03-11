"use client"

import React from 'react'
import { Button } from '@next360/ui'
import { MOCK_SUBSCRIPTIONS } from '@/lib/mockAccount'
import SubscriptionCard from '@/components/account/SubscriptionCard'
import { Plus } from 'lucide-react'
import Link from 'next/link'

export default function SubscriptionsPage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-8">
        <div>
           <div className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-4 flex items-center gap-3 italic">
              <span className="w-8 h-[2.5px] bg-primary" /> Active Logistics
           </div>
           <h1 className="text-4xl font-black text-slate-900 tracking-tighter italic leading-none">
             Fleet Subscriptions
           </h1>
        </div>
        <Link href="/subscribe">
          <Button className="rounded-full px-10 h-16 font-black uppercase tracking-[0.2em] text-xs shadow-2xl shadow-primary/20">
            <Plus size={16} strokeWidth={3} className="mr-3" />
            Initialize New Node
          </Button>
        </Link>
      </div>

      {/* Subscriptions List */}
      <div className="space-y-10">
        {MOCK_SUBSCRIPTIONS.length > 0 ? (
          MOCK_SUBSCRIPTIONS.map(sub => (
            <SubscriptionCard 
              key={sub.id} 
              subscription={sub} 
              onUpdate={(id, action) => console.log('Update', id, action)} 
            />
          ))
        ) : (
          <div className="p-32 text-center bg-white rounded-[3rem] border border-slate-100 flex flex-col items-center shadow-2xl shadow-slate-200/40">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-10 shadow-inner border border-slate-100">
              <span className="text-4xl italic font-black text-slate-200">∅</span>
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2 tracking-tight italic">No Active Nodes</h3>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-[11px] mb-12">Recurring fleet deployment has not been established</p>
            <Link href="/subscribe">
              <Button className="rounded-full px-14 h-16 font-black uppercase tracking-[0.2em] text-xs shadow-2xl shadow-primary/20">Establish Weekly Haul</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
