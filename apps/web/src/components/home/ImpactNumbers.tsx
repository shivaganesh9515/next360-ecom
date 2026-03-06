"use client"

import React, { useEffect, useState, useRef } from 'react'
import { m, useInView } from 'framer-motion'

const stats = [
  { value: 500, suffix: '+', label: 'Farmers Supported' },
  { value: 12,  suffix: '',  label: 'States Covered' },
  { value: 50,  suffix: 'K+', label: 'Happy Customers' },
  { value: 100, suffix: '%', label: 'Certified Organic' }
]

function Counter({ value, suffix }: { value: number, suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      let start = 0
      const duration = 2000
      const increment = value / (duration / 16)
      
      const timer = setInterval(() => {
        start += increment
        if (start >= value) {
          setCount(value)
          clearInterval(timer)
          hasAnimated.current = true
        } else {
          setCount(Math.floor(start))
        }
      }, 16)

      return () => clearInterval(timer)
    }
  }, [isInView, value])

  return (
    <span ref={ref} className="font-display text-5xl md:text-6xl font-bold text-white tracking-tight">
      {count}{suffix}
    </span>
  )
}

export default function ImpactNumbers() {
  return (
    <section className="py-24 bg-primary relative overflow-hidden">
      {/* Decorative SVG Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="dot-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
             <circle cx="2" cy="2" r="1" fill="white" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#dot-pattern)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-5xl text-white font-bold opacity-90">Our Growing Impact</h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {stats.map((stat, index) => (
            <div key={stat.label} className="relative text-center group">
              <div className="flex flex-col items-center">
                <Counter value={stat.value} suffix={stat.suffix} />
                <p className="text-white/60 font-bold uppercase tracking-widest text-xs mt-4 group-hover:text-accent transition-colors">
                  {stat.label}
                </p>
              </div>

              {/* Decorative Separator */}
              {index < stats.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 h-12 w-[1px] bg-white/10 -translate-y-1/2" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
