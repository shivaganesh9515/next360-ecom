"use client"

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { m, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { cn } from '@next360/utils'
import { useQuery } from '@tanstack/react-query'
import { productService } from '@/services/productService'
import ProductCard from '../product/ProductCard'
import ProductCardSkeleton from '../product/ProductCardSkeleton'

interface FeaturedProductsProps {
  activeMoodTags: string[]
}

type TabType = 'bestsellers' | 'new' | 'sale'

export default function FeaturedProducts({ activeMoodTags }: FeaturedProductsProps) {
  const [activeTab, setActiveTab] = useState<TabType>('bestsellers')

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products', 'featured'],
    queryFn: productService.getFeatured,
    staleTime: 60 * 60 * 1000,
  })

  const filteredProducts = useMemo(() => {
    let list = [...products]

    // Filter by mood first
    if (activeMoodTags.length > 0) {
      list = list.filter(p => 
        p.healthGoalTags?.some(tag => activeMoodTags.includes(tag))
      )
    }

    // Sort/Filter by tab
    switch (activeTab) {
      case 'bestsellers':
        return list.sort((a, b) => (b.orderCount || 0) - (a.orderCount || 0)).slice(0, 8)
      case 'new':
        return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 8)
      case 'sale':
        return list.filter(p => p.price < (p.originalPrice || 0)).slice(0, 8)
      default:
        return list.slice(0, 8)
    }
  }, [products, activeTab, activeMoodTags])

  const tabs = [
    { id: 'bestsellers', label: 'Best Sellers' },
    { id: 'new', label: 'New Arrivals' },
    { id: 'sale', label: 'On Sale' }
  ]

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div className="max-w-xl">
            <h2 className="font-display text-4xl md:text-5xl text-primary font-bold mb-4">
              This Week's Farm Picks
            </h2>
            <p className="text-slate-500 text-lg font-body">
              Hand-picked organic essentials, harvested at their nutritional peak.
            </p>
          </div>
          <Link 
            href="/shop" 
            className="group flex items-center gap-2 text-primary font-bold tracking-widest uppercase text-sm"
          >
            View All Products
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 p-1 bg-slate-50 rounded-full w-fit mb-12 border border-slate-100">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={cn(
                "px-8 py-3 rounded-full text-sm font-bold transition-all duration-300",
                activeTab === tab.id 
                  ? "bg-primary text-white shadow-lg" 
                  : "text-slate-500 hover:text-primary"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="min-h-[600px]">
          <AnimatePresence mode="wait">
            <m.div
              key={activeTab + activeMoodTags.join(',')}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
            >
              {isLoading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))
              ) : filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <div className="col-span-full py-20 bg-cream/30 rounded-[3rem] text-center border-2 border-dashed border-slate-100">
                  <span className="text-4xl mb-4 block">🧐</span>
                  <h3 className="text-xl font-bold text-primary mb-2">No matches found</h3>
                  <p className="text-slate-500">Try adjusting your filters or browsing all categories.</p>
                </div>
              )}
            </m.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
