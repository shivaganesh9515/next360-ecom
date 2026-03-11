'use client'

import { DataTable, GlassCard, Button, Badge } from '@next360/ui'
import { Eye, Plus, Sparkles, Info } from 'lucide-react'
import { motion } from 'framer-motion'

interface CmsCollectionPageProps {
  title: string
  description: string
  eyebrow: string
  items: any[]
}

function formatValue(value: unknown) {
  if (typeof value === 'boolean') return value ? 'Yes' : 'No'
  if (Array.isArray(value)) return `${value.length} items`
  if (value && typeof value === 'object') return 'Object'
  return String(value ?? '-')
}

export function CmsCollectionPage({ title, description, eyebrow, items }: CmsCollectionPageProps) {
  const sample = items[0] ?? {}
  
  // DataTable expects accessor: keyof T | ((item: T) => React.ReactNode)
  const columns = Object.keys(sample)
    .slice(0, 4)
    .map((key) => ({
      header: key.replace(/([A-Z])/g, ' $1').trim(),
      accessor: (row: any) => (
        <span className="font-bold text-slate-700">{formatValue(row[key])}</span>
      ),
    }))

  const previewItems = items.slice(0, 3)

  return (
    <div className="space-y-10 pb-24 font-sans text-white">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between px-2">
        <div className="max-w-4xl">
          <div className="flex items-center gap-3 mb-4">
             <div className="h-1 w-8 bg-primary rounded-full shadow-[0_0_10px_rgba(22,163,74,0.4)]" />
             <div className="text-[10px] uppercase tracking-[0.6em] font-black text-primary italic">{eyebrow}</div>
          </div>
          <h1 className="font-display text-7xl font-black text-white tracking-tighter leading-tight italic">{title}</h1>
          <p className="mt-8 text-xl leading-relaxed text-slate-400 font-bold max-w-2xl opacity-90">{description}</p>
        </div>
        <Button className="rounded-[2rem] px-12 py-10 font-black text-sm uppercase tracking-widest shadow-[0_40px_80px_rgba(22,163,74,0.15)] hover:scale-105 active:scale-95 transition-all text-white bg-primary border-none group relative overflow-hidden">
          <span className="relative z-10 flex items-center gap-4">
             <Plus className="h-6 w-6" strokeWidth={3} />
             INITIATE {title.toLowerCase().slice(0, -1)}
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </Button>
      </div>
 
      <div className="grid gap-10 xl:grid-cols-[1.4fr_0.6fr]">
        <div className="space-y-8">
            <DataTable
              title="Registry Protocol"
              variant="noir"
              data={items}
              columns={[
                ...(columns as any),
                {
                  header: 'State',
                  accessor: (row: any) => (
                    <Badge variant="active" className="border-none bg-primary/10 text-primary font-black px-5 py-2 rounded-full text-[10px] uppercase tracking-widest shadow-inner">
                      {(row.isActive ?? row.isVisible ?? true) ? 'Live' : 'Draft'}
                    </Badge>
                  ),
                },
              ]}
              actions={
                <Button variant="outline" size="sm" className="rounded-full font-black text-[10px] uppercase tracking-[0.2em] px-8 py-3 border-white/10 text-white hover:bg-white/5">
                  Synchronize Cluster
                </Button>
              }
            />
        </div>
 
        <div className="space-y-6">
          <GlassCard className="p-10 !bg-white/[0.02] border-white/5 shadow-[0_50px_100px_rgba(0,0,0,0.4)] rounded-[3rem]" glow tone="dark">
            <div className="flex items-center justify-between mb-10">
              <div>
                <div className="text-[10px] uppercase tracking-[0.5em] font-black text-primary italic">Live Projection</div>
                <h2 className="mt-2 text-4xl font-black text-white tracking-tighter italic">Storefront Impact</h2>
              </div>
              <div className="h-14 w-14 bg-white/5 rounded-[1.5rem] flex items-center justify-center shadow-lg border border-white/10">
                 <Eye className="h-7 w-7 text-white" />
              </div>
            </div>
            
            <div className="space-y-6">
              {previewItems.map((item, index) => (
                <motion.div 
                  key={item.id ?? index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-[2.5rem] border border-white/5 bg-white/[0.01] p-8 group hover:bg-white/[0.03] transition-all duration-500 shadow-sm"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="text-[9px] uppercase tracking-[0.4em] font-black text-slate-500">Instance {index + 1}</div>
                    <Sparkles size={16} className="text-primary/30 group-hover:text-primary transition-colors" />
                  </div>
                  <div className="text-2xl font-black text-white tracking-tight leading-tight group-hover:text-primary transition-colors">
                    {formatValue(item.title ?? item.name ?? item.sectionKey ?? item.zoneId)}
                  </div>
                  <div className="mt-4 text-sm font-bold text-slate-400 leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                    {formatValue(item.description ?? item.text ?? item.city ?? item.mode ?? item.type)}
                  </div>
                  <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                     <div className="h-1.5 w-16 bg-white/5 rounded-full" />
                     <div className="h-5 w-5 rounded-full bg-primary/20 animate-pulse border border-primary/40 shadow-[0_0_15px_rgba(22,163,74,0.4)]" />
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
 
          <GlassCard className="p-10 !bg-slate-900/20 border-white/5 shadow-inner rounded-[3rem]" tone="dark">
            <div className="flex items-center gap-4 mb-8">
               <Info size={18} className="text-primary" />
               <div className="text-[10px] uppercase tracking-[0.5em] font-black text-slate-500 italic">Operational Protocol</div>
            </div>
            <ul className="space-y-8">
              {[
                  "Zone-aware content should be reviewed against active platform modes before publishing.",
                  "Use the projection rail to audit missing links and incorrect display hierarchies.",
                  "Maintain low latency by keeping collection records concise and high-resolution visuals optimized."
              ].map((note, i) => (
                  <li key={i} className="flex gap-6">
                     <span className="text-xs font-black text-primary/60 mt-1 italic">{String(i + 1).padStart(2, '0')}</span>
                     <span className="text-[13px] font-bold text-slate-400 leading-loose">{note}</span>
                  </li>
              ))}
            </ul>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}
