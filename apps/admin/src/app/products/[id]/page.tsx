'use client'

import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { adminService } from '../../../services/adminService'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { ProductForm, ProductFormValues } from '../../../components/products/ProductForm'
import { use } from 'react'

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const queryClient = useQueryClient()

  const { data: product, isLoading: productLoading } = useQuery({
    queryKey: ['admin-product', id],
    queryFn: () => adminService.getProductById(id).then(res => res.product)
  })

  const { data: categories = [] } = useQuery({
    queryKey: ['admin-categories'],
    queryFn: () => adminService.getCategories().then(res => res.categories || [])
  })

  const { data: vendors = [] } = useQuery({
    queryKey: ['admin-vendors'],
    queryFn: () => adminService.getVendors().then(res => res.vendors || [])
  })

  const mutation = useMutation({
    mutationFn: (data: ProductFormValues) => adminService.updateProduct(id, data),
    onSuccess: () => {
      toast.success('Product updated successfully')
      queryClient.invalidateQueries({ queryKey: ['admin-products'] })
      queryClient.invalidateQueries({ queryKey: ['admin-product', id] })
      router.push('/products')
    },
    onError: (err: any) => {
      toast.error(err.message || 'Failed to update product')
    }
  })

  if (productLoading) {
    return (
      <div className="p-12 flex justify-center">
        <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
      </div>
    )
  }

  // Pre-process product for form
  const initialData = product ? {
    ...product,
    categoryId: product.categoryId,
    vendorId: product.vendorId,
    tags: product.tags?.join(', ') || ''
  } : undefined

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <div className="mb-6">
        <h2 className="text-2xl font-display font-semibold text-text">Edit Product</h2>
        <p className="text-muted text-sm mt-1">Update product details, pricing, and images.</p>
      </div>

      {initialData && (
        <ProductForm 
          initialData={initialData}
          onSubmit={async (data) => mutation.mutateAsync(data)}
          isSubmitting={mutation.isPending}
          categories={categories}
          vendors={vendors}
        />
      )}
    </div>
  )
}
