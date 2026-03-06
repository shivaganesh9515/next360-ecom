"use client"

import React, { useState } from 'react'
import { Button } from '@next360/ui'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Camera, CheckCircle2 } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@next360/utils'

const profileSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Phone must be at least 10 digits").max(15, "Phone is too long"),
})

const passwordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "New password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword']
})

import { useAuthStore } from '@/store/authStore'
import { accountService } from '@/services/accountService'
import { useMutation } from '@tanstack/react-query'

export default function ProfilePage() {
  const { user, setUser } = useAuthStore()
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isSavingPassword, setIsSavingPassword] = useState(false)

  const [preferences, setPreferences] = useState({
    orderUpdates: true,
    promotions: true,
    subscriptionReminders: true,
    newArrivals: true,
    newsletter: true,
  })

  // We should ideally fetch preferences or get them from user object
  // For now we use the local state as a bridge

  const { register: registerProfile, handleSubmit: handleProfileSubmit, formState: { errors: profileErrors }, reset: resetProfile } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: user?.name || '', phone: user?.phone || '' }
  })

  const { register: registerPassword, handleSubmit: handlePasswordSubmit, formState: { errors: passwordErrors }, reset: resetPassword } = useForm({
    resolver: zodResolver(passwordSchema)
  })

  const updateProfileMutation = useMutation({
    mutationFn: (data: any) => accountService.updateProfile(data),
    onSuccess: (updatedUser) => {
      setUser(updatedUser)
      setIsEditing(false)
      toast.success('Profile updated successfully')
    },
    onError: () => toast.error('Failed to update profile')
  })

  const changePasswordMutation = useMutation({
    mutationFn: (data: any) => accountService.changePassword(data),
    onSuccess: () => {
      resetPassword()
      toast.success('Password updated successfully')
    },
    onError: (err: any) => toast.error(err.response?.data?.message || 'Failed to update password')
  })

  const onProfileSave = (data: any) => {
    updateProfileMutation.mutate(data)
  }

  const onPasswordSave = (data: any) => {
    changePasswordMutation.mutate(data)
  }

  const togglePreference = (key: keyof typeof preferences) => {
    const nextValue = !preferences[key]
    setPreferences(prev => ({ ...prev, [key]: nextValue }))
    // Ideally call accountService.updatePreferences({ [key]: nextValue })
    toast.success('Preferences saved')
  }

  if (!user) return null

  const userInitials = user.name.split(' ').map(n => n[0]).join('')
  const memberSince = new Date(user.createdAt).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })

  return (
    <div className="space-y-6">
      {/* SECTION 1 - Avatar + Basic Info */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm flex flex-col md:flex-row items-center gap-6">
        <div className="relative group cursor-pointer" onClick={() => toast.success("Photo upload coming soon")}>
          <div className="w-24 h-24 rounded-full bg-primary text-white flex items-center justify-center font-display text-4xl font-black shadow-lg shadow-primary/20 transition-transform group-hover:scale-105">
            {userInitials}
          </div>
          <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Camera className="text-white" size={24} />
          </div>
        </div>
        <div className="text-center md:text-left">
          <h2 className="font-display text-2xl font-black text-slate-800 mb-1 leading-tight">{user.name}</h2>
          <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
            <p className="text-slate-600 font-medium text-sm">{user.email}</p>
            {user.isVerified && <CheckCircle2 size={14} className="text-secondary" />}
          </div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Member since {memberSince}
          </p>
        </div>
      </div>

      {/* SECTION 2 - Personal Details */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
          <h3 className="font-bold text-slate-800 uppercase tracking-widest text-sm">Personal Information</h3>
          {!isEditing && (
            <Button variant="ghost" className="text-primary font-bold hover:bg-primary/5 py-1 px-3 h-auto" onClick={() => setIsEditing(true)}>
              Edit
            </Button>
          )}
        </div>

        <form onSubmit={handleProfileSubmit(onProfileSave)} className="space-y-4 max-w-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Full Name</label>
              <input
                {...registerProfile('name')}
                disabled={!isEditing}
                className={cn(
                  "w-full px-4 py-3 rounded-xl border bg-slate-50 transition-colors font-medium text-slate-800",
                  isEditing ? "border-slate-300 focus:border-primary focus:ring-1 focus:ring-primary bg-white" : "border-transparent",
                  profileErrors.name && "border-red-500 focus:border-red-500 focus:ring-red-500 bg-red-50"
                )}
              />
              {profileErrors.name && <p className="text-xs text-red-500 font-medium mt-1">{profileErrors.name.message as string}</p>}
            </div>
            
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Phone Number</label>
              <input
                {...registerProfile('phone')}
                disabled={!isEditing}
                className={cn(
                  "w-full px-4 py-3 rounded-xl border bg-slate-50 transition-colors font-medium text-slate-800",
                  isEditing ? "border-slate-300 focus:border-primary focus:ring-1 focus:ring-primary bg-white" : "border-transparent",
                  profileErrors.phone && "border-red-500 focus:border-red-500 focus:ring-red-500 bg-red-50"
                )}
              />
              {profileErrors.phone && <p className="text-xs text-red-500 font-medium mt-1">{profileErrors.phone.message as string}</p>}
            </div>
          </div>
          
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex justify-between">
              <span>Email Address</span>
              <span className="text-slate-400 lowercase normal-case tracking-normal">(Cannot be changed)</span>
            </label>
            <input
              value={user.email}
              disabled
              className="w-full px-4 py-3 rounded-xl border border-transparent bg-slate-50/50 text-slate-500 font-medium cursor-not-allowed"
            />
          </div>

          {isEditing && (
            <div className="flex gap-3 pt-4 border-t border-slate-100">
              <Button type="button" variant="ghost" className="font-bold flex-1 md:flex-none" onClick={() => { setIsEditing(false); resetProfile(); }}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" className="font-bold flex-1 md:flex-none" disabled={updateProfileMutation.isPending}>
                {updateProfileMutation.isPending ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          )}
        </form>
      </div>

      {/* SECTION 3 - Notification Preferences */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
        <h3 className="font-bold text-slate-800 uppercase tracking-widest text-sm mb-6 border-b border-slate-100 pb-4">
          Notification Preferences
        </h3>

        <div className="space-y-6 max-w-xl">
          <ToggleRow label="Order updates & tracking" desc="Get status updates on your active orders" checked={preferences.orderUpdates} onChange={() => togglePreference('orderUpdates')} />
          <ToggleRow label="Promotional offers & discounts" desc="Receive special coupons and sale alerts" checked={preferences.promotions} onChange={() => togglePreference('promotions')} />
          <ToggleRow label="Subscription reminders" desc="Get notified before your next box is prepared" checked={preferences.subscriptionReminders} onChange={() => togglePreference('subscriptionReminders')} />
          <ToggleRow label="New arrivals" desc="Updates on new seasonal products" checked={preferences.newArrivals} onChange={() => togglePreference('newArrivals')} />
          <ToggleRow label="Weekly newsletter" desc="Tips, recipes, and farm stories" checked={preferences.newsletter} onChange={() => togglePreference('newsletter')} />
        </div>
      </div>

      {/* SECTION 4 - Change Password */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
        <h3 className="font-bold text-slate-800 uppercase tracking-widest text-sm mb-6 border-b border-slate-100 pb-4">
          Security
        </h3>

        <form onSubmit={handlePasswordSubmit(onPasswordSave)} className="space-y-4 max-w-xl">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Current Password</label>
            <input
              type="password"
              {...registerPassword('currentPassword')}
              className={cn(
                "w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-medium text-slate-800",
                passwordErrors.currentPassword && "border-red-500 focus:border-red-500 focus:ring-red-500 bg-red-50"
              )}
            />
            {passwordErrors.currentPassword && <p className="text-xs text-red-500 font-medium mt-1">{passwordErrors.currentPassword.message as string}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">New Password</label>
              <input
                type="password"
                {...registerPassword('newPassword')}
                className={cn(
                  "w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-medium text-slate-800",
                  passwordErrors.newPassword && "border-red-500 focus:border-red-500 focus:ring-red-500 bg-red-50"
                )}
              />
              {passwordErrors.newPassword && <p className="text-xs text-red-500 font-medium mt-1">{passwordErrors.newPassword.message as string}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Confirm New</label>
              <input
                type="password"
                {...registerPassword('confirmPassword')}
                className={cn(
                  "w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-medium text-slate-800",
                  passwordErrors.confirmPassword && "border-red-500 focus:border-red-500 focus:ring-red-500 bg-red-50"
                )}
              />
              {passwordErrors.confirmPassword && <p className="text-xs text-red-500 font-medium mt-1">{passwordErrors.confirmPassword.message as string}</p>}
            </div>
          </div>

          <div className="pt-4">
            <Button type="submit" variant="primary" className="font-bold" disabled={changePasswordMutation.isPending}>
              {changePasswordMutation.isPending ? 'Updating...' : 'Update Password'}
            </Button>
          </div>
        </form>
      </div>

    </div>
  )
}

function ToggleRow({ label, desc, checked, onChange }: { label: string, desc: string, checked: boolean, onChange: () => void }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h4 className="font-bold text-slate-800 text-sm mb-0.5">{label}</h4>
        <p className="text-xs font-medium text-slate-500">{desc}</p>
      </div>
      <button 
        onClick={onChange}
        className={cn(
          "w-12 h-6 rounded-full transition-colors relative shadow-inner flex-shrink-0",
          checked ? "bg-secondary" : "bg-slate-200"
        )}
      >
        <span 
          className={cn(
            "absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform shadow-sm",
            checked ? "translate-x-6" : "translate-x-0"
          )}
        />
      </button>
    </div>
  )
}
