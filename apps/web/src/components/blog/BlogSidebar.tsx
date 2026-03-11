import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search, ChevronRight } from 'lucide-react'
import { MOCK_BLOG_CATEGORIES, MOCK_BLOG_POSTS } from '@/lib/mockBlog'

export default function BlogSidebar() {
  const popularPosts = MOCK_BLOG_POSTS.slice(0, 3)
  const categories = MOCK_BLOG_CATEGORIES.filter(c => c.label !== 'All')

  return (
    <div className="sticky top-32 space-y-10">
      {/* Search Widget */}
      <div className="bg-white rounded-[2rem] border border-slate-100 p-6 shadow-xl shadow-slate-200/40">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Query Node..." 
            className="w-full h-14 pl-6 pr-12 bg-slate-50 border-none rounded-full text-[11px] font-black uppercase tracking-widest outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-slate-300"
          />
          <button className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors">
            <Search size={18} strokeWidth={3} />
          </button>
        </div>
      </div>

      {/* Categories Widget */}
      <div className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-xl shadow-slate-200/40">
        <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.3em] mb-8 pb-4 border-b border-slate-50">
          Knowledge Vectors
        </h3>
        <ul className="space-y-4">
          {categories.map((category) => (
            <li key={category.label}>
              <Link 
                href={`/blog?category=${category.label}`}
                className="group flex items-center justify-between text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] hover:text-primary transition-all underline-offset-8"
              >
                <span className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-100 group-hover:bg-primary group-hover:scale-125 transition-all" />
                  {category.label}
                </span>
                <span className="text-[9px] opacity-40">
                  {category.count.toString().padStart(2, '0')}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Popular Posts Widget */}
      <div className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-xl shadow-slate-200/40">
        <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.3em] mb-8 pb-4 border-b border-slate-50">
          High Performance
        </h3>
        <div className="space-y-8">
          {popularPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group flex gap-4 items-center">
              <div className="relative w-16 h-16 rounded-2xl overflow-hidden shrink-0 bg-slate-50 border border-slate-100">
                <Image 
                  src={post.thumbnail} 
                  alt={post.title} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-700" 
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-black text-slate-900 line-clamp-2 leading-tight group-hover:text-primary transition-colors tracking-tight italic">
                  {post.title}
                </h4>
                <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest mt-2">
                  {new Date(post.publishedAt).toLocaleDateString('en-IN', {
                    month: 'short', day: '2-digit'
                  })}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Newsletter Widget */}
      <div className="bg-slate-900 text-white rounded-[2.5rem] p-10 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12 blur-2xl" />
        
        <div className="relative z-10">
          <div className="text-[8px] font-black uppercase tracking-[0.4em] text-primary mb-6 italic flex items-center gap-3">
             <span className="w-6 h-[1px] bg-primary" /> Feed Subscription
          </div>
          <h3 className="text-2xl font-black mb-4 tracking-tighter leading-none italic">Sync your performance.</h3>
          <p className="text-[10px] text-slate-400 font-bold mb-8 uppercase tracking-widest leading-loose">
            High-fidelity updates delivered to your primary node.
          </p>
          <form onSubmit={(e) => { e.preventDefault(); alert("Mock Subscribe!") }}>
            <div className="space-y-3">
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                className="w-full h-12 px-6 rounded-full bg-white/5 border border-white/10 text-[10px] font-black text-white placeholder:text-white/20 outline-none focus:bg-white/10 focus:border-primary/50 transition-all tracking-widest"
                required
              />
              <button 
                type="submit" 
                className="w-full h-12 bg-white text-slate-900 text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-primary hover:text-white transition-all duration-500 shadow-xl"
              >
                Initialize Sync
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
