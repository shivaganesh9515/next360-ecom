"use client"

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound, useParams } from 'next/navigation'
import { Badge } from '@next360/ui'
import { Share2, Clock, ChevronLeft } from 'lucide-react'
import BlogCard from '@/components/blog/BlogCard'
import ShareButtons from './ShareButtons'
import { useQuery } from '@tanstack/react-query'
import { blogService } from '@/services/blogService'
import { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await blogService.getBlogPostBySlug(slug)
  
  if (!post) return { title: 'Article Not Found' }

  return {
    title: `${post.title} | Next360 Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.thumbnail }],
      type: 'article',
      publishedTime: post.publishedAt,
    }
  }
}

export default function BlogDetail() {
  const params = useParams()
  const slug = params.slug as string
  
  const { data: post, isLoading, error } = useQuery({
    queryKey: ['blog-post', slug],
    queryFn: () => blogService.getBlogPostBySlug(slug),
  })

  const { data: allPosts = [] } = useQuery({
    queryKey: ['blog-posts', 'all'],
    queryFn: () => blogService.getBlogPosts(),
  })

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white pt-32 flex flex-col items-center justify-center">
        <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin mb-4" />
        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Harvesting wisdom...</p>
      </div>
    )
  }

  if (!post || error) {
    notFound()
  }

  // Find related articles (same category, exclude current, limit 3)
  const related = allPosts
    .filter(p => p.category === post.category && p.id !== post.id)
    .slice(0, 3)

  // Fallback to random posts if not enough related
  if (related.length < 3) {
    const filler = allPosts
      .filter(p => p.id !== post.id && !related.find(r => r.id === p.id))
      .slice(0, 3 - related.length)
    related.push(...filler)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-cream pt-24 pb-16 lg:pt-32 lg:pb-24 border-b border-cream-dark">
        <div className="max-w-4xl mx-auto px-4">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-primary transition-colors tracking-widest uppercase mb-8">
            <ChevronLeft size={16} /> Back to Blog
          </Link>
          
          <div className="flex items-center gap-4 mb-6">
            <Badge variant="fresh" className="font-bold uppercase tracking-widest text-[#2d5016] bg-[#2d5016]/10 border-none px-4 py-1.5 shadow-sm">
              {post.category}
            </Badge>
            <span className="flex items-center gap-1.5 text-sm font-bold text-slate-500 uppercase tracking-widest">
              <Clock size={16} /> {post.readTime || `${Math.ceil(post.content.length / 1000)} min read`}
            </span>
          </div>

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-slate-800 leading-tight mb-6">
            {post.title}
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 font-medium leading-relaxed mb-10 max-w-3xl">
            {post.excerpt}
          </p>

          <div className="flex items-center gap-4 text-sm font-bold text-slate-500 uppercase tracking-widest pt-6 border-t border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xl shadow-inner">
                🌿
              </div>
              <div className="flex flex-col">
                <span className="text-slate-800">Next360 Team</span>
                <span className="text-xs text-slate-400 normal-case tracking-normal">Author</span>
              </div>
            </div>
            <span className="text-slate-300 mx-2">•</span>
            <span>
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                month: 'long', day: 'numeric', year: 'numeric'
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="max-w-5xl mx-auto px-4 -mt-12 lg:-mt-16 relative z-10 mb-16">
        <div className="relative aspect-video rounded-[32px] overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
          <Image 
            src={post.thumbnail} 
            alt={post.title} 
            fill 
            className="object-cover hover:scale-[1.02] transition-transform duration-700"
            priority
          />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-10">
        <article className="prose prose-lg prose-slate max-w-none">
          {typeof post.content === 'string' ? (
            post.content.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="text-slate-700 leading-[1.8] mb-8 font-medium text-lg">
                {paragraph}
              </p>
            ))
          ) : (
            post.content.map((paragraph: string, idx: number) => (
              <p key={idx} className="text-slate-700 leading-[1.8] mb-8 font-medium text-lg">
                {paragraph}
              </p>
            ))
          )}
        </article>

        {/* Share Row */}
        <ShareButtons title={post.title} />
      </div>

      {/* Related Articles */}
      <div className="bg-gray-50 py-20 border-t border-slate-100 mt-10">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <h2 className="font-display text-3xl font-black text-slate-800">You Might Also Like</h2>
            <Link href="/blog" className="text-primary font-bold hover:underline underline-offset-4 hidden sm:block tracking-widest uppercase text-sm">
              View All Posts →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {related.map(rPost => (
              <BlogCard key={rPost.id} post={rPost} />
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link href="/blog" className="text-primary font-bold hover:underline underline-offset-4 tracking-widest uppercase text-sm">
              View All Posts →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
