"use client"
import React from 'react'
import { toast } from 'sonner'
import Image from 'next/image'

export default function GoogleAuthButton() {
  return (
    <a
      href={`${process.env.NEXT_PUBLIC_API_URL}/auth/google`}
      className="w-full h-12 flex items-center justify-center gap-3 border-2 border-border rounded-xl bg-white hover:bg-cream hover:border-border transition-all font-bold text-text focus:ring-4 focus:ring-cream outline-none"
    >
      <Image src="/images/google.svg" alt="Google" width={20} height={20} className="w-5 h-5" onError={(e) => { e.currentTarget.style.display = 'none'}} />
      Continue with Google
    </a>
  )
}
