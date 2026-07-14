'use client'

/**
 * Phase 4 preview — Hero section verification.
 *
 * Specimens:
 *   1. Desktop viewport (full hero at 1280px)
 *   2. Tablet viewport (768px)
 *   3. Mobile viewport (375px)
 *   4. Reduced-motion demo
 *   5. Dark-background test
 *   6. Keyboard navigation reference
 *   7. Waitlist success state
 *   8. Animation replay button
 */

import { useState, useCallback } from 'react'
import { HeroSection } from '@/components/sections/HeroSection'
import { HeroVisual } from '@/components/sections/HeroVisual'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/Button'
import { SectionLabel } from '@/components/ui/SectionLabel'

// ─── Preview chrome ───────────────────────────────────────────────────────────

function PreviewFrame({
  label,
  width,
  children,
  className = '',
}: {
  label: string
  width?: number
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={['flex flex-col gap-md', className].join(' ')}>
      <div className="flex items-center gap-sm">
        <span className="text-mono-tag font-mono text-text-tertiary tracking-label uppercase text-caption">
          {label}
        </span>
        {width && (
          <span className="text-mono-tag font-mono text-text-tertiary text-caption">
            — {width}px
          </span>
        )}
      </div>
      <div
        className="border border-border rounded-lg overflow-hidden bg-background"
        style={width ? { width: Math.min(width, 1280), maxWidth: '100%' } : {}}
      >
        {children}
      </div>
    </div>
  )
}

function Divider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-lg py-sm">
      <div className="flex-1 h-px bg-border" />
      <span className="text-caption font-mono text-text-tertiary tracking-label uppercase shrink-0">
        {label}
      </span>
      <div className="flex-1 h-px bg-border" />
    </div>
  )
}

// ─── Keyboard reference table ─────────────────────────────────────────────────

const KEYBOARD_ROWS = [
  { key: 'Tab', action: 'Move focus to next interactive element' },
  { key: 'Shift + Tab', action: 'Move focus to previous interactive element' },
  { key: 'Enter / Space', action: 'Submit the waitlist form (when CTA is focused)' },
  { key: 'Tab (on input)', action: 'Move focus to CTA button; triggers blur validation' },
]

