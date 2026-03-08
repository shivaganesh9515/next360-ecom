'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { adminService } from '../../services/adminService'
import { Button } from '@next360/ui/Button'
import { Input } from '@next360/ui/Input'
import { toast } from 'sonner'
import { useState, useEffect } from 'react'

export default function SettingsPage() {
  const queryClient = useQueryClient()
  
  const { data, isLoading } = useQuery({
    queryKey: ['admin-settings'],
    queryFn: () => adminService.getSettings()
  })

  const [formData, setFormData] = useState({
    storeName: '',
    contactEmail: '',
    supportPhone: '',
    deliveryFee: '0',
    freeDeliveryThreshold: '0',
    taxPercentage: '0',
    maintenanceMode: false
  })

  useEffect(() => {
    if (data?.settings) {
      setFormData({
        storeName: data.settings.storeName || '',
        contactEmail: data.settings.contactEmail || '',
        supportPhone: data.settings.supportPhone || '',
        deliveryFee: data.settings.deliveryFee?.toString() || '0',
        freeDeliveryThreshold: data.settings.freeDeliveryThreshold?.toString() || '0',
        taxPercentage: data.settings.taxPercentage?.toString() || '0',
        maintenanceMode: data.settings.maintenanceMode || false
      })
    }
  }, [data])

  const mutation = useMutation({
    mutationFn: (newSettings: any) => adminService.updateSettings(newSettings),
    onSuccess: () => {
      toast.success('Settings updated successfully')
      queryClient.invalidateQueries({ queryKey: ['admin-settings'] })
    },
    onError: (err: any) => {
      toast.error(err.message || 'Failed to update settings')
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutation.mutate({
      ...formData,
      deliveryFee: parseFloat(formData.deliveryFee),
      freeDeliveryThreshold: parseFloat(formData.freeDeliveryThreshold),
      taxPercentage: parseFloat(formData.taxPercentage),
    })
  }

  if (isLoading) {
    return <div className="p-12 flex justify-center"><div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin" /></div>
  }

  return (
    <div className="animate-in fade-in duration-500 pb-20 max-w-4xl">
      <div className="mb-8">
        <h2 className="text-2xl font-display font-semibold text-text">Platform Settings</h2>
        <p className="text-muted text-sm mt-1">Configure global store preferences and fees.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white rounded-2xl shadow-sm border border-border p-6 space-y-6">
          <h3 className="text-lg font-semibold text-text pb-4 border-b border-border">General Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-text mb-1">Store Name</label>
              <Input 
                value={formData.storeName} 
                onChange={(e) => setFormData({...formData, storeName: e.target.value})} 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1">Contact Email</label>
              <Input 
                type="email"
                value={formData.contactEmail} 
                onChange={(e) => setFormData({...formData, contactEmail: e.target.value})} 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1">Support Phone</label>
              <Input 
                value={formData.supportPhone} 
                onChange={(e) => setFormData({...formData, supportPhone: e.target.value})} 
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-border p-6 space-y-6">
          <h3 className="text-lg font-semibold text-text pb-4 border-b border-border">Commerce Logistics</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-text mb-1">Standard Delivery Fee (₹)</label>
              <Input 
                type="number"
                value={formData.deliveryFee} 
                onChange={(e) => setFormData({...formData, deliveryFee: e.target.value})} 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1">Free Delivery Threshold (₹)</label>
              <Input 
                type="number"
                value={formData.freeDeliveryThreshold} 
                onChange={(e) => setFormData({...formData, freeDeliveryThreshold: e.target.value})} 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1">Tax Percentage (%)</label>
              <Input 
                type="number"
                value={formData.taxPercentage} 
                onChange={(e) => setFormData({...formData, taxPercentage: e.target.value})} 
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-border p-6 space-y-6">
          <h3 className="text-lg font-semibold text-text pb-4 border-b border-border">System</h3>
          
          <label className="flex items-center justify-between cursor-pointer p-4 border border-border rounded-xl hover:bg-black/5 transition-colors">
            <div>
              <span className="block font-medium text-text">Maintenance Mode</span>
              <span className="block text-sm text-muted mt-0.5">Disable customer access and show a coming soon page.</span>
            </div>
            <div className={`w-12 h-6 rounded-full p-1 transition-colors ${formData.maintenanceMode ? 'bg-red-500' : 'bg-gray-200'}`}>
              <div className={`w-4 h-4 rounded-full bg-white transition-transform ${formData.maintenanceMode ? 'translate-x-6' : 'translate-x-0'}`} />
            </div>
            {/* Hidden actual checkbox to keep form pure */}
            <input 
              type="checkbox" 
              className="hidden" 
              checked={formData.maintenanceMode} 
              onChange={(e) => setFormData({...formData, maintenanceMode: e.target.checked})} 
            />
          </label>
        </div>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline">Discard Changes</Button>
          <Button type="submit" isLoading={mutation.isPending}>Save Settings</Button>
        </div>
      </form>
    </div>
  )
}
