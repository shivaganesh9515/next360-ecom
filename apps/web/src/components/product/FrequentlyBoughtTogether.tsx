"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { productService } from '@/services/productService'
import { cartService } from '@/services/cartService'
import { useCartStore } from '@/store/cartStore'
import { Product } from '@next360/types'
import { Plus, Check, Loader2, ShoppingBag } from 'lucide-react'
import { Button, Badge } from '@next360/ui'
import { cn } from '@next360/utils'
import Image from 'next/image'
import { toast } from 'sonner'

interface FBTProps {
  currentProduct: Product
}

export default function FrequentlyBoughtTogether({ currentProduct }: FBTProps) {
  const queryClient = useQueryClient()
  const setCart = useCartStore((state) => state.setCart)
  const [selectedIds, setSelectedIds] = useState<string[]>([currentProduct.id])

  const { data: recommendations = [], isLoading } = useQuery({
    queryKey: ['products', 'fbt', currentProduct.id],
    queryFn: () => productService.getFBT(currentProduct.id),
    staleTime: 60 * 60 * 1000,
  })

  const addBundleMutation = useMutation({
    mutationFn: async (ids: string[]) => {
      let finalCart = null
      for (const id of ids) {
        const prod = [currentProduct, ...recommendations].find(p => p.id === id)
        if (prod) {
          finalCart = await cartService.addItem(id, 1, prod.weight[0])
        }
      }
      return finalCart
    },
    onSuccess: (data) => {
      if (data) setCart(data)
      queryClient.invalidateQueries({ queryKey: ['cart'] })
      toast.success('Bundle added to cart!')
    },
    onError: () => {
      toast.error('Failed to add bundle')
    }
  })

  if (isLoading) return null
  if (recommendations.length === 0) return null

  const itemsToShow = [currentProduct, ...recommendations].slice(0, 3)
  const totalPrice = itemsToShow
    .filter(item => selectedIds.includes(item.id))
    .reduce((sum, item) => sum + item.price, 0)

  const toggleProduct = (id: string) => {
    if (id === currentProduct.id) return // Always keep current product
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  return (
    <section className="mt-32 pt-20 border-t border-slate-100">
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
          Frequently Bought <span className="text-primary italic">Together</span>
        </h2>
        <p className="text-slate-500 font-medium mt-2">Save time and buy these perfectly paired items as a bundle.</p>
      </div>

      <div className="bg-slate-50 rounded-[3rem] p-8 md:p-12">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Products Row */}
          <div className="flex-1 flex items-center justify-center gap-4 md:gap-8 flex-wrap">
            {itemsToShow.map((item, idx) => (
              <React.Fragment key={item.id}>
                <div 
                  onClick={() => toggleProduct(item.id)}
                  className={cn(
                    "relative group cursor-pointer transition-all duration-500",
                    !selectedIds.includes(item.id) && "opacity-40 grayscale"
                  )}
                >
                  <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-[2rem] overflow-hidden bg-white shadow-xl border-4 border-white group-hover:scale-105 transition-transform">
                    <Image 
                      src={item.images[0]} 
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                    <div className={cn(
                      "absolute inset-0 flex items-center justify-center bg-primary/20 transition-opacity",
                      selectedIds.includes(item.id) ? "opacity-0" : "opacity-100"
                    )}>
                      <Plus size={32} className="text-white" />
                    </div>
                  </div>
                  
                  {selectedIds.includes(item.id) && (
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shadow-lg border-2 border-white">
                      <Check size={16} strokeWidth={3} />
                    </div>
                  )}

                  <div className="mt-4 text-center">
                    <p className="font-black text-slate-900 text-sm truncate max-w-[120px] mx-auto">{item.name}</p>
                    <p className="text-primary font-bold text-xs">₹{(item.price / 100).toFixed(2)}</p>
                  </div>
                </div>
                
                {idx < itemsToShow.length - 1 && (
                  <div className="text-slate-300 font-black text-2xl">+</div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Action Box */}
          <div className="w-full lg:w-80 bg-white rounded-[2rem] p-8 shadow-xl shadow-primary/5 border border-slate-100">
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center text-sm font-bold text-slate-400 uppercase tracking-widest">
                <span>Bundle Total</span>
                <Badge variant="info" className="bg-primary/5 text-primary border-none text-[10px]">
                  {selectedIds.length} Items
                </Badge>
              </div>
              <div className="text-4xl font-black text-slate-900">
                ₹{(totalPrice / 100).toFixed(2)}
              </div>
            </div>

            <Button 
              className="w-full h-16 rounded-2xl text-lg font-black gap-3 shadow-xl shadow-primary/20"
              onClick={() => addBundleMutation.mutate(selectedIds)}
              disabled={addBundleMutation.isPending}
            >
              {addBundleMutation.isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  <ShoppingBag size={20} />
                  Add Bundle to Cart
                </>
              )}
            </Button>
            
            <p className="mt-4 text-[10px] text-center text-slate-400 font-bold uppercase tracking-widest">
              Standard shipping applies
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
