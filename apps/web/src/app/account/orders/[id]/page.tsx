"use client"

import React, { use } from 'react'
import { MOCK_ORDERS } from '@/lib/mockAccount'
import { OrderStatusBadge } from '@/app/account/orders/page'
import Image from 'next/image'
import { formatPrice } from '@next360/utils'
import { Check, Download, Info, ArrowLeft } from 'lucide-react'
import { toast } from 'sonner'
import { useCartStore } from '@/store/cartStore'
import { Button } from '@next360/ui'
import Link from 'next/link'
import { notFound, useRouter } from 'next/navigation'

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { id } = use(params)
  const order = MOCK_ORDERS.find(o => o.id === id)
  
  const addToCart = useCartStore(state => state.addItem)
  const openDrawer = useCartStore(state => state.openDrawer)

  if (!order) return notFound()

  // Define steps
  const allSteps = ['PENDING', 'CONFIRMED', 'PACKED', 'DISPATCHED', 'DELIVERED']
  let currentStepIndex = allSteps.indexOf(order.status)
  if (currentStepIndex === -1 && order.status !== 'CANCELLED' && order.status !== 'REFUNDED') {
    currentStepIndex = 2 // default
  }

  const handleReorder = () => {
    order.items.forEach(item => {
      const mockProduct = {
        id: item.productId,
        name: item.productName,
        price: item.unitPrice,
        images: [item.productImage]
      } as any
      addToCart(mockProduct, item.quantity, item.selectedWeight)
    })
    openDrawer()
    toast.success('Items added to cart')
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 space-y-8 shadow-sm">
      <div className="flex items-center gap-4 mb-2">
        <Link href="/account/orders" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 hover:text-primary transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="font-display text-2xl font-black text-slate-800">Order Details</h1>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 border-b border-slate-100 pb-6">
        <div>
          <h2 className="font-display text-xl font-black text-slate-800 mb-1">
            Order #{order.orderNumber}
          </h2>
          <p className="text-sm font-bold text-slate-400">
            Placed on {new Date(order.placedAt).toLocaleDateString('en-IN', {
              month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
            })}
          </p>
        </div>
        <div className="flex-shrink-0">
          <OrderStatusBadge status={order.status} />
        </div>
      </div>

      {/* Section: Timeline */}
      {order.status !== 'CANCELLED' && order.status !== 'REFUNDED' && (
        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-4 text-sm uppercase tracking-widest">Order Status</h3>
          <div className="relative flex justify-between">
            <div className="absolute left-0 right-0 top-3 h-0.5 bg-slate-200 -z-0" />
            
            {allSteps.map((step, idx) => {
              const isCompleted = idx <= currentStepIndex
              const isCurrent = idx === currentStepIndex
              return (
                <div key={step} className="flex flex-col items-center relative z-10 gap-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-colors ${
                    isCompleted 
                      ? 'bg-secondary border-secondary text-white' 
                      : 'bg-white border-slate-200 text-transparent'
                  } ${isCurrent ? 'ring-4 ring-secondary/20' : ''}`}>
                    {isCompleted && <Check size={12} strokeWidth={4} />}
                  </div>
                  <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider text-center max-w-[60px] sm:max-w-none leading-tight ${
                    isCurrent ? 'text-secondary' : isCompleted ? 'text-slate-800' : 'text-slate-400'
                  }`}>
                    {step.replace('_', ' ')}
                  </span>
                </div>
              )
            })}
          </div>
          {order.status === 'DISPATCHED' && order.expectedBy && (
            <div className="mt-6 flex items-start gap-2 text-xs font-bold text-amber-600 bg-amber-50 p-3 rounded-lg">
              <Info size={16} className="mt-0.5 shrink-0" />
              <p>Expected delivery by {new Date(order.expectedBy).toLocaleDateString()} end of day.</p>
            </div>
          )}
        </div>
      )}

      {/* Section: Items */}
      <div>
        <h3 className="font-bold text-slate-800 mb-4 text-sm uppercase tracking-widest border-b border-slate-100 pb-2">
          Items ({order.items.length})
        </h3>
        <div className="space-y-4">
          {order.items.map(item => (
            <div key={item.id} className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-50 border border-slate-100 shrink-0 relative">
                <Image 
                  src={item.productImage || '/images/products/placeholder.jpg'} 
                  alt={item.productName} 
                  fill 
                  className="object-cover" 
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-slate-800 truncate leading-tight">{item.productName}</p>
                <p className="text-xs font-bold text-slate-500 mt-1 uppercase tracking-widest">
                  {item.selectedWeight} • Qty {item.quantity}
                </p>
              </div>
              <div className="text-left sm:text-right mt-2 sm:mt-0">
                <p className="font-bold text-slate-800">{formatPrice(item.totalPrice)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section: Address & Payment */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
          <h3 className="font-bold text-slate-500 text-xs uppercase tracking-widest mb-2">Delivery Address</h3>
          {order.address ? (
            <>
              <p className="font-bold text-sm text-slate-800 mb-0.5">{order.address.name}</p>
              <p className="text-sm font-medium text-slate-600 leading-snug">
                {order.address.street}, {order.address.landmark ? `${order.address.landmark}, ` : ''}
                {order.address.city}, {order.address.state} {order.address.pincode}
              </p>
              <p className="text-sm font-medium text-slate-600 mt-2 flex items-center gap-1">
                📞 {order.address.phone}
              </p>
            </>
          ) : (
            <p className="text-sm text-slate-500 italic">Address details unavailable.</p>
          )}
        </div>
        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
          <h3 className="font-bold text-slate-500 text-xs uppercase tracking-widest mb-2">Payment Method</h3>
          <p className="font-bold text-sm text-slate-800">{order.paymentMethod.replace('_', ' ')}</p>
          {order.paymentId && (
            <p className="text-xs font-mono text-slate-500 mt-1 break-all">Ref: {order.paymentId}</p>
          )}
        </div>
      </div>

      {/* Section: Price Breakdown */}
      <div className="border-t border-slate-100 pt-6">
        <div className="w-full md:w-1/2 ml-auto space-y-2 text-sm">
          <div className="flex justify-between text-slate-600 font-medium">
            <span>Subtotal</span>
            <span className="font-bold text-slate-800">{formatPrice(order.subtotal)}</span>
          </div>
          <div className="flex justify-between text-slate-600 font-medium">
            <span>Delivery Fee</span>
            {order.deliveryFee === 0 ? (
              <span className="font-bold text-secondary">Free</span>
            ) : (
              <span className="font-bold text-slate-800">{formatPrice(order.deliveryFee)}</span>
            )}
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between text-secondary font-medium">
              <span>Discount</span>
              <span className="font-bold">- {formatPrice(order.discount)}</span>
            </div>
          )}
          <div className="flex justify-between font-black text-lg text-slate-800 pt-2 border-t border-slate-100 mt-2">
            <span>Total</span>
            <span>{formatPrice(order.total)}</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-slate-100">
        {order.status === 'DELIVERED' && (
           <Button variant="primary" onClick={handleReorder} className="flex-1 font-bold">
             Reorder All Items
           </Button>
        )}
        {['PENDING', 'CONFIRMED'].includes(order.status) && (
          <Button variant="danger" className="flex-1 border-red-500 text-red-500 hover:bg-red-50 font-bold"
            onClick={() => {
               toast.success('Cancellation request sent. (Mock)')
               router.push('/account/orders')
            }}>
            Cancel Order
          </Button>
        )}
        <Button variant="ghost" className="flex-1 font-bold text-slate-500 hover:text-slate-800"
          onClick={() => toast.success('Invoice download started')}>
          <Download size={16} className="mr-2" />
          Download Invoice
        </Button>
      </div>
    </div>
  )
}
