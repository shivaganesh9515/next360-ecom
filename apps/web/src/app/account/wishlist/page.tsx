"use client"

import React, { useEffect, useState } from 'react'
import { Button } from '@next360/ui'
import { Heart } from 'lucide-react'
import Link from 'next/link'
import ProductCard from '@/components/product/ProductCard'
import { useWishlistStore } from '@/store/wishlistStore'
import { useCartStore } from '@/store/cartStore'
import { toast } from 'sonner'

export default function WishlistPage() {
  const { items, removeItem, clearWishlist } = useWishlistStore()
  const addToCart = useCartStore(state => state.addItem)
  const openDrawer = useCartStore(state => state.openDrawer)
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch for persisted store
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear your wishlist?')) {
      clearWishlist()
      toast.success('Wishlist cleared')
    }
  }

  const handleMoveToCart = (product: any) => {
    addToCart(product, 1, product.weight[0]) // using default weight
    removeItem(product.id)
    openDrawer()
    toast.success('Moved to cart!')
  }

  return (
    <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm min-h-[50vh]">
      {/* Header */}
      <div className="p-5 md:p-6 border-b border-border flex justify-between items-center">
        <h1 className="font-display text-2xl font-black text-text">
          Saved Products <span className="text-muted text-lg">({items.length})</span>
        </h1>
        {items.length > 0 && (
          <button 
            onClick={handleClearAll}
            className="text-xs font-bold uppercase tracking-widest text-muted hover:text-red-500 transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Content */}
      {items.length === 0 ? (
        <div className="p-16 text-center flex flex-col items-center justify-center">
          <div className="w-16 h-16 bg-cream/50 rounded-full flex items-center justify-center mb-4">
            <Heart className="text-muted" size={32} />
          </div>
          <h3 className="font-display text-xl font-bold text-text mb-2">No saved products yet</h3>
          <p className="text-muted font-medium mb-6">Tap the ♡ on any product to save it for later.</p>
          <Link href="/shop">
            <Button variant="primary" className="font-bold">Browse Products</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 p-4 md:p-6">
          {items.map(product => (
            <div key={product.id} className="flex flex-col h-full bg-white rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
              <div className="flex-1 relative">
                {/* We use ProductCard which already has styling & wishlist toggle */}
                <ProductCard product={product} />
              </div>
              <div className="px-4 pb-4 bg-white relative z-10 -mt-2">
                <Button 
                  variant="outline" 
                  className="w-full text-xs font-bold py-2 border-primary/20 hover:bg-primary/5 text-primary"
                  onClick={() => handleMoveToCart(product)}
                >
                  Move to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
