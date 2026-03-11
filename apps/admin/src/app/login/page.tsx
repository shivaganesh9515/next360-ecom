'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, Eye, EyeOff, Loader2 } from 'lucide-react'
import { cn } from '../../lib/utils'
import { authService } from '../../services/authService'
import { useAdminAuthStore } from '../../store/adminAuthStore'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { handleAuthRedirect } from '../../utils/auth-redirect'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { login } = useAdminAuthStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { user, token } = await authService.login(email, password)
      
      if (user.role !== 'ADMIN') {
        toast.error('Unauthorized. This portal is for administrators only.')
        // Even if unauthorized for admin, redirect them where they belong
        handleAuthRedirect(user.role, router.push)
        return
      }

      login(user, token)
      toast.success('Welcome back, Commander! 🛡️')
      router.push('/dashboard')
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Authentication failed. Please check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Background Glows */}
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-secondary/6 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] left-1/4 w-[400px] h-[400px] bg-primary/4 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md"
      >
        {/* Logo Badge */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 rounded-[1.5rem] bg-secondary flex items-center justify-center shadow-2xl shadow-secondary/30 mb-5">
            <ShieldCheck className="w-8 h-8 text-white" strokeWidth={2.5} />
          </div>
          <h1 className="text-4xl font-display font-black text-white tracking-tighter">Next360 Admin</h1>
          <p className="text-sm text-white/30 font-medium mt-2">Governance Command Center</p>
        </div>

        {/* Card */}
        <div className="bg-[#111] border border-white/5 rounded-[2rem] p-10 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
                Admin Email
              </label>
              <input
                type="email"
                autoComplete="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@next360.in"
                required
                className="w-full bg-white/5 border border-white/5 rounded-2xl h-14 px-5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-secondary/25 focus:border-secondary/30 transition-all font-medium placeholder:text-white/15"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
                Password
              </label>
              <div className="relative group">
                <input
                  type={showPw ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••••"
                  required
                  className="w-full bg-white/5 border border-white/5 rounded-2xl h-14 px-5 pr-14 text-sm text-white focus:outline-none focus:ring-2 focus:ring-secondary/25 focus:border-secondary/30 transition-all font-medium placeholder:text-white/15"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors"
                >
                  {showPw ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <button type="button" className="text-[10px] font-black uppercase tracking-widest text-secondary hover:underline">
                Reset Password
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={cn(
                "w-full py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3",
                loading
                  ? "bg-secondary/50 cursor-not-allowed"
                  : "bg-secondary text-white shadow-xl shadow-secondary/20 hover:shadow-secondary/40 hover:scale-[1.02] active:scale-[0.98]"
              )}
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {loading ? 'Authenticating...' : 'Sign In to Admin'}
            </button>
          </form>
        </div>

        <p className="text-center text-[10px] text-white/15 font-medium mt-8">
          Next360 Platform · Restricted Access · v2.4.0
        </p>
      </motion.div>
    </div>
  )
}
