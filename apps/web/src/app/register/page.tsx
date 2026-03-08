import React from 'react'
import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'
import RegisterForm from '@/components/auth/RegisterForm'
import GoogleAuthButton from '@/app/login/GoogleAuthButton'

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-transparent flex">
      {/* LEFT: Decorative Panel (hidden on mobile) */}
      <div className="hidden lg:flex w-1/2 bg-surface flex-col justify-between relative overflow-hidden border-r border-border p-12 xl:p-20">
        <div className="relative z-10 max-w-lg mt-12">
          <h2 className="font-display text-5xl leading-tight font-black text-text mb-6">
            Join the organic<br/>revolution today.
          </h2>
          <div className="space-y-5 mt-12">
            {[
               "Free delivery on your first 3 orders",
               "Farm-to-table freshness guaranteed",
               "Early access to seasonal harvests",
               "Earn Seeds (loyalty points) on every purchase"
            ].map((benefit, idx) => (
              <div key={idx} className="flex items-center gap-4 text-lg font-medium text-text">
                <CheckCircle2 className="text-primary shrink-0" size={24} />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 flex gap-4 text-muted text-sm font-medium">
          <span>© 2026 Next360</span>
          <span>•</span>
          <span>All rights reserved</span>
        </div>
      </div>

      {/* RIGHT: Register Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative overflow-y-auto">
        <div className="w-full max-w-md mx-auto py-10">
          {/* Logo mobile fallback */}
          <div className="lg:hidden mb-10 flex justify-center">
             <Link href="/" className="font-display font-black text-3xl tracking-tight text-primary flex items-center gap-2">
                <span className="text-secondary">🌿</span> Next360
             </Link>
          </div>

          <div className="mb-10 text-center lg:text-left">
             <Link href="/" className="hidden lg:inline-flex font-display font-black text-2xl tracking-tight text-primary items-center gap-2 mb-10 hover:opacity-80 transition-opacity">
                <span className="text-secondary">🌿</span> Next360
             </Link>
            <h1 className="font-display text-4xl font-black text-text mb-3">Join Next360 🌿</h1>
            <p className="text-muted font-medium text-lg">Start your organic journey today</p>
          </div>

          <RegisterForm />

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
            Already have an account?{' '}
            <Link href="/login" className="text-primary hover:text-primary-dark font-bold hover:underline underline-offset-4 transition-all">
              Sign in →
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

