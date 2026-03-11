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
    <div className="space-y-8">
      <div className="">
        <div className="flex items-center justify-between mb-10">
          <div className="space-y-1">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
              Delivery Destination
            </h2>
            <p className="text-sm text-slate-400 font-bold uppercase tracking-widest pl-1">Where should we ship your fresh haul?</p>
          </div>
          {!showNewForm && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowNewForm(true)}
              className="rounded-full font-black text-[10px] uppercase tracking-[0.2em] px-6 h-11"
            >
              <Plus size={14} className="mr-2" />
              Add New
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {isLoading ? (
            Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="h-56 rounded-[2.5rem] bg-slate-100 animate-pulse" />
            ))
          ) : (
            <AnimatePresence>
              {addresses.map((addr) => (
                <motion.div
                  key={addr.id}
                  layout
                  onClick={() => onSelect(addr.id)}
                  className={cn(
                    "relative p-8 rounded-[2.5rem] border-2 transition-all duration-500 cursor-pointer group bg-white",
                    selectedId === addr.id 
                      ? "border-primary shadow-2xl shadow-primary/5 ring-8 ring-primary/5" 
                      : "border-slate-100 hover:border-primary/30"
                  )}
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className={cn(
                      "w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-500",
                      selectedId === addr.id ? "bg-primary border-primary" : "border-slate-100 bg-slate-50"
                    )}>
                      {selectedId === addr.id && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                          <Check size={20} className="text-white" strokeWidth={4} />
                        </motion.div>
                      )}
                    </div>
                    {addr.isDefault && (
                      <Badge variant="green" size="sm" className="bg-primary/5 text-primary text-[9px] font-black border-none px-3 py-1 rounded-full uppercase tracking-widest">Default</Badge>
                    )}
                  </div>

                  <p className="font-black text-slate-900 text-xl mb-1 tracking-tight">{addr.name}</p>
                  <div className="flex items-center gap-2 text-slate-400 text-[10px] font-black mb-6 uppercase tracking-widest">
                     <Phone size={12} className="text-primary" strokeWidth={3} /> {addr.phone}
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-slate-500 text-sm font-bold leading-relaxed">{addr.street}</p>
                    <p className="text-slate-500 text-sm font-bold">
                      {addr.city}, {addr.state} - <span className="text-primary font-black">{addr.pincode}</span>
                    </p>
                  </div>

                  {addr.landmark && (
                    <div className="mt-4 pt-4 border-t border-slate-50 flex items-center gap-2 text-[9px] text-slate-400 font-black uppercase tracking-[0.2em]">
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
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className="mt-10 p-10 bg-white rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/50">
                <div className="mb-10 text-center">
                   <h3 className="text-2xl font-black text-slate-900 tracking-tight">New Address</h3>
                   <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Add a fresh delivery spot</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2.5">
                      <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 pl-4">Full Name</p>
                      <Input placeholder="E.g. John Doe" {...register('name')} className="rounded-full h-14 bg-slate-50 border-none shadow-inner focus:ring-4 focus:ring-primary/5 px-8" />
                      {errors.name && <p className="text-[10px] font-black text-red-500 pl-4 mt-1">{errors.name.message}</p>}
                    </div>
                    <div className="space-y-2.5">
                       <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 pl-4">Phone Number</p>
                       <Input placeholder="99999 99999" {...register('phone')} className="rounded-full h-14 bg-slate-50 border-none shadow-inner focus:ring-4 focus:ring-primary/5 px-8" />
                       {errors.phone && <p className="text-[10px] font-black text-red-500 pl-4 mt-1">{errors.phone.message}</p>}
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 pl-4">Street Address</p>
                    <Input placeholder="House No, Apartment, Street name" {...register('street')} className="rounded-full h-14 bg-slate-50 border-none shadow-inner focus:ring-4 focus:ring-primary/5 px-8" />
                    {errors.street && <p className="text-[10px] font-black text-red-500 pl-4 mt-1">{errors.street.message}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="space-y-2.5">
                       <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 pl-4">Pincode</p>
                       <Input placeholder="600001" {...register('pincode')} className="rounded-full h-14 bg-slate-50 border-none shadow-inner focus:ring-4 focus:ring-primary/5 px-8" />
                       {errors.pincode && <p className="text-[10px] font-black text-red-500 pl-4 mt-1">{errors.pincode.message}</p>}
                    </div>
                    <div className="space-y-2.5">
                       <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 pl-4">City</p>
                       <Input placeholder="Chennai" {...register('city')} className="rounded-full h-14 bg-slate-50 border-none shadow-inner focus:ring-4 focus:ring-primary/5 px-8" />
                       {errors.city && <p className="text-[10px] font-black text-red-500 pl-4 mt-1">{errors.city.message}</p>}
                    </div>
                    <div className="space-y-2.5">
                       <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 pl-4">State</p>
                       <select 
                         {...register('state')}
                         className="w-full h-14 rounded-full bg-slate-50 border-none shadow-inner px-8 text-sm font-black focus:ring-4 focus:ring-primary/5 transition-all outline-none appearance-none cursor-pointer"
                       >
                         <option value="">Select State</option>
                         {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                       </select>
                       {errors.state && <p className="text-[10px] font-black text-red-500 pl-4 mt-1">{errors.state.message}</p>}
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 pl-4">Landmark (Optional)</p>
                    <Input placeholder="E.g. Near Market Metro" {...register('landmark')} className="rounded-full h-14 bg-slate-50 border-none shadow-inner focus:ring-4 focus:ring-primary/5 px-8" />
                  </div>

                  <div className="flex items-center gap-2 pl-4">
                    <div className="flex items-center gap-3">
                         <input type="checkbox" id="isDefault" {...register('isDefault')} className="w-5 h-5 accent-primary rounded-lg cursor-pointer" />
                         <label htmlFor="isDefault" className="text-[10px] font-black text-slate-400 uppercase tracking-widest cursor-pointer hover:text-slate-900 transition-colors">Set as Primary Address</label>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-6">
                    <Button 
                      type="submit"
                      className="flex-1 h-16 rounded-full font-black text-base uppercase tracking-widest shadow-2xl shadow-primary/20"
                      disabled={addAddressMutation.isPending}
                    >
                      {addAddressMutation.isPending ? 'Saving...' : 'Secure Address'}
                    </Button>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      onClick={() => setShowNewForm(false)}
                      className="h-16 px-10 rounded-full text-slate-400 font-black uppercase tracking-widest text-[10px] hover:bg-slate-50"
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
          className="w-full h-16 rounded-full font-black text-lg uppercase tracking-widest mt-12 shadow-2xl shadow-primary/20 group gap-3"
        >
          <span>Confirm Selection</span>
          <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" strokeWidth={3} />
        </Button>
      </div>

      <p className="text-center text-[9px] font-black text-slate-300 uppercase tracking-[0.3em] px-12 leading-relaxed">
        Premium Organic Network • Real-time Freshness Tracking • Secure Nodes
      </p>
    </div>
  )
}
