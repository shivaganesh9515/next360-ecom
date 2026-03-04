import api from './api';
import { Product, ProductFilters, Category } from '@/types/product';

interface ProductListResponse {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
}

export const productService = {
  async getProducts(filters?: ProductFilters): Promise<ProductListResponse> {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, String(value));
        }
      });
    }
    const { data } = await api.get(`/products?${params.toString()}`);
    return data;
  },

  async getProduct(slug: string): Promise<Product> {
    const { data } = await api.get(`/products/${slug}`);
    return data;
  },

  async getFeaturedProducts(): Promise<Product[]> {
    const { data } = await api.get('/products/featured');
    return data;
  },

  async getCategories(): Promise<Category[]> {
    const { data } = await api.get('/categories');
    return data;
  },
};
