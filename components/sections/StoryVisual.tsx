'use client'

import { useEffect, useState } from 'react'
import { motion, useTransform, useMotionValueEvent, useMotionValue, animate, type MotionValue } from 'framer-motion'
import { HERO } from '@/content/copy'
import { useMotionPreference } from '@/components/providers/MotionProvider'
import { AiOrbMark } from '@/components/ui/AiOrbMark'

/**
 * The hero's full-page visual: a single self-looping sequence, not four
 * separate animations. `progress` (0→1) drives every chapter via useTransform,
 * so the whole story is a pure function of one number — only now that number
 * animates on its own timeline (0→1, pause, repeat) instead of scroll.
 *
 * Chapter map (all driven by the same `progress` MotionValue):
 *   0.00–0.00  Noise — 7 sources scattered, idle-floating, unconnected (rest state)
 *   0.00–0.45  Convergence — sources travel to center, merge into the AI node
 *   0.45–1.00  Profile — enriched fields stagger in, Intent Score counts up
 *
 * The pipeline chapter (Score → Summary → Outreach → CRM → Pipeline Created)
 * used to live here as a fourth, timer-driven beat. It's now its own
 * scroll-scrubbed section (PipelineScrollSection) further down the page —
 * that flow reads better tied to the user's scroll than to a timer.
 */

const SOURCES = [
  { key: 'linkedin', label: 'LinkedIn', dx: -380, dy: -230 },
  { key: 'funding', label: 'Funding News', dx: 90, dy: -320 },
  { key: 'reddit', label: 'Reddit', dx: 390, dy: -120 },
  { key: 'jobs', label: 'Job Boards', dx: -410, dy: 80 },
  { key: 'website', label: 'Company Websites', dx: 70, dy: 310 },
  { key: 'techchange', label: 'Technology Changes', dx: 410, dy: 175 },
  { key: 'glassdoor', label: 'Glassdoor', dx: -100, dy: 330 },
] as const

const PROFILE_FIELDS = [
  { label: 'Company', value: HERO.visualCompanyName },
  { label: 'Funding', value: '$25M Series B' },
  { label: 'Hiring', value: '12 open roles' },
  { label: 'Tech Stack', value: 'Salesforce, AWS' },
  { label: 'Pain Signals', value: 'Support tickets ↑' },
  { label: 'Leadership', value: 'New VP Sales' },
] as const

interface SourceCardProps {
  source: (typeof SOURCES)[number]
  convergeT: MotionValue<number>
  reducedMotion: boolean
  posScale: number
}

function SourceCard({ source, convergeT, reducedMotion, posScale }: SourceCardProps) {
  const x = useTransform(convergeT, (t) => (reducedMotion ? 0 : source.dx * posScale * (1 - t)))
  const y = useTransform(convergeT, (t) => (reducedMotion ? 0 : source.dy * posScale * (1 - t)))
  const opacity = useTransform(convergeT, [0, 0.75, 1], [1, 1, 0])

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        marginLeft: -72,
        marginTop: -16,
        x,
        y,
        opacity: reducedMotion ? 0 : opacity,
      }}
      className="flex items-center gap-1.5 rounded-full border px-2.5 py-1.5"
      // Idle float — independent of scroll, applied to a nested layer so it
      // never fights the scroll-driven x/y translate above.
    >
      <motion.div
        className="flex items-center gap-1.5"
        animate={reducedMotion ? undefined : { y: [0, -4, 0] }}
        transition={{ duration: 3 + (source.dx % 5) * 0.2, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          border: '1px solid var(--color-border)',
          borderRadius: 9999,
          padding: '6px 10px',
          background: 'var(--color-surface-raised)',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          whiteSpace: 'nowrap',
        }}
      >
        <span
          className="h-1.5 w-1.5 shrink-0 rounded-full"
          style={{ background: 'var(--color-accent)' }}
        />
        <span className="text-[10px] font-medium text-text-secondary">{source.label}</span>
      </motion.div>
    </motion.div>
  )
}

interface ProfileFieldRowProps {
  field: (typeof PROFILE_FIELDS)[number]
  index: number
  profileT: MotionValue<number>
  staticFinal: boolean
}

function ProfileFieldRow({ field, index, profileT, staticFinal }: ProfileFieldRowProps) {
  const opacity = useTransform(profileT, [0.15 + index * 0.09, 0.24 + index * 0.09], [0, 1])
  return (
    <motion.div
      className="flex items-center justify-between"
      style={{ opacity: staticFinal ? 1 : opacity }}
    >
      <span className="text-[10px] text-text-tertiary">{field.label}</span>
      <span className="text-[11px] font-medium text-text-secondary">{field.value}</span>
    </motion.div>
  )
}

interface ConnectingLineProps {
  source: (typeof SOURCES)[number]
  convergeT: MotionValue<number>
}

