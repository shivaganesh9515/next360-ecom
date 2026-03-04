'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useFeaturedProducts } from '@/hooks/useProducts';
import ProductCard from '@/components/ui/ProductCard';

const tabs = ['Best Sellers', 'New Arrivals', 'On Sale'] as const;
type TabKey = typeof tabs[number];

const FeaturedProducts = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('Best Sellers');
  const { bestSellers, newArrivals, onSale } = useFeaturedProducts();

  const productMap: Record<TabKey, typeof bestSellers> = {
    'Best Sellers': bestSellers,
    'New Arrivals': newArrivals,
    'On Sale': onSale,
  };

  const products = productMap[activeTab];

  return (
    <section className="mt-14">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="gc-display text-2xl sm:text-[30px] leading-[0.95] text-text">
            Featured Products
          </h2>
          <p className="mt-2 text-muted text-sm font-semibold">
            Our handpicked organic favorites
          </p>
        </div>
        <Link
          href="/shop"
          className="gc-display text-[13px] text-primary hover:text-primary-light font-semibold whitespace-nowrap"
        >
          View All â†’
        </Link>
      </div>

      {/* Tab switcher */}
      <div className="flex items-center gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`gc-display text-xs px-4 py-2 rounded-xl font-semibold transition-all duration-200 ${
              activeTab === tab
                ? 'bg-primary text-white'
                : 'bg-surface-muted text-muted hover:bg-cream-dark border border-border'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default FeaturedProducts;
