// @ts-nocheck
'use client'
import { StarIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const ProductCard = ({ product }) => {
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$'
    const rating = Math.round(product.rating.reduce((acc, curr) => acc + curr.rating, 0) / product.rating.length);

    return (
        <Link href={`/product/${product.id}`} className='group block rounded-[26px] border border-[#d6cebf] bg-[#faf8f3] p-3 sm:p-4 shadow-[0_14px_28px_rgba(44,36,24,0.08)] hover:-translate-y-1 hover:shadow-[0_24px_35px_rgba(44,36,24,0.16)] transition-all'>
            <div className='rounded-[20px] h-36 sm:h-44 bg-gradient-to-br from-[#f0f7f2] to-[#d8f3dc] flex items-center justify-center overflow-hidden'>
                <Image
                    width={500}
                    height={500}
                    className='max-h-28 sm:max-h-32 w-auto group-hover:scale-110 transition duration-300'
                    src={product.images[0]}
                    alt={product.name}
                />
            </div>

            <div className='pt-3 sm:pt-4'>
                <div className='flex items-start justify-between gap-3'>
                    <p className='text-sm sm:text-base font-extrabold text-[#2c2418] line-clamp-1'>{product.name}</p>
                    <p className='text-sm sm:text-base font-black text-[#2d6a4f] whitespace-nowrap'>{currency}{product.price}</p>
                </div>

                <div className='flex items-center gap-0.5 mt-2'>
                    {Array(5).fill('').map((_, index) => (
                        <StarIcon key={index} size={14} className='text-transparent' fill={rating >= index + 1 ? "#d4a03c" : "#d6cebf"} />
                    ))}
                    <span className='ml-1 text-xs text-[#8a7d6b] font-semibold'>({product.rating.length})</span>
                </div>
            </div>
        </Link>
    )
}

export default ProductCard

