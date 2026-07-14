/**
 * AI orb mark: two mirrored gradient arcs orbiting a solid center dot.
 * Used as the "CNVRTED AI" node in the hero story animation.
 */
export function AiOrbMark({ size = 88 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="aiOrbGradA" x1="60" y1="10" x2="110" y2="70" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#6B6B6B" />
        </linearGradient>
        <linearGradient id="aiOrbGradB" x1="60" y1="110" x2="10" y2="50" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#6B6B6B" />
        </linearGradient>
      </defs>
      <path d="M 67.29 18.64 A 42 42 0 0 1 101.36 67.29" fill="none" stroke="url(#aiOrbGradA)" strokeWidth="15" strokeLinecap="round" />
      <path d="M 52.71 101.36 A 42 42 0 0 1 18.64 52.71" fill="none" stroke="url(#aiOrbGradB)" strokeWidth="15" strokeLinecap="round" />
      <circle cx="60" cy="60" r="17" fill="#FAFAFA" />
    </svg>
  )
}
