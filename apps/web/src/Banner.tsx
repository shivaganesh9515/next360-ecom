// @ts-nocheck
'use client'
import React from 'react'
import toast from 'react-hot-toast';
import { X, Sparkles } from 'lucide-react';

export default function Banner() {
    const [isOpen, setIsOpen] = React.useState(true);

    const handleClaim = () => {
        setIsOpen(false);
        toast.success('Coupon "NEXT36020" copied to clipboard!');
        navigator.clipboard.writeText('NEXT36020');
    };

    return isOpen && (
        <div className="w-full px-4 py-2.5 text-sm text-[#1b4332] bg-gradient-to-r from-[#d8f3dc] via-[#b7e4c7] to-[#95d5b2] border-b border-[#a7d7c5]">
            <div className='gc-container flex items-center justify-between gap-4'>
                <p className="flex items-center gap-2 font-semibold">
                    <Sparkles size={14} />
                    Free delivery over $45 + 20% off your first order.
                </p>
                <div className="flex items-center gap-3">
                    <button onClick={handleClaim} type="button" className="hidden sm:inline-flex px-4 py-1.5 rounded-full text-xs font-bold bg-[#1b4332] text-white hover:bg-[#0d2b1f] transition-colors">
                        Copy Code
                    </button>
                    <button onClick={() => setIsOpen(false)} type="button" className="hover:bg-white/35 rounded-full p-1 transition-colors">
                        <X size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
}

