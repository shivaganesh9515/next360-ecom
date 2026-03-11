"use client"

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Truck } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { useAuthStore } from '@/store/authStore'
import CartSummary from '@/components/cart/CartSummary'
import StepIndicator from '@/components/checkout/StepIndicator'
import AddressForm from '@/components/checkout/AddressForm'
import PaymentForm from '@/components/checkout/PaymentForm'
import OrderReview from '@/components/checkout/OrderReview'
import { toast } from 'sonner'
import Script from 'next/script'
import { env } from '@/config/env'
import { orderService } from '@/services/orderService'
import type { Order } from '@next360/types'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, clearCart, getTotal } = useCartStore()
  const { user, isAuthenticated } = useAuthStore()

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1)
  const [selectedAddressId, setSelectedAddressId] = useState('')
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('')
  const [isPlacingOrder, setIsPlacingOrder] = useState(false)

  // Basic guard (middleware should handle this, but safety first)
  useEffect(() => {
    // Simulated redirect if no items
    if (items.length === 0) {
      router.push('/cart')
    }
  }, [items, router])

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep((prev) => (prev + 1) as 1 | 2 | 3)
  }

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep((prev) => (prev - 1) as 1 | 2 | 3)
  }

  const handlePlaceOrder = async (data: { order: Order; razorpayOrder?: any }) => {
    setIsPlacingOrder(true)
    const { order, razorpayOrder } = data
    
    try {
      if (selectedPaymentMethod === 'cod') {
        clearCart()
        router.push(`/order-success/${order.id}`)
        return
      }

      if (!razorpayOrder) {
        throw new Error('Payment initialization failed')
      }

      const options = {
        key: env.NEXT_PUBLIC_RAZORPAY_KEY,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: 'Next360',
        description: `Order #${order.orderNumber}`,
        order_id: razorpayOrder.id,
        handler: async (response: any) => {
          try {
            toast.loading('Verifying payment...')
            await orderService.verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            })
            toast.dismiss()
            toast.success('Payment successful!')
            clearCart()
            router.push(`/order-success/${order.id}`)
          } catch (err) {
            toast.dismiss()
            toast.error('Payment verification failed. Please contact support.')
          }
        },
        prefill: {
          name: user?.name,
          email: user?.email,
          contact: user?.phone || '',
        },
        theme: {
          color: '#2D5016',
        },
        modal: {
          ondismiss: () => {
            setIsPlacingOrder(false)
          }
        }
      }

      const rzp = new (window as any).Razorpay(options)
      rzp.open()
      
    } catch (err) {
      toast.error('Payment failed')
      setIsPlacingOrder(false)
    }
  }

  if (items.length === 0) return null

  return (
    <main className="min-h-screen bg-white pt-16 pb-24">
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />
      {/* Header */}
      <div className="bg-white py-10">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-4">
            <Link href="/cart" className="hover:text-primary transition-colors">Basket</Link>
            <span className="opacity-30">/</span>
            <span className="text-slate-900">Secure Checkout</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-none">Checkout</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <StepIndicator currentStep={currentStep} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start mt-12">
          {/* Main Flow */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                className="bg-slate-50/50 rounded-[2.5rem] p-8 md:p-12 border border-slate-100"
              >
                {currentStep === 1 && (
                  <AddressForm 
                    selectedId={selectedAddressId}
                    onSelect={setSelectedAddressId}
                    onNext={handleNext}
                  />
                )}
                {currentStep === 2 && (
                  <PaymentForm 
                    selectedMethod={selectedPaymentMethod}
                    onSelect={setSelectedPaymentMethod}
                    onNext={handleNext}
                    onBack={handleBack}
                    total={getTotal()}
                  />
                )}
                {currentStep === 3 && (
                  <OrderReview 
                    selectedAddressId={selectedAddressId}
                    selectedPaymentMethod={selectedPaymentMethod}
                    onBack={handleBack}
                    onPlaceOrder={handlePlaceOrder}
                    isLoading={isPlacingOrder}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: Summary Sidebar */}
          <div className="lg:col-span-1 space-y-8">
             <div className="bg-white rounded-[2.5rem] border border-slate-100 p-2">
               <CartSummary 
                 showCheckoutButton={false} 
                 showCoupon={currentStep === 1}
               />
             </div>
             <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <Truck size={20} className="text-primary" />
                  </div>
                  <p className="text-[11px] font-black uppercase tracking-widest leading-tight">
                    Premium Delivery<br/><span className="text-slate-400">Guaranteed Fresh</span>
                  </p>
                </div>
                <p className="text-xs text-slate-400 font-medium leading-relaxed">
                  Your organic selection is packed in eco-friendly crates and shipped within 4 hours.
                </p>
             </div>
          </div>
        </div>
      </div>
    </main>
  )
}

