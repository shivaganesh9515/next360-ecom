"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Timer, MapPin, ChevronRight } from 'lucide-react'
import type { RythuBatch } from '@next360/types/cms'
import { formatPrice } from '@next360/utils'
import Image from 'next/image'
import Link from 'next/link'

interface RythuBazarSpotlightProps {
  batches: RythuBatch[]
}

export default function RythuBazarSpotlight({ batches }: RythuBazarSpotlightProps) {
  if (!batches.length) return null

  return (
    <section className="bg-gradient-to-r from-[#C0392B] to-[#E74C3C] py-8 rounded-2xl mx-4 sm:mx-6 lg:mx-8 my-6 overflow-hidden shadow-xl">
      <div className="max-w-7xl mx-auto">
        <div className="px-8 flex items-center justify-between mb-6">
          <div className="text-left">
            <h2 className="font-display font-bold text-2xl md:text-3xl text-white flex items-center gap-2">
              🏪 రైతు బజార్
            </h2>
            <p className="text-white/70 text-sm font-medium mt-1">Live batches — direct from local farmers</p>
          </div>
          <Link href="/rythu-bazar" className="text-white/80 hover:text-white font-bold text-sm flex items-center gap-1 group">
            View all batches
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="flex gap-5 px-8 pb-4 overflow-x-auto no-scrollbar">
          {batches.map((batch) => (
            <BatchCard key={batch.id} batch={batch} />
          ))}
        </div>
      </div>
    </section>
  )
}

function BatchCard({ batch }: { batch: RythuBatch }) {
  const [timeLeft, setTimeLeft] = useState('')
  const availablePercent = (batch.availableQty / batch.batchQty) * 100

  useEffect(() => {
    const timer = setInterval(() => {
      const diff = new Date(batch.closesAt).getTime() - Date.now()
      if (diff <= 0) {
        setTimeLeft('Closed')
        return
      }
      const hh = Math.floor(diff / (1000 * 60 * 60))
      const mm = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const ss = Math.floor((diff % (1000 * 60)) / 1000)
      setTimeLeft(`${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`)
    }, 1000)
    return () => clearInterval(timer)
  }, [batch.closesAt])

  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="shrink-0 w-64 bg-white/10 backdrop-blur-md rounded-[2rem] p-4 border border-white/20 flex flex-col gap-3 group relative"
    >
      <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-white/10">
        <Image 
          src={batch.product?.images[0] || '/images/placeholder.jpg'} 
          alt={batch.product?.name || 'Produce'} 
          fill 
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="font-display font-bold text-white text-lg leading-tight line-clamp-1">
          {batch.product?.name}
        </h3>
        <p className="text-white/70 text-xs font-medium flex items-center gap-1">
          by {batch.farmerName}
        </p>
      </div>

      <div className="mt-1">
        <div className="flex justify-between items-end mb-1.5">
          <span className="text-[10px] font-black text-white/60 uppercase tracking-widest">Available</span>
          <span className="text-[10px] font-black text-white">{batch.availableQty} units left</span>
        </div>
        <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: `${availablePercent}%` }}
            className="h-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)]"
          />
        </div>
      </div>

      <div className="mt-auto pt-3 border-t border-white/10 flex items-center justify-between">
        <div>
          <p className="text-white font-black text-xl leading-none">{formatPrice(batch.pricePerUnit)}</p>
          <p className="text-[9px] font-black text-white/50 uppercase tracking-widest mt-1">Today's Price</p>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-1 text-[#FFD700] animate-pulse">
            <Timer size={12} />
            <span className="text-xs font-mono font-black">{timeLeft}</span>
          </div>
          <span className="text-[9px] font-black text-white/50 uppercase tracking-widest mt-1">Closes in</span>
        </div>
      </div>

      <Link 
        href={`/product/${batch.product?.slug}`}
        className="absolute inset-0 z-10"
      />
    </motion.div>
  )
}
