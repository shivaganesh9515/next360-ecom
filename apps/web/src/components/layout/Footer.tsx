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
    <footer className="mt-24 bg-white border-t border-slate-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-0.5 shrink-0">
              <span className="text-[1.8rem] font-bold tracking-tight">
                <span className="text-primary">next</span>
                <span className="text-slate-800">360</span>
              </span>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
              Direct from farm to your premium table. Next-gen organic e-commerce for a healthier lifestyle.
            </p>
            <div className="flex items-center gap-3 pt-4">
              {[
                { Icon: Instagram, label: 'Instagram' },
                { Icon: Facebook, label: 'Facebook' },
                { Icon: Youtube, label: 'Youtube' },
              ].map(({ Icon, label }) => (
                <Link
                  key={label}
                  href="#"
                  className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all transform hover:-translate-y-1"
                >
                  <Icon size={18} />
                </Link>
              ))}
            </div>
          </div>

          {footerLinks.map((column) => (
            <div key={column.title}>
              <h4 className="text-sm font-black text-slate-900 mb-8 uppercase tracking-[0.2em]">{column.title}</h4>
              <ul className="space-y-4">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-slate-500 hover:text-primary transition-colors font-medium">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="lg:col-span-1">
            <h4 className="text-sm font-black text-slate-900 mb-8 uppercase tracking-[0.2em]">Our Newsletter</h4>
            <p className="text-sm text-slate-500 mb-6 leading-relaxed">Subscribe for weekly harvest updates and exclusive offers.</p>
            <NewsletterForm />
          </div>
          
        </div>

        <div className="mt-20 pt-8 border-t border-slate-50 flex flex-col md:flex-row items-center justify-between gap-6 text-[11px] font-bold uppercase tracking-widest text-slate-400">
          <p>© 2026 Next360. All Premium Rights Reserved.</p>
          <div className="flex flex-wrap items-center gap-4">
             <div className="flex items-center gap-4 bg-slate-50 px-4 py-2 rounded-full">
               {['UPI', 'VISA', 'RAZORPAY'].map((item) => (
                 <span key={item} className="opacity-60">{item}</span>
               ))}
             </div>
             <p className="text-slate-300">Made with ❤️ for organic farms</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
