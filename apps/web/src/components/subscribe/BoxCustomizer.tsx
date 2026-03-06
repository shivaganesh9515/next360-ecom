"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { Check } from 'lucide-react'
import { toast } from 'sonner'
import { useSubscriptionStore } from '@/store/subscriptionStore'
import { productService } from '@/services/productService'
import { useQuery } from '@tanstack/react-query'
import { formatPrice } from '@next360/utils'
import type { Product } from '@next360/types'

const CATEGORIES = ['All', 'Vegetables', 'Fruits', 'Dairy', 'Pantry']

export default function BoxCustomizer() {
  const { customProducts, toggleCustomProduct } = useSubscriptionStore()
  const [activeCategory, setActiveCategory] = useState('All')

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ['customizer-products', activeCategory],
    queryFn: async () => {
      const res = await productService.getAll({ 
        category: activeCategory === 'All' ? undefined : activeCategory.toUpperCase() as any 
      })
      return (res as any).data || res
    },
  })

  const handleToggle = (product: Product) => {
    const isSelected = customProducts.some(p => p.id === product.id)
    if (!isSelected && customProducts.length >= 8) {
      toast.error('Maximum 8 items allowed per box')
      return
    }
    toggleCustomProduct(product)
  }

  return (
    <div className="bg-white rounded-[32px] border border-slate-100 p-6 md:p-8 shadow-sm h-full flex flex-col relative pb-24">
      <div className="mb-8">
        <h2 className="font-display text-2xl md:text-3xl font-black text-slate-800 mb-2">Customize Your Box</h2>
        <p className="text-slate-500 font-medium text-lg">Select 4–8 products for your weekly delivery.</p>
      </div>

      {/* Categories */}
      <div className="flex items-center gap-3 overflow-x-auto pb-6 mb-2 custom-scrollbar shrink-0">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`shrink-0 px-5 py-2 rounded-full text-sm font-bold transition-all border ${
              activeCategory === cat
                ? 'bg-primary border-primary text-white shadow-md shadow-primary/20'
                : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      {isLoading ? (
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent animate-spin mb-4"></div>
          <p className="font-bold text-slate-400 uppercase tracking-widest text-xs">Fetching items...</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 overflow-y-auto pr-2 custom-scrollbar">
          {Array.isArray(products) && products.map(product => {
            const isSelected = customProducts.some(p => p.id === product.id)
            
            return (
              <div 
                key={product.id}
                onClick={() => handleToggle(product)}
                className={`relative rounded-2xl border-2 p-3 cursor-pointer transition-all duration-300 group flex flex-col ${
                  isSelected 
                    ? 'border-primary bg-primary/5 shadow-md shadow-primary/10' 
                    : 'border-slate-100 bg-white hover:border-slate-300'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center z-10 shadow-sm">
                    <Check size={14} strokeWidth={3} />
                  </div>
                )}
                
                <div className="relative aspect-square rounded-xl bg-slate-50 mb-3 overflow-hidden border border-slate-100">
                  <Image 
                    src={product.images[0]} 
                    alt={product.name} 
                    fill 
                    className={`object-contain p-2 transition-transform duration-500 ${isSelected ? 'scale-105' : 'group-hover:scale-105'}`} 
                  />
                </div>
                
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-800 line-clamp-2 leading-tight mb-1">{product.name}</h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{product.weight[0]}</p>
                  </div>
                  <div className="mt-2 font-black text-slate-800 text-sm">
                    {formatPrice(product.price)}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Progress Bar (Sticky bottom) */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-100 p-6 rounded-b-[32px] shadow-[0_-10px_30px_rgba(0,0,0,0.02)]">
        <div className="flex justify-between items-center mb-3">
          <span className="font-bold text-slate-800">
            <span className={customProducts.length < 4 ? "text-amber-500" : "text-primary"}>
              {customProducts.length}
            </span>
            <span className="text-slate-400">/8 items selected</span>
          </span>
          {customProducts.length < 4 && (
            <span className="text-xs font-bold text-amber-500 bg-amber-50 px-2 py-1 rounded-lg">Pick at least 4</span>
          )}
        </div>
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden flex">
          {[...Array(8)].map((_, i) => (
            <div 
              key={i} 
              className={`h-full flex-1 border-r border-white/50 last:border-0 transition-colors duration-300 ${
                i < customProducts.length ? 'bg-primary' : 'bg-transparent'
              }`} 
            />
          ))}
        </div>
      </div>
    </div>
  )
}
