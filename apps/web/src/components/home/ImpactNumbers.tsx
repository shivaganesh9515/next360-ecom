"use client"

import React from 'react'
import { GlassCard, AnimatedCounter, StaggerContainer } from '@next360/ui'

const stats = [
  { value: 500, suffix: '+', label: 'Farmers Supported' },
  { value: 12,  suffix: '',  label: 'States Covered' },
  { value: 50,  suffix: 'K+', label: 'Happy Customers' },
  { value: 100, suffix: '%', label: 'Certified Organic' }
]

export default function ImpactNumbers() {
  return (
    <section className="py-24 bg-primary relative overflow-hidden">
      {/* Decorative SVG Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
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

        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat) => (
            <GlassCard 
              key={stat.label} 
              hover 
              className="p-8 text-center flex flex-col items-center justify-center min-h-[180px] border-white/10"
            >
              <AnimatedCounter 
                to={stat.value} 
                suffix={stat.suffix} 
                className="font-display text-5xl md:text-6xl font-bold text-white tracking-tight drop-shadow-md" 
                duration={2.5}
              />
              <p className="text-white/70 font-bold uppercase tracking-widest text-xs mt-4">
                {stat.label}
              </p>
            </GlassCard>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

