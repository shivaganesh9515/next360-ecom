'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, Clock, MapPin, Truck, Box, ShieldCheck, User } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { cn } from '@/lib/utils'

export function TrackingTimeline({ status = 'IN_TRANSIT' }) {
  const steps = [
    { id: 'CONFIRMED', label: 'Harvest Confirmed', time: '06:00 AM', icon: Box, done: true },
    { id: 'PICKED_UP', label: 'Mandi Pickup', time: '08:30 AM', icon: MapPin, done: true },
    { id: 'HUB_REACHED', label: 'Reached Zone Hub', time: '10:45 AM', icon: Truck, done: true },
    { id: 'IN_TRANSIT', label: 'Out for Delivery', time: '11:15 AM', icon: Truck, done: true, current: status === 'IN_TRANSIT' },
    { id: 'DELIVERED', label: 'Purity Delivered', time: 'Expected 12:30 PM', icon: CheckCircle2, done: false, current: status === 'DELIVERED' }
  ]

  return (
    <div className="space-y-8 font-sans">
       {steps.map((step, idx) => {
          const isLast = idx === steps.length - 1
          return (
             <div key={step.id} className="relative flex gap-6">
                {!isLast && (
                  <div className={cn(
                    "absolute left-6 top-10 bottom-0 w-0.5 -ml-[1px]",
                    step.done ? "bg-secondary" : "bg-border border-dashed"
                  )} />
                )}
                
                <div className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 z-10 transition-all duration-500",
                  step.done ? "bg-secondary text-white shadow-lg shadow-secondary/20" : 
                  step.current ? "bg-primary text-white animate-pulse" : "bg-cream text-muted border border-border"
                )}>
                   <step.icon className="w-6 h-6" />
                </div>

                <div className="pt-1 pb-4">
                   <h4 className={cn(
                     "text-lg font-display font-black tracking-tight",
                     step.done ? "text-text" : "text-muted"
                   )}>{step.label}</h4>
                   <p className="text-xs font-bold text-muted mt-1 uppercase tracking-widest">{step.time}</p>
                   {step.current && (
                      <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="mt-3 bg-white border border-border p-4 rounded-2xl shadow-sm max-w-xs"
                      >
                         <p className="text-[11px] font-medium text-muted">Batch handler <span className="text-text font-bold">Ramesh K.</span> is 2km away from your zone entrance.</p>
                      </motion.div>
                   )}
                </div>
             </div>
          )
       })}
    </div>
  )
}
