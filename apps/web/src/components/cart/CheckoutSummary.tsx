'use client'

import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { ShieldCheck, Info, Gift, ArrowRight } from 'lucide-react'

export function CheckoutSummary({ subtotal, itemCount, onCheckout }) {
  const deliveryFee = subtotal > 500 ? 0 : 40
  const tax = subtotal * 0.05
  const total = subtotal + deliveryFee + tax

  return (
    <Card className="p-8 bg-white border-none shadow-2xl rounded-[3rem] sticky top-32">
       <h3 className="text-xl font-display font-black text-text mb-8 tracking-tight">Order Summary</h3>
       
       <div className="space-y-4 mb-8 pb-8 border-b border-border/50">
          <div className="flex justify-between text-sm font-medium text-muted">
             <span>Items ({itemCount})</span>
             <span className="text-text font-bold">₹{subtotal}</span>
          </div>
          <div className="flex justify-between text-sm font-medium text-muted">
             <span>Harvest Tax (GST 5%)</span>
             <span className="text-text font-bold">₹{tax.toFixed(0)}</span>
          </div>
          <div className="flex justify-between text-sm font-medium text-muted">
             <span>Zone Delivery</span>
             <span>{deliveryFee === 0 ? <span className="text-secondary font-black">FREE</span> : <span className="text-text font-bold">₹{deliveryFee}</span>}</span>
          </div>
       </div>

       <div className="space-y-6 mb-10">
          <div className="bg-cream p-4 rounded-2xl border border-dashed border-border flex items-center gap-3">
             <Gift className="w-5 h-5 text-accent" />
             <input 
               type="text" 
               placeholder="Apply Coupon Code" 
               className="bg-transparent border-none text-xs font-bold text-text outline-none flex-1 placeholder:text-muted/50"
             />
             <button className="text-primary font-black uppercase text-[10px] tracking-widest px-2">Apply</button>
          </div>

          <div className="flex justify-between items-end">
             <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-muted">Total Payable</p>
                <p className="text-4xl font-display font-black text-text leading-none mt-1 group-hover:text-primary transition-colors tracking-tighter">₹{total.toFixed(0)}</p>
             </div>
             <Badge variant="rythu" className="animate-pulse uppercase tracking-widest text-[8px] px-3 py-1">Zero Platform Fee</Badge>
          </div>
       </div>

       <div className="space-y-4">
          <Button 
            onClick={onCheckout}
            className="w-full h-16 rounded-2xl text-xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
          >
             Pay with RazorPay <ArrowRight className="w-6 h-6 ml-2" />
          </Button>
          
          <div className="flex items-center justify-center gap-4 py-2 opacity-50 grayscale hover:grayscale-0 transition-all">
             <img src="https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg" className="h-4" />
             <div className="h-4 w-px bg-border" />
             <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_Pay_logo.svg" className="h-4" />
          </div>
       </div>

       <div className="mt-8 pt-6 border-t border-border flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-secondary flex-shrink-0" />
          <p className="text-[10px] text-muted leading-tight font-medium">
             <span className="font-bold text-secondary">Secure Harvest Payment:</span> Your transaction is protected by 256-bit encryption. Payment held in escrow until delivery confirmation.
          </p>
       </div>
    </Card>
  )
}
