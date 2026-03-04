ï»¿// @ts-nocheck
'use client'
import { assets } from '@/assets/assets'
import { ArrowRight, Sparkles } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import CategoriesMarquee from './CategoriesMarquee'
import { motion } from 'framer-motion'

const stagger = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15,
        },
    },
}

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

const slideIn = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

const Hero = () => {
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$'

    return (
        <div className='gc-container mt-8'>
            <div className='grid xl:grid-cols-[1.3fr_0.9fr] gap-6 items-stretch'>
                <section className='relative overflow-hidden rounded-[34px] bg-[#1b4332] text-white p-6 sm:p-10 min-h-[470px] shadow-[0_30px_60px_rgba(27,67,50,0.32)]'>
                    {/* Animated glow orbs */}
                    <motion.div
                        className='absolute -top-24 -right-20 w-72 h-72 rounded-full bg-[#52b788]/35 blur-3xl'
                        animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
                        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <motion.div
                        className='absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-[#d8f3dc]/20 blur-3xl'
                        animate={{ x: [0, -15, 0], y: [0, 20, 0] }}
                        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                    />

                    {/* Staggered content */}
                    <motion.div
                        className='relative z-10 max-w-xl'
                        variants={stagger}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.div variants={fadeUp} className='inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs sm:text-sm font-semibold'>
                            <Sparkles size={14} className='text-[#95d5b2]' />
                            Farm-fresh organic produce, delivered same day
                        </motion.div>

                        <motion.h1 variants={fadeUp} className='gc-display text-4xl sm:text-6xl leading-[1.05] mt-6'>
                            Nature's best,
                            <br />
                            delivered
                            <br />
                            fresh.
                        </motion.h1>

                        <motion.p variants={fadeUp} className='mt-5 text-sm sm:text-base text-[#b7e4c7] max-w-md'>
                            Certified organic produce, pantry staples, and natural wellness products â€” sourced from trusted farms and delivered to your door.
                        </motion.p>

                        <motion.div variants={fadeUp} className='mt-8 flex flex-wrap items-center gap-3'>
                            <Link href='/shop' className='inline-flex items-center gap-2 rounded-full bg-[#52b788] px-6 py-3 text-sm font-extrabold text-[#1b4332] hover:bg-[#95d5b2] transition-colors duration-300'>
                                Shop Organic
                                <ArrowRight size={16} />
                            </Link>
                            <button className='inline-flex items-center rounded-full border border-white/35 px-6 py-3 text-sm font-bold hover:bg-white/10 transition-colors duration-300'>
                                Our Farms
                            </button>
                        </motion.div>

                        <motion.div variants={fadeUp} className='mt-10 inline-flex items-end gap-6 rounded-3xl bg-white/10 border border-white/25 px-5 py-4'>
                            <div>
                                <p className='text-xs uppercase tracking-[0.16em] text-[#b7e4c7]'>Starting at</p>
                                <p className='text-3xl font-black text-[#95d5b2]'>{currency}12.90</p>
                            </div>
                            <p className='text-sm text-[#b7e4c7] pb-1'>Organic boxes, bundles & seasonal picks.</p>
                        </motion.div>
                    </motion.div>

                    {/* Floating product image */}
                    <motion.div
                        className='absolute bottom-0 right-2 sm:right-6'
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <motion.div
                            animate={{ y: [0, -12, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                        >
                            <Image
                                className='w-[275px] sm:w-[340px] h-auto rounded-3xl drop-shadow-[0_16px_40px_rgba(0,0,0,0.45)]'
                                src='https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=500'
                                alt='Fresh organic fruits'
                                width={340}
                                height={450}
                                priority
                            />
                        </motion.div>
                    </motion.div>
                </section>

                {/* Side cards with stagger */}
                <motion.aside
                    className='grid sm:grid-cols-2 xl:grid-cols-1 gap-5'
                    variants={stagger}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div variants={slideIn} className='relative overflow-hidden rounded-[30px] bg-[#d8f3dc] p-6 sm:p-7 border border-[#a7d7c5] shadow-[0_18px_36px_rgba(45,106,79,0.15)] group'>
                        <p className='text-xs uppercase tracking-[0.2em] text-[#2d6a4f] font-bold'>Most Loved</p>
                        <h3 className='gc-display text-3xl mt-2 text-[#1b4332]'>Organic Bestsellers</h3>
                        <p className='text-sm text-[#2d6a4f] mt-2 max-w-[220px]'>Our most popular organic products that customers can't stop ordering.</p>
                        <Link href='/shop' className='inline-flex items-center gap-2 mt-5 text-sm font-extrabold text-[#1b4332] hover:text-[#2c2418]'>
                            Shop now <ArrowRight size={15} />
                        </Link>
                        <Image className='absolute right-4 bottom-3 w-34 sm:w-36 h-36 rounded-2xl object-cover transition-transform duration-500 group-hover:scale-110' src='https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=300' alt='Organic honey' width={144} height={144} />
                    </motion.div>

                    <motion.div variants={slideIn} className='relative overflow-hidden rounded-[30px] bg-[#b7e4c7] p-6 sm:p-7 border border-[#95d5b2] shadow-[0_18px_36px_rgba(45,106,79,0.15)] group'>
                        <p className='text-xs uppercase tracking-[0.2em] text-[#2d6a4f] font-bold'>This Season</p>
                        <h3 className='gc-display text-3xl mt-2 text-[#1b4332]'>Seasonal Picks</h3>
                        <p className='text-sm text-[#2d6a4f] mt-2 max-w-[230px]'>Fresh seasonal organic produce and limited editions.</p>
                        <Link href='/pricing' className='inline-flex items-center gap-2 mt-5 text-sm font-extrabold text-[#1b4332] hover:text-[#2c2418]'>
                            Grab deal <ArrowRight size={15} />
                        </Link>
                        <Image className='absolute right-4 bottom-3 w-34 sm:w-36 h-36 rounded-2xl object-cover transition-transform duration-500 group-hover:scale-110' src='https://images.unsplash.com/photo-1518843875459-f738682238a6?w=300' alt='Fresh seasonal produce' width={144} height={144} />
                    </motion.div>
                </motion.aside>
            </div>

            <CategoriesMarquee />
        </div>
    )
}

export default Hero
