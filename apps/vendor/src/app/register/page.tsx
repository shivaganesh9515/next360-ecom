'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Store, Loader2, ArrowRight } from 'lucide-react'
import { authService } from '../../services/authService'
import { Button, Input } from '@next360/ui'
import Link from 'next/link'
import { toast } from 'sonner'

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
      toast.success('Registration successful. Awaiting admin approval.')
    } catch (err: any) {
      setError(err.message || 'Registration failed')
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
          <Store className="mx-auto h-12 w-12 text-green-600 mb-4" />
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Application Submitted!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for applying to become a Next360 vendor. 
            Our team will review your application and get back to you shortly.
          </p>
          <Link href="/login">
            <Button variant="outline" className="w-full">
              Return to Login
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Store className="mx-auto h-12 w-12 text-green-600" />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Become a Vendor
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Sell your organic products on Next360
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-100">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <Input
                 label="Full Name"
                 {...register('name')}
                 error={errors.name?.message}
               />
               <Input
                 label="Email address"
                 type="email"
                 {...register('email')}
                 error={errors.email?.message}
               />
               <Input
                 label="Password"
                 type="password"
                 {...register('password')}
                 error={errors.password?.message}
               />
               <Input
                 label="Store Name"
                 {...register('storeName')}
                 error={errors.storeName?.message}
               />
               <Input
                 label="GST Number (Optional)"
                 {...register('gstNumber')}
                 error={errors.gstNumber?.message}
               />
               <Input
                 label="FSSAI Number (Optional)"
                 {...register('fssaiNumber')}
                 error={errors.fssaiNumber?.message}
               />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
              {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
              {!isSubmitting && <ArrowRight className="w-4 h-4 ml-2" />}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-gray-500">Already a vendor? </span>
            <Link href="/login" className="text-green-600 hover:text-green-500 font-medium">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
