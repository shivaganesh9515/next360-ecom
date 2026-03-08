'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@next360/ui/Button'
import { Input } from '@next360/ui/Input'
import { ImageUploader } from './ImageUploader'

// Ensure we have a reusable product schema
const productSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.coerce.number().positive('Price must be positive'),
  sku: z.string().min(1, 'SKU is required'),
  categoryId: z.string().min(1, 'Category is required'),
  vendorId: z.string().min(1, 'Vendor is required'),
  stock: z.coerce.number().int().nonnegative('Stock must be 0 or more'),
  organicPercentage: z.coerce.number().min(0).max(100, 'Must be 0-100').optional(),
  images: z.array(z.string()).min(1, 'At least one image is required'),
  isPublished: z.boolean().default(true),
  tags: z.string().optional()
})

export type ProductFormValues = z.infer<typeof productSchema>

interface ProductFormProps {
  initialData?: any
  onSubmit: (data: ProductFormValues) => Promise<void>
  categories?: any[]
  vendors?: any[]
  isSubmitting?: boolean
}

export function ProductForm({ initialData, onSubmit, categories = [], vendors = [], isSubmitting }: ProductFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema) as any,
    defaultValues: initialData || {
      images: [],
      isPublished: true,
      stock: 0,
    },
  })

  // Watch selected images to pass them down to uploader
  const images = watch('images')

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-border shadow-sm space-y-6">
            <h3 className="text-lg font-semibold text-text border-b border-border pb-4">General Information</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text mb-1">Product Name</label>
                <Input {...register('name')} placeholder="E.g., Organic Honey" error={errors.name?.message} />
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-1">Description</label>
                <textarea 
                  {...register('description')}
                  className="w-full h-32 px-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm outline-none resize-none font-sans"
                  placeholder="Enter detailed description..."
                />
                {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-1">Product Images</label>
                <ImageUploader 
                  images={images} 
                  onChange={(newImages) => setValue('images', newImages, { shouldValidate: true })} 
                />
                {errors.images && <p className="text-xs text-red-500 mt-1">{errors.images.message}</p>}
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl border border-border shadow-sm space-y-6">
            <h3 className="text-lg font-semibold text-text border-b border-border pb-4">Pricing & Inventory</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text mb-1">Price (₹)</label>
                <Input type="number" step="0.01" {...register('price')} placeholder="0.00" error={errors.price?.message} />
                {errors.price && <p className="text-xs text-red-500 mt-1">{errors.price.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-1">Stock Quantity</label>
                <Input type="number" {...register('stock')} placeholder="0" error={errors.stock?.message} />
                {errors.stock && <p className="text-xs text-red-500 mt-1">{errors.stock.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-1">SKU</label>
                <Input {...register('sku')} placeholder="PROD-XXX" error={errors.sku?.message} />
                {errors.sku && <p className="text-xs text-red-500 mt-1">{errors.sku.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-1">Organic %</label>
                <Input type="number" {...register('organicPercentage')} placeholder="100" error={errors.organicPercentage?.message} />
                {errors.organicPercentage && <p className="text-xs text-red-500 mt-1">{errors.organicPercentage.message}</p>}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Organization Settings */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-border shadow-sm space-y-6 flex flex-col h-full justify-between">
            <div>
              <h3 className="text-lg font-semibold text-text border-b border-border pb-4 mb-4">Organization</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text mb-1">Category</label>
                  <select 
                    {...register('categoryId')}
                    className="w-full h-11 px-4 border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm transition-all"
                  >
                    <option value="">Select Category</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                  {errors.categoryId && <p className="text-xs text-red-500 mt-1">{errors.categoryId.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-1">Vendor</label>
                  <select 
                    {...register('vendorId')}
                    className="w-full h-11 px-4 border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm transition-all"
                  >
                    <option value="">Select Vendor</option>
                    {vendors.map((v) => (
                      <option key={v.id} value={v.id}>{v.storeName || v.user?.name}</option>
                    ))}
                  </select>
                  {errors.vendorId && <p className="text-xs text-red-500 mt-1">{errors.vendorId.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-1">Tags (comma separated)</label>
                  <Input {...register('tags')} placeholder="organic, fresh, local" />
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-border mt-auto">
              <label className="flex items-center gap-3 cursor-pointer mb-6">
                <input type="checkbox" {...register('isPublished')} className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary" />
                <span className="text-sm font-medium text-text">Publish immediately</span>
              </label>
              
              <Button type="submit" size="lg" className="w-full" isLoading={isSubmitting}>
                {initialData ? 'Save Changes' : 'Create Product'}
              </Button>
            </div>
          </div>
        </div>

      </div>
    </form>
  )
}
