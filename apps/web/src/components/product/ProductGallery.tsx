"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Badge } from '@next360/ui'
import { cn } from '@next360/utils'

interface ProductGalleryProps {
  images: string[]
  name: string
  isOrganic?: boolean
}

export default function ProductGallery({ images, name, isOrganic = true }: ProductGalleryProps) {
  const [activeImage, setActiveImage] = useState(images[0])
  const [isZoomed, setIsZoomed] = useState(false)

  // Use a fallback for mock images if only 1 is provided
  const thumbnails = images.length > 1 
    ? images 
    : [images[0], images[0], images[0], images[0]]

  return (
    <div className="space-y-6">
      <div className="relative aspect-square rounded-[2.5rem] overflow-hidden bg-slate-50 group cursor-zoom-in border border-slate-50 shadow-none">
        {isOrganic && (
          <div className="absolute top-6 left-6 z-10 pointer-events-none">
            <Badge variant="green" size="md" className="shadow-lg shadow-green-100">
              Organic Certified
            </Badge>
          </div>
        )}

        <motion.div
          animate={{ scale: isZoomed ? 1.4 : 1 }}
          transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
          className="relative w-full h-full"
          onMouseEnter={() => setIsZoomed(true)}
          onMouseLeave={(e) => {
            setIsZoomed(false)
            e.currentTarget.style.transformOrigin = 'center center'
          }}
          onMouseMove={(e) => {
            const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
            const x = ((e.clientX - left) / width) * 100
            const y = ((e.clientY - top) / height) * 100
            e.currentTarget.style.transformOrigin = `${x}% ${y}%`
          }}
        >
          <Image
            src={activeImage}
            alt={name}
            fill
            className="object-contain p-12"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
          />
        </motion.div>
      </div>

      <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
        {thumbnails.map((img: string, idx: number) => (
          <button
            key={idx}
            onClick={() => setActiveImage(img)}
            className={cn(
              "relative w-20 h-20 rounded-[1.5rem] overflow-hidden bg-slate-50 shrink-0 transition-all duration-300 transform active:scale-90",
              activeImage === img ? "ring-2 ring-primary ring-offset-4 ring-offset-white scale-105" : "opacity-50 hover:opacity-100 border border-transparent"
            )}
          >
            <Image
              src={img}
              alt={`${name} thumb ${idx}`}
              fill
              className="object-contain p-3"
            />
          </button>
        ))}
      </div>
    </div>
  )
}


