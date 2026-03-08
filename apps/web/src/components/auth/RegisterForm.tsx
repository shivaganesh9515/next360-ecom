"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Mail, Lock, Eye, EyeOff, User, Phone } from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'
import { Button, Input } from '@next360/ui'
import { useAuthStore } from '@/store/authStore'
import { useMutation } from '@tanstack/react-query'
import { authService } from '@/services/authService'
import { getErrorMessage } from '@/services/api'

// Indian phone regex: +91 optional, then 10 digits starting with 6-9
const phoneRegex = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/;

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Enter a valid email'),
  phone: z.string().regex(phoneRegex, 'Enter a valid Indian mobile number'),
  password: z.string().min(8, 'At least 8 characters'),
  confirmPassword: z.string(),
  terms: z.boolean().refine(v => v, 'You must accept the terms')
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
})

type RegisterValues = z.infer<typeof registerSchema>

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const router = useRouter()
  const login = useAuthStore(state => state.login)

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { terms: false }
  })

  const registerMutation = useMutation({
    mutationFn: authService.register,
    onSuccess: ({ user, token }) => {
      login(user, token)
      toast.success('Welcome to Next360! 🌿')
      router.push('/account')
    },
    onError: (err) => {
      toast.error(getErrorMessage(err))
    }
  })

  const onSubmit = (data: RegisterValues) => {
    registerMutation.mutate(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
      <div>
        <Input
          {...register('name')}
          type="text"
          placeholder="Full Name"
          error={errors.name?.message}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Input
            {...register('email')}
            type="email"
            placeholder="Email address"
            error={errors.email?.message}
          />
        </div>
        <div>
          <Input
            {...register('phone')}
            type="tel"
            placeholder="Mobile Number"
            error={errors.phone?.message}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        <div className="relative">
          <Input
            {...register('confirmPassword')}
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm Password"
            error={errors.confirmPassword?.message}
          />
          <button
            type="button"
            className="absolute right-4 top-[14px] text-muted hover:text-text transition-colors"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            tabIndex={-1}
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      <div className="pt-2">
        <label className="flex items-start gap-3 cursor-pointer group">
          <div className="relative flex items-center justify-center mt-0.5">
            <input 
              type="checkbox" 
              {...register('terms')}
              className="peer appearance-none w-5 h-5 border-2 border-border rounded-md checked:bg-secondary checked:border-secondary transition-colors cursor-pointer"
            />
            <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span className="text-sm font-medium text-muted leading-snug">
            I agree to the{' '}
            <Link href="/terms" className="text-primary hover:underline underline-offset-2">Terms of Service</Link>
            {' '}and{' '}
            <Link href="/privacy" className="text-primary hover:underline underline-offset-2">Privacy Policy</Link>
          </span>
        </label>
        {errors.terms && (
          <p className="text-red-500 text-xs mt-1.5 font-bold pl-8">{errors.terms.message}</p>
        )}
      </div>

      <div className="pt-4">
        <Button 
          type="submit" 
          variant="primary" 
          className="w-full font-bold h-12 text-base shadow-[0_10px_22px_rgba(30,59,47,0.2)]"
          isLoading={registerMutation.isPending}
        >
          Create Account
        </Button>
      </div>
    </form>
  )
}

