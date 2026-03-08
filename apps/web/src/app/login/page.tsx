import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle2 } from 'lucide-react'
import { toast } from 'sonner'
import LoginForm from '@/components/auth/LoginForm'
import GoogleAuthButton from './GoogleAuthButton'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-transparent flex">
      {/* LEFT: Decorative Panel (hidden on mobile) */}
      <div className="hidden lg:flex w-1/2 bg-primary-dark flex-col justify-between relative overflow-hidden text-white p-12 xl:p-20">
        {/* Subtle background pattern/blobs could go here in future */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(circle at 20% 150%, white 0%, transparent 50%)' }} />
        
        <div className="relative z-10 max-w-lg mt-12">
          <h2 className="font-display text-5xl leading-tight font-black mb-6">
            Pure food,<br/>real farmers,<br/>happy you.
          </h2>
          <div className="space-y-5 mt-12">
            {[
               "100% Certified Organic Produce",
               "Directly sourced from 500+ Indian farmers",
               "Zero chemical pesticides or synthetic fertilizers"
            ].map((benefit, idx) => (
              <div key={idx} className="flex items-center gap-4 text-lg font-medium text-white/90">
                <CheckCircle2 className="text-secondary shrink-0" size={24} />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 flex gap-4 opacity-50 text-sm font-medium">
          <span>© 2026 Next360</span>
          <span>•</span>
          <span>All rights reserved</span>
        </div>
      </div>

      {/* RIGHT: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative">
        <div className="w-full max-w-md mx-auto">
          {/* Logo mobile fallback */}
          <div className="lg:hidden mb-12 flex justify-center">
             <Link href="/" className="font-display font-black text-3xl tracking-tight text-primary flex items-center gap-2">
                <span className="text-secondary">🌿</span> Next360
             </Link>
          </div>

          <div className="mb-10 text-center lg:text-left">
             <Link href="/" className="hidden lg:inline-flex font-display font-black text-2xl tracking-tight text-primary items-center gap-2 mb-12 hover:opacity-80 transition-opacity">
                <span className="text-secondary">🌿</span> Next360
             </Link>
            <h1 className="font-display text-4xl font-black text-text mb-3">Welcome Back 👋</h1>
            <p className="text-muted font-medium text-lg">Sign in to your account</p>
          </div>

          <LoginForm />

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 text-muted font-medium bg-transparent">or continue with</span>
            </div>
          </div>

          <GoogleAuthButton />

          <p className="mt-8 text-center text-muted font-medium">
            Don't have an account?{' '}
            <Link href="/register" className="text-secondary hover:text-secondary-dark font-bold hover:underline underline-offset-4 transition-all">
              Create one →
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

