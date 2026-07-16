'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useTransform, useMotionValueEvent, useMotionValue, animate, type MotionValue } from 'framer-motion'
import { LinkedinLogo, RedditLogo, Briefcase, CurrencyDollar, Globe, ChartLineUp } from '@phosphor-icons/react'
import { HERO } from '@/content/copy'
import { useMotionPreference } from '@/components/providers/MotionProvider'
import { AiOrbMark } from '@/components/ui/AiOrbMark'

// ── Configuration ─────────────────────────────────────────────────────────────

// Angles are evenly spaced 60° apart (in original clockwise order) so no two
// icons/labels crowd together — previously Reddit (220°) and Tech Intent
// (210°) sat only 10° apart while other gaps ranged 50-95°.
const SOURCES = [
  { key: 'linkedin', label: 'LinkedIn', icon: LinkedinLogo, angle: 345, distance: 220 },
  { key: 'reddit', label: 'Reddit', icon: RedditLogo, angle: 285, distance: 180 },
  { key: 'jobs', label: 'Job Boards', icon: Briefcase, angle: 105, distance: 250 },
  { key: 'funding', label: 'Funding', icon: CurrencyDollar, angle: 45, distance: 280 },
  { key: 'website', label: 'Websites', icon: Globe, angle: 165, distance: 210 },
  { key: 'signals', label: 'Tech Intent', icon: ChartLineUp, angle: 225, distance: 270 },
] as const

const degToRad = (deg: number) => (deg * Math.PI) / 180
const getCoords = (angle: number, distance: number) => ({
  x: Math.cos(degToRad(angle)) * distance,
  y: Math.sin(degToRad(angle)) * distance,
})

// ── Components ────────────────────────────────────────────────────────────────

function RadarGrid({ radiusScale }: { radiusScale: number }) {
  return (
    <div
      className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.07]"
      style={{ transform: `scale(${radiusScale})` }}
    >
      <div className="absolute h-[250px] w-[250px] rounded-full border border-white" />
      <div className="absolute h-[450px] w-[450px] rounded-full border border-white" />
      <div className="absolute h-[650px] w-[650px] rounded-full border border-white border-dashed" />
      <div className="absolute h-full w-[1px] bg-white" />
      <div className="absolute h-[1px] w-full bg-white" />
      {/* Radar sweep */}
      <motion.div
        className="absolute h-[650px] w-[650px] rounded-full"
        style={{
          background: 'conic-gradient(from 0deg, transparent 70%, rgba(255,255,255,0.4) 100%)',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  )
}

function SourceNode({ source, progress, index, radiusScale, showLabels }: { source: typeof SOURCES[number]; progress: MotionValue; index: number; radiusScale: number; showLabels: boolean }) {
  const raw = getCoords(source.angle, source.distance)
  const x = raw.x * radiusScale
  const y = raw.y * radiusScale

  // Stagger entry — tuned so every source (including the last-staggered one)
  // fully fades in well before the shared exit window at [0.4, 0.45].
  // Previously the beam's fade-in window could overrun into the exit
  // window for higher-index sources, producing non-monotonic keyframes
  // (undefined interpolation — the cause of lines flashing unpredictably).
  const start = index * 0.045
  const end = start + 0.06
  const opacity = useTransform(progress, [start, end, 0.4, 0.45], [0, 1, 1, 0])
  const scale = useTransform(progress, [start, end], [0.5, 1])

  // Beam line
  const beamProgress = useTransform(progress, [end, end + 0.05], [0, 1])
  const beamOpacity = useTransform(progress, [end, end + 0.05, 0.4, 0.45], [0, 1, 1, 0])

  // Data packet — a small dot that travels from the source down the beam
  // to the center, looping while the beam is live. Purely additive: reads
  // off beamOpacity/beamProgress that already exist, no new timing windows.
  const packetT = useTransform(progress, (p) => {
    const local = (p - end) * 6 // one packet trip roughly every ~0.17 of progress
    return ((local % 1) + 1) % 1
  })
  const packetX = useTransform(packetT, [0, 1], [x, 0])
  const packetY = useTransform(packetT, [0, 1], [y, 0])
  const packetOpacity = useTransform([beamOpacity, packetT], (values) => {
    const [beamO, t] = values as [number, number]
    // fade the packet in/out at each end of its trip so it doesn't pop
    const edgeFade = Math.min(t * 6, 1, (1 - t) * 6)
    return beamO * Math.max(0, edgeFade)
  })

  const Icon = source.icon

  return (
    <>
      <motion.div
        className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2"
        style={{ x, y, opacity, scale }}
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/60 shadow-[0_0_15px_rgba(255,255,255,0.1)] backdrop-blur-md">
          <Icon weight="fill" className="h-5 w-5 text-white/90" />
        </div>
        {showLabels && (
          <span className="rounded border border-white/10 bg-black/40 px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest text-white/70 backdrop-blur-sm whitespace-nowrap">
            {source.label}
          </span>
        )}
      </motion.div>

      {/* Beam drawing to center, plus a traveling packet dot */}
      <svg className="pointer-events-none absolute left-1/2 top-1/2 overflow-visible">
        <motion.line
          x1={x} y1={y} x2={0} y2={0}
          stroke="rgba(255,255,255,0.6)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          style={{
            pathLength: beamProgress,
            opacity: beamOpacity,
          }}
        />
        <motion.circle
          r={3}
          fill="white"
          style={{
            cx: packetX,
            cy: packetY,
            opacity: packetOpacity,
            filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.9))',
          }}
        />
      </svg>
    </>
  )
}

