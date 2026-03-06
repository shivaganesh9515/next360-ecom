import React from 'react'
import Image from 'next/image'
import { Badge } from '@next360/ui'
import { Leaf, Award, Globe, Heart, CheckCircle2 } from 'lucide-react'
import ImpactNumbers from '@/components/home/ImpactNumbers'
import Link from 'next/link'

export const metadata = {
  title: 'Our Story | Next360',
  description: 'Our mission is to make certified organic food accessible to every Indian family while ensuring fair prices for farmers.'
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* SECTION 1 — Hero */}
      <section className="relative min-h-[60vh] bg-primary flex items-center justify-center pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?q=80&w=2000&auto=format&fit=crop"
            alt="Organic Indian Farm"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/90 to-primary" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
          <Badge variant="fresh" className="bg-white/10 backdrop-blur-md border-white/20 text-white font-bold uppercase tracking-widest px-6 py-2 mb-8 inline-block shadow-lg shadow-black/10">
            🌿 Our Story
          </Badge>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-8">
            We Believe Food<br />Should Be Pure
          </h1>
          <p className="text-xl md:text-2xl text-primary-light font-medium max-w-2xl mx-auto mb-12 leading-relaxed">
            Connecting conscious consumers with deeply committed organic farmers across India. No shortcuts, no chemicals.
          </p>
          <div className="flex flex-wrap justify-center gap-6 md:gap-12">
            {[
              { label: 'Farmers', value: '500+' },
              { label: 'States', value: '12' },
              { label: 'Established', value: '2018' }
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <p className="font-display text-3xl font-black text-secondary mb-1">{stat.value}</p>
                <p className="text-sm font-bold text-white uppercase tracking-widest opacity-80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2 — Mission Statement */}
      <section className="py-20 lg:py-28 bg-cream border-b border-cream-dark">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <blockquote className="font-display text-3xl md:text-4xl text-primary font-black leading-tight italic mb-8 relative">
            <span className="absolute -top-10 -left-6 text-7xl text-primary/20 pointer-events-none">"</span>
            Our mission is to make certified organic food accessible to every Indian family while ensuring our farmers earn a dignified, sustainable livelihood.
            <span className="absolute -bottom-10 -right-6 text-7xl text-primary/20 pointer-events-none">"</span>
          </blockquote>
          <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
            What started as a small WhatsApp group buying vegetables from two farmers in Maharashtra has grown into a nationwide movement. We are obsessed with supply-chain transparency and leaving the earth better than we found it.
          </p>
        </div>
      </section>

      {/* SECTION 3 — Our Story Timeline */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-black text-slate-800">How We Started</h2>
            <div className="w-24 h-1.5 bg-secondary mx-auto mt-6 rounded-full" />
          </div>

          <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
            {[
              { year: '2018', title: 'The Idea', desc: 'Rahul Mehta left his corporate job after visiting heavily specialized monoculture farms.' },
              { year: '2019', title: 'First Farm Partnership', desc: 'Partnered with 5 organic farmers in Nashik to launch the first veggie boxes.' },
              { year: '2020', title: '500 Happy Customers', desc: 'Word of mouth spread. We hit our first 500 weekly subscribers in Mumbai.' },
              { year: '2021', title: 'Expanded to 5 Cities', desc: 'Built a cold chain network to deliver fresh produce across major metros.' },
              { year: '2022', title: '10,000 Families Served', desc: 'Launched our dry groceries and staples line, directly sourcing pulses and grains.' },
              { year: '2023', title: 'Going National', desc: 'Expanded delivery to 12 states with a network of over 300 organic farmers.' },
              { year: '2024', title: '50,000 Families & Counting', desc: 'Became India\'s most trusted direct-to-consumer organic food platform.' },
            ].map((item, idx) => (
              <div key={item.year} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                {/* Icon */}
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-secondary text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
                {/* Card */}
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all">
                  <div className="font-display text-4xl font-black text-slate-200 absolute top-4 right-6 pointer-events-none">{item.year}</div>
                  <h3 className="font-bold text-xl text-primary mb-2 relative z-10">{item.title}</h3>
                  <p className="text-slate-600 font-medium text-sm leading-relaxed relative z-10">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — Values */}
      <section className="py-24 bg-cream">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-black text-slate-800">What We Stand For</h2>
            <div className="w-24 h-1.5 bg-secondary mx-auto mt-6 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Leaf, title: 'Quality', desc: '100% certified organic. Never compromised.' },
              { icon: Globe, title: 'Transparency', desc: 'Trace every product back to its farm.' },
              { icon: Award, title: 'Sustainability', desc: 'Zero-waste packaging, regenerative farming.' },
              { icon: Heart, title: 'Community', desc: 'Fair, farmer-first pricing models.' }
            ].map(value => (
              <div key={value.title} className="bg-white p-8 rounded-[32px] text-center shadow-sm hover:shadow-xl transition-all duration-300 border border-border group">
                <div className="w-20 h-20 mx-auto rounded-3xl bg-cream-dark flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-500">
                  <value.icon size={36} className="text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="font-display font-bold text-2xl text-slate-800 mb-3">{value.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — Certifications */}
      <section className="py-16 bg-white border-b border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-center font-bold text-slate-400 uppercase tracking-widest text-sm mb-10">Our Certifications</h2>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
            {['Jaivik Bharat', 'India Organic', 'FSSAI Certified', 'USDA Organic', 'Non-GMO Project'].map(cert => (
              <div key={cert} className="flex items-center gap-3 px-6 py-3 rounded-full bg-slate-50 border border-slate-100">
                <CheckCircle2 size={18} className="text-secondary" />
                <span className="font-bold text-primary text-sm tracking-wide">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6 — Impact Numbers */}
      <ImpactNumbers />

      {/* SECTION 7 — Team Section */}
      <section className="py-24 bg-cream border-t border-cream-dark">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-black text-slate-800">The People Behind Next360</h2>
            <div className="w-24 h-1.5 bg-secondary mx-auto mt-6 rounded-full" />
          </div>

          <div className="bg-white rounded-[40px] p-8 md:p-12 border border-border shadow-md max-w-2xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="w-48 h-48 rounded-full overflow-hidden shrink-0 border-8 border-cream-dark shadow-inner relative">
              <Image 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000&auto=format&fit=crop"
                alt="Rahul Mehta"
                fill
                className="object-cover"
              />
            </div>
            <div className="text-center md:text-left">
              <Badge variant="sale" className="bg-primary/10 text-primary border-none font-bold uppercase tracking-widest px-4 py-1.5 mb-4">Founder</Badge>
              <h3 className="font-display text-3xl font-black text-slate-800 mb-2">Rahul Mehta</h3>
              <p className="text-slate-500 font-medium leading-relaxed mb-6">
                "I started Next360 to bridge the gap between hard-working organic farmers and city dwellers craving authentic, chemical-free food. It's not just a business; it's a movement."
              </p>
              <a href="#" className="inline-flex items-center gap-2 text-primary font-bold hover:underline underline-offset-4 tracking-wider uppercase text-sm">
                Connect on LinkedIn →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8 — CTA */}
      <section className="py-24 bg-primary text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-display text-5xl md:text-6xl font-black mb-6">Ready to Go Organic?</h2>
          <p className="text-xl md:text-2xl text-primary-light font-medium mb-10">
            Join 50,000+ Indian families eating clean, healthy, and conscious food every day.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/shop" className="px-8 py-4 bg-white text-primary font-bold text-lg rounded-2xl hover:bg-slate-50 transition-all shadow-xl hover:-translate-y-1">
              Shop Now →
            </Link>
            <Link href="/contact" className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold text-lg rounded-2xl hover:bg-white/10 transition-all">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
