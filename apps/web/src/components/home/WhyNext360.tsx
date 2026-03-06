"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Leaf, Handshake, Truck, RefreshCw } from 'lucide-react'
import { Card } from '@next360/ui'

const reasons = [
  {
    icon: Leaf,
    title: 'No Chemicals',
    description: 'Every product is tested for pesticide residue. 100% clean and natural, just as nature intended.',
    emoji: '🌿'
  },
  {
    icon: Handshake,
    title: 'Direct from Farms',
    description: 'We partner directly with certified organic farmers, ensuring fair pay and high standards.',
    emoji: '🤝'
  },
  {
    icon: Truck,
    title: 'Same-day Delivery',
    description: 'Fresh from farm to your door within hours of harvest. Quality you can taste.',
    emoji: '🚚'
  },
  {
    icon: RefreshCw,
    title: 'Easy Returns',
    description: 'Not satisfied with the freshness? Return within 7 days, no questions asked.',
    emoji: '🔄'
  }
]

export default function WhyNext360() {
  return (
    <section className="py-24 bg-cream/40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl md:text-5xl text-primary font-bold mb-4"
          >
            Why Choose Next360?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-600 font-body text-lg"
          >
            Beyond organic. We are building a transparent food system for your well-being.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
            >
              <Card className="h-full group hover:shadow-2xl transition-all duration-500 border-none bg-white p-10 rounded-[3rem] text-center">
                <div className="w-24 h-24 bg-cream rounded-full flex items-center justify-center text-5xl mb-8 mx-auto group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  {reason.emoji}
                </div>
                <h3 className="font-display text-2xl text-primary font-bold mb-4">
                  {reason.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed font-body">
                  {reason.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
