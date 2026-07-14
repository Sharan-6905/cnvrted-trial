/**
 * Tag — signal-type label (HIRING / FUNDING / TECH CHANGE).
 * Spec: docs/04-design-system.md §8.3 signal card structure.
 *
 * Renders in JetBrains Mono (font-mono), accent colour on accent-dim background.
 * Always uppercase — copy in content/copy.ts is already uppercase; this component
 * does not force uppercase to avoid double-uppercasing if copy ever changes.
 */

import type { SignalType } from '@/content/copy'

interface TagProps {
  type: SignalType
  className?: string
}

const TAG_COLOURS: Record<SignalType, string> = {
  'HIRING':      'bg-accent-dim text-accent',
  'FUNDING':     'bg-accent-dim text-accent',
  'TECH CHANGE': 'bg-accent-dim text-accent',
  'PAIN SIGNAL': 'bg-accent-dim text-accent',
}

export function Tag({ type, className = '' }: TagProps) {
  return (
    <span
      className={[
        'inline-flex items-center',
        'rounded-md',
        TAG_COLOURS[type] ?? 'bg-accent-dim text-accent',
        'text-mono-tag font-mono',
        'py-xs px-[0.625rem]',
        'leading-none',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {type}
    </span>
  )
}
