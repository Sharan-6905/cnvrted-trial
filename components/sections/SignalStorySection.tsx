'use client'

/**
 * SignalStorySection — "How CNVRTED turns internet activity into qualified
 * sales opportunities," told in three continuous, scroll-scrubbed scenes:
 *
 *   1. The internet is alive     — signals appear across the open web
 *   2. CNVRTED watches everything — they converge on one intelligence engine
 *   3. Intelligence               — raw signals merge into a structured profile
 *
 * (Scene 4 — score → summary → outreach → CRM → pipeline — already exists as
 * PipelineScrollSection immediately below this on the page; this section
 * hands off to it rather than duplicating it.)
 *
 * Mechanically this follows the same sticky-pin pattern PipelineScrollSection
 * already established in this codebase (tall scroll track + `sticky top-0`
 * viewport + useScroll), but drives every element continuously off
 * `scrollYProgress` via useTransform instead of snapping between discrete
 * AnimatePresence steps — scrolling up/down scrubs the story smoothly in
 * either direction, with no hard cuts between scenes.
 */

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import {
  LinkedinLogo,
  RedditLogo,
  Globe,
  CurrencyDollar,
  Briefcase,
  ChartLineUp,
  Newspaper,
  Rocket,
} from '@phosphor-icons/react'
import { AiOrbMark } from '@/components/ui/AiOrbMark'

// ── Configuration ─────────────────────────────────────────────────────────────

// Hand-placed, not randomized — so the "scattered" Scene 1 layout is
// intentional and identical on server and client (a random layout computed
// at module scope would produce a hydration mismatch between SSR and CSR).
const SOURCES = [
  { key: 'linkedin', label: 'LinkedIn', icon: LinkedinLogo, xPct: 16, yPct: 24 },
  { key: 'reddit', label: 'Reddit', icon: RedditLogo, xPct: 80, yPct: 18 },
  { key: 'press', label: 'Press Releases', icon: Newspaper, xPct: 48, yPct: 9 },
  { key: 'websites', label: 'Company Websites', icon: Globe, xPct: 9, yPct: 54 },
  { key: 'funding', label: 'Funding News', icon: CurrencyDollar, xPct: 88, yPct: 50 },
  { key: 'jobs', label: 'Job Boards', icon: Briefcase, xPct: 20, yPct: 84 },
  { key: 'tech', label: 'Tech Stack Changes', icon: ChartLineUp, xPct: 76, yPct: 88 },
  { key: 'launches', label: 'Product Launches', icon: Rocket, xPct: 50, yPct: 94 },
] as const

const PROFILE_FIELDS = [
  { label: 'Company', value: 'Acme Corp' },
  { label: 'Funding', value: '$25M Series B' },
  { label: 'Hiring', value: '12 open roles' },
  { label: 'Leadership', value: 'New VP Sales' },
  { label: 'Tech Stack', value: 'Salesforce, AWS' },
  { label: 'Website Updates', value: 'Pricing page revised' },
] as const

// Scene boundaries, expressed as scrollYProgress (0-1) breakpoints.
const SCENE = {
  s1Start: 0.0,
  s1End: 0.3,
  s2Start: 0.32,
  s2End: 0.62,
  s3Start: 0.62,
  s3End: 1.0,
} as const

const CAPTIONS = [
  {
    range: [0, 0.08, 0.26, 0.32] as [number, number, number, number],
    eyebrow: 'THE INTERNET IS ALIVE',
    headline: 'It never stops generating buying signals.',
  },
  {
    range: [0.3, 0.36, 0.56, 0.62] as [number, number, number, number],
    eyebrow: 'CNVRTED WATCHES EVERYTHING',
    headline: 'Every signal, from every source, all the time.',
  },
  {
    range: [0.6, 0.68, 0.94, 1] as [number, number, number, number],
    eyebrow: 'INTELLIGENCE',
    headline: 'Noise becomes one clear, structured signal.',
  },
] as const

// ── Beam — draws a line from a source node to the center as a plain rotated
// div rather than SVG, so its length can be computed directly in pixels from
// measured container size (no viewBox distortion to correct for). ──────────

function Beam({
  fromXPct,
  fromYPct,
  dims,
  drawProgress,
  opacity,
}: {
  fromXPct: number
  fromYPct: number
  dims: { w: number; h: number }
  drawProgress: MotionValue<number>
  opacity: MotionValue<number>
}) {
  if (!dims.w || !dims.h) return null
  const x1 = (fromXPct / 100) * dims.w
  const y1 = (fromYPct / 100) * dims.h
  const x2 = dims.w / 2
  const y2 = dims.h / 2
  const dx = x2 - x1
  const dy = y2 - y1
  const length = Math.hypot(dx, dy)
  const angle = (Math.atan2(dy, dx) * 180) / Math.PI

  return (
    <motion.div
      className="pointer-events-none absolute left-0 top-0 origin-left"
      style={{
        left: x1,
        top: y1,
        width: length,
        height: 0,
        rotate: angle,
        opacity,
      }}
    >
      <motion.div
        className="h-px w-full origin-left bg-gradient-to-r from-white/70 to-white/10"
        style={{ scaleX: drawProgress }}
      />
      {/* Flowing particle — a continuous CSS loop nested inside the
          scroll-driven wrapper. The macro position/opacity of the beam is
          scroll-scrubbed (freezes when scrolling stops, by design); this
          inner loop is what keeps the beam reading as "live data flowing"
          rather than a static ruled line whenever it's visible. */}
      <div className="relative h-px w-full">
        <div className="signal-flow-dot absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.9)]" />
      </div>
    </motion.div>
  )
}

