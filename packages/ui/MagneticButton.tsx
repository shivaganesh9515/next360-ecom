"use client"

import { useEffect, useRef, ReactNode, ButtonHTMLAttributes } from "react"
import { cn } from "@next360/utils"

interface MagneticButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  strength?: number
  className?: string
}

/**
 * GSAP magnetic button — cursor tracking with spring-back.
 * Use only on primary CTAs (Add to Cart, Checkout, Shop Now).
 * Strength: 0.3 (subtle) → 0.8 (strong)
 */
export function MagneticButton({
  children,
  strength = 0.4,
  className,
  ...props
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const el = buttonRef.current
    if (!el) return

    // Respect reduced motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let gsapInstance: any = null

    const loadGsap = async () => {
      const { gsap } = await import("gsap")
      gsapInstance = gsap

      const handleMouseMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2

        gsap.to(el, {
          x: x * strength,
          y: y * strength,
          duration: 0.3,
          ease: "power2.out",
        })
      }

      const handleMouseLeave = () => {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "elastic.out(1, 0.4)",
        })
      }

      el.addEventListener("mousemove", handleMouseMove)
      el.addEventListener("mouseleave", handleMouseLeave)

      return () => {
        el.removeEventListener("mousemove", handleMouseMove)
        el.removeEventListener("mouseleave", handleMouseLeave)
      }
    }

    let cleanup: (() => void) | undefined
    loadGsap().then((c) => { cleanup = c })

    return () => {
      cleanup?.()
      if (gsapInstance && el) {
        gsapInstance.killTweensOf(el)
        gsapInstance.set(el, { x: 0, y: 0 })
      }
    }
  }, [strength])

  return (
    <button
      ref={buttonRef}
      className={cn("will-change-transform", className)}
      {...props}
    >
      {children}
    </button>
  )
}

export default MagneticButton
