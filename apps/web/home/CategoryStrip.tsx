'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useCategories } from '@/hooks/useProducts';

const CategoryStrip = () => {
  const { categories } = useCategories();

  return (
    <section className="mt-8">
      <div className="flex gap-3 overflow-x-auto no-scrollbar px-1 pb-2">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            viewport={{ once: true }}
          >
            <Link
              href={`/shop?category=${cat.slug}`}
              className="flex flex-col items-center gap-2.5 rounded-2xl border border-border bg-surface-muted px-6 py-5 min-w-[130px] hover:border-primary/30 hover:bg-cream transition-all duration-300 group"
            >
              <span className="text-3xl group-hover:scale-110 transition-transform duration-300">
                {cat.icon}
              </span>
              <span className="gc-display text-xs font-semibold text-text whitespace-nowrap">
                {cat.name}
              </span>
              <span className="text-[10px] text-muted font-medium">
                {cat.itemCount} items
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CategoryStrip;
