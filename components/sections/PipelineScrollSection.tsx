'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent, type MotionValue } from 'framer-motion'
import { useMotionPreference } from '@/components/providers/MotionProvider'

/**
 * The pipeline payoff (Score → Summary → Outreach → CRM → Pipeline Created),
 * as its own scroll-scrubbed section: the card stays pinned while the user
 * scrolls through a tall wrapper, and each step lights up in turn as they
 * scroll — not on a timer. Sits below the auto-looping hero story.
 */

const PIPELINE_STEPS = ['Intent Score', 'AI Summary', 'Personalized Outreach', 'CRM', 'Pipeline Created'] as const

function SalesforceMark() {
  return (
    <svg viewBox="0 0 24 17" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ height: 14, width: 'auto', display: 'block' }}>
      <path
        fill="#00A1E0"
        d="M10 1.8a5.1 5.1 0 0 1 3.1-.9c1.6 0 3 .9 3.7 2.1a5.3 5.3 0 0 1 2.1-.4c2.9 0 5.3 2.4 5.3 5.3s-2.4 5.3-5.3 5.3c-.3 0-.7 0-1-.1a3.3 3.3 0 0 1-3.3 1.9 3.3 3.3 0 0 1-1.6-.4 3.8 3.8 0 0 1-3.8 2.4 3.9 3.9 0 0 1-3.9-2.6H5a5.3 5.3 0 0 1 0-10.6c.6 0 1.1.1 1.6.3A4.6 4.6 0 0 1 10 1.8z"
      />
    </svg>
  )
}

function HubSpotMark() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ height: 14, width: 14, display: 'block' }}>
      <path
        fill="#FF7A59"
        d="M18.164 7.93V5.084a2.198 2.198 0 0 0 1.267-1.978v-.067A2.2 2.2 0 0 0 17.238.84h-.067a2.2 2.2 0 0 0-2.193 2.199v.067c0 .854.463 1.601 1.153 2.001v2.822a6.239 6.239 0 0 0-3.05 1.34l-8.06-6.276c.052-.192.09-.39.093-.598A2.462 2.462 0 1 0 2.65 4.858c.542 0 1.037-.17 1.456-.446l7.93 6.176a6.246 6.246 0 0 0-.093 1.064c0 1.008.294 1.947.793 2.747l-2.414 2.414a2.02 2.02 0 0 0-.593-.098 2.033 2.033 0 1 0 2.033 2.033c0-.206-.036-.402-.093-.593l2.388-2.388a6.279 6.279 0 1 0 8.622-9.09c-.855-.53-1.847-.85-2.909-.912ZM17.203 18.29a3.617 3.617 0 1 1 0-7.234 3.617 3.617 0 0 1 0 7.234Z"
      />
    </svg>
  )
}

interface PipelineStepRowProps {
  step: (typeof PIPELINE_STEPS)[number]
  index: number
  pipelineT: MotionValue<number>
  staticFinal: boolean
}

function PipelineStepRow({ step, index, pipelineT, staticFinal }: PipelineStepRowProps) {
  const stepActive = useTransform(pipelineT, (t) => t >= (index + 0.5) / PIPELINE_STEPS.length)
  const [active, setActive] = useState(staticFinal)
  useMotionValueEvent(stepActive, 'change', (v) => {
    if (!staticFinal) setActive(v)
  })

  const isActive = staticFinal || active

  return (
    <div className="relative flex flex-1 flex-col items-center gap-3 px-2 text-center">
      <span
        className="relative z-10 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors duration-300"
        style={{
          borderColor: isActive ? 'var(--color-accent)' : 'var(--color-border)',
          backgroundColor: isActive ? 'var(--color-accent)' : 'var(--color-surface-raised)',
        }}
      />
      <span
        className="flex flex-col items-center gap-1.5 text-body font-medium transition-colors duration-300"
        style={{ color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-tertiary)' }}
      >
        {step === 'CRM' && (
          <span className="flex items-center gap-1.5">
            <SalesforceMark />
            <HubSpotMark />
          </span>
        )}
        {step}
      </span>
    </div>
  )
}

export function PipelineScrollSection() {
  const reducedMotion = useMotionPreference()
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  const lineScale = useTransform(scrollYProgress, [0.05, 0.95], [0, 1])

  if (reducedMotion) {
    return (
      <section aria-label="From score to pipeline" className="relative bg-background py-5xl">
        <div className="relative mx-auto flex w-full items-start px-6 md:px-16 lg:px-32 xl:px-48">
          <div className="absolute left-6 right-6 top-2 h-px bg-border md:left-16 md:right-16 lg:left-32 lg:right-32 xl:left-48 xl:right-48" />
          {PIPELINE_STEPS.map((step, i) => (
            <PipelineStepRow key={step} step={step} index={i} pipelineT={scrollYProgress} staticFinal />
          ))}
        </div>
      </section>
    )
  }

  return (
    <section ref={sectionRef} aria-label="From score to pipeline" className="relative h-[250vh]">
      <div className="sticky top-0 flex h-[100svh] w-full items-center justify-center overflow-hidden bg-background">
        <div className="relative mx-auto flex w-full items-start px-6 md:px-16 lg:px-32 xl:px-48">
          <div className="absolute left-6 right-6 top-2 h-px bg-border md:left-16 md:right-16 lg:left-32 lg:right-32 xl:left-48 xl:right-48">
            <motion.div className="h-full origin-left bg-accent" style={{ width: '100%', scaleX: lineScale }} />
          </div>

          {PIPELINE_STEPS.map((step, i) => (
            <PipelineStepRow key={step} step={step} index={i} pipelineT={scrollYProgress} staticFinal={false} />
          ))}
        </div>
      </div>
    </section>
  )
}
