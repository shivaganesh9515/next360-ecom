"use client"

import React from 'react'
import { X } from 'lucide-react'
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
  filters.certified.forEach(cert => {
    activeFilters.push({ key: 'certified', value: cert, label: cert })
  })
  filters.healthGoals.forEach(goal => {
    activeFilters.push({ key: 'healthGoals', value: goal, label: goal })
  })

  if (activeFilters.length === 0) return null

  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2">Active Filters:</span>
      {activeFilters.map((filter, index) => (
        <button
          key={`${filter.key}-${filter.value || index}`}
          onClick={() => onRemove(filter.key, filter.value)}
          className="group flex items-center gap-1.5 px-3 py-1.5 bg-primary/5 hover:bg-primary/10 text-primary border border-primary/10 rounded-full transition-all"
        >
          <span className="text-xs font-medium">{filter.label}</span>
          <X size={12} className="text-primary/40 group-hover:text-primary transition-colors" />
        </button>
      ))}
      <button
        onClick={onClearAll}
        className="text-xs font-bold text-red-500 hover:text-red-600 transition-colors ml-2"
      >
        Clear All
      </button>
    </div>
  )
}
