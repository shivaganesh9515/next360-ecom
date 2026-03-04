// @ts-nocheck
'use client'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Title = ({ title, description, visibleButton = true, href = '' }) => {
    return (
        <div className='flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4'>
            <div>
                <h2 className='gc-display text-2xl sm:text-[30px] text-[#2c2418] leading-tight'>{title}</h2>
                <p className='text-sm sm:text-base text-[#5c4e3c] mt-2 max-w-2xl'>{description}</p>
            </div>

            {visibleButton && (
                <Link href={href} className='inline-flex w-fit items-center gap-2 rounded-full border border-[#d6cebf] px-5 py-2.5 text-sm font-bold text-[#5c4e3c] hover:text-[#2c2418] hover:border-[#2d6a4f] transition-colors'>
                    View more
                    <ArrowRight size={15} />
                </Link>
            )}
        </div>
    )
}

export default Title

