'use client'

import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { adminService } from '../../../services/adminService'
import { Button } from '@next360/ui/Button'
import { Input } from '@next360/ui/Input'
import { toast } from 'sonner'
import { BellRing, Send } from 'lucide-react'

export default function NotificationsPage() {
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')

  const mutation = useMutation({
    mutationFn: () => adminService.broadcastNotification({ title, message }),
    onSuccess: () => {
      toast.success('Notification broadcasted globally')
      setTitle('')
      setMessage('')
    },
    onError: (err: any) => toast.error(err.message || 'Failed to send notification')
  })

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <div className="mb-8">
        <h2 className="text-2xl font-display font-semibold text-text">Push Notifications</h2>
        <p className="text-muted text-sm mt-1">Broadcast important announcements to all users and vendors.</p>
      </div>

      <div className="max-w-2xl bg-white rounded-2xl shadow-sm border border-border p-8">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
          <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
            <BellRing className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text">Broadcast Alert</h3>
            <p className="text-xs text-muted">Will be sent immediately to all connected clients.</p>
          </div>
        </div>

        <form 
          onSubmit={(e) => {
            e.preventDefault()
            mutation.mutate()
          }} 
          className="space-y-6"
        >
          <div>
            <label className="block text-sm font-medium text-text mb-1">Title</label>
            <Input 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. System Maintenance"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text mb-1">Message</label>
            <textarea 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="w-full h-32 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none"
              placeholder="Enter the notification content..."
            />
          </div>

          <div className="pt-4 border-t border-border">
            <Button 
              type="submit" 
              className="w-full flex items-center justify-center gap-2"
              size="lg"
              isLoading={mutation.isPending}
            >
              <Send className="w-4 h-4" /> Send Global Notification
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
