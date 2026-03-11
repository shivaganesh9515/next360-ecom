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
    if (window.confirm('Are you sure you want to clear your saved protocol?')) {
      clearWishlist()
      toast.success('Inventory log cleared')
    }
  }

  const handleMoveToCart = (product: any) => {
    addToCart(product, 1, product.weight[0]) // using default weight
    removeItem(product.id)
    openDrawer()
    toast.success('Moved to deployment!')
  }

  return (
    <div className="bg-white rounded-[3rem] border border-slate-100 overflow-hidden shadow-2xl shadow-slate-200/40 min-h-[50vh]">
      {/* Header */}
      <div className="p-8 md:p-12 border-b border-slate-50 flex justify-between items-end">
        <div>
           <div className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-4 flex items-center gap-3 italic">
              <span className="w-8 h-[2.5px] bg-primary" /> Staged Nodes
           </div>
           <h1 className="text-3xl font-black text-slate-900 tracking-tight italic leading-none">
             Haul Manifest <span className="text-slate-300 text-2xl ml-2">[{items.length.toString().padStart(2, '0')}]</span>
           </h1>
        </div>
        {items.length > 0 && (
          <button 
            onClick={handleClearAll}
            className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-red-500 transition-all border-b-2 border-transparent hover:border-red-500/20 pb-1"
          >
            Purge Manifest
          </button>
        )}
      </div>

      {/* Content */}
      {items.length === 0 ? (
        <div className="p-24 text-center flex flex-col items-center justify-center">
          <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-10 shadow-inner border border-slate-100">
            <Heart className="text-slate-200" size={40} strokeWidth={2} />
          </div>
          <h3 className="text-2xl font-black text-slate-900 mb-2 tracking-tight italic">Manifest Empty</h3>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-[11px] mb-12">No nodes have been staged for acquisition</p>
          <Link href="/shop">
            <Button className="rounded-full px-14 h-16 font-black uppercase tracking-[0.2em] text-xs shadow-2xl shadow-primary/20">Initialize Market Scan</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-8 md:p-12 bg-slate-50/50">
          {items.map(product => (
            <div key={product.id} className="flex flex-col h-full bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 hover:shadow-2xl hover:shadow-slate-950/5 transition-all duration-700 group">
              <div className="flex-1 relative">
                {/* We use ProductCard which already has styling & wishlist toggle */}
                <ProductCard product={product} />
              </div>
              <div className="px-8 pb-8 pt-2 bg-white relative z-10 -mt-4">
                <Button 
                  variant="outline" 
                  className="w-full h-12 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border-slate-100 text-slate-400 hover:text-white hover:bg-slate-900 group-hover:border-slate-900 transition-all duration-500"
                  onClick={() => handleMoveToCart(product)}
                >
                  Initialize Haul
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
