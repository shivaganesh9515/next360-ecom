"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Plus, Check, Phone, Landmark, ChevronRight } from 'lucide-react'
import { Button, Input, Badge, Checkbox } from '@next360/ui'
import { Address } from '@next360/types'
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
  isDefault: z.boolean()
})

type AddressFormData = z.infer<typeof addressSchema>

interface AddressFormProps {
  selectedId: string
  onSelect: (id: string) => void
  onNext: () => void
}

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { accountService } from '@/services/accountService'

const INDIAN_STATES = [
  'Karnataka', 'Maharashtra', 'Telangana', 'Tamil Nadu', 'Delhi', 'Gujarat', 'West Bengal'
]

export default function AddressForm({ selectedId, onSelect, onNext }: AddressFormProps) {
  const queryClient = useQueryClient()
  const [showNewForm, setShowNewForm] = useState(false)

  const { data: addresses = [], isLoading } = useQuery({
    queryKey: ['addresses'],
    queryFn: () => accountService.getAddresses(),
    staleTime: 5 * 60 * 1000,
  })

  const { register, handleSubmit, formState: { errors }, reset } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: { isDefault: false }
  })

  const addAddressMutation = useMutation({
    mutationFn: (data: AddressFormData) => accountService.addAddress(data),
    onSuccess: (newAddr) => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] })
      onSelect(newAddr.id)
      setShowNewForm(false)
      reset()
      toast.success('Address added successfully!')
    },
    onError: () => toast.error('Failed to add address')
  })

  const onSubmit = (data: AddressFormData) => {
    addAddressMutation.mutate(data)
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-[2.5rem] border border-border p-8 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-display text-2xl font-bold text-primary flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-primary/5 text-primary flex items-center justify-center border border-primary/10">
              <MapPin size={18} />
            </span>
            Delivery Address
          </h2>
          {!showNewForm && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowNewForm(true)}
              className="rounded-xl font-bold text-xs uppercase tracking-widest border-primary/20 text-primary"
            >
              <Plus size={14} className="mr-1.5" />
              Add New
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {isLoading ? (
            Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="h-48 rounded-3xl bg-cream animate-pulse border-2 border-cream" />
            ))
          ) : (
            <AnimatePresence>
              {addresses.map((addr) => (
                <motion.div
                  key={addr.id}
                  layout
                  onClick={() => onSelect(addr.id)}
                  className={cn(
                    "relative p-6 rounded-3xl border-2 transition-all cursor-pointer group",
                    selectedId === addr.id 
                      ? "border-primary bg-primary/5 shadow-lg shadow-primary/5" 
                      : "border-border hover:border-primary/20"
                  )}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="w-8 h-8 rounded-full border-2 border-border group-hover:border-primary/20 flex items-center justify-center transition-colors">
                      {selectedId === addr.id && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-4 h-4 rounded-full bg-primary" />
                      )}
                    </div>
                    {addr.isDefault && (
                      <Badge className="bg-secondary/10 text-secondary text-[10px] font-black border-none px-2 rounded-lg">DEFAULT</Badge>
                    )}
                  </div>

                  <p className="font-black text-text text-lg mb-1">{addr.name}</p>
                  <div className="flex items-center gap-1.5 text-muted text-xs font-bold mb-4 uppercase tracking-widest">
                     <Phone size={12} /> {addr.phone}
                  </div>
                  
                  <p className="text-muted text-sm font-medium leading-relaxed mb-1">
                    {addr.street}
                  </p>
                  <p className="text-muted text-sm font-medium">
                    {addr.city}, {addr.state} - <span className="text-primary font-black">{addr.pincode}</span>
                  </p>

                  {addr.landmark && (
                    <div className="mt-3 pt-3 border-t border-border flex items-center gap-2 text-[10px] text-muted font-bold uppercase tracking-widest">
                      <Landmark size={12} className="text-primary/40" />
                      {addr.landmark}
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        {/* New Address Form */}
        <AnimatePresence>
          {showNewForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-8 p-8 bg-cream/50 rounded-[2.5rem] border border-border">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <p className="text-xs font-black uppercase tracking-widest text-muted pl-1">Full Name</p>
                      <Input placeholder="Enter your name" {...register('name')} className="rounded-2xl h-12 bg-white border-border focus:border-secondary" />
                      {errors.name && <p className="text-[10px] font-bold text-red-500">{errors.name.message}</p>}
                    </div>
                    <div className="space-y-2">
                       <p className="text-xs font-black uppercase tracking-widest text-muted pl-1">Phone Number</p>
                       <Input placeholder="10-digit number" {...register('phone')} className="rounded-2xl h-12 bg-white border-border focus:border-secondary" />
                       {errors.phone && <p className="text-[10px] font-bold text-red-500">{errors.phone.message}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-black uppercase tracking-widest text-muted pl-1">Street Address</p>
                    <Input placeholder="House No, Building, Area" {...register('street')} className="rounded-2xl h-12 bg-white border-border focus:border-secondary" />
                    {errors.street && <p className="text-[10px] font-bold text-red-500">{errors.street.message}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                       <p className="text-xs font-black uppercase tracking-widest text-muted pl-1">Pincode</p>
                       <Input placeholder="6 digits" {...register('pincode')} className="rounded-2xl h-12 bg-white border-border focus:border-secondary" />
                       {errors.pincode && <p className="text-[10px] font-bold text-red-500">{errors.pincode.message}</p>}
                    </div>
                    <div className="space-y-2">
                       <p className="text-xs font-black uppercase tracking-widest text-muted pl-1">City</p>
                       <Input placeholder="Enter city" {...register('city')} className="rounded-2xl h-12 bg-white border-border focus:border-secondary" />
                       {errors.city && <p className="text-[10px] font-bold text-red-500">{errors.city.message}</p>}
                    </div>
                    <div className="space-y-2">
                       <p className="text-xs font-black uppercase tracking-widest text-muted pl-1">State</p>
                       <select 
                         {...register('state')}
                         className="w-full h-12 rounded-2xl bg-white border border-border px-4 text-sm font-medium focus:ring-2 focus:ring-secondary/20 transition-all outline-none appearance-none"
                       >
                         <option value="">Select State</option>
                         {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                       </select>
                       {errors.state && <p className="text-[10px] font-bold text-red-500">{errors.state.message}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-black uppercase tracking-widest text-muted pl-1">Landmark (Optional)</p>
                    <Input placeholder="E.g. Near Apollo Hospital" {...register('landmark')} className="rounded-2xl h-12 bg-white border-border focus:border-secondary" />
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Placeholder for Checkbox if implemented as component, otherwise using a simple div for now */}
                    <div className="flex items-center gap-3">
                         <input type="checkbox" id="isDefault" {...register('isDefault')} className="w-5 h-5 accent-secondary cursor-pointer" />
                         <label htmlFor="isDefault" className="text-xs font-bold text-muted uppercase tracking-widest cursor-pointer">Set as default address</label>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button 
                      type="submit"
                      className="flex-1 h-14 rounded-2xl font-black text-lg shadow-xl shadow-primary/20"
                    >
                      Save Address
                    </Button>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      onClick={() => setShowNewForm(false)}
                      className="h-14 px-8 rounded-2xl text-muted font-bold hover:bg-cream"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <Button
          onClick={onNext}
          disabled={!selectedId}
          className="w-full h-16 rounded-[1.25rem] font-black text-xl mt-12 shadow-2xl shadow-primary/20 group"
        >
          <span>Continue to Payment</span>
          <ChevronRight size={24} className="ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>

      <p className="text-center text-[10px] font-black text-muted uppercase tracking-[0.2em] px-12">
        🏠 We currently deliver only in major metropolitan areas for maximum freshness.
      </p>
    </div>
  )
}
