"use client"

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ShoppingBag, MapPin, CreditCard, ShieldCheck, Lock, Edit3, ArrowLeft } from 'lucide-react'
import { Button, Badge } from '@next360/ui'
import { useCartStore } from '@/store/cartStore'
import { formatPrice } from '@next360/utils'
import { useQuery, useMutation } from '@tanstack/react-query'
import { orderService } from '@/services/orderService'
import { accountService } from '@/services/accountService'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

interface OrderReviewProps {
  selectedAddressId: string
  selectedPaymentMethod: string
  onBack: () => void
  onPlaceOrder: (orderId: string) => void
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
      paymentMethod: selectedPaymentMethod,
      couponCode: coupon?.code,
    }),
    onSuccess: (order) => {
      onPlaceOrder(order.id)
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
    <div className="space-y-6">
      {/* Items Summary */}
      <div className="bg-white rounded-[2.5rem] border border-border p-8 shadow-sm">
        <div className="flex items-center justify-between mb-8">
           <h2 className="font-display text-2xl font-bold text-primary flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-primary/5 text-primary flex items-center justify-center border border-primary/10">
              <ShoppingBag size={18} />
            </span>
            Review Items
          </h2>
          <Link href="/cart">
            <Button variant="ghost" size="sm" className="text-secondary font-bold text-xs uppercase tracking-widest rounded-xl">
               <Edit3 size={14} className="mr-1.5" />
               Edit Cart
            </Button>
          </Link>
        </div>

        <div className="space-y-6">
           {items.map((item) => (
             <div key={item.id} className="flex gap-4 items-center group">
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-cream border border-border shrink-0">
                   <Image 
                      src={item.product.images[0]} 
                      alt={item.product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                   />
                </div>
                <div className="flex-1">
                   <p className="font-bold text-text text-sm line-clamp-1">{item.product.name}</p>
                   <div className="flex items-center gap-2 mt-1">
                      <Badge variant="info" className="text-[9px] h-4 px-1.5 border-border text-muted font-black">{item.selectedWeight}</Badge>
                      <span className="text-[10px] font-bold text-muted">QTY: {item.quantity}</span>
                   </div>
                </div>
                <div className="text-right">
                   <p className="font-black text-primary text-sm">{formatPrice(item.product.price * item.quantity)}</p>
                </div>
             </div>
           ))}
        </div>
      </div>

      {/* Delivery & Payment Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="bg-white rounded-[2.5rem] border border-border p-8 shadow-sm">
            <h3 className="text-xs font-black uppercase tracking-widest text-muted mb-6 flex items-center justify-between">
               Delivery To
               <button onClick={onBack} className="text-secondary hover:underline">Change</button>
            </h3>
            <div className="space-y-2">
               <p className="font-black text-text">{address.name}</p>
               <p className="text-muted text-xs font-medium leading-relaxed">
                  {address.street}, {address.city}, {address.state} - {address.pincode}
               </p>
               <p className="text-muted text-[10px] font-bold uppercase tracking-widest pt-2">
                  📞 {address.phone}
               </p>
            </div>
         </div>

         <div className="bg-white rounded-[2.5rem] border border-border p-8 shadow-sm">
            <h3 className="text-xs font-black uppercase tracking-widest text-muted mb-6 flex items-center justify-between">
               Payment
               <button onClick={onBack} className="text-secondary hover:underline">Change</button>
            </h3>
            <div className="flex items-center gap-4 bg-cream p-4 rounded-2xl border border-border">
               <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm">
                  {selectedPaymentMethod === 'cod' ? <Banknote size={20} /> : <CreditCard size={20} />}
               </div>
               <div>
                  <p className="font-black text-text text-sm">{PAYMENT_LABELS[selectedPaymentMethod] || selectedPaymentMethod}</p>
                  <p className="text-muted text-[9px] font-black uppercase tracking-widest mt-0.5">Verified SECURE</p>
               </div>
            </div>
         </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-border p-8 shadow-sm">
         <h3 className="font-display text-xl font-bold text-primary mb-6">Final Summary</h3>
         
         <div className="space-y-4 mb-8">
            <div className="flex justify-between items-center text-sm font-medium">
              <span className="text-muted">Items Subtotal ({itemCount})</span>
              <span className="text-text">{formatPrice(subtotal)}</span>
            </div>
            
            <div className="flex justify-between items-center text-sm font-medium">
              <span className="text-muted">Delivery Fee</span>
              {deliveryFee === 0 ? (
                <span className="text-secondary font-bold">FREE</span>
              ) : (
                <span className="text-text">{formatPrice(deliveryFee)}</span>
              )}
            </div>

            {discount > 0 && (
              <div className="flex justify-between items-center text-sm font-medium text-secondary">
                <span>Discount Applied</span>
                <span>-{formatPrice(discount)}</span>
              </div>
            )}

            {selectedPaymentMethod === 'cod' && (
              <div className="flex justify-between items-center text-sm font-medium text-amber-600">
                <span>COD Convenience Fee</span>
                <span>{formatPrice(2500)}</span>
              </div>
            )}

            <div className="border-t border-border pt-6 mt-4 flex items-center justify-between">
               <span className="font-display text-2xl font-bold text-primary">Order Total</span>
               <span className="font-display text-3xl font-black text-primary tracking-tighter">{formatPrice(total)}</span>
            </div>
         </div>

         <div className="flex flex-col gap-4">
            <Button 
               size="lg"
               onClick={handlePlaceOrder}
               disabled={isLoading || createOrderMutation.isPending}
               className="w-full h-16 rounded-[1.25rem] font-black text-xl shadow-2xl shadow-primary/20 relative overflow-hidden"
            >
               {isLoading || createOrderMutation.isPending ? (
                  <div className="flex items-center gap-3">
                     <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                        🌱
                     </motion.div>
                     <span>Placing Order...</span>
                  </div>
               ) : (
                  <div className="flex items-center gap-2">
                     <Lock size={20} className="mr-1" />
                     Place Order — {formatPrice(total)}
                  </div>
               )}
            </Button>
            
            <Button 
               variant="ghost" 
               onClick={onBack}
               className="h-14 rounded-2xl text-muted font-bold hover:bg-cream"
            >
               <ArrowLeft size={18} className="mr-2" />
               Back to Payment
            </Button>
         </div>

         <p className="mt-6 text-center text-[10px] text-muted font-bold leading-relaxed max-w-sm mx-auto uppercase tracking-widest">
           By placing your order, you agree to Next360's <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
         </p>
      </div>
    </div>
  )
}

import { Banknote } from 'lucide-react'