// ── Source node — a scattered signal source that converges to center ───────

function SourceNode({
  source,
  index,
  dims,
  scrollYProgress,
}: {
  source: typeof SOURCES[number]
  index: number
  dims: { w: number; h: number }
  scrollYProgress: MotionValue<number>
}) {
  const entranceStart = SCENE.s1Start + index * 0.022
  const entranceEnd = entranceStart + 0.07

  const converge0 = SCENE.s2Start + index * 0.012
  const converge1 = converge0 + 0.2

  // Position: scattered percent → center (50, 50), only during Scene 2.
  const xPct = useTransform(scrollYProgress, [SCENE.s1Start, converge0, converge1], [source.xPct, source.xPct, 50])
  const yPct = useTransform(scrollYProgress, [SCENE.s1Start, converge0, converge1], [source.yPct, source.yPct, 50])

  // Icon opacity: fades in during Scene 1, holds, then fades out as it
  // reaches the core near the end of its own convergence window ("absorbed").
  const opacity = useTransform(
    scrollYProgress,
    [entranceStart, entranceEnd, converge1 - 0.05, converge1],
    [0, 1, 1, 0]
  )
  const scale = useTransform(scrollYProgress, [entranceStart, entranceEnd], [0.4, 1])

  // Beam only exists during the convergence window.
  const beamOpacity = useTransform(
    scrollYProgress,
    [converge0, converge0 + 0.03, converge1 - 0.05, converge1],
    [0, 1, 1, 0]
  )
  const beamDraw = useTransform(scrollYProgress, [converge0, converge0 + 0.08], [0, 1])

  const Icon = source.icon

  return (
    <>
      <Beam fromXPct={source.xPct} fromYPct={source.yPct} dims={dims} drawProgress={beamDraw} opacity={beamOpacity} />
      <motion.div
        className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2"
        style={{ left: useTransform(xPct, (v) => `${v}%`), top: useTransform(yPct, (v) => `${v}%`), opacity, scale }}
      >
        <div className="signal-breathe flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-white/10 shadow-[0_0_20px_rgba(255,255,255,0.15)] backdrop-blur-md">
          <Icon weight="fill" className="h-5 w-5 text-white" />
        </div>
        <span className="whitespace-nowrap rounded border border-white/10 bg-black/50 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-white/70 backdrop-blur-sm">
          {source.label}
        </span>
      </motion.div>
    </>
  )
}

// ── Central engine ───────────────────────────────────────────────────────────

