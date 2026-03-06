"use client"

import React, { useState } from 'react'
import { Button, Modal, Input } from '@next360/ui'
import { Address } from '@next360/types'
import AddressCard from '@/components/account/AddressCard'
import { Plus } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { cn } from '@next360/utils'

const addressSchema = z.object({
  name: z.string().min(2, 'Name is too short'),
  phone: z.string().min(10, 'Invalid phone number').max(10, 'Invalid phone number'),
  pincode: z.string().length(6, 'Pincode must be 6 digits'),
  street: z.string().min(5, 'Street address is too short'),
  city: z.string().min(2, 'Invalid city'),
  state: z.string().min(2, 'Please select a state'),
  landmark: z.string().optional(),
  isDefault: z.boolean().optional()
})

const INDIAN_STATES = [
  'Karnataka', 'Maharashtra', 'Telangana', 'Tamil Nadu', 'Delhi', 'Gujarat', 'West Bengal'
]

type AddressFormData = z.infer<typeof addressSchema>

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { accountService } from '@/services/accountService'

export default function AddressesPage() {
  const queryClient = useQueryClient()
  const [editingAddress, setEditingAddress] = useState<Address | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)

  const { data: addresses = [], isLoading } = useQuery({
    queryKey: ['addresses'],
    queryFn: () => accountService.getAddresses(),
    staleTime: 5 * 60 * 1000,
  })

  const addAddressMutation = useMutation({
    mutationFn: (data: any) => accountService.addAddress(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] })
      toast.success('Address added')
      handleClose()
    },
    onError: () => toast.error('Failed to add address')
  })

  const updateAddressMutation = useMutation({
    mutationFn: ({ id, data }: { id: string, data: any }) => accountService.updateAddress(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] })
      toast.success('Address updated')
      handleClose()
    },
    onError: () => toast.error('Failed to update address')
  })

  const deleteAddressMutation = useMutation({
    mutationFn: (id: string) => accountService.deleteAddress(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] })
      toast.success('Address deleted')
    },
    onError: () => toast.error('Failed to delete address')
  })

  const setDefaultMutation = useMutation({
    mutationFn: (id: string) => accountService.updateAddress(id, { isDefault: true }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] })
      toast.success('Default address updated')
    },
    onError: () => toast.error('Failed to update default address')
  })

  const isModalOpen = showAddForm || editingAddress !== null

  const { register, handleSubmit, formState: { errors }, reset } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema)
  })

  // Set default values when editing changes
  React.useEffect(() => {
    if (editingAddress) {
      reset({
        name: editingAddress.name,
        phone: editingAddress.phone,
        street: editingAddress.street,
        city: editingAddress.city,
        state: editingAddress.state,
        pincode: editingAddress.pincode,
        landmark: editingAddress.landmark || '',
        isDefault: editingAddress.isDefault
      })
    } else {
      reset({ isDefault: false, landmark: '' })
    }
  }, [editingAddress, reset])

  const handleClose = () => {
    setShowAddForm(false)
    setEditingAddress(null)
    reset()
  }

  const onSubmit = (data: AddressFormData) => {
    if (editingAddress) {
      updateAddressMutation.mutate({ id: editingAddress.id, data })
    } else {
      addAddressMutation.mutate(data)
    }
  }

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      deleteAddressMutation.mutate(id)
    }
  }

  const handleSetDefault = (id: string) => {
    setDefaultMutation.mutate(id)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-100 pb-6">
        <h1 className="font-display text-2xl font-black text-slate-800">My Addresses</h1>
        <Button variant="primary" className="font-bold" onClick={() => setShowAddForm(true)}>
          <Plus size={18} className="mr-2" />
          Add New Address
        </Button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-48 rounded-3xl bg-slate-50 animate-pulse border border-slate-100" />
          ))
        ) : (
          addresses.map(addr => (
            <AddressCard
              key={addr.id}
              address={addr}
              onEdit={setEditingAddress}
              onDelete={handleDelete}
              onSetDefault={handleSetDefault}
            />
          ))
        )}
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={handleClose} size="md">
        <div className="p-6 md:p-8 space-y-6 max-h-[85vh] overflow-y-auto custom-scrollbar">
          <h2 className="font-display text-xl font-black text-slate-800 border-b border-slate-100 pb-4">
            {editingAddress ? 'Edit Address' : 'Add New Address'}
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Full Name</p>
                <Input placeholder="E.g. Priya Sharma" {...register('name')} className="rounded-xl bg-slate-50" />
                {errors.name && <p className="text-[10px] font-bold text-red-500">{errors.name.message}</p>}
              </div>
              <div className="space-y-1">
                 <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Phone</p>
                 <Input placeholder="10-digit number" {...register('phone')} className="rounded-xl bg-slate-50" />
                 {errors.phone && <p className="text-[10px] font-bold text-red-500">{errors.phone.message}</p>}
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Street / Area</p>
              <Input placeholder="House No, Building, Street" {...register('street')} className="rounded-xl bg-slate-50" />
              {errors.street && <p className="text-[10px] font-bold text-red-500">{errors.street.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                 <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Pincode</p>
                 <Input placeholder="6 digits" {...register('pincode')} className="rounded-xl bg-slate-50" />
                 {errors.pincode && <p className="text-[10px] font-bold text-red-500">{errors.pincode.message}</p>}
              </div>
              <div className="space-y-1">
                 <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">City</p>
                 <Input placeholder="City" {...register('city')} className="rounded-xl bg-slate-50" />
                 {errors.city && <p className="text-[10px] font-bold text-red-500">{errors.city.message}</p>}
              </div>
              <div className="space-y-1">
                 <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">State</p>
                 <select 
                   {...register('state')}
                   className="w-full h-10 lg:h-12 rounded-xl bg-slate-50 border border-slate-200 px-3 text-sm font-medium focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                 >
                   <option value="">Select State</option>
                   {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                 </select>
                 {errors.state && <p className="text-[10px] font-bold text-red-500">{errors.state.message}</p>}
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Landmark (Optional)</p>
              <Input placeholder="Near..." {...register('landmark')} className="rounded-xl bg-slate-50" />
            </div>

            <div className="flex items-center gap-3 pt-2">
               <input type="checkbox" id="isDefault" {...register('isDefault')} className="w-4 h-4 accent-secondary cursor-pointer" />
               <label htmlFor="isDefault" className="text-xs font-bold text-slate-600 uppercase tracking-widest cursor-pointer mt-0.5">
                 Make this my default address
               </label>
            </div>

            <div className="flex gap-3 pt-4 border-t border-slate-100">
              <Button type="button" variant="ghost" onClick={handleClose} className="flex-1 font-bold">
                Cancel
              </Button>
              <Button type="submit" variant="primary" className="flex-1 font-bold">
                Save Address
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  )
}
