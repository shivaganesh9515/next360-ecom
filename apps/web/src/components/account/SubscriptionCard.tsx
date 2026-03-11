"use client"

import React, { useState } from 'react'
import { Badge, Button } from '@next360/ui'
import { Subscription } from '@next360/types'
import { MOCK_PRODUCTS } from '@/lib/mockData'
import Image from 'next/image'
import { formatPrice } from '@next360/utils'
import { toast } from 'sonner'
import { Calendar, Settings2 } from 'lucide-react'

// Map of subscription box types to names and icons
const BOX_MAP = {
  VEGGIE: { name: 'Weekly Veggie Box', icon: '🥦' },
  FRUIT:  { name: 'Weekly Fruit Box',  icon: '🍎' },
  PROTEIN:{ name: 'Protein Box',       icon: '💪' },
  FAMILY: { name: 'Family Box',        icon: '👨‍👩‍👧‍👦' },
  CUSTOM: { name: 'Custom Box',        icon: '🎯' },
}

interface SubscriptionCardProps {
  subscription: Subscription
  compact?: boolean
  onUpdate: (id: string, action: string) => void
}

export default function SubscriptionCard({ subscription, compact, onUpdate }: SubscriptionCardProps) {
  const [status, setStatus] = useState(subscription.status)
  
  const boxInfo = BOX_MAP[subscription.boxType] || BOX_MAP.CUSTOM
  const items = subscription.items.map(item => item.product || MOCK_PRODUCTS.find(p => p.id === item.productId)).filter(Boolean)

  const handlePause = () => {
    if (window.confirm('Are you sure you want to pause this subscription node?')) {
      setStatus('PAUSED')
      toast.success('Subscription node paused')
      onUpdate(subscription.id, 'PAUSED')
    }
  }

  const handleResume = () => {
    setStatus('ACTIVE')
    toast.success('Subscription node resumed')
    onUpdate(subscription.id, 'ACTIVE')
  }

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to terminate this subscription? This will purge the recurring node.')) {
      setStatus('CANCELLED')
      toast.error('Subscription terminated')
      onUpdate(subscription.id, 'CANCELLED')
    }
  }

  if (compact) {
    return (
      <div className="flex items-center justify-between p-6 bg-white border border-slate-100 rounded-[2rem] shadow-xl shadow-slate-200/40 group">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-3xl shadow-inner border border-slate-100 group-hover:scale-110 transition-transform duration-500">
            {boxInfo.icon}
          </div>
          <div>
            <p className="font-black text-slate-900 text-[11px] uppercase tracking-widest leading-none mb-2">{boxInfo.name}</p>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">
              {status === 'ACTIVE' && subscription.nextDelivery 
                ? `Next Deployment: ${new Date(subscription.nextDelivery).toLocaleDateString('en-IN', {month: 'short', day: 'numeric'})}`
                : status === 'PAUSED' ? 'Node Paused' : 'Node Discharged'}
            </p>
          </div>
        </div>
        <Badge variant={status === 'ACTIVE' ? 'active' : status === 'PAUSED' ? 'amber' : 'red'} className="font-black uppercase tracking-[0.2em] text-[8px] px-4 py-1.5 rounded-full border-none shadow-lg">
          {status === 'ACTIVE' ? 'Active' : status === 'PAUSED' ? 'Paused' : 'Terminated'}
        </Badge>
      </div>
    )
  }

  return (
    <div className={`bg-white rounded-[2.5rem] border ${status === 'ACTIVE' ? 'border-primary/20 shadow-2xl shadow-primary/5' : 'border-slate-100 shadow-xl shadow-slate-200/30'} p-8 md:p-12 transition-all duration-700 group relative overflow-hidden`}>
      {status === 'ACTIVE' && (
         <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-primary/10 transition-colors" />
      )}
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-8 mb-10 relative z-10">
        <div className="flex items-center gap-8">
          <div className="w-20 h-20 rounded-[2rem] bg-slate-50 flex items-center justify-center text-4xl shadow-inner border border-slate-100 shrink-0 group-hover:-rotate-3 transition-transform duration-500">
            {boxInfo.icon}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-4 mb-3">
              <h3 className="text-2xl font-black text-slate-900 tracking-tight italic leading-none">{boxInfo.name}</h3>
              <Badge className="font-black text-[8px] bg-slate-900 text-white uppercase tracking-[0.3em] px-4 py-1 rounded-full border-none shadow-xl">
                {subscription.frequency}
              </Badge>
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-3">
              <span className="text-slate-900 text-sm tracking-tight">{formatPrice(subscription.price)}</span>
              <span className="opacity-20">/</span>
              <span>{(subscription.frequency === 'WEEKLY' ? 'per deployment' : subscription.frequency === 'BIWEEKLY' ? 'per cycle' : 'per month')}</span>
            </p>
          </div>
        </div>
        
        <div className="flex flex-col items-start sm:items-end gap-3 text-right">
          <Badge variant={status === 'ACTIVE' ? 'active' : status === 'PAUSED' ? 'amber' : 'red'} className="font-black uppercase tracking-[0.2em] text-[9px] px-6 py-2 rounded-full border-none shadow-2xl">
            {status === 'ACTIVE' ? '● System Active' : status === 'PAUSED' ? '⏸ Node Paused' : '✗ Terminated'}
          </Badge>
          {status === 'ACTIVE' && subscription.nextDelivery && (
            <div className="flex items-center gap-2 text-[9px] font-black text-slate-400 uppercase tracking-widest italic">
              <Calendar size={12} className="text-primary" />
              Next Haul: <span className="text-slate-900 ml-1">{new Date(subscription.nextDelivery).toLocaleDateString('en-IN', { month: 'short', day: '2-digit', year: 'numeric' })}</span>
            </div>
          )}
          {status === 'PAUSED' && (
            <p className="text-[9px] font-black text-amber-500 uppercase tracking-widest italic">Flow Halted</p>
          )}
        </div>
      </div>

      {/* Items Preview */}
      {items.length > 0 && (
        <div className="mb-10 p-6 rounded-[2rem] bg-slate-50 border border-slate-100 flex items-center justify-between overflow-x-auto scrollbar-hide relative z-10 hover:bg-slate-100/50 transition-colors duration-500">
          <div className="flex items-center gap-2 pr-4 shrink-0">
            {items.slice(0, 4).map((product, i) => (
              <div key={i} className="w-12 h-12 rounded-full overflow-hidden bg-white border-2 border-white relative shrink-0 -ml-4 first:ml-0 shadow-xl group-hover:translate-x-1 transition-transform" style={{ transitionDelay: `${i * 50}ms` }}>
                <Image src={product?.images[0] || ''} alt={product?.name || ''} fill className="object-cover" />
              </div>
            ))}
            {items.length > 4 && (
              <div className="w-12 h-12 rounded-full bg-slate-900 border-2 border-white flex items-center justify-center text-[10px] font-black text-white shrink-0 -ml-4 shadow-xl z-10 relative">
                +{items.length - 4}
              </div>
            )}
          </div>
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-4 shrink-0 flex items-center gap-3">
             <span className="w-6 h-[1px] bg-slate-200" /> Linked Nodes: <span className="text-slate-900">{items.length} Units</span>
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-3 pt-8 border-t border-slate-50 relative z-10">
        {status === 'ACTIVE' && (
          <>
            <Button variant="outline" className="rounded-full px-8 h-12 border-slate-100 text-[9px] font-black uppercase tracking-[0.2em] shadow-lg hover:border-slate-900" onClick={() => toast.success("Node config sequence starting...")}>
              <Settings2 size={12} strokeWidth={3} className="mr-2" />
              Modify Logic
            </Button>
            <Button variant="ghost" className="rounded-full px-8 h-12 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-slate-900" onClick={() => {
              if (window.confirm('Skip next deployment cycle?')) toast.success("Cycle bypassed")
            }}>
              Bypass Cycle
            </Button>
            <Button variant="ghost" className="rounded-full px-8 h-12 text-[9px] font-black uppercase tracking-[0.2em] text-amber-500 hover:bg-amber-50 hover:text-amber-600 ml-auto" onClick={handlePause}>
              Halt Flow
            </Button>
          </>
        )}
        
        {status === 'PAUSED' && (
          <>
            <Button className="rounded-full px-10 h-14 text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-primary/20" onClick={handleResume}>
              Initialize Resume
            </Button>
            <Button variant="ghost" className="rounded-full px-8 h-12 text-[9px] font-black uppercase tracking-[0.2em] text-red-400 hover:text-red-500 ml-auto" onClick={handleCancel}>
              Terminate Node
            </Button>
          </>
        )}

        {status !== 'CANCELLED' && (
          <Button variant="ghost" className="rounded-full px-8 h-12 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-slate-900 ml-0 sm:ml-auto md:ml-2" onClick={() => toast.success("Schedule re-alignment starting...")}>
            <Calendar size={12} strokeWidth={3} className="mr-2 text-primary" />
            Sync Timeline
          </Button>
        )}
      </div>
    </div>
  )
}