function CentralCore({ progress }: { progress: MotionValue }) {
  const scale = useTransform(progress, [0, 0.4, 0.45, 0.5, 0.9], [1, 1, 1.3, 1, 1])
  const rotate = useTransform(progress, [0, 1], [0, 360])

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{ scale }}
    >
      <motion.div style={{ rotate }} className="relative flex items-center justify-center">
        {/* Outer tech rings */}
        <div className="absolute h-36 w-36 rounded-full border border-white/10 border-t-white/80" />
        <div className="absolute h-28 w-28 rounded-full border border-white/5 border-b-white/50" />
        
        <div className="flex h-[90px] w-[90px] items-center justify-center rounded-full bg-black shadow-[0_0_40px_rgba(255,255,255,0.15)] border border-white/20 backdrop-blur-xl">
          <AiOrbMark size={64} />
        </div>
      </motion.div>
      <motion.div className="mt-5 text-center font-mono text-[11px] tracking-[0.2em] text-white/50">
        CNVRTED AI
      </motion.div>
    </motion.div>
  )
}

// The signals that add up to the final score, shown one at a time as the
// score counts up so a first-time viewer sees WHY the account is HIGH
// INTENT, not just a number appearing out of nowhere.
const SCORE_FACTORS = [
  { label: 'Funding signal', detail: '$25M Series B · 2h ago', weight: 40 },
  { label: 'Hiring surge', detail: '12 sales roles posted', weight: 32 },
  { label: 'ICP fit', detail: '9/10 match to your target', weight: 20 },
] as const

function ScoreFactorRow({ factor, progress, start, end, isFinalState }: { factor: typeof SCORE_FACTORS[number]; progress: MotionValue; start: number; end: number; isFinalState: boolean }) {
  const opacity = useTransform(progress, [start, end], [0, 1])
  const x = useTransform(progress, [start, end], [8, 0])
  const barWidth = useTransform(progress, [end, end + 0.03], ['0%', `${factor.weight}%`])

  return (
    <motion.div style={{ opacity: isFinalState ? 1 : opacity, x: isFinalState ? 0 : x }} className="flex items-center justify-between gap-3">
      <div className="min-w-0">
        <p className="text-[11px] font-medium text-white/85">{factor.label}</p>
        <p className="truncate text-[10px] text-white/45">{factor.detail}</p>
      </div>
      <div className="h-1 w-16 shrink-0 overflow-hidden rounded-full bg-white/10">
        <motion.div className="h-full rounded-full bg-white/70" style={{ width: isFinalState ? `${factor.weight}%` : barWidth }} />
      </div>
    </motion.div>
  )
}

