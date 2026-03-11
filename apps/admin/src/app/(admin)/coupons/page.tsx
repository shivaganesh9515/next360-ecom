'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Trash2, Tag, Percent, Calendar, Users, ChevronRight } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { cn } from '@/lib/utils'

const mockCoupons = [
  { code: 'ORGANIC50', discount: 50, description: 'Flat 50% on first organic order', expires: '2025-03-31', forNewUser: true, forMember: false, uses: 124 },
  { code: 'MEMBER20', discount: 20, description: 'Exclusive 20% for premium members', expires: '2025-06-30', forNewUser: false, forMember: true, uses: 842 },
  { code: 'HARVEST10', discount: 10, description: 'Harvest season special discount', expires: '2025-01-31', forNewUser: false, forMember: false, uses: 56 },
]

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState(mockCoupons)
  const [newCode, setNewCode] = useState('')
  const [newDiscount, setNewDiscount] = useState('')
  const [newDesc, setNewDesc] = useState('')
  const [showForm, setShowForm] = useState(false)

  const handleDelete = (code: string) => {
    setCoupons(prev => prev.filter(c => c.code !== code))
  }

  return (
    <div className="space-y-12 font-sans pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Promotions Engine</span>
          </div>
          <h1 className="text-6xl font-display font-black text-white tracking-tighter leading-none">Coupons</h1>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-secondary text-white px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-secondary/20 hover:scale-105 transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" strokeWidth={3} /> New Coupon
        </button>
      </div>

      {/* Add Coupon Form */}
      {showForm && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="bg-[#111] border-secondary/20 p-8">
            <h3 className="text-sm font-black uppercase tracking-widest text-white/70 mb-6">New Coupon</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text" placeholder="Coupon Code (e.g. SAVE10)"
                value={newCode} onChange={e => setNewCode(e.target.value.toUpperCase())}
                className="bg-white/5 border border-white/10 rounded-2xl h-14 px-5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-secondary/20 font-medium"
              />
              <input
                type="number" placeholder="Discount %" min={1} max={100}
                value={newDiscount} onChange={e => setNewDiscount(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-2xl h-14 px-5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-secondary/20 font-medium"
              />
              <input
                type="text" placeholder="Description"
                value={newDesc} onChange={e => setNewDesc(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-2xl h-14 px-5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-secondary/20 font-medium"
              />
            </div>
            <div className="flex gap-3 mt-4">
              <button className="bg-secondary text-white px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-secondary/90 transition-all">
                Create Coupon
              </button>
              <button onClick={() => setShowForm(false)} className="bg-white/5 border border-white/10 text-white/60 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                Cancel
              </button>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Coupon Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {coupons.map((coupon, i) => (
          <motion.div key={coupon.code} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.09 }}>
            <Card className="bg-[#111] border-white/5 p-8 group hover:border-secondary/30 transition-all relative overflow-hidden">
              <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleDelete(coupon.code)}
                  className="w-9 h-9 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 hover:bg-red-500 hover:text-white transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
                  <Tag className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xl font-display font-black text-white tracking-widest">{coupon.code}</p>
                  <p className="text-[10px] text-white/30 font-medium mt-0.5">{coupon.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-[10px] font-black uppercase text-white/20 tracking-widest flex items-center gap-1"><Percent className="w-3 h-3" /> Discount</p>
                  <p className="text-2xl font-display font-black text-secondary mt-1">{coupon.discount}%</p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-white/20 tracking-widest flex items-center gap-1"><Users className="w-3 h-3" /> Uses</p>
                  <p className="text-2xl font-display font-black text-white mt-1">{coupon.uses}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-white/20 tracking-widest flex items-center gap-1"><Calendar className="w-3 h-3" /> Expires</p>
                  <p className="text-xs font-bold text-white mt-2">{coupon.expires}</p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-white/5 flex gap-2">
                {coupon.forNewUser && (
                  <span className="text-[10px] font-black uppercase bg-blue-400/10 border border-blue-400/20 text-blue-400 px-2.5 py-1 rounded-xl">New Users</span>
                )}
                {coupon.forMember && (
                  <span className="text-[10px] font-black uppercase bg-purple-400/10 border border-purple-400/20 text-purple-400 px-2.5 py-1 rounded-xl">Members</span>
                )}
                {!coupon.forNewUser && !coupon.forMember && (
                  <span className="text-[10px] font-black uppercase bg-white/5 border border-white/10 text-white/30 px-2.5 py-1 rounded-xl">All Users</span>
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
