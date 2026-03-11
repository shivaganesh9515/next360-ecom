"use client"

import React, { useState } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import { ChevronDown, Star } from 'lucide-react'
import { Checkbox, Toggle, Button } from '@next360/ui'
import { CERTIFICATIONS } from '@next360/utils'
import { cn } from '@next360/utils'

export interface ShopFilters {
  category: string
  minPrice: number
  maxPrice: number
  rating: number
  certified: string[]
  inStock: boolean
  sort: string
  page: number
  q: string
  healthGoals: string[]
  deliveryType: string
}

interface FilterSidebarProps {
  filters: ShopFilters
  onChange: (filters: Partial<ShopFilters>) => void
}

export default function FilterSidebar({ filters, onChange }: FilterSidebarProps) {
  const isAnyFilterActive = 
    filters.category !== 'all' || 
    filters.minPrice > 0 || 
    filters.maxPrice < 5000 || 
    filters.rating > 0 || 
    filters.certified.length > 0 || 
    filters.inStock ||
    filters.deliveryType !== 'all'

  const handleClearAll = () => {
    onChange({
      category: 'all',
      minPrice: 0,
      maxPrice: 5000,
      rating: 0,
      certified: [],
      inStock: false,
      healthGoals: [],
      deliveryType: 'all'
    })
  }

  const toggleCertified = (id: string) => {
    const newCertified = filters.certified.includes(id)
      ? filters.certified.filter(c => c !== id)
      : [...filters.certified, id]
    onChange({ certified: newCertified })
  }

  return (
    <aside className="sticky top-28 w-64 flex-shrink-0">
      <div className="bg-white rounded-2xl border border-border shadow-card p-6 space-y-8">
        
        {/* Delivery Speed Filter */}
        <div className="space-y-4">
          <h3 className="text-[10px] text-muted uppercase tracking-[0.15em] font-black">
            Delivery Speed
          </h3>
          <div className="flex flex-wrap gap-2">
            {[
              { label: '⚡ Express (< 1hr)', value: 'HYPERLOCAL' },
              { label: '🚚 1-3 Days', value: 'NATIONAL' },
              { label: 'All', value: 'all' }
            ].map((option) => {
              const isActive = filters.deliveryType === option.value
              return (
                <button
                  key={option.value}
                  onClick={() => onChange({ deliveryType: option.value })}
                  className={cn(
                    "px-3 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-wider transition-all duration-200",
                    isActive 
                      ? "bg-primary text-white border-primary shadow-sm" 
                      : "border-border text-muted hover:border-primary/40 hover:text-primary"
                  )}
                >
                  {option.label}
                </button>
              )
            })}
          </div>
        </div>

        <hr className="border-border/50" />

        {/* Categories (Simplified) */}
        <div className="space-y-4">
          <h3 className="text-[10px] text-muted uppercase tracking-[0.15em] font-black">
            Category
          </h3>
          <div className="space-y-2">
            {['Vegetables', 'Fruits', 'Grains', 'Oils & Ghee'].map(cat => (
              <button
                key={cat}
                onClick={() => onChange({ category: cat.toLowerCase() })}
                className={cn(
                  "block w-full text-left text-xs font-bold transition-colors",
                  filters.category === cat.toLowerCase() ? "text-primary" : "text-muted hover:text-text"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <hr className="border-border/50" />

        {/* Price Range */}
        <div className="space-y-4">
          <h3 className="text-[10px] text-muted uppercase tracking-[0.15em] font-black">
            Price Range
          </h3>
          <div className="flex flex-col gap-3">
            <input 
              type="range" 
              min="0" 
              max="5000" 
              step="100"
              value={filters.maxPrice}
              onChange={(e) => onChange({ maxPrice: Number(e.target.value) })}
              className="accent-primary"
            />
            <div className="flex justify-between text-[10px] font-black text-text">
              <span>₹0</span>
              <span>₹{filters.maxPrice}</span>
            </div>
          </div>
        </div>

        <hr className="border-border/50" />

        {/* Rating */}
        <div className="space-y-4">
          <h3 className="text-[10px] text-muted uppercase tracking-[0.15em] font-black">
            Minimum Rating
          </h3>
          <div className="space-y-2">
            {[4, 3, 2].map((r) => (
              <button
                key={r}
                onClick={() => onChange({ rating: r })}
                className={cn(
                  "flex items-center gap-2 w-full transition-all",
                  filters.rating === r ? "text-primary" : "text-muted"
                )}
              >
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} fill={i < r ? 'currentColor' : 'none'} />
                  ))}
                </div>
                <span className="text-[10px] font-black">& up</span>
              </button>
            ))}
          </div>
        </div>

        {isAnyFilterActive && (
          <div className="pt-2">
            <Button 
              variant="ghost" 
              fullWidth
              size="sm"
              onClick={handleClearAll}
              className="text-red-500 hover:bg-red-50 font-bold uppercase tracking-widest text-[10px] h-10 rounded-xl"
            >
              Clear All
            </Button>
          </div>
        )}
      </div>
    </aside>
  )
}
