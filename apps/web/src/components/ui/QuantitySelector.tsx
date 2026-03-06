'use client';

import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (qty: number) => void;
  min?: number;
  max?: number;
  size?: 'sm' | 'md';
}

const QuantitySelector = ({
  quantity,
  onQuantityChange,
  min = 1,
  max = 99,
  size = 'md',
}: QuantitySelectorProps) => {
  const buttonSize = size === 'sm' ? 'size-7' : 'size-9';
  const iconSize = size === 'sm' ? 14 : 16;
  const textSize = size === 'sm' ? 'text-sm' : 'text-base';

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => onQuantityChange(Math.max(min, quantity - 1))}
        className={`${buttonSize} rounded-lg border border-border bg-cream-dark flex items-center justify-center hover:bg-cream transition-colors disabled:opacity-40`}
        disabled={quantity <= min}
        aria-label="Decrease quantity"
      >
        <Minus size={iconSize} />
      </button>
      <span className={`${textSize} font-bold text-text w-8 text-center tabular-nums`}>
        {quantity}
      </span>
      <button
        onClick={() => onQuantityChange(Math.min(max, quantity + 1))}
        className={`${buttonSize} rounded-lg border border-border bg-cream-dark flex items-center justify-center hover:bg-cream transition-colors disabled:opacity-40`}
        disabled={quantity >= max}
        aria-label="Increase quantity"
      >
        <Plus size={iconSize} />
      </button>
    </div>
  );
};

export default QuantitySelector;
