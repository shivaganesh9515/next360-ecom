"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { toast } from 'sonner'
import { handleAuthRedirect } from '@/utils/auth-redirect'
import Link from 'next/link'
import { Button, Input } from '@next360/ui'
import { useAuthStore } from '@/store/authStore'
import { useMutation } from '@tanstack/react-query'
import { authService } from '@/services/authService'
import { getErrorMessage } from '@/services/api'

const loginSchema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(1, 'Password is required')
})

type LoginValues = z.infer<typeof loginSchema>

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const login = useAuthStore(state => state.login)

  const { register, handleSubmit, formState: { errors }, setError } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema)
  })

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: ({ user, token }) => {
      login(user, token)
      toast.success(`Welcome back, ${user.name}! 🌿`)
      handleAuthRedirect(user.role, router.push)
    },
    onError: (err) => {
      setError('root', { message: getErrorMessage(err) })
    }
  })

  const onSubmit = (data: LoginValues) => {
    loginMutation.mutate(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
      {errors.root && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-3 text-red-600 text-sm font-medium">
          {errors.root.message}
        </div>
      )}

      <div>
        <Input
          {...register('email')}
          type="email"
          placeholder="Email address"
          error={errors.email?.message}
        />
      </div>

      <div>
        <div className="relative">
          <Input
            {...register('password')}
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            error={errors.password?.message}
          />
          <button
            type="button"
            className="absolute right-4 top-[14px] text-muted hover:text-text transition-colors"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        <div className="flex justify-end mt-2">
          <Link href="/forgot-password" className="text-sm font-bold text-muted hover:text-primary transition-colors">
            Forgot Password?
          </Link>
        </div>
      </div>

      <div className="pt-2">
        <Button 
          type="submit" 
          variant="primary" 
          className="w-full font-bold h-12 text-base shadow-[0_10px_22px_rgba(30,59,47,0.2)]"
          isLoading={loginMutation.isPending}
        >
          Sign In
        </Button>
      </div>
    </form>
  )
}

