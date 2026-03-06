"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ChevronRight, Smartphone, CreditCard, Landmark, Banknote, ShieldCheck } from 'lucide-react'
import { Button } from '@next360/ui'
import { formatPrice } from '@next360/utils'
import { cn } from '@next360/utils'

interface PaymentFormProps {
  selectedMethod: string
  onSelect: (method: string) => void
  onNext: () => void
  onBack: () => void
  total: number
}

const PAYMENT_METHODS = [
  { 
    id: 'upi', 
    label: 'UPI (GPay, PhonePe, Paytm)', 
    icon: <Smartphone size={24} />, 
    desc: 'Faster & Secure digital payments' 
  },
  { 
    id: 'card', 
    label: 'Credit / Debit Card', 
    icon: <CreditCard size={24} />, 
    desc: 'Visa, Mastercard, RuPay & more' 
  },
  { 
    id: 'netbanking', 
    label: 'Net Banking', 
    icon: <Landmark size={24} />, 
    desc: 'All major Indian banks supported' 
  },
  { 
    id: 'cod', 
    label: 'Cash on Delivery', 
    icon: <Banknote size={24} />, 
    desc: 'Pay when your organic box arrives' 
  },
]

export default function PaymentForm({ 
  selectedMethod, 
  onSelect, 
  onNext, 
  onBack, 
  total 
}: PaymentFormProps) {
  const isCod = selectedMethod === 'cod'

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-display text-2xl font-bold text-primary flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-primary/5 text-primary flex items-center justify-center border border-primary/10">
              <CreditCard size={18} />
            </span>
            Payment Method
          </h2>
        </div>

        <div className="space-y-4">
          {PAYMENT_METHODS.map((method) => {
            const isActive = selectedMethod === method.id
            return (
              <motion.div
                key={method.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelect(method.id)}
                className={cn(
                  "relative p-6 rounded-3xl border-2 transition-all cursor-pointer flex items-center gap-6",
                  isActive 
                    ? "border-primary bg-primary/5 shadow-lg shadow-primary/5" 
                    : "border-slate-50 hover:border-primary/20"
                )}
              >
                <div className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center transition-colors",
                  isActive ? "bg-primary text-white" : "bg-slate-50 text-slate-400"
                )}>
                  {method.icon}
                </div>

                <div className="flex-1">
                  <p className="font-black text-slate-800 text-lg">{method.label}</p>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{method.desc}</p>
                </div>

                <div className={cn(
                  "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                  isActive ? "border-primary" : "border-slate-100"
                )}>
                  {isActive && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-3 h-3 rounded-full bg-primary" />
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Conditional Notes */}
        <AnimatePresence mode="wait">
          {selectedMethod === 'upi' && (
            <motion.div 
              key="upi" 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -10 }}
              className="mt-6 p-4 bg-blue-50/50 rounded-2xl border border-blue-100/50 flex gap-4 items-center"
            >
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                <Smartphone size={20} />
              </div>
              <p className="text-xs font-medium text-blue-800 leading-relaxed">
                You will be prompted to enter your UPI ID or scan a QR code on the next page via Razorpay secure gateway.
              </p>
            </motion.div>
          )}

          {isCod && (
            <motion.div 
              key="cod" 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -10 }}
              className="mt-6 p-4 bg-amber-50/50 rounded-2xl border border-amber-100/50 flex gap-4 items-center"
            >
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                <Banknote size={20} />
              </div>
              <p className="text-xs font-medium text-amber-800 leading-relaxed">
                A small convenience fee of ₹25 will be added to Cash on Delivery orders. Please keep exact change ready.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-12 bg-cream/40 rounded-[2rem] p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-white/20">
          <div>
             <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Total Payable</p>
             <p className="font-display text-4xl font-black text-primary">{formatPrice(total + (isCod ? 2500 : 0))}</p>
          </div>
          <div className="flex gap-4 w-full md:w-auto">
             <Button 
                variant="ghost" 
                onClick={onBack}
                className="h-14 px-8 rounded-2xl text-slate-400 font-bold"
              >
                <ArrowLeft size={18} className="mr-2" />
                Back
             </Button>
             <Button
                onClick={onNext}
                disabled={!selectedMethod}
                className="flex-1 md:flex-none h-14 px-12 rounded-2xl font-black text-lg shadow-xl shadow-primary/20 group"
              >
                <span>Review Order</span>
                <ChevronRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
             </Button>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">
          <ShieldCheck size={14} className="text-secondary" />
          100% Secure Payments via Razorpay
        </div>
      </div>
    </div>
  )
}

import { AnimatePresence } from 'framer-motion'
