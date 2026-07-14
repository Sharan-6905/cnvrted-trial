/**
 * Badge — intent score indicator (HIGH INTENT / MEDIUM INTENT).
 * Spec: docs/04-design-system.md §8.3, bottom-right of signal card.
 *
 * HIGH:   accent-dim background, accent text
 * MEDIUM: intent-medium-bg background, intent-medium-text (warm amber)
 *
 * Same shape and size as Tag — distinct only in colour semantics.
 */

import type { IntentLevel } from '@/content/copy'

interface BadgeProps {
  level: IntentLevel
  className?: string
}

const LABEL: Record<IntentLevel, string> = {
  HIGH: 'HIGH INTENT',
  MEDIUM: 'MEDIUM INTENT',
}

const COLOURS: Record<IntentLevel, string> = {
  HIGH: 'bg-accent text-on-accent',
  MEDIUM: 'bg-intent-medium-bg text-intent-medium-text',
}

export function Badge({ level, className = '' }: BadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center',
        'rounded-md',
        COLOURS[level],
        'text-mono-tag font-mono',
        'py-xs px-[0.625rem]', /* 4px / 10px per spec */
        'leading-none',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {LABEL[level]}
    </span>
  )
}
