'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent, type MotionValue } from 'framer-motion'
import { SignalMark } from '@/components/ui/SignalMark'
import { useMotionPreference } from '@/components/providers/MotionProvider'
import { EASE } from '@/lib/tokens'

/**
 * StoryExperience — a single scroll-driven journey across four scenes,
 * answering one question: "How does CNVRTED turn internet activity into
 * qualified sales opportunities?"
 *
 *   Scene 1  Internet is Alive     — 8 sources fire independently, unconnected
 *   Scene 2  CNVRTED Watches       — sources converge into one AI engine
 *   Scene 3  Intelligence          — engine resolves into a structured profile
 *   Scene 4  Revenue               — profile becomes a five-step action chain
 *
 * Everything is a pure function of one scroll progress value (0→1) mapped
 * across a tall (500vh) pinned section — no timers, no independent state
 * machine. Scenes crossfade (overlapping in/out ranges) instead of cutting.
 */

const SOURCES = [
  { key: 'linkedin', label: 'LinkedIn', dx: -0.34, dy: -0.32 },
  { key: 'reddit', label: 'Reddit', dx: 0.1, dy: -0.4 },
  { key: 'websites', label: 'Company Websites', dx: 0.36, dy: -0.22 },
  { key: 'funding', label: 'Funding News', dx: 0.4, dy: 0.14 },
  { key: 'jobs', label: 'Job Boards', dx: 0.14, dy: 0.4 },
  { key: 'techstack', label: 'Tech Stack Changes', dx: -0.16, dy: 0.4 },
  { key: 'press', label: 'Press Releases', dx: -0.4, dy: 0.16 },
  { key: 'launches', label: 'Product Launches', dx: -0.38, dy: -0.06 },
] as const

const PROFILE_FIELDS = [
  { label: 'Company', value: 'Acme Corp' },
  { label: 'Funding', value: '$25M Series B' },
  { label: 'Hiring', value: '12 open roles' },
  { label: 'Leadership', value: 'New VP Sales' },
  { label: 'Tech Stack', value: 'Salesforce, AWS' },
  { label: 'Website', value: 'Pricing page updated' },
] as const

const REVENUE_STEPS = ['Intent Score', 'AI Summary', 'Personalized Outreach', 'CRM', 'Qualified Opportunity'] as const

// ─── Scene boundaries (with overlap so scenes crossfade, not cut) ───────────
const S1 = { in: 0, full: 0, out: 0.2, gone: 0.27 }
const S2 = { in: 0.2, full: 0.27, out: 0.45, gone: 0.52 }
const S3 = { in: 0.45, full: 0.52, out: 0.74, gone: 0.8 }
const S4 = { in: 0.74, full: 0.8, out: 1, gone: 1 }

interface SourceNodeProps {
  source: (typeof SOURCES)[number]
  sceneOpacity: MotionValue<number>
  convergeT: MotionValue<number>
  reducedMotion: boolean
}

function SourceNode({ source, sceneOpacity, convergeT, reducedMotion }: SourceNodeProps) {
  // Position: scattered (own quadrant, % of stage) -> center, driven by convergeT.
  const left = useTransform(convergeT, (t) => `${(50 + source.dx * 100 * (1 - t))}%`)
  const top = useTransform(convergeT, (t) => `${(50 + source.dy * 100 * (1 - t))}%`)
  const nodeOpacity = useTransform(convergeT, [0, 0.8, 1], [1, 1, 0])

  return (
    <motion.div
      style={{
        position: 'absolute',
        left,
        top,
        translateX: '-50%',
        translateY: '-50%',
        opacity: reducedMotion ? sceneOpacity : nodeOpacity,
      }}
      className="pointer-events-none"
    >
      <motion.div
        animate={reducedMotion ? undefined : { y: [0, -5, 0] }}
        transition={{ duration: 3.4 + Math.abs(source.dx) * 2, repeat: Infinity, ease: 'easeInOut' }}
        className="flex items-center gap-1.5 whitespace-nowrap rounded-full border border-border bg-surface-raised px-3 py-1.5"
      >
        <SignalMark size={10} className="text-accent" pulse={!reducedMotion} />
        <span className="text-[11px] font-medium text-text-secondary">{source.label}</span>
      </motion.div>
    </motion.div>
  )
}

interface ProfileFieldRowProps {
  field: (typeof PROFILE_FIELDS)[number]
  index: number
  s3Local: MotionValue<number>
}

