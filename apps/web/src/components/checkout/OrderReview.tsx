"use client"

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ShoppingBag, MapPin, CreditCard, ShieldCheck, Lock, Edit3, ArrowLeft } from 'lucide-react'
import { Button, Badge } from '@next360/ui'
import { useCartStore } from '@/store/cartStore'
import { formatPrice } from '@next360/utils'
import { Order } from '@next360/types'
import { useQuery, useMutation } from '@tanstack/react-query'
import { orderService } from '@/services/orderService'
import { accountService } from '@/services/accountService'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

interface OrderReviewProps {
  selectedAddressId: string
  selectedPaymentMethod: string
  onBack: () => void
  onPlaceOrder: (data: { order: Order; razorpayOrder?: any }) => void
  isLoading: boolean
}

const PAYMENT_LABELS: Record<string, string> = {
  upi: 'UPI Payment',
  card: 'Credit/Debit Card',
  netbanking: 'Net Banking',
  cod: 'Cash on Delivery'
}

export default function OrderReview({
  selectedAddressId,
  selectedPaymentMethod,
  onBack,
  onPlaceOrder,
  isLoading
}: OrderReviewProps) {
  const router = useRouter()
  const { items, getSubtotal, getDiscount, getDeliveryFee, getTotal, getItemCount, coupon, clearCart } = useCartStore()

  const { data: addresses = [] } = useQuery({
    queryKey: ['addresses'],
    queryFn: () => accountService.getAddresses(),
    staleTime: 5 * 60 * 1000,
  })

  const address = addresses.find(a => a.id === selectedAddressId)
  const subtotal = getSubtotal()
  const discount = getDiscount()
  const deliveryFee = getDeliveryFee()
  const total = getTotal() + (selectedPaymentMethod === 'cod' ? 2500 : 0)
  const itemCount = getItemCount()

  const createOrderMutation = useMutation({
    mutationFn: () => orderService.create({
      addressId: selectedAddressId,
      paymentMethod: selectedPaymentMethod.toUpperCase(), // Backend expects uppercase
      couponCode: coupon?.code,
    }),
    onSuccess: (data) => {
      onPlaceOrder(data)
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to place order')
    }
  })

  const handlePlaceOrder = () => {
    createOrderMutation.mutate()
  }

  if (!address) return null

  return (
    <div className="space-y-10">
      {/* Items Summary */}
      <div className="">
        <div className="flex items-center justify-between mb-10">
           <h2 className="text-3xl font-black text-slate-900 tracking-tight">Review Selection</h2>
           <Link href="/cart">
             <button className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-widest bg-primary/5 px-5 py-2.5 rounded-full hover:bg-primary/10 transition-colors">
                <Edit3 size={14} />
                Edit Basket
             </button>
           </Link>
        </div>

        <div className="space-y-5 px-1">
           {items.map((item) => (
             <div key={item.id} className="flex gap-6 items-center group bg-white p-4 rounded-3xl border border-slate-50 transition-all hover:border-slate-200">
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 flex items-center justify-center p-3 shrink-0">
                   <Image 
                      src={item.product.images[0]} 
                      alt={item.product.name}
                      fill
                      className="object-contain p-2 group-hover:scale-110 transition-transform duration-500"
                   />
                </div>
                <div className="flex-1 space-y-1">
                   <p className="font-black text-slate-800 text-base tracking-tight leading-tight line-clamp-1">{item.product.name}</p>
                   <div className="flex items-center gap-2">
                      <Badge variant="green" size="sm" className="bg-primary/5 text-primary text-[8px] font-black border-none uppercase tracking-widest px-2">{item.selectedWeight}</Badge>
                      <span className="w-1 h-1 rounded-full bg-slate-200" />
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Qty: {item.quantity}</span>
                   </div>
                </div>
                <div className="text-right pr-4">
                   <p className="font-black text-slate-900 text-lg leading-none">{formatPrice(item.product.price * item.quantity)}</p>
                </div>
             </div>
           ))}
        </div>
      </div>

      <div className="space-y-10">
        <div className="mb-10 space-y-1">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Deployment Info</h2>
          <p className="text-sm text-slate-400 font-bold uppercase tracking-widest pl-1">Final validation of your logistics</p>
        </div>

        {/* Delivery & Payment Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-2xl shadow-slate-200/50">
              <div className="flex justify-between items-start mb-6">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Shipment Node</p>
                <button onClick={onBack} className="text-primary font-black text-[9px] uppercase tracking-widest hover:underline px-3 py-1 rounded-full bg-primary/5">Change</button>
              </div>
              <div className="space-y-4">
                 <div>
                   <p className="font-black text-slate-900 text-xl tracking-tight">{address.name}</p>
                   <div className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-widest mt-1">
                     <Phone size={12} className="text-primary" /> {address.phone}
                   </div>
                 </div>
                 <p className="text-slate-500 text-sm font-bold leading-relaxed">
                    {address.street}<br/>
                    {address.city}, {address.state} - <span className="text-slate-900">{address.pincode}</span>
                 </p>
              </div>
           </div>

           <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-2xl shadow-slate-200/50">
              <div className="flex justify-between items-start mb-6">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Payment Protocol</p>
                <button onClick={onBack} className="text-primary font-black text-[9px] uppercase tracking-widest hover:underline px-3 py-1 rounded-full bg-primary/5">Change</button>
              </div>
              <div className="flex items-center gap-5 bg-slate-50 p-5 rounded-[2rem] border border-slate-100">
                 <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-primary shadow-sm ring-4 ring-slate-100">
                    {selectedPaymentMethod === 'cod' ? <Banknote size={24} /> : <CreditCard size={24} />}
                 </div>
                 <div>
                    <p className="font-black text-slate-900 text-base tracking-tight leading-none">{PAYMENT_LABELS[selectedPaymentMethod] || selectedPaymentMethod}</p>
                    <p className="text-primary text-[9px] font-black uppercase tracking-widest mt-1.5 flex items-center gap-1.5">
                       <ShieldCheck size={10} strokeWidth={3} />
                       Verified Secure
                    </p>
                 </div>
              </div>
           </div>
        </div>

        <div className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl shadow-slate-900/30">
           <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-8">System Settlement Summary</h3>
           
           <div className="space-y-5 mb-10">
              <div className="flex justify-between items-center px-1">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Basket Volume ({itemCount})</span>
                <span className="text-base font-black italic">{formatPrice(subtotal)}</span>
              </div>
              
              <div className="flex justify-between items-center px-1 text-primary">
                <span className="text-xs font-bold uppercase tracking-widest">Inbound Logistics</span>
                {deliveryFee === 0 ? (
                  <span className="text-[10px] font-black tracking-widest">0.00 FREE</span>
                ) : (
                  <span className="text-base font-black italic">{formatPrice(deliveryFee)}</span>
                )}
              </div>

              {discount > 0 && (
                <div className="flex justify-between items-center px-1 text-primary italic">
                  <span className="text-xs font-bold uppercase tracking-widest">Protocol Discount</span>
                  <span className="text-base font-black">-{formatPrice(discount)}</span>
                </div>
              )}

              {selectedPaymentMethod === 'cod' && (
                <div className="flex justify-between items-center px-1 text-amber-500 italic">
                  <span className="text-xs font-bold uppercase tracking-widest">Convenience Supplement</span>
                  <span className="text-base font-black">+{formatPrice(2500)}</span>
                </div>
              )}

              <div className="pt-8 border-t border-white/5 flex items-center justify-between">
                 <span className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">Total Settlement</span>
                 <span className="text-5xl font-black text-primary tracking-tighter italic">{formatPrice(total)}</span>
              </div>
           </div>

           <div className="flex flex-col gap-4">
              <Button 
                 variant="primary"
                 onClick={handlePlaceOrder}
                 disabled={isLoading || createOrderMutation.isPending}
                 className="w-full h-18 py-8 rounded-full font-black text-xl uppercase tracking-[0.1em] shadow-2xl relative overflow-hidden group"
              >
                 {isLoading || createOrderMutation.isPending ? (
                    <div className="flex items-center gap-4">
                       <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                          <Loader2 size={24} />
                       </motion.div>
                       <span>Linking Nodes...</span>
                    </div>
                 ) : (
                    <div className="flex items-center gap-3">
                       <Lock size={20} className="group-hover:-translate-y-0.5 transition-transform" strokeWidth={3} />
                       Initialize Order
                    </div>
                 )}
              </Button>
              
              <Button 
                variant="ghost" 
                onClick={onBack}
                className="h-14 rounded-full text-slate-500 font-black uppercase tracking-widest text-[10px] hover:text-white hover:bg-white/5"
              >
                <ArrowLeft size={16} className="mr-3" />
                Audit Previous Step
              </Button>
           </div>

           <p className="mt-8 text-center text-[8px] text-slate-500 font-black uppercase tracking-[0.4em] max-w-xs mx-auto leading-loose">
             Secure Hash Protocol • Terms apply • 100% Organic Origin
           </p>
        </div>
      </div>
    </div>
  )
}

import { Phone, Loader2 } from 'lucide-react'

import { Banknote } from 'lucide-react'
