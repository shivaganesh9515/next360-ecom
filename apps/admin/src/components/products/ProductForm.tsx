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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-12 pb-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-10">
          <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/50 space-y-10">
            <div className="flex items-center gap-4">
               <div className="h-1.5 w-12 bg-primary rounded-full shadow-sm" />
               <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">Node Configuration</h3>
            </div>
            
            <div className="space-y-8">
              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 ml-2">Product Name</label>
                <Input 
                  {...register('name')} 
                  placeholder="E.g., Quantum Emerald Honey" 
                  className="rounded-full py-7 px-8 bg-slate-50/50 border-slate-100 focus:bg-white focus:shadow-xl transition-all font-bold text-slate-800"
                  error={errors.name?.message} 
                />
                {errors.name && <p className="text-[9px] font-black text-rose-500 mt-2 ml-4 uppercase tracking-widest">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 ml-2">Operational Description</label>
                <textarea 
                  {...register('description')}
                  className="w-full h-48 px-8 py-6 bg-slate-50/50 border border-slate-100 rounded-[2rem] focus:bg-white focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all text-sm outline-none resize-none font-sans font-bold text-slate-700 placeholder:text-slate-400"
                  placeholder="Enter detailed system parameters..."
                />
                {errors.description && <p className="text-[9px] font-black text-rose-500 mt-2 ml-4 uppercase tracking-widest">{errors.description.message}</p>}
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 ml-2">Visual Arrays</label>
                <div className="bg-slate-50/50 rounded-[2.5rem] p-4 border border-slate-100/50">
                  <ImageUploader 
                    images={images} 
                    onChange={(newImages) => setValue('images', newImages, { shouldValidate: true })} 
                  />
                </div>
                {errors.images && <p className="text-[9px] font-black text-rose-500 mt-3 ml-4 uppercase tracking-widest">{errors.images.message}</p>}
              </div>
            </div>
          </div>
          
          <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/50 space-y-10">
            <div className="flex items-center gap-4">
               <div className="h-1.5 w-12 bg-primary rounded-full shadow-sm" />
               <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">Inventory Metrics</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 ml-2">Market Price (₹)</label>
                <Input 
                  type="number" 
                  step="0.01" 
                  {...register('price')} 
                  placeholder="0.00" 
                  className="rounded-full py-7 px-8 bg-slate-50/50 border-slate-100 focus:bg-white transition-all font-black text-primary text-xl italic"
                  error={errors.price?.message} 
                />
                {errors.price && <p className="text-[9px] font-black text-rose-500 mt-2 ml-4 uppercase tracking-widest">{errors.price.message}</p>}
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 ml-2">Network Stock</label>
                <Input 
                  type="number" 
                  {...register('stock')} 
                  placeholder="0" 
                  className="rounded-full py-7 px-8 bg-slate-50/50 border-slate-100 focus:bg-white transition-all font-black text-slate-800 text-xl"
                  error={errors.stock?.message} 
                />
                {errors.stock && <p className="text-[9px] font-black text-rose-500 mt-2 ml-4 uppercase tracking-widest">{errors.stock.message}</p>}
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 ml-2">Serial Key (SKU)</label>
                <Input 
                  {...register('sku')} 
                  placeholder="PROD-SEQUENCE" 
                  className="rounded-full py-7 px-8 bg-slate-50/50 border-slate-100 focus:bg-white transition-all font-bold text-slate-600 tracking-widest uppercase"
                  error={errors.sku?.message} 
                />
                {errors.sku && <p className="text-[9px] font-black text-rose-500 mt-2 ml-4 uppercase tracking-widest">{errors.sku.message}</p>}
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 ml-2">Organic Index %</label>
                <Input 
                  type="number" 
                  {...register('organicPercentage')} 
                  placeholder="100" 
                  className="rounded-full py-7 px-8 bg-slate-50/50 border-slate-100 focus:bg-white transition-all font-black text-emerald-600 text-xl"
                  error={errors.organicPercentage?.message} 
                />
                {errors.organicPercentage && <p className="text-[9px] font-black text-rose-500 mt-2 ml-4 uppercase tracking-widest">{errors.organicPercentage.message}</p>}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Organization Settings */}
        <div className="space-y-10">
          <div className="bg-slate-900 p-10 rounded-[3rem] border border-white/5 shadow-[0_50px_100px_rgba(15,23,42,0.3)] flex flex-col h-full relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_0%,rgba(22,163,74,0.08),transparent)] pointer-events-none" />
            
            <div className="relative z-10 flex-1">
              <div className="flex items-center gap-3 mb-10">
                 <div className="h-1.5 w-8 bg-primary rounded-full shadow-sm" />
                 <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-500">Registry Protocol</h3>
              </div>
              
              <div className="space-y-8">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-2">Logic Sector</label>
                  <select 
                    {...register('categoryId')}
                    className="w-full h-16 px-8 bg-white/[0.03] border border-white/10 rounded-full focus:bg-white/[0.08] focus:border-primary outline-none text-xs font-black uppercase tracking-widest text-white transition-all appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-slate-900">Select Sector</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id} className="bg-slate-900">{c.name}</option>
                    ))}
                  </select>
                  {errors.categoryId && <p className="text-[9px] font-black text-rose-400 mt-2 ml-4 uppercase tracking-widest">{errors.categoryId.message}</p>}
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-2">Node Provider</label>
                  <select 
                    {...register('vendorId')}
                    className="w-full h-16 px-8 bg-white/[0.03] border border-white/10 rounded-full focus:bg-white/[0.08] focus:border-primary outline-none text-xs font-black uppercase tracking-widest text-white transition-all appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-slate-900">Select Provider</option>
                    {vendors.map((v) => (
                      <option key={v.id} value={v.id} className="bg-slate-900">{v.storeName || v.user?.name}</option>
                    ))}
                  </select>
                  {errors.vendorId && <p className="text-[9px] font-black text-rose-400 mt-2 ml-4 uppercase tracking-widest">{errors.vendorId.message}</p>}
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-2">Metadata Segments</label>
                  <Input 
                    {...register('tags')} 
                    placeholder="tag, sequence, node" 
                    className="rounded-full py-7 px-8 bg-white/[0.03] border-white/10 text-white font-bold text-xs"
                  />
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-10 border-t border-white/5 mt-12">
              <label className="flex items-center gap-4 cursor-pointer mb-10 group/check">
                <div className="relative flex items-center justify-center">
                  <input type="checkbox" {...register('isPublished')} className="peer sr-only" />
                  <div className="w-6 h-6 rounded-lg border-2 border-white/10 peer-checked:bg-primary peer-checked:border-primary transition-all shadow-inner" />
                  <div className="absolute opacity-0 peer-checked:opacity-100 transition-opacity">
                    <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest group-hover/check:text-white transition-colors">Initialize Production Node</span>
              </label>
              
              <Button type="submit" className="w-full py-10 rounded-[2rem] bg-primary hover:bg-primary/90 text-white font-black text-sm uppercase tracking-[0.25em] shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all group overflow-hidden border-none" isLoading={isSubmitting}>
                <span className="relative z-10 italic">
                  {initialData ? 'Commit Pulse Changes' : 'Initialize New Node'}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </Button>
            </div>
          </div>
        </div>

      </div>
    </form>
  )
}
