"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@next360/utils"

interface AnimatedCounterProps {
  from?: number
  to: number
  duration?: number
  prefix?: string
  suffix?: string
  decimals?: number
  className?: string
}

/**
 * GSAP-powered animated counter.
 * Triggers when the element enters the viewport via IntersectionObserver.
 */
export function AnimatedCounter({
  from = 0,
  to,
  duration = 2,
  prefix = "",
  suffix = "",
  decimals = 0,
  className,
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(from)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || hasAnimated) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true)
            animateCount()
          }
        })
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [hasAnimated])

  const animateCount = async () => {
    try {
      const { gsap } = await import("gsap")
      const obj = { value: from }
      gsap.to(obj, {
        value: to,
        duration,
        ease: "power2.out",
        onUpdate: () => {
          setDisplayValue(obj.value)
        },
      })
    } catch {
      // Fallback: simple interval animation
      const steps = 60
      const increment = (to - from) / steps
      let current = from
      let step = 0
      const interval = setInterval(() => {
        step++
        current += increment
        setDisplayValue(current)
        if (step >= steps) {
          setDisplayValue(to)
          clearInterval(interval)
        }
      }, (duration * 1000) / steps)
    }
  }

  const formatted =
    decimals > 0
      ? displayValue.toLocaleString('en-IN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
      : Math.floor(displayValue).toLocaleString('en-IN')

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  )
}

export default AnimatedCounter

