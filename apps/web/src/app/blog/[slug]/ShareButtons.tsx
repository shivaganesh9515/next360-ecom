"use client"

import React, { useState } from 'react'
import { Share2, Copy, Check } from 'lucide-react'
import { toast } from 'sonner'

export default function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    toast.success('Link copied to clipboard')
    setTimeout(() => setCopied(false), 2000)
  }

  const handleWhatsApp = () => {
    const text = encodeURIComponent(`Check out this article: ${title}\n${window.location.href}`)
    window.open(`https://wa.me/?text=${text}`, '_blank')
  }

  return (
    <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-4">
      <span className="text-slate-500 font-bold uppercase tracking-widest text-sm flex items-center gap-2">
        <Share2 size={16} /> Share this article:
      </span>
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <button 
          onClick={handleWhatsApp}
          className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-[#25D366] text-white rounded-xl font-bold hover:bg-[#128C7E] transition-colors"
        >
          WhatsApp
        </button>
        <button 
          onClick={handleCopy}
          className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-white border-2 border-slate-200 text-slate-600 rounded-xl font-bold hover:border-slate-300 hover:bg-slate-50 transition-colors"
        >
          {copied ? <><Check size={18} className="text-primary" /> Copied</> : <><Copy size={18} /> Copy Link</>}
        </button>
      </div>
    </div>
  )
}
