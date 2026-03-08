"use client"

import React from 'react'
import Link from 'next/link'
import { m } from 'framer-motion'
import { Button, Badge } from '@next360/ui'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cream/40 flex items-center justify-center text-center px-4 relative overflow-hidden">
      {/* Background large 404 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-sans text-[150px] md:text-[250px] font-black text-primary/5 select-none z-0">
        404
      </div>

      <m.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 max-w-lg mx-auto flex flex-col items-center"
      >
        {/* Farm Element */}
        <m.div 
          animate={{ 
            rotate: [0, -10, 10, -10, 0],
            y: [0, -5, 0]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-7xl md:text-8xl mb-6"
        >
          🚜
        </m.div>

        <Badge variant="organic" className="mb-6 px-4 py-1.5 uppercase tracking-widest font-black">
          Lost in the Fields
        </Badge>
        
        <h1 className="text-4xl md:text-5xl font-black text-text leading-tight mb-4">
          This page went back to the farm.
        </h1>
        
        <p className="text-lg text-muted font-medium leading-relaxed mb-10 max-w-sm">
          Looks like the page you're looking for doesn't exist, has been moved, or was eaten by a very hungry caterpillar.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link href="/">
            <Button size="lg" className="w-full sm:w-auto px-8 py-6 text-lg rounded-xl shadow-xl shadow-green-900/20">
              ← Go Home
            </Button>
          </Link>
          <Link href="/shop">
            <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 py-6 text-lg rounded-xl">
              Browse Products
            </Button>
          </Link>
        </div>
      </m.div>
    </div>
  )
}
