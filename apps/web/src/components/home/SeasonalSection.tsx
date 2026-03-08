"use client"

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Calendar } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { productService } from '@/services/productService'
import ProductCard from '../product/ProductCard'
import { RevealText, StaggerContainer, ShimmerSkeleton } from '@next360/ui'

export default function SeasonalSection() {
  const currentMonth = new Date().getMonth() + 1 // 1-12
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]
  const currentMonthName = monthNames[currentMonth - 1]

  const { data: seasonalProducts = [], isLoading } = useQuery({
    queryKey: ['products', 'seasonal'],
    queryFn: productService.getSeasonal,
    staleTime: 60 * 60 * 1000,
  })

  const items = seasonalProducts

  return (
    <section className="py-24 bg-white/50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 rounded-full mb-4">
              <Calendar size={14} className="text-accent" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-accent">Monthly Highlights</span>
            </div>
            <RevealText 
              text={`What's In Season — ${currentMonthName}`} 
              className="font-display text-4xl md:text-5xl text-primary font-bold mb-4" 
            />
            <p className="text-muted text-lg font-sans">
              The freshest, most nutrient-dense picks right now from local farms.
            </p>
          </div>
          <Link 
            href="/shop?seasonal=true" 
            className="group flex items-center gap-2 text-primary font-bold tracking-widest uppercase text-sm border-b-2 border-primary/20 pb-1"
          >
            See All Seasonal 
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Scroll Row */}
        <div className="relative group">
          <StaggerContainer className="flex gap-6 md:gap-8 overflow-x-auto pb-8 scroll-smooth scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="min-w-[280px] md:min-w-[320px] flex-shrink-0 aspect-[3/4]">
                  <ShimmerSkeleton className="w-full h-full" />
                </div>
              ))
            ) : items.length > 0 ? (
              items.map((product) => (
                <div key={product.id} className="min-w-[280px] md:min-w-[320px] flex-shrink-0">
                  <ProductCard product={product} />
                </div>
              ))
            ) : null}
            
            {/* View All Card */}
            <Link 
              href="/shop" 
              className="min-w-[280px] md:min-w-[320px] rounded-[3rem] bg-cream/30 border-2 border-dashed border-primary/20 flex flex-col items-center justify-center gap-4 text-primary hover:bg-cream transition-colors duration-500"
            >
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-xl">
                <ArrowRight size={24} />
              </div>
              <span className="font-bold tracking-widest uppercase text-sm">Browse All Produce</span>
            </Link>
          </StaggerContainer>
        </div>
      </div>
    </section>
  )
}

