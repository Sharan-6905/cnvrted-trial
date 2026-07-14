/**
 * SignalMark — CNVRTED's signature monochrome mark: a center dot with two
 * arcing sweep lines radiating outward, evoking radar/signal detection.
 *
 * This is the one visual asset reused everywhere so the brand reads as
 * "ours" without color or the wordmark: favicon (app/icon.tsx renders the
 * same shape), list bullets, status-badge dots, and the loading/pending
 * indicator (pass `pulse` to animate it as a detecting/pending state).
 */
interface SignalMarkProps {
  size?: number
  className?: string
  /** Animate as a pending/detecting indicator (slow pulse + sweep rotation). */
  pulse?: boolean
}

export function SignalMark({ size = 16, className = '', pulse = false }: SignalMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={[pulse ? 'signal-mark--pulse' : '', className].filter(Boolean).join(' ')}
    >
      <circle cx="12" cy="12" r="2.5" fill="currentColor" />
      <path
        d="M12 5.5a6.5 6.5 0 0 1 6.5 6.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.85"
      />
      <path
        d="M12 18.5a6.5 6.5 0 0 1-6.5-6.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  )
}
