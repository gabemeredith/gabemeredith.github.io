"use client"

import { useCallback, useRef, useEffect, useState } from "react"

export function useTiltEffect(intensity = 8) {
  const [canHover, setCanHover] = useState(false)

  useEffect(() => {
    setCanHover(window.matchMedia("(hover: hover)").matches)
  }, [])

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (!canHover) return
      const el = e.currentTarget
      const rect = el.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
      el.style.transform = `perspective(800px) rotateY(${x * intensity}deg) rotateX(${-y * intensity}deg) translateY(-4px)`
      el.style.transition = "transform 0.1s ease-out"
    },
    [canHover, intensity]
  )

  const onMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (!canHover) return
      const el = e.currentTarget
      el.style.transform = ""
      el.style.transition = "transform 0.5s ease-out"
    },
    [canHover]
  )

  return { onMouseMove, onMouseLeave }
}

export function useMagneticEffect(strength = 0.15) {
  const [canHover, setCanHover] = useState(false)

  useEffect(() => {
    setCanHover(window.matchMedia("(hover: hover)").matches)
  }, [])

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (!canHover) return
      const el = e.currentTarget
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left - rect.width / 2) * strength
      const y = (e.clientY - rect.top - rect.height / 2) * strength
      el.style.transform = `translate(${x}px, ${y}px)`
      el.style.transition = "transform 0.2s ease-out"
    },
    [canHover, strength]
  )

  const onMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (!canHover) return
      const el = e.currentTarget
      el.style.transform = ""
      el.style.transition = "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)"
    },
    [canHover]
  )

  return { onMouseMove, onMouseLeave }
}
