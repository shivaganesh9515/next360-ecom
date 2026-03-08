"use client"

import React from 'react'
import Link from 'next/link'
import { m } from 'framer-motion'
import { Instagram, Facebook, Youtube, MapPin, Phone, Mail } from 'lucide-react'
import NewsletterForm from './NewsletterForm'

const footerLinks = [
  {
    title: 'Quick Links',
    links: [
      { name: 'Home', href: '/' },
      { name: 'Shop', href: '/shop' },
      { name: 'About Us', href: '/about' },
      { name: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Customer Care',
    links: [
      { name: 'Track Order', href: '/account/orders' },
      { name: 'Returns & Refunds', href: '/returns' },
      { name: 'FAQ', href: '/faq' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="mt-16 bg-primary text-cream">
      <div className="max-w-[1240px] mx-auto px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10">
          
          <div className="space-y-5">
            <Link href="/" className="inline-flex items-center gap-2 group">
              <span className="text-2xl">🌱</span>
              <span className="font-display text-[2rem] font-bold tracking-tight text-white group-hover:text-accent transition-colors">
                Next360
              </span>
            </Link>
            <p className="text-sm text-cream/70 leading-relaxed font-sans max-w-xs">
              Farm to your table with thoughtfully curated organic produce and pantry essentials. Premium quality guaranteed.
            </p>
            <ul className="space-y-3 text-sm text-cream/80 font-sans">
              <li className="flex items-start gap-3"><MapPin size={18} className="text-accent mt-0.5 shrink-0" />123 Organic Farms, Jubilee Hills, Hyderabad, India</li>
              <li className="flex items-center gap-3"><Phone size={18} className="text-accent shrink-0" />+91-9876543210</li>
              <li className="flex items-center gap-3"><Mail size={18} className="text-accent shrink-0" />hello@next360.in</li>
            </ul>
          </div>

          {footerLinks.map((column) => (
            <div key={column.title}>
              <h4 className="font-display text-lg font-bold text-white mb-6 uppercase tracking-wider">{column.title}</h4>
              <ul className="space-y-3 font-sans">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-cream/70 hover:text-accent transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="font-display text-lg font-bold text-white mb-4 uppercase tracking-wider">Get 10% Off</h4>
            <p className="text-sm text-cream/70 mb-5 font-sans">Subscribe for first-order savings and weekly harvest updates.</p>
            <NewsletterForm />
            <div className="pt-8 flex items-center gap-3">
              {[
                { Icon: Instagram, label: 'Instagram' },
                { Icon: Facebook, label: 'Facebook' },
                { Icon: Youtube, label: 'Youtube' },
              ].map(({ Icon, label }) => (
                <m.a
                  key={label}
                  href="#"
                  aria-label={`Follow us on ${label}`}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-accent hover:text-primary transition-all backdrop-blur-sm"
                >
                  <Icon size={18} />
                </m.a>
              ))}
            </div>
          </div>
          
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 font-sans text-xs text-cream/60">
          <p>© 2026 Next360. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-2">
            {['UPI', 'Visa', 'Mastercard', 'Razorpay'].map((item) => (
              <span key={item} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white font-medium">{item}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
