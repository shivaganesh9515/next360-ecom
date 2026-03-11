'use client'

import { motion } from 'framer-motion'
import { ProductCard } from '@/components/ui/ProductCard'
import { Badge } from '@/components/ui/Badge'
import { useSelector } from 'react-redux'
import { useCmsStore } from '@/lib/store/cmsStore'

export function BestSellingStrip() {
  const products = useSelector(state => state.product.list)
  const { bestSellingIds } = useCmsStore()
  
  // Filter products by bestSellingIds
  const bestSellers = products.filter(p => bestSellingIds.includes(p.id))

  if (bestSellers.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
       <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-8">
          <div className="space-y-4">
             <Badge variant="organic" className="bg-amber-500/10 text-amber-600 border-none px-4 py-1.5 h-auto uppercase tracking-widest font-black text-[10px]">
                Community Favorites
             </Badge>
             <h2 className="text-4xl font-display font-black text-text tracking-tighter leading-tight">
                Best Selling Harvests
             </h2>
          </div>
       </div>

       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {bestSellers.map((product) => (
             <ProductCard key={product.id} product={product} />
          ))}
       </div>
    </section>
  )
}