function ConnectingLine({ source, convergeT }: ConnectingLineProps) {
  const opacity = useTransform(convergeT, [0.15, 0.55, 0.85], [0, 0.35, 0])
  return (
    <motion.line
      x1={450 + source.dx}
      y1={450 + source.dy}
      x2={450}
      y2={450}
      stroke="var(--color-accent)"
      strokeWidth="1"
      style={{ opacity }}
    />
  )
}

interface StoryVisualProps {
  className?: string
  // compact = shrink the scatter radius, speed up the loop, and drop the
  // connecting lines so the whole sequence fits a small box beside the hero.
  compact?: boolean
}

export function StoryVisual({ className = '', compact = false }: StoryVisualProps) {
  const reducedMotion = useMotionPreference()

  const posScale = compact ? 0.4 : 1
  const loopDuration = compact ? 5 : 11

  // Self-looping progress: 0 -> 1 continuously, no pause at either end — the
  // profile card is already on screen for several seconds before the loop
  // wraps, so there's no need for an explicit hold that would read as a stall.
  const progress = useMotionValue(0)
  useEffect(() => {
    if (reducedMotion) return
    const controls = animate(progress, [0, 1], {
      duration: loopDuration,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'loop',
    })
    return () => controls.stop()
  }, [progress, reducedMotion, loopDuration])

  // ── Chapter progress values, all derived from the single loop input ──
  const convergeT = useTransform(progress, [0, 0.45], [0, 1], { clamp: true })
  const profileT = useTransform(progress, [0.45, 1], [0, 1], { clamp: true })

  const aiNodeOpacity = useTransform(convergeT, [0.55, 0.85], [0, 1])
  const aiNodeScale = useTransform(convergeT, [0.55, 1], [0.7, 1])

  const cardZoneOpacity = useTransform(profileT, [0, 0.08, 0.95, 1], [0, 1, 1, 0])
  const scoreMV = useTransform(profileT, [0.72, 0.94], [0, 92])
  const [scoreDisplay, setScoreDisplay] = useState(0)
  useMotionValueEvent(scoreMV, 'change', (v) => setScoreDisplay(Math.round(v)))

  // Reduced motion: skip scroll-scrubbing entirely, show the resolved end-state.
  const staticFinal = reducedMotion

  return (
    <div
      className={`relative w-full select-none overflow-hidden bg-background ${className}`}
      aria-hidden="true"
      role="presentation"
    >
      <span className="sr-only">{HERO.visualDescription}</span>

      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at 50% 45%, var(--color-accent-dim), transparent 60%)' }}
      />

      {/* ── Chapter 1–2: scattered sources converging on the AI node ── */}
      <div className="pointer-events-none absolute inset-0">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 900 900" preserveAspectRatio="xMidYMid slice">
          {!staticFinal && !compact &&
            SOURCES.map((s) => <ConnectingLine key={s.key} source={s} convergeT={convergeT} />)}
        </svg>

        {!staticFinal &&
          SOURCES.map((s) => <SourceCard key={s.key} source={s} convergeT={convergeT} reducedMotion={false} posScale={posScale} />)}

        {/* AI node — always centered */}
        <motion.div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            marginLeft: -44,
            marginTop: -44,
            opacity: staticFinal ? 1 : aiNodeOpacity,
            scale: staticFinal ? 1 : aiNodeScale,
          }}
          className="flex flex-col items-center"
        >
          <motion.div
            className="flex h-[88px] w-[88px] items-center justify-center"
            animate={staticFinal ? undefined : { rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          >
            <AiOrbMark size={88} />
          </motion.div>
          <p className="mt-3 text-[12px] font-mono uppercase tracking-widest text-text-tertiary">CNVRTED AI</p>
        </motion.div>
      </div>

      {/* ── Chapter 3: enriched profile card ── */}
      <motion.div
        className="relative z-10 flex h-full items-center justify-center px-6"
        style={{ opacity: staticFinal ? 1 : cardZoneOpacity }}
      >
        <div
          className="flex w-full flex-col gap-2.5 rounded-lg border p-4"
          style={{ maxWidth: compact ? 300 : 380, borderColor: 'var(--color-accent)', backgroundColor: 'var(--color-surface-raised)' }}
        >
          <div className="flex items-center justify-between border-b border-border pb-2.5">
            <p className="text-body font-semibold text-text-primary">{HERO.visualCompanyName}</p>
            <div className="flex items-center gap-1.5">
              <span className="inline-flex items-center rounded-md bg-accent px-[0.5rem] py-xs text-[9px] font-mono leading-none text-on-accent">
                HIGH INTENT
              </span>
              <span className="text-[1.1rem] font-bold leading-none tabular-nums text-text-primary">
                {staticFinal ? 92 : scoreDisplay}
              </span>
            </div>
          </div>

          {PROFILE_FIELDS.map((field, i) => (
            <ProfileFieldRow key={field.label} field={field} index={i} profileT={profileT} staticFinal={staticFinal} />
          ))}
        </div>
      </motion.div>
    </div>
  )
}
