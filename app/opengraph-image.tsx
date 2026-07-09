import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'CNVRTED - Real-time buying signals for B2B sales teams'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: '#0B0B0B',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {/* Top: wordmark */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ fontSize: 22, fontWeight: 600, color: '#ffffff', letterSpacing: '0.06em' }}>
            CNVRTED
          </span>
        </div>

        {/* Center: headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 500,
              color: '#0B6B66',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            REAL-TIME BUYING SIGNALS FOR B2B SALES TEAMS
          </div>
          <div
            style={{
              fontSize: 68,
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            Surface buying intent.{'\n'}Win more deals.
          </div>
          <div
            style={{
              fontSize: 22,
              color: '#666',
              lineHeight: 1.5,
              maxWidth: 680,
              marginTop: 8,
            }}
          >
            CNVRTED monitors the dark funnel across LinkedIn, Reddit, X and the open web to surface accounts showing real buying signals.
          </div>
        </div>

        {/* Bottom: signal tags */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {[
            { label: 'HIRING', color: '#0B6B66', bg: 'rgba(11,107,102,0.12)' },
            { label: 'FUNDING', color: '#2563EB', bg: 'rgba(37,99,235,0.12)' },
            { label: 'TECH CHANGE', color: '#D97706', bg: 'rgba(217,119,6,0.12)' },
            { label: 'PAIN SIGNAL', color: '#7C3AED', bg: 'rgba(124,58,237,0.12)' },
          ].map((tag) => (
            <div
              key={tag.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '8px 16px',
                borderRadius: 100,
                background: tag.bg,
                border: `1px solid ${tag.color}40`,
                fontSize: 12,
                fontWeight: 600,
                color: tag.color,
                letterSpacing: '0.08em',
              }}
            >
              {tag.label}
            </div>
          ))}
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: 14, color: '#444' }}>cnvrted.com</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
