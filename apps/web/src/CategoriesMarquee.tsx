// @ts-nocheck
import { categories } from "@/assets/assets";

const CategoriesMarquee = () => {
    return (
        <div className="overflow-hidden w-full relative select-none group mt-8 sm:mt-12 rounded-3xl border border-[#d6cebf] bg-[#f5f0e8] p-3 sm:p-4">
            <div className="absolute left-0 top-0 h-full w-18 z-10 pointer-events-none bg-gradient-to-r from-[#f5f0e8] to-transparent" />
            <div className="flex min-w-[200%] animate-[marqueeScroll_14s_linear_infinite] sm:animate-[marqueeScroll_34s_linear_infinite] group-hover:[animation-play-state:paused] gap-3 sm:gap-4" >
                {[...categories, ...categories, ...categories, ...categories].map((item, index) => (
                    <button key={index} className="px-4 sm:px-5 py-2.5 rounded-full border border-[#d6cebf] bg-[#faf8f3] text-[#5c4e3c] text-xs sm:text-sm font-bold hover:bg-[#2d6a4f] hover:text-white transition-all duration-300">
                        {item}
                    </button>
                ))}
            </div>
            <div className="absolute right-0 top-0 h-full w-18 md:w-28 z-10 pointer-events-none bg-gradient-to-l from-[#f5f0e8] to-transparent" />
        </div>
    );
};

export default CategoriesMarquee;

