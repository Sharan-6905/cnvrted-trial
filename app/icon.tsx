import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

// Favicon rendered as the SignalMark shape — same silhouette used across
// the site (bullets, status-badge dots, loading indicator) so the icon in
// the browser tab is instantly recognizable as CNVRTED without color.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0a0a0a',
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="2.5" fill="#fafafa" />
          <path d="M12 5.5a6.5 6.5 0 0 1 6.5 6.5" stroke="#fafafa" strokeWidth="1.8" strokeLinecap="round" opacity="0.9" />
          <path d="M12 18.5a6.5 6.5 0 0 1-6.5-6.5" stroke="#fafafa" strokeWidth="1.8" strokeLinecap="round" opacity="0.55" />
        </svg>
      </div>
    ),
    { ...size }
  )
}
