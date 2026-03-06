import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Clock } from 'lucide-react'
import { MOCK_BLOG_POSTS } from '@/lib/mockData'
import { Badge } from '@next360/ui'

export default function BlogTeaser() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <h2 className="font-display text-4xl md:text-5xl text-primary font-bold mb-4">
              From the Organic Kitchen
            </h2>
            <p className="text-slate-500 text-lg font-body max-w-xl">
              Tips, recipes, and stories from our community of farmers and health enthusiasts.
            </p>
          </div>
          <Link 
            href="/blog" 
            className="group flex items-center gap-2 text-primary font-bold tracking-widest uppercase text-sm"
          >
            Read All Articles 
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {MOCK_BLOG_POSTS.map((post) => (
            <Link 
              key={post.id} 
              href={`/blog/${post.slug}`} 
              className="group flex flex-col h-full"
            >
              <div className="relative aspect-video rounded-[2.5rem] overflow-hidden mb-6 shadow-sm border border-slate-50">
                <Image 
                  src={post.thumbnail} 
                  alt={post.title} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-white/90 backdrop-blur-sm text-primary font-bold shadow-sm">
                    {post.category}
                  </Badge>
                </div>
              </div>

              <div className="flex-1">
                <h3 className="font-display text-2xl text-slate-800 font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                  {post.title}
                </h3>
                <p className="text-slate-500 text-sm font-body line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-50 flex items-center justify-between text-xs text-slate-400 font-bold uppercase tracking-widest">
                <span>{new Date(post.publishedAt).toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                <span className="flex items-center gap-1.5">
                  <Clock size={14} /> 5 MIN READ
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
