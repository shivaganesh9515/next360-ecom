'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, XCircle, ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { CertificationBadge } from '@/components/ui/CertificationBadge'
import { cn } from '@/lib/utils'

const vendorDetail = {
  id: 'APR-012',
  name: 'Sunrise Organic Hub',
  owner: 'Narasimha Reddy',
  email: 'narasimha@sunriseorganics.in',
  phone: '+91 98765 43210',
  region: 'Hyderabad North',
  cert: 'NPOP',
  certNo: 'NPOP/TG/2024/0091',
  type: 'New Vendor',
  submitted: '1 hour ago',
  products: ['Tomatoes', 'Spinach', 'Coriander', 'Bottle Gourd'],
  bio: 'Family farm operating since 1998, certified organic under NPOP standards. Supplies primarily within Hyderabad metropolitan region.',
}

export default function AdminApprovePage() {
  const [status, setStatus] = useState<'idle' | 'approved' | 'rejected'>('idle')

  return (
    <div className="space-y-10 font-sans pb-20">
      <div className="flex items-center gap-4">
        <Link
          href="/approvals"
          className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all"
        >
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Vendor Approval Review</p>
          <h1 className="text-4xl font-display font-black text-white tracking-tight">{vendorDetail.name}</h1>
        </div>
      </div>

      {status !== 'idle' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            "p-6 rounded-2xl border flex items-center gap-4",
            status === 'approved' ? "bg-secondary/10 border-secondary/20" : "bg-red-500/10 border-red-500/20"
          )}
        >
          {status === 'approved' ? <CheckCircle className="w-6 h-6 text-secondary" /> : <XCircle className="w-6 h-6 text-red-400" />}
          <p className="font-bold text-white">
            {status === 'approved' ? 'Vendor approved and notified.' : 'Vendor application rejected and notified.'}
          </p>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Vendor Detail Card */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-[#111] border-white/5 p-8">
            <div className="flex items-center gap-6 mb-8">
              <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center text-3xl font-display font-black text-secondary">
                {vendorDetail.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-2xl font-display font-black text-white">{vendorDetail.name}</h2>
                <p className="text-sm text-white/40 mt-1">{vendorDetail.owner}</p>
                <div className="flex gap-3 mt-3">
                  <CertificationBadge type={vendorDetail.cert} size="md" />
                  <span className="text-[10px] font-black text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3 py-1.5 rounded-xl uppercase tracking-widest">
                    {vendorDetail.type}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-sm text-white/50 leading-relaxed mb-8">{vendorDetail.bio}</p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Email', value: vendorDetail.email },
                { label: 'Phone', value: vendorDetail.phone },
                { label: 'Region', value: vendorDetail.region },
                { label: 'Cert. No.', value: vendorDetail.certNo },
              ].map(field => (
                <div key={field.label} className="bg-white/5 rounded-2xl p-4">
                  <p className="text-[10px] font-black uppercase text-white/30 tracking-widest">{field.label}</p>
                  <p className="text-sm font-bold text-white mt-1">{field.value}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="bg-[#111] border-white/5 p-8">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-4">Declared Products</h3>
            <div className="flex flex-wrap gap-2">
              {vendorDetail.products.map(p => (
                <span key={p} className="bg-secondary/10 border border-secondary/20 text-secondary text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-xl">
                  {p}
                </span>
              ))}
            </div>
          </Card>
        </div>

        {/* Action Panel */}
        <div className="space-y-4">
          <Card className="bg-[#0A0A0A] border-white/5 p-8">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-6">Review Actions</h3>
            <div className="space-y-3">
              <button
                onClick={() => setStatus('approved')}
                disabled={status !== 'idle'}
                className="w-full bg-secondary text-white py-4 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-secondary/20 hover:scale-105 transition-all disabled:opacity-40 disabled:scale-100 flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-4 h-4" /> Approve Vendor
              </button>
              <button
                onClick={() => setStatus('rejected')}
                disabled={status !== 'idle'}
                className="w-full bg-red-500/10 text-red-400 border border-red-500/20 py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all disabled:opacity-40 flex items-center justify-center gap-2"
              >
                <XCircle className="w-4 h-4" /> Reject Application
              </button>
            </div>
            <div className="mt-6 pt-6 border-t border-white/5 space-y-2">
              <p className="text-[10px] font-black uppercase text-white/20 tracking-widest">Submission</p>
              <p className="text-xs font-bold text-white">{vendorDetail.submitted}</p>
              <p className="text-[10px] text-white/30 font-medium">{vendorDetail.id}</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
