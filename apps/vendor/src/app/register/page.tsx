'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Store, Loader2, ArrowRight, CheckCircle2, Leaf, ShieldCheck, Mail, Lock, User, Briefcase, FileText } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { authService } from '../../services/authService'
import { Button } from '@next360/ui/Button'
import { GlassCard } from '@next360/ui/GlassCard'
import Link from 'next/link'
import { toast } from 'sonner'
import { getErrorMessage } from '../../services/api'

const registerSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  storeName: z.string().min(2, 'Store name is required'),
  gstNumber: z.string().optional(),
  fssaiNumber: z.string().optional(),
})

type RegisterFormValues = z.infer<typeof registerSchema>

export default function RegisterPage() {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema) as any,
  })

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      setError('')
      await authService.register(data)
      setSuccess(true)
      toast.success('Application Received')
    } catch (err: any) {
      setError(getErrorMessage(err))
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-[#FDFCF9] flex items-center justify-center p-6 font-sans">
        <motion.div 
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           className="w-full max-w-xl text-center"
        >
          <div className="h-24 w-24 bg-primary/10 rounded-full flex items-center justify-center mb-8 mx-auto border border-primary/20">
            <CheckCircle2 className="h-12 w-12 text-primary" />
          </div>
          <h2 className="text-4xl font-display font-black text-text mb-4">Application Submitted!</h2>
          <p className="text-gray-500 text-lg mb-10 leading-relaxed italic">
            Thank you for joining our movement. Our curators will review your profile and reach out within 48 hours to finalize your onboarding.
          </p>
          <Link href="/login">
            <Button variant="outline" className="h-14 px-10 rounded-2xl border-primary/20 hover:bg-primary/5 text-primary font-bold">
              Return to Login Portal
            </Button>
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FDFCF9] flex flex-col items-center justify-center p-6 md:p-12 relative overflow-hidden font-sans">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary/10 blur-[120px] rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl relative z-10"
      >
        <div className="text-center mb-12">
          <Link href="/" className="inline-flex items-center gap-2 mb-6 group">
            <Leaf className="text-primary h-8 w-8 group-hover:rotate-12 transition-transform" />
            <span className="font-display text-2xl font-black text-primary">Partner with Next360</span>
          </Link>
          <h1 className="text-5xl font-display font-black text-text mb-4">Cultivate Your Success</h1>
          <p className="text-gray-500 font-medium max-w-lg mx-auto">Join India's most conscious marketplace. Bridge the gap between your farm and the urban table.</p>
        </div>

        <GlassCard className="p-1 border-primary/5 bg-white/40 shadow-2xl overflow-hidden backdrop-blur-3xl">
          <div className="flex flex-col lg:flex-row">
             {/* Info Side */}
             <div className="lg:w-1/3 bg-primary p-10 text-white flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-[-20%] left-[-20%] w-[100%] h-[100%] bg-white/5 blur-[80px] rounded-full" />
                
                <div className="relative z-10 space-y-8">
                   <h3 className="text-2xl font-display font-bold">Why Partner?</h3>
                   <div className="space-y-6">
                      {[
                        { title: "Direct Reach", desc: "Access 50,000+ active organic consumers." },
                        { title: "Fair Pricing", desc: "Keep more of what you earn with low commissions." },
                        { title: "Smart Logistics", desc: "Optimized delivery networks for fresh harvests." }
                      ].map((p, i) => (
                        <div key={i} className="flex gap-4">
                           <div className="shrink-0 h-6 w-6 rounded-full bg-white/10 flex items-center justify-center mt-1 border border-white/20">
                              <CheckCircle2 size={12} className="text-accent" />
                           </div>
                           <div>
                              <p className="font-bold text-sm">{p.title}</p>
                              <p className="text-xs text-white/60 leading-relaxed">{p.desc}</p>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>

                <div className="mt-20 relative z-10 pt-10 border-t border-white/10">
                   <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/40 mb-2">Verified Partner</p>
                   <div className="flex items-center gap-3">
                      <ShieldCheck className="text-accent h-5 w-5" />
                      <span className="text-xs font-medium">BUREAU VERITAS CERTIFIED</span>
                   </div>
                </div>
             </div>

             {/* Form Side */}
             <div className="lg:w-2/3 p-10 md:p-12 bg-white/80">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                      {/* Personal Info */}
                      <div className="col-span-full mb-2">
                         <h4 className="text-[10px] uppercase tracking-[0.2em] font-black text-gray-400">Account Identity</h4>
                      </div>

                      <div className="space-y-2">
                        <div className="relative">
                          <User className="absolute left-4 top-4 h-4 w-4 text-primary/40" />
                          <input
                            {...register('name')}
                            placeholder="Your Full Name"
                            className="w-full bg-cream/30 border border-gray-100 rounded-xl py-4 pl-12 pr-4 text-text placeholder:text-gray-400 focus:outline-none focus:border-primary/30 transition-all text-sm font-medium"
                          />
                        </div>
                        {errors.name && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.name.message}</p>}
                      </div>

                      <div className="space-y-2">
                        <div className="relative">
                          <Mail className="absolute left-4 top-4 h-4 w-4 text-primary/40" />
                          <input
                            {...register('email')}
                            type="email"
                            placeholder="Work Email"
                            className="w-full bg-cream/30 border border-gray-100 rounded-xl py-4 pl-12 pr-4 text-text placeholder:text-gray-400 focus:outline-none focus:border-primary/30 transition-all text-sm font-medium"
                          />
                        </div>
                        {errors.email && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.email.message}</p>}
                      </div>

                      <div className="space-y-2 col-span-full">
                        <div className="relative">
                          <Lock className="absolute left-4 top-4 h-4 w-4 text-primary/40" />
                          <input
                            {...register('password')}
                            type="password"
                            placeholder="Secure Password"
                            className="w-full bg-cream/30 border border-gray-100 rounded-xl py-4 pl-12 pr-4 text-text placeholder:text-gray-400 focus:outline-none focus:border-primary/30 transition-all text-sm font-medium"
                          />
                        </div>
                        {errors.password && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.password.message}</p>}
                      </div>

                      {/* Business Info */}
                      <div className="col-span-full mb-2 mt-4">
                         <h4 className="text-[10px] uppercase tracking-[0.2em] font-black text-gray-400">Business Details</h4>
                      </div>

                      <div className="space-y-2 col-span-full">
                        <div className="relative">
                          <Briefcase className="absolute left-4 top-4 h-4 w-4 text-primary/40" />
                          <input
                            {...register('storeName')}
                            placeholder="Enterprise / Farm Name"
                            className="w-full bg-cream/30 border border-gray-100 rounded-xl py-4 pl-12 pr-4 text-text placeholder:text-gray-400 focus:outline-none focus:border-primary/30 transition-all text-sm font-medium"
                          />
                        </div>
                        {errors.storeName && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.storeName.message}</p>}
                      </div>

                      <div className="space-y-2">
                        <div className="relative">
                          <FileText className="absolute left-4 top-4 h-4 w-4 text-primary/40" />
                          <input
                            {...register('gstNumber')}
                            placeholder="GSTIN (Optional)"
                            className="w-full bg-cream/30 border border-gray-100 rounded-xl py-4 pl-12 pr-4 text-text placeholder:text-gray-400 focus:outline-none focus:border-primary/30 transition-all text-sm font-medium"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="relative">
                          <ShieldCheck className="absolute left-4 top-4 h-4 w-4 text-primary/40" />
                          <input
                            {...register('fssaiNumber')}
                            placeholder="FSSAI Code (Optional)"
                            className="w-full bg-cream/30 border border-gray-100 rounded-xl py-4 pl-12 pr-4 text-text placeholder:text-gray-400 focus:outline-none focus:border-primary/30 transition-all text-sm font-medium"
                          />
                        </div>
                      </div>
                   </div>

                   <AnimatePresence>
                    {error && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-red-50 border border-red-100 rounded-xl p-4"
                      >
                        <p className="text-red-600 text-xs font-bold">{error}</p>
                      </motion.div>
                    )}
                   </AnimatePresence>

                   <Button 
                      type="submit" 
                      className="w-full h-16 rounded-2xl bg-primary text-white font-bold text-xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all group" 
                      isLoading={isSubmitting}
                   >
                     Submit Application
                     <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                   </Button>

                   <div className="text-center pt-2">
                      <p className="text-xs text-gray-400 font-medium">Already have a partnership? <Link href="/login" className="text-primary font-bold hover:underline decoration-2">Sign in here</Link></p>
                   </div>
                </form>
             </div>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  )
}
