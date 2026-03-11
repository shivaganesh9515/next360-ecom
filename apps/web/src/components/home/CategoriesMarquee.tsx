'use client'

import React from 'react';
import { motion } from 'framer-motion';

export const categories = [
  "Fruits", 
  "Vegetables", 
  "Dairy", 
  "Grains", 
  "Oils", 
  "Spices", 
  "Superfoods", 
  "Sweeteners"
];

const CategoriesMarquee = () => {
    return (
        <div className="overflow-hidden w-full relative max-w-[1700px] mx-auto select-none group mt-10 sm:mt-20 sm:mb-20 px-4 sm:px-10 z-0">
            <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />
            
            <motion.div 
              className="flex gap-4 w-max"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
            >
                {[...categories, ...categories, ...categories, ...categories, ...categories, ...categories].map((company, index) => (
                    <button key={index} className="px-5 py-2 whitespace-nowrap bg-gray-100 rounded-lg text-gray-500 text-xs sm:text-sm hover:bg-gray-600 hover:text-white active:scale-95 transition-all duration-300">
                        {company}
                    </button>
                ))}
            </motion.div>

            <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />
        </div>
    );
};

export default CategoriesMarquee;
