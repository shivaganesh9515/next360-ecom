'use client'

import { useQuery } from '@tanstack/react-query'
import { adminService } from '../../../services/adminService'
import { ArrowLeft, MapPin, Package, CreditCard, Clock } from 'lucide-react'
import Link from 'next/link'
import { use } from 'react'
import { format } from 'date-fns'
import { OrderStatusBadge } from '../../../components/orders/OrderStatusBadge'
import { OrderStatusUpdater } from '../../../components/orders/OrderStatusUpdater'

export default function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  
  const { data, isLoading } = useQuery({
    queryKey: ['admin-order', id],
    queryFn: () => adminService.getOrderById(id)
  })

  if (isLoading) {
    return (
      <div className="p-12 flex justify-center">
        <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
      </div>
    )
  }

  if (!data?.order) return <div>Order not found</div>
  const order = data.order

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/orders" className="p-2 border border-border rounded-xl hover:bg-gray-50 text-gray-500 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-display font-semibold text-gray-900 leading-none">
                Order #{order.id.slice(-8).toUpperCase()}
              </h2>
              <OrderStatusBadge status={order.status} />
            </div>
            <p className="text-muted text-sm mt-1.5 flex items-center gap-2">
              <Clock className="w-3.5 h-3.5" />
              {format(new Date(order.createdAt), 'MMMM d, yyyy • HH:mm a')}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <OrderStatusUpdater orderId={order.id} currentStatus={order.status} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
              <Package className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-gray-900">Order Items</h3>
            </div>
            
            <div className="space-y-4">
              {order.items?.map((item: any) => (
                <div key={item.id} className="flex items-center justify-between pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-xl border border-border flex-shrink-0 overflow-hidden">
                      {item.product?.images?.[0] && (
                        <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{item.product?.name || 'Unknown Product'}</p>
                      <p className="text-sm text-gray-500 mt-0.5">₹{item.price.toLocaleString()} x {item.quantity}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">₹{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100 space-y-3 pl-[60%]">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span>₹{(order.total - (order.deliveryFee || 0)).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Delivery Fee</span>
                <span>₹{order.deliveryFee?.toLocaleString() || 0}</span>
              </div>
              {order.couponId && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Discount</span>
                  <span>-₹{((order.discountAmount || 0)).toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-lg font-bold text-gray-900 pt-3 border-t border-gray-100">
                <span>Total</span>
                <span>₹{order.total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
              <CreditCard className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-gray-900">Payment Details</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-6 text-sm">
              <div>
                <p className="text-gray-500 mb-1">Payment Method</p>
                <p className="font-medium text-gray-900 uppercase">{order.paymentMethod || 'RAZORPAY'}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Payment Status</p>
                <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold uppercase ${
                  order.paymentStatus === 'COMPLETED' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {order.paymentStatus}
                </span>
              </div>
              {order.razorpayOrderId && (
                <div className="col-span-2">
                  <p className="text-gray-500 mb-1">Transaction ID</p>
                  <p className="font-mono text-gray-900">{order.razorpayOrderId}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-4 border-b border-gray-100">Customer</h3>
            {order.user ? (
              <div className="space-y-3">
                <p className="font-medium text-gray-900 text-base">{order.user.name}</p>
                <p className="text-gray-600">{order.user.email}</p>
                <Link href={`/users/${order.user.id}`} className="text-primary hover:underline block mt-2">
                  View full profile
                </Link>
              </div>
            ) : (
              <p className="text-gray-500 italic">Guest Customer</p>
            )}
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-sm">
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
              <MapPin className="w-5 h-5 text-gray-400" />
              <h3 className="text-lg font-semibold text-gray-900">Shipping Address</h3>
            </div>
            
            {order.shippingAddress ? (
              <div className="space-y-1 text-gray-600 leading-relaxed">
                <p className="font-medium text-gray-900">{order.shippingAddress.name}</p>
                <p>{order.shippingAddress.street}</p>
                <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.pinCode}</p>
                <p className="pt-2"><strong>Phone:</strong> {order.shippingAddress.phone}</p>
              </div>
            ) : (
             <p className="text-gray-500 italic">No shipping details</p>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}
