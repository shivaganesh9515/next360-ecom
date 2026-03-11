"use client"

import React from 'react'
import Image from 'next/image'
import { Trash2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { formatPrice } from '@next360/utils'
import { Badge, QuantitySelector } from '@next360/ui'
import { useCartStore } from '@/store/cartStore'
import { CartItem as CartItemType } from '@next360/types'

interface CartItemProps {
  item: CartItemType
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQty, removeItem } = useCartStore()

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="flex gap-5 p-4 bg-white rounded-3xl border border-slate-50 hover:bg-slate-50/50 transition-colors group"
    >
      <div className="relative w-28 h-28 rounded-2xl overflow-hidden bg-slate-50 shrink-0 border border-slate-100 flex items-center justify-center p-4">
        <Image 
          src={item.product.images[0]} 
          alt={item.product.name}
          fill
          className="object-contain p-2 transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <div className="flex-1 flex flex-col justify-between py-0.5">
        <div className="space-y-1">
          <div className="flex justify-between items-start gap-4">
            <h4 className="text-sm font-black text-slate-800 line-clamp-1 group-hover:text-primary transition-colors leading-tight">
              {item.product.name}
            </h4>
            <button 
              onClick={() => removeItem(item.id)}
              className="w-7 h-7 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all shrink-0"
              aria-label="Remove item"
            >
              <Trash2 size={14} />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="green" size="sm" className="bg-primary/5 text-primary text-[9px] font-black border-none uppercase tracking-widest">
              {item.selectedWeight}
            </Badge>
            <span className="w-1 h-1 rounded-full bg-slate-200" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Fresh Pick</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <div className="bg-white rounded-full border border-slate-100 p-1">
            <QuantitySelector 
              value={item.quantity} 
              onChange={(qty) => updateQty(item.id, qty)}
              min={1}
              max={10}
              size="sm"
              className="border-none"
            />
          </div>
          <p className="font-black text-slate-900 text-base">
            {formatPrice(item.product.price * item.quantity)}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
