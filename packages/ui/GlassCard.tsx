"use client"

import { motion, HTMLMotionProps } from "framer-motion"
import { cn } from "@next360/utils"
import { ReactNode } from "react"

interface GlassCardProps {
  children: ReactNode
  className?: string
  glow?: boolean
  hover?: boolean
  as?: "div" | "section" | "article"
}

/**
 * Slick Glass System — iOS glassmorphism aesthetic
 * Dark base + green palette. The single source of truth for card styling.
 */
export function GlassCard({
  children,
  className,
  glow = false,
  hover = false,
}: GlassCardProps) {
  const motionProps: HTMLMotionProps<"div"> = hover
    ? {
        whileHover: { scale: 1.01, y: -2 },
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }
    : {}

  return (
    <motion.div
      {...motionProps}
      className={cn(
        // Slick Glass base
        "relative rounded-2xl overflow-hidden",
        "border border-white/[0.08]",
        "backdrop-blur-[20px] saturate-[180%]",
        // Shadow system
        "shadow-[0_8px_32px_rgba(0,0,0,0.4)]",
        // Custom inline styles handle the rgba background (Tailwind can't do this)
        glow && hover
          ? "hover:shadow-[0_8px_32px_rgba(0,0,0,0.4),0_0_40px_rgba(76,175,125,0.2)]"
          : glow
          ? "shadow-[0_8px_32px_rgba(0,0,0,0.4),0_0_40px_rgba(76,175,125,0.12)]"
          : "",
        "transition-shadow duration-300",
        className
      )}
      style={{
        background: "rgba(255,255,255,0.04)",
      }}
    >
      {children}
    </motion.div>
  )
}

export default GlassCard
