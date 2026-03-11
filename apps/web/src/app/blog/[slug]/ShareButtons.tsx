"use client"

import React, { useState } from 'react'
import { Share2, Copy, Check } from 'lucide-react'
import { toast } from 'sonner'

export default function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    if (typeof window !== 'undefined') {
       navigator.clipboard.writeText(window.location.href)
       setCopied(true)
       toast.success('Protocol link copied')
       setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleWhatsApp = () => {
    if (typeof window !== 'undefined') {
       const text = encodeURIComponent(`Sync this knowledge node: ${title}\n${window.location.href}`)
       window.open(`https://wa.me/?text=${text}`, '_blank')
    }
  }

  return (
    <div className="flex items-center gap-3">
       <button 
          onClick={handleWhatsApp}
          className="flex items-center justify-center gap-3 px-6 h-12 bg-[#25D366] text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-green-500/20"
        >
          WhatsApp
        </button>
        <button 
          onClick={handleCopy}
          className="flex items-center justify-center gap-3 px-6 h-12 bg-white border border-slate-100 text-slate-900 rounded-full text-[10px] font-black uppercase tracking-widest hover:border-slate-300 active:scale-95 transition-all shadow-xl shadow-slate-200/50"
        >
          {copied ? <Check size={14} strokeWidth={3} className="text-primary" /> : <Copy size={14} strokeWidth={3} />}
          {copied ? 'Copied' : 'Copy Node Link'}
        </button>
    </div>
  )
}
