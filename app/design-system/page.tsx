/**
 * Design System Showcase
 *
 * A living documentation page for every token, component, and interaction
 * pattern in the CNVRTED design system. Intended for design and engineering
 * review before the homepage implementation begins.
 *
 * Not linked from the public site. Access at /design-system.
 */

import { DesignSystemNav } from './DesignSystemNav'
import { FadeInUpDemo, StaggerGroupDemo } from './MotionDemo'
import { Button } from '@/components/ui/Button'
import { Tag } from '@/components/ui/Tag'
import { Badge } from '@/components/ui/Badge'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { SignalCard } from '@/components/ui/SignalCard'
import { SIGNAL_EXAMPLES } from '@/content/copy'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Design System — CNVRTED',
  robots: { index: false, follow: false },
}

// ─── Inline helpers (server-only, not reused outside this page) ───────────────

function SpecimenShell({
  children,
  label,
  noPad = false,
  dark = false,
}: {
  children: React.ReactNode
  label?: string
  noPad?: boolean
  dark?: boolean
}) {
  return (
    <div className="flex flex-col gap-sm">
      <div
        data-theme={dark ? 'dark' : undefined}
        className={[
          'rounded-lg border border-border overflow-hidden',
          dark ? 'bg-background' : 'bg-background',
          noPad ? '' : 'p-xl',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {children}
      </div>
      {label && (
        <p className="text-mono-tag font-mono text-text-tertiary">{label}</p>
      )}
    </div>
  )
}

function SectionHeader({
  eyebrow,
  heading,
  description,
}: {
  eyebrow: string
  heading: string
  description?: string
}) {
  return (
    <div className="mb-2xl">
      <SectionLabel>{eyebrow}</SectionLabel>
      <h2 className="text-h2 text-text-primary mt-sm mb-sm">{heading}</h2>
      {description && (
        <p className="text-body text-text-secondary max-w-prose">{description}</p>
      )}
    </div>
  )
}

function TokenLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-mono-tag font-mono text-text-tertiary">{children}</span>
  )
}

function Divider() {
  return <hr className="border-0 border-t border-border" />
}

// ─── Color swatches ───────────────────────────────────────────────────────────

type Swatch = { name: string; hex: string; note: string }

