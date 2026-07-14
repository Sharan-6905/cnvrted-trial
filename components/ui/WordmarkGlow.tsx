'use client'

import { useEffect, useRef } from 'react'

interface WordmarkGlowProps {
  text: string
  className?: string
}

/**
 * Giant background wordmark: transparent-fill outline by default, with a
 * cursor-follow spotlight that solidifies the letters near the pointer.
 * The spotlight is a radial-gradient mask driven by --x/--y custom
 * properties updated via a single rAF-throttled pointermove listener —
 * no per-letter DOM/class churn. No-ops on touch/coarse-pointer devices.
 */
export function WordmarkGlow({ text, className = '' }: WordmarkGlowProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const spotRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const spot = spotRef.current
    if (!wrap || !spot) return

    if (!window.matchMedia('(pointer: fine)').matches) return

    let frame: number | null = null
    let pendingX = 0
    let pendingY = 0

    const apply = () => {
      spot.style.setProperty('--x', `${pendingX}px`)
      spot.style.setProperty('--y', `${pendingY}px`)
      frame = null
    }

    const onMove = (e: PointerEvent) => {
      // mask-image's `at var(--x) var(--y)` is positioned relative to the
      // masked element's own box (`spot`), not the wrapper — measure against it.
      const rect = spot.getBoundingClientRect()
      pendingX = e.clientX - rect.left
      pendingY = e.clientY - rect.top
      if (frame === null) frame = requestAnimationFrame(apply)
    }

    const onLeave = () => {
      pendingX = -9999
      pendingY = -9999
      if (frame === null) frame = requestAnimationFrame(apply)
    }

    wrap.addEventListener('pointermove', onMove)
    wrap.addEventListener('pointerleave', onLeave)
    return () => {
      wrap.removeEventListener('pointermove', onMove)
      wrap.removeEventListener('pointerleave', onLeave)
      if (frame !== null) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div ref={wrapRef} className={`wordmark-glow ${className}`} aria-hidden="true">
      <p className="wordmark-glow__base">{text}</p>
      <p ref={spotRef} className="wordmark-glow__spot">{text}</p>
    </div>
  )
}
