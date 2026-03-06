import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search, ChevronRight } from 'lucide-react'
import { MOCK_BLOG_CATEGORIES, MOCK_BLOG_POSTS } from '@/lib/mockBlog'

export default function BlogSidebar() {
  const popularPosts = MOCK_BLOG_POSTS.slice(0, 3)
  const categories = MOCK_BLOG_CATEGORIES.filter(c => c.label !== 'All')

  return (
    <div className="sticky top-24 space-y-6">
      {/* Search Widget */}
      <div className="bg-white rounded-2xl border border-border p-4">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search articles..." 
            className="w-full h-11 pl-4 pr-10 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-medium placeholder:text-slate-400"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors">
            <Search size={18} />
          </button>
        </div>
      </div>

      {/* Categories Widget */}
      <div className="bg-white rounded-2xl border border-border p-5">
        <h3 className="font-display font-bold text-lg text-slate-800 mb-4 pb-3 border-b border-slate-100">
          Categories
        </h3>
        <ul className="space-y-3">
          {categories.map((category) => (
            <li key={category.label}>
              <Link 
                href={`/blog?category=${category.label}`}
                className="group flex items-center justify-between text-sm font-medium text-slate-600 hover:text-primary transition-colors"
              >
                <span className="flex items-center gap-2">
                  <ChevronRight size={14} className="text-slate-300 group-hover:text-primary transition-colors" />
                  {category.label}
                </span>
                <span className="bg-slate-50 text-slate-400 text-xs py-0.5 px-2.5 rounded-full border border-slate-100">
                  {category.count}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Popular Posts Widget */}
      <div className="bg-white rounded-2xl border border-border p-5">
        <h3 className="font-display font-bold text-lg text-slate-800 mb-4 pb-3 border-b border-slate-100">
          Popular Posts
        </h3>
        <div className="space-y-4">
          {popularPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group flex gap-3 items-center">
              <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0">
                <Image 
                  src={post.thumbnail} 
                  alt={post.title} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-500" 
                />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                  {post.title}
                </h4>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    month: 'short', day: 'numeric', year: 'numeric'
                  })}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Compact Newsletter Widget */}
      <div className="bg-primary text-white rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none" />
        <h3 className="font-display font-black text-xl mb-2 relative z-10">Get weekly organic tips</h3>
        <p className="text-sm text-primary-light mb-4 font-medium relative z-10">
          Recipes, farming insights, and exclusive subscriber offers.
        </p>
        <form className="relative z-10" onSubmit={(e) => { e.preventDefault(); alert("Mock Subscribe!") }}>
          <input 
            type="email" 
            placeholder="Your email address" 
            className="w-full h-11 px-4 mb-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 text-sm outline-none focus:border-white focus:bg-white/20 transition-all font-medium"
            required
          />
          <button 
            type="submit" 
            className="w-full h-11 bg-white text-primary font-bold rounded-xl hover:bg-slate-50 active:scale-[0.98] transition-all shadow-lg"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  )
}
