"use client"

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { cn } from '@next360/utils'
import { useQuery } from '@tanstack/react-query'
import { productService } from '@/services/productService'
import ProductCard from '../product/ProductCard'
import { Skeleton } from '@next360/ui'
import { useLocationStore } from '@/store/locationStore'
import { useModeStore } from '@/store/modeStore'

interface FeaturedProductsProps {
  activeMoodTags?: string[]
}

type TabType = 'best_sellers' | 'new_arrivals' | 'on_sale' | 'seasonal'

export default function FeaturedProducts({ activeMoodTags = [] }: FeaturedProductsProps) {
  const [activeTab, setActiveTab] = useState<TabType>('best_sellers')
  const { zoneId } = useLocationStore()
  const { activeMode } = useModeStore()

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products', 'featured', zoneId, activeMode],
    queryFn: () => productService.getFeatured({ zoneId, mode: activeMode }),
    staleTime: 5 * 60 * 1000,
  })

  const tabs = [
    { id: 'best_sellers', label: 'Best Sellers' },
    { id: 'new_arrivals', label: 'New Arrivals' },
    { id: 'on_sale', label: 'On Sale' },
    { id: 'seasonal', label: 'Seasonal' }
  ]

  const filteredProducts = useMemo(() => {
    // In real app, the API would return already sorted/filtered list per tab
    // For now, we simulate basic filtering if data is generic
    return products.slice(0, 8)
  }, [products, activeTab])

  return (
    <section className="bg-white py-24 md:py-32 font-sans border-b border-slate-50">
      <div className="max-w-[1600px] mx-auto px-8 md:px-12">
        
        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end gap-10 mb-20">
          <div className="text-center sm:text-left">
            <div className="flex items-center gap-3 mb-4 justify-center sm:justify-start">
               <div className="h-1 w-6 bg-primary/30 rounded-full" />
               <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/60 italic">Registry Selection</p>
            </div>
            <h2 className="font-black text-5xl md:text-7xl text-slate-900 tracking-tighter italic leading-none mb-6">
              Featured Collective
            </h2>
            <p className="text-slate-400 text-sm md:text-lg font-bold italic opacity-60 leading-relaxed max-w-xl">
              Direct from farm to your premium table. High-fidelity verification across every harvest.
            </p>
          </div>
          <Link href="/shop" className="text-slate-400 font-black text-[10px] uppercase tracking-[0.3em] flex items-center gap-3 group bg-slate-50 px-10 py-5 rounded-full border border-slate-100 hover:bg-primary/5 hover:text-primary hover:border-primary/20 hover:scale-[1.05] transition-all duration-500 shadow-sm active:scale-95 shrink-0 whitespace-nowrap">
            Explore All 
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" strokeWidth={3} />
          </Link>
        </div>

        {/* Tab Switcher (Gocart High-Fidelity Pill Style) */}
        <div className="flex justify-center sm:justify-start gap-4 mb-20 overflow-x-auto no-scrollbar py-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={cn(
                  "px-10 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-500 whitespace-nowrap relative group/tab border-none italic",
                  isActive 
                    ? "bg-primary text-white shadow-2xl shadow-primary/30 scale-[1.05]" 
                    : "bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-900 border border-slate-100"
                )}
              >
                <span className="relative z-10">{tab.label}</span>
                {isActive && (
                  <motion.div 
                    layoutId="tab-active"
                    className="absolute inset-0 bg-primary rounded-full -z-0"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            )
          })}
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 1.02 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-10"
          >
            {isLoading ? (
              Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="space-y-6">
                  <Skeleton className="aspect-square rounded-[3rem]" />
                  <Skeleton className="h-4 w-2/3 rounded-full" />
                  <Skeleton className="h-6 w-full rounded-full" />
                  <Skeleton className="h-14 w-full rounded-full" />
                </div>
              ))
                        ) : filteredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.6 }}
              >
                <ProductCard product={product} key={product.id} className="h-full" />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
