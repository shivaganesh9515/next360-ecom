'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Settings, Globe, Bell, ShieldCheck, MapPin, Save } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { cn } from '@/lib/utils'

const toggles = [
  { id: 'maintenance', label: 'Maintenance Mode', desc: 'Temporarily disable storefront for all users', value: false },
  { id: 'rythu', label: 'Rythu Bazar Mode', desc: 'Enable RythuBazar section across the platform', value: true },
  { id: 'hyperlocal', label: 'Hyperlocal Delivery', desc: 'Activate radius-based hyperlocal zone routing', value: true },
  { id: 'reviews', label: 'Customer Reviews', desc: 'Allow users to post product reviews', value: true },
  { id: 'notifications', label: 'Push Notifications', desc: 'Send system notifications to users', value: false },
]

export default function AdminSettingsPage() {
  const [flags, setFlags] = useState<Record<string, boolean>>(
    Object.fromEntries(toggles.map(t => [t.id, t.value]))
  )

  return (
    <div className="space-y-12 font-sans pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Platform Configuration</span>
          </div>
          <h1 className="text-6xl font-display font-black text-white tracking-tighter leading-none">Settings</h1>
        </div>
        <button className="bg-secondary text-white px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-secondary/20 hover:scale-105 transition-all flex items-center gap-2">
          <Save className="w-4 h-4" strokeWidth={3} /> Save Config
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Feature Flags */}
        <div className="xl:col-span-2 space-y-4">
          <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 flex items-center gap-2">
            <Settings className="w-4 h-4" /> Feature Flags
          </h2>
          {toggles.map((toggle, i) => (
            <motion.div
              key={toggle.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Card className="bg-[#111] border-white/5 p-6 flex items-center justify-between group hover:border-white/10 transition-all">
                <div>
                  <p className="text-sm font-bold text-white">{toggle.label}</p>
                  <p className="text-[10px] font-medium text-white/30 mt-1">{toggle.desc}</p>
                </div>
                <button
                  onClick={() => setFlags(prev => ({ ...prev, [toggle.id]: !prev[toggle.id] }))}
                  className={cn(
                    "relative w-14 h-7 rounded-full border transition-all duration-300 flex-shrink-0",
                    flags[toggle.id] ? "bg-secondary border-secondary" : "bg-white/5 border-white/10"
                  )}
                >
                  <div className={cn(
                    "absolute top-1 w-5 h-5 rounded-full bg-white shadow-md transition-all duration-300",
                    flags[toggle.id] ? "left-8" : "left-1"
                  )} />
                </button>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Zone Config */}
        <div className="space-y-4">
          <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 flex items-center gap-2">
            <MapPin className="w-4 h-4" /> Zone Control
          </h2>
          <Card className="bg-[#111] border-white/5 p-6 space-y-4">
            {['Hyderabad', 'Rangareddy', 'Kurnool', 'Medak', 'Nalgonda'].map(zone => (
              <div key={zone} className="flex items-center justify-between">
                <span className="text-xs font-bold text-white/70">{zone}</span>
                <div className="w-2 h-2 rounded-full bg-secondary" />
              </div>
            ))}
          </Card>

          <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 flex items-center gap-2 pt-4">
            <ShieldCheck className="w-4 h-4" /> Platform Info
          </h2>
          <Card className="bg-[#0A0A0A] border-white/5 p-6 space-y-4">
            {[
              { label: 'Version', value: 'v2.4.0' },
              { label: 'Environment', value: 'Production' },
              { label: 'Last Deploy', value: '2 hours ago' },
              { label: 'API Status', value: 'Operational' },
            ].map(info => (
              <div key={info.label} className="flex justify-between items-center">
                <span className="text-[10px] font-black uppercase text-white/30 tracking-widest">{info.label}</span>
                <span className="text-xs font-bold text-white">{info.value}</span>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  )
}
