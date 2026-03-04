'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';

const NewsletterBanner = () => {
  return (
    <motion.section
      className="mt-14 rounded-[28px] overflow-hidden border border-border relative min-h-[420px]"
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Image
        src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=800"
        alt="Organic newsletter"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative z-10 p-6 sm:p-8 md:p-10 w-full md:max-w-[440px] m-5 rounded-[22px] bg-cream/95 backdrop-blur-sm border border-border">
        <span className="gc-display text-xs text-secondary font-bold uppercase tracking-widest">
          Newsletter
        </span>
        <h3 className="gc-display text-2xl sm:text-3xl leading-[0.95] text-text mt-2">
          Get 10% Off Your First Order
        </h3>
        <p className="mt-3 text-muted text-sm font-medium leading-relaxed">
          Join our community for exclusive organic deals, seasonal picks, and wellness inspiration.
        </p>
        <form className="mt-5 space-y-3" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            placeholder="Your email address"
            className="w-full rounded-xl border border-border bg-surface-raised px-4 py-3 text-sm font-medium text-text placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          <Button variant="primary" fullWidth type="submit">
            Subscribe
          </Button>
        </form>
        <p className="mt-3 text-[11px] text-muted font-medium">
          No spam ever. Unsubscribe anytime.
        </p>
      </div>
    </motion.section>
  );
};

export default NewsletterBanner;
