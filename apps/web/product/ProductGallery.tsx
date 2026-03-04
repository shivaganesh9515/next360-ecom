'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface ProductGalleryProps {
  images: string[];
  name: string;
  certifications?: string[];
}

const ProductGallery = ({ images, name, certifications = [] }: ProductGalleryProps) => {
  const [mainImage, setMainImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div
        className="relative rounded-[22px] border border-border bg-cream-dark overflow-hidden aspect-square cursor-zoom-in"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
      >
        <motion.div
          animate={{ scale: isZoomed ? 1.15 : 1 }}
          transition={{ duration: 0.3 }}
          className="w-full h-full flex items-center justify-center p-8"
        >
          <Image
            src={images[mainImage]}
            alt={name}
            width={500}
            height={500}
            className="max-h-full w-auto object-contain"
            priority
          />
        </motion.div>

        {/* Certification ribbon */}
        {certifications.includes('USDA Organic') && (
          <div className="absolute top-4 left-4 gc-display text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg bg-primary/90 text-white shadow-sm">
            🌿 Certified Organic
          </div>
        )}
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setMainImage(i)}
            className={`w-20 h-20 rounded-xl border-2 overflow-hidden flex items-center justify-center bg-cream-dark transition-all duration-200 ${
              mainImage === i
                ? 'border-primary shadow-sm'
                : 'border-border hover:border-muted'
            }`}
          >
            <Image
              src={img}
              alt={`${name} thumbnail ${i + 1}`}
              width={72}
              height={72}
              className="object-contain max-h-16"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
