'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { adminService } from '../../services/adminService'
import { DataTable } from '@next360/ui/DataTable'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { Plus, Edit, Trash2, Tag, Percent } from 'lucide-react'
import { Button } from '@next360/ui/Button'
import { Input } from '@next360/ui/Input'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const couponSchema = z.object({
  code: z.string().min(3).toUpperCase(),
  discountType: z.enum(['PERCENTAGE', 'FIXED']),
  discountValue: z.coerce.number().positive(),
  minOrderValue: z.coerce.number().min(0).optional(),
  maxDiscount: z.coerce.number().positive().optional(),
  usageLimit: z.coerce.number().positive().optional(),
  expiresAt: z.string().min(1, 'Expiration date required'),
  isActive: z.boolean().default(true)
})

type CouponFormValues = z.infer<typeof couponSchema>

export default function CouponsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCoupon, setEditingCoupon] = useState<any>(null)
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<CouponFormValues>({
    resolver: zodResolver(couponSchema) as any,
    defaultValues: { isActive: true, discountType: 'PERCENTAGE' }
  })

  const discountType = watch('discountType')

  const { data, isLoading } = useQuery({
    queryKey: ['admin-coupons'],
    queryFn: () => adminService.getCoupons()
  })

  // Close & Reset
  const handleClose = () => {
    setIsModalOpen(false)
    setEditingCoupon(null)
    reset({ isActive: true, discountType: 'PERCENTAGE', code: '', discountValue: 0 })
  }

  // Open Edit
  const handleEdit = (coupon: any) => {
    setEditingCoupon(coupon)
    reset({
      ...coupon,
      expiresAt: coupon.expiresAt ? new Date(coupon.expiresAt).toISOString().slice(0, 16) : ''
    })
    setIsModalOpen(true)
  }

  const saveMutation = useMutation({
    mutationFn: (data: CouponFormValues) => 
      editingCoupon 
        ? adminService.updateCoupon(editingCoupon.id, data)
        : adminService.createCoupon(data),
    onSuccess: () => {
      toast.success(`Coupon ${editingCoupon ? 'updated' : 'created'} successfully`)
      queryClient.invalidateQueries({ queryKey: ['admin-coupons'] })
      handleClose()
    },
    onError: (err: any) => {
      toast.error(err.message || 'Failed to save coupon')
    }
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => adminService.deleteCoupon(id),
    onSuccess: () => {
      toast.success('Coupon deleted')
      queryClient.invalidateQueries({ queryKey: ['admin-coupons'] })
    }
  })

  const columns: any[] = [
    {
      accessorKey: 'code',
      header: 'Code',
      cell: (row: any) => (
        <span className="font-mono font-bold text-gray-900 bg-gray-100 px-2 py-1 rounded">
          {row.code}
        </span>
      )
    },
    {
      header: 'Discount',
      cell: (row: any) => {
        const c = row.original
        return (
          <div className="flex items-center gap-1.5 font-medium text-green-700">
            {c.discountType === 'PERCENTAGE' ? <Percent className="w-3.5 h-3.5" /> : '₹'}
            {c.discountValue}
            {c.discountType === 'PERCENTAGE' ? ' OFF' : ' FLAT'}
          </div>
        )
      }
    },
    {
      accessorKey: 'usageCount',
      header: 'Usage',
      cell: (row: any) => (
        <span className="text-sm text-gray-600">
          {row.usageCount} {row.usageLimit ? `/ ${row.usageLimit}` : 'uses'}
        </span>
      )
    },
    {
      accessorKey: 'expiresAt',
      header: 'Expires',
      cell: (row: any) => {
        const date = new Date(row.expiresAt)
        const isExpired = date < new Date()
        return (
          <span className={`text-sm ${isExpired ? 'text-red-500 font-medium' : 'text-gray-600'}`}>
            {format(date, 'MMM d, yyyy')}
          </span>
        )
      }
    },
    {
      accessorKey: 'isActive',
      header: 'Status',
      cell: (row: any) => (
        <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
          row.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {row.isActive ? 'ACTIVE' : 'INACTIVE'}
        </span>
      )
    },
    {
      id: 'actions',
      cell: (row: any) => (
        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={() => handleEdit(row.original)}
            className="p-2 text-gray-400 hover:text-primary transition-colors rounded-lg hover:bg-primary/5"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button 
            onClick={() => {
              if (window.confirm('Delete this coupon permanently?')) {
                deleteMutation.mutate(row.id)
              }
            }}
            className="p-2 text-gray-400 hover:text-red-600 transition-colors rounded-lg hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ]

  const coupons = data?.coupons || []

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-display font-semibold text-gray-900">Discount Coupons</h2>
          <p className="text-muted text-sm mt-1">Manage promotional codes and offers.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2">
          <Plus className="w-4 h-4" /> Create Coupon
        </Button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="p-12 flex justify-center">
            <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
          </div>
        ) : (
          <DataTable 
            columns={columns} 
            data={coupons} 
            searchKey="code"
          />
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden max-h-[90vh] flex flex-col">
            <div className="p-6 border-b border-border shrink-0">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingCoupon ? 'Edit Coupon' : 'Create New Coupon'}
              </h3>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              <form id="coupon-form" onSubmit={handleSubmit((d) => saveMutation.mutate(d))} className="space-y-4">
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Coupon Code</label>
                    <div className="relative">
                      <Tag className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <Input {...register('code')} placeholder="e.g. SUMMER50" className="pl-9 uppercase" />
                    </div>
                    {errors.code && <p className="text-xs text-red-500 mt-1">{errors.code.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Discount Type</label>
                    <select 
                      {...register('discountType')}
                      className="w-full h-11 px-4 border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    >
                      <option value="PERCENTAGE">Percentage (%)</option>
                      <option value="FIXED">Fixed Amount (₹)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Value {discountType === 'PERCENTAGE' ? '(%)' : '(₹)'}
                    </label>
                    <Input type="number" step="0.01" {...register('discountValue')} />
                    {errors.discountValue && <p className="text-xs text-red-500 mt-1">{errors.discountValue.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Min Order Value (₹)</label>
                    <Input type="number" {...register('minOrderValue')} placeholder="Optional" />
                  </div>

                  {discountType === 'PERCENTAGE' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Max Discount (₹)</label>
                      <Input type="number" {...register('maxDiscount')} placeholder="Optional" />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Usage Limit</label>
                    <Input type="number" {...register('usageLimit')} placeholder="Optional (e.g. 100)" />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expiration Date & Time</label>
                    <Input type="datetime-local" {...register('expiresAt')} />
                    {errors.expiresAt && <p className="text-xs text-red-500 mt-1">{errors.expiresAt.message}</p>}
                  </div>

                  <div className="col-span-2 pt-2">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" {...register('isActive')} className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary" />
                      <span className="text-sm font-medium text-gray-900">Coupon is active</span>
                    </label>
                  </div>

                </div>
              </form>
            </div>
            
            <div className="p-4 border-t border-border flex justify-end gap-3 bg-gray-50 shrink-0">
              <Button type="button" variant="outline" onClick={handleClose}>Cancel</Button>
              <Button type="submit" form="coupon-form" isLoading={saveMutation.isPending}>
                {editingCoupon ? 'Save Changes' : 'Create Coupon'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
