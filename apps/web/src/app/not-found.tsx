"use client"

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@next360/ui'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center text-center px-4 relative overflow-hidden">
      {/* Background large 404 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[150px] md:text-[250px] font-black text-primary/5 select-none z-0">
        404
      </div>

      <div className="relative z-10 max-w-lg mx-auto flex flex-col items-center">
        {/* Animated Farm Element */}
        <motion.div 
          animate={{ y: [0, -15, 0], rotate: [0, 5, -5, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="text-7xl md:text-8xl mb-6 drop-shadow-xl"
        >
          🚜
        </motion.div>

        <Badge variant="sale" className="bg-primary/10 text-primary border-none font-bold uppercase tracking-widest px-4 py-1.5 mb-6">
          Lost in the Fields
        </Badge>
        
        <h1 className="font-display text-4xl md:text-5xl font-black text-slate-800 leading-tight mb-4">
          This page went back to the farm.
        </h1>
        
        <p className="text-lg text-slate-500 font-medium leading-relaxed mb-10 max-w-sm">
          Looks like the page you're looking for doesn't exist, has been moved, or was eaten by a very hungry caterpillar.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link href="/">
            <Button variant="primary" className="w-full sm:w-auto h-14 px-8 font-bold shadow-xl shadow-primary/20 text-lg">
              ← Go Home
            </Button>
          </Link>
          <Link href="/shop">
            <Button variant="outline" className="w-full sm:w-auto h-14 px-8 font-bold text-lg bg-white">
              Browse Products
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

function Badge({ children, className, variant }: any) {
  // Local fallback badge if ui component not imported correctly
  return <span className={`inline-block rounded-full ${className}`}>{children}</span>
}
