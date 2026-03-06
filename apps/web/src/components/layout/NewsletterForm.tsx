"use client"

import React, { useState } from 'react'
import { Button, Input } from '@next360/ui'
import { motion, AnimatePresence } from 'framer-motion'
import { Send } from 'lucide-react'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setIsSubmitted(true)
      setEmail('')
      // API call will be implemented in Phase 8
    }
  }

  return (
    <div className="max-w-md">
      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.form 
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="space-y-3"
          >
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:bg-white/20"
              />
              <Button type="submit" variant="secondary" className="whitespace-nowrap flex gap-2">
                Subscribe <Send size={16} />
              </Button>
            </div>
            <p className="text-xs text-white/50">No spam. Unsubscribe anytime.</p>
          </motion.form>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/10 border border-white/20 rounded-2xl p-4 text-center"
          >
            <p className="text-white font-medium">Thanks! Check your inbox 🌿</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
