"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'
import { productService } from '@/services/productService'
import ProductCard from '@/components/product/ProductCard'
import ProductCardSkeleton from '@/components/product/ProductCardSkeleton'

interface RelatedProductsProps {
  currentProductId: string
  category: string
}

export default function RelatedProducts({ currentProductId, category }: RelatedProductsProps) {
  const { data: related = [], isLoading } = useQuery({
    queryKey: ['products', 'related', currentProductId],
    queryFn: () => productService.getRelated(currentProductId),
    staleTime: 60 * 60 * 1000,
  })

  if (!isLoading && related.length === 0) return null

  return (
    <section className="mt-32 pt-20 border-t border-slate-100">
      <div className="flex items-center justify-between mb-12">
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
          You Might Also <span className="text-primary italic">Like</span>
        </h2>
        <div className="hidden md:flex gap-2">
          {/* Scroll indicators or view all */}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))
        ) : related.map((product, idx) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
