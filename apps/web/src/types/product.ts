export interface NutritionFacts {
  calories: number;
  protein: string;
  carbs: string;
  fat: string;
  fiber: string;
  sugar: string;
  sodium: string;
  servingSize: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice: number;
  discount: number;
  images: string[];
  category: string;
  region: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  certifications: string[];
  weight: string;
  nutritionFacts: NutritionFacts;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  itemCount: number;
  image: string;
}

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  inStock?: boolean;
  certifications?: string[];
  region?: string;
  sort?: 'price-asc' | 'price-desc' | 'rating' | 'newest' | 'name';
  page?: number;
  limit?: number;
  search?: string;
}
