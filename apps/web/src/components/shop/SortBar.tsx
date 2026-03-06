"use client"

import React from 'react'
import { LayoutGrid, List, ChevronDown, SlidersHorizontal } from 'lucide-react'
import { cn } from '@next360/utils'

interface SortBarProps {
  total: number
  currentPage: number
  limit: number
  sort: string
  onSortChange: (sort: string) => void
  viewMode: 'grid' | 'list'
  onViewModeChange: (mode: 'grid' | 'list') => void
  onMobileFilterOpen: () => void
}

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest First' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
]

export default function SortBar({
  total,
  currentPage,
  limit,
  sort,
  onSortChange,
  viewMode,
  onViewModeChange,
  onMobileFilterOpen
}: SortBarProps) {
  const from = (currentPage - 1) * limit + 1
  const to = Math.min(currentPage * limit, total)

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white rounded-3xl border border-slate-100 p-4 mb-6 shadow-sm">
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <button
          onClick={onMobileFilterOpen}
          className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-primary/5 text-primary rounded-2xl border border-primary/10 text-sm font-bold"
        >
          <SlidersHorizontal size={18} />
          <span>Filters</span>
        </button>
        
        <p className="text-sm font-medium text-slate-500 whitespace-nowrap">
          {total > 0 ? (
            <>Showing <span className="text-slate-900 font-bold">{from}–{to}</span> of <span className="text-slate-900 font-bold">{total}</span> products</>
          ) : (
            "No products found"
          )}
        </p>
      </div>

      <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
        <div className="relative group">
          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value)}
            className="appearance-none bg-slate-50 border-none rounded-2xl px-5 py-2.5 pr-10 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer min-w-[160px]"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-hover:text-primary transition-colors" />
        </div>

        <div className="flex items-center p-1 bg-slate-50 rounded-2xl border border-slate-100">
          <button
            onClick={() => onViewModeChange('grid')}
            className={cn(
              "p-2 rounded-xl transition-all",
              viewMode === 'grid' ? "bg-primary text-white shadow-md shadow-primary/20" : "text-slate-400 hover:text-slate-600"
            )}
            aria-label="Grid view"
          >
            <LayoutGrid size={18} />
          </button>
          <button
            onClick={() => onViewModeChange('list')}
            className={cn(
              "p-2 rounded-xl transition-all",
              viewMode === 'list' ? "bg-primary text-white shadow-md shadow-primary/20" : "text-slate-400 hover:text-slate-600"
            )}
            aria-label="List view"
          >
            <List size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
