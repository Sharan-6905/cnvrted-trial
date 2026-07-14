/**
 * Phase 3 Preview — Navigation & Motion Foundation
 *
 * Demonstrates every deliverable from Phase 3:
 *   1. Transparent nav (visible on page load when hero-headline is in viewport)
 *   2. Scrolled nav (solid white + border, triggers when headline scrolls past top)
 *   3. Mobile menu (tap the hamburger at any viewport width)
 *   4. HeroEntrance animation (mount-triggered staggered reveal)
 *   5. FadeInUp (scroll-triggered opacity + translateY)
 *   6. StaggerGroup (scroll-triggered staggered children)
 *   7. Reduced-motion mode (CSS + JS layers explained)
 *   8. Keyboard navigation (tab order demonstration)
 *   9. Skip-to-content (Tab on page load)
 *
 * The mock hero section has id="hero-headline" on the h1 — this is the element
 * the Nav's useNavScrolled hook observes. Scroll past it to see the nav transition.
 *
 * Not linked from the public site. Access at /phase3-preview.
 */

import type { Metadata } from 'next'
import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Button } from '@/components/ui/Button'
import { Tag } from '@/components/ui/Tag'
import { Badge } from '@/components/ui/Badge'
import { FadeInUp } from '@/components/motion/FadeInUp'
import { StaggerGroup, StaggerItem } from '@/components/motion/StaggerGroup'
import { HeroEntrance, HeroItem } from '@/components/motion/HeroEntrance'
import { HERO_DELAYS } from '@/lib/tokens'
import { NAV, SIGNAL_EXAMPLES } from '@/content/copy'

export const metadata: Metadata = {
  title: 'Phase 3 Preview — CNVRTED',
  robots: { index: false, follow: false },
}

// ─── Local helpers ────────────────────────────────────────────────────────────

function SectionHeader({
  step,
  title,
  description,
}: {
  step: string
  title: string
  description: string
}) {
  return (
    <div className="mb-2xl">
      <SectionLabel>{step}</SectionLabel>
      <h2 className="text-h2 text-text-primary mt-sm mb-sm">{title}</h2>
      <p className="text-body text-text-secondary max-w-prose">{description}</p>
    </div>
  )
}

function PreviewCard({ children, label }: { children: React.ReactNode; label?: string }) {
  return (
    <div className="flex flex-col gap-sm">
      <div className="rounded-lg border border-border bg-background p-xl overflow-hidden">
        {children}
      </div>
      {label && (
        <p className="text-mono-tag font-mono text-text-tertiary">{label}</p>
      )}
    </div>
  )
}

function Divider() {
  return <hr className="border-0 border-t border-border" />
}

