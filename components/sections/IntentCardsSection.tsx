'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { INTENT_CARDS } from '@/content/copy'
import type { IntentCardCopy } from '@/content/copy'
import { Tag } from '@/components/ui/Tag'
import { SignalMark } from '@/components/ui/SignalMark'
import { CornerFrame } from '@/components/ui/CornerFrame'
import { Detect } from '@/components/ui/Detect'
import { DURATION, EASE } from '@/lib/tokens'

function IntentCard({ card, index }: { card: IntentCardCopy; index: number }) {
  const [expanded, setExpanded] = useState(false)
  const intentStyles = card.intent === 'HIGH'
    ? 'bg-accent text-on-accent'
    : 'bg-accent-dim text-text-secondary'

  return (
    <Detect delay={index * 0.08} className="h-full">
      <motion.article
        onClick={() => setExpanded((v) => !v)}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
        whileHover={{ y: -4 }}
        transition={{ duration: DURATION.fast, ease: EASE.default }}
        className="h-full cursor-pointer"
      >
        <CornerFrame className="h-full flex flex-col gap-3">
          {/* Top row: tag + timestamp */}
          <div className="flex items-center justify-between gap-2">
            <Tag type={card.tag} />
            <span className="text-caption text-text-tertiary">{card.timestamp}</span>
          </div>

          {/* Company name — blurred for privacy */}
          <h3 className="text-h3 font-semibold text-text-primary select-none" style={{ filter: 'blur(6px)' }}>{card.company}</h3>

          {/* Description */}
          <p className="text-body text-text-secondary flex-1">{card.description}</p>

          {/* Source badge */}
          <div className="flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1 text-caption text-text-tertiary">
              <span className="w-4 h-4 rounded bg-surface flex items-center justify-center text-[9px] font-bold border border-border">
                {card.source[0]}
              </span>
              {card.source}
            </span>
          </div>

          {/* Bottom: intent badge + score */}
          <div className="flex items-center justify-between pt-1 border-t border-border mt-1">
            <span
              className={[
                'inline-flex items-center gap-1 rounded-md text-mono-tag font-mono py-xs px-[0.625rem] leading-none',
                intentStyles,
              ].join(' ')}
            >
              <SignalMark size={9} />
              {card.intent === 'HIGH' ? 'HIGH INTENT' : 'MEDIUM INTENT'}
            </span>
            <span className="text-h3 font-semibold text-text-primary tabular-nums">{card.score}</span>
          </div>

          {/* Reasoning — revealed on hover/click, not shown by default */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2, ease: EASE.default }}
                className="overflow-hidden"
              >
                <div className="pt-3 mt-1 border-t border-border flex flex-col gap-1.5">
                  <p className="text-[10px] font-mono uppercase tracking-widest text-text-tertiary">
                    Why this score
                  </p>
                  {card.signals.map((signal) => (
                    <div key={signal} className="flex items-start gap-1.5 text-caption text-text-secondary">
                      <SignalMark size={9} className="mt-0.5 shrink-0 text-text-tertiary" />
                      <span>{signal}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CornerFrame>
      </motion.article>
    </Detect>
  )
}

export function IntentCardsSection() {
  return (
    <section
      id="signal-examples"
      aria-label="Intent signal examples"
      className="bg-background py-20 md:py-28"
    >
      <div className="mx-auto w-full px-[5%]">

        {/* Header row */}
        <div className="flex flex-col items-center text-center gap-4 mb-10 md:mb-12">
          <div>
            <p className="text-caption font-mono text-text-tertiary uppercase tracking-[0.08em] mb-3">
              {INTENT_CARDS.label}
            </p>
            <h2 className="text-h1-fluid text-text-primary">{INTENT_CARDS.headline}</h2>
            <p className="text-caption text-text-tertiary mt-3">Hover or tap a card to see why it scored the way it did.</p>
            <p className="text-caption text-text-tertiary">Illustrative examples — real signals are scored continuously against your specific ICP.</p>
          </div>
          <a
            href="#closing-cta"
            className="shrink-0 text-body text-text-secondary border border-border rounded-md px-4 py-2 hover:border-text-tertiary hover:text-text-primary transition-colors"
          >
            {INTENT_CARDS.viewAllLabel}
          </a>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
          {INTENT_CARDS.cards.map((card, i) => (
            <IntentCard key={card.company} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
