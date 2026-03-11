"use client"

import React, { useState } from 'react'
import { Heart, ShoppingCart, Star, ShieldCheck, Truck, RefreshCw } from 'lucide-react'
import { Product } from '@next360/types'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import { Button, QuantitySelector, Badge, PriceDisplay, StaggerContainer } from '@next360/ui'
import { cn, formatPrice } from '@next360/utils'
import { toast } from 'react-hot-toast'

interface ProductInfoProps {
  product: Product
}

const weightOptions = ['250g', '500g', '1kg', '2kg']

export default function ProductInfo({ product }: ProductInfoProps) {
  const [selectedWeight, setSelectedWeight] = useState(product.weight?.[0] || '500g')
  const [quantity, setQuantity] = useState(1)

  const addItem = useCartStore((state) => state.addItem)
  const openDrawer = useCartStore((state) => state.openDrawer)
  
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist)
  const isWishlisted = useWishlistStore((state) => state.isWishlisted(product.id))

  const handleAddToCart = () => {
    addItem(product, quantity, selectedWeight)
    openDrawer()
  }

  const handleWishlist = () => {
    toggleWishlist(product)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Category & Region */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-[11px] font-black text-primary uppercase tracking-[0.2em]">{product.category?.name || 'Produce'}</span>
        <span className="w-1 h-1 rounded-full bg-slate-200" />
        <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">{product.region}</span>
      </div>

      <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1] mb-6">
        {product.name}
      </h1>

      <div className="flex items-center gap-6 mb-10">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={16} 
                className={cn(
                  i < Math.round(product.rating) ? "fill-primary text-primary" : "fill-slate-100 text-slate-100"
                )} 
              />
            ))}
          </div>
          <span className="text-sm font-black text-slate-900">{product.rating}</span>
        </div>
        <span className="text-slate-400 font-bold text-sm tracking-tight">{product.reviewCount} Reviews from verified customers</span>
      </div>

      <div className="mb-10 lg:pr-10">
        <div className="flex items-baseline gap-4 mb-4">
           <p className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
             {formatPrice(product.price)}
           </p>
           {product.originalPrice > product.price && (
             <p className="text-xl text-slate-400 line-through font-medium">
               {formatPrice(product.originalPrice)}
             </p>
           )}
        </div>
        {product.originalPrice > product.price && (
          <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-red-100">
            Limited Time Offer: Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
          </div>
        )}
      </div>

      <p className="text-slate-500 text-lg leading-relaxed mb-10 max-w-xl">
        {product.shortDesc}
      </p>

      {/* Weight Selector */}
      <div className="mb-10">
        <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.2em] mb-4">Quantity Specs</h3>
        <div className="flex flex-wrap gap-2">
          {(product.weight?.length ? product.weight : weightOptions).map((w) => (
            <button
              key={w}
              onClick={() => setSelectedWeight(w)}
              className={cn(
                "px-6 py-2.5 rounded-full text-xs font-black transition-all border-2 uppercase tracking-widest",
                selectedWeight === w
                  ? "bg-slate-900 border-slate-900 text-white"
                  : "bg-white border-slate-100 text-slate-400 hover:border-slate-300 hover:text-slate-700"
              )}
            >
              {w}
            </button>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="flex flex-col sm:flex-row gap-4 mb-12">
        <div className="bg-slate-50 p-2 rounded-full border border-slate-100 flex items-center">
          <QuantitySelector 
            value={quantity} 
            onChange={setQuantity}
            max={product.stock}
            className="border-none bg-transparent"
          />
        </div>
        
        <Button 
          size="lg" 
          variant="primary"
          className="flex-1 font-black uppercase tracking-[0.15em] py-6 shadow-2xl shadow-primary/10"
          onClick={handleAddToCart}
          disabled={!product.inStock}
        >
          {product.inStock ? 'Add to Daily Basket' : 'Currently Unavailable'}
        </Button>

        <button
          onClick={handleWishlist}
          className={cn(
            "p-5 rounded-full border-2 transition-all group",
            isWishlisted 
              ? "bg-red-50 border-red-100 text-red-500" 
              : "bg-white border-slate-100 text-slate-300 hover:text-red-500 hover:border-red-100"
          )}
        >
          <Heart size={24} className={cn("transition-transform group-hover:scale-110", isWishlisted ? "fill-current" : "")} />
        </button>
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100/50">
        <div className="flex flex-col gap-2">
          <Truck size={20} className="text-primary" />
          <span className="text-[11px] font-black text-slate-900 uppercase tracking-widest">Flash Delivery</span>
          <p className="text-[10px] text-slate-500 leading-tight">Same day delivery across enabled zones.</p>
        </div>
        <div className="flex flex-col gap-2">
          <ShieldCheck size={20} className="text-primary" />
          <span className="text-[11px] font-black text-slate-900 uppercase tracking-widest">100% Organic</span>
          <p className="text-[10px] text-slate-500 leading-tight">Verified certifications for every batch.</p>
        </div>
        <div className="flex flex-col gap-2">
          <RefreshCw size={20} className="text-primary" />
          <span className="text-[11px] font-black text-slate-900 uppercase tracking-widest">Quality Return</span>
          <p className="text-[10px] text-slate-500 leading-tight">No questions asked return if not fresh.</p>
        </div>
      </div>
    </div>
  )
}


