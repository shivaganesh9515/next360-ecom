"use client"

import React, { useState } from 'react'
import { Heart, ShoppingCart, Star, ShieldCheck, Truck, RefreshCw } from 'lucide-react'
import { Product } from '@next360/types'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import { Button, QuantitySelector, Badge, PriceDisplay } from '@next360/ui'
import { cn } from '@next360/utils'
import { toast } from 'react-hot-toast'

interface ProductInfoProps {
  product: Product
}

const weightOptions = ['250g', '500g', '1kg', '2kg']

export default function ProductInfo({ product }: ProductInfoProps) {
  const [selectedWeight, setSelectedWeight] = useState(product.weight || '500g')
  const [quantity, setQuantity] = useState(1)

  const addItem = useCartStore((state) => state.addItem)
  const openDrawer = useCartStore((state) => state.openDrawer)
  
  // Use try-catch or optional chaining if wishlistStore might not be fully ready/exported
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist)
  const isWishlisted = useWishlistStore((state) => state.isWishlisted(product.id))

  const handleAddToCart = () => {
    addItem(product, quantity, selectedWeight)
    openDrawer()
    toast.success(`${product.name} added to cart!`, {
      icon: '🌿',
      style: {
        borderRadius: '1rem',
        background: '#fff',
        color: '#15803d',
        fontWeight: 'bold',
      },
    })
  }

  const handleWishlist = () => {
    toggleWishlist(product)
    toast(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist', {
      icon: isWishlisted ? '💔' : '❤️',
    })
  }

  return (
    <div className="flex flex-col h-full">
      {/* Category & Badge */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-sm font-bold text-primary uppercase tracking-widest">{product.category?.name}</span>
        <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
        <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">{product.region}</span>
      </div>

      <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-4">
        {product.name}
      </h1>

      <div className="flex items-center gap-6 mb-8">
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={18} 
                className={cn(
                  i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-slate-200"
                )} 
              />
            ))}
          </div>
          <span className="text-lg font-black text-slate-800">{product.rating}</span>
        </div>
        <span className="text-slate-400 font-bold">({product.reviewCount} Reviews)</span>
      </div>

      <div className="mb-8">
        <PriceDisplay 
          price={product.price} 
          originalPrice={product.originalPrice} 
          size="lg" 
        />
        {product.originalPrice > product.price && (
          <Badge variant="sale" className="mt-2 inline-flex">
            Save ₹{(product.originalPrice - product.price) / 100} today
          </Badge>
        )}
      </div>

      <p className="text-slate-500 text-lg leading-relaxed mb-8">
        {product.shortDesc}
      </p>

      {/* Weight Selector */}
      <div className="mb-8">
        <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-4">Select Weight</h3>
        <div className="flex flex-wrap gap-3">
          {weightOptions.map((w) => (
            <button
              key={w}
              onClick={() => setSelectedWeight(w)}
              className={cn(
                "px-6 py-3 rounded-2xl text-sm font-bold transition-all border-2",
                selectedWeight === w
                  ? "bg-primary/5 border-primary text-primary shadow-lg shadow-primary/5"
                  : "bg-white border-slate-100 text-slate-500 hover:border-slate-200"
              )}
            >
              {w}
            </button>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="bg-slate-50 p-2 rounded-2xl border border-slate-100">
          <QuantitySelector 
            value={quantity} 
            onChange={setQuantity}
            max={product.stock}
          />
        </div>
        
        <Button 
          size="lg" 
          className="flex-1 rounded-[1.25rem] text-lg font-black h-auto py-5 shadow-xl shadow-primary/20"
          onClick={handleAddToCart}
          disabled={!product.inStock}
        >
          <ShoppingCart size={22} className="mr-2" />
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </Button>

        <button
          onClick={handleWishlist}
          className={cn(
            "p-5 rounded-[1.25rem] border-2 transition-all",
            isWishlisted 
              ? "bg-red-50 border-red-100 text-red-500" 
              : "bg-white border-slate-100 text-slate-400 hover:text-red-500 hover:border-red-100"
          )}
        >
          <Heart size={24} className={isWishlisted ? "fill-current" : ""} />
        </button>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 bg-cream/30 rounded-[2rem] border border-cream/50">
        <div className="flex flex-col items-center text-center gap-2">
          <div className="p-3 bg-white rounded-2xl text-primary shadow-sm border border-cream/50">
            <Truck size={20} />
          </div>
          <span className="text-xs font-bold text-slate-600">Free Fresh Delivery</span>
        </div>
        <div className="flex flex-col items-center text-center gap-2">
          <div className="p-3 bg-white rounded-2xl text-primary shadow-sm border border-cream/50">
            <ShieldCheck size={20} />
          </div>
          <span className="text-xs font-bold text-slate-600">Organic Certified</span>
        </div>
        <div className="flex flex-col items-center text-center gap-2">
          <div className="p-3 bg-white rounded-2xl text-primary shadow-sm border border-cream/50">
            <RefreshCw size={20} />
          </div>
          <span className="text-xs font-bold text-slate-600">Easy Returns</span>
        </div>
      </div>
    </div>
  )
}
