'use client';

import { useProducts } from '@/hooks/useProducts';
import ProductCard from '@/components/ui/ProductCard';

interface RelatedProductsProps {
  currentProductId: string;
  category: string;
}

const RelatedProducts = ({ currentProductId, category }: RelatedProductsProps) => {
  const { products } = useProducts({ category });
  const related = products.filter((p) => p.id !== currentProductId).slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section className="mt-14">
      <h2 className="gc-display text-2xl text-text mb-6">You Might Also Like</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {related.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;
