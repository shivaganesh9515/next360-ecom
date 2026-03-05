export type ProductApproval = 'PENDING_REVIEW' | 'APPROVED' | 'REJECTED'

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  shortDesc: string
  price: number
  originalPrice: number
  images: string[]
  categoryId: string
  category?: Category
  supplierId?: string
  supplier?: Supplier
  vendorId?: string
  region: string
  weight: string[]
  certifications: string[]
  tags: string[]
  healthGoalTags: string[]
  seasonalMonths: number[]
  nutritionFacts: {
    servingSize: string
    calories: number
    protein: string
    carbs: string
    fat: string
    fiber: string
    sugar: string
    sodium: string
  }
  isFeatured: boolean
  isOrganic: boolean
  inStock: boolean
  stock: number
  lowStockThresh: number
  rating: number
  reviewCount: number
  orderCount: number
  approvalStatus: ProductApproval
  createdAt: string
}

export interface Category {
  id: string
  name: string
  slug: string
  icon: string
  description?: string
  parentId?: string
  children?: Category[]
  _count?: { products: number }
}

export interface Supplier {
  id: string
  name: string
  contactEmail: string
  contactPhone: string
  website?: string
  notes?: string
  isActive: boolean
}
