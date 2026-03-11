"use client"

import React, { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import FilterSidebar, { ShopFilters } from '@/components/shop/FilterSidebar'
import SortBar from '@/components/shop/SortBar'
import ActiveFilters from '@/components/shop/ActiveFilters'
import ProductGrid from '@/components/shop/ProductGrid'
import MobileFilterDrawer from '@/components/shop/MobileFilterDrawer'
import { Button } from '@next360/ui'
import { ChevronRight, MapPin, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@next360/utils'
import { useQuery } from '@tanstack/react-query'
import { productService } from '@/services/productService'
import { useLocationStore } from '@/store/locationStore'
import { useModeStore } from '@/store/modeStore'
import { PLATFORM_MODE_META } from '@next360/types/location'

const ITEMS_PER_PAGE = 12

export default function ShopClient() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { zoneId, zoneName, deliveryPromise } = useLocationStore()
  const { mode } = useModeStore()
  const modeMeta = PLATFORM_MODE_META[mode]

  // --- State ---
  const [filters, setFilters] = useState<ShopFilters>({
    category: searchParams.get('category') || 'all',
    minPrice: Number(searchParams.get('min')) || 0,
    maxPrice: Number(searchParams.get('max')) || 5000,
    rating: Number(searchParams.get('rating')) || 0,
    certified: searchParams.getAll('certified') || [],
    inStock: searchParams.get('inStock') === 'true',
    sort: searchParams.get('sort') || 'featured',
    page: Number(searchParams.get('page')) || 1,
    q: searchParams.get('q') || '',
    healthGoals: searchParams.getAll('healthGoals') || [],
    deliveryType: searchParams.get('deliveryType') || 'all'
  })

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)

  // --- Queries ---
  const { data: response, isLoading } = useQuery({
    queryKey: ['products', 'all', filters],
    queryFn: () => productService.getAll({
      category: filters.category === 'all' ? undefined : filters.category,
      search: filters.q || undefined,
      sort: filters.sort,
      page: filters.page,
      limit: ITEMS_PER_PAGE,
      minPrice: filters.minPrice || undefined,
      maxPrice: filters.maxPrice || undefined,
      healthGoals: filters.healthGoals.length > 0 ? filters.healthGoals : undefined,
      zoneId: zoneId || undefined,
      mode,
      deliveryType: filters.deliveryType === 'all' ? undefined : (filters.deliveryType as any)
    }),
    staleTime: 5 * 60 * 1000,
  })

  // --- Effect: Sync filters with URL ---
  useEffect(() => {
    const params = new URLSearchParams()
    if (filters.category !== 'all') params.set('category', filters.category)
    if (filters.minPrice > 0) params.set('min', filters.minPrice.toString())
    if (filters.maxPrice < 5000) params.set('max', filters.maxPrice.toString())
    if (filters.rating > 0) params.set('rating', filters.rating.toString())
    filters.certified.forEach(c => params.append('certified', c))
    filters.healthGoals.forEach(g => params.append('healthGoals', g))
    if (filters.inStock) params.set('inStock', 'true')
    if (filters.deliveryType !== 'all') params.set('deliveryType', filters.deliveryType)
    if (filters.sort !== 'featured') params.set('sort', filters.sort)
    if (filters.page > 1) params.set('page', filters.page.toString())
    if (filters.q) params.set('q', filters.q)

    router.push(`/shop?${params.toString()}`, { scroll: false })
  }, [filters, router])

  const products = response?.data || []
  const totalItems = response?.meta?.total || 0
  const totalPages = response?.meta?.totalPages || 1

  // --- Handlers ---
  const handleUpdateFilters = (updates: Partial<ShopFilters>) => {
    setFilters(prev => ({ ...prev, ...updates, page: 1 })) // Reset to page 1 on filter change
  }

  const handleRemoveFilter = (key: string, value?: string) => {
    if (key === 'certified') {
      handleUpdateFilters({ certified: filters.certified.filter(c => c !== value) })
    } else if (key === 'healthGoals') {
      handleUpdateFilters({ healthGoals: filters.healthGoals.filter(g => g !== value) })
    } else if (key === 'minPrice') {
      handleUpdateFilters({ minPrice: 0 })
    } else if (key === 'maxPrice') {
      handleUpdateFilters({ maxPrice: 5000 })
    } else if (key === 'rating') {
      handleUpdateFilters({ rating: 0 })
    } else if (key === 'inStock') {
      handleUpdateFilters({ inStock: false })
    } else if (key === 'category') {
      handleUpdateFilters({ category: 'all' })
    } else if (key === 'q') {
      handleUpdateFilters({ q: '' })
    } else if (key === 'deliveryType') {
      handleUpdateFilters({ deliveryType: 'all' })
    }
  }

  return (
    <div className="min-h-screen bg-transparent pt-24">
      {/* Page Header */}
      <div className="bg-cream/60 border-b border-border py-12 md:py-16">
        <div className="max-w-[1240px] mx-auto px-4 md:px-6 text-center">
          <nav className="flex items-center justify-center gap-2 mb-4 text-sm font-medium font-sans text-muted">
            <Link href="/" className="hover:text-primary">Home</Link>
            <ChevronRight size={14} />
            <span className="text-text font-sans">Shop</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-black text-primary tracking-tight">
            {filters.q ? `Results for "${filters.q}"` : "Next360 Organic Shop"}
          </h1>
          <p className="mt-4 text-muted max-w-xl mx-auto font-medium">
            Explore our curated collection of 100% certified organic produce, delivered fresh from farm to your fork.
          </p>
          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-3 rounded-full border border-primary/10 bg-white/80 px-5 py-3 text-sm text-primary shadow-sm">
            <MapPin className="h-4 w-4" />
            <span>{zoneName ?? 'Hyderabad Prime'}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <Sparkles className="h-4 w-4" />
            <span>{modeMeta.label} mode</span>
            {deliveryPromise && (
              <>
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                <span>{deliveryPromise}</span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="mb-6 rounded-[28px] border border-primary/10 bg-[linear-gradient(135deg,rgba(45,80,22,0.08),rgba(255,255,255,0.85))] p-5 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-[11px] uppercase tracking-[0.22em] text-primary/70">Zone banner</div>
              <h2 className="mt-1 text-2xl font-semibold text-text">Catalog tuned for {zoneName ?? 'your zone'}</h2>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-muted">
                Products, pricing, and delivery promises are filtered by your selected zone and the active storefront mode.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-primary/10 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                {modeMeta.label}
              </span>
              <span className="rounded-full border border-primary/10 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                {zoneId ?? 'zone-hyd'}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="hidden lg:block w-72 flex-shrink-0">
            <FilterSidebar filters={filters} onChange={handleUpdateFilters} />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <SortBar 
              total={totalItems}
              currentPage={filters.page}
              limit={ITEMS_PER_PAGE}
              sort={filters.sort}
              onSortChange={(val) => handleUpdateFilters({ sort: val })}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              onMobileFilterOpen={() => setIsMobileFilterOpen(true)}
            />

            <ActiveFilters 
              filters={filters}
              onRemove={handleRemoveFilter}
              onClearAll={() => handleUpdateFilters({
                category: 'all',
                minPrice: 0,
                maxPrice: 5000,
                rating: 0,
                certified: [],
                inStock: false,
                healthGoals: [],
                q: '',
                deliveryType: 'all'
              })}
            />

            <ProductGrid 
              products={products} 
              isLoading={isLoading} 
              viewMode={viewMode} 
            />

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-16">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={filters.page === 1}
                  onClick={() => handleUpdateFilters({ page: filters.page - 1 })}
                  className="rounded-full"
                >
                  Prev
                </Button>
                
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handleUpdateFilters({ page: i + 1 })}
                    className={cn(
                      "w-10 h-10 rounded-full border text-sm font-bold font-sans transition-all",
                      filters.page === i + 1
                        ? "bg-primary text-white border-primary shadow-md"
                        : "bg-white border-border text-muted hover:border-primary hover:text-primary"
                    )}
                  >
                    {i + 1}
                  </button>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  disabled={filters.page === totalPages}
                  onClick={() => handleUpdateFilters({ page: filters.page + 1 })}
                  className="rounded-full"
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <MobileFilterDrawer 
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        filters={filters}
        onChange={handleUpdateFilters}
        totalResults={totalItems}
      />
    </div>
  )
}
