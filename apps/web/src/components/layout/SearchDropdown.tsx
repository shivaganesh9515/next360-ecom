'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';

export default function SearchDropdown() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  const { products } = useProducts({ search: debouncedQuery });
  const results = debouncedQuery.length >= 2 ? products.slice(0, 5) : [];

  // Debounce
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(timer);
  }, [query]);

  // Close on click-outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <div className="relative">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
        <input
          type="text"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setIsOpen(true); }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search organic products..."
          className="hidden lg:block w-52 xl:w-64 rounded-xl border border-border bg-cream-dark pl-9 pr-8 py-2 text-sm font-medium text-text placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-primary/30 focus:bg-cream transition-all"
        />
        {query && (
          <button onClick={() => { setQuery(''); setDebouncedQuery(''); }} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted hover:text-text">
            <X size={14} />
          </button>
        )}
      </div>

      {/* Results dropdown */}
      {isOpen && debouncedQuery.length >= 2 && (
        <div className="absolute top-full mt-2 left-0 right-0 min-w-[300px] rounded-2xl border border-border bg-cream shadow-xl z-50 overflow-hidden">
          {results.length > 0 ? (
            <>
              {results.map((p) => (
                <Link
                  key={p.id}
                  href={`/product/${p.slug}`}
                  onClick={() => { setIsOpen(false); setQuery(''); }}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-cream-dark transition-colors border-b border-border last:border-0"
                >
                  <div className="size-10 rounded-lg bg-surface-muted border border-border flex items-center justify-center flex-shrink-0">
                    <Image src={p.images[0]} alt={p.name} width={32} height={32} className="object-contain max-h-8" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-text truncate">{p.name}</p>
                    <p className="text-xs text-muted font-medium">{p.category}</p>
                  </div>
                  <span className="ml-auto text-sm font-bold text-primary flex-shrink-0">${p.price.toFixed(2)}</span>
                </Link>
              ))}
              <Link
                href={`/shop?search=${encodeURIComponent(debouncedQuery)}`}
                onClick={() => { setIsOpen(false); setQuery(''); }}
                className="block text-center py-2.5 text-xs font-bold text-primary hover:bg-cream-dark border-t border-border"
              >
                View all results for &ldquo;{debouncedQuery}&rdquo;
              </Link>
            </>
          ) : (
            <div className="px-4 py-6 text-center">
              <p className="text-sm text-muted font-medium">No products found for &ldquo;{debouncedQuery}&rdquo;</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
