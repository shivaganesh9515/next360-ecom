'use client';

import Image from 'next/image';
import Link from 'next/link';
import { X, ShoppingBag, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/store/cartStore';
import { useCart } from '@/hooks/useCart';
import QuantitySelector from '@/components/ui/QuantitySelector';
import Button from '@/components/ui/Button';
import { formatPrice } from '@/utils/formatPrice';

const CartDrawer = () => {
  const isOpen = useCartStore((s) => s.isDrawerOpen);
  const closeDrawer = useCartStore((s) => s.closeDrawer);
  const { items, itemCount, formattedSubtotal, updateQty, removeItem } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/40 z-[60] backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
          />

          {/* Drawer */}
          <motion.div
            className="fixed top-0 right-0 h-full w-full max-w-md bg-cream z-[70] shadow-2xl flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <h2 className="gc-display text-lg font-bold text-text">
                Your Cart ({itemCount} {itemCount === 1 ? 'item' : 'items'})
              </h2>
              <button
                onClick={closeDrawer}
                className="size-9 rounded-xl border border-border bg-cream-dark flex items-center justify-center hover:bg-surface-muted transition-colors"
                aria-label="Close cart"
              >
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            {items.length > 0 ? (
              <>
                <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex gap-3 rounded-2xl border border-border bg-surface-raised p-3"
                    >
                      <div className="w-20 h-20 rounded-xl border border-border bg-cream-dark flex items-center justify-center flex-shrink-0">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          width={72}
                          height={72}
                          className="object-contain max-h-16"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="gc-display text-sm text-text leading-tight line-clamp-1">
                          {item.product.name}
                        </h4>
                        <p className="text-xs text-muted font-medium mt-0.5">{item.selectedWeight}</p>
                        <div className="flex items-center justify-between mt-2">
                          <QuantitySelector
                            quantity={item.quantity}
                            onQuantityChange={(qty) => updateQty(item.product.id, qty)}
                            size="sm"
                          />
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-primary">
                              {formatPrice(item.product.price * item.quantity)}
                            </span>
                            <button
                              onClick={() => removeItem(item.product.id)}
                              className="size-7 rounded-lg text-muted hover:text-error hover:bg-red-50 flex items-center justify-center transition-colors"
                              aria-label="Remove item"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="px-5 py-4 border-t border-border space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-muted">Subtotal</span>
                    <span className="text-lg font-bold text-text">{formattedSubtotal}</span>
                  </div>
                  <Link href="/cart" onClick={closeDrawer}>
                    <Button variant="outline" fullWidth>
                      View Cart
                    </Button>
                  </Link>
                  <Link href="/checkout" onClick={closeDrawer}>
                    <Button variant="primary" fullWidth className="mt-2">
                      Checkout â†’
                    </Button>
                  </Link>
                </div>
              </>
            ) : (
              /* Empty state */
              <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
                <div className="size-20 rounded-full bg-cream-dark flex items-center justify-center mb-5">
                  <ShoppingBag size={32} className="text-muted" />
                </div>
                <h3 className="gc-display text-lg text-text mb-2">Your cart is empty</h3>
                <p className="text-sm text-muted font-medium mb-6">
                  Looks like you haven&apos;t added any organic goodies yet!
                </p>
                <Link href="/shop" onClick={closeDrawer}>
                  <Button variant="primary">Shop Now</Button>
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
