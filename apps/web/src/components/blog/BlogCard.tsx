import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '@next360/ui'
import { BlogPost } from '@next360/types'

interface BlogCardProps {
  post: BlogPost
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <div className="h-full bg-white rounded-[2.5rem] overflow-hidden border border-slate-50 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-700 flex flex-col hover:-translate-y-2">
        {/* Image Container */}
        <div className="relative aspect-video overflow-hidden bg-slate-50">
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          <div className="absolute top-6 right-6">
             <Badge className="bg-white/90 backdrop-blur-sm border-none shadow-xl text-slate-900 font-black px-4 py-1.5 uppercase tracking-widest text-[8px] rounded-full">
               {post.category}
             </Badge>
          </div>
        </div>

        {/* Content Container */}
        <div className="p-8 flex flex-col flex-grow">
          <div className="flex items-center gap-3 text-[8px] font-black text-primary uppercase tracking-[0.2em] mb-4">
             <span className="w-5 h-[2px] bg-primary" />
             Entry {post.id.slice(-4).toUpperCase()}
          </div>
          
          <h3 className="text-xl font-black text-slate-900 line-clamp-2 leading-tight group-hover:text-primary transition-all duration-300 tracking-tight italic mb-4">
            {post.title}
          </h3>
          
          <p className="text-sm text-slate-400 font-bold leading-relaxed line-clamp-3 mb-8 flex-grow">
            {post.excerpt}
          </p>

          <div className="mt-auto pt-8 border-t border-slate-50 flex items-center justify-between text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">
            <div className="flex items-center gap-2">
              <span className="text-slate-900">{post.readTime}</span>
              <span className="opacity-30">•</span>
              <span>
                {new Date(post.publishedAt).toLocaleDateString('en-IN', {
                  month: 'short', day: '2-digit'
                })}
              </span>
            </div>
            <div className="w-6 h-6 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500">
               +
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
