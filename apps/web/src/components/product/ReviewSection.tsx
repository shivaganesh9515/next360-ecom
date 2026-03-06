"use client"

import React from 'react'
import { Star, CheckCircle2, ThumbsUp } from 'lucide-react'
import { Avatar, Badge } from '@next360/ui'
import { cn } from '@next360/utils'

interface Review {
  id: string
  userName: string
  rating: number
  comment: string
  date: string
  isVerified: boolean
  likes: number
}

interface ReviewSectionProps {
  rating: number
  count: number
  reviews: Review[]
  isLoading?: boolean
}

export default function ReviewSection({ rating, count, reviews, isLoading }: ReviewSectionProps) {
  const ratingBreakdown = [
    { stars: 5, count: Math.round(count * 0.7) },
    { stars: 4, count: Math.round(count * 0.2) },
    { stars: 3, count: Math.round(count * 0.05) },
    { stars: 2, count: Math.round(count * 0.03) },
    { stars: 1, count: Math.round(count * 0.02) },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      {/* Rating Summary */}
      <div className="lg:col-span-4 lg:sticky lg:top-24 h-fit">
        <div className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm">
          <div className="text-center mb-8">
            <h3 className="text-6xl font-black text-slate-900 mb-2">{rating.toFixed(1)}</h3>
            <div className="flex justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={20} 
                  className={cn(
                    i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-slate-200"
                  )} 
                />
              ))}
            </div>
            <p className="text-slate-500 font-bold">Based on {count} reviews</p>
          </div>

          <div className="space-y-3">
            {ratingBreakdown.map((item) => (
              <div key={item.stars} className="flex items-center gap-4">
                <span className="text-sm font-bold text-slate-600 w-4">{item.stars}</span>
                <Star size={14} className="fill-yellow-400 text-yellow-400 shrink-0" />
                <div className="flex-1 h-2 bg-slate-50 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-yellow-400 rounded-full"
                    style={{ width: `${(item.count / count) * 100}%` }}
                  />
                </div>
                <span className="text-xs font-bold text-slate-400 w-8">{item.count}</span>
              </div>
            ))}
          </div>

          <button className="w-full mt-8 py-4 bg-primary text-white font-black rounded-2xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
            Write a Review
          </button>
        </div>
      </div>

      {/* Review List */}
      <div className="lg:col-span-8 space-y-8">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
          <h4 className="text-xl font-black text-slate-900">Customer Stories</h4>
          <select className="bg-transparent border-none text-sm font-bold text-primary focus:ring-0 cursor-pointer">
            <option>Most Recent</option>
            <option>Highest Rating</option>
            <option>Most Helpful</option>
          </select>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-slate-50 rounded-[2rem]">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-slate-500 font-bold">Gathering stories...</p>
          </div>
        ) : reviews.map((review) => (
          <div key={review.id} className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 hover:shadow-xl hover:shadow-primary/5 transition-all group">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex items-center md:items-start gap-4 shrink-0">
                <Avatar name={review.userName} size="lg" className="rounded-2xl" />
                <div className="md:hidden">
                  <p className="font-black text-slate-900">{review.userName}</p>
                  <p className="text-xs text-slate-400 font-bold">{review.date}</p>
                </div>
              </div>

              <div className="flex-1">
                <div className="hidden md:flex items-center justify-between mb-2">
                  <p className="text-lg font-black text-slate-900">{review.userName}</p>
                  <p className="text-xs text-slate-400 font-bold">{review.date}</p>
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={14} 
                        className={cn(
                          i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-slate-200"
                        )} 
                      />
                    ))}
                  </div>
                  {review.isVerified && (
                    <Badge className="bg-primary/5 text-primary border-none flex items-center gap-1 py-1">
                      <CheckCircle2 size={12} />
                      Verified Purchase
                    </Badge>
                  )}
                </div>

                <p className="text-slate-600 leading-relaxed font-medium mb-6">
                  {review.comment}
                </p>

                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-primary transition-colors">
                    <ThumbsUp size={14} />
                    Helpful ({review.likes})
                  </button>
                  <button className="text-xs font-bold text-slate-400 hover:text-primary transition-colors">
                    Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {reviews.length === 0 && (
          <div className="text-center py-20 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200">
            <p className="text-slate-400 font-bold">No reviews yet. Be the first to share your experience!</p>
          </div>
        )}
      </div>
    </div>
  )
}
