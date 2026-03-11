"use client"
import React from 'react'
import { toast } from 'sonner'
import Image from 'next/image'

export default function GoogleAuthButton() {
  return (
    <a
      href={`${process.env.NEXT_PUBLIC_API_URL}/auth/google`}
      className="w-full h-14 flex items-center justify-center gap-4 border border-slate-200 rounded-[1.25rem] bg-white hover:bg-slate-50 transition-all font-black text-slate-800 text-sm uppercase tracking-widest shadow-sm hover:shadow-md active:scale-[0.98] group"
    >
      <div className="relative">
        <Image 
          src="/images/google.svg" 
          alt="Google" 
          width={20} 
          height={20} 
          className="w-5 h-5 group-hover:scale-110 transition-transform" 
          onError={(e) => { e.currentTarget.style.display = 'none'}} 
        />
      </div>
      Continue with Google
    </a>
  )
}
