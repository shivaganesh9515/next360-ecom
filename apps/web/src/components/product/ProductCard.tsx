"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, ShoppingCart, Check, Zap, Truck, Star as StarIcon, ChevronRight } from 'lucide-react'
import { toast } from 'sonner'
import { cn, formatPrice } from '@next360/utils'
import { Badge, Button, PriceDisplay, RatingStars, Card } from '@next360/ui'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import { useLocationStore } from '@/store/locationStore'
import { useModeStore } from '@/store/modeStore'
import { Product } from '@next360/types'
import { RythuBatch } from '@next360/types/cms'

interface ProductCardProps {
  product: Product
  batch?: RythuBatch
  className?: string
}

export default function ProductCard({ product, batch, className }: ProductCardProps) {
  const [isAdded, setIsAdded] = useState(false)
  const { isWishlisted, toggleWishlist } = useWishlistStore()
  const { addItem, openDrawer } = useCartStore()
  const { zoneId, deliveryPromise } = useLocationStore()
  const { activeMode } = useModeStore()

  const wishlisted = isWishlisted(product.id)
  const discountPercent = product.originalPrice > 0 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    // If batch exists, price should be batch price
    const finalProduct = batch 
      ? { ...product, price: batch.pricePerUnit } 
      : product

    addItem(finalProduct, 1, product.weight?.[0] || '500g')
    setIsAdded(true)
    toast.success(`${product.name} added to cart`)

    window.setTimeout(() => {
      setIsAdded(false)
      openDrawer()
    }, 1200)
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleWishlist(product)
  }

  const isRythuMode = activeMode === 'RYTHU_BAZAR'
  const availablePercent = batch ? (batch.availableQty / batch.batchQty) * 100 : 0

  return (
    <div 
      className={cn('group flex flex-col h-full bg-white transition-all font-sans', className)}
    >
      {/* Image Area (Gocart High-Fidelity Style) */}
      <div className="relative aspect-square overflow-hidden bg-slate-50/50 rounded-[2.5rem] flex items-center justify-center p-12 mb-6 border border-slate-50 group-hover:border-primary/10 group-hover:bg-primary/5 transition-all duration-700 ease-[0.16, 1, 0.3, 1] shadow-inner">
        <Link href={`/product/${product.slug}`} className="relative w-full h-full">
          <Image
            src={product.images[0] || '/images/placeholder.jpg'}
            alt={product.name}
            fill
            className="object-contain transition-transform duration-1000 ease-[0.16, 1, 0.3, 1] group-hover:scale-115 group-hover:-rotate-3 drop-shadow-[0_20px_40px_rgba(0,0,0,0.08)]"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        </Link>

        {/* Top Badges (Registry Tags) */}
        <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
          {product.isOrganic && (
            <Badge className="bg-primary/10 text-primary border-none rounded-full px-4 py-1.5 font-black text-[9px] uppercase tracking-[0.2em] shadow-sm backdrop-blur-md">Verified Organic</Badge>
          )}
          {discountPercent > 0 && (
            <Badge className="bg-orange-500 text-white border-none rounded-full px-4 py-1.5 font-black text-[9px] uppercase tracking-[0.2em] shadow-lg shadow-orange-500/20">-{discountPercent}% Yield</Badge>
          )}
        </div>

        {/* Quick Add Button — High-Fidelity Floating Style */}
        <button 
          onClick={handleAddToCart}
          disabled={!product.inStock || isAdded}
          className="absolute bottom-6 right-6 w-14 h-14 rounded-full bg-white shadow-2xl flex items-center justify-center text-slate-800 hover:bg-primary hover:text-white transition-all scale-0 group-hover:scale-100 duration-500 hover:scale-110 active:scale-90 border-none group/cart-btn"
        >
          {isAdded ? <Check size={24} strokeWidth={3} className="text-primary group-hover:text-white" /> : <ShoppingCart size={24} strokeWidth={2.5} />}
        </button>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/40 backdrop-blur-xl shadow-sm flex items-center justify-center text-slate-400 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100 z-10 border border-white/20 hover:scale-110 active:scale-90"
        >
          <Heart size={20} fill={wishlisted ? 'currentColor' : 'none'} className={cn("transition-colors", wishlisted ? 'text-red-500' : '')} />
        </button>
      </div>

      {/* Info Area (Gocart Refined Typography) */}
      <div className="flex flex-col flex-1 px-4">
        <div className="flex flex-col gap-1 mb-4">
          <div className="flex items-center gap-1.5 mb-2">
             {[...Array(5)].map((_, i) => (
                <StarIcon 
                  key={i} 
                  size={10} 
                  className={cn(
                    "transition-colors",
                    Math.round(product.rating) >= i + 1 ? "text-primary" : "text-slate-200"
                  )}
                  fill="currentColor"
                  strokeWidth={0}
                />
             ))}
             <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest ml-1">{product.reviewCount} Signals</span>
          </div>
          <Link href={`/product/${product.slug}`}>
            <h3 className="font-black text-lg text-slate-900 tracking-tighter italic leading-none mb-1 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
          </Link>
          <div className="flex items-center gap-2">
             <div className="w-1 h-1 rounded-full bg-slate-200" />
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">{product.category?.name || 'Produce Collective'}</p>
          </div>
        </div>

        <div className="mt-auto pt-2 flex items-center justify-between">
          <div className="flex flex-col">
             <span className="text-[8px] font-black text-slate-300 uppercase tracking-[0.3em] mb-0.5">Asset Val.</span>
             <div className="flex items-baseline gap-2">
              <p className="text-2xl font-black text-slate-900 tracking-tighter italic leading-none">
                {formatPrice(isRythuMode && batch ? batch.pricePerUnit : product.price)}
              </p>
              {discountPercent > 0 && !isRythuMode && (
                <p className="text-xs text-slate-400 line-through font-bold opacity-50 italic">
                  {formatPrice(product.originalPrice)}
                </p>
              )}
             </div>
          </div>
          
          <div className="flex items-center gap-2 text-slate-300 transition-colors group-hover:text-primary">
             <span className="text-[8px] font-black uppercase tracking-widest">Detail</span>
             <ChevronRight size={12} strokeWidth={3} className="group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>

        {/* Platform Details (Rythu Traceability) */}
        {isRythuMode && batch && (
           <div className="mt-6 flex flex-col gap-2 p-4 rounded-[1.5rem] bg-orange-50/50 border border-orange-100 shadow-sm">
              <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-[0.15em] text-orange-700/70">
                 <span className="flex items-center gap-1.5"><div className="w-1 h-1 rounded-full bg-orange-500" /> {batch.farmerName}</span>
                 <span>{batch.availableQty} kg Avail.</span>
              </div>
              <div className="h-1 w-full bg-orange-200/30 rounded-full overflow-hidden">
                 <motion.div 
                   initial={{ width: 0 }}
                   whileInView={{ width: `${availablePercent}%` }}
                   transition={{ duration: 1.5, ease: "easeOut" }}
                   className="h-full bg-orange-500 rounded-full" 
                 />
              </div>
           </div>
        )}
      </div>
    </div>
  )
}
