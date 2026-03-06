"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { m, AnimatePresence } from 'framer-motion'
import { Heart, ShoppingCart, Eye, Star, Check } from 'lucide-react'
import { toast } from 'sonner'
import { cn, formatPrice } from '@next360/utils'
import { Badge, Button, PriceDisplay, RatingStars } from '@next360/ui'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import { Product } from '@next360/types'

interface ProductCardProps {
  product: Product
  showQuickView?: boolean
}

export default function ProductCard({ product, showQuickView = true }: ProductCardProps) {
  const [isAdded, setIsAdded] = useState(false)
  const { isWishlisted, toggleWishlist } = useWishlistStore()
  const { addItem, openDrawer } = useCartStore()

  const wishlisted = isWishlisted(product.id)
  const discountAmount = product.originalPrice - product.price
  const discountPercent = Math.round((discountAmount / product.originalPrice) * 100)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    addItem(product, 1, product.weight?.[0] || '500g')
    setIsAdded(true)
    toast.success(`${product.name} added to cart`, {
      icon: '🌿'
    })

    setTimeout(() => {
      setIsAdded(false)
      openDrawer()
    }, 1500)
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleWishlist(product)
  }

  return (
    <div className="group relative bg-white rounded-3xl border border-slate-100 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
      {/* Image Area */}
      <div className="relative aspect-square overflow-hidden bg-slate-50">
        <Link href={`/product/${product.slug}`}>
          <Image 
            src={product.images[0]} 
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        </Link>
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
          {product.isOrganic && (
            <Badge variant="success" className="bg-white/90 backdrop-blur-sm shadow-sm border-none text-primary font-bold">
              🌿 Organic
            </Badge>
          )}
          {discountPercent > 0 && (
            <Badge variant="sale" className="bg-accent shadow-sm border-none">
              -{discountPercent}%
            </Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <button 
          onClick={handleWishlist}
          className={cn(
            "absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm",
            wishlisted 
              ? "bg-red-50 text-red-500 scale-110" 
              : "bg-white/90 backdrop-blur-sm text-slate-400 hover:text-red-400"
          )}
        >
          <Heart size={20} fill={wishlisted ? "currentColor" : "none"} strokeWidth={2.5} />
        </button>

        {/* Quick View Overlay */}
        {showQuickView && (
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Link href={`/product/${product.slug}`}>
              <Button 
                variant="secondary" 
                size="sm" 
                className="bg-white/95 backdrop-blur-sm text-primary font-bold shadow-xl rounded-full px-6 flex gap-2"
              >
                <Eye size={18} /> Quick View
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* Info Area */}
      <div className="p-5 flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            {product.category?.name || 'Produce'}
          </span>
          <div className="flex items-center gap-1">
            <RatingStars rating={product.rating} size="sm" showCount={false} />
            <span className="text-xs text-slate-400">({product.reviewCount})</span>
          </div>
        </div>
        
        <Link href={`/product/${product.slug}`}>
          <h4 className="text-base font-bold text-slate-800 line-clamp-2 leading-[1.4] hover:text-primary transition-colors min-h-[2.8rem]">
            {product.name}
          </h4>
        </Link>
        
        <div className="flex items-end justify-between mt-1">
          <PriceDisplay 
            price={product.price} 
            originalPrice={product.originalPrice} 
            size="md" 
            className="text-primary font-display"
          />
          <span className="text-xs text-slate-400 font-medium bg-slate-50 px-2 py-1 rounded-lg">
            {product.weight?.[0] || '500g'}
          </span>
        </div>

        <div className="mt-4">
          <Button 
            onClick={handleAddToCart}
            variant="primary"
            className={cn(
              "w-full rounded-2xl py-6 font-bold flex gap-2 transition-all duration-300",
              isAdded ? "bg-primary" : "shadow-lg shadow-primary/10"
            )}
            disabled={!product.inStock || isAdded}
          >
            {isAdded ? (
              <m.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-2">
                <Check size={18} strokeWidth={3} /> Added!
              </m.span>
            ) : (
              <>
                <ShoppingCart size={18} strokeWidth={2.5} /> Add to Cart
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
