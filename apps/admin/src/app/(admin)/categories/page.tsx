'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit, Trash2, Leaf, ShoppingBasket, Droplets, Wheat, Apple, Fish } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { cn } from '@/lib/utils'

const mockCategories = [
  { id: 'CAT-01', name: 'Vegetables', slug: 'vegetables', icon: Leaf, products: 48, active: true, color: 'text-secondary bg-secondary/10' },
  { id: 'CAT-02', name: 'Fruits', slug: 'fruits', icon: Apple, products: 32, active: true, color: 'text-amber-500 bg-amber-500/10' },
  { id: 'CAT-03', name: 'Grains & Pulses', slug: 'grains', icon: Wheat, products: 21, active: true, color: 'text-yellow-400 bg-yellow-400/10' },
  { id: 'CAT-04', name: 'Dairy & Eggs', slug: 'dairy', icon: Droplets, products: 15, active: true, color: 'text-blue-400 bg-blue-400/10' },
  { id: 'CAT-05', name: 'Grocery', slug: 'grocery', icon: ShoppingBasket, products: 64, active: true, color: 'text-purple-400 bg-purple-400/10' },
  { id: 'CAT-06', name: 'Seafood', slug: 'seafood', icon: Fish, products: 12, active: false, color: 'text-cyan-400 bg-cyan-400/10' },
]

export default function AdminCategoriesPage() {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <div className="space-y-12 font-sans pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Taxonomy Control</span>
          </div>
          <h1 className="text-6xl font-display font-black text-white tracking-tighter leading-none">Categories</h1>
        </div>
        <button className="bg-secondary text-white px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-secondary/20 hover:scale-105 transition-all flex items-center gap-2">
          <Plus className="w-4 h-4" strokeWidth={3} /> New Category
        </button>
      </div>

      {/* Summary Banner */}
      <div className="bg-[#0A0A0A] border border-white/5 rounded-[2rem] p-8 flex flex-wrap gap-8">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">Total Categories</p>
          <p className="text-4xl font-display font-black text-white">{mockCategories.length}</p>
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">Active</p>
          <p className="text-4xl font-display font-black text-secondary">{mockCategories.filter(c => c.active).length}</p>
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">Total Products</p>
          <p className="text-4xl font-display font-black text-white">{mockCategories.reduce((s, c) => s + c.products, 0)}</p>
        </div>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {mockCategories.map((cat, i) => {
          const Icon = cat.icon
          return (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              onClick={() => setSelected(selected === cat.id ? null : cat.id)}
            >
              <Card className={cn(
                "bg-[#111] border-white/5 p-8 group cursor-pointer transition-all",
                selected === cat.id ? "border-secondary/40" : "hover:border-white/10"
              )}>
                <div className="flex items-start justify-between mb-6">
                  <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center", cat.color)}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <span className={cn(
                    "text-[10px] font-black uppercase py-1.5 px-3 rounded-xl border",
                    cat.active ? "bg-secondary/10 text-secondary border-secondary/20" : "bg-white/5 text-white/30 border-white/10"
                  )}>
                    {cat.active ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <h3 className="text-xl font-display font-black text-white group-hover:text-secondary transition-colors">{cat.name}</h3>
                <p className="text-[10px] font-medium text-white/30 mt-1 uppercase tracking-widest">/{cat.slug}</p>
                <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
                  <p className="text-sm font-bold text-white/60">{cat.products} products</p>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-red-400 transition-all">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
