"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, CheckCircle2 } from 'lucide-react'
import { Button, Input, Badge } from '@next360/ui'

export default function NewsletterBanner() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    
    setIsLoading(true)
    // Simulate API Call
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
      setEmail('')
    }, 1500)
  }

  return (
    <section className="py-24 bg-accent/10 relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-accent/20 rounded-full blur-3xl opacity-50" />
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-primary/20 rounded-full blur-3xl opacity-50" />

      <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex flex-col items-center"
        >
          <Badge variant="sale" className="bg-accent text-white font-bold mb-6 px-4 py-1.5 rounded-full shadow-lg shadow-accent/20">
            🎁 LIMITED TIME OFFER
          </Badge>
          
          <h2 className="font-display text-4xl md:text-5xl text-primary font-bold mb-4 leading-tight">
            Get 10% Off Your First Order
          </h2>
          
          <p className="text-slate-600 text-lg mb-10 max-w-lg mx-auto font-body">
            Join 50,000+ conscious families getting fresh organic produce delivered every single week.
          </p>

          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onSubmit={handleSubmit}
                className="w-full max-w-lg flex flex-col sm:flex-row gap-3"
              >
                <div className="flex-1">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-14 rounded-2xl bg-white border-2 border-primary/10 transition-all focus:border-primary focus:ring-4 focus:ring-primary/5 text-lg"
                  />
                </div>
                <Button 
                  type="submit" 
                  size="lg" 
                  disabled={isLoading}
                  className="h-14 px-10 rounded-2xl font-bold text-lg min-w-[160px] shadow-xl shadow-primary/20"
                >
                  {isLoading ? (
                    <motion.div 
                      animate={{ rotate: 360 }} 
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    >
                      🌱
                    </motion.div>
                  ) : (
                    <span className="flex items-center gap-2">Subscribe <Send size={18} /></span>
                  )}
                </Button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-primary/10 flex flex-col items-center gap-4 w-full max-w-lg"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  <CheckCircle2 size={32} />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-primary mb-1">You're in the inner circle!</h3>
                  <p className="text-slate-500 font-medium">Check your inbox for your 10% discount code 🌿</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!isSubmitted && (
            <p className="mt-4 text-xs text-slate-400 font-bold uppercase tracking-[0.15em]">
              🔒 NO SPAM. UNSUBSCRIBE ANYTIME.
            </p>
          )}
        </motion.div>
      </div>
    </section>
  )
}
