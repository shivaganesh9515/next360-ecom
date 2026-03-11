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
    <div className="space-y-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-8">
        <div>
           <div className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-4 flex items-center gap-3 italic">
              <span className="w-8 h-[2.5px] bg-primary" /> Delivery Logistics
           </div>
           <h1 className="text-4xl font-black text-slate-900 tracking-tighter italic leading-none">
             Stored Addresses
           </h1>
        </div>
        <Button className="rounded-full px-10 h-16 font-black uppercase tracking-[0.2em] text-xs shadow-2xl shadow-primary/20" onClick={() => setShowAddForm(true)}>
          <Plus size={16} strokeWidth={3} className="mr-3" />
          Add New Terminal
        </Button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-48 rounded-[2.5rem] bg-slate-50 animate-pulse border border-slate-100 shadow-xl" />
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
        <div className="p-8 md:p-12 space-y-10 max-h-[85vh] overflow-y-auto custom-scrollbar">
          <div>
            <div className="text-[9px] font-black text-primary uppercase tracking-[0.3em] mb-3 italic">Configuration Node</div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight italic leading-none pb-6 border-b border-slate-50">
              {editingAddress ? 'Modify Terminal' : 'Register Terminal'}
            </h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Recipient ID</p>
                <Input placeholder="E.g. Priya Sharma" {...register('name')} className="rounded-2xl h-14 bg-slate-50 border-slate-100 font-bold px-6" />
                {errors.name && <p className="text-[10px] font-bold text-red-500 italic mt-2">{errors.name.message}</p>}
              </div>
              <div className="space-y-1">
                 <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Comms Link</p>
                 <Input placeholder="10-digit number" {...register('phone')} className="rounded-2xl h-14 bg-slate-50 border-slate-100 font-bold px-6" />
                 {errors.phone && <p className="text-[10px] font-bold text-red-500 italic mt-2">{errors.phone.message}</p>}
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Vector Strategy (Street)</p>
              <Input placeholder="House No, Building, Street" {...register('street')} className="rounded-2xl h-14 bg-slate-50 border-slate-100 font-bold px-6" />
              {errors.street && <p className="text-[10px] font-bold text-red-500 italic mt-2">{errors.street.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-1">
                 <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Zone Code</p>
                 <Input placeholder="6 digits" {...register('pincode')} className="rounded-2xl h-14 bg-slate-50 border-slate-100 font-bold px-6" />
                 {errors.pincode && <p className="text-[10px] font-bold text-red-500 italic mt-2">{errors.pincode.message}</p>}
              </div>
              <div className="space-y-1">
                 <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">City Hub</p>
                 <Input placeholder="City" {...register('city')} className="rounded-2xl h-14 bg-slate-50 border-slate-100 font-bold px-6" />
                 {errors.city && <p className="text-[10px] font-bold text-red-500 italic mt-2">{errors.city.message}</p>}
              </div>
              <div className="space-y-1">
                 <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Regional Sector</p>
                 <select 
                   {...register('state')}
                   className="w-full h-14 rounded-2xl bg-slate-50 border border-slate-100 px-6 text-sm font-black focus:ring-4 focus:ring-primary/5 transition-all outline-none appearance-none"
                 >
                   <option value="">Select State</option>
                   {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                 </select>
                 {errors.state && <p className="text-[10px] font-bold text-red-500 italic mt-2">{errors.state.message}</p>}
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Landmark Beacon (Optional)</p>
              <Input placeholder="Near..." {...register('landmark')} className="rounded-2xl h-14 bg-slate-50 border-slate-100 font-bold px-6" />
            </div>

            <div className="flex items-center gap-4 pt-4 border-t border-slate-50">
               <div className="relative flex items-center">
                 <input type="checkbox" id="isDefault" {...register('isDefault')} className="w-6 h-6 rounded-lg accent-primary cursor-pointer border-slate-200" />
               </div>
               <label htmlFor="isDefault" className="text-[10px] font-black text-slate-400 uppercase tracking-widest cursor-pointer leading-tight">
                 Establish as Primary Logistics Terminal
               </label>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-slate-50">
              <Button type="button" variant="ghost" onClick={handleClose} className="rounded-full h-14 px-10 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-slate-900 border border-slate-50 hover:border-slate-100">
                Abort
              </Button>
              <Button type="submit" className="flex-1 rounded-full h-14 px-10 text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-primary/20">
                Execute Registration
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  )
}
