import Link from 'next/link';
import { Leaf, Instagram, Facebook, Youtube, CreditCard, Banknote } from 'lucide-react';

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
  { label: 'Careers', href: '/about' },
];

const customerCare = [
  { label: 'Track Order', href: '/account' },
  { label: 'Returns & Refunds', href: '/contact' },
  { label: 'FAQ', href: '/contact' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Privacy Policy', href: '/about' },
];

const Footer = () => {
  return (
    <footer className="mt-16 bg-primary text-white/90">
      <div className="gc-container px-6 py-14">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Leaf className="w-6 h-6 text-secondary" strokeWidth={2.5} />
              <span className="gc-display text-2xl font-bold text-white">Next360</span>
            </Link>
            <p className="text-sm text-white/60 leading-relaxed font-medium">
              Pure organic living, delivered fresh. Sourced from trusted farms, packed with care.
            </p>
            <div className="mt-4 space-y-1.5 text-sm font-semibold text-white/70">
              <p>123 Organic Lane, Green Valley, CA 95014</p>
              <p>(555) 123-4567</p>
              <p>hello@Next360.com</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="gc-display text-base font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm font-semibold text-white/60 hover:text-secondary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="gc-display text-base font-bold text-white mb-4">Customer Care</h4>
            <ul className="space-y-2.5">
              {customerCare.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm font-semibold text-white/60 hover:text-secondary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter + Social */}
          <div>
            <h4 className="gc-display text-base font-bold text-white mb-4">Stay Connected</h4>
            <p className="text-sm text-white/60 font-medium mb-3">
              Get organic deals, seasonal picks & wellness tips.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 rounded-xl bg-white/10 border border-white/20 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-secondary/50"
              />
              <button
                type="submit"
                className="rounded-xl bg-secondary px-4 py-2 text-sm font-bold text-white hover:bg-secondary-light transition-colors"
              >
                Subscribe
              </button>
            </form>

            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-5">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="size-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="size-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="size-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors" aria-label="YouTube">
                <Youtube size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/15 flex flex-wrap items-center justify-between gap-4">
          <p className="gc-display text-xs text-white/50">© 2026 Next360. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <span className="text-xs text-white/40 font-medium">We accept:</span>
            <div className="flex items-center gap-2 text-white/50">
              <Banknote size={20} />
              <CreditCard size={20} />
              <span className="text-xs font-bold border border-white/30 rounded px-1.5 py-0.5">UPI</span>
              <span className="text-xs font-bold border border-white/30 rounded px-1.5 py-0.5">VISA</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
