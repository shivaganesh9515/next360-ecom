'use client'

import { useQuery } from '@tanstack/react-query'
import { adminService } from '../../../services/adminService'
import { Button } from '@next360/ui/Button'
import { Plus, GripVertical, Image as ImageIcon } from 'lucide-react'
import { useState } from 'react'

export default function BannersPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['admin-banners'],
    queryFn: () => adminService.getBanners()
  })

  // Simulated local state for basic drag interaction logic
  const banners = data?.banners || []

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-display font-semibold text-text">Banners</h2>
          <p className="text-muted text-sm mt-1">Manage homepage promotions.</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" /> New Banner
        </Button>
      </div>

      {isLoading ? (
        <div className="p-12 flex justify-center">
          <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden p-6 space-y-4">
          {banners.length === 0 ? (
            <div className="text-center py-12 text-muted">
               No banners created yet.
            </div>
          ) : (
            banners.map((banner: any, index: number) => (
              <div key={banner.id} className="flex items-center gap-4 p-4 border border-border rounded-xl bg-black/5 hover:bg-border/40 transition-colors group">
                <button className="p-2 cursor-grab text-muted hover:text-muted">
                  <GripVertical className="w-5 h-5" />
                </button>
                <div className="w-24 h-12 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center">
                  {banner.imageUrl ? (
                     <img src={banner.imageUrl} alt={banner.title} className="w-full h-full object-cover" />
                  ) : (
                     <ImageIcon className="w-5 h-5 text-muted" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-text">{banner.title}</p>
                  <p className="text-xs text-muted">{banner.linkUrl}</p>
                </div>
                <div className="px-3 py-1 bg-white border border-border rounded text-xs font-semibold">
                  Order: {index + 1}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}
