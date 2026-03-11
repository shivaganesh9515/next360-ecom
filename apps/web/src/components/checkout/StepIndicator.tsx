"use client"

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, CreditCard, ClipboardList, Check } from 'lucide-react'
import { cn } from '@next360/utils'

interface StepIndicatorProps {
  currentStep: 1 | 2 | 3
}

const STEPS = [
  { step: 1, label: 'Delivery', icon: MapPin },
  { step: 2, label: 'Payment', icon: CreditCard },
  { step: 3, label: 'Review', icon: ClipboardList },
]

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-between max-w-xl mx-auto mb-12 relative px-4">
      {/* Background Line */}
      <div className="absolute top-5 left-0 right-0 h-0.5 bg-border -z-10 mx-12" />
      
      {/* Active Path Line */}
      <motion.div 
        initial={{ width: '0%' }}
        animate={{ width: currentStep === 1 ? '0%' : currentStep === 2 ? '50%' : '100%' }}
        className="absolute top-5 left-12 h-0.5 bg-secondary -z-10 transition-all duration-700 ease-in-out"
      />

      {STEPS.map((s, idx) => {
        const isCompleted = currentStep > s.step
        const isActive = currentStep === s.step

        return (
          <div key={s.step} className="flex flex-col items-center gap-3 relative">
            <motion.div
              initial={false}
              animate={{
                scale: isActive ? 1 : 0.9,
                backgroundColor: isCompleted ? '#16a34a' : isActive ? '#0f172a' : '#f8fafc',
                borderColor: isCompleted ? '#16a34a' : isActive ? '#0f172a' : '#f1f5f9'
              }}
              className={cn(
                "w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all",
                isActive && "shadow-2xl shadow-slate-900/20 ring-4 ring-slate-900/5"
              )}
            >
              <AnimatePresence mode="wait">
                {isCompleted ? (
                  <motion.div
                    key="check"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                  >
                    <Check size={22} className="text-white" strokeWidth={4} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="number"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={cn(
                      "font-black text-sm",
                      isActive ? "text-white" : "text-slate-400"
                    )}
                  >
                    {s.step}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <span className={cn(
              "text-[10px] font-black uppercase tracking-[0.2em] transition-colors duration-300",
              isActive ? "text-slate-900" : isCompleted ? "text-primary" : "text-slate-300"
            )}>
              {s.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}

