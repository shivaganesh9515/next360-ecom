'use client';

import Link from 'next/link';
import { useState, useEffect, useRef, useCallback } from 'react';
import { ShoppingCart, Menu, X, ChevronDown, Search, Heart, User, Leaf } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SearchDropdown from '@/components/layout/SearchDropdown';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop', mega: true },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const megaCategories = [
  { label: 'Vegetables', href: '/shop?category=vegetables', icon: '🥬' },
  { label: 'Fruits', href: '/shop?category=fruits', icon: '🍎' },
  { label: 'Dairy & Eggs', href: '/shop?category=dairy-eggs', icon: '🥚' },
  { label: 'Grains', href: '/shop?category=grains', icon: '🌾' },
  { label: 'Herbs & Spices', href: '/shop?category=herbs-spices', icon: '🌿' },
  { label: 'Oils & Ghee', href: '/shop?category=oils-ghee', icon: '🫒' },
];

const Navbar = () => {
  const cartItems = useCartStore((s) => s.items);
  const openDrawer = useCartStore((s) => s.openDrawer);
  const wishlistItems = useWishlistStore((s) => s.items);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlistItems.length;

  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const closeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  const handleMegaEnter = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setMegaOpen(true);
  }, []);

  const handleMegaLeave = useCallback(() => {
    closeTimerRef.current = setTimeout(() => setMegaOpen(false), 180);
  }, []);

  useEffect(() => {
    if (scrolled) setMobileOpen(false);
  }, [scrolled]);

  // Close mobile nav on route change
  useEffect(() => {
    setMobileOpen(false);
    setMegaOpen(false);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/shop?search=${encodeURIComponent(searchQuery.trim())}`;
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <motion.header
      className={`z-50 w-full transition-all duration-500 ${scrolled ? 'fixed top-0 left-0 px-4 pt-3' : 'relative pt-6'}`}
      initial={false}
    >
      <motion.div
        className={`mx-auto transition-all duration-500 ease-out ${scrolled ? 'max-w-[900px]' : 'gc-container'}`}
        layout
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className={`relative z-20 border border-border px-5 transition-all duration-500 ease-out ${
            scrolled
              ? 'rounded-full py-2.5 bg-surface-raised/85 backdrop-blur-xl shadow-[0_8px_32px_rgba(44,36,24,0.12)]'
              : 'rounded-t-[18px] py-5 bg-surface-raised'
          }`}
          layout
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className={`flex items-center gap-2 leading-none transition-all duration-300`}>
              <Leaf className={`text-primary transition-all duration-300 ${scrolled ? 'w-5 h-5' : 'w-6 h-6'}`} strokeWidth={2.5} />
              <span className={`gc-display font-bold text-primary tracking-tight transition-all duration-300 ${scrolled ? 'text-[20px]' : 'text-[26px]'}`}>
                Next360
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-7 font-bold text-text">
              {navLinks.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.mega && handleMegaEnter()}
                  onMouseLeave={() => item.mega && handleMegaLeave()}
                >
                  <Link
                    href={item.href}
                    className={`gc-display tracking-[0.03em] hover:text-primary transition-colors inline-flex items-center gap-1 ${scrolled ? 'text-[13px]' : 'text-sm'}`}
                    onClick={(e) => {
                      if (item.mega) {
                        e.preventDefault();
                        setMegaOpen((v) => !v);
                      }
                    }}
                  >
                    {item.label}
                    {item.mega && (
                      <motion.span
                        animate={{ rotate: megaOpen ? 180 : 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <ChevronDown size={14} />
                      </motion.span>
                    )}
                  </Link>

                  {/* Mega Dropdown */}
                  {item.mega && (
                    <AnimatePresence>
                      {megaOpen && (
                        <>
                          <div className="absolute left-1/2 -translate-x-1/2 top-full w-[620px] h-[28px]" />
                          <motion.div
                            className="absolute left-1/2 -translate-x-1/2 top-[calc(100%+20px)] w-[620px] rounded-[20px] border border-border bg-surface-raised/95 backdrop-blur-xl p-6 shadow-[0_24px_50px_rgba(44,36,24,0.15)]"
                            initial={{ opacity: 0, y: 12, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.98 }}
                            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                          >
                            <p className="gc-display text-xs text-muted uppercase tracking-widest mb-4">Shop by Category</p>
                            <div className="grid grid-cols-3 gap-3">
                              {megaCategories.map((cat) => (
                                <Link
                                  key={cat.label}
                                  href={cat.href}
                                  className="flex items-center gap-3 rounded-xl p-3 hover:bg-cream-dark transition-colors group"
                                  onClick={() => setMegaOpen(false)}
                                >
                                  <span className="text-2xl">{cat.icon}</span>
                                  <span className="gc-display text-sm text-text group-hover:text-primary transition-colors">{cat.label}</span>
                                </Link>
                              ))}
                            </div>
                            <div className="mt-4 pt-4 border-t border-border-light">
                              <Link href="/shop" className="gc-display text-sm text-primary hover:text-primary-light transition-colors" onClick={() => setMegaOpen(false)}>
                                View All Products →
                              </Link>
                            </div>
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <SearchDropdown />

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className={`hidden lg:flex relative rounded-xl border border-border bg-cream-dark items-center justify-center hover:bg-cream transition-all duration-300 ${scrolled ? 'size-9' : 'size-10'}`}
                aria-label="Wishlist"
              >
                <Heart size={scrolled ? 15 : 17} className="text-text" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-accent text-white text-[10px] font-bold flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Account */}
              <Link
                href="/login"
                className={`hidden lg:flex rounded-xl border border-border bg-cream-dark items-center justify-center hover:bg-cream transition-all duration-300 ${scrolled ? 'size-9' : 'size-10'}`}
                aria-label="Account"
              >
                <User size={scrolled ? 15 : 17} className="text-text" />
              </Link>

              {/* Cart */}
              <button
                onClick={openDrawer}
                className={`relative rounded-xl bg-primary text-white flex items-center justify-center transition-all duration-300 ${scrolled ? 'size-9' : 'size-10'}`}
                aria-label="Cart"
              >
                <ShoppingCart size={scrolled ? 15 : 17} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-accent text-white text-[10px] font-bold flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile hamburger */}
              <button
                className={`lg:hidden rounded-xl border border-border bg-cream-dark flex items-center justify-center transition-all duration-300 ${scrolled ? 'size-9' : 'size-10'}`}
                onClick={() => setMobileOpen((v) => !v)}
                aria-label="Menu"
              >
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>

          {/* Mobile nav */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                className="lg:hidden mt-4 rounded-2xl border border-border bg-cream-dark p-3 space-y-2"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Mobile search */}
                <form onSubmit={handleSearch} className="mb-2">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="w-full rounded-xl border border-border bg-cream px-4 py-2.5 text-sm font-medium text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </form>

                {navLinks.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.25 }}
                  >
                    <Link
                      href={item.href}
                      className="block gc-display text-sm px-3 py-2 rounded-xl bg-cream hover:bg-surface-raised transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}

                {/* Mobile categories accordion */}
                <div className="rounded-xl bg-cream p-3">
                  <p className="gc-display text-sm text-text mb-2">Categories</p>
                  <div className="space-y-1">
                    {megaCategories.map((cat) => (
                      <Link
                        key={cat.label}
                        href={cat.href}
                        className="flex items-center gap-2 text-sm font-medium text-muted hover:text-primary transition-colors py-1"
                        onClick={() => setMobileOpen(false)}
                      >
                        <span>{cat.icon}</span>
                        <span>{cat.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {scrolled && <div className="h-[72px]" />}
    </motion.header>
  );
};

export default Navbar;
