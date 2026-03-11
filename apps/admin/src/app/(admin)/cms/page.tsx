'use client'

import { motion } from 'framer-motion'
import { FileText, Image as ImageIcon, Megaphone, ChevronRight, Plus } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { cn } from '@/lib/utils'

const sections = [
  { id: 'banners', label: 'Homepage Banners', desc: 'Manage hero carousel and promotional banners', icon: ImageIcon, count: 4, color: 'text-blue-400 bg-blue-400/10' },
  { id: 'announcements', label: 'Announcements', desc: 'System-wide announcement bar messages', icon: Megaphone, count: 2, color: 'text-amber-400 bg-amber-400/10' },
  { id: 'pages', label: 'Static Pages', desc: 'About, FAQ, Terms and Policy pages', icon: FileText, count: 8, color: 'text-purple-400 bg-purple-400/10' },
]

const recentContent = [
  { title: 'Monsoon Sale Banner', type: 'Banner', status: 'Live', updated: '2h ago' },
  { title: 'Free Delivery Announcement', type: 'Announcement', status: 'Live', updated: '1d ago' },
  { title: 'About Next360 Page', type: 'Page', status: 'Draft', updated: '3d ago' },
  { title: 'Testimonials Section', type: 'Banner', status: 'Scheduled', updated: '5d ago' },
]

const statusStyle: Record<string, string> = {
  Live: 'border-secondary text-secondary bg-secondary/5',
  Draft: 'border-white/20 text-white/50 bg-white/5',
  Scheduled: 'border-blue-400 text-blue-400 bg-blue-400/5',
}

export default function AdminCmsPage() {
  return (
    <div className="space-y-12 font-sans pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Content Management</span>
          </div>
          <h1 className="text-6xl font-display font-black text-white tracking-tighter leading-none">CMS</h1>
        </div>
        <button className="bg-secondary text-white px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-secondary/20 hover:scale-105 transition-all flex items-center gap-2">
          <Plus className="w-4 h-4" strokeWidth={3} /> New Content
        </button>
      </div>

      {/* Section Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sections.map((sec, i) => {
          const Icon = sec.icon
          return (
            <motion.div key={sec.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card className="bg-[#111] border-white/5 p-8 group hover:border-secondary/30 transition-all cursor-pointer">
                <div className="flex items-start justify-between mb-6">
                  <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center", sec.color)}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <span className="text-3xl font-display font-black text-white">{sec.count}</span>
                </div>
                <h3 className="text-lg font-display font-black text-white group-hover:text-secondary transition-colors">{sec.label}</h3>
                <p className="text-[10px] font-medium text-white/30 mt-2 leading-relaxed">{sec.desc}</p>
                <div className="mt-6 flex items-center gap-2 text-secondary text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  Manage <ChevronRight className="w-3 h-3" />
                </div>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Recent Content */}
      <Card className="bg-[#0A0A0A] border-white/5 p-0 overflow-hidden">
        <div className="p-8 border-b border-white/5 flex justify-between items-center">
          <h3 className="text-sm font-black uppercase tracking-widest text-white/70">Recently Updated</h3>
          <button className="text-[10px] font-black uppercase text-secondary tracking-widest hover:underline">View All</button>
        </div>
        <div className="divide-y divide-white/5">
          {recentContent.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.07 }}
              className="p-8 hover:bg-white/[0.02] flex items-center justify-between group"
            >
              <div>
                <p className="text-sm font-bold text-white group-hover:text-secondary transition-colors">{item.title}</p>
                <p className="text-[10px] text-white/30 mt-1 font-medium">{item.type} • {item.updated}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className={cn("text-[10px] font-black uppercase tracking-widest py-1.5 px-3 rounded-xl border", statusStyle[item.status])}>
                  {item.status}
                </span>
                <button className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  )
}
