'use client';

import { SlidersHorizontal, Grid3x3, List, ChevronDown } from 'lucide-react';

interface SortBarProps {
  totalResults: number;
  sortBy: string;
  onSortChange: (sort: string) => void;
  view: 'grid' | 'list';
  onViewChange: (view: 'grid' | 'list') => void;
  onMobileFilterOpen: () => void;
}

const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low â†’ High' },
  { value: 'price-desc', label: 'Price: High â†’ Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'name', label: 'A â†’ Z' },
];

const SortBar = ({
  totalResults,
  sortBy,
  onSortChange,
  view,
  onViewChange,
  onMobileFilterOpen,
}: SortBarProps) => {
  return (
    <div className="flex items-center justify-between gap-4 mb-5 flex-wrap">
      <div className="flex items-center gap-3">
        <button
          onClick={onMobileFilterOpen}
          className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-surface-muted text-sm font-semibold text-text"
        >
          <SlidersHorizontal size={16} /> Filters
        </button>
        <p className="text-sm text-muted font-medium">
          <span className="font-bold text-text">{totalResults}</span> products found
        </p>
      </div>

      <div className="flex items-center gap-2">
        {/* Sort dropdown */}
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="appearance-none rounded-xl border border-border bg-surface-muted px-4 py-2 pr-8 text-sm font-medium text-text focus:outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
        </div>

        {/* View toggle */}
        <div className="hidden sm:flex items-center border border-border rounded-xl overflow-hidden">
          <button
            onClick={() => onViewChange('grid')}
            className={`p-2 ${view === 'grid' ? 'bg-primary text-white' : 'bg-surface-muted text-muted hover:text-text'} transition-colors`}
            aria-label="Grid view"
          >
            <Grid3x3 size={16} />
          </button>
          <button
            onClick={() => onViewChange('list')}
            className={`p-2 ${view === 'list' ? 'bg-primary text-white' : 'bg-surface-muted text-muted hover:text-text'} transition-colors`}
            aria-label="List view"
          >
            <List size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SortBar;
