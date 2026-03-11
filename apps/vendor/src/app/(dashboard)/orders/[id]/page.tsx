'use client'

import { useState } from 'react'
import { Card, Button, Badge } from '@next360/ui'
import { Package, Truck, CheckCircle, PackageOpen } from 'lucide-react'
import { toast } from 'sonner'
import Image from 'next/image'

export default function VendorOrderDetailPage({ params }: { params: { id: string } }) {
  const [status, setStatus] = useState('PENDING')
  const [updating, setUpdating] = useState(false)

  const mockOrder = {
    id: params.id,
    customerName: 'Riya Singh',
    customerPhone: '+91 9876543210',
    address: 'A-101, Green Valley Apts, Bandra West, Mumbai, 400050',
    status: status,
    items: [
      { id: '1', name: 'Organic Apples', quantity: 2, price: 15000, image: 'https://placehold.co/100x100' },
      { id: '2', name: 'Farm Fresh Tomatoes', quantity: 1, price: 8000, image: 'https://placehold.co/100x100' },
    ],
    subtotal: 38000,
    commission: 5700, // 15%
    netEarnings: 32300,
  }

  const handleUpdateStatus = async (newStatus: string) => {
    setUpdating(true)
    try {
      // await vendorService.updateFulfillment(params.id, { status: newStatus })
      await new Promise(r => setTimeout(r, 800))
      setStatus(newStatus)
      toast.success(`Order marked as ${newStatus}`)
    } catch {
      toast.error('Failed to update status')
    } finally {
      setUpdating(false)
    }
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-border">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text">Order {mockOrder.id}</h1>
          <p className="text-muted mt-1">Please fulfill the items below.</p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant={status === 'PROCESSING' ? 'primary' : 'outline'}
            className={status === 'PROCESSING' ? 'bg-blue-600 hover:bg-blue-700' : ''}
            onClick={() => handleUpdateStatus('PROCESSING')}
            disabled={updating || status === 'SHIPPED' || status === 'DELIVERED'}
          >
            <PackageOpen className="w-4 h-4 mr-2" /> Processing
          </Button>
          <Button 
            variant={status === 'SHIPPED' ? 'primary' : 'outline'}
            className={status === 'SHIPPED' ? 'bg-purple-600 hover:bg-purple-700' : ''}
            onClick={() => handleUpdateStatus('SHIPPED')}
            disabled={updating || status === 'DELIVERED'}
          >
            <Truck className="w-4 h-4 mr-2" /> Shipped
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <div className="p-6 border-b border-border">
              <h2 className="text-lg font-semibold">Items to Fulfill</h2>
            </div>
            <div className="p-6">
              <div className="divide-y divide-border">
                {mockOrder.items.map((item, idx) => (
                  <div key={item.id} className="py-4 flex gap-4">
                    <div className="w-16 h-16 rounded-md overflow-hidden bg-cream relative shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-text">{item.name}</h4>
                      <p className="text-sm text-muted">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-text">₹{(item.price / 100).toLocaleString('en-IN')}</div>
                      <div className="text-xs text-muted">Total: ₹{((item.price * item.quantity) / 100).toLocaleString('en-IN')}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <div className="p-6 border-b border-border">
              <h2 className="text-lg font-semibold">Customer Details</h2>
            </div>
            <div className="p-6 space-y-4 text-sm">
              <div>
                <span className="text-muted block">Name</span>
                <span className="font-medium text-text">{mockOrder.customerName}</span>
              </div>
              <div>
                <span className="text-muted block">Phone</span>
                <span className="font-medium text-text">{mockOrder.customerPhone}</span>
              </div>
              <div>
                <span className="text-muted block">Shipping Address</span>
                <span className="font-medium text-text">{mockOrder.address}</span>
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-6 border-b border-border">
              <h2 className="text-lg font-semibold">Financials</h2>
            </div>
            <div className="p-6 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted">Items Subtotal</span>
                <span className="font-medium text-text">₹{(mockOrder.subtotal / 100).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted">Platform Commission (15%)</span>
                <span className="font-medium text-red-600">-₹{(mockOrder.commission / 100).toLocaleString('en-IN')}</span>
              </div>
              <div className="pt-3 border-t border-border flex justify-between font-bold">
                <span className="text-text">Net Earnings</span>
                <span className="text-green-600">₹{(mockOrder.netEarnings / 100).toLocaleString('en-IN')}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
