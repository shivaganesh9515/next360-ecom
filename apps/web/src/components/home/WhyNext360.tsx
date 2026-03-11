"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, Wheat, Truck, Leaf } from 'lucide-react'

const reasons = [
  {
    icon: <ShieldCheck />,
    title: 'Verified Protocol',
    desc: 'Every product undergoes pesticide analysis. 100% molecularly clean and natural.'
  },
  {
    icon: <Wheat />,
    title: 'Direct Registry',
    desc: 'Fair yield for farmers, lower entry price for you. No intermediary latency.'
  },
  {
    icon: <Truck />,
    title: 'Velocity Delivery',
    desc: 'Harvested at sequence dawn, delivered by peak dusk. Zero distribution lag.'
  },
  {
    icon: <Leaf />,
    title: 'Circular Assets',
    desc: 'Zero-plastic mission. 100% compostable or reusable molecular structures.'
  }
]

export default function WhyNext360() {
  return (
    <section className="bg-white py-24 md:py-40 font-sans border-b border-slate-50">
      <div className="max-w-[1600px] mx-auto px-8 md:px-12">
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-6">
             <div className="h-1 w-6 bg-secondary/30 rounded-full" />
             <p className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary/60 italic">Platform Architecture</p>
          </div>
          <h2 className="font-black text-5xl md:text-8xl text-slate-900 tracking-tighter italic leading-none mb-8">
            Why <span className="text-primary">Registry</span> Control?
          </h2>
          <p className="text-slate-400 text-lg md:text-xl font-bold italic opacity-60 leading-relaxed">
            Implementing a direct-to-protocol supply chain for peak biological performance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 md:gap-12">
          {reasons.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center group"
            >
              <div className="relative mb-10">
                <div className="absolute inset-0 bg-secondary/20 rounded-[2.5rem] rotate-12 -z-10 group-hover:rotate-[20deg] transition-transform duration-700" />
                <div className="w-24 h-24 rounded-[2rem] bg-white text-secondary flex items-center justify-center shadow-[0_20px_40px_rgba(0,0,0,0.05)] border border-slate-50 group-hover:bg-secondary group-hover:text-white group-hover:-translate-y-2 transition-all duration-700">
                  {React.cloneElement(item.icon as React.ReactElement<any>, { size: 40, strokeWidth: 2.5 })}
                </div>
              </div>
              <h3 className="font-black text-2xl text-slate-900 tracking-tighter italic mb-4">
                {item.title}
              </h3>
              <p className="text-[13px] text-slate-400 font-bold italic opacity-70 leading-loose max-w-[220px]">
                {item.desc}
              </p>
              <div className="mt-8 h-1 w-0 bg-primary/20 rounded-full group-hover:w-16 transition-all duration-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
