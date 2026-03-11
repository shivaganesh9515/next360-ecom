import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ChevronRight, Smartphone, CreditCard, Landmark, Banknote, ShieldCheck, Check } from 'lucide-react'
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
    <div className="space-y-10">
      <div className="">
        <div className="mb-10 space-y-1">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
             Secure Payment
          </h2>
          <p className="text-sm text-slate-400 font-bold uppercase tracking-widest pl-1">Choose your preferred settlement method</p>
        </div>

        <div className="space-y-5">
          {PAYMENT_METHODS.map((method) => {
            const isActive = selectedMethod === method.id
            return (
              <motion.div
                key={method.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelect(method.id)}
                className={cn(
                  "relative p-8 rounded-[2.5rem] border-2 transition-all duration-500 cursor-pointer flex items-center gap-8 bg-white",
                  isActive 
                    ? "border-primary shadow-2xl shadow-primary/5 ring-8 ring-primary/5" 
                    : "border-slate-100 hover:border-primary/30"
                )}
              >
                <div className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-sm",
                  isActive ? "bg-primary text-white" : "bg-slate-50 text-slate-400"
                )}>
                  {method.icon}
                </div>

                <div className="flex-1">
                  <p className="font-black text-slate-900 text-xl tracking-tight leading-tight">{method.label}</p>
                  <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.15em] mt-1">{method.desc}</p>
                </div>

                <div className={cn(
                  "w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-500",
                  isActive ? "bg-primary border-primary" : "border-slate-100 bg-slate-50"
                )}>
                  {isActive && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                      <Check size={20} className="text-white" strokeWidth={4} />
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Conditional Notes */}
        <div className="h-24">
          <AnimatePresence mode="wait">
            {selectedMethod === 'upi' && (
              <motion.div 
                key="upi" 
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }} 
                exit={{ opacity: 0, scale: 0.95 }}
                className="mt-8 p-6 bg-slate-900 rounded-3xl text-white flex gap-6 items-center shadow-xl"
              >
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-primary shrink-0">
                  <Smartphone size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Instant Verification</p>
                  <p className="text-xs font-medium leading-relaxed">
                    Pay securely via any UPI app. We'll generate a fresh QR code on the next step.
                  </p>
                </div>
              </motion.div>
            )}

            {isCod && (
              <motion.div 
                key="cod" 
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }} 
                exit={{ opacity: 0, scale: 0.95 }}
                className="mt-8 p-6 bg-slate-900 rounded-3xl text-white flex gap-6 items-center shadow-xl"
              >
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-primary shrink-0">
                  <Banknote size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Pay at Doorstep</p>
                  <p className="text-xs font-medium leading-relaxed">
                    Convenience fee of <span className="text-primary font-black">₹25</span> applies. Exact change requested.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-12 bg-white rounded-[3rem] p-10 flex flex-col md:flex-row items-center justify-between gap-8 border border-slate-100 shadow-2xl shadow-slate-200/50">
          <div className="text-center md:text-left space-y-1">
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Grand Settlement Total</p>
             <p className="text-5xl font-black text-slate-900 tracking-tight leading-none italic">{formatPrice(total + (isCod ? 2500 : 0))}</p>
          </div>
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
             <Button 
                variant="ghost" 
                onClick={onBack}
                className="h-16 px-8 rounded-full text-slate-400 font-black uppercase tracking-widest text-[10px] hover:bg-slate-50"
              >
                <ArrowLeft size={16} className="mr-3" />
                Go Back
             </Button>
             <Button
                onClick={onNext}
                disabled={!selectedMethod}
                className="flex-1 md:flex-none h-16 px-14 rounded-full font-black text-base uppercase tracking-widest shadow-2xl shadow-primary/20 group gap-3"
              >
                <span>Final Review</span>
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" strokeWidth={3} />
             </Button>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-center gap-3 text-[9px] font-black text-slate-300 uppercase tracking-[0.3em]">
          <ShieldCheck size={14} className="text-primary" />
          End-to-End Encryption • PCI Compliant Gateway • Secure Checkout
        </div>
      </div>
    </div>
  )
}
