"use client"

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useCartStore } from '@/store/cartStore'
import { useAuthStore } from '@/store/authStore'
import CartSummary from '@/components/cart/CartSummary'
import StepIndicator from '@/components/checkout/StepIndicator'
import AddressForm from '@/components/checkout/AddressForm'
import PaymentForm from '@/components/checkout/PaymentForm'
import OrderReview from '@/components/checkout/OrderReview'
import { toast } from 'sonner'

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

  const handlePlaceOrder = async (orderId: string) => {
    setIsPlacingOrder(true)
    
    try {
      if (selectedPaymentMethod === 'cod') {
        clearCart()
        router.push(`/order-success/${orderId}`)
        return
      }

      // Simulate Razorpay trigger
      toast.info('Initializing secure payment...')
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // In real app, we'd open Razorpay here
      // For now, auto-confirm
      clearCart()
      router.push(`/order-success/${orderId}`)
    } catch (err) {
      toast.error('Payment failed')
    } finally {
      setIsPlacingOrder(false)
    }
  }

  if (items.length === 0) return null

  return (
    <main className="min-h-screen bg-transparent pt-24 pb-24">
      {/* Header */}
      <div className="bg-cream/60 border-b border-border py-8">
        <div className="max-w-[1240px] mx-auto px-4 md:px-6">
          <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-muted mb-2">
            <Link href="/cart" className="hover:text-primary transition-colors">Cart</Link>
            <span>/</span>
            <span className="text-primary">Checkout</span>
          </div>
          <h1 className="font-display text-4xl font-black text-primary tracking-tighter">Checkout</h1>
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto px-4 md:px-6 py-12">
        <StepIndicator currentStep={currentStep} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Main Flow */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
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
          <div className="lg:col-span-1">
             <CartSummary 
               showCheckoutButton={false} 
               showCoupon={currentStep === 1} // Only allow coupon on first checkout step
             />
             <div className="mt-8 p-6 bg-cream rounded-[2rem] border border-border">
                <p className="text-xs font-bold text-primary uppercase tracking-widest text-center">
                  🚚 Free shipping applied to this order
                </p>
             </div>
          </div>
        </div>
      </div>
    </main>
  )
}

