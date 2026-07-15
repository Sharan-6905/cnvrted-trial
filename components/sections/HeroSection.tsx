'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Container } from '@/components/layout/Container'
import { StoryVisual } from '@/components/sections/StoryVisual'
import { HERO, TRUST_BAR } from '@/content/copy'
import { DURATION, EASE, HERO_DELAYS } from '@/lib/tokens'
import { heroContainer, fadeInUp } from '@/lib/motion'

// ─── ScanningBadge ────────────────────────────────────────────────────────────
// Replaces the plain eyebrow line with a live-looking status pill: a pulsing
// dot plus the source currently being "scanned," cycling through the same
// sources shown in the radar visual — so the claim stays tied to what the
// visual actually depicts rather than inventing a new claim.

const SCAN_SOURCES = ['LinkedIn', 'Reddit', 'Job boards', 'Funding news', 'Websites', 'Tech stacks'] as const

function ScanningBadge() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % SCAN_SOURCES.length)
    }, 2200)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="inline-flex items-center gap-2.5 rounded-full border border-border bg-surface/60 py-1.5 pl-2.5 pr-3.5">
      <span className="relative flex h-1.5 w-1.5 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-text-primary/50" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-text-primary" />
      </span>
      <span className="text-caption font-mono text-text-tertiary uppercase tracking-label">
        Scanning
      </span>
      <span className="relative inline-block h-[1.1em] w-[7rem] overflow-hidden align-middle">
        <AnimatePresence mode="wait">
          <motion.span
            key={SCAN_SOURCES[index]}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: EASE.default }}
            className="absolute left-0 top-0 whitespace-nowrap text-caption font-mono text-text-primary"
          >
            {SCAN_SOURCES[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </div>
  )
}

// ─── HeroSection ──────────────────────────────────────────────────────────────
// Headline and subhead render immediately in the first viewport — no scroll-jack,
// no animation gate. A compact, fast auto-looping scan visual sits beside the
// text (below it on mobile). The pipeline timeline lives in its own normal
// section further down the page (see PipelineScrollSection in page.tsx).

export function HeroSection() {
  return (
    <section aria-label="Hero" className="relative overflow-hidden bg-background pt-32 pb-5xl md:pt-36">
      {/* Ambient depth — faint top glow + dot grid, matches the treatment used
          further down the page (PipelineScrollSection) so the hero doesn't
          read as a flatter, earlier-generation section than the rest of the site. */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.05),transparent_55%)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '28px 28px',
        }}
      />

      <Container className="relative z-10 w-full">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
          {/* Text — visible immediately, zero interaction required */}
          <motion.div
            variants={heroContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start gap-xl"
          >
            <motion.div
              variants={fadeInUp}
              transition={{ delay: HERO_DELAYS.eyebrow, duration: DURATION.base, ease: EASE.default }}
            >
              <ScanningBadge />
            </motion.div>

            <motion.h1
              id="hero-headline"
              variants={fadeInUp}
              transition={{ delay: HERO_DELAYS.headline, duration: DURATION.base, ease: EASE.default }}
              className="text-display-fluid font-bold text-text-primary tracking-tight"
              style={{ whiteSpace: 'pre-line', fontFamily: 'var(--font-poppins)' }}
            >
              {HERO.headline}
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              transition={{ delay: HERO_DELAYS.subheadline, duration: DURATION.base, ease: EASE.default }}
              className="text-body-lg leading-relaxed max-w-[560px]"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              <span className="text-text-primary font-medium">{HERO.whatItIs}</span>{' '}
              <span className="text-text-secondary">{HERO.goal}</span>
            </motion.p>

            <motion.p
              variants={fadeInUp}
              transition={{ delay: HERO_DELAYS.form, duration: DURATION.base, ease: EASE.default }}
              className="text-caption font-mono text-text-tertiary uppercase tracking-label"
            >
              {TRUST_BAR.roles.join('  ·  ')}
            </motion.p>
          </motion.div>

          {/* Compact auto-looping scan visual — sources converging into a signal.
              Corner-bracket treatment (CornerFrame's motif, applied inline here
              since the panel needs its own aspect ratio) instead of a plain
              rounded/bordered box, so it reads as "ours" rather than a generic card. */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: HERO_DELAYS.visual, duration: DURATION.slow, ease: EASE.default }}
            className="relative h-[340px] w-full overflow-hidden rounded-2xl bg-surface md:h-[460px] lg:-mr-[6%]"
          >
            <span className="absolute left-0 top-0 h-4 w-4 border-l-[1.5px] border-t-[1.5px] border-text-tertiary/60" aria-hidden="true" />
            <span className="absolute right-0 top-0 h-4 w-4 border-r-[1.5px] border-t-[1.5px] border-text-tertiary/60" aria-hidden="true" />
            <span className="absolute bottom-0 left-0 h-4 w-4 border-b-[1.5px] border-l-[1.5px] border-text-tertiary/60" aria-hidden="true" />
            <span className="absolute bottom-0 right-0 h-4 w-4 border-b-[1.5px] border-r-[1.5px] border-text-tertiary/60" aria-hidden="true" />

            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06),transparent_65%)]" />

            <StoryVisual compact className="h-full w-full" />
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