function ProfileFieldRow({ field, index, s3Local }: ProfileFieldRowProps) {
  const opacity = useTransform(s3Local, [0.1 + index * 0.09, 0.19 + index * 0.09], [0, 1])
  const y = useTransform(s3Local, [0.1 + index * 0.09, 0.19 + index * 0.09], [8, 0])
  return (
    <motion.div style={{ opacity, y }} className="flex items-center justify-between border-b border-border/60 py-2 last:border-0">
      <span className="text-[11px] text-text-tertiary">{field.label}</span>
      <span className="text-[12px] font-medium text-text-secondary">{field.value}</span>
    </motion.div>
  )
}

interface RevenueStepProps {
  step: (typeof REVENUE_STEPS)[number]
  index: number
  s4Local: MotionValue<number>
}

function RevenueStep({ step, index, s4Local }: RevenueStepProps) {
  const thresholdMV = useTransform(s4Local, (t) => t >= (index + 0.5) / REVENUE_STEPS.length)
  const [active, setActive] = useState(false)
  useMotionValueEvent(thresholdMV, 'change', (v) => setActive(v))

  return (
    <div className="flex flex-1 flex-col items-center gap-2 text-center">
      <span
        className="h-3 w-3 rounded-full border transition-colors duration-300"
        style={{
          borderColor: active ? 'var(--color-accent)' : 'var(--color-border)',
          backgroundColor: active ? 'var(--color-accent)' : 'var(--color-surface-raised)',
        }}
      />
      <span
        className="text-[11px] font-medium leading-tight transition-colors duration-300"
        style={{ color: active ? 'var(--color-text-primary)' : 'var(--color-text-tertiary)' }}
      >
        {step}
      </span>
    </div>
  )
}

