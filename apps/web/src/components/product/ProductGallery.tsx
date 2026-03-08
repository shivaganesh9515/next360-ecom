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
    <div className="space-y-4">
      <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-cream group cursor-zoom-in border border-border shadow-[0_1px_0_rgba(17,38,29,0.08),0_10px_26px_rgba(31,48,40,0.06)]">
        {isOrganic && (
          <div className="absolute top-6 right-6 z-10 pointer-events-none">
            <Badge variant="success" size="md" className="bg-primary text-white border-none px-4 py-2 rounded-full font-bold shadow-lg shadow-primary/20">
              ✅ India Organic
            </Badge>
          </div>
        )}

        <motion.div
          animate={{ scale: isZoomed ? 1.5 : 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
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
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
          />
        </motion.div>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {thumbnails.map((img: string, idx: number) => (
          <button
            key={idx}
            onClick={() => setActiveImage(img)}
            className={cn(
              "relative w-24 h-24 rounded-2xl overflow-hidden bg-cream shrink-0 transition-all duration-300 transform active:scale-95",
              activeImage === img ? "ring-2 ring-primary ring-offset-2 ring-offset-cream scale-105" : "opacity-60 hover:opacity-100"
            )}
          >
            <Image
              src={img}
              alt={`${name} thumb ${idx}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}


