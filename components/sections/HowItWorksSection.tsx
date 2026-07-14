'use client'

import { motion } from 'framer-motion'
import { GlobeHemisphereWest, Funnel, ChartBar, Target } from '@phosphor-icons/react'
import { HOW_IT_WORKS } from '@/content/copy'
import { DURATION, EASE } from '@/lib/tokens'

const ICONS = [GlobeHemisphereWest, Funnel, ChartBar, Target]

const STEP_COLOURS = ['var(--color-accent)', 'var(--color-accent)', 'var(--color-accent)', 'var(--color-accent)']

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      data-theme="dark"
      className="bg-background py-20 md:py-28"
      aria-label="How it works"
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-10 lg:px-20">

        {/* Header */}
        <div className="mb-14 md:mb-16 text-center">
          <p className="text-caption font-mono text-text-tertiary uppercase tracking-[0.08em] mb-4">
            {HOW_IT_WORKS.label}
          </p>
          <h2 className="text-h1-fluid text-text-primary mx-auto" style={{ whiteSpace: 'pre-line' }}>
            {HOW_IT_WORKS.headline}
          </h2>
        </div>

        {/* Steps grid */}
        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

          {/* Dotted connector line — desktop only */}
          <div
            className="absolute hidden lg:block top-9 left-[12.5%] right-[12.5%] h-px"
            style={{ borderTop: '1.5px dashed #1A3A3D', zIndex: 0 }}
            aria-hidden="true"
          />

          {HOW_IT_WORKS.steps.map((step, i) => {
            const Icon = ICONS[i]
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: DURATION.base, delay: i * 0.1, ease: EASE.default }}
                whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(0,0,0,0.3)' }}
                className="relative z-10 rounded-lg border border-border bg-surface p-6 flex flex-col gap-4 cursor-default transition-shadow"
              >
                {/* Step number circle */}
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-body font-semibold text-on-accent shrink-0"
                  style={{ background: STEP_COLOURS[i] }}
                >
                  {step.number}
                </div>

                {/* Icon */}
                <Icon size={28} weight="regular" className="text-text-secondary" />

                {/* Text */}
                <div className="flex flex-col gap-2 mt-auto">
                  <h3 className="text-h3 font-medium text-text-primary">{step.label}</h3>
                  <p className="text-body text-text-secondary leading-relaxed">{step.body}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
