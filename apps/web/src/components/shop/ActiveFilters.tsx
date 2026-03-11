"use client"

import React from 'react'
import { X } from 'lucide-react'
import { m, AnimatePresence } from 'framer-motion'
import { ShopFilters } from './FilterSidebar'

interface ActiveFiltersProps {
  filters: ShopFilters
  onRemove: (key: string, value?: string) => void
  onClearAll: () => void
}

export default function ActiveFilters({ filters, onRemove, onClearAll }: ActiveFiltersProps) {
  const activeFilters = []

  if (filters.category !== 'all') {
    activeFilters.push({ key: 'category', label: `Category: ${filters.category}` })
  }
  if (filters.minPrice > 0) {
    activeFilters.push({ key: 'minPrice', label: `Min: ₹${filters.minPrice}` })
  }
  if (filters.maxPrice < 5000) {
    activeFilters.push({ key: 'maxPrice', label: `Max: ₹${filters.maxPrice}` })
  }
  if (filters.rating > 0) {
    activeFilters.push({ key: 'rating', label: `${filters.rating}★ & above` })
  }
  if (filters.inStock) {
    activeFilters.push({ key: 'inStock', label: 'In Stock' })
  }
  if (filters.deliveryType !== 'all') {
    activeFilters.push({ key: 'deliveryType', label: `Delivery: ${filters.deliveryType}` })
  }
  filters.certified.forEach(cert => {
    activeFilters.push({ key: 'certified', value: cert, label: cert })
  })
  filters.healthGoals.forEach(goal => {
    activeFilters.push({ key: 'healthGoals', value: goal, label: goal })
  })

  if (activeFilters.length === 0) return null

  return (
    <m.div layout className="flex flex-wrap items-center gap-2 mb-6">
      <span className="text-xs font-bold text-muted uppercase tracking-wider mr-2">Active Filters:</span>
      <AnimatePresence mode="popLayout">
        {activeFilters.map((filter, index) => (
          <m.button
            layout
            initial={{ opacity: 0, scale: 0.8, filter: 'blur(4px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.8, filter: 'blur(4px)' }}
            key={`${filter.key}-${filter.value || index}`}
            onClick={() => onRemove(filter.key, filter.value)}
            className="group flex items-center gap-1.5 px-3 py-1.5 bg-primary/5 hover:bg-primary/10 text-primary border border-primary/10 rounded-full transition-colors"
          >
            <span className="text-xs font-medium">{filter.label}</span>
            <X size={12} className="text-primary/40 group-hover:text-primary transition-colors" />
          </m.button>
        ))}
      </AnimatePresence>
      <m.button
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClearAll}
        className="text-xs font-bold text-primary hover:text-primary/90 transition-colors ml-2"
      >
        Clear All
      </m.button>
    </m.div>
  )
}


