"use client"

import { cn } from "@next360/utils"

interface ShimmerSkeletonProps {
  className?: string
  rounded?: "sm" | "md" | "lg" | "xl" | "2xl" | "full"
  height?: string
  width?: string
}

/**
 * Slick Glass shimmer skeleton — dark base with green-tinted moving shimmer.
 * Replaces all generic gray skeletons.
 */
export function ShimmerSkeleton({
  className,
  rounded = "xl",
  height,
  width,
}: ShimmerSkeletonProps) {
  const roundedMap = {
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    "2xl": "rounded-2xl",
    full: "rounded-full",
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        roundedMap[rounded],
        className
      )}
      style={{
        background: "rgba(26,60,46,0.3)",
        height,
        width,
      }}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(76,175,125,0.15) 50%, transparent 100%)",
          backgroundSize: "200% 100%",
          animation: "shimmer 1.5s ease-in-out infinite",
        }}
      />
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  )
}

export default ShimmerSkeleton
