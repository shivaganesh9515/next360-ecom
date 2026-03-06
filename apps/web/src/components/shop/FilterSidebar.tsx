"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Star } from 'lucide-react'
import { Checkbox, Toggle, Button, Badge } from '@next360/ui'
import { MOCK_CATEGORIES } from '@/lib/mockData'
import { CERTIFICATIONS, HEALTH_GOALS } from '@next360/utils'
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
}

interface FilterSidebarProps {
  filters: ShopFilters
  onChange: (filters: Partial<ShopFilters>) => void
}

interface FilterSectionProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}

const FilterSection = ({ title, children, defaultOpen = true }: FilterSectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="border-b border-slate-100 last:border-none pb-6 mb-6 last:pb-0 last:mb-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left group"
      >
        <h3 className="text-sm font-bold text-slate-800 tracking-tight uppercase">
          {title}
        </h3>
        <ChevronDown 
          size={18} 
          className={cn(
            "text-slate-400 transition-transform duration-300",
            isOpen && "rotate-180"
          )} 
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pt-4">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FilterSidebar({ filters, onChange }: FilterSidebarProps) {
  const isAnyFilterActive = 
    filters.category !== 'all' || 
    filters.minPrice > 0 || 
    filters.maxPrice < 5000 || 
    filters.rating > 0 || 
    filters.certified.length > 0 || 
    filters.inStock ||
    filters.healthGoals.length > 0

  const handleClearAll = () => {
    onChange({
      category: 'all',
      minPrice: 0,
      maxPrice: 5000,
      rating: 0,
      certified: [],
      inStock: false,
      healthGoals: []
    })
  }

  const toggleCertified = (id: string) => {
    const newCertified = filters.certified.includes(id)
      ? filters.certified.filter(c => c !== id)
      : [...filters.certified, id]
    onChange({ certified: newCertified })
  }

  const toggleHealthGoal = (id: string) => {
    const newGoals = filters.healthGoals.includes(id)
      ? filters.healthGoals.filter(g => g !== id)
      : [...filters.healthGoals, id]
    onChange({ healthGoals: newGoals })
  }

  return (
    <aside className="sticky top-24 h-[calc(100vh-120px)] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-200">
      <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
        {/* Category */}
        <FilterSection title="Category">
          <div className="space-y-2">
            <button
              onClick={() => onChange({ category: 'all' })}
              className={cn(
                "w-full text-left py-1 text-sm transition-colors",
                filters.category === 'all' ? "text-primary font-bold" : "text-slate-500 hover:text-slate-800"
              )}
            >
              All Categories
            </button>
            {MOCK_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => onChange({ category: cat.slug })}
                className={cn(
                  "flex items-center justify-between w-full text-left py-1 text-sm transition-colors",
                  filters.category === cat.slug ? "text-primary font-bold" : "text-slate-500 hover:text-slate-800"
                )}
              >
                <span>{cat.name}</span>
                <span className="text-[10px] text-slate-300 font-mono">({cat._count?.products || 0})</span>
              </button>
            ))}
          </div>
        </FilterSection>

        {/* Price Range */}
        <FilterSection title="Price Range">
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="text-[10px] uppercase font-bold text-slate-400 mb-1 block">Min (₹)</label>
                <input 
                  type="number" 
                  value={filters.minPrice}
                  onChange={(e) => onChange({ minPrice: Number(e.target.value) })}
                  className="w-full h-10 px-3 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="0"
                />
              </div>
              <div className="flex-1">
                <label className="text-[10px] uppercase font-bold text-slate-400 mb-1 block">Max (₹)</label>
                <input 
                  type="number" 
                  value={filters.maxPrice}
                  onChange={(e) => onChange({ maxPrice: Number(e.target.value) })}
                  className="w-full h-10 px-3 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="5000"
                />
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'Under ₹200', min: 0, max: 200 },
                { label: '₹200-₹500', min: 200, max: 500 },
                { label: '₹500+', min: 500, max: 5000 }
              ].map((preset) => (
                <button
                  key={preset.label}
                  onClick={() => onChange({ minPrice: preset.min, maxPrice: preset.max })}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-[10px] font-bold border transition-all",
                    filters.minPrice === preset.min && filters.maxPrice === preset.max
                      ? "bg-primary text-white border-primary"
                      : "bg-white text-slate-500 border-slate-100 hover:border-primary/30"
                  )}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        </FilterSection>

        {/* Rating */}
        <FilterSection title="Minimum Rating">
          <div className="space-y-2">
            {[5, 4, 3, 0].map((r) => (
              <button
                key={r}
                onClick={() => onChange({ rating: r })}
                className={cn(
                  "flex items-center gap-2 w-full p-2 rounded-xl border transition-all",
                  filters.rating === r
                    ? "bg-primary/5 border-primary/20"
                    : "bg-white border-transparent hover:bg-slate-50"
                )}
              >
                <div className="flex gap-0.5">
                  {r === 0 ? (
                    <span className="text-xs text-slate-500 font-medium">Any rating</span>
                  ) : (
                    [...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={14} 
                        className={cn(
                          i < r ? "fill-yellow-400 text-yellow-400" : "text-slate-200"
                        )} 
                      />
                    ))
                  )}
                </div>
                {r > 0 && <span className="text-xs text-slate-500">& above</span>}
              </button>
            ))}
          </div>
        </FilterSection>

        {/* Availability */}
        <FilterSection title="Availability">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">In Stock Only</span>
            <Toggle 
              checked={filters.inStock} 
              onChange={(val) => onChange({ inStock: val })} 
            />
          </div>
        </FilterSection>

        {/* Certifications */}
        <FilterSection title="Certifications">
          <div className="space-y-3">
            {CERTIFICATIONS.map(cert => (
              <div key={cert} className="flex items-center gap-3">
                <Checkbox 
                  id={`cert-${cert}`}
                  checked={filters.certified.includes(cert)}
                  onChange={() => toggleCertified(cert)}
                />
                <label 
                  htmlFor={`cert-${cert}`}
                  className="text-sm text-slate-600 cursor-pointer select-none"
                >
                  {cert}
                </label>
              </div>
            ))}
          </div>
        </FilterSection>

        {/* Health Goals */}
        <FilterSection title="Health Goals">
          <div className="space-y-3">
            {HEALTH_GOALS.map(goal => (
              <div key={goal.id} className="flex items-center gap-3">
                <Checkbox 
                  id={`goal-${goal.id}`}
                  checked={filters.healthGoals.includes(goal.id)}
                  onChange={() => toggleHealthGoal(goal.id)}
                />
                <label 
                  htmlFor={`goal-${goal.id}`}
                  className="text-sm text-slate-600 cursor-pointer select-none flex items-center gap-2"
                >
                  <span className="text-lg opacity-80">{goal.emoji}</span>
                  {goal.label}
                </label>
              </div>
            ))}
          </div>
        </FilterSection>

        {isAnyFilterActive && (
          <div className="pt-6 border-t border-slate-100">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleClearAll}
              className="w-full text-red-500 hover:text-red-600 hover:bg-red-50 h-11 rounded-2xl"
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </aside>
  )
}
