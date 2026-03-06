"use client"

import React, { useState, useEffect } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import { Quote, Star } from 'lucide-react'
import { Card, Avatar, RatingStars, Badge } from '@next360/ui'
import { MOCK_TESTIMONIALS } from '@/lib/mockData'
import { cn } from '@next360/utils'

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % MOCK_TESTIMONIALS.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-24 bg-cream/40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-4xl md:text-5xl text-primary font-bold mb-4">
            What Our Customers Say
          </h2>
          <p className="text-slate-600 font-body text-lg">
            Real stories from families who chose a healthier, organic lifestyle.
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-3 gap-8">
          {MOCK_TESTIMONIALS.map((testimonial) => (
            <Card key={testimonial.id} className="p-10 bg-white border-none rounded-[3rem] shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full">
              <div className="mb-6 flex justify-between items-start">
                <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary">
                  <Quote size={24} fill="currentColor" className="opacity-20" />
                </div>
                <Badge variant="success" size="sm" className="bg-primary/10 text-primary border-none font-bold">
                  ✓ Verified Buyer
                </Badge>
              </div>

              <RatingStars rating={testimonial.rating} size="sm" className="mb-4" />
              
              <p className="text-slate-700 italic font-body leading-relaxed mb-8 flex-1">
                "{testimonial.review}"
              </p>

              <div className="pt-6 border-t border-slate-50 flex items-center gap-4">
                <Avatar name={testimonial.name} src={testimonial.avatar} size="md" className="rounded-2xl" />
                <div>
                  <p className="font-bold text-slate-800">{testimonial.name}</p>
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">{testimonial.city}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Mobile View / Carousel */}
        <div className="md:hidden">
          <AnimatePresence mode="wait">
            <m.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="p-10 bg-white border-none rounded-[3rem] shadow-xl">
                 <div className="mb-6 flex justify-between items-start">
                  <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary">
                    <Quote size={24} fill="currentColor" className="opacity-20" />
                  </div>
                  <Badge variant="success" size="sm" className="bg-primary/10 text-primary border-none font-bold">
                    ✓ Verified
                  </Badge>
                </div>

                <RatingStars rating={MOCK_TESTIMONIALS[activeIndex].rating} size="sm" className="mb-4" />
                <p className="text-slate-700 italic font-body leading-relaxed mb-8">
                  "{MOCK_TESTIMONIALS[activeIndex].review}"
                </p>

                <div className="pt-6 border-t border-slate-50 flex items-center gap-4">
                  <Avatar name={MOCK_TESTIMONIALS[activeIndex].name} src={MOCK_TESTIMONIALS[activeIndex].avatar} size="md" className="rounded-2xl" />
                  <div>
                    <p className="font-bold text-slate-800">{MOCK_TESTIMONIALS[activeIndex].name}</p>
                    <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">{MOCK_TESTIMONIALS[activeIndex].city}</p>
                  </div>
                </div>
              </Card>
            </m.div>
          </AnimatePresence>

          <div className="flex justify-center gap-2 mt-8">
            {MOCK_TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={cn(
                  "w-10 h-1 rounded-full transition-all duration-500",
                  activeIndex === i ? "bg-primary w-20" : "bg-slate-200"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
