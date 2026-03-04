// @ts-nocheck
import React from 'react'
import Title from './Title'

const Newsletter = () => {
    return (
        <section className='gc-section mb-18'>
            <div className='rounded-[34px] border border-[#e9d2b4] bg-gradient-to-br from-[#fff2de] via-[#ffe3c0] to-[#ffd2a0] p-7 sm:p-12 shadow-[0_26px_55px_rgba(137,78,16,0.2)]'>
                <Title
                    title='Join the Snack Letter'
                    description='Weekly drops, exclusive bundles, and secret discount codes sent directly to your inbox.'
                    visibleButton={false}
                />

                <div className='mt-7 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-2 bg-white rounded-full p-2 border border-[#e9d2b4] shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]'>
                    <input
                        className='flex-1 px-4 sm:px-5 py-3 bg-transparent outline-none text-sm text-[#2b1a09] placeholder:text-[#a78868]'
                        type='email'
                        placeholder='Enter your email address'
                    />
                    <button className='rounded-full px-7 py-3 bg-[#2b1a09] text-white text-sm font-extrabold hover:bg-black transition-colors'>
                        Get Updates
                    </button>
                </div>
            </div>
        </section>
    )
}

export default Newsletter

