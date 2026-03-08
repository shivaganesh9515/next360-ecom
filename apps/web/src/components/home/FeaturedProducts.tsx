"use client"

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { cn } from '@next360/utils'
import { useQuery } from '@tanstack/react-query'
import { productService } from '@/services/productService'
import ProductCard from '../product/ProductCard'
import { RevealText, StaggerContainer, ShimmerSkeleton } from '@next360/ui'

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
    <section className="py-24">
      <div className="max-w-[1240px] mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div className="max-w-xl">
            <RevealText 
              text="This Week's Farm Picks" 
              className="font-display text-4xl md:text-5xl text-primary font-bold mb-4" 
            />
            <p className="text-muted text-lg font-sans">
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
        <div className="flex items-center gap-2 p-1 bg-cream rounded-full w-fit mb-12 border border-border">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={cn(
                "px-8 py-3 rounded-full text-sm font-bold font-sans transition-all duration-300",
                activeTab === tab.id 
                  ? "bg-primary text-white shadow-md" 
                  : "text-muted hover:text-primary"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="min-h-[600px]">
          <AnimatePresence mode="wait">
            <StaggerContainer
              key={activeTab + activeMoodTags.join(',')}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
            >
              {isLoading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="aspect-[3/4]">
                    <ShimmerSkeleton className="w-full h-full" />
                  </div>
                ))
              ) : filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <div className="col-span-full py-20 bg-cream rounded-[3rem] text-center border-2 border-dashed border-border">
                  <span className="text-4xl mb-4 block">🧐</span>
                  <h3 className="text-xl font-bold text-primary mb-2">No matches found</h3>
                  <p className="text-muted">Try adjusting your filters or browsing all categories.</p>
                </div>
              )}
            </StaggerContainer>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}


