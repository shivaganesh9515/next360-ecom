"use client"

import React, { useState, useEffect, useRef } from 'react'
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
  Bell
} from 'lucide-react'
import { m, AnimatePresence } from 'framer-motion'
import { cn } from '@next360/utils'
import { CATEGORIES } from '@next360/utils'
import { useCartStore } from '@/store/cartStore'
import { useAuthStore } from '@/store/authStore'
import { useWishlistStore } from '@/store/wishlistStore'
import { Button, Avatar, Badge } from '@next360/ui'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { productService } from '@/services/productService'
import { notificationService } from '@/services/notificationService'
import Image from 'next/image'

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Shop', href: '/shop' },
  { name: 'Categories', href: '#', hasDropdown: true },
  { name: 'Blog', href: '/blog' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isAccountOpen, setIsAccountOpen] = useState(false)
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  
  const router = useRouter()
  const { user, isAuthenticated, logout } = useAuthStore()
  const cartItemCount = useCartStore((state) => state.getItemCount())
  const wishlistCount = useWishlistStore((state) => state.getCount())
  const toggleCart = useCartStore((state) => state.toggleDrawer)

  const searchRef = useRef<HTMLDivElement>(null)
  const categoriesRef = useRef<HTMLDivElement>(null)
  const accountRef = useRef<HTMLDivElement>(null)
  const notificationRef = useRef<HTMLDivElement>(null)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)

  const { data: unreadData } = useQuery({
    queryKey: ['notifications', 'unread-count'],
    queryFn: () => notificationService.getUnreadCount(),
    enabled: isAuthenticated,
    refetchInterval: 60 * 1000, // Refresh every minute
  })

  const unreadCount = unreadData?.count || 0

  const { data: recentNotifications = [] } = useQuery({
    queryKey: ['notifications', 'recent'],
    queryFn: () => notificationService.getAll(),
    enabled: isAuthenticated && isNotificationsOpen,
  })

  const { data: suggestions = [], isLoading: isSearching } = useQuery({
    queryKey: ['products', 'search', searchQuery],
    queryFn: () => productService.search(searchQuery),
    enabled: searchQuery.length > 2,
    staleTime: 60 * 1000,
  })

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`)
      setIsSearchOpen(false)
      setSearchQuery('')
    }
  }

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        scrolled ? "bg-white shadow-nav py-3" : "bg-transparent py-5"
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl">🌿</span>
          <span className={cn(
            "font-display text-2xl font-bold transition-colors",
            scrolled ? "text-primary" : "text-white"
          )}>
            Next360
          </span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li 
              key={link.name} 
              className="relative"
              onMouseEnter={() => link.hasDropdown && setIsCategoriesOpen(true)}
              onMouseLeave={() => link.hasDropdown && setIsCategoriesOpen(false)}
            >
              <Link 
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary flex items-center gap-1",
                  scrolled ? "text-slate-600" : "text-white/90 hover:text-white"
                )}
              >
                {link.name}
                {link.hasDropdown && <ChevronDown size={14} />}
              </Link>

              {/* Mega Dropdown */}
              {link.hasDropdown && (
                <AnimatePresence>
                  {isCategoriesOpen && (
                    <m.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[600px] bg-white shadow-xl rounded-2xl p-6 border border-slate-100"
                    >
                      <div className="grid grid-cols-2 gap-4">
                        {CATEGORIES.map((cat) => (
                          <Link 
                            key={cat.slug} 
                            href={`/shop?category=${cat.slug}`}
                            className="flex items-center gap-4 p-3 rounded-xl hover:bg-cream transition-colors group"
                          >
                            <span className="text-2xl">{cat.icon}</span>
                            <div>
                              <p className="font-semibold text-slate-800 group-hover:text-primary">{cat.name}</p>
                              <p className="text-xs text-muted">View Category</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </m.div>
                  )}
                </AnimatePresence>
              )}
            </li>
          ))}
        </ul>

        {/* Right Icons */}
        <div className="flex items-center gap-2 md:gap-5">
          {/* Search */}
          <div className="relative flex items-center" ref={searchRef}>
            <AnimatePresence>
              {isSearchOpen && (
                <div className="absolute right-full mr-2">
                  <m.form 
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 300, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    onSubmit={handleSearch}
                    className="relative"
                  >
                    <input
                      autoFocus
                      type="text"
                      placeholder="Search organic products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-cream border-none rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                    />
                    
                    {/* Suggestions Dropdown */}
                    <AnimatePresence>
                      {searchQuery.length > 2 && (suggestions.length > 0 || isSearching) && (
                        <m.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute top-full left-0 right-0 mt-2 bg-white shadow-2xl rounded-2xl overflow-hidden border border-slate-100 z-50"
                        >
                          {isSearching ? (
                            <div className="p-4 text-center text-xs font-bold text-slate-400">Searching farm...</div>
                          ) : (
                            <div className="max-h-80 overflow-y-auto">
                              {suggestions.map((p) => (
                                <Link
                                  key={p.id}
                                  href={`/product/${p.slug}`}
                                  onClick={() => setIsSearchOpen(false)}
                                  className="flex items-center gap-3 p-3 hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-none"
                                >
                                  <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0">
                                    <Image src={p.images[0]} alt={p.name} fill className="object-cover" />
                                  </div>
                                  <div className="flex-1 overflow-hidden">
                                    <p className="text-xs font-bold text-slate-900 truncate">{p.name}</p>
                                    <p className="text-[10px] text-primary font-bold">₹{(p.price / 100).toFixed(2)}</p>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          )}
                        </m.div>
                      )}
                    </AnimatePresence>
                  </m.form>
                </div>
              )}
            </AnimatePresence>
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label={isSearchOpen ? "Close search" : "Open search"}
              className={cn(
                "p-2 rounded-full transition-colors",
                scrolled ? "hover:bg-slate-100 text-slate-600" : "hover:bg-white/10 text-white"
              )}
            >
              {isSearchOpen ? <X size={20} /> : <Search size={20} />}
            </button>
          </div>

          {/* Wishlist */}
          <Link 
            href="/account/wishlist"
            aria-label={`View wishlist (${wishlistCount} items)`}
            className={cn(
              "p-2 rounded-full relative transition-colors",
              scrolled ? "hover:bg-slate-100 text-slate-600" : "hover:bg-white/10 text-white"
            )}
          >
            <Heart size={20} />
            {wishlistCount > 0 && (
              <span className="absolute top-0 right-0 bg-accent text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Notifications */}
          {isAuthenticated && (
            <div className="relative" ref={notificationRef}>
              <button 
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                aria-label={`View notifications (${unreadCount} unread)`}
                className={cn(
                  "p-2 rounded-full relative transition-colors",
                  scrolled ? "hover:bg-slate-100 text-slate-600" : "hover:bg-white/10 text-white"
                )}
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                    {unreadCount}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {isNotificationsOpen && (
                  <m.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-3 w-80 bg-white shadow-xl rounded-2xl p-2 border border-slate-100 overflow-hidden"
                  >
                    <div className="px-4 py-3 border-b border-slate-50 mb-1 flex justify-between items-center">
                      <p className="font-bold text-slate-800 text-sm">Notifications</p>
                      {unreadCount > 0 && (
                        <button 
                          onClick={() => notificationService.markAllAsRead()}
                          className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline"
                        >
                          Mark all as read
                        </button>
                      )}
                    </div>
                    
                    <div className="max-h-96 overflow-y-auto custom-scrollbar">
                      {recentNotifications.length > 0 ? (
                        recentNotifications.map((notif) => (
                          <div 
                            key={notif.id}
                            className={cn(
                              "p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer mb-1 last:mb-0 border-l-4",
                              notif.isRead ? "border-transparent opacity-60" : "border-primary bg-primary/5"
                            )}
                            onClick={() => !notif.isRead && notificationService.markAsRead(notif.id)}
                          >
                            <p className="font-bold text-slate-800 text-xs mb-0.5">{notif.title}</p>
                            <p className="text-[10px] text-slate-500 line-clamp-2">{notif.message}</p>
                            <p className="text-[8px] text-slate-400 mt-1 font-bold">
                              {new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        ))
                      ) : (
                        <div className="p-8 text-center">
                          <Bell className="mx-auto text-slate-200 mb-2" size={24} />
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">No notifications</p>
                        </div>
                      )}
                    </div>
                    
                    <Link 
                      href="/account/profile" // Link to profile for now since no notifications page
                      className="block text-center py-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors border-t border-slate-50 mt-1"
                      onClick={() => setIsNotificationsOpen(false)}
                    >
                      View all activity
                    </Link>
                  </m.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Account */}
          <div className="relative" ref={accountRef}>
            {isAuthenticated ? (
              <button 
                onClick={() => setIsAccountOpen(!isAccountOpen)}
                className="flex items-center gap-2"
              >
                <Avatar src={user?.image} name={user?.name} size="sm" className="border-2 border-white/20" />
              </button>
            ) : (
              <Link href="/login">
                <Button 
                  variant={scrolled ? "primary" : "secondary"} 
                  size="sm" 
                  className="hidden md:flex rounded-full"
                >
                  Login
                </Button>
                <UserIcon className={cn("md:hidden", scrolled ? "text-slate-600" : "text-white")} size={22} />
              </Link>
            )}

            {/* Account Dropdown */}
            <AnimatePresence>
              {isAccountOpen && (
                <m.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-3 w-56 bg-white shadow-xl rounded-2xl p-2 border border-slate-100"
                >
                  <div className="px-4 py-3 border-b border-slate-50 mb-1">
                    <p className="text-xs text-muted">Hi, {user?.name}</p>
                    <p className="text-sm font-semibold text-primary">🌱 {user?.seeds || 0} Seeds</p>
                  </div>
                  {[
                    { name: 'My Orders', href: '/account/orders' },
                    { name: 'Subscriptions', href: '/account/subscriptions' },
                    { name: 'Profile', href: '/account/profile' },
                  ].map((item) => (
                    <Link 
                      key={item.name} 
                      href={item.href}
                      className="block px-4 py-2 text-sm text-slate-600 hover:bg-cream hover:text-primary rounded-lg transition-colors"
                      onClick={() => setIsAccountOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <button 
                    onClick={() => {
                      logout()
                      setIsAccountOpen(false)
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg transition-colors mt-1"
                  >
                    Logout
                  </button>
                </m.div>
              )}
            </AnimatePresence>
          </div>

          {/* Cart */}
          <button 
            onClick={toggleCart}
            aria-label={`View shopping cart (${cartItemCount} items)`}
            className={cn(
              "p-2 rounded-full relative transition-colors",
              scrolled ? "hover:bg-slate-100 text-slate-600" : "hover:bg-white/10 text-white"
            )}
          >
            <ShoppingCart size={20} />
            {cartItemCount > 0 && (
              <span className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </button>

          {/* Mobile Toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className={cn(
              "md:hidden p-2 rounded-full",
              scrolled ? "text-slate-600" : "text-white"
            )}
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <m.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-white z-[60] flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b">
              <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                <span className="text-2xl">🌿</span>
                <span className="font-display text-2xl font-bold text-primary">Next360</span>
              </Link>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-slate-600"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
              <ul className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    {link.hasDropdown ? (
                      <div className="space-y-4">
                        <p className="text-2xl font-bold text-slate-800">Categories</p>
                        <div className="grid grid-cols-1 gap-2 pl-2">
                          {CATEGORIES.map((cat) => (
                            <Link 
                              key={cat.slug} 
                              href={`/shop?category=${cat.slug}`}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="flex items-center gap-3 py-2 text-slate-600"
                            >
                              <span>{cat.icon}</span>
                              <span>{cat.name}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link 
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-2xl font-bold text-slate-800 hover:text-primary transition-colors"
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 border-t bg-cream/30">
              {isAuthenticated ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar src={user?.image} name={user?.name} />
                    <div>
                      <p className="font-bold text-slate-800">{user?.name}</p>
                      <p className="text-xs text-primary">🌱 {user?.seeds} Seeds</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => logout()}>Logout</Button>
                </div>
              ) : (
                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full rounded-xl py-6 text-lg">Login to Account</Button>
                </Link>
              )}
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  )
}
