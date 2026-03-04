'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';

const HeroBanner = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden rounded-b-[34px] border border-border border-t-0 bg-cream-dark">
      {/* Background leaf watermark */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg viewBox="0 0 800 600" className="w-full h-full" fill="currentColor">
          <path d="M400 50c-100 50-200 150-250 300s0 200 100 250 250-50 300-200-50-300-150-350z" />
        </svg>
      </div>

      <div className="gc-container px-6 py-10 lg:py-0">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/15 text-secondary text-xs font-bold uppercase tracking-widest mb-5">
              ðŸŒ¿ 100% Certified Organic
            </span>

            <h1 className="gc-display text-4xl sm:text-5xl lg:text-6xl leading-[0.92] text-text">
              Pure Food.{' '}
              <span className="text-primary">Real Farmers.</span>{' '}
              Happy You.
            </h1>

            <p className="mt-5 text-muted text-base sm:text-lg leading-relaxed font-medium max-w-lg">
              Discover handpicked organic produce, pantry staples, and natural wellness products â€” sourced from trusted farms across the country.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="/shop">
                <Button variant="primary" size="lg">
                  Shop Now
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="ghost" size="lg">
                  Our Story â†’
                </Button>
              </Link>
            </div>

            {/* Trust badges */}
            <div className="mt-10 flex items-center gap-6 text-sm text-muted font-medium">
              <div className="flex items-center gap-2">
                <span className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm">ðŸšš</span>
                <span>Free delivery $50+</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm">ðŸ”„</span>
                <span>7-day returns</span>
              </div>
            </div>
          </motion.div>

          {/* Right: Image */}
          <motion.div
            className="relative min-h-[450px] lg:min-h-[550px]"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src="https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=600"
              alt="Fresh organic produce"
              className="absolute right-0 top-0 w-full max-w-[500px] h-auto rounded-3xl shadow-[0_22px_60px_rgba(45,80,22,0.15)]"
              width={500}
              height={580}
              priority
            />
            {/* Floating accent images */}
            <motion.div
              className="absolute left-0 bottom-10"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Image
                src="https://images.unsplash.com/photo-1518843875459-f738682238a6?w=300"
                alt="Organic vegetables"
                className="w-28 h-28 rounded-2xl object-cover rotate-[-8deg] shadow-lg border-2 border-white"
                width={112}
                height={112}
              />
            </motion.div>
            <motion.div
              className="absolute right-4 bottom-20"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            >
              <Image
                src="https://images.unsplash.com/photo-1471193945509-9ad0617afabf?w=300"
                alt="Fresh herbs"
                className="w-28 h-28 rounded-2xl object-cover rotate-[8deg] shadow-lg border-2 border-white"
                width={112}
                height={112}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
