"use client"

import React, { useState } from 'react'
import { Button, Badge } from '@next360/ui'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Camera, CheckCircle2, ChevronRight } from 'lucide-react'
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
    <div className="space-y-12">
      {/* SECTION 1 - Avatar + Basic Info */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 md:p-12 shadow-2xl shadow-slate-200/40 flex flex-col md:flex-row items-center gap-10 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-primary/10 transition-colors" />
        
        <div className="relative group/avatar cursor-pointer" onClick={() => toast.success("Identity visual capture coming soon")}>
          <div className="w-32 h-32 rounded-full bg-slate-900 text-white flex items-center justify-center font-black text-5xl shadow-2xl transition-transform duration-700 group-hover/avatar:scale-110 group-hover/avatar:rotate-3 italic">
            {userInitials}
          </div>
          <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-all duration-500 scale-90 group-hover/avatar:scale-100">
            <Camera className="text-white" size={32} strokeWidth={2.5} />
          </div>
        </div>
        
        <div className="text-center md:text-left relative z-10">
          <div className="flex items-center justify-center md:justify-start gap-4 mb-3">
            <h2 className="text-4xl font-black text-slate-900 tracking-tighter italic leading-none">{user.name}</h2>
            {user.isVerified && (
              <Badge className="bg-primary/10 text-primary border-none font-black text-[8px] uppercase tracking-[0.3em] px-4 py-1 rounded-full shadow-lg">
                Verified Node
              </Badge>
            )}
          </div>
          <p className="text-slate-400 font-bold text-sm tracking-tight mb-6">{user.email}</p>
          <div className="flex items-center justify-center md:justify-start gap-3">
             <div className="px-5 py-2 bg-slate-50 border border-slate-100 rounded-full text-[10px] font-black text-slate-400 uppercase tracking-widest italic group-hover:bg-slate-100 transition-colors">
               Member since <span className="text-slate-900 ml-1">{memberSince}</span>
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* SECTION 2 - Personal Details */}
        <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 md:p-12 shadow-2xl shadow-slate-200/30">
          <div className="flex justify-between items-end mb-12">
            <div>
               <div className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-4 flex items-center gap-3 italic">
                  <span className="w-8 h-[2.5px] bg-primary" /> Info Vector
               </div>
               <h3 className="text-2xl font-black text-slate-900 tracking-tight italic leading-none">Personal Logic</h3>
            </div>
            {!isEditing && (
              <Button variant="ghost" className="rounded-full h-12 px-6 text-[10px] font-black uppercase tracking-[0.2em] text-primary hover:bg-primary/5 border border-slate-50" onClick={() => setIsEditing(true)}>
                Modify
              </Button>
            )}
          </div>

          <form onSubmit={handleProfileSubmit(onProfileSave)} className="space-y-8">
            <div className="grid grid-cols-1 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Designation Name</label>
                <input
                  {...registerProfile('name')}
                  disabled={!isEditing}
                  placeholder="Identity String"
                  className={cn(
                    "w-full px-8 py-5 rounded-2xl border transition-all duration-500 font-black text-slate-900 text-sm tracking-tight h-16 outline-none",
                    isEditing ? "border-slate-200 bg-white ring-4 ring-primary/5 focus:border-primary shadow-xl" : "border-transparent bg-slate-50",
                    profileErrors.name && "border-red-500 ring-red-500/10 bg-red-50"
                  )}
                />
                {profileErrors.name && <p className="text-[10px] font-bold text-red-500 italic mt-2">{profileErrors.name.message as string}</p>}
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Comms Relay</label>
                <input
                  {...registerProfile('phone')}
                  disabled={!isEditing}
                  placeholder="Sequence Link"
                  className={cn(
                    "w-full px-8 py-5 rounded-2xl border transition-all duration-500 font-black text-slate-900 text-sm tracking-tight h-16 outline-none",
                    isEditing ? "border-slate-200 bg-white ring-4 ring-primary/5 focus:border-primary shadow-xl" : "border-transparent bg-slate-50",
                    profileErrors.phone && "border-red-500 ring-red-500/10 bg-red-50"
                  )}
                />
                {profileErrors.phone && <p className="text-[10px] font-bold text-red-500 italic mt-2">{profileErrors.phone.message as string}</p>}
              </div>
            </div>
            
            <div className="space-y-2 pb-4">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex justify-between">
                <span>Relay Email</span>
                <span className="text-[9px] lowercase italic opacity-40">Locked to identity</span>
              </label>
              <input
                value={user.email}
                disabled
                className="w-full px-8 py-5 rounded-2xl border border-transparent bg-slate-50/50 text-slate-300 font-bold text-sm tracking-tight h-16 cursor-not-allowed italic"
              />
            </div>

            {isEditing && (
              <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-slate-50">
                <Button type="button" variant="ghost" className="rounded-full h-14 px-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400" onClick={() => { setIsEditing(false); resetProfile(); }}>
                  Abort
                </Button>
                <Button type="submit" className="flex-1 rounded-full h-14 px-10 text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-primary/20" disabled={updateProfileMutation.isPending}>
                  {updateProfileMutation.isPending ? 'Executing...' : 'Update Node'}
                </Button>
              </div>
            )}
          </form>
        </div>

        {/* SECTION 4 - Change Password */}
        <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 md:p-12 shadow-2xl shadow-slate-200/30">
          <div className="mb-12">
             <div className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.4em] mb-4 flex items-center gap-3 italic">
                <span className="w-8 h-[2.5px] bg-indigo-500" /> Security Core
             </div>
             <h3 className="text-2xl font-black text-slate-900 tracking-tight italic leading-none">Encryption Access</h3>
          </div>

          <form onSubmit={handlePasswordSubmit(onPasswordSave)} className="space-y-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Current Sequence</label>
              <input
                type="password"
                {...registerPassword('currentPassword')}
                className={cn(
                  "w-full px-8 py-5 rounded-2xl border border-slate-100 bg-slate-50 font-black text-slate-900 text-sm tracking-tight h-16 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all",
                  passwordErrors.currentPassword && "border-red-500 bg-red-50"
                )}
              />
              {passwordErrors.currentPassword && <p className="text-[10px] font-bold text-red-500 italic mt-2">{passwordErrors.currentPassword.message as string}</p>}
            </div>

            <div className="grid grid-cols-1 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">New Encryption</label>
                <input
                  type="password"
                  {...registerPassword('newPassword')}
                  className={cn(
                    "w-full px-8 py-5 rounded-2xl border border-slate-100 bg-slate-50 font-black text-slate-900 text-sm tracking-tight h-16 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all",
                    passwordErrors.newPassword && "border-red-500 bg-red-50"
                  )}
                />
                {passwordErrors.newPassword && <p className="text-[10px] font-bold text-red-500 italic mt-2">{passwordErrors.newPassword.message as string}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Confirm Logic</label>
                <input
                  type="password"
                  {...registerPassword('confirmPassword')}
                  className={cn(
                    "w-full px-8 py-5 rounded-2xl border border-slate-100 bg-slate-50 font-black text-slate-900 text-sm tracking-tight h-16 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all",
                    passwordErrors.confirmPassword && "border-red-500 bg-red-50"
                  )}
                />
                {passwordErrors.confirmPassword && <p className="text-[10px] font-bold text-red-500 italic mt-2">{passwordErrors.confirmPassword.message as string}</p>}
              </div>
            </div>

            <div className="pt-8 border-t border-slate-50">
              <Button type="submit" className="w-full bg-slate-900 hover:bg-black rounded-full h-16 text-[11px] font-black uppercase tracking-[0.3em] shadow-2xl transition-all" disabled={changePasswordMutation.isPending}>
                {changePasswordMutation.isPending ? 'Syncing...' : 'Rotate Sequence'}
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* SECTION 3 - Notification Preferences */}
      <div className="bg-slate-900 text-white rounded-[3rem] border border-slate-800 p-8 md:p-16 shadow-2xl relative overflow-hidden group">
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mb-32 -mr-32 group-hover:bg-primary/20 transition-colors duration-1000" />
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 mb-16 relative z-10">
          <div>
             <div className="text-[11px] font-black text-primary uppercase tracking-[0.5em] mb-4 flex items-center gap-4 italic">
                <span className="w-12 h-[3px] bg-primary" /> Subscription Alerts
             </div>
             <h3 className="text-4xl font-black text-white tracking-tighter italic leading-none">Transmission Preferences</h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-12 relative z-10">
          <ToggleRow label="Deployment Log Sync" desc="Real-time status updates on fleet nodes" checked={preferences.orderUpdates} onChange={() => togglePreference('orderUpdates')} />
          <ToggleRow label="Marketing Transmissions" desc="Priority access to discount protocols" checked={preferences.promotions} onChange={() => togglePreference('promotions')} />
          <ToggleRow label="Node Maintenance" desc="Advance notice before deployment cycles" checked={preferences.subscriptionReminders} onChange={() => togglePreference('subscriptionReminders')} />
          <ToggleRow label="Inventory Arrival" desc="Alerts on seasonal resource availability" checked={preferences.newArrivals} onChange={() => togglePreference('newArrivals')} />
          <ToggleRow label="Newsletter Node" desc="Deep-node insights and farm narratives" checked={preferences.newsletter} onChange={() => togglePreference('newsletter')} />
        </div>
      </div>

    </div>
  )
}

function ToggleRow({ label, desc, checked, onChange }: { label: string, desc: string, checked: boolean, onChange: () => void }) {
  return (
    <div className="flex items-center justify-between group/row">
      <div className="max-w-xs">
        <h4 className="font-black text-white text-base mb-1 italic tracking-tight group-hover/row:text-primary transition-colors">{label}</h4>
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{desc}</p>
      </div>
      <button 
        onClick={onChange}
        className={cn(
          "w-16 h-8 rounded-full transition-all duration-500 relative shadow-inner flex-shrink-0 border",
          checked ? "bg-primary/20 border-primary/40 shadow-primary/10" : "bg-slate-800 border-slate-700 shadow-black/20"
        )}
      >
        <span 
          className={cn(
            "absolute top-1 left-1 w-5 h-5 rounded-full transition-all duration-500 shadow-xl",
            checked ? "translate-x-8 bg-primary scale-110" : "translate-x-0 bg-slate-600"
          )}
        />
      </button>
    </div>
  )
}
