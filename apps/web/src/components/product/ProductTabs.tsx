"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Product } from '@next360/types'
import { cn } from '@next360/utils'
import NutritionFacts from './NutritionFacts'
import ReviewSection from './ReviewSection'
import { MOCK_REVIEWS } from '@/lib/mockData'

import { useQuery } from '@tanstack/react-query'
import { reviewService } from '@/services/reviewService'

interface ProductTabsProps {
  product: Product
}

const tabs = [
  { id: 'description', label: 'Description' },
  { id: 'nutrition', label: 'Nutrition Facts' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'delivery', label: 'Delivery & Returns' },
]

export default function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState('description')

  const { data: reviews = [], isLoading: isLoadingReviews } = useQuery({
    queryKey: ['reviews', product.id],
    queryFn: () => reviewService.getReviews(product.id),
    staleTime: 5 * 60 * 1000,
    enabled: activeTab === 'reviews'
  })

  return (
    <div className="mt-20">
      {/* Tab Headers */}
      <div className="flex flex-wrap gap-2 md:gap-8 border-b border-border mb-10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "relative pb-6 px-2 text-sm md:text-lg font-black font-sans transition-all",
              activeTab === tab.id ? "text-primary" : "text-muted hover:text-primary"
            )}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-1.5 bg-primary rounded-t-full shadow-lg shadow-primary/20"
              />
            )}
            {tab.id === 'reviews' && (
              <span className="ml-2 text-xs font-bold bg-cream px-2 py-0.5 rounded-full text-muted font-sans">
                {product.reviewCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'description' && (
              <div className="max-w-4xl space-y-10">
                <div className="prose prose-lg max-w-none">
                  <p className="text-text font-sans leading-relaxed font-medium">
                    {product.description}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-10 border-t border-border">
                  <div className="space-y-6">
                    <h4 className="text-xl font-black text-primary font-sans border-l-4 border-primary pl-4">Key Benefits</h4>
                    <ul className="space-y-4">
                      {[
                        "100% Pesticide-Free & Sustainably Farmed",
                        "Harvested at peak ripeness for maximum flavor",
                        "Directly sourced from local specialized farmers",
                        "Zero artificial preservatives or chemicals"
                      ].map((benefit, i) => (
                        <li key={i} className="flex items-start gap-3 text-text font-sans font-medium">
                          <span className="text-primary mt-1">🌿</span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-6">
                    <h4 className="text-xl font-black font-sans text-primary border-l-4 border-primary pl-4">Product Details</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between py-2 border-b border-border text-sm font-bold font-sans">
                        <span className="text-muted uppercase tracking-widest">Weight</span>
                        <span className="text-text">{product.weight}</span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-border text-sm font-bold font-sans">
                        <span className="text-muted uppercase tracking-widest">Origin</span>
                        <span className="text-text">{product.region}</span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-border text-sm font-bold font-sans">
                        <span className="text-muted uppercase tracking-widest">Shelf Life</span>
                        <span className="text-text">7-10 Days (Refrigerated)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'nutrition' && (
              <div className="flex justify-center md:justify-start">
                <NutritionFacts facts={product.nutritionFacts} />
              </div>
            )}

            {activeTab === 'reviews' && (
              <ReviewSection 
                rating={product.rating} 
                count={product.reviewCount} 
                reviews={reviews as any}
                isLoading={isLoadingReviews}
              />
            )}

            {activeTab === 'delivery' && (
              <div className="max-w-3xl space-y-12">
                <div className="bg-blue-50/50 rounded-3xl p-8 border border-blue-100/50">
                  <h4 className="text-xl font-black text-blue-900 mb-4">Fast & Fresh Delivery</h4>
                  <p className="text-blue-700/80 font-medium leading-relaxed">
                    We deliver across 20+ cities in India. Orders placed before 10 PM are harvested tonight and delivered tomorrow morning between 6 AM - 10 AM to ensure maximum freshness.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h5 className="font-black font-sans text-primary uppercase tracking-wider text-sm">Return Policy</h5>
                    <p className="text-muted font-sans font-medium leading-relaxed">
                      We offer a "No Questions Asked" return policy at the time of delivery. If you are not satisfied with the quality, simply return it to our delivery partner.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h5 className="font-black font-sans text-primary uppercase tracking-wider text-sm">Packaging</h5>
                    <p className="text-muted font-sans font-medium leading-relaxed">
                      Our products are packed in eco-friendly, plastic-free corn-starch bags or honey-comb paper wraps to keep them fresh and the planet happy.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
