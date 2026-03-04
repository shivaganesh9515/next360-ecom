'use client';

import { useCartStore } from '@/store/cartStore';
import { Product } from '@/types/product';
import { formatPrice } from '@/utils/formatPrice';

export function useCart() {
  const store = useCartStore();

  const subtotal = store.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const originalTotal = store.items.reduce(
    (sum, item) => sum + item.product.originalPrice * item.quantity,
    0
  );

  const savings = originalTotal - subtotal;
  const itemCount = store.items.reduce((sum, item) => sum + item.quantity, 0);

  const deliveryCharge = subtotal >= 50 ? 0 : 4.99;
  const total = subtotal + deliveryCharge;

  const addToCart = (product: Product, qty: number = 1, weight: string = product.weight) => {
    store.addItem(product, qty, weight);
    store.openDrawer();
  };

  return {
    items: store.items,
    coupon: store.coupon,
    isDrawerOpen: store.isDrawerOpen,
    subtotal,
    originalTotal,
    savings,
    itemCount,
    deliveryCharge,
    total,
    formattedSubtotal: formatPrice(subtotal),
    formattedTotal: formatPrice(total),
    addToCart,
    removeItem: store.removeItem,
    updateQty: store.updateQty,
    applyCoupon: store.applyCoupon,
    removeCoupon: store.removeCoupon,
    toggleDrawer: store.toggleDrawer,
    openDrawer: store.openDrawer,
    closeDrawer: store.closeDrawer,
    clearCart: store.clearCart,
  };
}
