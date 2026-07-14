'use client'

import { motion } from 'framer-motion'
import { HERO } from '@/content/copy'
import { DURATION, EASE, HERO_DELAYS } from '@/lib/tokens'

// Noise company rows
const NOISE_COMPANIES = [
  { name: 'Acme Corp',    sub: 'News, Q1 Results',     icon: 'in' },
  { name: 'Globex Inc',   sub: '200 empl, Marketer',   icon: 'in' },
  { name: 'Initech',      sub: 'Job posting',           icon: 'n'  },
  { name: 'Umbrella Co.', sub: 'Product update',        icon: 'w'  },
  { name: 'Soylent Corp', sub: 'Press release',         icon: 'n'  },
]

function NoiseRow({ name, sub, icon, delay }: { name: string; sub: string; icon: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.35 }}
      transition={{ duration: DURATION.slow, delay: HERO_DELAYS.visual + delay, ease: EASE.default }}
      className="flex items-center gap-2.5 py-2 px-3 rounded-md border border-border bg-surface-raised"
    >
      {/* Avatar placeholder */}
      <div className="w-7 h-7 rounded-full bg-surface border border-border shrink-0 flex items-center justify-center text-[10px] font-semibold text-text-tertiary">
        {name[0]}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-caption font-medium text-text-primary truncate">{name}</p>
        <p className="text-[10px] text-text-tertiary truncate">{sub}</p>
      </div>
      {/* Source icon */}
      <span className="text-[9px] font-bold text-text-tertiary border border-border rounded px-1 py-0.5 uppercase shrink-0">
        {icon}
      </span>
    </motion.div>
  )
}

export function HeroVisual({ className = '' }: { className?: string }) {
  return (
    <div
      className={['relative select-none w-full', className].filter(Boolean).join(' ')}
      aria-hidden="true"
      role="presentation"
    >
      <span className="sr-only">{HERO.visualDescription}</span>

      <div className="grid grid-cols-[1fr_auto_1fr] gap-3 items-center">

        {/* Left: Noise */}
        <div className="flex flex-col gap-1.5">
          <div className="mb-2 text-center">
            <p className="text-caption font-semibold text-text-primary">{HERO.noiseLabel}</p>
            <p className="text-[10px] text-text-tertiary">{HERO.noiseSubLabel}</p>
          </div>
          {NOISE_COMPANIES.map((c, i) => (
            <NoiseRow key={c.name} {...c} delay={i * 0.06} />
          ))}
        </div>

        {/* Middle: animated dotted path */}
        <div className="flex flex-col items-center gap-1 px-1">
          <svg width="40" height="140" viewBox="0 0 40 140" fill="none" className="overflow-visible">
            <motion.path
              d="M 20 0 C 20 40, 20 100, 20 140"
              stroke="var(--color-accent)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.6 }}
              transition={{ duration: 1.2, delay: HERO_DELAYS.visual + 0.3, ease: [0.16, 1, 0.3, 1] }}
            />
            {/* Arrow head */}
            <motion.polygon
              points="14,130 20,142 26,130"
              fill="var(--color-accent)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ duration: 0.3, delay: HERO_DELAYS.visual + 1.4 }}
            />
          </svg>
        </div>

        {/* Right: Signal card */}
        <div className="flex flex-col gap-1.5">
          <div className="mb-2 text-center">
            <p className="text-caption font-semibold text-accent">{HERO.signalLabel}</p>
            <p className="text-[10px] text-text-tertiary">{HERO.signalSubLabel}</p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: DURATION.slow, delay: HERO_DELAYS.visual + 0.5, ease: EASE.default }}
            className="rounded-lg border-2 border-accent bg-surface-raised shadow-card-hover p-4 flex flex-col gap-3"
          >
            {/* Tag + timestamp */}
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center rounded-md bg-accent-dim text-accent text-mono-tag font-mono py-xs px-[0.625rem] leading-none text-[10px]">
                FUNDING
              </span>
              <span className="text-[10px] text-text-tertiary">2m ago</span>
            </div>

            {/* Company */}
            <div>
              <p className="text-body font-semibold text-text-primary">{HERO.visualCompanyName}</p>
              <p className="text-caption text-text-secondary mt-0.5">$25M Series B announced. Expanding GTM</p>
            </div>

            {/* Sources */}
            <div className="flex items-center gap-1.5">
              {['in', 'N', 'R'].map((s) => (
                <span key={s} className="text-[9px] font-bold text-text-tertiary border border-border rounded px-1 py-0.5 uppercase">
                  {s}
                </span>
              ))}
            </div>

            {/* Score + badge */}
            <div className="flex items-center justify-between pt-2 border-t border-border">
              <span className="inline-flex items-center rounded-md bg-accent text-on-accent text-[10px] font-mono py-xs px-[0.625rem] leading-none">
                HIGH INTENT
              </span>
              <span className="text-[1.4rem] font-bold text-text-primary tabular-nums leading-none">92</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
