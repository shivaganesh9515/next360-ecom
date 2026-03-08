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
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Page Header */}
      <div className="bg-cream py-16 px-4 border-b border-cream-dark">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-secondary font-bold text-sm tracking-widest uppercase mb-4 flex items-center justify-center gap-2">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span className="text-slate-300">/</span>
            <span className="text-primary">Blog</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-black text-slate-800 mb-4 tracking-tight">
            From the Organic Kitchen
          </h1>
          <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
            Recipes, health tips, farm stories, and everything you need to know about living an organic lifestyle.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* LEFT: Posts */}
          <div className="lg:col-span-3 space-y-12">
            
            {/* Category Tabs */}
            <div className="flex items-center gap-3 overflow-x-auto pb-4 custom-scrollbar">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`shrink-0 px-6 py-2.5 rounded-full text-sm font-bold transition-all border ${
                    activeCategory === cat
                      ? 'bg-primary border-primary text-white shadow-md shadow-primary/20'
                      : 'bg-white border-border text-slate-600 hover:border-slate-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {isPostsLoading ? (
              <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-slate-100">
                <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin mb-4"></div>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Harvesting posts...</p>
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-slate-100">
                <h3 className="font-display font-medium text-xl text-slate-800">No posts found in this category.</h3>
              </div>
            ) : (
              <>
                {/* Featured Post */}
                {featuredPost && (
                  <Link href={`/blog/${featuredPost.slug}`} className="group block bg-white rounded-3xl overflow-hidden border border-slate-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500">
                    <div className="relative aspect-[21/9] md:aspect-[3/1] overflow-hidden bg-slate-100">
                      <Image 
                        src={featuredPost.thumbnail} 
                        alt={featuredPost.title} 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        priority
                      />
                      <div className="absolute top-6 left-6">
                        <Badge variant="fresh" className="bg-white/95 backdrop-blur-sm border-none shadow-lg text-primary font-bold px-4 py-1.5 uppercase tracking-widest text-xs">
                          {featuredPost.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-8 md:p-10">
                      <h2 className="font-display text-2xl md:text-3xl font-black text-slate-800 leading-tight group-hover:text-primary transition-colors">
                        {featuredPost.title}
                      </h2>
                      <p className="mt-4 text-slate-500 font-medium text-base md:text-lg leading-relaxed line-clamp-2">
                        {featuredPost.excerpt}
                      </p>
                      <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6 text-sm font-bold text-slate-400 uppercase tracking-widest">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-2 text-slate-600">
                            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">🌿</div>
                            Next360 Team
                          </span>
                          <span>•</span>
                          <span>
                            {new Date(featuredPost.publishedAt).toLocaleDateString('en-US', {
                              month: 'short', day: 'numeric', year: 'numeric'
                            })}
                          </span>
                        </div>
                        <span className="hidden sm:inline-block text-primary">Read Article →</span>
                      </div>
                    </div>
                  </Link>
                )}

                {/* Remaining Grid */}
                {gridPosts.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {gridPosts.map(post => (
                      <BlogCard key={post.id} post={post} />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>

          {/* RIGHT: Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <BlogSidebar />
          </div>
        </div>
      </div>
    </div>
  )
}
