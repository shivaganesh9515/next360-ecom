'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Kristin Watson',
    role: 'Organic Enthusiast',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
    rating: 5,
    text: 'The freshness is incredible! Everything arrived crisp and fragrant â€” you can tell these are truly organic. I\'ve switched all my grocery shopping here.',
  },
  {
    id: 2,
    name: 'Jenny Wilson',
    role: 'Health Coach',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200',
    rating: 5,
    text: 'Best organic honey I\'ve ever tasted! Rich, golden, and perfectly raw. You can taste the difference when it\'s truly unprocessed. Will order every month.',
  },
  {
    id: 3,
    name: 'Marcus Chen',
    role: 'Home Chef',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
    rating: 5,
    text: 'The produce quality is outstanding. Every ingredient I\'ve received has been farm-fresh and full of flavor. Next360 has transformed my cooking.',
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="mt-14">
      <div className="text-center mb-8">
        <h2 className="gc-display text-2xl sm:text-[30px] leading-[0.95] text-text">
          Trusted by Thousands
        </h2>
        <p className="mt-2 text-muted text-sm font-semibold">
          Real reviews from our organic community
        </p>
      </div>

      {/* Desktop: 3 cards */}
      <div className="hidden md:grid md:grid-cols-3 gap-5">
        {testimonials.map((item, i) => (
          <motion.article
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.12, duration: 0.4 }}
            viewport={{ once: true }}
            className="rounded-[22px] border border-border bg-surface-muted px-6 py-7 text-center"
          >
            <Image
              src={item.image}
              alt={item.name}
              width={80}
              height={80}
              className="size-20 rounded-full mx-auto object-cover border-3 border-cream"
            />
            <div className="flex items-center justify-center text-accent mt-3 gap-0.5">
              {Array.from({ length: item.rating }).map((_, i) => (
                <Star key={i} size={16} fill="currentColor" />
              ))}
            </div>
            <p className="gc-display text-[15px] text-text leading-relaxed mt-3">
              &quot;{item.text}&quot;
            </p>
            <p className="mt-4 text-sm font-bold text-text">{item.name}</p>
            <p className="text-xs text-muted font-medium">{item.role}</p>
          </motion.article>
        ))}
      </div>

      {/* Mobile: carousel */}
      <div className="md:hidden relative">
        <AnimatePresence mode="wait">
          <motion.article
            key={current}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="rounded-[22px] border border-border bg-surface-muted px-6 py-7 text-center"
          >
            <Image
              src={testimonials[current].image}
              alt={testimonials[current].name}
              width={80}
              height={80}
              className="size-20 rounded-full mx-auto object-cover"
            />
            <div className="flex items-center justify-center text-accent mt-3 gap-0.5">
              {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                <Star key={i} size={16} fill="currentColor" />
              ))}
            </div>
            <p className="gc-display text-[15px] text-text leading-relaxed mt-3">
              &quot;{testimonials[current].text}&quot;
            </p>
            <p className="mt-4 text-sm font-bold text-text">{testimonials[current].name}</p>
            <p className="text-xs text-muted font-medium">{testimonials[current].role}</p>
          </motion.article>
        </AnimatePresence>

        <div className="flex items-center justify-center gap-3 mt-4">
          <button
            onClick={() => setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length)}
            className="size-8 rounded-full border border-border bg-surface-raised flex items-center justify-center"
          >
            <ChevronLeft size={16} />
          </button>
          <div className="flex gap-1.5">
            {testimonials.map((_, i) => (
              <span
                key={i}
                className={`w-2 h-2 rounded-full transition-colors ${i === current ? 'bg-primary' : 'bg-border'}`}
              />
            ))}
          </div>
          <button
            onClick={() => setCurrent((p) => (p + 1) % testimonials.length)}
            className="size-8 rounded-full border border-border bg-surface-raised flex items-center justify-center"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
