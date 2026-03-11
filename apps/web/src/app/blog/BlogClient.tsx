"use client"

import React, { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { blogService } from '@/services/blogService'
import { Badge } from '@next360/ui'
import BlogCard from '@/components/blog/BlogCard'
import BlogSidebar from '@/components/blog/BlogSidebar'

export default function BlogClient() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const categoryParam = searchParams.get('category')
  const [activeCategory, setActiveCategory] = useState(categoryParam || 'All')

  const { data: posts = [], isLoading: isPostsLoading } = useQuery({
    queryKey: ['blog-posts', activeCategory],
    queryFn: () => blogService.getBlogPosts({ category: activeCategory === 'All' ? undefined : activeCategory }),
  })

  const { data: categories = ['All'] } = useQuery({
    queryKey: ['blog-categories'],
    queryFn: async () => {
      const cats = await blogService.getCategories()
      return ['All', ...cats]
    },
  })

  useEffect(() => {
    setActiveCategory(categoryParam || 'All')
  }, [categoryParam])

  const handleCategoryChange = (label: string) => {
    setActiveCategory(label)
    router.push(`/blog${label === 'All' ? '' : `?category=${label}`}`)
  }

  const featuredPost = posts.length > 0 ? posts[0] : null
  const gridPosts = posts.slice(1)

  return (
    <div className="min-h-screen bg-white pt-24">
      {/* Page Header */}
      <div className="bg-slate-50 py-24 px-4 border-b border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl opacity-50" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/5 rounded-full -ml-24 -mb-24 blur-3xl opacity-50" />
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="text-[10px] font-black tracking-[0.4em] uppercase text-primary mb-6 flex items-center justify-center gap-3">
             <div className="w-10 h-[1px] bg-primary/20" />
             Editorial Haul
             <div className="w-10 h-[1px] bg-primary/20" />
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tighter italic">
            The Knowledge Node
          </h1>
          <p className="text-base text-slate-400 font-bold max-w-xl mx-auto uppercase tracking-widest leading-loose">
            High-fidelity insights on the ecosystem, nutrition, and fleet performance protocols.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="space-y-16">
          
          {/* Category Tabs */}
          <div className="flex items-center justify-center gap-3 overflow-x-auto pb-4 scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`shrink-0 px-10 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${
                  activeCategory === cat
                    ? 'bg-slate-900 text-white shadow-2xl shadow-slate-900/30 -translate-y-1'
                    : 'bg-white border border-slate-100 text-slate-400 hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {isPostsLoading ? (
            <div className="flex flex-col items-center justify-center py-32 bg-white rounded-[3rem] border border-slate-100 shadow-inner">
              <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent animate-spin mb-6"></div>
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">Synchronizing feed...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-32 bg-white rounded-[3rem] border border-slate-100 italic">
              <h3 className="text-xl font-bold text-slate-300 uppercase tracking-widest">No Protocol Entries Discovered</h3>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
              
              {/* LEFT: Posts */}
              <div className="lg:col-span-3 space-y-16">
                {/* Featured Post */}
                {featuredPost && (
                  <Link href={`/blog/${featuredPost.slug}`} className="group block bg-white rounded-[3rem] overflow-hidden border border-slate-100 shadow-2xl shadow-slate-200/50 hover:-translate-y-2 transition-all duration-700">
                    <div className="relative aspect-[21/9] md:aspect-[2.4/1] overflow-hidden bg-slate-50">
                      <Image 
                        src={featuredPost.thumbnail} 
                        alt={featuredPost.title} 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-1000"
                        priority
                      />
                      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      <div className="absolute top-10 left-10">
                        <Badge className="bg-white text-slate-900 font-black px-6 py-2 uppercase tracking-[0.2em] text-[9px] rounded-full border-none shadow-2xl">
                          {featuredPost.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-10 md:p-14">
                      <div className="flex items-center gap-4 text-[9px] font-black text-primary uppercase tracking-[0.3em] mb-6 italic">
                         <span className="w-8 h-[2px] bg-primary" />
                         Lead Operation
                      </div>
                      <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight group-hover:text-primary transition-colors tracking-tighter mb-8 italic">
                        {featuredPost.title}
                      </h2>
                      <p className="text-slate-500 font-bold text-base md:text-lg leading-loose line-clamp-2 mb-10 max-w-2xl">
                        {featuredPost.excerpt}
                      </p>
                      <div className="flex items-center justify-between border-t border-slate-50 pt-10">
                        <div className="flex items-center gap-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-900 font-black italic border border-slate-200">G</div>
                            <span className="text-slate-900">Fleet HQ</span>
                          </div>
                          <span className="opacity-30">|</span>
                          <span>
                            {new Date(featuredPost.publishedAt).toLocaleDateString('en-IN', {
                              month: 'short', day: '2-digit', year: 'numeric'
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-primary font-black uppercase tracking-[0.2em] text-[10px] group-hover:translate-x-2 transition-transform duration-500">
                           Initialize Access <div className="w-10 h-[2px] bg-primary/20" />
                        </div>
                      </div>
                    </div>
                  </Link>
                )}

                {/* Remaining Grid */}
                {gridPosts.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {gridPosts.map(post => (
                      <BlogCard key={post.id} post={post} />
                    ))}
                  </div>
                )}
              </div>

              {/* RIGHT: Sidebar */}
              <div className="hidden lg:block lg:col-span-1">
                <BlogSidebar />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
