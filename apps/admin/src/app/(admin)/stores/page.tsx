'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Store, MapPin, ChevronRight, MoreHorizontal } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { cn } from '@/lib/utils'

const mockStores = [
  { id: 'STR-01', name: 'Hyderabad Farmers Market', owner: 'Sri Lakshmi Farms', zone: 'Banjara Hills', products: 48, revenue: '₹2.4L', status: 'Active' },
  { id: 'STR-02', name: 'Organic Pulse Hub', owner: 'Heritage Co-op', zone: 'Madhapur', products: 32, revenue: '₹1.1L', status: 'Active' },
  { id: 'STR-03', name: 'GreenRoots Storefront', owner: 'GreenRoots Agri', zone: 'Gachibowli', products: 21, revenue: '₹780k', status: 'Pending Review' },
  { id: 'STR-04', name: 'Rythu Bazar Kurnool', owner: 'Rythubhoomi Collective', zone: 'Kurnool', products: 14, revenue: '₹320k', status: 'Suspended' },
  { id: 'STR-05', name: 'Valley Harvest Shop', owner: 'Organic Valley Hub', zone: 'Medak', products: 27, revenue: '₹1.8L', status: 'Active' },
]

const statusStyle: Record<string, string> = {
  Active: 'border-secondary text-secondary bg-secondary/5',
  'Pending Review': 'border-amber-500 text-amber-500 bg-amber-500/5',
  Suspended: 'border-red-500 text-red-500 bg-red-500/5',
}

export default function AdminStoresPage() {
  const [search, setSearch] = useState('')
  const filtered = mockStores.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) || s.zone.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-12 font-sans pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Storefront Directory</span>
          </div>
          <h1 className="text-6xl font-display font-black text-white tracking-tighter leading-none">Stores</h1>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-lg group">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-secondary transition-colors" />
        <input
          placeholder="Search by store name or zone..."
          className="w-full bg-white/5 border border-white/5 rounded-2xl h-14 pl-14 pr-6 text-sm text-white focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-all font-medium"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Stores Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filtered.map((store, i) => (
          <motion.div key={store.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
            <Card className="bg-[#111] border-white/5 p-8 group hover:border-white/10 transition-all cursor-pointer">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-secondary">
                    <Store className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-lg font-display font-black text-white group-hover:text-secondary transition-colors leading-tight">{store.name}</h3>
                    <p className="text-[10px] text-white/30 font-medium mt-1">{store.owner}</p>
                  </div>
                </div>
                <button className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all flex-shrink-0">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-[10px] font-black uppercase text-white/20 tracking-widest">Products</p>
                  <p className="text-2xl font-display font-black text-white mt-1">{store.products}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-white/20 tracking-widest">Revenue</p>
                  <p className="text-2xl font-display font-black text-white mt-1">{store.revenue}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-white/20 tracking-widest">Zone</p>
                  <div className="flex items-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-secondary" />
                    <p className="text-xs font-bold text-white/70 leading-tight">{store.zone}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
                <span className={cn("text-[10px] font-black uppercase tracking-widest py-1.5 px-3 rounded-xl border", statusStyle[store.status])}>
                  {store.status}
                </span>
                <button className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
