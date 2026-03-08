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
    <div className="h-full flex flex-col overflow-hidden bg-white rounded-2xl border border-border transition-all duration-300 hover:shadow-card-hover group">
      {/* Image Area */}
      <div className="relative aspect-square overflow-hidden bg-cream">
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
            <Badge variant="success" className="bg-white/90 backdrop-blur-sm shadow-sm border-none text-primary font-bold font-sans">
              🌿 Organic
            </Badge>
          )}
          {discountPercent > 0 && (
            <Badge variant="sale" className="bg-accent shadow-sm border-none font-bold font-sans">
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
              : "bg-white/90 backdrop-blur-sm text-text hover:text-red-400 hover:scale-110"
          )}
        >
          <Heart size={20} fill={wishlisted ? "currentColor" : "none"} strokeWidth={2.5} />
        </button>

        {/* Quick View Overlay */}
        {showQuickView && (
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Link href={`/product/${product.slug}`} onClick={(e) => e.stopPropagation()}>
              <Button 
                variant="secondary" 
                size="sm" 
                className="bg-white/95 backdrop-blur-sm text-primary font-bold font-sans shadow-xl rounded-full px-6 flex gap-2 hover:scale-105"
              >
                <Eye size={18} /> Quick View
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* Info Area */}
      <div className="p-5 flex flex-col flex-1 gap-2">
        <div className="flex justify-between items-start">
          <span className="text-[10px] font-bold text-muted uppercase tracking-widest font-sans">
            {product.category?.name || 'Produce'}
          </span>
          <div className="flex items-center gap-1">
            <RatingStars rating={product.rating} size="sm" showCount={false} />
            <span className="text-xs text-muted font-sans">({product.reviewCount})</span>
          </div>
        </div>
        
        <Link href={`/product/${product.slug}`} className="flex-1">
          <h4 className="text-base font-bold font-display text-text line-clamp-2 leading-[1.4] hover:text-primary transition-colors">
            {product.name}
          </h4>
        </Link>
        
        <div className="flex items-end justify-between mt-auto pt-2">
          <PriceDisplay 
            price={product.price} 
            originalPrice={product.originalPrice} 
            size="md" 
            className="text-primary font-sans"
          />
          <span className="text-xs text-muted font-medium font-sans bg-cream border border-border px-2 py-1 rounded-lg">
            {product.weight?.[0] || '500g'}
          </span>
        </div>

        <div className="mt-4">
          <Button
            onClick={handleAddToCart}
            disabled={!product.inStock || isAdded}
            className={cn(
              "w-full rounded-xl py-5 font-bold font-sans",
              (!product.inStock || isAdded) && "pointer-events-none opacity-80"
            )}
          >
            <AnimatePresence mode="wait">
              {isAdded ? (
                <m.div key="added" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-2">
                  <Check size={18} strokeWidth={3} /> Added!
                </m.div>
              ) : (
                <m.div key="add" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                  <ShoppingCart size={18} strokeWidth={2.5} /> Add to Cart
                </m.div>
              )}
            </AnimatePresence>
          </Button>
        </div>
      </div>
    </div>
  )
}
