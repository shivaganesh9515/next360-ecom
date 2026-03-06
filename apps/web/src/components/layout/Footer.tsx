import React from 'react'
import Link from 'next/link'
import { Instagram, Facebook, Youtube, MapPin, Phone, Mail } from 'lucide-react'
import NewsletterForm from './NewsletterForm'

const footerLinks = [
  {
    title: 'Quick Links',
    links: [
      { name: 'Home', href: '/' },
      { name: 'Shop', href: '/shop' },
      { name: 'Blog', href: '/blog' },
      { name: 'About', href: '/about' },
      { name: 'Careers', href: '/careers' },
    ]
  },
  {
    title: 'Customer Care',
    links: [
      { name: 'Track Order', href: '/account/orders' },
      { name: 'Returns', href: '/returns' },
      { name: 'FAQ', href: '/faq' },
      { name: 'Contact', href: '/contact' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
    ]
  }
]

export default function Footer() {
  return (
    <footer className="bg-primary text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        {/* Col 1: Brand */}
        <div className="space-y-6">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-3xl">🌿</span>
            <span className="font-display text-2xl font-bold tracking-tight">Next360</span>
          </Link>
          <p className="text-white/70 leading-relaxed max-w-xs">
            Farm to your table, 100% certified organic. Premium products for a healthier lifestyle.
          </p>
          <ul className="space-y-4 text-sm text-white/80">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-accent shrink-0 mt-1" />
              <span>Hyderabad, India</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-accent shrink-0" />
              <span>+91-XXXXXXXXXX</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-accent shrink-0" />
              <span>hello@next360.in</span>
            </li>
          </ul>
        </div>

        {/* Links Col 2 & 3 */}
        {footerLinks.map((column) => (
          <div key={column.title} className="space-y-6">
            <h4 className="text-lg font-bold font-display tracking-wide">{column.title}</h4>
            <ul className="space-y-3">
              {column.links.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-white/70 hover:text-accent transition-colors text-sm flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Col 4: Newsletter */}
        <div className="space-y-6">
          <h4 className="text-lg font-bold font-display tracking-wide">Stay Connected</h4>
          <p className="text-sm text-white/70">Get 10% off your first order plus organic living tips.</p>
          <NewsletterForm />
          <div className="pt-4 flex items-center gap-4">
            {[Instagram, Facebook, Youtube].map((Icon, i) => (
              <Link 
                key={i} 
                href="#" 
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-primary transition-all duration-300"
              >
                <Icon size={20} />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-sm text-white/50 text-center md:text-left">
          © 2025 Next360. All rights reserved.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {['UPI', 'Visa', 'Mastercard', 'Razorpay'].map((badge) => (
            <span 
              key={badge} 
              className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold tracking-widest text-white/60 uppercase"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>
    </footer>
  )
}
