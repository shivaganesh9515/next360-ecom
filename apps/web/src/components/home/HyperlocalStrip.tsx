"use client"

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { productService } from '@/services/productService'
import { useLocationStore } from '@/store/locationStore'
import { useModeStore } from '@/store/modeStore'
import ProductCard from '../product/ProductCard'
import { Zap } from 'lucide-react'

export default function HyperlocalStrip() {
  const { zoneId, city, deliveryPromise, hyperlocalActive } = useLocationStore()
  const { activeMode } = useModeStore()

  const { data: response, isLoading } = useQuery({
    queryKey: ['products', 'hyperlocal', zoneId, activeMode],
    queryFn: () => productService.getAll({ zoneId, mode: activeMode, deliveryType: 'HYPERLOCAL' }),
    enabled: hyperlocalActive && !!zoneId && !!activeMode
  })

  const products = response?.data || []

  if (!hyperlocalActive || products.length === 0) return null

  return (
    <section className="bg-white py-16 md:py-24 overflow-hidden border-b border-slate-50 font-sans">
      <div className="max-w-[1600px] mx-auto px-8 md:px-12">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
             <div className="h-1 w-6 bg-accent/30 rounded-full" />
             <p className="text-[10px] font-black uppercase tracking-[0.4em] text-accent/80 italic">Network Velocity</p>
          </div>
          <h2 className="font-black text-4xl md:text-6xl text-slate-900 tracking-tighter italic flex items-center gap-4 leading-none">
            <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center shadow-lg shadow-accent/5">
              <Zap className="text-accent" size={28} fill="currentColor" strokeWidth={2.5} />
            </div>
            Express Sequence
          </h2>
          <div className="flex items-center gap-3 mt-6">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
              Protocol: <span className="text-secondary">{deliveryPromise}</span> for <span className="text-slate-900 underline underline-offset-4 decoration-slate-200">{city}</span>
            </p>
            <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
          </div>
        </div>

        <div className="flex gap-8 overflow-x-auto no-scrollbar pb-8 -mx-8 px-8 cursor-grab active:cursor-grabbing">
          {products.map((product) => (
            <div key={product.id} className="shrink-0 w-64 md:w-72 lg:w-80 h-full">
              <ProductCard product={product} className="hover:shadow-2xl hover:shadow-slate-100 transition-all duration-700" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
