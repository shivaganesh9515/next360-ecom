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
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex gap-4 p-4 border-b border-slate-100 last:border-none group"
    >
      <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-cream shrink-0">
        <Image 
          src={item.product.images[0]} 
          alt={item.product.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex-1 flex flex-col justify-between py-1">
        <div>
          <div className="flex justify-between items-start gap-2">
            <h4 className="text-sm font-semibold text-slate-800 line-clamp-2 leading-tight">
              {item.product.name}
            </h4>
            <button 
              onClick={() => removeItem(item.id)}
              className="text-slate-400 hover:text-red-500 transition-colors shrink-0"
              aria-label="Remove item"
            >
              <Trash2 size={18} />
            </button>
          </div>
          <div className="mt-1">
            <Badge variant="info" size="sm" className="bg-cream text-primary border-none">
              {item.selectedWeight}
            </Badge>
          </div>
        </div>

        <div className="flex items-center justify-between mt-3">
          <QuantitySelector 
            value={item.quantity} 
            onChange={(qty) => updateQty(item.id, qty)}
            min={1}
            max={10}
            size="sm"
          />
          <p className="font-bold text-primary">
            {formatPrice(item.product.price * item.quantity)}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
