import React from 'react'
import Link from 'next/link'
import { MOCK_CATEGORIES } from '@/lib/mockData'

export default function CategoryStrip() {
  return (
    <section className="py-16 bg-cream/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="font-display text-3xl md:text-4xl text-primary font-bold mb-3">Shop by Category</h2>
            <p className="text-slate-500 font-body">Finest selection of farm-fresh organic essentials</p>
          </div>
          <Link 
            href="/shop" 
            className="text-primary font-bold text-sm tracking-widest uppercase hover:underline underline-offset-4 decoration-2"
          >
            Explore All Categories
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 pb-4 md:pb-0">
          {MOCK_CATEGORIES.map((category) => (
            <Link 
              key={category.id} 
              href={`/shop?category=${category.slug}`}
              className="group flex flex-col items-center p-6 bg-white rounded-[2.5rem] border border-slate-100 hover:bg-primary transition-all duration-500 shadow-sm hover:shadow-2xl hover:-translate-y-2"
            >
              <div className="w-20 h-20 rounded-full bg-cream flex items-center justify-center text-4xl mb-4 group-hover:bg-white/10 transition-colors">
                {category.icon}
              </div>
              <h3 className="text-sm font-bold text-slate-800 group-hover:text-white transition-colors text-center">
                {category.name}
              </h3>
              <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400 group-hover:text-white/60 transition-colors mt-2">
                12 Products
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
