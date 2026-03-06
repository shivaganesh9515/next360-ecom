// @ts-nocheck
import React from 'react'
import Title from './Title'
import { ourSpecsData } from '@/assets/assets'

const OurSpecs = () => {
    return (
        <section className='gc-section'>
            <Title
                visibleButton={false}
                title='Why People Pick Next360'
                description='We combine curated products, fast fulfillment, and transparent pricing so every order feels easy and reliable.'
            />

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8 sm:mt-10'>
                {ourSpecsData.map((spec, index) => (
                    <div
                        className='relative rounded-[26px] border border-[#d6cebf] bg-[#f7f3ec] p-7 shadow-[0_16px_30px_rgba(44,36,24,0.06)]'
                        key={index}
                    >
                        <div className='inline-flex size-12 items-center justify-center rounded-2xl text-white mb-4 shadow-lg' style={{ backgroundColor: spec.accent }}>
                            <spec.icon size={22} />
                        </div>
                        <h3 className='text-[#2c2418] text-lg font-extrabold'>{spec.title}</h3>
                        <p className='text-sm text-[#5c4e3c] mt-2'>{spec.description}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default OurSpecs

