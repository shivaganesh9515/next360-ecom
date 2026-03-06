"use client"

import React from 'react'
import { Drawer, Button } from '@next360/ui'
import FilterSidebar, { ShopFilters } from './FilterSidebar'

interface MobileFilterDrawerProps {
  isOpen: boolean
  onClose: () => void
  filters: ShopFilters
  onChange: (filters: Partial<ShopFilters>) => void
  totalResults: number
}

export default function MobileFilterDrawer({
  isOpen,
  onClose,
  filters,
  onChange,
  totalResults
}: MobileFilterDrawerProps) {
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      position="bottom"
      size="lg"
      title="Filter Products"
    >
      <div className="flex flex-col h-full bg-cream/30">
        <div className="flex-1 overflow-y-auto px-1 py-2">
          {/* We use a slightly different version or just the core logic of FilterSidebar here */}
          {/* For now, we can reuse FilterSidebar but maybe styled differently for mobile if needed */}
          <FilterSidebar filters={filters} onChange={onChange} />
        </div>
        
        <div className="p-4 bg-white border-t border-slate-100 flex gap-3 sticky bottom-0">
          <Button 
            variant="ghost" 
            className="flex-1"
            onClick={() => {
              onChange({
                category: 'all',
                minPrice: 0,
                maxPrice: 5000,
                rating: 0,
                certified: [],
                inStock: false,
                healthGoals: []
              })
            }}
          >
            Clear All
          </Button>
          <Button 
            className="flex-[2]"
            onClick={onClose}
          >
            Show {totalResults} Products
          </Button>
        </div>
      </div>
    </Drawer>
  )
}
