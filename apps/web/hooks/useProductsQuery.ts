'use client';

import { useQuery } from '@tanstack/react-query';
import { productService } from '@/services/productService';
import { Product, ProductFilters, Category } from '@/types/product';

// When backend is ready, flip USE_API to true
const USE_API = false;

// ─── Local dummy data fallback ─────────────────

import { productDummyData } from '@/assets/assets';

function mapDummyToProduct(item: Record<string, unknown>): Product {
  const raw = item as {
    id: string; name: string; description: string;
    price: number; mrp: number; images: string[];
    category: string; inStock: boolean; rating: Array<{ rating: number }>;
  };
  return {
    id: raw.id, name: raw.name, slug: raw.id, description: raw.description,
    price: raw.price, originalPrice: raw.mrp,
    discount: Math.round(((raw.mrp - raw.price) / raw.mrp) * 100),
    images: raw.images, category: raw.category, region: 'California',
    rating: raw.rating.length > 0
      ? raw.rating.reduce((s, r) => s + r.rating, 0) / raw.rating.length : 0,
    reviewCount: raw.rating.length, inStock: raw.inStock,
    certifications: ['USDA Organic'], weight: '500g',
    nutritionFacts: { calories: 120, protein: '4g', carbs: '22g', fat: '2g', fiber: '5g', sugar: '3g', sodium: '15mg', servingSize: '100g' },
  };
}

const dummyProducts: Product[] = productDummyData.map(
  (item: unknown) => mapDummyToProduct(item as Record<string, unknown>)
);

function filterLocal(products: Product[], filters?: ProductFilters) {
  let result = [...products];
  if (filters?.category) result = result.filter(p => p.category.toLowerCase() === filters.category!.toLowerCase());
  if (filters?.search) { const q = filters.search.toLowerCase(); result = result.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)); }
  if (filters?.minPrice !== undefined) result = result.filter(p => p.price >= filters.minPrice!);
  if (filters?.maxPrice !== undefined) result = result.filter(p => p.price <= filters.maxPrice!);
  if (filters?.rating) result = result.filter(p => p.rating >= filters.rating!);
  if (filters?.inStock) result = result.filter(p => p.inStock);
  if (filters?.sort) {
    switch (filters.sort) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'newest': result.reverse(); break;
      case 'name': result.sort((a, b) => a.name.localeCompare(b.name)); break;
    }
  }
  return result;
}

// ─── Hooks ─────────────────────────────────────

export function useProductsQuery(filters?: ProductFilters) {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: async () => {
      if (USE_API) {
        const res = await productService.getProducts(filters);
        return res as unknown as { products: Product[]; total: number };
      }
      const filtered = filterLocal(dummyProducts, filters);
      return { products: filtered, total: filtered.length };
    },
    staleTime: 2 * 60 * 1000,
  });
}

export function useProductQuery(slug: string) {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: async () => {
      if (USE_API) {
        const res = await productService.getProduct(slug);
        return res as unknown as Product;
      }
      return dummyProducts.find(p => p.slug === slug || p.id === slug) || null;
    },
    enabled: !!slug,
  });
}

export function useFeaturedProductsQuery() {
  return useQuery({
    queryKey: ['featured-products'],
    queryFn: async () => {
      if (USE_API) {
        const res = await productService.getFeaturedProducts();
        return res as unknown as { bestSellers: Product[]; newArrivals: Product[]; onSale: Product[] };
      }
      return {
        bestSellers: [...dummyProducts].sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 4),
        newArrivals: [...dummyProducts].reverse().slice(0, 4),
        onSale: [...dummyProducts].sort((a, b) => b.discount - a.discount).slice(0, 4),
      };
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useCategoriesQuery() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      if (USE_API) {
        const res = await productService.getCategories();
        return res as unknown as Category[];
      }
      return [
        { id: '1', name: 'Vegetables', slug: 'vegetables', icon: '🥬', itemCount: 24, image: '' },
        { id: '2', name: 'Fruits', slug: 'fruits', icon: '🍎', itemCount: 18, image: '' },
        { id: '3', name: 'Dairy & Eggs', slug: 'dairy-eggs', icon: '🥚', itemCount: 12, image: '' },
        { id: '4', name: 'Grains', slug: 'grains', icon: '🌾', itemCount: 15, image: '' },
        { id: '5', name: 'Herbs & Spices', slug: 'herbs-spices', icon: '🌿', itemCount: 20, image: '' },
        { id: '6', name: 'Oils & Ghee', slug: 'oils-ghee', icon: '🫒', itemCount: 8, image: '' },
      ] as Category[];
    },
    staleTime: 10 * 60 * 1000,
  });
}