function KeyboardKey({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="inline-flex items-center justify-center min-w-[1.75rem] h-7 px-sm rounded border border-border bg-surface text-caption font-mono text-text-secondary shadow-[0_1px_0_0_var(--color-border)]">
      {children}
    </kbd>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Phase3PreviewPage() {
  return (
    <div id="main-content" className="bg-surface">

      {/* ══════════════════════════════════════════════════════════════════════
          MOCK HERO — contains id="hero-headline" which Nav observes.
          The Nav stays transparent while this headline is in the viewport.
          Scroll past it (or past the top of this div) → nav goes solid.
          ══════════════════════════════════════════════════════════════════════ */}
      <section
        aria-label="Phase 3 preview hero"
        className="relative min-h-screen bg-background flex items-center"
      >
        {/* Background grid to make the transparent nav state more visible */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
          aria-hidden="true"
        />

        <Container className="relative z-10 flex flex-col items-center text-center gap-xl py-6xl">

          {/* HeroEntrance demo: each item uses HERO_DELAYS for per-child timing */}
          <HeroEntrance className="flex flex-col items-center gap-xl w-full">

            <HeroItem delay={HERO_DELAYS.eyebrow}>
              <SectionLabel>Phase 3 — Navigation & Motion Foundation</SectionLabel>
            </HeroItem>

            <HeroItem delay={HERO_DELAYS.headline}>
              {/* id="hero-headline" is the IntersectionObserver target for the Nav */}
              <h1
                id="hero-headline"
                className="text-display-fluid text-text-primary max-w-[18ch] mx-auto"
                style={{ letterSpacing: '-0.01em' }}
              >
                Foundation complete. Scroll to see the nav change.
              </h1>
            </HeroItem>

            <HeroItem delay={HERO_DELAYS.subheadline}>
              <p className="text-body-lg text-text-secondary max-w-[52ch] mx-auto">
                This page demonstrates every Phase 3 deliverable: navigation, mobile menu,
                scroll detection, motion wrappers, reduced motion, and keyboard navigation.
              </p>
            </HeroItem>

            <HeroItem delay={HERO_DELAYS.form}>
              <div className="flex flex-wrap items-center justify-center gap-lg mt-sm">
                <Button href="#nav-demo">See all demos ↓</Button>
                <Button href="/design-system" variant="ghost">Design system →</Button>
              </div>
            </HeroItem>

          </HeroEntrance>

          <p className="text-caption text-text-tertiary font-mono mt-3xl animate-bounce">
            ↓ scroll to trigger nav transition
          </p>

        </Container>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          MAIN PREVIEW CONTENT
          ══════════════════════════════════════════════════════════════════════ */}
      <main id="nav-demo">
        <Container className="py-6xl">
          <div className="max-w-[800px] mx-auto flex flex-col gap-6xl">

            {/* Page header */}
            <FadeInUp>
              <header className="pb-3xl border-b border-border">
                <SectionLabel>Component Preview</SectionLabel>
                <h2 className="text-h1-fluid text-text-primary mt-sm mb-xl">
                  Phase 3 Deliverables
                </h2>
                <p className="text-body-lg text-text-secondary max-w-[52ch]">
                  Six motion and navigation primitives. Every one respects{' '}
                  <code className="text-mono-tag font-mono bg-surface px-sm py-xs rounded-sm">
                    prefers-reduced-motion
                  </code>{' '}
                  and is operable by keyboard alone.
                </p>
              </header>
            </FadeInUp>

            {/* ── 01 NAV SCROLL ──────────────────────────────────────────────── */}
            <section aria-labelledby="h-nav-scroll">
              <FadeInUp>
                <SectionHeader
                  step="01 — NAVIGATION"
                  title="Transparent → Scrolled"
                  description="The nav starts transparent over the hero. When the hero headline (#hero-headline) scrolls past the viewport top, the nav transitions to solid white with a hairline bottom border. The trigger is an IntersectionObserver — no scroll event listener."
                />
              </FadeInUp>

              <StaggerGroup className="flex flex-col gap-lg">

                <StaggerItem>
                  <PreviewCard label="Transparent state — nav background: transparent, border: transparent">
                    <div className="relative h-14 rounded-md overflow-hidden">
                      {/* Mock page background */}
                      <div
                        className="absolute inset-0"
                        style={{
                          background: 'linear-gradient(to bottom, #f7f7f8, #ffffff)',
                        }}
                        aria-hidden="true"
                      />
                      {/* Mock nav bar */}
                      <div className="absolute inset-0 flex items-center px-6 justify-between">
                        <span className="text-h3 text-text-primary">CNVRTED</span>
                        <div className="flex items-center gap-6">
                          <span className="text-body text-text-secondary hidden sm:block">Product</span>
                          <span className="text-body text-text-secondary hidden sm:block">How it works</span>
                          <span className="text-body text-text-secondary hidden sm:block">Why CNVRTED</span>
                          <span className="inline-flex items-center justify-center bg-accent text-on-accent text-caption font-medium rounded-md py-[6px] px-4">
                            Join the waitlist
                          </span>
                        </div>
                      </div>
                    </div>
                  </PreviewCard>
                </StaggerItem>

                <StaggerItem>
                  <PreviewCard label="Scrolled state — bg-background + 1px border-border bottom edge. No backdrop blur.">
                    <div className="relative h-14 rounded-md overflow-hidden">
                      <div
                        className="absolute inset-0 bg-background border border-border rounded-md"
                        aria-hidden="true"
                      />
                      <div className="absolute inset-0 flex items-center px-6 justify-between">
                        <span className="text-h3 text-text-primary">CNVRTED</span>
                        <div className="flex items-center gap-6">
                          <span className="text-body text-text-secondary hidden sm:block">Product</span>
                          <span className="text-body text-text-secondary hidden sm:block">How it works</span>
                          <span className="text-body text-text-secondary hidden sm:block">Why CNVRTED</span>
                          <span className="inline-flex items-center justify-center bg-accent text-on-accent text-caption font-medium rounded-md py-[6px] px-4">
                            Join the waitlist
                          </span>
                        </div>
                      </div>
                    </div>
                  </PreviewCard>
                </StaggerItem>

              </StaggerGroup>

              <FadeInUp className="mt-xl">
                <div className="rounded-lg border border-border bg-surface-raised overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="py-md px-xl text-caption font-mono text-text-tertiary uppercase tracking-label">Property</th>
                        <th className="py-md px-xl text-caption font-mono text-text-tertiary uppercase tracking-label">Transparent</th>
                        <th className="py-md px-xl text-caption font-mono text-text-tertiary uppercase tracking-label">Scrolled</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {[
                        ['background', 'transparent', 'color-background (#FFFFFF)'],
                        ['border-bottom', 'transparent', '1px solid color-border (#E7E7EA)'],
                        ['transition', '200ms ease-in-out', '200ms ease-in-out'],
                        ['trigger', '—', 'hero-headline leaves viewport'],
                        ['method', '—', 'IntersectionObserver (threshold: 0)'],
                        ['hide on scroll', 'no', 'no — nav persists at all times'],
                      ].map(([prop, a, b]) => (
                        <tr key={prop}>
                          <td className="py-md px-xl text-mono-tag font-mono text-accent">{prop}</td>
                          <td className="py-md px-xl text-caption text-text-secondary">{a}</td>
                          <td className="py-md px-xl text-caption text-text-secondary">{b}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </FadeInUp>
            </section>

            <Divider />

            {/* ── 02 MOBILE MENU ─────────────────────────────────────────────── */}
            <section aria-labelledby="h-mobile-menu">
              <FadeInUp>
                <SectionHeader
                  step="02 — MOBILE NAV"
                  title="Hamburger & Full-screen Menu"
                  description="Tap the hamburger icon in the nav bar to open the full-screen mobile menu. The nav header stays on top (z-50) so the CTA and close icon are always visible. Close via: X icon, Escape key, or tapping the backdrop."
                />
              </FadeInUp>

              <StaggerGroup className="flex flex-col gap-lg">

                <StaggerItem>
                  <PreviewCard label="Mobile header — CTA always visible. Hamburger → X animation (200ms CSS transition).">
                    <div className="flex items-center justify-between h-14 px-2">
                      <span className="text-h3 text-text-primary">CNVRTED</span>
                      <div className="flex items-center gap-3">
                        <span className="inline-flex items-center justify-center bg-accent text-on-accent text-caption font-medium rounded-md py-[6px] px-4">
                          Join the waitlist
                        </span>
                        {/* Static hamburger representation */}
                        <div className="flex flex-col gap-[5px] w-10 h-10 items-center justify-center" aria-hidden="true">
                          <span className="block w-5 h-[1.5px] bg-text-primary rounded-full" />
                          <span className="block w-5 h-[1.5px] bg-text-primary rounded-full" />
                          <span className="block w-5 h-[1.5px] bg-text-primary rounded-full" />
                        </div>
                      </div>
                    </div>
                  </PreviewCard>
                </StaggerItem>

                <StaggerItem>
                  <PreviewCard label="Mobile menu open state — full-screen overlay, links at h2 scale, center-aligned.">
                    <div className="relative rounded-md overflow-hidden bg-background" style={{ minHeight: 320 }}>
                      {/* Simulated menu overlay */}
                      <div className="flex flex-col items-center justify-center gap-2xl py-3xl">
                        {NAV.links.map((link) => (
                          <span key={link.label} className="text-h2 text-text-primary text-center">
                            {link.label}
                          </span>
                        ))}
                        <Button href={NAV.cta.href} className="mt-lg">
                          {NAV.cta.label}
                        </Button>
                      </div>
                      {/* Simulated header on top */}
                      <div className="absolute top-0 inset-x-0 h-14 bg-background border-b border-border flex items-center justify-between px-6">
                        <span className="text-h3 text-text-primary">CNVRTED</span>
                        <div className="flex items-center gap-3">
                          <span className="inline-flex items-center justify-center bg-accent text-on-accent text-caption font-medium rounded-md py-[6px] px-4">
                            Join the waitlist
                          </span>
                          {/* X icon */}
                          <div className="flex flex-col gap-[5px] w-10 h-10 items-center justify-center" aria-hidden="true">
                            <span className="block w-5 h-[1.5px] bg-text-primary rounded-full translate-y-[6.5px] rotate-45 origin-center" />
                            <span className="block w-5 h-[1.5px] bg-text-primary rounded-full opacity-0" />
                            <span className="block w-5 h-[1.5px] bg-text-primary rounded-full -translate-y-[6.5px] -rotate-45 origin-center" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </PreviewCard>
                </StaggerItem>

              </StaggerGroup>

              <FadeInUp className="mt-xl">
                <div className="rounded-lg border border-border bg-surface px-xl py-lg">
                  <p className="text-caption font-mono text-text-tertiary uppercase tracking-label mb-sm">Live demo</p>
                  <p className="text-body text-text-secondary">
                    Resize the browser to a narrow width (or use DevTools mobile emulation)
                    and tap the hamburger icon in the fixed nav above. The live menu is
                    fully functional: keyboard navigation, focus trap, Escape to close.
                  </p>
                </div>
              </FadeInUp>
            </section>

            <Divider />

            {/* ── 03 HERO ENTRANCE ───────────────────────────────────────────── */}
            <section aria-labelledby="h-hero-entrance">
              <FadeInUp>
                <SectionHeader
                  step="03 — MOTION"
                  title="HeroEntrance"
                  description="Mount-triggered (not scroll-triggered) staggered reveal. Each HeroItem animates on page load using an explicit delay from HERO_DELAYS. Delays are asymmetric: 0 / 120 / 220 / 320 / 400ms — decelerating, feeling crafted rather than mechanical."
                />
              </FadeInUp>

              <FadeInUp>
                <div className="rounded-lg border border-border bg-background overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="py-md px-xl text-caption font-mono text-text-tertiary uppercase tracking-label">Element</th>
                        <th className="py-md px-xl text-caption font-mono text-text-tertiary uppercase tracking-label">Delay</th>
                        <th className="py-md px-xl text-caption font-mono text-text-tertiary uppercase tracking-label">Duration</th>
                        <th className="py-md px-xl text-caption font-mono text-text-tertiary uppercase tracking-label">Motion</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {[
                        { el: 'Eyebrow label', delay: '0ms', dur: '300ms (base)', motion: 'fadeInUp — opacity + translateY 20px' },
                        { el: 'Headline (h1)', delay: '120ms', dur: '300ms (base)', motion: 'fadeInUp — opacity + translateY 20px' },
                        { el: 'Subheadline', delay: '220ms', dur: '300ms (base)', motion: 'fadeInUp — opacity + translateY 20px' },
                        { el: 'CTA + microcopy', delay: '320ms', dur: '300ms (base)', motion: 'fadeInUp — opacity + translateY 20px' },
                        { el: 'Hero visual', delay: '400ms', dur: '500ms (slow)', motion: 'fadeOnly — opacity, no translate (D4 fix)' },
                      ].map(({ el, delay, dur, motion }) => (
                        <tr key={el}>
                          <td className="py-md px-xl text-body text-text-primary">{el}</td>
                          <td className="py-md px-xl text-mono-tag font-mono text-accent">{delay}</td>
                          <td className="py-md px-xl text-mono-tag font-mono text-text-secondary">{dur}</td>
                          <td className="py-md px-xl text-caption text-text-secondary">{motion}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </FadeInUp>

              <FadeInUp className="mt-lg">
                <div className="rounded-lg border border-border bg-surface px-xl py-lg">
                  <p className="text-caption font-mono text-text-tertiary uppercase tracking-label mb-sm">Live demo</p>
                  <p className="text-body text-text-secondary">
                    The HeroEntrance animation ran on page load — the five elements at the top of
                    this page (section label, h1, subheadline, buttons, scroll indicator) each animated
                    in at their documented delay. Reload the page to see it again.
                  </p>
                </div>
              </FadeInUp>
            </section>

            <Divider />

            {/* ── 04 FADEINUP ────────────────────────────────────────────────── */}
            <section aria-labelledby="h-fadeinup">
              <FadeInUp>
                <SectionHeader
                  step="04 — MOTION"
                  title="FadeInUp"
                  description="Scroll-triggered reveal. Fires when 20% of the element enters the viewport (threshold: 0.2). Plays once. The cards below are FadeInUp-wrapped — scroll them into view on a fresh page to see the effect."
                />
              </FadeInUp>

              <div className="flex flex-col gap-lg">
                <FadeInUp amount={0.15}>
                  <PreviewCard label="FadeInUp · default delay (0ms) · opacity 0→1, translateY 20px→0 · 300ms ease-out-expo">
                    <div className="flex items-center justify-between gap-lg">
                      <div>
                        <p className="text-h3 text-text-primary mb-xs">Signal detected.</p>
                        <p className="text-body text-text-secondary">This card used FadeInUp with default settings.</p>
                      </div>
                      <Tag type="HIRING" />
                    </div>
                  </PreviewCard>
                </FadeInUp>

                <FadeInUp amount={0.15} delay={0.12}>
                  <PreviewCard label="FadeInUp · delay={0.12} · identical motion, 120ms later">
                    <div className="flex items-center justify-between gap-lg">
                      <div>
                        <p className="text-h3 text-text-primary mb-xs">Account surfaced.</p>
                        <p className="text-body text-text-secondary">This card used FadeInUp with delay=0.12.</p>
                      </div>
                      <Badge level="HIGH" />
                    </div>
                  </PreviewCard>
                </FadeInUp>

                <FadeInUp amount={0.15} delay={0.24}>
                  <PreviewCard label="FadeInUp · delay={0.24} · sequential without StaggerGroup">
                    <div className="flex items-center justify-between gap-lg">
                      <div>
                        <p className="text-h3 text-text-primary mb-xs">Context delivered.</p>
                        <p className="text-body text-text-secondary">This card used FadeInUp with delay=0.24.</p>
                      </div>
                      <Tag type="FUNDING" />
                    </div>
                  </PreviewCard>
                </FadeInUp>
              </div>
            </section>

            <Divider />

            {/* ── 05 STAGGERGROUP ────────────────────────────────────────────── */}
            <section aria-labelledby="h-stagger">
              <FadeInUp>
                <SectionHeader
                  step="05 — MOTION"
                  title="StaggerGroup"
                  description="Children stagger at 80ms intervals (STAGGER.children from tokens.ts). The parent fires when 20% of the container is visible; each child uses fadeInUp variants and inherits the stagger timing automatically."
                />
              </FadeInUp>

              <StaggerGroup className="flex flex-col gap-lg">
                {SIGNAL_EXAMPLES.cards.map((card) => (
                  <StaggerItem key={card.tag}>
                    <div className="flex items-center justify-between gap-lg rounded-lg border border-border bg-background p-xl">
                      <Tag type={card.tag} />
                      <p className="text-body text-text-secondary flex-1 min-w-0 line-clamp-1">
                        {card.signalText}
                      </p>
                      <Badge level={card.intent} />
                    </div>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </section>

            <Divider />

            {/* ── 06 REDUCED MOTION ──────────────────────────────────────────── */}
            <section aria-labelledby="h-reduced-motion">
              <FadeInUp>
                <SectionHeader
                  step="06 — ACCESSIBILITY"
                  title="Reduced Motion"
                  description="When prefers-reduced-motion: reduce is set in the OS, all translate and scale animations collapse to opacity-only fades. The timing remains the same — only movement is removed."
                />
              </FadeInUp>

              <StaggerGroup className="flex flex-col gap-lg">

                <StaggerItem>
                  <div className="rounded-lg border border-border bg-background overflow-hidden">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="py-md px-xl text-caption font-mono text-text-tertiary uppercase tracking-label">Animation</th>
                          <th className="py-md px-xl text-caption font-mono text-text-tertiary uppercase tracking-label">Standard</th>
                          <th className="py-md px-xl text-caption font-mono text-text-tertiary uppercase tracking-label">Reduced Motion</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {[
                          ['FadeInUp', 'opacity + translateY 20px', 'opacity only (fadeIn variant)'],
                          ['StaggerItem', 'opacity + translateY 20px', 'opacity only (fadeIn variant)'],
                          ['HeroItem', 'opacity + translateY 20px', 'opacity only'],
                          ['HeroItem (visual)', 'opacity only', 'opacity only (unchanged)'],
                          ['Nav transition', '200ms ease-in-out', 'instant (CSS: transition-duration 0.01ms)'],
                          ['Hamburger → X', '200ms CSS transition', 'instant (CSS layer)'],
                          ['Mobile menu', '200ms opacity fade', 'instant (CSS layer)'],
                          ['Card hover lift', 'translateY(-2px) + shadow', 'color change only'],
                          ['Noise → signal pulse', 'scale(1.02) → scale(1)', 'skipped entirely'],
                        ].map(([anim, standard, reduced]) => (
                          <tr key={anim}>
                            <td className="py-md px-xl text-mono-tag font-mono text-accent">{anim}</td>
                            <td className="py-md px-xl text-caption text-text-secondary">{standard}</td>
                            <td className="py-md px-xl text-caption text-text-secondary">{reduced}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </StaggerItem>

                <StaggerItem>
                  <div className="rounded-lg border border-border bg-surface px-xl py-lg">
                    <p className="text-caption font-mono text-text-tertiary uppercase tracking-label mb-sm">Implementation layers</p>
                    <div className="flex flex-col gap-md">
                      <p className="text-body text-text-secondary">
                        <strong className="text-text-primary font-medium">JS layer:</strong>{' '}
                        <code className="text-mono-tag font-mono bg-background px-sm py-xs rounded-sm">MotionProvider</code>{' '}
                        reads{' '}
                        <code className="text-mono-tag font-mono bg-background px-sm py-xs rounded-sm">useReducedMotion()</code>{' '}
                        from Framer Motion once at the app root. All animated components call{' '}
                        <code className="text-mono-tag font-mono bg-background px-sm py-xs rounded-sm">useMotionPreference()</code>{' '}
                        — a single context read — and switch from{' '}
                        <code className="text-mono-tag font-mono bg-background px-sm py-xs rounded-sm">fadeInUp</code>{' '}
                        to{' '}
                        <code className="text-mono-tag font-mono bg-background px-sm py-xs rounded-sm">fadeIn</code>{' '}
                        variants.
                      </p>
                      <p className="text-body text-text-secondary">
                        <strong className="text-text-primary font-medium">CSS layer:</strong>{' '}
                        <code className="text-mono-tag font-mono bg-background px-sm py-xs rounded-sm">@media (prefers-reduced-motion: reduce)</code>{' '}
                        in globals.css collapses all CSS transition durations to{' '}
                        <code className="text-mono-tag font-mono bg-background px-sm py-xs rounded-sm">0.01ms</code>{' '}
                        — catching hover state transitions, hamburger animations, and any
                        CSS-only motion that doesn't go through Framer Motion.
                      </p>
                    </div>
                  </div>
                </StaggerItem>

              </StaggerGroup>
            </section>

            <Divider />

            {/* ── 07 KEYBOARD NAV ────────────────────────────────────────────── */}
            <section aria-labelledby="h-keyboard">
              <FadeInUp>
                <SectionHeader
                  step="07 — ACCESSIBILITY"
                  title="Keyboard Navigation"
                  description="Every interactive element is reachable by keyboard in a logical tab order. Focus states use the brand accent color (2px outline, 3px offset) or a white outline on colored backgrounds."
                />
              </FadeInUp>

              <StaggerGroup className="flex flex-col gap-lg">

                <StaggerItem>
                  <PreviewCard label="Tab order: Skip link → Nav wordmark → Nav links (×3) → CTA button → page content">
                    <div className="flex flex-col gap-lg">
                      {[
                        { key: 'Tab', action: 'Reveals skip-to-content link at top of page (visible on focus only)' },
                        { key: 'Enter / Space', action: 'Activates the focused link or button' },
                        { key: 'Tab (nav)', action: 'Moves through: Wordmark → Product → How it works → Why CNVRTED → Join the waitlist' },
                        { key: 'Tab (mobile menu)', action: 'Cycles within focus trap: Product → How it works → Why CNVRTED → Join the waitlist → Product…' },
                        { key: 'Escape', action: 'Closes the mobile menu and returns focus to the hamburger button' },
                        { key: 'Shift + Tab', action: 'Moves backward through the tab order' },
                      ].map(({ key, action }) => (
                        <div key={key} className="flex items-start gap-lg">
                          <KeyboardKey>{key}</KeyboardKey>
                          <p className="text-body text-text-secondary flex-1">{action}</p>
                        </div>
                      ))}
                    </div>
                  </PreviewCard>
                </StaggerItem>

                <StaggerItem>
                  <PreviewCard label="Focus state specimens — all interactive elements in this component library">
                    <div className="flex flex-col gap-xl">
                      <div className="flex flex-wrap gap-lg items-start">
                        {/* Button focus — static specimen (not interactive) */}
                        <div className="flex flex-col gap-sm items-start">
                          <span
                            aria-hidden="true"
                            className="inline-flex items-center justify-center gap-2 rounded-md text-body font-medium py-3 px-6 bg-accent text-on-accent"
                            style={{ outline: '2px solid white', outlineOffset: '2px', boxShadow: '0 0 0 4px #2B5CE6' }}
                          >
                            Button focus
                          </span>
                          <p className="text-mono-tag font-mono text-text-tertiary">2px white outline · accent glow</p>
                        </div>

                        {/* Link focus */}
                        <div className="flex flex-col gap-sm items-start">
                          <a
                            href="#"
                            className="text-body text-text-secondary focus-visible:outline-none"
                            style={{ textDecoration: 'underline', textDecorationColor: '#2B5CE6', textDecorationThickness: '2px', textUnderlineOffset: '3px' } as React.CSSProperties}
                          >
                            Nav link focus
                          </a>
                          <p className="text-mono-tag font-mono text-text-tertiary">2px accent underline · 3px offset</p>
                        </div>
                      </div>

                      {/* Skip link visible state */}
                      <div className="relative">
                        <div className="inline-flex items-center gap-sm px-lg py-sm bg-accent text-on-accent rounded-md text-body font-medium">
                          Skip to main content
                        </div>
                        <p className="text-mono-tag font-mono text-text-tertiary mt-xs">
                          Skip link — visible on focus, position: absolute top-4 left-4 · z-[9999]
                        </p>
                      </div>
                    </div>
                  </PreviewCard>
                </StaggerItem>

              </StaggerGroup>
            </section>

            <Divider />

            {/* ── 08 SKIP TO CONTENT ─────────────────────────────────────────── */}
            <section aria-labelledby="h-skip">
              <FadeInUp>
                <SectionHeader
                  step="08 — ACCESSIBILITY"
                  title="Skip-to-content"
                  description="The first focusable element in the document. Hidden off-screen by default (top: -100%), transitions to top: 1rem on :focus. Allows keyboard and screen-reader users to jump past the navigation to the main content area."
                />
              </FadeInUp>

              <FadeInUp>
                <div className="rounded-lg border border-border bg-surface px-xl py-lg flex flex-col gap-md">
                  <p className="text-body text-text-secondary">
                    Press <KeyboardKey>Tab</KeyboardKey> immediately after loading this page
                    to see the skip link appear in the top-left corner. It links to{' '}
                    <code className="text-mono-tag font-mono bg-background px-sm py-xs rounded-sm">#main-content</code>{' '}
                    — set on the{' '}
                    <code className="text-mono-tag font-mono bg-background px-sm py-xs rounded-sm">{'<main>'}</code>{' '}
                    element of each page.
                  </p>
                  <p className="text-body text-text-secondary">
                    Implemented in{' '}
                    <code className="text-mono-tag font-mono bg-background px-sm py-xs rounded-sm">app/layout.tsx</code>{' '}
                    as the first element in{' '}
                    <code className="text-mono-tag font-mono bg-background px-sm py-xs rounded-sm">{'<body>'}</code>{' '}
                    — before the Nav — so it always appears first in the tab order regardless of
                    what content the page renders.
                  </p>
                </div>
              </FadeInUp>
            </section>

          </div>
        </Container>
      </main>

      {/* Page footer */}
      <footer className="border-t border-border">
        <Container className="py-3xl">
          <p className="text-caption text-text-tertiary font-mono">
            CNVRTED · Phase 3 complete · Phase 4 (Hero section) pending approval
          </p>
        </Container>
      </footer>

    </div>
  )
}
