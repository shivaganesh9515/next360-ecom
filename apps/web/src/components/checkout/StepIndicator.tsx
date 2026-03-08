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
        const isUpcoming = currentStep < s.step

        return (
          <div key={s.step} className="flex flex-col items-center gap-3 relative">
            <motion.div
              initial={false}
              animate={{
                scale: isActive ? 1.1 : 1,
                backgroundColor: isCompleted ? '#2D5016' : isActive ? '#142609' : '#FFFFFF',
                borderColor: isCompleted ? '#2D5016' : isActive ? '#142609' : '#E2E8F0'
              }}
              className={cn(
                "w-10 h-10 rounded-full border-2 flex items-center justify-center transition-shadow duration-300",
                isActive && "shadow-xl shadow-primary/20 ring-4 ring-primary/10",
                isUpcoming && "text-muted"
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
                    <Check size={20} className="text-white" strokeWidth={3} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="number"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={cn(
                      "font-black text-sm",
                      isActive ? "text-white" : "text-muted"
                    )}
                  >
                    {s.step}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <span className={cn(
              "text-[10px] font-black uppercase tracking-widest transition-colors duration-300",
              isActive ? "text-primary" : isCompleted ? "text-secondary" : "text-muted"
            )}>
              {s.label}
            </span>

            {isActive && (
              <motion.div 
                layoutId="active-indicator"
                className="absolute -bottom-2 w-1.5 h-1.5 rounded-full bg-primary"
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