function SwatchGrid({ swatches }: { swatches: Swatch[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-xl">
      {swatches.map(({ name, hex, note }) => (
        <div key={name} className="flex flex-col gap-sm">
          <div
            className="h-14 rounded-md border border-border"
            style={{ backgroundColor: hex }}
          />
          <div className="flex flex-col gap-xs">
            <span className="text-caption font-mono text-text-primary leading-none">
              {name}
            </span>
            <span className="text-mono-tag font-mono text-text-tertiary">{hex}</span>
            <span className="text-caption text-text-secondary">{note}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DesignSystemPage() {
  const card0 = SIGNAL_EXAMPLES.cards[0]
  const card1 = SIGNAL_EXAMPLES.cards[1]
  const card2 = SIGNAL_EXAMPLES.cards[2]

  return (
    <div className="flex min-h-screen bg-surface pt-14 md:pt-16">

      {/* ── Sticky sidebar ── */}
      <aside className="hidden lg:block w-[220px] shrink-0">
        <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto bg-background border-r border-border flex flex-col gap-xl px-lg py-xl">
          <div>
            <p className="text-mono-tag font-mono text-text-tertiary uppercase tracking-label mb-xs">
              CNVRTED
            </p>
            <p className="text-h3 text-text-primary">Design System</p>
          </div>
          <Divider />
          <DesignSystemNav />
          <div className="mt-auto pt-xl">
            <Divider />
            <p className="text-mono-tag font-mono text-text-tertiary mt-xl">
              v0.2.0 · Phase 2
            </p>
          </div>
        </div>
      </aside>

      {/* ── Main content ── */}
      <main id="main-content" className="flex-1 min-w-0">
        <div className="max-w-[860px] mx-auto px-xl lg:px-2xl py-6xl">

          {/* Page header */}
          <header className="mb-6xl pb-3xl border-b border-border">
            <p className="text-mono-tag font-mono text-text-tertiary uppercase tracking-label mb-lg">
              Component Library
            </p>
            <h1 className="text-display-fluid text-text-primary mb-xl leading-none">
              Design System
            </h1>
            <p className="text-body-lg text-text-secondary max-w-[52ch]">
              Living documentation for CNVRTED's design tokens, UI components,
              and interaction patterns. Every value here is the single source of
              truth — no magic numbers in components.
            </p>
          </header>

          <div className="flex flex-col gap-6xl">

            {/* ══════════════════════════════════════════════════════════════ */}
            {/* TYPOGRAPHY                                                     */}
            {/* ══════════════════════════════════════════════════════════════ */}
            <section id="typography" aria-labelledby="h-typography">
              <SectionHeader
                eyebrow="01 — TYPE"
                heading="Typography"
                description="Two typefaces. General Sans for all display and body text (DM Sans during development). JetBrains Mono for signal tags, step numbers, and technical labels. Weight ceiling: 600."
              />

              <SpecimenShell noPad>
                <div className="divide-y divide-border">

                  {/* Display */}
                  <div className="px-xl py-2xl">
                    <p className="text-display-fluid text-text-primary leading-none mb-lg" style={{ letterSpacing: '-0.01em' }}>
                      Your pipeline isn't empty.
                    </p>
                    <div className="flex flex-wrap gap-lg">
                      <TokenLabel>text-display-fluid</TokenLabel>
                      <TokenLabel>clamp(2.5rem, 5.5vw, 4.5rem) · 40–72px</TokenLabel>
                      <TokenLabel>weight 600</TokenLabel>
                      <TokenLabel>lh 1.05</TokenLabel>
                    </div>
                  </div>

                  {/* H1 */}
                  <div className="px-xl py-2xl">
                    <p className="text-h1-fluid text-text-primary leading-tight mb-lg">
                      Signal detected. Account surfaced.
                    </p>
                    <div className="flex flex-wrap gap-lg">
                      <TokenLabel>text-h1-fluid</TokenLabel>
                      <TokenLabel>clamp(2rem, 4vw, 3rem) · 32–48px</TokenLabel>
                      <TokenLabel>weight 600</TokenLabel>
                      <TokenLabel>lh 1.1</TokenLabel>
                    </div>
                  </div>

                  {/* H2 */}
                  <div className="px-xl py-2xl">
                    <p className="text-h2 text-text-primary mb-lg">
                      Fit was never the problem. Timing was.
                    </p>
                    <div className="flex flex-wrap gap-lg">
                      <TokenLabel>text-h2</TokenLabel>
                      <TokenLabel>clamp(1.625rem, …, 2.25rem) · 26–36px</TokenLabel>
                      <TokenLabel>weight 600</TokenLabel>
                      <TokenLabel>lh 1.15</TokenLabel>
                    </div>
                  </div>

                  {/* H3 */}
                  <div className="px-xl py-2xl">
                    <p className="text-h3 text-text-primary mb-lg">
                      Scaling outbound capacity
                    </p>
                    <div className="flex flex-wrap gap-lg">
                      <TokenLabel>text-h3</TokenLabel>
                      <TokenLabel>clamp(1.25rem, …, 1.5rem) · 20–24px</TokenLabel>
                      <TokenLabel>weight 500</TokenLabel>
                      <TokenLabel>lh 1.25</TokenLabel>
                    </div>
                  </div>

                  {/* Body Large */}
                  <div className="px-xl py-2xl">
                    <p className="text-body-lg text-text-primary mb-lg max-w-prose">
                      Most accounts in your database fit your ICP. Almost none of them are ready to buy right now.
                    </p>
                    <div className="flex flex-wrap gap-lg">
                      <TokenLabel>text-body-lg</TokenLabel>
                      <TokenLabel>clamp(1.0625rem, …, 1.1875rem) · 17–19px</TokenLabel>
                      <TokenLabel>weight 400</TokenLabel>
                      <TokenLabel>lh 1.55</TokenLabel>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="px-xl py-2xl">
                    <p className="text-body text-text-primary mb-lg max-w-prose">
                      Every account in your database technically fits your ICP. Right industry, right size, right title. But fit doesn't tell you who's actually looking for a solution today.
                    </p>
                    <div className="flex flex-wrap gap-lg">
                      <TokenLabel>text-body</TokenLabel>
                      <TokenLabel>clamp(0.9375rem, …, 1rem) · 15–16px</TokenLabel>
                      <TokenLabel>weight 400</TokenLabel>
                      <TokenLabel>lh 1.6</TokenLabel>
                    </div>
                  </div>

                  {/* Caption */}
                  <div className="px-xl py-2xl">
                    <p className="text-caption text-text-secondary mb-lg">
                      Section labels, metadata, and supporting annotations
                    </p>
                    <div className="flex flex-wrap gap-lg">
                      <TokenLabel>text-caption</TokenLabel>
                      <TokenLabel>clamp(0.75rem, …, 0.8125rem) · 12–13px</TokenLabel>
                      <TokenLabel>weight 500</TokenLabel>
                      <TokenLabel>lh 1.4</TokenLabel>
                    </div>
                  </div>

                  {/* Mono Tag */}
                  <div className="px-xl py-2xl">
                    <p className="text-mono-tag font-mono text-text-primary mb-lg tracking-label uppercase">
                      HIRING · FUNDING · TECH CHANGE · HIGH INTENT
                    </p>
                    <div className="flex flex-wrap gap-lg">
                      <TokenLabel>text-mono-tag</TokenLabel>
                      <TokenLabel>clamp(0.6875rem, …, 0.75rem) · 11–12px</TokenLabel>
                      <TokenLabel>weight 500</TokenLabel>
                      <TokenLabel>lh 1.3</TokenLabel>
                      <TokenLabel>font-mono</TokenLabel>
                    </div>
                  </div>

                </div>
              </SpecimenShell>
            </section>

            <Divider />

            {/* ══════════════════════════════════════════════════════════════ */}
            {/* COLORS                                                         */}
            {/* ══════════════════════════════════════════════════════════════ */}
            <section id="colors" aria-labelledby="h-colors">
              <SectionHeader
                eyebrow="02 — COLOR"
                heading="Colors"
                description="One accent color used deliberately. Color signals meaning — not decoration. Every token maps to a specific semantic purpose; no raw hex in components."
              />

              <div className="flex flex-col gap-2xl">

                {/* Surface */}
                <div>
                  <p className="text-caption font-mono text-text-tertiary uppercase tracking-label mb-xl">
                    Surface
                  </p>
                  <SwatchGrid
                    swatches={[
                      { name: 'color-background',    hex: '#FFFFFF', note: 'Page background' },
                      { name: 'color-surface',        hex: '#F7F7F8', note: 'Section differentiation' },
                      { name: 'color-surface-raised', hex: '#FFFFFF', note: 'Cards above the surface' },
                      { name: 'color-border',         hex: '#E7E7EA', note: 'Hairlines, dividers' },
                    ]}
                  />
                </div>

                {/* Text */}
                <div>
                  <p className="text-caption font-mono text-text-tertiary uppercase tracking-label mb-xl">
                    Text
                  </p>
                  <SwatchGrid
                    swatches={[
                      { name: 'color-text-primary',   hex: '#0E0E10', note: 'Headlines, primary body' },
                      { name: 'color-text-secondary', hex: '#5C5C66', note: 'Supporting copy' },
                      { name: 'color-text-tertiary',  hex: '#9A9AA3', note: 'Labels, placeholders' },
                    ]}
                  />
                </div>

                {/* Accent */}
                <div>
                  <p className="text-caption font-mono text-text-tertiary uppercase tracking-label mb-xl">
                    Accent
                  </p>
                  <SwatchGrid
                    swatches={[
                      { name: 'color-accent',       hex: '#2B5CE6', note: 'CTAs, tags, active states' },
                      { name: 'color-accent-hover', hex: '#2450CC', note: 'Button hover (10% darker)' },
                      { name: 'color-accent-link',  hex: '#1A47C8', note: 'Inline links, WCAG AA body text' },
                      { name: 'color-accent-dim',   hex: '#EDF0FF', note: 'Tag & badge backgrounds' },
                    ]}
                  />
                </div>

                {/* State */}
                <div>
                  <p className="text-caption font-mono text-text-tertiary uppercase tracking-label mb-xl">
                    State
                  </p>
                  <SwatchGrid
                    swatches={[
                      { name: 'color-intent-medium-bg',   hex: '#F5F0E8', note: 'MEDIUM INTENT background' },
                      { name: 'color-intent-medium-text', hex: '#7A5C1A', note: 'MEDIUM INTENT text' },
                      { name: 'color-success',            hex: '#1E9E6B', note: 'Form success state only' },
                      { name: 'color-error',              hex: '#D93025', note: 'Form validation only' },
                    ]}
                  />
                </div>

                {/* Dark section */}
                <div>
                  <p className="text-caption font-mono text-text-tertiary uppercase tracking-label mb-xl">
                    Dark Section (How It Works)
                  </p>
                  <div
                    data-theme="dark"
                    className="rounded-lg bg-background border border-border p-xl"
                  >
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-xl">
                      {[
                        { name: 'color-dark-bg',           hex: '#0B0B0E', note: 'Section background' },
                        { name: 'color-dark-surface',      hex: '#141417', note: 'Cards in dark context' },
                        { name: 'color-dark-border',       hex: '#242428', note: 'Borders in dark context' },
                        { name: 'color-dark-text-primary', hex: '#F2F2F4', note: 'Primary text' },
                        { name: 'color-dark-text-secondary', hex: '#9A9AA3', note: 'Secondary text' },
                        { name: 'color-dark-text-tertiary',  hex: '#5C5C66', note: 'Least-important text' },
                        { name: 'color-accent-dark',       hex: '#6B8FFF', note: 'Brightened for dark bg' },
                      ].map(({ name, hex, note }) => (
                        <div key={name} className="flex flex-col gap-sm">
                          <div
                            className="h-14 rounded-md border border-border"
                            style={{ backgroundColor: hex }}
                          />
                          <div className="flex flex-col gap-xs">
                            <span className="text-caption font-mono text-text-primary leading-none">{name}</span>
                            <span className="text-mono-tag font-mono text-text-tertiary">{hex}</span>
                            <span className="text-caption text-text-secondary">{note}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </section>

            <Divider />

            {/* ══════════════════════════════════════════════════════════════ */}
            {/* BUTTONS                                                        */}
            {/* ══════════════════════════════════════════════════════════════ */}
            <section id="buttons" aria-labelledby="h-buttons">
              <SectionHeader
                eyebrow="03 — INTERACTION"
                heading="Buttons"
                description="One primary action per page section. No gradients, no glow, no shadows on the button itself. Hover is color-only. Active scales to 0.98."
              />

              <div className="flex flex-col gap-lg">

                {/* Primary states */}
                <SpecimenShell label="Primary — all interactive states">
                  <div className="flex flex-wrap items-start gap-xl">

                    {/* Default */}
                    <div className="flex flex-col items-start gap-sm">
                      <Button>Join the waitlist</Button>
                      <TokenLabel>Default</TokenLabel>
                    </div>

                    {/* Hover (forced) */}
                    <div className="flex flex-col items-start gap-sm">
                      <span
                        className="inline-flex items-center justify-center gap-2 rounded-md text-body font-medium py-3 px-6 text-on-accent"
                        style={{ backgroundColor: '#2450CC' }}
                        aria-hidden="true"
                      >
                        Join the waitlist
                      </span>
                      <TokenLabel>Hover · bg-accent-hover #2450CC</TokenLabel>
                    </div>

                    {/* Focus (forced) */}
                    <div className="flex flex-col items-start gap-sm p-xs">
                      <span
                        className="inline-flex items-center justify-center gap-2 rounded-md text-body font-medium py-3 px-6 bg-accent text-on-accent"
                        style={{ outline: '2px solid white', outlineOffset: '2px', boxShadow: '0 0 0 4px #2B5CE6' }}
                        aria-hidden="true"
                      >
                        Join the waitlist
                      </span>
                      <TokenLabel>Focus · 2px white outline · 2px offset</TokenLabel>
                    </div>

                    {/* Loading */}
                    <div className="flex flex-col items-start gap-sm">
                      <Button loading>Join the waitlist</Button>
                      <TokenLabel>Loading · aria-busy</TokenLabel>
                    </div>

                    {/* Disabled */}
                    <div className="flex flex-col items-start gap-sm">
                      <Button disabled>Join the waitlist</Button>
                      <TokenLabel>Disabled · opacity-50</TokenLabel>
                    </div>

                  </div>
                </SpecimenShell>

                {/* Ghost + compact */}
                <SpecimenShell label="Ghost variant + compact (nav) size">
                  <div className="flex flex-wrap items-start gap-xl">
                    <div className="flex flex-col items-start gap-sm">
                      <Button variant="ghost">Ghost variant</Button>
                      <TokenLabel>Ghost · border-accent · bg-accent-dim on hover</TokenLabel>
                    </div>
                    <div className="flex flex-col items-start gap-sm">
                      <Button variant="ghost" disabled>Ghost disabled</Button>
                      <TokenLabel>Ghost · disabled</TokenLabel>
                    </div>
                    <div className="flex flex-col items-start gap-sm">
                      <Button compact>Join the waitlist</Button>
                      <TokenLabel>Compact · py-[10px] px-5 · nav-bar size</TokenLabel>
                    </div>
                  </div>
                </SpecimenShell>

              </div>
            </section>

            <Divider />

            {/* ══════════════════════════════════════════════════════════════ */}
            {/* TAGS & BADGES                                                  */}
            {/* ══════════════════════════════════════════════════════════════ */}
            <section id="tags" aria-labelledby="h-tags">
              <SectionHeader
                eyebrow="04 — LABELS"
                heading="Tags & Badges"
                description="Signal-type tags classify the trigger event. Intent badges communicate urgency. Both use JetBrains Mono at text-mono-tag scale. Same shape — different color semantics."
              />

              <div className="flex flex-col gap-lg">

                <SpecimenShell label="Signal-type tags — text-mono-tag · font-mono · accent on accent-dim · 8px radius · 4px/10px padding">
                  <div className="flex flex-wrap gap-lg items-center">
                    <div className="flex flex-col items-start gap-sm">
                      <Tag type="HIRING" />
                      <TokenLabel>HIRING</TokenLabel>
                    </div>
                    <div className="flex flex-col items-start gap-sm">
                      <Tag type="FUNDING" />
                      <TokenLabel>FUNDING</TokenLabel>
                    </div>
                    <div className="flex flex-col items-start gap-sm">
                      <Tag type="TECH CHANGE" />
                      <TokenLabel>TECH CHANGE</TokenLabel>
                    </div>
                  </div>
                </SpecimenShell>

                <SpecimenShell label="Intent score badges — HIGH: accent-dim bg · MEDIUM: intent-medium bg + amber text">
                  <div className="flex flex-wrap gap-lg items-center">
                    <div className="flex flex-col items-start gap-sm">
                      <Badge level="HIGH" />
                      <TokenLabel>HIGH INTENT · accent-dim / accent</TokenLabel>
                    </div>
                    <div className="flex flex-col items-start gap-sm">
                      <Badge level="MEDIUM" />
                      <TokenLabel>MEDIUM INTENT · intent-medium-bg / intent-medium-text</TokenLabel>
                    </div>
                  </div>
                </SpecimenShell>

                <SpecimenShell label="Tags and badges on dark surface — tokens auto-resolve via [data-theme=dark]" dark>
                  <div className="flex flex-wrap gap-lg items-center p-xl">
                    <Tag type="HIRING" />
                    <Tag type="FUNDING" />
                    <Tag type="TECH CHANGE" />
                    <Badge level="HIGH" />
                    <Badge level="MEDIUM" />
                  </div>
                </SpecimenShell>

              </div>
            </section>

            <Divider />

            {/* ══════════════════════════════════════════════════════════════ */}
            {/* SECTION LABELS                                                 */}
            {/* ══════════════════════════════════════════════════════════════ */}
            <section id="section-labels" aria-labelledby="h-section-labels">
              <SectionHeader
                eyebrow="05 — EYEBROWS"
                heading="Section Labels"
                description="Uppercase mono labels that orient the reader before the main headline. Not part of the heading hierarchy — rendered as <p>. Always text-tertiary; intentionally quiet."
              />

              <div className="flex flex-col gap-lg">

                <SpecimenShell label="On white background (color-background)">
                  <div className="flex flex-col gap-xl">
                    <SectionLabel>WHAT A SIGNAL LOOKS LIKE</SectionLabel>
                    <SectionLabel>HOW IT WORKS</SectionLabel>
                    <SectionLabel>THE HONEST COMPARISON</SectionLabel>
                    <SectionLabel>BUILT TO FIT</SectionLabel>
                  </div>
                </SpecimenShell>

                <SpecimenShell label="On surface background (color-surface)">
                  <div className="-m-xl p-xl rounded-lg bg-surface">
                    <div className="flex flex-col gap-xl">
                      <SectionLabel>WHAT A SIGNAL LOOKS LIKE</SectionLabel>
                      <SectionLabel>THE HONEST COMPARISON</SectionLabel>
                    </div>
                  </div>
                </SpecimenShell>

                <SpecimenShell label="On dark background — tokens auto-resolve via [data-theme=dark]" dark noPad>
                  <div className="p-xl bg-background rounded-lg">
                    <div className="flex flex-col gap-xl">
                      <SectionLabel>HOW IT WORKS</SectionLabel>
                      <SectionLabel>SIGNAL DETECTED</SectionLabel>
                    </div>
                  </div>
                </SpecimenShell>

              </div>
            </section>

            <Divider />

            {/* ══════════════════════════════════════════════════════════════ */}
            {/* SIGNAL CARD                                                    */}
            {/* ══════════════════════════════════════════════════════════════ */}
            <section id="signal-card" aria-labelledby="h-signal-card">
              <SectionHeader
                eyebrow="06 — PRIMARY COMPONENT"
                heading="Signal Card"
                description="The most important UI element on the site. Each card surfaces one trigger event with its implication and urgency score. 12px radius, 20/24px padding, hairline border."
              />

              <div className="flex flex-col gap-lg">

                {/* Default + hover */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
                  <SpecimenShell label="Default — interactive hover (hover over the card)">
                    <SignalCard card={card0} animateOn="none" />
                  </SpecimenShell>

                  <SpecimenShell label="Hover state — translateY(-2px) · shadow-card-hover">
                    <SignalCard card={card0} animateOn="none" forceHover />
                  </SpecimenShell>
                </div>

                {/* Muted / dimmed */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
                  <SpecimenShell label="Noise / muted — opacity 0.3 (hero background cards)">
                    <div className="bg-surface rounded-md p-md">
                      <SignalCard card={card1} animateOn="none" variant="noise" />
                    </div>
                  </SpecimenShell>

                  <SpecimenShell label="Dimmed — opacity 0.1 (noise cards when Reframe section enters viewport)">
                    <div className="bg-surface rounded-md p-md">
                      <SignalCard card={card1} animateOn="none" variant="dimmed" />
                    </div>
                  </SpecimenShell>
                </div>

                {/* Dark background */}
                <SpecimenShell
                  label="On dark background — How It Works context · tokens auto-resolve · no shadow (borders do elevation on dark bg)"
                  dark
                  noPad
                >
                  <div data-theme="dark" className="bg-background p-xl rounded-lg">
                    <SignalCard card={card2} animateOn="none" />
                  </div>
                </SpecimenShell>

                {/* Width variants */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-lg items-start">
                  <SpecimenShell label="Mobile width · max 360px · full-width single-column">
                    <div className="max-w-[360px]">
                      <SignalCard card={card0} animateOn="none" />
                    </div>
                  </SpecimenShell>

                  <SpecimenShell label="Desktop specimen width · ~480px · Signal Examples section">
                    <div className="max-w-[480px]">
                      <SignalCard card={card1} animateOn="none" />
                    </div>
                  </SpecimenShell>
                </div>

                {/* All three cards */}
                <SpecimenShell label="All three signal cards — as they appear in the Signal Examples section">
                  <div className="grid grid-cols-1 gap-lg">
                    <SignalCard card={card0} animateOn="none" />
                    <SignalCard card={card1} animateOn="none" />
                    <SignalCard card={card2} animateOn="none" />
                  </div>
                </SpecimenShell>

              </div>
            </section>

            <Divider />

            {/* ══════════════════════════════════════════════════════════════ */}
            {/* MOTION                                                         */}
            {/* ══════════════════════════════════════════════════════════════ */}
            <section id="motion" aria-labelledby="h-motion">
              <SectionHeader
                eyebrow="07 — MOTION"
                heading="Motion"
                description="Every animation answers one of three questions: Where did that come from? What just changed? What should I look at next? Duration ceiling: 500ms. No bounce, no linear, no parallax."
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-xl">

                <SpecimenShell noPad label="FadeInUp · threshold 0.2 · once · reduced-motion degrades to fade only">
                  <div className="p-xl">
                    <FadeInUpDemo />
                  </div>
                </SpecimenShell>

                <SpecimenShell noPad label="StaggerGroup · 80ms between children · children inherit fadeInUp variant">
                  <div className="p-xl">
                    <StaggerGroupDemo />
                  </div>
                </SpecimenShell>

              </div>

              {/* Timing reference */}
              <div className="mt-xl rounded-lg border border-border bg-surface-raised overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="py-md px-xl text-caption font-mono text-text-tertiary uppercase tracking-label">Token</th>
                      <th className="py-md px-xl text-caption font-mono text-text-tertiary uppercase tracking-label">Duration</th>
                      <th className="py-md px-xl text-caption font-mono text-text-tertiary uppercase tracking-label">Usage</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {[
                      { token: 'DURATION.instant', ms: '110ms', usage: 'Hover states, button press feedback' },
                      { token: 'DURATION.fast',    ms: '200ms', usage: 'Nav scroll transition, card hover lift' },
                      { token: 'DURATION.base',    ms: '300ms', usage: 'Standard scroll-reveal entrance' },
                      { token: 'DURATION.slow',    ms: '500ms', usage: 'Hero entrance visual, noise→signal' },
                    ].map(({ token, ms, usage }) => (
                      <tr key={token}>
                        <td className="py-md px-xl text-mono-tag font-mono text-accent">{token}</td>
                        <td className="py-md px-xl text-mono-tag font-mono text-text-primary">{ms}</td>
                        <td className="py-md px-xl text-caption text-text-secondary">{usage}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <Divider />

            {/* ══════════════════════════════════════════════════════════════ */}
            {/* SPACING                                                        */}
            {/* ══════════════════════════════════════════════════════════════ */}
            <section id="spacing" aria-labelledby="h-spacing">
              <SectionHeader
                eyebrow="08 — SPACING"
                heading="Spacing Scale"
                description="8px base unit. 11 semantic steps from xs (4px) to 7xl (192px). Components reference tokens by name — never raw pixel values. Generates p-{name}, m-{name}, gap-{name} utilities."
              />

              <SpecimenShell noPad>
                <div className="divide-y divide-border">
                  {[
                    { name: 'xs',  px: 4,   var: '--spacing-xs',  utility: 'p-xs / m-xs / gap-xs' },
                    { name: 'sm',  px: 8,   var: '--spacing-sm',  utility: 'p-sm / m-sm / gap-sm' },
                    { name: 'md',  px: 12,  var: '--spacing-md',  utility: 'p-md / m-md / gap-md' },
                    { name: 'lg',  px: 16,  var: '--spacing-lg',  utility: 'p-lg / m-lg / gap-lg' },
                    { name: 'xl',  px: 24,  var: '--spacing-xl',  utility: 'p-xl / m-xl / gap-xl' },
                    { name: '2xl', px: 32,  var: '--spacing-2xl', utility: 'p-2xl / m-2xl / gap-2xl' },
                    { name: '3xl', px: 48,  var: '--spacing-3xl', utility: 'p-3xl / m-3xl / gap-3xl' },
                    { name: '4xl', px: 64,  var: '--spacing-4xl', utility: 'p-4xl / m-4xl / gap-4xl' },
                    { name: '5xl', px: 96,  var: '--spacing-5xl', utility: 'p-5xl / m-5xl / gap-5xl' },
                    { name: '6xl', px: 128, var: '--spacing-6xl', utility: 'p-6xl · section-desktop' },
                    { name: '7xl', px: 192, var: '--spacing-7xl', utility: 'p-7xl · hero min-height' },
                  ].map(({ name, px, var: cssVar, utility }) => (
                    <div key={name} className="flex items-center gap-xl px-xl py-md">
                      {/* Token name */}
                      <span className="text-mono-tag font-mono text-accent w-[2.5rem] shrink-0">{name}</span>

                      {/* Visual bar — capped at 320px for the largest values */}
                      <div
                        className="h-[4px] rounded-full bg-accent shrink-0"
                        style={{ width: Math.min(px * 1.4, 320) }}
                        aria-hidden="true"
                      />

                      {/* Metadata */}
                      <div className="flex items-center gap-xl min-w-0 ml-auto">
                        <span className="text-mono-tag font-mono text-text-primary w-[3rem] text-right shrink-0">
                          {px}px
                        </span>
                        <span className="text-mono-tag font-mono text-text-tertiary hidden sm:block">{cssVar}</span>
                        <span className="text-caption text-text-secondary hidden md:block">{utility}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </SpecimenShell>

            </section>

            <Divider />

            {/* ══════════════════════════════════════════════════════════════ */}
            {/* THEME                                                          */}
            {/* ══════════════════════════════════════════════════════════════ */}
            <section id="theme" aria-labelledby="h-theme">
              <SectionHeader
                eyebrow="09 — THEME"
                heading="Light & Dark"
                description="Dark theme is applied via data-theme='dark' on the How It Works section element — not a global color scheme toggle. Standard color tokens remap automatically. No Tailwind dark: variants needed."
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-lg items-start">

                {/* Light */}
                <div className="flex flex-col gap-md">
                  <p className="text-caption font-mono text-text-tertiary uppercase tracking-label">
                    Light · default token values
                  </p>
                  <div className="rounded-lg border border-border bg-background overflow-hidden">
                    {/* Nav mockup */}
                    <div className="flex items-center justify-between px-xl py-md border-b border-border">
                      <span className="text-h3 text-text-primary">CNVRTED</span>
                      <Button compact>Join the waitlist</Button>
                    </div>
                    {/* Content */}
                    <div className="p-xl flex flex-col gap-xl">
                      <div>
                        <SectionLabel>HOW IT WORKS</SectionLabel>
                        <p className="text-h3 text-text-primary mt-sm">
                          Signal detected. Account surfaced.
                        </p>
                        <p className="text-body text-text-secondary mt-sm">
                          Every signal is matched against your ICP and scored for urgency.
                        </p>
                      </div>
                      <div className="flex gap-sm flex-wrap">
                        <Tag type="HIRING" />
                        <Badge level="HIGH" />
                      </div>
                      <SignalCard card={card2} animateOn="none" />
                    </div>
                    {/* Surface mockup */}
                    <div className="bg-surface px-xl py-lg border-t border-border">
                      <p className="text-caption text-text-tertiary font-mono">
                        color-surface · #F7F7F8
                      </p>
                    </div>
                  </div>
                </div>

                {/* Dark */}
                <div className="flex flex-col gap-md">
                  <p className="text-caption font-mono text-text-tertiary uppercase tracking-label">
                    Dark · data-theme=&quot;dark&quot; override
                  </p>
                  <div
                    data-theme="dark"
                    className="rounded-lg border border-border bg-background overflow-hidden"
                  >
                    {/* Nav mockup */}
                    <div className="flex items-center justify-between px-xl py-md border-b border-border">
                      <span className="text-h3 text-text-primary">CNVRTED</span>
                      <Button compact>Join the waitlist</Button>
                    </div>
                    {/* Content */}
                    <div className="p-xl flex flex-col gap-xl">
                      <div>
                        <SectionLabel>HOW IT WORKS</SectionLabel>
                        <p className="text-h3 text-text-primary mt-sm">
                          Signal detected. Account surfaced.
                        </p>
                        <p className="text-body text-text-secondary mt-sm">
                          Every signal is matched against your ICP and scored for urgency.
                        </p>
                      </div>
                      <div className="flex gap-sm flex-wrap">
                        <Tag type="HIRING" />
                        <Badge level="HIGH" />
                      </div>
                      <SignalCard card={card2} animateOn="none" />
                    </div>
                    {/* Surface mockup */}
                    <div className="bg-surface px-xl py-lg border-t border-border">
                      <p className="text-caption text-text-tertiary font-mono">
                        color-surface → #141417 via [data-theme=dark]
                      </p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Token override reference */}
              <div className="mt-xl rounded-lg border border-border bg-surface-raised overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="py-md px-xl text-caption font-mono text-text-tertiary uppercase tracking-label">Token</th>
                      <th className="py-md px-xl text-caption font-mono text-text-tertiary uppercase tracking-label">Light value</th>
                      <th className="py-md px-xl text-caption font-mono text-text-tertiary uppercase tracking-label">Dark override</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {[
                      { token: 'color-background',     light: '#FFFFFF', dark: '#0B0B0E' },
                      { token: 'color-surface',         light: '#F7F7F8', dark: '#141417' },
                      { token: 'color-border',          light: '#E7E7EA', dark: '#242428' },
                      { token: 'color-text-primary',    light: '#0E0E10', dark: '#F2F2F4' },
                      { token: 'color-text-secondary',  light: '#5C5C66', dark: '#9A9AA3' },
                      { token: 'color-text-tertiary',   light: '#9A9AA3', dark: '#5C5C66' },
                      { token: 'color-accent',          light: '#2B5CE6', dark: '#6B8FFF' },
                    ].map(({ token, light, dark }) => (
                      <tr key={token}>
                        <td className="py-md px-xl text-mono-tag font-mono text-text-primary">{token}</td>
                        <td className="py-md px-xl">
                          <span className="inline-flex items-center gap-sm">
                            <span
                              className="inline-block w-3 h-3 rounded-sm border border-border shrink-0"
                              style={{ backgroundColor: light }}
                              aria-hidden="true"
                            />
                            <span className="text-mono-tag font-mono text-text-secondary">{light}</span>
                          </span>
                        </td>
                        <td className="py-md px-xl">
                          <span className="inline-flex items-center gap-sm">
                            <span
                              className="inline-block w-3 h-3 rounded-sm border border-border shrink-0"
                              style={{ backgroundColor: dark }}
                              aria-hidden="true"
                            />
                            <span className="text-mono-tag font-mono text-text-secondary">{dark}</span>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </section>

          </div>{/* end sections */}

          {/* Page footer */}
          <footer className="mt-6xl pt-3xl border-t border-border">
            <p className="text-caption text-text-tertiary font-mono">
              CNVRTED Design System · Phase 2 complete · Phase 3 (Nav + Hero) pending approval
            </p>
          </footer>

        </div>
      </main>
    </div>
  )
}
