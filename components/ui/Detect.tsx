'use client'

/**
 * Detect — CNVRTED's motion signature: the one animation reused every time
 * something is "detected" or "scored" (card entrance, demo result, a step
 * activating). A brief pulse-ring burst plus fade/rise, under 500ms, same
 * easing everywhere — never gates content, only announces it.
 */
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { useMotionPreference } from '@/components/providers/MotionProvider'

const DETECT_EASE = [0.16, 1, 0.3, 1] as const
const DETECT_DURATION = 0.45

interface DetectProps {
  children: ReactNode
  className?: string
  /** Delay in seconds, for staggering multiple Detect instances. */
  delay?: number
  /** Re-trigger the animation when this key changes (e.g. new demo result). */
  triggerKey?: string | number
}

export function Detect({ children, className = '', delay = 0, triggerKey }: DetectProps) {
  const reducedMotion = useMotionPreference()

  if (reducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      key={triggerKey}
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      animate={triggerKey !== undefined ? { opacity: 1, y: 0, scale: 1 } : undefined}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: DETECT_DURATION, delay, ease: DETECT_EASE }}
      className={`relative ${className}`}
    >
      {/* Pulse ring — a single quick burst, not a loop */}
      <motion.span
        aria-hidden="true"
        initial={{ opacity: 0.5, scale: 0.85 }}
        animate={{ opacity: 0, scale: 1.04 }}
        transition={{ duration: DETECT_DURATION, delay, ease: DETECT_EASE }}
        className="pointer-events-none absolute inset-0 rounded-[inherit] border border-text-tertiary"
      />
      {children}
    </motion.div>
  )
}
