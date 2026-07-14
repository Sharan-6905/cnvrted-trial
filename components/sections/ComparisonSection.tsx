'use client'

import { motion } from 'framer-motion'
import { WHY_NOT_DATABASE } from '@/content/copy'
import { DURATION, EASE } from '@/lib/tokens'

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

          {/* Right: comparison table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: DURATION.base, delay: 0.15, ease: EASE.default }}
          >
            {/* Column headers */}
            <div className="hidden sm:grid grid-cols-[1fr_auto_1fr] gap-2 mb-4">
              <p className="text-caption text-text-secondary font-medium">{WHY_NOT_DATABASE.leftLabel}</p>
              <div />
              <p className="text-caption text-accent font-medium text-right">{WHY_NOT_DATABASE.rightLabel}</p>
            </div>
            <div className="sm:hidden flex justify-between mb-4">
              <p className="text-caption text-text-secondary font-medium">{WHY_NOT_DATABASE.leftLabel}</p>
              <p className="text-caption text-accent font-medium">{WHY_NOT_DATABASE.rightLabel}</p>
            </div>

            {/* Rows */}
            <div className="rounded-lg border border-border overflow-hidden">
              {WHY_NOT_DATABASE.rows.map((row, i) => (
                <div
                  key={i}
                  className={[
                    i < WHY_NOT_DATABASE.rows.length - 1 ? 'border-b border-border' : '',
                  ].join(' ')}
                >
                  {/* Desktop: 3-column */}
                  <div className="hidden sm:grid grid-cols-[1fr_auto_1fr] gap-3 items-center px-4 py-3">
                    <span className="text-body text-text-secondary">{row.left}</span>
                    <span className="flex items-center justify-center w-7 h-7 rounded-full border border-border text-caption text-text-tertiary font-mono shrink-0">vs</span>
                    <span className="text-body text-accent text-right">{row.right}</span>
                  </div>
                  {/* Mobile: stacked */}
                  <div className="sm:hidden flex items-center justify-between px-4 py-3 gap-2">
                    <span className="text-body text-text-secondary text-sm">{row.left}</span>
                    <span className="text-body text-accent text-sm text-right">{row.right}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
