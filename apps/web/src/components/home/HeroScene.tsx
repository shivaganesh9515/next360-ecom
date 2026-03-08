"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

interface ParticleSystemProps {
  count: number
}

function ParticleSystem({ count }: ParticleSystemProps) {
  const meshRef = useRef<THREE.Points>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  const { viewport } = useThree()

  // Generate particle positions
  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const vel = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      pos[i3]     = (Math.random() - 0.5) * viewport.width * 1.5
      pos[i3 + 1] = (Math.random() - 0.5) * viewport.height * 1.5
      pos[i3 + 2] = (Math.random() - 0.5) * 5
      vel[i3]     = (Math.random() - 0.5) * 0.003
      vel[i3 + 1] = Math.random() * 0.005 + 0.002 // drift upward
      vel[i3 + 2] = 0
    }
    return [pos, vel]
  }, [count, viewport])

  // Track mouse position
  useFrame(({ mouse }) => {
    mouseRef.current = { x: mouse.x, y: mouse.y }
  })

  useFrame((_, delta) => {
    if (!meshRef.current) return
    const geo = meshRef.current.geometry
    const pos = geo.attributes.position.array as Float32Array
    const half = viewport.height * 0.75

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      pos[i3]     += velocities[i3] + mouseRef.current.x * 0.002
      pos[i3 + 1] += velocities[i3 + 1]
      pos[i3 + 2] += velocities[i3 + 2]

      // Reset particles that drift off screen
      if (pos[i3 + 1] > half) {
        pos[i3 + 1] = -half
        pos[i3]     = (Math.random() - 0.5) * viewport.width * 1.5
      }
    }

    geo.attributes.position.needsUpdate = true
    meshRef.current.rotation.y = mouseRef.current.x * 0.05
  })

  const bufferGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    return geo
  }, [positions])

  const material = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: 0x4caf7d,
        size: 0.06,
        transparent: true,
        opacity: 0.35,
        sizeAttenuation: true,
      }),
    []
  )

  return <points ref={meshRef} geometry={bufferGeo} material={material} />
}

interface HeroSceneProps {
  particleCount?: number
}

export default function HeroScene({ particleCount = 120 }: HeroSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
      }}
      dpr={Math.min(typeof window !== "undefined" ? window.devicePixelRatio : 1, 2)}
      gl={{ antialias: false, alpha: true }}
    >
      <ParticleSystem count={particleCount} />
    </Canvas>
  )
}
