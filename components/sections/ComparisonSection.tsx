'use client'

import { motion } from 'framer-motion'
import { WHY_NOT_DATABASE } from '@/content/copy'
import { DURATION, EASE } from '@/lib/tokens'

function XIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="w-4 h-4 shrink-0">
      <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="w-4 h-4 shrink-0">
      <path d="M3 8.5l3.2 3.2L13 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function ComparisonSection() {
  return (
    <section
      id="why-not-a-database"
      data-theme="dark"
      className="bg-background py-20 md:py-28"
      aria-label="Why not a database"
    >
      <div className="mx-auto w-full px-[5%]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left: headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: DURATION.base, ease: EASE.default }}
            className="flex flex-col gap-4"
          >
            <p className="text-caption font-mono text-text-tertiary uppercase tracking-[0.08em]">
              {WHY_NOT_DATABASE.label}
            </p>
            <h2 className="text-h1-fluid text-text-primary" style={{ whiteSpace: 'pre-line' }}>
              {WHY_NOT_DATABASE.headline}
            </h2>
          </motion.div>

          {/* Right: comparison card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: DURATION.base, delay: 0.15, ease: EASE.default }}
            className="rounded-xl border border-border overflow-hidden grid grid-cols-2"
          >
            {/* Column headers */}
            <div className="px-4 py-3 border-b border-r border-border bg-surface">
              <p className="text-caption text-text-tertiary font-medium">{WHY_NOT_DATABASE.leftLabel}</p>
            </div>
            <div className="px-4 py-3 border-b border-border" style={{ backgroundColor: 'var(--color-accent-dim)' }}>
              <p className="text-caption text-accent font-semibold">{WHY_NOT_DATABASE.rightLabel}</p>
            </div>

            {/* Rows */}
            {WHY_NOT_DATABASE.rows.map((row, i) => {
              const isLast = i === WHY_NOT_DATABASE.rows.length - 1
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: DURATION.base, delay: 0.2 + i * 0.06 }}
                  className="contents"
                >
                  {/* Left cell — muted, struck-through */}
                  <div
                    className={[
                      'flex items-center gap-2 px-4 py-3.5 bg-surface border-r border-border',
                      isLast ? '' : 'border-b border-border',
                    ].join(' ')}
                  >
                    <span className="text-text-tertiary"><XIcon /></span>
                    <span className="text-body text-text-tertiary line-through decoration-text-tertiary/50">
                      {row.left}
                    </span>
                  </div>

                  {/* Right cell — teal-highlighted */}
                  <div
                    className={isLast ? 'flex items-center gap-2 px-4 py-3.5' : 'flex items-center gap-2 px-4 py-3.5 border-b border-border'}
                    style={{ backgroundColor: 'var(--color-accent-dim)' }}
                  >
                    <span className="text-accent"><CheckIcon /></span>
                    <span className="text-body text-text-primary font-medium">{row.right}</span>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
