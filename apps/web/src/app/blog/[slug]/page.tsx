"use client"

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { blogService } from '@/services/blogService'
import { Badge, Button } from '@next360/ui'
import { ArrowLeft, Clock, Calendar, User, Share2 } from 'lucide-react'
import ShareButtons from './ShareButtons'
import BlogSidebar from '@/components/blog/BlogSidebar'

export default function BlogDetailPage() {
  const params = useParams()
  const slug = params.slug as string

  const { data: post, isLoading } = useQuery({
    queryKey: ['blog-post', slug],
    queryFn: () => blogService.getBlogPostBySlug(slug),
  })

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center pt-24">
        <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin mb-6"></div>
        <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">Decoding Entry...</p>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center pt-24 px-4 text-center">
        <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tighter italic">Entry Not Found</h1>
        <p className="text-slate-400 font-bold uppercase tracking-widest mb-10">THE REQUESTED NODE DOES NOT EXIST IN THE CURRENT FEED</p>
        <Link href="/blog">
          <Button className="rounded-full px-12 h-14 font-black uppercase tracking-widest text-xs">Return to Feed</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white pt-24">
      {/* Article Header */}
      <header className="bg-slate-50 py-24 px-4 relative overflow-hidden border-b border-slate-100">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full -mr-48 -mt-48 blur-3xl opacity-30" />
        
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <Link href="/blog" className="inline-flex items-center gap-3 text-[9px] font-black text-primary uppercase tracking-[0.3em] mb-12 hover:tracking-[0.4em] transition-all group">
            <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" />
            Synchronize Feed
          </Link>
          
          <div className="flex flex-col items-center gap-8">
             <Badge className="bg-slate-900 text-white font-black px-6 py-2 uppercase tracking-[0.2em] text-[9px] rounded-full border-none shadow-2xl">
               {post.category}
             </Badge>
             
             <h1 className="text-4xl md:text-7xl font-black text-slate-900 leading-[1.1] tracking-tighter italic lg:-mx-20">
               {post.title}
             </h1>
             
             <div className="flex flex-wrap items-center justify-center gap-10 text-[10px] font-black text-slate-400 uppercase tracking-widest pt-8 border-t border-slate-200/60 w-full max-w-2xl">
                <div className="flex items-center gap-3 text-slate-900">
                   <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white italic text-[12px] font-black">G</div>
                   <span>Fleet HQ</span>
                </div>
                <div className="flex items-center gap-3">
                   <Calendar size={14} className="text-primary" />
                   <span>{new Date(post.publishedAt).toLocaleDateString('en-IN', { month: 'long', day: '2-digit', year: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-3">
                   <Clock size={14} className="text-primary" />
                   <span>{post.readTime}</span>
                </div>
             </div>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      <div className="max-w-6xl mx-auto px-4 -mt-16 relative z-20">
        <div className="relative aspect-[21/9] rounded-[3rem] overflow-hidden shadow-2xl shadow-slate-900/10 border-8 border-white bg-slate-50">
          <Image 
            src={post.thumbnail} 
            alt={post.title} 
            fill 
            className="object-cover" 
            priority
          />
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-7xl mx-auto px-4 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          
          {/* Main Column */}
          <article className="lg:col-span-8">
            <div 
              className="prose prose-slate prose-lg max-w-none 
                prose-headings:font-black prose-headings:tracking-tighter prose-headings:italic prose-headings:text-slate-900
                prose-p:text-slate-600 prose-p:leading-loose prose-p:font-medium
                prose-strong:text-slate-900 prose-strong:font-black
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                prose-img:rounded-[2rem] prose-img:shadow-xl
                prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-slate-50 prose-blockquote:p-8 prose-blockquote:rounded-2xl prose-blockquote:not-italic prose-blockquote:font-bold prose-blockquote:text-slate-800"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            
            {/* Post Footer */}
            <div className="mt-24 pt-16 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8">
               <div className="flex items-center gap-4">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 py-2 border border-slate-100 rounded-full">Share Protocol</span>
                  <ShareButtons title={post.title} />
               </div>
               <Link href="/blog">
                  <Button variant="outline" className="rounded-full px-10 h-14 border-slate-100 text-slate-400 hover:text-slate-900 font-black uppercase tracking-widest text-[10px]">
                    Return to Feed
                  </Button>
               </Link>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-12">
            <BlogSidebar />
          </aside>
        </div>
      </div>
    </div>
  )
}
