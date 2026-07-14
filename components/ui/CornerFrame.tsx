/**
 * CornerFrame — CNVRTED's card treatment: thin corner brackets at the four
 * corners instead of a full rounded border, evoking a targeting/detection
 * reticle. Used consistently across every card-shaped surface (intent
 * cards, flowchart examples, the interactive demo output) so the shape
 * itself is recognizable without color or the wordmark.
 *
 * Renders its own background/padding — pass children only, no need to
 * additionally style a bordered box around it.
 */
import type { ReactNode } from 'react'

interface CornerFrameProps {
  children: ReactNode
  className?: string
  /** Corner bracket size in px. Defaults to 14. */
  bracket?: number
}

export function CornerFrame({ children, className = '', bracket = 14 }: CornerFrameProps) {
  const corner = 'absolute pointer-events-none'
  const strokeColor = 'var(--color-text-tertiary)'
  const s = bracket

  return (
    <div className={`relative bg-surface-raised p-5 ${className}`}>
      {/* top-left */}
      <span className={corner} style={{ top: 0, left: 0, width: s, height: s, borderTop: `1.5px solid ${strokeColor}`, borderLeft: `1.5px solid ${strokeColor}` }} />
      {/* top-right */}
      <span className={corner} style={{ top: 0, right: 0, width: s, height: s, borderTop: `1.5px solid ${strokeColor}`, borderRight: `1.5px solid ${strokeColor}` }} />
      {/* bottom-left */}
      <span className={corner} style={{ bottom: 0, left: 0, width: s, height: s, borderBottom: `1.5px solid ${strokeColor}`, borderLeft: `1.5px solid ${strokeColor}` }} />
      {/* bottom-right */}
      <span className={corner} style={{ bottom: 0, right: 0, width: s, height: s, borderBottom: `1.5px solid ${strokeColor}`, borderRight: `1.5px solid ${strokeColor}` }} />
      {children}
    </div>
  )
}
