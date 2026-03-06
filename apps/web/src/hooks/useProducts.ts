'use client';

import { productDummyData } from '@/assets/assets';
import { Product, ProductFilters } from '@/types/product';

// Map existing dummy data to new Product type for local dev
function mapDummyToProduct(item: Record<string, unknown>): Product {
  const raw = item as {
    id: string;
    name: string;
    description: string;
    price: number;
    mrp: number;
    images: string[];
    category: string;
    inStock: boolean;
    rating: Array<{ rating: number }>;
  };

  return {
    id: raw.id,
    name: raw.name,
    slug: raw.id,
    description: raw.description,
    price: raw.price,
    originalPrice: raw.mrp,
    discount: Math.round(((raw.mrp - raw.price) / raw.mrp) * 100),
    images: raw.images,
    category: raw.category,
    region: 'California',
    rating:
      raw.rating.length > 0
        ? raw.rating.reduce((sum: number, r: { rating: number }) => sum + r.rating, 0) / raw.rating.length
        : 0,
    reviewCount: raw.rating.length,
    inStock: raw.inStock,
    certifications: ['USDA Organic'],
    weight: '500g',
    nutritionFacts: {
      calories: 120,
      protein: '4g',
      carbs: '22g',
      fat: '2g',
      fiber: '5g',
      sugar: '3g',
      sodium: '15mg',
      servingSize: '100g',
    },
  };
}

const dummyProducts: Product[] = productDummyData.map(
  (item: unknown) => mapDummyToProduct(item as Record<string, unknown>)
);

export function useProducts(filters?: ProductFilters) {
  let filtered = [...dummyProducts];

  if (filters?.category) {
    filtered = filtered.filter(
      (p) => p.category.toLowerCase() === filters.category!.toLowerCase()
    );
  }

  if (filters?.search) {
    const query = filters.search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
    );
  }

  if (filters?.minPrice !== undefined) {
    filtered = filtered.filter((p) => p.price >= filters.minPrice!);
  }

  if (filters?.maxPrice !== undefined) {
    filtered = filtered.filter((p) => p.price <= filters.maxPrice!);
  }

  if (filters?.rating) {
    filtered = filtered.filter((p) => p.rating >= filters.rating!);
  }

  if (filters?.inStock) {
    filtered = filtered.filter((p) => p.inStock);
  }

  if (filters?.sort) {
    switch (filters.sort) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.reverse();
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }
  }

  return {
    products: filtered,
    allProducts: dummyProducts,
    isLoading: false,
    error: null,
    total: filtered.length,
  };
}

export function useProduct(slug: string) {
  const product = dummyProducts.find((p) => p.slug === slug || p.id === slug);

  return {
    product: product || null,
    isLoading: false,
    error: product ? null : 'Product not found',
  };
}

export function useFeaturedProducts() {
  const bestSellers = [...dummyProducts].sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 4);
  const newArrivals = [...dummyProducts].reverse().slice(0, 4);
  const onSale = [...dummyProducts].sort((a, b) => b.discount - a.discount).slice(0, 4);

  return { bestSellers, newArrivals, onSale, isLoading: false };
}

export function useCategories() {
  const categories = [
    { id: '1', name: 'Vegetables', slug: 'vegetables', icon: '🥬', itemCount: 24, image: '' },
    { id: '2', name: 'Fruits', slug: 'fruits', icon: '🍎', itemCount: 18, image: '' },
    { id: '3', name: 'Dairy & Eggs', slug: 'dairy-eggs', icon: '🥚', itemCount: 12, image: '' },
    { id: '4', name: 'Grains', slug: 'grains', icon: '🌾', itemCount: 15, image: '' },
    { id: '5', name: 'Herbs & Spices', slug: 'herbs-spices', icon: '🌿', itemCount: 20, image: '' },
    { id: '6', name: 'Oils & Ghee', slug: 'oils-ghee', icon: '🫒', itemCount: 8, image: '' },
  ];

  return { categories, isLoading: false };
}
