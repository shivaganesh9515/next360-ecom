'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Image as ImageIcon, Megaphone, Save, Plus, Trash2 } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { cn } from '@/lib/utils'

const defaultBanners = [
  { id: 'b1', title: 'Monsoon Sale – 30% Off Organics', cta: 'Shop Now', active: true },
  { id: 'b2', title: 'New Harvest Collection – Kurnool Farms', cta: 'Explore', active: true },
  { id: 'b3', title: 'Free Delivery on Orders ₹499+', cta: 'Learn More', active: false },
]

export default function AdminContentPage() {
  const [announcement, setAnnouncement] = useState('🌿 Free delivery on orders above ₹499! Use code ORGANIC50 for 10% off.')
  const [banners, setBanners] = useState(defaultBanners)

  const toggleBanner = (id: string) => {
    setBanners(prev => prev.map(b => b.id === id ? { ...b, active: !b.active } : b))
  }

  return (
    <div className="space-y-12 font-sans pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Live Content Editor</span>
          </div>
          <h1 className="text-6xl font-display font-black text-white tracking-tighter leading-none">Content</h1>
        </div>
        <button className="bg-secondary text-white px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-secondary/20 hover:scale-105 transition-all flex items-center gap-2">
          <Save className="w-4 h-4" strokeWidth={3} /> Publish Changes
        </button>
      </div>

      {/* Announcement Bar */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="bg-[#111] border-white/5 p-8">
          <div className="flex items-center gap-3 mb-6">
            <Megaphone className="w-5 h-5 text-amber-400" />
            <h3 className="text-sm font-black uppercase tracking-widest text-white/70">Announcement Bar</h3>
            <span className="text-[10px] font-black text-secondary bg-secondary/10 border border-secondary/20 px-2.5 py-1 rounded-xl">Live</span>
          </div>
          <textarea
            value={announcement}
            onChange={e => setAnnouncement(e.target.value)}
            rows={3}
            className="w-full bg-white/5 border border-white/5 rounded-2xl p-5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-secondary/20 resize-none font-medium"
          />
          <p className="text-[10px] text-white/20 mt-3">{announcement.length} / 200 characters</p>
        </Card>
      </motion.div>

      {/* Banner Management */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <ImageIcon className="w-5 h-5 text-blue-400" />
            <h3 className="text-sm font-black uppercase tracking-widest text-white/70">Homepage Banners</h3>
          </div>
          <button className="flex items-center gap-2 text-[10px] font-black uppercase text-secondary tracking-widest hover:underline">
            <Plus className="w-3 h-3" /> Add Banner
          </button>
        </div>
        <div className="space-y-4">
          {banners.map((banner, i) => (
            <motion.div key={banner.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}>
              <Card className="bg-[#111] border-white/5 p-6 flex items-center gap-6 group hover:border-white/10 transition-all">
                <div className="w-20 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/20">
                  <ImageIcon className="w-8 h-8" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-white">{banner.title}</p>
                  <p className="text-[10px] text-white/30 mt-1 uppercase tracking-widest">CTA: {banner.cta}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleBanner(banner.id)}
                    className={cn(
                      "relative w-14 h-7 rounded-full border transition-all duration-300",
                      banner.active ? "bg-secondary border-secondary" : "bg-white/5 border-white/10"
                    )}
                  >
                    <div className={cn(
                      "absolute top-1 w-5 h-5 rounded-full bg-white shadow-md transition-all duration-300",
                      banner.active ? "left-8" : "left-1"
                    )} />
                  </button>
                  <button className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-red-400 transition-all opacity-0 group-hover:opacity-100">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
