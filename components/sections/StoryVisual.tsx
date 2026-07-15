'use client'

import { useEffect, useState } from 'react'
import { motion, useTransform, useMotionValueEvent, useMotionValue, animate, type MotionValue } from 'framer-motion'
import { LinkedinLogo, RedditLogo, Briefcase, CurrencyDollar, Globe, ChartLineUp } from '@phosphor-icons/react'
import { HERO } from '@/content/copy'
import { useMotionPreference } from '@/components/providers/MotionProvider'
import { AiOrbMark } from '@/components/ui/AiOrbMark'

// ── Configuration ─────────────────────────────────────────────────────────────

const SOURCES = [
  { key: 'linkedin', label: 'LinkedIn', icon: LinkedinLogo, angle: -45, distance: 220 },
  { key: 'reddit', label: 'Reddit', icon: RedditLogo, angle: -140, distance: 180 },
  { key: 'jobs', label: 'Job Boards', icon: Briefcase, angle: 135, distance: 250 },
  { key: 'funding', label: 'Funding', icon: CurrencyDollar, angle: 45, distance: 280 },
  { key: 'website', label: 'Websites', icon: Globe, angle: -200, distance: 210 },
  { key: 'signals', label: 'Tech Intent', icon: ChartLineUp, angle: 210, distance: 270 },
] as const

const PROFILE_FIELDS = [
  { label: 'Company', value: HERO.visualCompanyName },
  { label: 'Funding', value: '$25M Series B' },
  { label: 'Hiring', value: '12 open roles' },
  { label: 'Tech Stack', value: 'Salesforce, AWS' },
  { label: 'Pain Signals', value: 'Support tickets ↑' },
  { label: 'Leadership', value: 'New VP Sales' },
] as const

const degToRad = (deg: number) => (deg * Math.PI) / 180
const getCoords = (angle: number, distance: number) => ({
  x: Math.cos(degToRad(angle)) * distance,
  y: Math.sin(degToRad(angle)) * distance,
})

// ── Components ────────────────────────────────────────────────────────────────

function RadarGrid() {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.07]">
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

function SourceNode({ source, progress, index }: { source: typeof SOURCES[number]; progress: MotionValue; index: number }) {
  const { x, y } = getCoords(source.angle, source.distance)
  
  // Stagger entry
  const start = index * 0.05
  const end = start + 0.1
  const opacity = useTransform(progress, [start, end, 0.4, 0.45], [0, 1, 1, 0])
  const scale = useTransform(progress, [start, end], [0.5, 1])
  
  // Beam line
  const beamProgress = useTransform(progress, [end, end + 0.15], [0, 1])
  const beamOpacity = useTransform(progress, [end, end + 0.15, 0.4, 0.45], [0, 1, 1, 0])

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
        <span className="rounded border border-white/10 bg-black/40 px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest text-white/70 backdrop-blur-sm">
          {source.label}
        </span>
      </motion.div>

      {/* Beam drawing to center */}
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

function EnrichedProfile({ progress, reducedMotion }: { progress: MotionValue; reducedMotion: boolean }) {
  const y = useTransform(progress, [0.45, 0.55], [40, 0])
  const opacity = useTransform(progress, [0.45, 0.55, 0.86, 0.94], [0, 1, 1, 0])
  const rotateX = useTransform(progress, [0.45, 0.55], [15, 0])

  const scoreOpacity = useTransform(progress, [0.6, 0.65], [0, 1])
  const scoreMV = useTransform(progress, [0.65, 0.72], [0, 92])
  const [score, setScore] = useState(0)
  
  useMotionValueEvent(scoreMV, 'change', (v) => setScore(Math.round(v)))

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
          <motion.div style={{ opacity: isFinalState ? 1 : scoreOpacity }} className="flex flex-col items-end">
            <span className="rounded bg-white px-2 py-0.5 font-mono text-[10px] font-bold text-black tracking-wide">
              HIGH INTENT
            </span>
            <span className="mt-1 font-mono text-3xl font-bold tabular-nums tracking-tighter text-white">
              {isFinalState ? 92 : score}
            </span>
          </motion.div>
        </div>

        <div className="relative z-10 space-y-3.5">
          {PROFILE_FIELDS.map((field, i) => {
            const fieldStart = 0.55 + i * 0.03
            const fieldOpacity = useTransform(progress, [fieldStart, fieldStart + 0.04], [0, 1])
            const fieldX = useTransform(progress, [fieldStart, fieldStart + 0.04], [-15, 0])
            
            return (
              <motion.div 
                key={field.label} 
                style={{ opacity: isFinalState ? 1 : fieldOpacity, x: isFinalState ? 0 : fieldX }} 
                className="flex justify-between border-b border-white/5 pb-2.5"
              >
                <span className="font-mono text-[11px] uppercase tracking-wider text-white/40">{field.label}</span>
                <span className="text-[14px] font-medium text-white/95">{field.value}</span>
              </motion.div>
            )
          })}
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

export function StoryVisual({ className = '', compact = false }: StoryVisualProps) {
  const reducedMotion = useMotionPreference()
  const loopDuration = compact ? 10 : 14
  const progress = useMotionValue(0)

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
  // ([0.86, 0.94], matching EnrichedProfile's opacity keyframes below).
  // Card-opacity + orb-opacity always sum to 1 across that window, so the
  // handoff is a true crossfade — never both visible (a "pop"), never both
  // invisible (a dead gap).
  const bgDim = useTransform(progress, [0.4, 0.5, 0.86, 0.94], [1, 0, 0, 1])

  return (
    <div 
      className={`relative w-full select-none overflow-hidden bg-black ${className}`} 
      aria-hidden="true" 
    >
      <span className="sr-only">{HERO.visualDescription}</span>
      
      {/* Background sweep and rings */}
      <RadarGrid />
      
      {/* Dynamic Data Gathering Phase */}
      <motion.div style={{ opacity: reducedMotion ? 0 : bgDim }} className="absolute inset-0 z-10">
        {SOURCES.map((source, i) => (
          <SourceNode key={source.key} source={source} progress={progress} index={i} />
        ))}
        <CentralCore progress={progress} />
      </motion.div>

      {/* Result Phase */}
      <EnrichedProfile progress={progress} reducedMotion={reducedMotion} />
    </div>
  )
}
