"use client"

import { motion, Variants, useReducedMotion } from "framer-motion"
import { ReactNode } from "react"
import { cn } from "@next360/utils"

interface StaggerContainerProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
  triggerOnce?: boolean
  childClassName?: string
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const itemVariants: Variants = {
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
 * Framer Motion stagger container.
 * Wraps children — each child slides up + fades in on scroll enter.
 * Use on product grids, stat cards, feature lists.
 */
export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.08,
  triggerOnce = true,
  childClassName,
}: StaggerContainerProps) {
  const prefersReduced = useReducedMotion()

  if (prefersReduced) {
    return <div className={className}>{children}</div>
  }

  const customContainer: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: staggerDelay },
    },
  }

  return (
    <motion.div
      className={className}
      variants={customContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: triggerOnce, margin: "-50px" }}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div key={i} variants={itemVariants} className={childClassName}>
              {child}
            </motion.div>
          ))
        : <motion.div variants={itemVariants} className={childClassName}>{children}</motion.div>
      }
    </motion.div>
  )
}

export default StaggerContainer
