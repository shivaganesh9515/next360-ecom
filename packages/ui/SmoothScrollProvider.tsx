"use client"

import { useEffect, useRef, ReactNode } from "react"
import Lenis from "lenis"

interface SmoothScrollProviderProps {
  children: ReactNode
}

/**
 * Lenis smooth scroll provider integrated with GSAP ScrollTrigger.
 * Single instance per app — wrap the root layout.
 * Automatically destroyed on unmount.
 */
export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Dynamically import GSAP to avoid SSR issues
    let rafId: number
    let gsapScrollTrigger: any = null

    const init = async () => {
      const lenis = new Lenis({
        duration: 1.4,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        smoothWheel: true,
      })

      lenisRef.current = lenis

      // Try to integrate with GSAP ScrollTrigger if available
      try {
        const { gsap } = await import("gsap")
        const { ScrollTrigger } = await import("gsap/ScrollTrigger")
        gsap.registerPlugin(ScrollTrigger)

        lenis.on("scroll", ScrollTrigger.update)
        gsap.ticker.add((time: number) => lenis.raf(time * 1000))
        gsap.ticker.lagSmoothing(0)
        gsapScrollTrigger = ScrollTrigger
      } catch {
        // GSAP not available — RAF loop fallback
        function raf(time: number) {
          lenis.raf(time)
          rafId = requestAnimationFrame(raf)
        }
        rafId = requestAnimationFrame(raf)
      }
    }

    init()

    return () => {
      lenisRef.current?.destroy()
      lenisRef.current = null
      if (rafId) cancelAnimationFrame(rafId)
      if (gsapScrollTrigger) {
        gsapScrollTrigger.killAll?.()
      }
    }
  }, [])

  return <>{children}</>
}

export default SmoothScrollProvider
