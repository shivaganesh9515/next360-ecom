"use client"

import { motion, HTMLMotionProps } from "framer-motion"
import { cn } from "@next360/utils"
import { ReactNode } from "react"

interface GlassCardProps {
  children: ReactNode
  className?: string
  glow?: boolean
  hover?: boolean
  tone?: "dark" | "light"
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
  tone = "light",
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
        "relative rounded-2xl overflow-hidden",
        "backdrop-blur-[20px] saturate-[180%]",
        tone === "dark"
          ? "border border-white/[0.08] text-white shadow-[0_20px_50px_rgba(0,0,0,0.45)]"
          : "border border-black/5 text-[var(--color-text)] shadow-[0_20px_50px_rgba(24,36,27,0.08)]",
        glow && hover
          ? "hover:shadow-[0_20px_50px_rgba(24,36,27,0.12),0_0_40px_rgba(76,175,125,0.18)]"
          : glow
          ? "shadow-[0_20px_50px_rgba(24,36,27,0.12),0_0_40px_rgba(76,175,125,0.12)]"
          : "",
        "transition-shadow duration-300",
        className
      )}
      style={{
        background: tone === "dark" ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.78)",
      }}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0",
          tone === "dark"
            ? "bg-[radial-gradient(circle_at_top_left,rgba(124,179,66,0.12),transparent_36%),linear-gradient(180deg,rgba(255,255,255,0.06),transparent_45%)]"
            : "bg-[radial-gradient(circle_at_top_left,rgba(124,179,66,0.14),transparent_36%),linear-gradient(180deg,rgba(255,255,255,0.72),rgba(255,255,255,0.08))]"
        )}
      />
      {children}
    </motion.div>
  )
}

export default GlassCard
