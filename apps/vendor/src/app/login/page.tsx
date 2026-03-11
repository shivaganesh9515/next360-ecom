'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Store, Loader2, ArrowRight, ShieldCheck, Mail, Lock, Eye, EyeOff, TreeDeciduous } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import { Button } from '@next360/ui/Button'
import { authService } from '../../services/authService'
import { useVendorAuthStore } from '../../store/vendorAuthStore'
import { getErrorMessage } from '../../services/api'
import Link from 'next/link'
import { GlassCard } from '@next360/ui/GlassCard'
import { handleAuthRedirect } from '../../utils/auth-redirect'

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const { login } = useVendorAuthStore()

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const response = await authService.login(data.email, data.password)
      
      if (response.user.role !== 'VENDOR') {
        toast.error('Unauthorized: Accessible to vendors only.')
        handleAuthRedirect(response.user.role, router.push)
        return
      }

      login(response.user, response.token)
      toast.success('Marketplace access decrypted')
      router.push('/dashboard')
    } catch (err: any) {
       setError('root', { message: getErrorMessage(err) })
    }
  }

  const fillDemo = () => {
    setValue('email', 'vendor@next360.com')
    setValue('password', 'Vendor@123')
  }

  return (
    <div className="min-h-screen bg-[#F8FAF7] flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Marketplace Bloom Decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-secondary/15 blur-[120px] rounded-full" />
        {/* Abstract Leaf shapes */}
        <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/4 -right-20 text-primary/5 hidden xl:block"
        >
            <TreeDeciduous size={400} strokeWidth={0.5} />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-xl relative z-10"
      >
        <div className="text-center mb-12">
          <Link href="/" className="inline-flex items-center gap-3 mb-8 group">
            <div className="h-14 w-14 bg-white shadow-xl rounded-[1.5rem] flex items-center justify-center group-hover:scale-110 transition-all border border-primary/10">
              <span className="text-3xl">🌿</span>
            </div>
            <div className="text-left">
                <span className="block font-display text-4xl font-black text-slate-900 tracking-tighter leading-none">Next360</span>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Partner Ecosystem</span>
            </div>
          </Link>
          
          <h1 className="text-5xl font-display font-black text-slate-900 mb-3 tracking-tighter">Vendor Portal</h1>
          <p className="text-slate-500 font-bold text-lg italic max-w-md mx-auto">Digitizing the harvest. Connecting the roots to the modern world.</p>
        </div>

        <GlassCard className="p-10 md:p-14 bg-white/70 shadow-2xl backdrop-blur-3xl rounded-[3.5rem] border-white/40">
          <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-3">
              <label className="text-[11px] uppercase tracking-[0.3em] font-black text-slate-400 ml-2">Business Identity</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-primary/40 group-focus-within:text-primary transition-colors" />
                </div>
                <input
                  {...register('email')}
                  type="email"
                  placeholder="name@farm-digital.com"
                  className="w-full bg-white border border-slate-100 rounded-2xl py-5 pl-14 pr-6 text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-primary/50 focus:shadow-[0_0_30px_rgba(45,80,22,0.1)] transition-all font-bold tracking-tight shadow-sm"
                />
              </div>
              {errors.email && <p className="text-[10px] text-red-500 font-black uppercase tracking-widest mt-2 ml-2">{errors.email.message}</p>}
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center ml-2">
                <label className="text-[11px] uppercase tracking-[0.3em] font-black text-slate-400">Access Key</label>
                <Link href="#" className="text-[10px] uppercase tracking-[0.2em] font-black text-primary hover:text-secondary transition-colors">Forgot Cipher?</Link>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-primary/40 group-focus-within:text-primary transition-colors" />
                </div>
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="w-full bg-white border border-slate-100 rounded-2xl py-5 pl-14 pr-14 text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-primary/50 focus:shadow-[0_0_30px_rgba(45,80,22,0.1)] transition-all font-bold tracking-tight shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-6 flex items-center text-slate-300 hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && <p className="text-[10px] text-red-500 font-black uppercase tracking-widest mt-2 ml-2">{errors.password.message}</p>}
            </div>

            <AnimatePresence>
              {errors.root && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border border-red-100 rounded-2xl p-5"
                >
                  <p className="text-red-600 text-xs font-black uppercase tracking-wide flex items-center gap-2">
                    <ShieldCheck size={14} /> {errors.root.message}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <Button 
                type="submit" 
                className="w-full h-16 rounded-[1.25rem] bg-primary text-white font-black text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group" 
                isLoading={isSubmitting}
            >
              Access Dashboard <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </Button>
          </form>

          <div className="mt-12 pt-10 border-t border-slate-100/50">
             <div className="flex flex-col items-center gap-8">
                <button 
                  onClick={fillDemo}
                  className="text-[10px] font-black text-slate-400 hover:text-primary uppercase tracking-[0.3em] transition-all flex items-center gap-3 group p-2 hover:bg-primary/5 rounded-full"
                >
                  <div className="relative">
                     <div className="w-1.5 h-1.5 bg-secondary rounded-full absolute inset-0 animate-ping opacity-50" />
                     <div className="w-1.5 h-1.5 bg-secondary rounded-full relative" />
                  </div>
                  Quick Access for Beta Partners
                </button>

                <div className="flex items-center gap-3">
                   <span className="text-[11px] text-slate-500 font-black uppercase tracking-widest">New partner?</span>
                   <Link href="/register" className="text-[11px] font-black text-primary hover:text-secondary uppercase tracking-[0.2em] underline underline-offset-8 decoration-2 decoration-primary/20 transition-all">
                      Join the Network
                   </Link>
                </div>
             </div>
          </div>
        </GlassCard>

        <div className="mt-16 text-center opacity-30">
           <p className="text-[9px] font-black uppercase tracking-[0.5em] text-slate-600">Unified Supply Chain • Secured by Next360</p>
        </div>
      </motion.div>
    </div>
  )
}
