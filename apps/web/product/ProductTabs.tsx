'use client';

import { useState } from 'react';
import { Product } from '@/types/product';

interface ProductTabsProps {
  product: Product;
}

const tabs = ['Description', 'Nutrition', 'Reviews', 'Delivery'] as const;
type TabKey = typeof tabs[number];

const ProductTabs = ({ product }: ProductTabsProps) => {
  const [activeTab, setActiveTab] = useState<TabKey>('Description');

  return (
    <div className="mt-12">
      {/* Tab headers */}
      <div className="flex gap-1 border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`gc-display text-sm px-5 py-3 font-semibold transition-colors relative ${
              activeTab === tab
                ? 'text-primary'
                : 'text-muted hover:text-text'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="py-6">
        {activeTab === 'Description' && (
          <div className="prose prose-sm max-w-none">
            <p className="text-muted font-medium leading-relaxed">{product.description}</p>
            <div className="mt-4 grid sm:grid-cols-2 gap-3">
              <div className="rounded-xl border border-border bg-surface-muted p-4">
                <p className="text-xs text-muted font-medium mb-1">Category</p>
                <p className="text-sm font-bold text-text">{product.category}</p>
              </div>
              <div className="rounded-xl border border-border bg-surface-muted p-4">
                <p className="text-xs text-muted font-medium mb-1">Region</p>
                <p className="text-sm font-bold text-text">{product.region}</p>
              </div>
              <div className="rounded-xl border border-border bg-surface-muted p-4">
                <p className="text-xs text-muted font-medium mb-1">Weight</p>
                <p className="text-sm font-bold text-text">{product.weight}</p>
              </div>
              <div className="rounded-xl border border-border bg-surface-muted p-4">
                <p className="text-xs text-muted font-medium mb-1">Certifications</p>
                <p className="text-sm font-bold text-text">{product.certifications.join(', ')}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Nutrition' && (
          <div className="max-w-md">
            <h4 className="gc-display text-base font-bold text-text mb-4">Nutrition Facts</h4>
            <p className="text-xs text-muted font-medium mb-3">Per {product.nutritionFacts.servingSize} serving</p>
            <div className="space-y-2">
              {[
                { label: 'Calories', value: product.nutritionFacts.calories },
                { label: 'Protein', value: product.nutritionFacts.protein },
                { label: 'Carbohydrates', value: product.nutritionFacts.carbs },
                { label: 'Fat', value: product.nutritionFacts.fat },
                { label: 'Fiber', value: product.nutritionFacts.fiber },
                { label: 'Sugar', value: product.nutritionFacts.sugar },
                { label: 'Sodium', value: product.nutritionFacts.sodium },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between py-2 border-b border-border-light last:border-0">
                  <span className="text-sm text-muted font-medium">{item.label}</span>
                  <span className="text-sm font-bold text-text">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'Reviews' && (
          <div className="text-center py-10">
            <p className="gc-display text-base text-text mb-2">
              {product.reviewCount} Reviews · {product.rating.toFixed(1)} Average
            </p>
            <p className="text-sm text-muted font-medium">
              Customer reviews will appear here once the backend is connected.
            </p>
          </div>
        )}

        {activeTab === 'Delivery' && (
          <div className="space-y-4 max-w-lg">
            <div className="rounded-xl border border-border bg-surface-muted p-4">
              <h5 className="text-sm font-bold text-text">Standard Delivery</h5>
              <p className="text-xs text-muted font-medium mt-1">2-4 business days · Free on orders above $50</p>
            </div>
            <div className="rounded-xl border border-border bg-surface-muted p-4">
              <h5 className="text-sm font-bold text-text">Express Delivery</h5>
              <p className="text-xs text-muted font-medium mt-1">Next business day · $9.99</p>
            </div>
            <div className="rounded-xl border border-border bg-surface-muted p-4">
              <h5 className="text-sm font-bold text-text">Returns</h5>
              <p className="text-xs text-muted font-medium mt-1">7-day easy returns. Items must be in original packaging.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;