export function StoryExperience() {
  const reducedMotion = useMotionPreference()
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })

  // ── Per-scene opacity (crossfading, not cutting) ──
  const scene1 = useTransform(scrollYProgress, [S1.in, S1.full, S1.out, S1.gone], [1, 1, 1, 0])
  const scene2 = useTransform(scrollYProgress, [S2.in, S2.full, S2.out, S2.gone], [0, 1, 1, 0])
  const scene3 = useTransform(scrollYProgress, [S3.in, S3.full, S3.out, S3.gone], [0, 1, 1, 0])
  const scene4 = useTransform(scrollYProgress, [S4.in, S4.full, S4.out, S4.gone], [0, 1, 1, 1])

  // Scene 2 local progress: convergence of source nodes toward the engine
  const convergeT = useTransform(scrollYProgress, [S2.in, S2.out], [0, 1], { clamp: true })
  const engineOpacity = useTransform(convergeT, [0.5, 0.9], [0, 1])
  const engineScale = useTransform(convergeT, [0.5, 1], [0.75, 1])

  // Scene 3 local progress: profile assembly + score count
  const s3Local = useTransform(scrollYProgress, [S3.in, S3.out], [0, 1], { clamp: true })
  const scoreMV = useTransform(s3Local, [0.65, 0.95], [0, 92])
  const [scoreDisplay, setScoreDisplay] = useState(0)
  useMotionValueEvent(scoreMV, 'change', (v) => setScoreDisplay(Math.round(v)))

  // Scene 4 local progress: revenue chain + connecting line
  const s4Local = useTransform(scrollYProgress, [S4.in, 1], [0, 1], { clamp: true })
  const lineScale = useTransform(s4Local, [0.05, 0.95], [0, 1])

  // Idle autoplay: before the user has scrolled into the section, gently
  // cycle scene 1's source pulses so the page feels alive immediately —
  // purely decorative (opacity is still scroll-driven), stops once scrolled.
  const [autoplayTick, setAutoplayTick] = useState(0)
  useEffect(() => {
    if (reducedMotion) return
    const id = setInterval(() => setAutoplayTick((t) => (t + 1) % SOURCES.length), 900)
    return () => clearInterval(id)
  }, [reducedMotion])

  if (reducedMotion) {
    return (
      <section aria-label="How CNVRTED works" className="relative bg-background py-24">
        <div className="mx-auto flex w-full max-w-[640px] flex-col items-center gap-6 px-[5%] text-center">
          <p className="text-caption font-mono uppercase tracking-[0.08em] text-accent">The story</p>
          <h2 className="text-h1-fluid text-text-primary">Internet activity, turned into revenue.</h2>
          <p className="text-body text-text-secondary leading-relaxed">
            CNVRTED continuously watches LinkedIn, Reddit, company websites, funding news, job boards, tech stack
            changes, press releases, and product launches — merging every signal into one enriched, scored company
            profile, then pushing it straight into outreach and your CRM as a qualified opportunity.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section ref={sectionRef} aria-label="How CNVRTED works" className="relative h-[500vh]">
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-background">

        {/* Ambient glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 50% 50%, var(--color-accent-dim), transparent 65%)' }}
        />

        {/* ── Scene 1 — The internet is alive ── */}
        <motion.div style={{ opacity: scene1 }} className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="mb-10 text-center text-[13px] font-mono uppercase tracking-[0.12em] text-text-tertiary">
            The internet never stops.
          </p>
          <div className="relative h-[70vmin] w-[70vmin] max-h-[560px] max-w-[560px]">
            {SOURCES.map((s, i) => (
              <motion.div
                key={s.key}
                style={{
                  position: 'absolute',
                  left: `${50 + s.dx * 100}%`,
                  top: `${50 + s.dy * 100}%`,
                  translateX: '-50%',
                  translateY: '-50%',
                }}
                animate={{
                  opacity: autoplayTick === i ? 1 : 0.55,
                  scale: autoplayTick === i ? 1.06 : 1,
                }}
                transition={{ duration: 0.5, ease: EASE.default }}
              >
                <div className="flex items-center gap-1.5 whitespace-nowrap rounded-full border border-border bg-surface-raised px-3 py-1.5">
                  <SignalMark size={10} className="text-accent" />
                  <span className="text-[11px] font-medium text-text-secondary">{s.label}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Scene 2 — CNVRTED watches everything ── */}
        <motion.div style={{ opacity: scene2 }} className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="absolute top-[18%] text-center text-[13px] font-mono uppercase tracking-[0.12em] text-text-tertiary">
            CNVRTED watches every signal, everywhere.
          </p>
          <div className="relative h-[70vmin] w-[70vmin] max-h-[560px] max-w-[560px]">
            {SOURCES.map((s) => (
              <SourceNode key={s.key} source={s} sceneOpacity={scene2} convergeT={convergeT} reducedMotion={false} />
            ))}
            {/* Engine */}
            <motion.div
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                translateX: '-50%',
                translateY: '-50%',
                opacity: engineOpacity,
                scale: engineScale,
              }}
              className="flex flex-col items-center"
            >
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-accent/40">
                <motion.div
                  className="absolute inset-0 rounded-full border border-dashed border-accent/30"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
                />
                <SignalMark size={30} className="text-accent" />
              </div>
              <p className="mt-3 text-[11px] font-mono uppercase tracking-widest text-text-tertiary">CNVRTED AI</p>
            </motion.div>
          </div>
        </motion.div>

        {/* ── Scene 3 — Intelligence ── */}
        <motion.div style={{ opacity: scene3 }} className="absolute inset-0 flex flex-col items-center justify-center px-6">
          <p className="absolute top-[18%] text-center text-[13px] font-mono uppercase tracking-[0.12em] text-text-tertiary">
            Noise becomes intelligence.
          </p>
          <div className="w-full max-w-[360px] rounded-xl border border-accent/40 bg-surface-raised p-5">
            <div className="mb-1 flex items-center justify-between border-b border-border pb-3">
              <span className="text-body font-semibold text-text-primary">Acme Corp</span>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-md bg-accent px-2 py-0.5 text-[9px] font-mono text-on-accent">
                  <SignalMark size={8} />
                  HIGH INTENT
                </span>
                <span className="text-lg font-bold tabular-nums text-text-primary">{scoreDisplay}</span>
              </div>
            </div>
            {PROFILE_FIELDS.map((field, i) => (
              <ProfileFieldRow key={field.label} field={field} index={i} s3Local={s3Local} />
            ))}
          </div>
        </motion.div>

        {/* ── Scene 4 — Revenue ── */}
        <motion.div style={{ opacity: scene4 }} className="absolute inset-0 flex flex-col items-center justify-center px-6">
          <p className="absolute top-[18%] text-center text-[13px] font-mono uppercase tracking-[0.12em] text-text-tertiary">
            Internet activity, turned into revenue.
          </p>
          <div className="relative flex w-full max-w-[720px] items-start">
            <div className="absolute left-[6%] right-[6%] top-1.5 h-px bg-border" />
            <motion.div
              className="absolute left-[6%] top-1.5 h-px origin-left bg-accent"
              style={{ scaleX: lineScale, width: '88%' }}
            />
            {REVENUE_STEPS.map((step, i) => (
              <RevenueStep key={step} step={step} index={i} s4Local={s4Local} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
