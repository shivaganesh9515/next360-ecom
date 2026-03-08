"use client"

import React from 'react'
import { m, AnimatePresence } from 'framer-motion'
import { Product } from '@next360/types'
import { Skeleton, EmptyState } from '@next360/ui'
import ProductCard from '@/components/product/ProductCard'
import { Search } from 'lucide-react'

interface ProductGridProps {
  products: Product[]
  isLoading: boolean
  viewMode: 'grid' | 'list'
}

const ProductCardSkeleton = () => (
  <div className="space-y-4">
    <Skeleton className="aspect-square rounded-3xl" />
    <div className="space-y-2">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <div className="flex justify-between items-center pt-2">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-10 w-10 rounded-xl" />
      </div>
    </div>
  </div>
)

const ProductListSkeleton = () => (
  <div className="flex gap-6 p-4 rounded-3xl border border-border bg-surface">
    <Skeleton className="w-[120px] h-[120px] rounded-2xl shrink-0" />
    <div className="flex-1 space-y-3 py-2">
      <Skeleton className="h-5 w-1/3" />
      <Skeleton className="h-4 w-1/4" />
      <Skeleton className="h-4 w-3/4" />
      <div className="flex justify-between items-center pt-2">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-10 w-32 rounded-xl" />
      </div>
    </div>
  </div>
)

export default function ProductGrid({ products, isLoading, viewMode }: ProductGridProps) {
  if (isLoading) {
    return (
      <div className={viewMode === 'grid' ? "grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "flex flex-col gap-4"}>
        {[...Array(8)].map((_, i) => (
          viewMode === 'grid' ? <ProductCardSkeleton key={i} /> : <ProductListSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <EmptyState
        icon={<Search size={48} className="text-ink-faint" />}
        title="No Products Found"
        description="We couldn't find any products matching your filters. Try adjusting your search or clear all filters."
      />
    )
  }

  return (
    <m.div
      layout
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.05
          }
        }
      }}
      className={viewMode === 'grid' ? "grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "flex flex-col gap-4"}
    >
      <AnimatePresence mode="popLayout">
        {products.map((product) => (
          <m.div
            layout
            key={product.id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            exit={{ opacity: 0, scale: 0.9, filter: 'blur(4px)' }}
          >
            {viewMode === 'grid' ? (
              <ProductCard product={product} />
            ) : (
              <div className="flex flex-col sm:flex-row gap-6 p-4 rounded-3xl border border-border bg-surface hover:shadow-xl hover:shadow-primary/5 transition-all group">
                <div className="relative w-full sm:w-[180px] aspect-square rounded-2xl overflow-hidden bg-cream shrink-0 border border-border">
                  <img 
                    src={product.images[0]} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between py-2">
                  <div>
                    <h3 className="text-lg font-bold text-text mb-1 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-sm font-medium text-muted capitalize">{product.category?.name}</span>
                      <span className="w-1 h-1 rounded-full bg-border" />
                      <div className="flex items-center gap-1 text-yellow-400">
                        <span className="text-sm font-bold">{product.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted line-clamp-2 leading-relaxed">
                      {product.shortDesc}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black text-primary">₹{product.price / 100}</span>
                      {product.originalPrice > product.price && (
                        <span className="text-sm text-muted line-through">₹{product.originalPrice / 100}</span>
                      )}
                    </div>
                    <button className="px-6 py-3 bg-primary text-white font-bold rounded-full shadow-[0_10px_22px_rgba(30,59,47,0.2)] hover:scale-105 active:scale-95 transition-all">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            )}
          </m.div>
        ))}
      </AnimatePresence>
    </m.div>
  )
}