function CentralEngine({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const scale = useTransform(
    scrollYProgress,
    [SCENE.s2Start, SCENE.s2End, SCENE.s2End + 0.04, SCENE.s2End + 0.1],
    [1, 1.12, 1.32, 1.1]
  )
  const glow = useTransform(scrollYProgress, [SCENE.s2Start, SCENE.s2End], [0.1, 0.35])
  const ringOpacity = useTransform(scrollYProgress, [SCENE.s1End, SCENE.s2Start + 0.05], [0.15, 0.7])

  return (
    <motion.div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2" style={{ scale }}>
      <div className="relative flex items-center justify-center">
        <motion.div
          className="absolute h-32 w-32 rounded-full border border-white/10"
          style={{ opacity: ringOpacity }}
        />
        <div className="animate-story-core-spin absolute h-28 w-28 rounded-full border border-white/5 border-t-white/70" />
        <motion.div
          className="flex h-[84px] w-[84px] items-center justify-center rounded-full border border-white/20 bg-black backdrop-blur-xl"
          style={{ boxShadow: useTransform(glow, (g) => `0 0 60px rgba(255,255,255,${g})`) }}
        >
          <AiOrbMark size={56} />
        </motion.div>
      </div>
      <div className="mt-4 text-center font-mono text-[11px] tracking-[0.2em] text-white/50">CNVRTED AI</div>
    </motion.div>
  )
}

// ── Assembled intelligence profile (Scene 3) ────────────────────────────────

function ProfileField({ field, index, scrollYProgress }: { field: typeof PROFILE_FIELDS[number]; index: number; scrollYProgress: MotionValue<number> }) {
  // Tightened from (+0.1, step 0.045) so the last field's window (index 5)
  // stays under scrollYProgress's max of 1.0 — it previously ended at 1.005.
  const start = SCENE.s3Start + 0.08 + index * 0.04
  const end = start + 0.06
  const opacity = useTransform(scrollYProgress, [start, end], [0, 1])
  const x = useTransform(scrollYProgress, [start, end], [-14, 0])

  return (
    <motion.div style={{ opacity, x }} className="flex justify-between border-b border-white/5 pb-2.5">
      <span className="font-mono text-[11px] uppercase tracking-wider text-white/40">{field.label}</span>
      <span className="text-[13px] font-medium text-white/95">{field.value}</span>
    </motion.div>
  )
}

function IntelligenceProfile({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const cardStart = SCENE.s3Start + 0.04
  const cardEnd = cardStart + 0.1
  const opacity = useTransform(scrollYProgress, [cardStart, cardEnd], [0, 1])
  const y = useTransform(scrollYProgress, [cardStart, cardEnd], [30, 0])

  // Was `SCENE.s3Start + 0.4` = 1.02 — past scrollYProgress's max of 1.0,
  // which crashed the native Web Animations API ("Offsets must be in [0,1]").
  // Score now reveals shortly after the card itself finishes fading in.
  const scoreStart = cardEnd + 0.02
  const scoreEnd = scoreStart + 0.1
  const scoreOpacity = useTransform(scrollYProgress, [scoreStart, scoreEnd], [0, 1])
  const scoreValue = useTransform(scrollYProgress, [scoreStart, scoreEnd], [0, 92], { clamp: true })
  const scoreText = useTransform(scoreValue, (v) => String(Math.round(v)))

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 z-30 w-full max-w-[380px] -translate-x-1/2 -translate-y-1/2"
      style={{ opacity, y }}
    >
      <div className="relative overflow-hidden rounded-xl border border-white/20 bg-black/80 p-6 shadow-2xl backdrop-blur-2xl">
        <div className="pointer-events-none absolute -inset-20 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="relative z-10 mb-5 flex items-center justify-between border-b border-white/10 pb-5">
          <div>
            <h3 className="text-xl font-bold tracking-tight text-white">Acme Corp</h3>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-white/50">Intelligence Profile</p>
          </div>
          <motion.div style={{ opacity: scoreOpacity }} className="flex flex-col items-end">
            <span className="rounded bg-white px-2 py-0.5 font-mono text-[10px] font-bold tracking-wide text-black">
              HIGH INTENT
            </span>
            <motion.span className="mt-1 font-mono text-3xl font-bold tabular-nums tracking-tighter text-white">
              {scoreText}
            </motion.span>
          </motion.div>
        </div>
        <div className="relative z-10 space-y-3">
          {PROFILE_FIELDS.map((field, i) => (
            <ProfileField key={field.label} field={field} index={i} scrollYProgress={scrollYProgress} />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// ── Captions ─────────────────────────────────────────────────────────────────

function SceneCaption({ caption, scrollYProgress }: { caption: typeof CAPTIONS[number]; scrollYProgress: MotionValue<number> }) {
  const opacity = useTransform(scrollYProgress, caption.range, [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, caption.range, [12, 0, 0, -12])
  return (
    <motion.div style={{ opacity, y }} className="absolute inset-x-0 top-0 flex flex-col items-center px-[5%] text-center">
      <p className="font-mono text-caption uppercase tracking-[0.2em] text-white/50">{caption.eyebrow}</p>
      <h3 className="mt-3 max-w-[26ch] text-2xl font-bold tracking-tight text-white md:text-4xl">{caption.headline}</h3>
    </motion.div>
  )
}

// ── Main export ──────────────────────────────────────────────────────────────

export function SignalStorySection() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLDivElement>(null)
  const [dims, setDims] = useState({ w: 0, h: 0 })

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start start', 'end end'],
  })

  useEffect(() => {
    const el = canvasRef.current
    if (!el) return
    const measure = () => setDims({ w: el.clientWidth, h: el.clientHeight })
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={scrollRef}
      aria-label="How CNVRTED turns internet activity into qualified sales opportunities"
      className="relative bg-black"
      style={{ height: '350dvh' }}
    >
      <span className="sr-only">
        CNVRTED continuously watches signals across the open web — hiring, funding, tech changes,
        press and more — and merges them into a single structured intelligence profile per account.
      </span>

      <div ref={canvasRef} className="sticky top-0 h-[100dvh] overflow-hidden" aria-hidden="true">
        {/* Ambient grid, matching the pinned-section treatment already used
            in PipelineScrollSection, so this reads as the same product. */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '28px 28px' }}
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05),transparent_65%)]" />

        <div className="relative mx-auto h-full w-full max-w-[900px] px-[5%] pt-24 pb-16 md:pt-28">
          <SceneCaption caption={CAPTIONS[0]} scrollYProgress={scrollYProgress} />
          <SceneCaption caption={CAPTIONS[1]} scrollYProgress={scrollYProgress} />
          <SceneCaption caption={CAPTIONS[2]} scrollYProgress={scrollYProgress} />

          <div className="relative h-full w-full">
            {SOURCES.map((source, i) => (
              <SourceNode key={source.key} source={source} index={i} dims={dims} scrollYProgress={scrollYProgress} />
            ))}
            <CentralEngine scrollYProgress={scrollYProgress} />
            <IntelligenceProfile scrollYProgress={scrollYProgress} />
          </div>
        </div>
      </div>
    </section>
  )
}