function KeyboardTable() {
  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <table className="w-full text-caption">
        <thead>
          <tr className="border-b border-border bg-surface">
            <th className="text-left px-lg py-md text-text-tertiary font-mono tracking-label uppercase">
              Key
            </th>
            <th className="text-left px-lg py-md text-text-tertiary font-mono tracking-label uppercase">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {KEYBOARD_ROWS.map((row, i) => (
            <tr key={i} className="border-b border-border last:border-0">
              <td className="px-lg py-md font-mono text-text-primary bg-surface/50">
                {row.key}
              </td>
              <td className="px-lg py-md text-text-secondary">{row.action}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Phase4PreviewPage() {
  const [replayKey, setReplayKey] = useState(0)
  const replay = useCallback(() => setReplayKey((k) => k + 1), [])

  return (
    <main id="main-content" className="min-h-screen bg-background pt-16">
      <Container className="py-3xl flex flex-col gap-4xl">

        {/* ── Header ── */}
        <div className="flex flex-col gap-md">
          <p className="text-caption font-mono tracking-label uppercase text-text-tertiary">
            Phase 4 — Hero Section
          </p>
          <h1 className="text-h2 font-semibold text-text-primary">
            Hero section verification
          </h1>
          <p className="text-body text-text-secondary max-w-[480px]">
            All specimens rendered in-page. Resize the browser window or use
            devtools to verify responsive breakpoints.
          </p>
        </div>

        {/* ─────────────────────────────────────────────────────────────── */}
        <Divider label="1 · Full hero (production)" />

        {/* Animation replay */}
        <div className="flex items-center gap-md">
          <Button variant="ghost" compact onClick={replay}>
            Replay animation
          </Button>
          <span className="text-caption text-text-tertiary">
            Remounts the hero — resets all entrance animations.
          </span>
        </div>

        <PreviewFrame label="Desktop — 1280px" width={1280}>
          <HeroSection key={`hero-${replayKey}`} />
        </PreviewFrame>

        {/* ─────────────────────────────────────────────────────────────── */}
        <Divider label="2 · Tablet — 768px" />
        <PreviewFrame label="Tablet" width={768}>
          <HeroSection key={`hero-tablet-${replayKey}`} />
        </PreviewFrame>

        {/* ─────────────────────────────────────────────────────────────── */}
        <Divider label="3 · Mobile — 375px" />
        <PreviewFrame label="Mobile" width={375}>
          <HeroSection key={`hero-mobile-${replayKey}`} />
        </PreviewFrame>

        {/* ─────────────────────────────────────────────────────────────── */}
        <Divider label="4 · Reduced motion" />
        <div className="rounded-lg border border-border bg-surface p-lg">
          <p className="text-body text-text-secondary">
            Enable <span className="font-mono text-text-primary">prefers-reduced-motion: reduce</span> in
            devtools (Rendering panel) then replay the animation. All entrance
            animations collapse to opacity-only fades — no translate, no scale.
          </p>
        </div>

        {/* ─────────────────────────────────────────────────────────────── */}
        <Divider label="5 · Dark background test" />
        <div className="flex flex-col gap-md">
          <div
            className="rounded-lg overflow-hidden border border-border"
            data-theme="dark"
            style={{ background: 'var(--color-background)' }}
          >
            <HeroSection key={`hero-dark-${replayKey}`} />
          </div>
          <p className="text-caption text-text-tertiary">
            Theme tokens applied via data-theme="dark". Verify text and card
            contrast, nav background on scroll.
          </p>
        </div>

        {/* ─────────────────────────────────────────────────────────────── */}
        <Divider label="6 · Keyboard navigation" />
        <div className="flex flex-col gap-xl">
          <KeyboardTable />
          <div className="rounded-lg border border-border bg-surface p-lg">
            <p className="text-body text-text-secondary">
              Tab into the live hero above. Focus order: skip-to-content link →
              nav links → nav CTA → email input → form CTA. Blur the email
              field with an invalid address to trigger inline validation. Press
              Enter on the CTA to submit.
            </p>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────── */}
        <Divider label="7 · Waitlist success state (retired — hero no longer has an inline form)" />
        <PreviewFrame label="Hero no longer renders a form; lead capture lives in Nav's Early access modal" width={1280}>
          <HeroSection />
        </PreviewFrame>

        {/* ─────────────────────────────────────────────────────────────── */}
        <Divider label="8 · Hero visual — isolated" />
        <div className="flex flex-col gap-md">
          <SectionLabel>Hero visual — card stack</SectionLabel>
          <div
            className="rounded-lg border border-border bg-background p-2xl"
            style={{ maxWidth: 440 }}
          >
            <HeroVisual key={`visual-${replayKey}`} />
          </div>
          <p className="text-caption text-text-tertiary">
            Cards 1/2/4/5 at 30% opacity (noise). Card 3 (Meridian Corp) at
            full fidelity. When <span className="font-mono">#reframe-section</span> enters
            viewport (Phase 5), noise cards dim to 10% and the signal card
            pulses once to scale(1.02).
          </p>
        </div>

        {/* ─────────────────────────────────────────────────────────────── */}
        <Divider label="HERO_DELAYS — entrance timing" />
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-caption">
            <thead>
              <tr className="border-b border-border bg-surface">
                <th className="text-left px-lg py-md text-text-tertiary font-mono tracking-label uppercase">
                  Element
                </th>
                <th className="text-left px-lg py-md text-text-tertiary font-mono tracking-label uppercase">
                  Delay
                </th>
                <th className="text-left px-lg py-md text-text-tertiary font-mono tracking-label uppercase">
                  Duration
                </th>
                <th className="text-left px-lg py-md text-text-tertiary font-mono tracking-label uppercase">
                  Motion
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                { el: 'Eyebrow', delay: '0ms', duration: '300ms', motion: 'fadeInUp (y 20→0)' },
                { el: 'Headline', delay: '120ms', duration: '300ms', motion: 'fadeInUp (y 20→0)' },
                { el: 'Subheadline', delay: '220ms', duration: '300ms', motion: 'fadeInUp (y 20→0)' },
                { el: 'Form', delay: '320ms', duration: '300ms', motion: 'fadeInUp (y 20→0)' },
                { el: 'Hero visual', delay: '400ms', duration: '500ms', motion: 'fadeIn (opacity only)' },
                { el: 'Signal card', delay: '550ms (+0.15s)', duration: '500ms', motion: 'fadeIn (opacity only)' },
              ].map((row, i) => (
                <tr key={i} className="border-b border-border last:border-0">
                  <td className="px-lg py-md font-mono text-text-primary">{row.el}</td>
                  <td className="px-lg py-md font-mono text-text-primary">{row.delay}</td>
                  <td className="px-lg py-md font-mono text-text-secondary">{row.duration}</td>
                  <td className="px-lg py-md text-text-secondary">{row.motion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </Container>
    </main>
  )
}
