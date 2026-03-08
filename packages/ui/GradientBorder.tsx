"use client"

import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { ReactNode, useState } from "react"
import { cn } from "@next360/utils"

interface GradientBorderProps {
  children: ReactNode
  className?: string
  borderRadius?: string
  active?: boolean
}

/**
 * Animated rotating gradient border.
 * Colors: #1A3C2E → #4CAF7D → #1A3C2E
 * Use on: featured product cards, CTA sections.
 * Pass active=true to always show, or leave unset to show on hover.
 */
export function GradientBorder({
  children,
  className,
  borderRadius = "16px",
  active,
}: GradientBorderProps) {
  const [hovered, setHovered] = useState(false)
  const prefersReduced = useReducedMotion()
  const showBorder = active !== undefined ? active : hovered

  return (
    <div
      className={cn("relative", className)}
      style={{ borderRadius }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <AnimatePresence>
        {showBorder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-[-1px] -z-10 rounded-[inherit]"
            style={{
              background: prefersReduced
                ? "linear-gradient(135deg, #1A3C2E, #4CAF7D)"
                : undefined,
              borderRadius: `calc(${borderRadius} + 1px)`,
            }}
          >
            {!prefersReduced && (
              <motion.div
                className="absolute inset-0 rounded-[inherit]"
                style={{
                  background:
                    "conic-gradient(from 0deg, #1A3C2E, #4CAF7D, #1A3C2E)",
                  borderRadius: `calc(${borderRadius} + 1px)`,
                }}
                animate={{ rotate: 360 }}
                transition={{
                  duration: 3,
                  ease: "linear",
                  repeat: Infinity,
                }}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </div>
  )
}

export default GradientBorder
