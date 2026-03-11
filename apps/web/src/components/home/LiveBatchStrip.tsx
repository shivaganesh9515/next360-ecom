"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { RythuBatch } from '@next360/types/cms'
import { Button } from '@next360/ui/Button'
import { formatPrice } from '@next360/utils'
import Image from 'next/image'
import { Timer, MapPin, Users, ShoppingCart, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface LiveBatchStripProps {
  batches: RythuBatch[]
}

export default function LiveBatchStrip({ batches }: LiveBatchStripProps) {
  if (!batches || batches.length === 0) return null

  return (
    <section className="max-w-[1600px] mx-auto px-8 md:px-12 py-24 font-sans">
      <div className="flex flex-col md:flex-row items-end justify-between gap-10 mb-16">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-100 text-red-600 text-[10px] font-black uppercase tracking-[0.2em] border border-red-200 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            Real-Time Registry
          </div>
          <h2 className="font-black text-5xl md:text-7xl text-slate-900 tracking-tighter italic leading-none">
            Fresh Harvest <span className="text-primary ml-4">Batch Streams</span>
          </h2>
          <p className="text-slate-400 font-bold italic opacity-60 max-w-lg text-lg">
            Directly from farms to your kitchen. Subscribe to the sequence before the batch finalizes.
          </p>
        </div>
        
        <Link href="/rythu-bazar">
          <Button variant="outline" className="rounded-full font-black text-[10px] uppercase tracking-[0.3em] px-10 py-5 border border-slate-100 bg-slate-50 text-slate-400 hover:text-primary hover:border-primary/20 hover:bg-primary/5 hover:scale-[1.05] transition-all duration-500 shadow-sm active:scale-95">
            Identify All Streams
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {batches.slice(0, 3).map((batch, idx) => (
          <motion.div
            key={batch.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="group relative bg-white rounded-[3.5rem] p-10 shadow-[0_50px_100px_rgba(0,0,0,0.04)] border border-slate-50 overflow-hidden hover:shadow-[0_50px_100px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-700"
          >
            {/* Top Info */}
            <div className="flex items-start justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="relative w-14 h-14 rounded-2xl overflow-hidden border border-primary/10 shadow-sm group-hover:scale-110 transition-transform duration-500">
                   <Image 
                     src={`https://ui-avatars.com/api/?name=${batch.farmerName}&background=F0FDF4&color=16A34A&bold=true`} 
                     alt={batch.farmerName || 'Farmer'} 
                     fill 
                   />
                </div>
                <div>
                  <h4 className="font-black text-slate-900 leading-none mb-1.5 italic underline underline-offset-4 decoration-primary/20">{batch.farmerName}</h4>
                  <div className="flex items-center gap-1.5 text-[9px] text-slate-400 font-black uppercase tracking-widest">
                    <MapPin size={10} className="text-primary" />
                    {batch.farmerCity}
                  </div>
                </div>
              </div>
              <div className="bg-primary/10 text-primary text-[9px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-sm backdrop-blur-md">
                {Math.round((batch.availableQty / batch.batchQty) * 100)}% Avail.
              </div>
            </div>

            {/* Product Card */}
            <div className="relative aspect-[16/10] rounded-[2.5rem] overflow-hidden mb-8 border border-white/5 bg-slate-50 shadow-inner group/img">
              {batch.product?.images?.[0] && (
                <Image 
                  src={batch.product.images[0]} 
                  alt={batch.product.name} 
                  fill 
                  className="object-cover group-hover:scale-115 transition-transform duration-1000 ease-[0.16, 1, 0.3, 1]" 
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
              <div className="absolute inset-x-0 bottom-0 p-8">
                 <h3 className="text-white font-black text-3xl tracking-tighter italic leading-none">{batch.product?.name}</h3>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-slate-50/50 rounded-2xl p-5 border border-slate-50 transition-colors group-hover:bg-slate-50 group-hover:border-slate-100">
                 <p className="text-[8px] text-slate-400 font-black uppercase tracking-[0.3em] mb-1 italic">Harvest Cycle</p>
                 <p className="text-sm font-black text-slate-900 tracking-tighter italic">{new Date(batch.harvestDate).toLocaleDateString()}</p>
              </div>
              <div className="bg-slate-50/50 rounded-2xl p-5 border border-slate-50 transition-colors group-hover:bg-slate-50 group-hover:border-slate-100">
                 <p className="text-[8px] text-slate-400 font-black uppercase tracking-[0.3em] mb-1 italic">Yield Val./Kg</p>
                 <p className="text-sm font-black text-primary tracking-tighter italic">{formatPrice(batch.pricePerUnit)}</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-10 space-y-4">
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(batch.availableQty / batch.batchQty) * 100}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="h-full bg-primary shadow-lg shadow-primary/30"
                />
              </div>
              <div className="flex justify-between text-[9px] font-black text-slate-400 uppercase tracking-widest italic">
                <span>{batch.availableQty} Kg Remaining</span>
                <span>Total Yield {batch.batchQty} Kg</span>
              </div>
            </div>

            <Button fullWidth className="rounded-full h-16 font-black text-[10px] uppercase tracking-[0.3em] shadow-2xl shadow-primary/20 bg-primary text-white border-none hover:scale-[1.03] active:scale-95 transition-all duration-500 group/btn">
              Join This Sequence
              <ArrowRight className="ml-3 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" strokeWidth={3} />
            </Button>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
