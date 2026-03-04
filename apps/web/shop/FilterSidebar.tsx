'use client';

import { useState } from 'react';
import { X, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/ui/Button';

interface FilterSidebarProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  selectedRating: number;
  onRatingChange: (rating: number) => void;
  inStockOnly: boolean;
  onInStockChange: (inStock: boolean) => void;
  onReset: () => void;
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

const categories = [
  'All',
  'Fresh Produce',
  'Pantry Staples',
  'Superfoods',
  'Beverages',
  'Natural Wellness',
];

const FilterSidebar = ({
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  selectedRating,
  onRatingChange,
  inStockOnly,
  onInStockChange,
  onReset,
  isMobileOpen = false,
  onMobileClose,
}: FilterSidebarProps) => {
  const content = (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h4 className="gc-display text-sm font-bold text-text mb-3">Category</h4>
        <div className="space-y-2">
          {categories.map((cat) => (
            <label key={cat} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="radio"
                name="category"
                checked={selectedCategory === (cat === 'All' ? '' : cat)}
                onChange={() => onCategoryChange(cat === 'All' ? '' : cat)}
                className="w-4 h-4 accent-primary"
              />
              <span className="text-sm font-medium text-muted group-hover:text-text transition-colors">
                {cat}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="gc-display text-sm font-bold text-text mb-3">Price Range</h4>
        <div className="space-y-3">
          <input
            type="range"
            min={0}
            max={50}
            value={priceRange[1]}
            onChange={(e) => onPriceRangeChange([priceRange[0], Number(e.target.value)])}
            className="w-full accent-primary"
          />
          <div className="flex items-center justify-between text-xs text-muted font-medium">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Rating */}
      <div>
        <h4 className="gc-display text-sm font-bold text-text mb-3">Minimum Rating</h4>
        <div className="flex gap-2">
          {[0, 3, 3.5, 4, 4.5].map((r) => (
            <button
              key={r}
              onClick={() => onRatingChange(r)}
              className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
                selectedRating === r
                  ? 'bg-primary text-white'
                  : 'bg-surface-raised border border-border text-muted hover:text-text'
              }`}
            >
              {r === 0 ? 'All' : `${r}+`}
            </button>
          ))}
        </div>
      </div>

      {/* In Stock */}
      <div>
        <label className="flex items-center gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => onInStockChange(e.target.checked)}
            className="w-4 h-4 accent-primary rounded"
          />
          <span className="text-sm font-medium text-text">In Stock Only</span>
        </label>
      </div>

      {/* Reset */}
      <Button variant="ghost" size="sm" fullWidth onClick={onReset}>
        Clear All Filters
      </Button>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-64 flex-shrink-0">
        <div className="sticky top-24 rounded-2xl border border-border bg-surface-muted p-5">
          <h3 className="gc-display text-base font-bold text-text mb-5 flex items-center gap-2">
            <SlidersHorizontal size={16} /> Filters
          </h3>
          {content}
        </div>
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 z-[60] lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onMobileClose}
            />
            <motion.div
              className="fixed bottom-0 left-0 right-0 max-h-[80vh] bg-cream rounded-t-3xl z-[70] lg:hidden overflow-y-auto"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
              <div className="p-5">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="gc-display text-base font-bold text-text flex items-center gap-2">
                    <SlidersHorizontal size={16} /> Filters
                  </h3>
                  <button onClick={onMobileClose} className="size-8 rounded-xl border border-border bg-surface-raised flex items-center justify-center">
                    <X size={16} />
                  </button>
                </div>
                {content}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default FilterSidebar;
