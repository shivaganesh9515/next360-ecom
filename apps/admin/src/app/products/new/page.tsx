'use client'

import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { adminService } from '../../../services/adminService'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { ProductForm, ProductFormValues } from '../../../components/products/ProductForm'

export default function NewProductPage() {
  const router = useRouter()
  const queryClient = useQueryClient()

  const { data: categories = [] } = useQuery({
    queryKey: ['admin-categories'],
    queryFn: () => adminService.getCategories().then((res: any) => res.categories || [])
  })

  const { data: vendors = [] } = useQuery({
    queryKey: ['admin-vendors'],
    queryFn: () => adminService.getVendors().then((res: any) => res.vendors || [])
  })

  const mutation = useMutation({
    mutationFn: (data: ProductFormValues) => adminService.createProduct(data),
    onSuccess: () => {
      toast.success('Product created successfully')
      queryClient.invalidateQueries({ queryKey: ['admin-products'] })
      router.push('/products')
    },
    onError: (err: any) => {
      toast.error(err.message || 'Failed to create product')
    }
  })

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <div className="mb-6">
        <h2 className="text-2xl font-display font-semibold text-text">Add New Product</h2>
        <p className="text-muted text-sm mt-1">Create a new product for the catalogue.</p>
      </div>

      <ProductForm 
        onSubmit={async (data: any) => { await mutation.mutateAsync(data) }}
        isSubmitting={mutation.isPending}
        categories={categories}
        vendors={vendors}
      />
    </div>
  )
}
