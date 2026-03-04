'use client';

import { useState } from 'react';
import { Heart, ShoppingCart, Truck, Shield, RotateCcw } from 'lucide-react';
import { Product } from '@/types/product';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import RatingStars from '@/components/ui/RatingStars';
import QuantitySelector from '@/components/ui/QuantitySelector';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { formatPrice, calculateDiscount } from '@/utils/formatPrice';
import toast from 'react-hot-toast';

interface ProductInfoProps {
  product: Product;
}

const weightOptions = ['250g', '500g', '1kg', '2kg'];

const ProductInfo = ({ product }: ProductInfoProps) => {
  const [selectedWeight, setSelectedWeight] = useState(product.weight || '500g');
  const [quantity, setQuantity] = useState(1);

  const addItem = useCartStore((s) => s.addItem);
  const openDrawer = useCartStore((s) => s.openDrawer);
  const toggleWishlist = useWishlistStore((s) => s.toggleWishlist);
  const isWishlisted = useWishlistStore((s) => s.isWishlisted(product.id));

  const discount = calculateDiscount(product.originalPrice, product.price);

  const handleAddToCart = () => {
    addItem(product, quantity, selectedWeight);
    openDrawer();
    toast.success(`${product.name} added to cart!`);
  };

  const handleWishlist = () => {
    toggleWishlist(product);
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
  };

  return (
    <div>
      {/* Badges */}
      <div className="flex items-center gap-2 mb-3">
        {product.certifications.map((cert) => (
          <Badge key={cert} variant="organic">{cert}</Badge>
        ))}
        {discount > 0 && <Badge variant="sale">{discount}% OFF</Badge>}
        {!product.inStock && <Badge variant="default">Out of Stock</Badge>}
      </div>

      {/* Category & Region */}
      <p className="text-sm text-muted font-medium">
        {product.category} · {product.region}
      </p>

      {/* Name */}
      <h1 className="gc-display text-2xl sm:text-3xl leading-tight text-text mt-2">
        {product.name}
      </h1>

      {/* Rating */}
      <div className="mt-3">
        <RatingStars rating={product.rating} count={product.reviewCount} size={18} />
      </div>

      {/* Price */}
      <div className="mt-4 flex items-center gap-3">
        <span className="text-3xl font-bold text-primary">{formatPrice(product.price)}</span>
        {product.originalPrice > product.price && (
          <>
            <span className="text-lg text-muted line-through">{formatPrice(product.originalPrice)}</span>
            <span className="text-sm font-bold text-secondary">Save {formatPrice(product.originalPrice - product.price)}</span>
          </>
        )}
      </div>

      {/* Description */}
      <p className="mt-4 text-sm text-muted font-medium leading-relaxed">
        {product.description}
      </p>

      {/* Weight selector */}
      <div className="mt-6">
        <p className="text-sm font-bold text-text mb-2">Size / Weight</p>
        <div className="flex gap-2">
          {weightOptions.map((w) => (
            <button
              key={w}
              onClick={() => setSelectedWeight(w)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                selectedWeight === w
                  ? 'bg-primary text-white'
                  : 'bg-surface-muted border border-border text-text hover:border-primary/30'
              }`}
            >
              {w}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity + Add to Cart */}
      <div className="mt-6 flex items-center gap-4">
        <QuantitySelector
          quantity={quantity}
          onQuantityChange={setQuantity}
        />
        <Button
          variant="primary"
          size="lg"
          className="flex-1"
          onClick={handleAddToCart}
          disabled={!product.inStock}
        >
          <ShoppingCart size={18} />
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </Button>
        <button
          onClick={handleWishlist}
          className={`size-12 rounded-xl border flex items-center justify-center transition-all ${
            isWishlisted
              ? 'border-red-200 bg-red-50 text-red-500'
              : 'border-border bg-surface-muted text-muted hover:text-red-500 hover:border-red-200'
          }`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart size={20} className={isWishlisted ? 'fill-current' : ''} />
        </button>
      </div>

      {/* Delivery info */}
      <div className="mt-6 rounded-2xl border border-border bg-surface-muted p-4 space-y-3">
        <div className="flex items-center gap-3 text-sm">
          <Truck size={18} className="text-primary flex-shrink-0" />
          <div>
            <p className="font-semibold text-text">Free delivery on orders above $50</p>
            <p className="text-muted text-xs">Estimated delivery: 2-4 business days</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <RotateCcw size={18} className="text-primary flex-shrink-0" />
          <p className="font-semibold text-text">7-day easy returns</p>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Shield size={18} className="text-primary flex-shrink-0" />
          <p className="font-semibold text-text">100% organic guarantee</p>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
