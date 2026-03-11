"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  Search, 
  ShoppingCart, 
  Heart, 
  User as UserIcon, 
  Menu, 
  X, 
  ChevronDown,
  Bell,
  MapPin
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@next360/utils'
import { useCartStore } from '@/store/cartStore'
import { useAuthStore } from '@/store/authStore'
import { useWishlistStore } from '@/store/wishlistStore'
import { useLocationStore } from '@/store/locationStore'
import { useModeStore } from '@/store/modeStore'
import { Button, Avatar, Badge } from '@next360/ui'
import { PLATFORM_MODE_META } from '@next360/types/location'
import LocationBar from '../location/LocationBar'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  const { user, isAuthenticated, logout } = useAuthStore()
  const cartItemCount = useCartStore((state) => state.getItemCount())
  const wishlistCount = useWishlistStore((state) => state.getCount())
  const toggleCart = useCartStore((state) => state.toggleDrawer)
  
  const { enabledModes } = useLocationStore()
  const { activeMode, setMode } = useModeStore()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 w-full z-50 h-20 transition-all duration-500 flex items-center",
        scrolled 
          ? "creamy-glass shadow-nav border-b border-cream-dark/50 py-3" 
          : "bg-transparent py-5"
      )}
    >
      <div className="max-w-[1700px] mx-auto px-6 sm:px-10 lg:px-12 w-full flex items-center justify-between gap-8">
        
        {/* LEFT CLUSTER */}
        <div className="flex items-center gap-4 lg:gap-8 flex-1 lg:flex-none">
          <Link href="/" className="flex items-center gap-0.5 shrink-0">
            <span className="text-[1.8rem] md:text-[2.2rem] font-black tracking-tighter text-text">
              next<span className="text-primary">360</span>
            </span>
          </Link>
          
          <LocationBar />
        </div>

        {/* CENTER — SEARCH BAR (Desktop) */}
        <div className="hidden lg:flex items-center flex-1 max-w-2xl relative group mx-4">
          <div className="absolute left-5 text-muted group-focus-within:text-primary transition-all duration-300 scale-100 group-focus-within:scale-110">
            <Search size={18} strokeWidth={2.5} />
          </div>
          <input 
            type="text" 
            placeholder="Search the collective registry..."
            className="w-full bg-cream-dark/30 border border-transparent rounded-[1.25rem] py-3.5 pl-14 pr-6 text-sm font-medium focus:ring-4 focus:ring-primary/5 focus:bg-cream-light focus:border-cream-dark transition-all duration-500 outline-none placeholder:text-muted placeholder:font-black placeholder:uppercase placeholder:tracking-widest placeholder:text-[10px]"
          />
          <div className="absolute right-4 px-2 py-1 rounded-md bg-cream border border-cream-dark text-[10px] font-black text-muted opacity-0 group-focus-within:opacity-100 transition-opacity">
            ESC
          </div>
        </div>

        {/* RIGHT CLUSTER */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <button className="lg:hidden p-2 rounded-full hover:bg-slate-100 text-slate-600 transition-colors">
            <Search size={22} />
          </button>

          <Link href="/account/wishlist" className="p-2.5 rounded-full hover:bg-slate-100 text-slate-600 transition-all relative group">
            <Heart size={22} className="group-hover:scale-110 duration-200" />
            {wishlistCount > 0 && (
              <span className="absolute top-1.5 right-1.5 bg-secondary text-white text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 border-white">
                {wishlistCount}
              </span>
            )}
          </Link>

          <button 
            onClick={toggleCart}
            className="p-2.5 rounded-full hover:bg-slate-100 text-slate-600 transition-all relative group"
          >
            <ShoppingCart size={22} className="group-hover:scale-110 duration-200" />
            {cartItemCount > 0 && (
              <span className="absolute top-1.5 right-1.5 bg-primary text-white text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 border-white">
                {cartItemCount}
              </span>
            )}
          </button>

          {isAuthenticated ? (
            <Link href="/account" className="ml-2">
              <Avatar src={user?.image} name={user?.name} size="sm" className="border-2 border-slate-100" />
            </Link>
          ) : (
            <Link href="/login" className="ml-2">
              <Button variant="primary" size="sm">Sign In</Button>
            </Link>
          )}

          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden p-2 text-text"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Overlay Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-white flex flex-col p-6"
          >
            <div className="flex items-center justify-between mb-10">
              <span className="font-display text-2xl font-bold text-primary">Menu</span>
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X size={32} />
              </button>
            </div>
            
            <nav className="flex flex-col gap-8">
              {['Home', 'Shop', 'Categories', 'Contact'].map(item => (
                <Link 
                  key={item} 
                  href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                  className="text-4xl font-display font-bold text-text"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}
            </nav>

            <div className="mt-auto pt-10 border-t border-border space-y-4">
              {isAuthenticated ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar src={user?.image} name={user?.name} size="lg" />
                    <div>
                      <p className="font-bold text-xl">{user?.name}</p>
                      <p className="text-primary font-medium">🌱 {user?.seeds} Seeds</p>
                    </div>
                  </div>
                  <Button variant="outline" onClick={() => logout()}>Logout</Button>
                </div>
              ) : (
                <Link href="/login" className="block">
                  <Button fullWidth size="lg">Sign In to Account</Button>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