function EnrichedProfile({ progress, reducedMotion }: { progress: MotionValue; reducedMotion: boolean }) {
  const y = useTransform(progress, [0.45, 0.55], [40, 0])
  // Card is on screen for [0.45, 0.8] then crossfades straight back to the
  // source constellation — no extra dwell after the score finishes revealing
  // (score completes at 0.72), so the loop restarts promptly.
  const opacity = useTransform(progress, [0.45, 0.55, 0.78, 0.84], [0, 1, 1, 0])
  const rotateX = useTransform(progress, [0.45, 0.55], [15, 0])

  const scoreOpacity = useTransform(progress, [0.6, 0.65], [0, 1])
  const scoreMV = useTransform(progress, [0.65, 0.72], [0, 92])
  const [score, setScore] = useState(0)

  useMotionValueEvent(scoreMV, 'change', (v) => setScore(Math.round(v)))

  // Factor rows stagger in right after the score starts counting, each
  // finishing before the card crossfades out at 0.78.
  const factorWindows = [
    [0.6, 0.64],
    [0.65, 0.69],
    [0.7, 0.74],
  ] as const

  // A single detection "ping" — a ring that expands and fades right as the
  // score starts revealing, underscoring the moment the signal is caught.
  // Reuses the scoreOpacity window's start; doesn't alter any existing timing.
  const pingScale = useTransform(progress, [0.58, 0.7], [0.6, 2.2])
  const pingOpacity = useTransform(progress, [0.58, 0.6, 0.7], [0, 0.5, 0])

  const isFinalState = reducedMotion

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 z-30 w-full max-w-[380px] -translate-x-1/2 -translate-y-1/2"
      style={{ y: isFinalState ? 0 : y, opacity: isFinalState ? 1 : opacity, rotateX: isFinalState ? 0 : rotateX, perspective: 1200 }}
    >
      <div className="relative overflow-hidden rounded-xl border border-white/20 bg-black/70 p-6 shadow-2xl backdrop-blur-2xl">
        {/* Scanning laser line */}
        {!isFinalState && (
          <motion.div
            className="absolute left-0 top-0 h-[1px] w-full bg-gradient-to-r from-transparent via-white to-transparent opacity-60 shadow-[0_0_15px_rgba(255,255,255,0.8)]"
            animate={{ top: ['0%', '100%'] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
          />
        )}

        {/* Ambient glow inside card */}
        <div className="pointer-events-none absolute -inset-20 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.1),transparent_50%)]" />

        <div className="relative z-10 mb-5 flex items-center justify-between border-b border-white/10 pb-5">
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">{HERO.visualCompanyName}</h3>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-white/50">Intelligence Profile</p>
          </div>
          <motion.div style={{ opacity: isFinalState ? 1 : scoreOpacity }} className="relative flex flex-col items-end">
            {!isFinalState && (
              <motion.span
                aria-hidden="true"
                className="pointer-events-none absolute -right-2 -top-2 h-8 w-8 rounded-full border border-white/60"
                style={{ scale: pingScale, opacity: pingOpacity }}
              />
            )}
            <span className="rounded bg-white px-2 py-0.5 font-mono text-[10px] font-bold text-black tracking-wide">
              HIGH INTENT
            </span>
            <span className="mt-1 font-mono text-3xl font-bold tabular-nums tracking-tighter text-white">
              {isFinalState ? 92 : score}
            </span>
          </motion.div>
        </div>

        {/* Why this score — the factors that add up to it */}
        <div className="relative z-10 flex flex-col gap-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/40">Why this score</p>
          {SCORE_FACTORS.map((factor, i) => (
            <ScoreFactorRow
              key={factor.label}
              factor={factor}
              progress={progress}
              start={factorWindows[i][0]}
              end={factorWindows[i][1]}
              isFinalState={isFinalState}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// ── Main Export ───────────────────────────────────────────────────────────────

export interface StoryVisualProps {
  className?: string
  compact?: boolean
}

// Largest orbit distance in SOURCES — used to compute how much the
// constellation must shrink to fit inside narrow (mobile/tablet) panels.
const MAX_DISTANCE = Math.max(...SOURCES.map((s) => s.distance))

export function StoryVisual({ className = '', compact = false }: StoryVisualProps) {
  const reducedMotion = useMotionPreference()
  const loopDuration = compact ? 10 : 14
  const progress = useMotionValue(0)

  // The orbit distances (180-280px) were authored for a wide desktop panel.
  // On narrow panels (mobile/tablet), that pushes icons and their labels
  // past the panel edge, where they get clipped by overflow-hidden. Measure
  // the actual panel width and shrink the orbit radius (not the icon/text
  // size, so labels stay legible) so everything stays inside the frame.
  const containerRef = useRef<HTMLDivElement>(null)
  const [radiusScale, setRadiusScale] = useState(1)
  // Below this panel width, source labels ("LINKEDIN", "TECH INTENT", etc.)
  // don't have enough room to sit apart from each other even after
  // shrinking the orbit radius — two icons at a narrow angular gap end up
  // with overlapping label text. Past this point we drop to icon-only,
  // which tolerates a much tighter orbit than text ever could.
  const [showLabels, setShowLabels] = useState(true)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const compute = (width: number) => {
      const withLabels = width >= 480
      setShowLabels(withLabels)
      // Reserve enough beyond the orbit point for either the label extent
      // (labels shown) or just the icon itself (labels hidden).
      const reserve = withLabels ? 55 : 30
      const floor = withLabels ? 0.42 : 0.6
      const available = width / 2 - reserve
      setRadiusScale(Math.min(1, Math.max(floor, available / MAX_DISTANCE)))
    }
    compute(el.clientWidth)
    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width
      if (width) compute(width)
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (reducedMotion) return
    const controls = animate(progress, [0, 1], {
      duration: loopDuration,
      ease: 'linear',
      repeat: Infinity,
      repeatType: 'loop',
    })
    return () => controls.stop()
  }, [progress, reducedMotion, loopDuration])

  // Center node stays fully hidden while the glass card is shown, then
  // crossfades back in over the EXACT same window the card fades out in
  // ([0.78, 0.84], matching EnrichedProfile's opacity keyframes above).
  // Card-opacity + orb-opacity always sum to 1 across that window, so the
  // handoff is a true crossfade — never both visible (a "pop"), never both
  // invisible (a dead gap). Shortened from [0.86,0.94] so the loop restarts
  // promptly after the score reveals instead of sitting on a static card.
  const bgDim = useTransform(progress, [0.4, 0.5, 0.78, 0.84], [1, 0, 0, 1])

  return (
    <div
      ref={containerRef}
      className={`relative w-full select-none overflow-hidden bg-black ${className}`}
      aria-hidden="true"
    >
      <span className="sr-only">{HERO.visualDescription}</span>

      {/* Background sweep and rings */}
      <RadarGrid radiusScale={radiusScale} />

      {/* Dynamic Data Gathering Phase */}
      <motion.div style={{ opacity: reducedMotion ? 0 : bgDim }} className="absolute inset-0 z-10">
        {SOURCES.map((source, i) => (
          <SourceNode key={source.key} source={source} progress={progress} index={i} radiusScale={radiusScale} showLabels={showLabels} />
        ))}
        <CentralCore progress={progress} />
      </motion.div>

      {/* Result Phase */}
      <EnrichedProfile progress={progress} reducedMotion={reducedMotion} />
    </div>
  )
}
