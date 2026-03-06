"use client"
import React from 'react'
import { toast } from 'sonner'
import Image from 'next/image'

export default function GoogleAuthButton() {
  return (
    <a
      href={`${process.env.NEXT_PUBLIC_API_URL}/auth/google`}
      className="w-full h-12 flex items-center justify-center gap-3 border-2 border-slate-200 rounded-xl bg-white hover:bg-slate-50 hover:border-slate-300 transition-all font-bold text-slate-700 focus:ring-4 focus:ring-slate-100 outline-none"
    >
      <Image src="/images/google.svg" alt="Google" width={20} height={20} className="w-5 h-5" onError={(e) => { e.currentTarget.style.display = 'none'}} />
      Continue with Google
    </a>
  )
}
