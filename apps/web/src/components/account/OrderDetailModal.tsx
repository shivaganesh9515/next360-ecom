"use client"

import React from 'react'
import { Modal, Button } from '@next360/ui'
import { Order } from '@next360/types'
import OrderStatusBadge from '@/components/account/OrderStatusBadge'
import Image from 'next/image'
import { formatPrice } from '@next360/utils'
import { Check, Download, Info } from 'lucide-react'
import { toast } from 'sonner'
import { useCartStore } from '@/store/cartStore'

interface OrderDetailModalProps {
  order: Order | null
  isOpen: boolean
  onClose: () => void
}

export default function OrderDetailModal({ order, isOpen, onClose }: OrderDetailModalProps) {
  const addToCart = useCartStore(state => state.addItem)
  const openDrawer = useCartStore(state => state.openDrawer)

  if (!order) return null

  // Define steps
  const allSteps = ['PENDING', 'CONFIRMED', 'PACKED', 'DISPATCHED', 'DELIVERED']
  let currentStepIndex = allSteps.indexOf(order.status)
  if (currentStepIndex === -1 && order.status !== 'CANCELLED' && order.status !== 'REFUNDED') {
    currentStepIndex = 2 // default to something if unknown but active
  }

  const handleReorder = () => {
    // Add all items to cart (using basic product info)
    order.items.forEach(item => {
      // Mock Product construct for addItem
      const mockProduct = {
        id: item.productId,
        name: item.productName,
        price: item.unitPrice,
        images: [item.productImage]
      } as any
      addToCart(mockProduct, item.quantity, item.selectedWeight)
    })
    openDrawer()
    onClose()
    toast.success('Items added to cart')
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <div className="p-10 md:p-16 space-y-12 max-h-[90vh] overflow-y-auto custom-scrollbar bg-white rounded-[3rem]">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-slate-100 transition-colors" />
          
          <div className="relative z-10">
            <div className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-4 flex items-center gap-3 italic">
               <span className="w-8 h-[2.5px] bg-primary" /> Trace Manifest
            </div>
            <h2 className="text-4xl font-black text-slate-900 italic tracking-tighter leading-none mb-3">
              Deployment #{order.orderNumber}
            </h2>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2">
              Timestamp <span className="text-slate-900 flex items-center gap-1">• {new Date(order.placedAt).toLocaleDateString('en-IN', {
                month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
              })}</span>
            </p>
          </div>
          <OrderStatusBadge status={order.status} />
        </div>

        {/* Section: Logic Timeline */}
        {order.status !== 'CANCELLED' && order.status !== 'REFUNDED' && (
          <div className="bg-slate-50 rounded-[2.5rem] p-10 border border-slate-100 relative group/timeline">
            <div className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-10 italic">Operational Progression</div>
            
            <div className="relative flex justify-between">
              <div className="absolute left-0 right-0 top-3.5 h-[3px] bg-slate-200/60 -z-0" />
              
              {allSteps.map((step, idx) => {
                const isCompleted = idx <= currentStepIndex
                const isCurrent = idx === currentStepIndex
                return (
                  <div key={step} className="flex flex-col items-center relative z-10 gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border-[3px] transition-all duration-700 ${
                      isCompleted 
                        ? 'bg-primary border-primary text-white shadow-xl shadow-primary/20 scale-110' 
                        : 'bg-white border-slate-200 text-transparent scale-100'
                    } ${isCurrent ? 'ring-8 ring-primary/10' : ''}`}>
                      {isCompleted && <Check size={14} strokeWidth={4} />}
                    </div>
                    <span className={`text-[9px] font-black uppercase tracking-widest text-center max-w-[80px] leading-tight italic transition-colors duration-500 ${
                      isCurrent ? 'text-primary' : isCompleted ? 'text-slate-900' : 'text-slate-400'
                    }`}>
                      {step.replace('_', ' ')}
                    </span>
                  </div>
                )
              })}
            </div>
            {order.status === 'DISPATCHED' && order.expectedBy && (
              <div className="mt-12 flex items-start gap-5 text-[11px] font-black text-slate-900 bg-white p-6 rounded-[1.5rem] border border-slate-100 shadow-xl shadow-slate-200/40">
                <div className="w-8 h-8 rounded-xl bg-primary text-white flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
                  <Info size={16} strokeWidth={3} />
                </div>
                <div>
                   <p className="uppercase tracking-[0.1em] opacity-40 mb-1">Expected Delivery Signal</p>
                   <p className="tracking-tight italic">{new Date(order.expectedBy).toLocaleDateString()} end of day.</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Section: Inventory Manifest */}
        <div>
          <div className="flex items-end justify-between mb-8 border-b border-slate-100 pb-6">
             <h3 className="text-xl font-black text-slate-900 italic tracking-tighter leading-none">Resource Manifest</h3>
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{order.items.length} Nodes Loaded</p>
          </div>
          
          <div className="space-y-6">
            {order.items.map(item => (
              <div key={item.id} className="flex items-center gap-8 group/item hover:bg-slate-50 p-4 rounded-[1.5rem] transition-all">
                <div className="w-20 h-20 rounded-[1.5rem] overflow-hidden bg-slate-50 border border-slate-100 shrink-0 relative group-hover/item:scale-105 transition-transform duration-500">
                  <Image 
                    src={item.productImage || '/images/products/placeholder.jpg'} 
                    alt={item.productName} 
                    fill 
                    className="object-cover" 
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-black text-slate-900 text-lg italic tracking-tight leading-tight group-hover/item:text-primary transition-colors">{item.productName}</p>
                  <p className="text-[10px] font-black text-slate-400 mt-2 uppercase tracking-[0.2em] flex items-center gap-3">
                    {item.selectedWeight} <span className="w-4 h-[1px] bg-slate-200" /> Qty {item.quantity}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-black text-slate-900 text-lg italic tracking-tight">{formatPrice(item.totalPrice)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section: Logistics Node Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-slate-50 rounded-[2rem] p-8 border border-slate-100 group/node hover:border-primary/20 transition-all">
            <div className="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em] mb-6 flex items-center gap-3 italic">
               <span className="w-6 h-[2px] bg-primary group-hover:w-10 transition-all" /> Deployment Terminal
            </div>
            {order.address ? (
              <div className="space-y-4">
                <p className="font-black text-slate-900 text-lg italic tracking-tight">{order.address.name}</p>
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-widest leading-relaxed">
                  {order.address.street}, {order.address.landmark ? `${order.address.landmark}, ` : ''}<br/>
                  {order.address.city}, {order.address.state} {order.address.pincode}
                </div>
                <div className="pt-2">
                  <span className="px-4 py-1.5 bg-white border border-slate-100 rounded-full text-[9px] font-black text-slate-900 uppercase tracking-widest shadow-sm">
                    Ref: {order.address.phone}
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest italic">Terminal Offline</p>
            )}
          </div>
          
          <div className="bg-slate-900 rounded-[2rem] p-8 border border-slate-800 text-white group/pay shadow-xl shadow-slate-900/20">
            <div className="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em] mb-6 flex items-center gap-3 italic">
               <span className="w-6 h-[2px] bg-primary group-hover:w-10 transition-all" /> Settlement Logic
            </div>
            <div className="space-y-4">
               <p className="font-black text-white text-lg italic uppercase tracking-widest">{order.paymentMethod.replace('_', ' ')}</p>
               {order.paymentId ? (
                 <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                    <p className="text-[8px] font-black uppercase tracking-[0.3em] text-slate-500 mb-1">Authorization UID</p>
                    <p className="text-[10px] font-mono text-slate-400 break-all">{order.paymentId}</p>
                 </div>
               ) : (
                 <p className="text-xs font-bold text-slate-500 uppercase tracking-widest italic leading-relaxed">Settlement verification in progress...</p>
               )}
            </div>
          </div>
        </div>

        {/* Section: Settlement Ledger */}
        <div className="border-t border-slate-100 pt-10">
          <div className="w-full md:w-1/2 ml-auto space-y-4">
            <div className="flex justify-between items-center text-[11px] font-black uppercase tracking-[0.15em] text-slate-400">
              <span className="italic">Subtotal Manifest</span>
              <span className="text-slate-900 tracking-tight">{formatPrice(order.subtotal)}</span>
            </div>
            <div className="flex justify-between items-center text-[11px] font-black uppercase tracking-[0.15em] text-slate-400">
              <span className="italic">Logistics Overhead</span>
              {order.deliveryFee === 0 ? (
                <span className="text-primary italic">Zero Fee</span>
              ) : (
                <span className="text-slate-900 tracking-tight">{formatPrice(order.deliveryFee)}</span>
              )}
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between items-center text-[11px] font-black uppercase tracking-[0.15em] text-primary">
                <span className="italic">Optimization Deduct</span>
                <span className="tracking-tight italic">- {formatPrice(order.discount)}</span>
              </div>
            )}
            <div className="flex justify-between items-center font-black text-3xl text-slate-900 pt-6 border-t border-slate-100 mt-4 italic tracking-tighter">
              <span>Final Settlement</span>
              <span className="text-primary tracking-tighter">{formatPrice(order.total)}</span>
            </div>
          </div>
        </div>

        {/* Actions Cluster */}
        <div className="flex flex-col sm:flex-row gap-5 pt-10 border-t border-slate-100">
          {order.status === 'DELIVERED' && (
             <Button variant="primary" onClick={handleReorder} className="flex-1 h-16 rounded-full font-black text-[10px] uppercase tracking-[0.3em] shadow-2xl shadow-primary/20 transition-all active:scale-95">
               Clone This Manifest
             </Button>
          )}
          {['PENDING', 'CONFIRMED'].includes(order.status) && (
            <Button variant="outline" className="flex-1 h-16 rounded-full font-black text-[10px] uppercase tracking-[0.3em] border-red-500/20 text-red-500 hover:bg-red-50 transition-all active:scale-95"
              onClick={() => {
                 toast.success('Termination protocol requested')
                 onClose()
              }}>
              Abort Deployment
            </Button>
          )}
          <Button variant="ghost" className="flex-1 h-16 rounded-full font-black text-[10px] uppercase tracking-[0.3em] text-slate-400 hover:text-slate-900 transition-all border border-slate-50"
            onClick={() => toast.success('Manifest trace file generation started')}>
            <Download size={16} strokeWidth={3} className="mr-3" />
            Download Log
          </Button>
        </div>
      </div>
    </Modal>
  )
}
