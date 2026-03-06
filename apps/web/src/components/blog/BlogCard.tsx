import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '@next360/ui'
import { BlogPost } from '@/lib/mockBlog'

interface BlogCardProps {
  post: BlogPost
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <div className="h-full bg-white rounded-2xl overflow-hidden border border-border hover:shadow-card-hover transition-all duration-300 flex flex-col">
        {/* Image Container */}
        <div className="relative aspect-video overflow-hidden bg-slate-100">
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>

        {/* Content Container */}
        <div className="p-5 flex flex-col flex-grow">
          <div className="mb-3 flex items-center gap-2">
            <Badge variant="fresh" size="sm" className="font-bold text-[10px] uppercase tracking-wider bg-primary/10 text-primary border-none">
              {post.category}
            </Badge>
          </div>
          
          <h3 className="font-display text-lg font-bold text-slate-800 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
            {post.title}
          </h3>
          
          <p className="text-sm text-slate-500 line-clamp-2 mt-2 font-medium leading-relaxed flex-grow">
            {post.excerpt}
          </p>

          <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
            <span>
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                month: 'short', day: 'numeric', year: 'numeric'
              })}
            </span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
