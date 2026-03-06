"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { MapPin, Phone, Mail, Clock, Plus, Minus, CheckCircle2, ChevronRight } from 'lucide-react'
import { Button, Input } from '@next360/ui'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Enter a valid email address'),
  subject: z.string().min(5, 'Subject is too short'),
  message: z.string().min(20, 'Message must be at least 20 characters')
})

type ContactValues = z.infer<typeof contactSchema>

export default function ContactPage() {
  const [isSent, setIsSent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema)
  })

  const onSubmit = async (data: ContactValues) => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsLoading(false)
    setIsSent(true)
  }

  const faqs = [
    {
      q: "How fresh are the products?",
      a: "Our produce is harvested based on your order and delivered within 12-24 hours of plucking. This ensures maximum nutritional value and taste."
    },
    {
      q: "Do you deliver in my city?",
      a: "We currently deliver to all major metro cities including Mumbai, Pune, Bangalore, Hyderabad, Delhi NCR, and Chennai."
    },
    {
      q: "How do I track my order?",
      a: "Once your order is dispatched, you will receive a tracking link via SMS/WhatsApp. You can also view live status in your Account Dashboard."
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Page Header */}
      <div className="bg-cream py-16 px-4 border-b border-cream-dark">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-secondary font-bold text-sm tracking-widest uppercase mb-4 flex items-center justify-center gap-2">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span className="text-slate-300">/</span>
            <span className="text-primary">Contact</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-black text-slate-800 mb-4 tracking-tight">
            Get in Touch
          </h1>
          <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
            We'd love to hear from you. Whether you have a question about our farms, your order, or just want to say hello.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          
          {/* LEFT: Contact Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-[32px] border border-slate-100 p-8 md:p-12 shadow-sm">
              <h2 className="font-display text-3xl font-black text-slate-800 mb-8">Send us a Message</h2>
              
              {isSent ? (
                <div className="bg-secondary/5 rounded-2xl p-10 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-500">
                  <div className="w-20 h-20 bg-secondary/20 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 size={40} className="text-secondary" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-slate-800 mb-2">Message sent successfully!</h3>
                  <p className="text-slate-600 font-medium mb-8">We'll get back to you within 24 hours.</p>
                  <button 
                    onClick={() => { reset(); setIsSent(false) }}
                    className="text-primary font-bold hover:underline underline-offset-4 tracking-widest uppercase text-sm"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Input 
                        {...register('name')} 
                        placeholder="Your Name" 
                        error={errors.name?.message} 
                        className="bg-slate-50 border-slate-200"
                      />
                    </div>
                    <div>
                      <Input 
                        {...register('email')} 
                        type="email" 
                        placeholder="Your Email" 
                        error={errors.email?.message} 
                        className="bg-slate-50 border-slate-200"
                      />
                    </div>
                  </div>
                  <div>
                    <Input 
                      {...register('subject')} 
                      placeholder="Subject" 
                      error={errors.subject?.message} 
                      className="bg-slate-50 border-slate-200"
                    />
                  </div>
                  <div className="relative">
                    <textarea 
                      {...register('message')} 
                      rows={6}
                      placeholder="How can we help you?"
                      className={`w-full p-4 bg-slate-50 border rounded-2xl text-slate-800 font-medium transition-all outline-none focus:ring-4 focus:ring-primary/10 ${
                        errors.message ? 'border-red-300 focus:border-red-400' : 'border-slate-200 focus:border-primary'
                      }`}
                    ></textarea>
                    {errors.message && (
                      <p className="text-red-500 text-xs mt-1.5 font-bold pl-4">{errors.message.message}</p>
                    )}
                  </div>
                  <Button type="submit" variant="primary" isLoading={isLoading} className="w-full md:w-auto px-10 h-14 rounded-2xl font-bold text-lg shadow-xl shadow-primary/20">
                    Send Message
                  </Button>
                </form>
              )}
            </div>
          </div>

          {/* RIGHT: Info & FAQ */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
              <div className="bg-white rounded-[24px] border border-slate-100 p-6 flex gap-4 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0">
                  <MapPin size={24} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-400 uppercase tracking-widest text-xs mb-2">Address</h4>
                  <p className="font-medium text-slate-700 leading-relaxed">42, Organic Hub, HITEC City<br/>Hyderabad, Telangana 500081</p>
                </div>
              </div>

              <div className="bg-white rounded-[24px] border border-slate-100 p-6 flex gap-4 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0">
                  <Phone size={24} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-400 uppercase tracking-widest text-xs mb-2">Phone</h4>
                  <p className="font-bold text-slate-800 text-lg">+91-40-0000-0000</p>
                  <p className="font-medium text-slate-500 text-sm mt-1">Mon–Sat, 9 AM – 6 PM</p>
                </div>
              </div>

              <div className="bg-white rounded-[24px] border border-slate-100 p-6 flex gap-4 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0">
                  <Mail size={24} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-400 uppercase tracking-widest text-xs mb-2">Email</h4>
                  <a href="mailto:hello@next360.in" className="font-medium text-slate-700 hover:text-primary block mb-1">hello@next360.in</a>
                  <a href="mailto:support@next360.in" className="font-medium text-slate-700 hover:text-primary block">support@next360.in</a>
                </div>
              </div>
            </div>

            {/* FAQ Snippet */}
            <div className="bg-cream rounded-[32px] p-8 border border-cream-dark mt-8 shadow-sm">
              <h3 className="font-display text-2xl font-black text-slate-800 mb-6">Common Questions</h3>
              <div className="space-y-4">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
                    <button 
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full p-4 flex items-center justify-between text-left font-bold text-slate-800 hover:text-primary transition-colors"
                    >
                      <span className="pr-4">{faq.q}</span>
                      <span className="shrink-0 text-slate-400">
                        {openFaq === idx ? <Minus size={18} /> : <Plus size={18} />}
                      </span>
                    </button>
                    {openFaq === idx && (
                      <div className="p-4 pt-0 text-slate-600 font-medium text-sm leading-relaxed border-t border-slate-50">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <Link href="/faq" className="inline-flex items-center gap-2 text-primary font-bold hover:underline underline-offset-4 tracking-widest uppercase text-sm">
                  View All FAQs <ChevronRight size={16} />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
