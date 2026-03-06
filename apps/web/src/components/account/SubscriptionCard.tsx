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
    if (window.confirm('Are you sure you want to pause this subscription?')) {
      setStatus('PAUSED')
      toast.success('Subscription paused')
      onUpdate(subscription.id, 'PAUSED')
    }
  }

  const handleResume = () => {
    setStatus('ACTIVE')
    toast.success('Subscription resumed')
    onUpdate(subscription.id, 'ACTIVE')
  }

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel? This cannot be undone.')) {
      setStatus('CANCELLED')
      toast.error('Subscription cancelled')
      onUpdate(subscription.id, 'CANCELLED')
    }
  }

  if (compact) {
    return (
      <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-xl shadow-sm border border-slate-100">
            {boxInfo.icon}
          </div>
          <div>
            <p className="font-bold text-slate-800 text-sm leading-tight">{boxInfo.name}</p>
            <p className="text-xs font-bold text-slate-400 mt-0.5">
              {status === 'ACTIVE' && subscription.nextDelivery 
                ? `Next: ${new Date(subscription.nextDelivery).toLocaleDateString('en-IN', {month: 'short', day: 'numeric'})}`
                : status === 'PAUSED' ? 'Paused' : 'Cancelled'}
            </p>
          </div>
        </div>
        <Badge variant={status === 'ACTIVE' ? 'active' : status === 'PAUSED' ? 'warning' : 'error'} className="font-bold">
          {status === 'ACTIVE' ? '● Active' : status === 'PAUSED' ? '⏸ Paused' : '✗ Cancelled'}
        </Badge>
      </div>
    )
  }

  return (
    <div className={`bg-white rounded-2xl border ${status === 'ACTIVE' ? 'border-primary/20 shadow-md shadow-primary/5' : 'border-slate-100 shadow-sm'} p-5 md:p-6 transition-all`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-3xl shadow-sm border border-slate-100 shrink-0">
            {boxInfo.icon}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-display text-xl font-black text-slate-800 leading-tight">{boxInfo.name}</h3>
              <Badge variant="info" className="font-bold text-[10px] bg-slate-50 uppercase tracking-widest text-slate-500 border-slate-200">
                {subscription.frequency}
              </Badge>
            </div>
            <p className="text-sm font-bold text-slate-500">
              <span className="text-slate-800 mr-1">{formatPrice(subscription.price)}</span>
              / {(subscription.frequency === 'WEEKLY' ? 'week' : subscription.frequency === 'BIWEEKLY' ? '2 weeks' : 'month')}
            </p>
          </div>
        </div>
        
        <div className="flex flex-col items-start sm:items-end">
          <Badge variant={status === 'ACTIVE' ? 'active' : status === 'PAUSED' ? 'warning' : 'error'} className="font-bold mb-2">
            {status === 'ACTIVE' ? '● Active' : status === 'PAUSED' ? '⏸ Paused' : '✗ Cancelled'}
          </Badge>
          {status === 'ACTIVE' && subscription.nextDelivery && (
            <p className="text-xs font-bold text-slate-400">
              Next delivery: <span className="text-primary">{new Date(subscription.nextDelivery).toLocaleDateString()}</span>
            </p>
          )}
          {status === 'PAUSED' && (
            <p className="text-xs font-bold text-amber-500">Subscription paused</p>
          )}
        </div>
      </div>

      {/* Items Preview */}
      {items.length > 0 && (
        <div className="mb-6 p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between overflow-x-auto scrollbar-hide">
          <div className="flex items-center gap-2 pr-4 shrink-0">
            {items.slice(0, 4).map((product, i) => (
              <div key={i} className="w-10 h-10 rounded-full overflow-hidden bg-white border border-slate-200 relative shrink-0 -ml-2 first:ml-0 shadow-sm">
                <Image src={product?.images[0] || ''} alt={product?.name || ''} fill className="object-cover" />
              </div>
            ))}
            {items.length > 4 && (
              <div className="w-10 h-10 rounded-full bg-cream border border-secondary/20 flex items-center justify-center text-xs font-black text-secondary shrink-0 -ml-2 shadow-sm z-10 relative">
                +{items.length - 4}
              </div>
            )}
          </div>
          <p className="text-xs font-bold text-slate-500 ml-4 shrink-0 pr-2">Contains {items.length} items</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100">
        {status === 'ACTIVE' && (
          <>
            <Button variant="outline" className="font-bold text-xs" onClick={() => toast.success("Box customization coming soon")}>
              <Settings2 size={14} className="mr-1.5" />
              Customize Box
            </Button>
            <Button variant="ghost" className="font-bold text-xs text-slate-600" onClick={() => {
              if (window.confirm('Skip next delivery?')) toast.success("Next delivery skipped")
            }}>
              Skip Next
            </Button>
            <Button variant="ghost" className="font-bold text-xs text-amber-600 hover:bg-amber-50 ml-auto" onClick={handlePause}>
              Pause
            </Button>
          </>
        )}
        
        {status === 'PAUSED' && (
          <>
            <Button variant="primary" className="font-bold text-xs" onClick={handleResume}>
              Resume Subscription
            </Button>
            <Button variant="ghost" className="font-bold text-xs text-red-500 hover:bg-red-50 ml-auto" onClick={handleCancel}>
              Cancel
            </Button>
          </>
        )}

        {status !== 'CANCELLED' && (
          <Button variant="ghost" className="font-bold text-xs text-slate-500 ml-0 sm:ml-auto md:ml-2" onClick={() => toast.success("Schedule modal coming soon")}>
            <Calendar size={14} className="mr-1.5" />
            Change Schedule
          </Button>
        )}
      </div>
    </div>
  )
}
