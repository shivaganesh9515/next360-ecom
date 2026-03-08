"use client"

import React from 'react'
import { m } from 'framer-motion'
import { Leaf, Handshake, Truck, RefreshCw } from 'lucide-react'
import { BentoGrid, BentoCard } from '@next360/ui'

const reasons = [
  {
    icon: Leaf,
    title: 'No Chemicals',
    description: 'Every product is tested for pesticide residue. 100% clean and natural, just as nature intended.',
    emoji: '🌿',
    href: '/about',
    cta: 'Learn More'
  },
  {
    icon: Handshake,
    title: 'Direct from Farms',
    description: 'We partner directly with certified organic farmers, ensuring fair pay and high standards.',
    emoji: '🤝',
    href: '/about/farmers',
    cta: 'Meet Farmers'
  },
  {
    icon: Truck,
    title: 'Same-day Delivery',
    description: 'Fresh from farm to your door within hours of harvest. Quality you can taste.',
    emoji: '🚚',
    href: '/shipping',
    cta: 'View Areas'
  },
  {
    icon: RefreshCw,
    title: 'Easy Returns',
    description: 'Not satisfied with the freshness? Return within 7 days, no questions asked.',
    emoji: '🔄',
    href: '/returns',
    cta: 'Read Policy'
  }
]

export default function WhyNext360() {
  return (
    <section className="py-24 bg-cream/40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <m.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl md:text-5xl text-primary font-bold mb-4"
          >
            Why Choose Next360?
          </m.h2>
          <m.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted font-sans text-lg"
          >
            Beyond organic. We are building a transparent food system for your well-being.
          </m.p>
        </div>

        <BentoGrid className="lg:grid-cols-4 md:grid-cols-2 grid-cols-1 auto-rows-[20rem]">
          {reasons.map((reason, index) => (
            <m.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className={index === 0 || index === 3 ? "lg:col-span-2 col-span-1 md:col-span-2" : "col-span-1"}
            >
              <BentoCard
                className="h-full border-none shadow-xl shadow-primary/5"
                name={reason.title}
                Icon={reason.icon}
                description={reason.description}
                href={reason.href}
                cta={reason.cta}
                background={
                  <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] text-9xl pointer-events-none">
                    {reason.emoji}
                  </div>
                }
              />
            </m.div>
          ))}
        </BentoGrid>
      </div>
    </section>
  )
}

