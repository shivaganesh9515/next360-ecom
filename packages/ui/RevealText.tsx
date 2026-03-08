"use client"

import { motion, Variants, useReducedMotion } from "framer-motion"
import { ElementType } from "react"
import { cn } from "@next360/utils"

interface RevealTextProps {
  text: string
  delay?: number
  className?: string
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span"
  wordClassName?: string
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
    },
  },
}

const wordVariants: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

/**
 * Framer Motion text reveal — splits into words and staggers each one up.
 * Use on hero headings, section titles, page headers.
 */
export function RevealText({
  text,
  delay = 0,
  className,
  as: Tag = "h2",
  wordClassName,
}: RevealTextProps) {
  const prefersReduced = useReducedMotion()
  const words = text.split(" ")

  if (prefersReduced) {
    return (
      <Tag className={className}>{text}</Tag>
    )
  }

  const MotionTag = motion[Tag as keyof typeof motion] as any

  return (
    <MotionTag
      className={cn("overflow-hidden", className)}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ delayChildren: delay }}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span
            variants={wordVariants}
            className={cn("inline-block", wordClassName)}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  )
}

export default RevealText
