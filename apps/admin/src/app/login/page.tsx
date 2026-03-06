'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@next360/ui/Button'
import { Input } from '@next360/ui/Input'
import { authService } from '../../services/authService'
import { useAdminAuthStore } from '../../store/adminAuthStore'
import { getErrorMessage } from '../../services/api'

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

type LoginValues = z.infer<typeof loginSchema>

export default function AdminLoginPage() {
  const router = useRouter()
  const { login } = useAdminAuthStore()
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginValues) => {
    try {
      const response = await authService.login(data.email, data.password)
      if (!['ADMIN', 'SUPERADMIN'].includes(response.user.role)) {
        throw new Error('Access denied. Administrator privileges required.')
      }
      login(response.user, response.token)
      toast.success('Welcome back!')
      router.push('/dashboard')
    } catch (err) {
      setError('root', { message: getErrorMessage(err) })
    }
  }

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="font-display text-2xl text-primary tracking-wide">🌿 Next360</div>
          <div className="inline-block mt-2 bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
            Admin Panel
          </div>
        </div>

        <h1 className="text-xl font-semibold text-gray-900 mb-1">Sign In</h1>
        <p className="text-sm text-muted mb-6">Restricted to administrators only</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                {...register('email')}
                type="email"
                placeholder="Email address"
                className="pl-10"
                error={errors.email?.message}
              />
            </div>
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                className="pl-10 pr-10"
                error={errors.password?.message}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
          </div>

          {errors.root && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 mt-2">
              <p className="text-red-700 text-sm font-medium">{errors.root.message}</p>
            </div>
          )}

          <Button
            type="submit"
            className="w-full mt-4"
            size="lg"
            isLoading={isSubmitting}
          >
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>
      </div>
    </div>
  )
}
