'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { vendorService } from '../../services/vendorService'
import { useQuery } from '@tanstack/react-query'
import { Button, Input, Textarea, Select } from '@next360/ui'
import { Loader2, UploadCloud, X } from 'lucide-react'
import { toast } from 'sonner'
import Image from 'next/image'

// Simplified schema compared to admin - vendors don't set featured or approvalStatus
const productSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  slug: z.string().min(2, 'Slug is required'),
  shortDesc: z.string().min(5, 'Short description is required'),
  description: z.string().optional(),
  price: z.coerce.number().min(1, 'Price must be greater than 0'),
  defaultWeight: z.string().min(1, 'Weight is required'),
  stockCount: z.coerce.number().min(0),
  categoryId: z.string().min(1, 'Category is required'),
  isOrganic: z.boolean().default(true),
})

type ProductFormValues = z.infer<typeof productSchema>

export default function VendorProductForm({ initialData }: { initialData?: any }) {
  const router = useRouter()
  const [images, setImages] = useState<string[]>(initialData?.images || [])
  const [uploading, setUploading] = useState(false)

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: () => vendorService.getCategories(),
  })

  // Simulated categories if backend detached
  const categoryOptions = categories?.data || [
    { id: '1', name: 'Fruits & Vegetables' },
    { id: '2', name: 'Dairy & Eggs' },
  ]

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema) as any,
    defaultValues: initialData || {
      isOrganic: true,
      stockCount: 0,
      price: 0,
    }
  })

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return
    setUploading(true)
    try {
      const files = Array.from(e.target.files)
      // Simulate upload delay for UI testing
      await new Promise(r => setTimeout(r, 1000))
      // In real implementation: const urls = await vendorService.uploadImages(files)
      const mockUrls = files.map(() => `https://placehold.co/400x400?text=Uploaded+Img`)
      setImages(prev => [...prev, ...mockUrls])
    } catch (err) {
      toast.error('Failed to upload image')
    } finally {
      setUploading(false)
    }
  }

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  const onSubmit = async (data: ProductFormValues) => {
    try {
      const payload = { ...data, images }
      
      if (initialData?.id) {
        await vendorService.updateProduct(initialData.id, payload)
        toast.success('Product updated successfully')
      } else {
        await vendorService.createProduct(payload)
        toast.success('Product submitted for approval')
      }
      
      router.push('/products')
      router.refresh()
    } catch (error: any) {
      toast.error(error.message || 'Failed to save product')
    }
  }

  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data as any))} className="space-y-8">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input label="Product Name" {...register('name')} error={errors.name?.message} />
        <Input label="Slug (URL)" {...register('slug')} error={errors.slug?.message} />
        <Input label="Short Description" {...register('shortDesc')} error={errors.shortDesc?.message} />
        <Input label="Default Weight (e.g., 500g)" {...register('defaultWeight')} error={errors.defaultWeight?.message} />
        <Input label="Price (in paise)" type="number" {...register('price')} error={errors.price?.message} />
        <Input label="Stock Count" type="number" {...register('stockCount')} error={errors.stockCount?.message} />
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-text">Category</label>
          <select 
            {...register('categoryId')}
            className="flex h-10 w-full rounded-md border border-border bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="">Select a category</option>
            {categoryOptions.map((c: any) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          {errors.categoryId && <p className="text-xs text-red-500">{errors.categoryId.message}</p>}
        </div>

        <div className="flex items-center space-x-2 pt-8">
          <input 
            type="checkbox" 
            id="isOrganic"
            {...register('isOrganic')}
            className="h-4 w-4 rounded border-border text-green-600 focus:ring-green-500"
          />
          <label htmlFor="isOrganic" className="text-sm font-medium text-text">
            This product is 100% Organic certified
          </label>
        </div>
      </div>

      <div>
        <Textarea label="Full Description" {...register('description')} error={errors.description?.message} rows={5} />
      </div>

      <div className="space-y-4">
        <label className="text-sm font-medium text-text">Product Images</label>
        <div className="flex flex-wrap gap-4">
          {images.map((url, i) => (
            <div key={i} className="relative w-24 h-24 rounded-lg overflow-hidden border border-border">
              <Image src={url} alt={`Preview ${i}`} fill className="object-cover" />
              <button 
                type="button" 
                onClick={() => removeImage(i)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
          
          <label className="w-24 h-24 rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center cursor-pointer hover:bg-cream/50 transition-colors">
            {uploading ? (
              <Loader2 className="w-6 h-6 animate-spin text-muted" />
            ) : (
              <>
                <UploadCloud className="w-6 h-6 text-muted mb-1" />
                <span className="text-xs text-muted">Upload</span>
              </>
            )}
            <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
          </label>
        </div>
      </div>

      <div className="pt-6 border-t border-border flex justify-end gap-4">
        <Button variant="outline" type="button" onClick={() => router.back()}>Cancel</Button>
        <Button type="submit" className="bg-green-600 hover:bg-green-700" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
          {initialData ? 'Update Product' : 'Submit for Approval'}
        </Button>
      </div>

    </form>
  )
}
