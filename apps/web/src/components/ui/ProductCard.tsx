'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Product } from '@/types/product';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import RatingStars from './RatingStars';
import Badge from './Badge';
import { formatPrice, calculateDiscount } from '@/utils/formatPrice';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
  showQuickView?: boolean;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const addItem = useCartStore((s) => s.addItem);
  const openDrawer = useCartStore((s) => s.openDrawer);
  const toggleWishlist = useWishlistStore((s) => s.toggleWishlist);
  const isWishlisted = useWishlistStore((s) => s.isWishlisted(product.id));

  const discount = calculateDiscount(product.originalPrice, product.price);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1, product.weight);
    openDrawer();
    toast.success(`${product.name} added to cart!`);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Link
        href={`/product/${product.slug}`}
        className="block rounded-[22px] border border-border bg-surface-muted p-3 group transition-shadow duration-300 hover:shadow-[0_12px_40px_rgba(45,80,22,0.1)]"
      >
        {/* Image Container */}
        <div className="relative h-56 rounded-[18px] border border-border bg-cream-dark flex items-center justify-center overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            width={220}
            height={220}
            className="max-h-48 w-auto object-contain transition-transform duration-500 group-hover:scale-[1.04]"
          />

          {/* Wishlist button */}
          <button
            onClick={handleWishlist}
            className="absolute top-3 right-3 size-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors shadow-sm"
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart
              size={16}
              className={isWishlisted ? 'text-red-500 fill-red-500' : 'text-muted'}
            />
          </button>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.certifications.includes('USDA Organic') && (
              <Badge variant="organic">Organic</Badge>
            )}
            {discount > 0 && (
              <Badge variant="sale">{discount}% OFF</Badge>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="pt-3 px-1">
          <div className="flex items-center gap-2 text-xs text-muted font-medium">
            <span>{product.category}</span>
            <span className="w-1 h-1 rounded-full bg-border" />
            <span>{product.region}</span>
          </div>

          <h3 className="gc-display text-sm leading-tight text-text mt-1.5 line-clamp-2 min-h-[2.5rem]">
            {product.name}
          </h3>

          <div className="mt-2">
            <RatingStars rating={product.rating} count={product.reviewCount} size={14} />
          </div>

          <div className="mt-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-primary">{formatPrice(product.price)}</span>
              {product.originalPrice > product.price && (
                <span className="text-sm text-muted line-through">{formatPrice(product.originalPrice)}</span>
              )}
            </div>

            <button
              onClick={handleAddToCart}
              className="size-9 rounded-xl bg-primary text-white flex items-center justify-center hover:bg-primary-light transition-colors shadow-sm"
              aria-label="Add to cart"
            >
              <ShoppingCart size={16} />
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
