// @ts-nocheck
'use client'
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import { ShoppingCart, Menu, X, ArrowRight, ChevronDown } from "lucide-react";
import { useSelector } from "react-redux";
import { assets } from "@/assets/assets";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop", mega: true },
    { label: "About Us", href: "/#about" },
    { label: "Press", href: "/#press" },
    { label: "Contact Us", href: "/#contact" },
];

const dropdownGroups = [
    "All Categories",
    "Fresh Produce",
    "Pantry Staples",
    "Natural Wellness",
];

const Navbar = () => {
    const cartCount = useSelector((state) => state.cart.total);
    const [megaOpen, setMegaOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const closeTimerRef = useRef(null);

    // Scroll listener for floating effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 80);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Debounced hover handlers for mega dropdown
    const handleMegaEnter = useCallback(() => {
        if (closeTimerRef.current) {
            clearTimeout(closeTimerRef.current);
            closeTimerRef.current = null;
        }
        setMegaOpen(true);
    }, []);

    const handleMegaLeave = useCallback(() => {
        closeTimerRef.current = setTimeout(() => {
            setMegaOpen(false);
        }, 180);
    }, []);

    // Close mobile nav on scroll
    useEffect(() => {
        if (scrolled) setMobileOpen(false);
    }, [scrolled]);

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
                    className={`relative z-20 border border-[#d6cebf] px-5 transition-all duration-500 ease-out ${
                        scrolled
                            ? 'rounded-full py-2.5 bg-[#f7f3ec]/85 backdrop-blur-xl shadow-[0_8px_32px_rgba(44,36,24,0.12)]'
                            : 'rounded-t-[18px] py-5 bg-[#f7f3ec]'
                    }`}
                    layout
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div className="flex items-center justify-between gap-4">
                        {/* Logo */}
                        <Link href="/" className={`leading-none font-black tracking-tight text-[#2d6a4f] transition-all duration-300 ${scrolled ? 'text-[22px]' : 'text-[28px]'}`}>
                            Next360
                        </Link>

                        {/* Desktop nav */}
                        <nav className="hidden lg:flex items-center gap-7 font-bold text-[#2c2418]">
                            {navLinks.map((item) => (
                                <div
                                    key={item.label}
                                    className="relative"
                                    onMouseEnter={() => item.mega && handleMegaEnter()}
                                    onMouseLeave={() => item.mega && handleMegaLeave()}
                                >
                                    <Link
                                        href={item.href}
                                        className={`gc-display tracking-[0.03em] hover:text-[#2d6a4f] transition-colors inline-flex items-center gap-1 ${scrolled ? 'text-[13px]' : 'text-sm'}`}
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

                                    {/* Mega dropdown with hover bridge */}
                                    {item.mega && (
                                        <AnimatePresence>
                                            {megaOpen && (
                                                <>
                                                    {/* Invisible bridge to cover the gap */}
                                                    <div className="absolute left-1/2 -translate-x-1/2 top-full w-[980px] h-[28px]" />

                                                    <motion.div
                                                        className="absolute left-1/2 -translate-x-1/2 top-[calc(100%+20px)] w-[980px] rounded-[24px] border border-[#d6cebf] bg-[#f7f3ec]/95 backdrop-blur-xl p-5 shadow-[0_24px_50px_rgba(44,36,24,0.2)]"
                                                        initial={{ opacity: 0, y: 12, scale: 0.97 }}
                                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                                                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                                                    >
                                                        <div className="grid grid-cols-[1fr_1fr_1fr] gap-5">
                                                            <div className="rounded-2xl p-3">
                                                                <ul className="space-y-4 pt-1">
                                                                    {dropdownGroups.map((label) => (
                                                                        <motion.li
                                                                            key={label}
                                                                            whileHover={{ x: 6 }}
                                                                            transition={{ duration: 0.2 }}
                                                                        >
                                                                            <Link href="/shop" className="gc-display text-[15px] text-[#2c2418] hover:text-[#2d6a4f] transition-colors">
                                                                                {label}
                                                                            </Link>
                                                                        </motion.li>
                                                                    ))}
                                                                </ul>
                                                            </div>

                                                            <Link href="/shop" className="group rounded-2xl border border-[#d6cebf] bg-[#eae6db] p-3 relative overflow-hidden min-h-[320px]">
                                                                <p className="gc-display text-xl text-[#2c2418]">Organic Bestsellers</p>
                                                                <Image src='https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400' alt="Organic Bestsellers" width={240} height={240} className="absolute bottom-0 right-0 w-60 h-auto rounded-xl transition-transform duration-500 group-hover:scale-105" />
                                                                <span className="absolute bottom-4 right-4 size-11 rounded-xl bg-[#2d6a4f] text-white inline-flex items-center justify-center group-hover:scale-110 transition-transform">
                                                                    <ArrowRight size={18} />
                                                                </span>
                                                            </Link>

                                                            <Link href="/shop" className="group rounded-2xl border border-[#d6cebf] bg-[#ece8dd] p-3 relative overflow-hidden min-h-[320px]">
                                                                <p className="gc-display text-xl text-[#2c2418]">Seasonal Picks</p>
                                                                <Image src='https://images.unsplash.com/photo-1518843875459-f738682238a6?w=400' alt="Seasonal picks" width={240} height={240} className="absolute bottom-0 right-0 w-60 h-auto rounded-xl transition-transform duration-500 group-hover:scale-105" />
                                                                <span className="absolute bottom-4 right-4 size-11 rounded-xl bg-[#2d6a4f] text-white inline-flex items-center justify-center group-hover:scale-110 transition-transform">
                                                                    <ArrowRight size={18} />
                                                                </span>
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
                        <div className="flex items-center gap-2.5">
                            <Link href="/cart" className={`relative rounded-xl bg-[#2d6a4f] text-white flex items-center justify-center transition-all duration-300 ${scrolled ? 'size-10' : 'size-12'}`}>
                                <ShoppingCart size={scrolled ? 16 : 19} />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-[#2c2418] text-white text-[10px] font-bold flex items-center justify-center">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                            <button
                                className={`lg:hidden rounded-xl border border-[#d6cebf] bg-[#f2ede4] flex items-center justify-center transition-all duration-300 ${scrolled ? 'size-10' : 'size-12'}`}
                                onClick={() => setMobileOpen((v) => !v)}
                            >
                                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile nav */}
                    <AnimatePresence>
                        {mobileOpen && (
                            <motion.div
                                className="lg:hidden mt-4 rounded-2xl border border-[#d6cebf] bg-[#f2ede4] p-3 space-y-2"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            >
                                {navLinks.map((item, i) => (
                                    <motion.div
                                        key={item.label}
                                        initial={{ opacity: 0, x: -16 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05, duration: 0.25 }}
                                    >
                                        <Link href={item.href === "/#about" ? "/" : item.href} className="block gc-display text-sm px-3 py-2 rounded-xl bg-[#f7f3ec]">
                                            {item.label}
                                        </Link>
                                    </motion.div>
                                ))}
                                <div className="rounded-xl bg-[#f7f3ec] p-3">
                                    <p className="gc-display text-sm">Shop Categories</p>
                                    <div className="mt-2 space-y-1">
                                        {dropdownGroups.map((label) => (
                                            <Link key={label} href="/shop" className="block text-sm font-bold text-[#5c4e3c]">{label}</Link>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </motion.div>

            {/* Spacer to prevent content jump when navbar becomes fixed */}
            {scrolled && <div className="h-[72px]" />}
        </motion.header>
    );
};

export default Navbar;
