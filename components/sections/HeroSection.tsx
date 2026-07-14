'use client'

import { useState, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Button } from '@/components/ui/Button'
import { StoryVisual } from '@/components/sections/StoryVisual'
import { PipelineScrollSection } from '@/components/sections/PipelineScrollSection'
import { HERO, CLOSING_CTA } from '@/content/copy'
import { DURATION, EASE } from '@/lib/tokens'
import { formSuccess } from '@/lib/motion'

// ─── Email validation ─────────────────────────────────────────────────────────

function isValidEmail(value: string): boolean {
  // RFC 5322-ish — validates format and presence of a dot in domain
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}

// ─── WaitlistForm ─────────────────────────────────────────────────────────────

interface WaitlistFormProps {
  onSuccess: () => void
}

function WaitlistForm({ onSuccess }: WaitlistFormProps) {
  const emailId = useId()
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  function handleBlur() {
    if (email && !isValidEmail(email)) {
      setError(CLOSING_CTA.error.invalidEmail)
    } else {
      setError(null)
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    // Honeypot check — bots fill this, humans don't see it
    if (data.get(CLOSING_CTA.form.honeypotName)) return

    if (!isValidEmail(email)) {
      setError(CLOSING_CTA.error.invalidEmail)
      return
    }

    setError(null)
    setLoading(true)
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      })
      if (res.status === 409) {
        setError("You're already on the list!")
        setLoading(false)
        return
      }
      if (!res.ok) {
        setError(CLOSING_CTA.error.generic)
        setLoading(false)
        return
      }
      onSuccess()
    } catch {
      setError(CLOSING_CTA.error.generic)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Join the CNVRTED waitlist"
    >
      {/* Honeypot — hidden from visual users via CSS, not display:none (bots ignore CSS) */}
      <input
        type="text"
        name={CLOSING_CTA.form.honeypotName}
        defaultValue=""
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute opacity-0 pointer-events-none w-0 h-0 overflow-hidden"
      />

      <div className="flex flex-col gap-md">
        <div className="flex flex-col sm:flex-row gap-sm">
          <div className="flex flex-col gap-xs flex-1 min-w-0">
            <label htmlFor={emailId} className="sr-only">
              {CLOSING_CTA.form.label}
            </label>
            <input
              id={emailId}
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={handleBlur}
              placeholder={CLOSING_CTA.form.placeholder}
              autoComplete="email"
              required
              aria-invalid={error ? 'true' : undefined}
              aria-describedby={error ? `${emailId}-error` : undefined}
              disabled={loading}
              className={[
                'w-full rounded-md border bg-surface px-4 py-3',
                'text-body text-text-primary placeholder:text-text-tertiary',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                'transition-colors duration-[200ms]',
                error
                  ? 'border-red-500 dark:border-red-400'
                  : 'border-border hover:border-text-tertiary',
              ]
                .filter(Boolean)
                .join(' ')}
            />
          </div>

          <Button
            type="submit"
            loading={loading}
            disabled={loading}
            className="shrink-0 sm:self-start"
          >
            {HERO.cta}
          </Button>
        </div>

        {/* Error message */}
        <AnimatePresence>
          {error && (
            <motion.p
              id={`${emailId}-error`}
              role="alert"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0, transition: { duration: DURATION.fast, ease: EASE.default } }}
              exit={{ opacity: 0, y: -4, transition: { duration: DURATION.fast } }}
              className="text-caption text-red-500 dark:text-red-400"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Microcopy — visible when no error */}
        {!error && (
          <p className="text-caption text-text-tertiary">{HERO.microcopy}</p>
        )}
      </div>
    </form>
  )
}

// ─── SuccessState ─────────────────────────────────────────────────────────────

function SuccessState() {
  return (
    <motion.div
      variants={formSuccess}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-xs"
    >
      <p className="text-body font-medium text-text-primary">{CLOSING_CTA.success.heading}</p>
      <p className="text-body text-text-secondary">{CLOSING_CTA.success.body}</p>
    </motion.div>
  )
}

// ─── HeroSection ──────────────────────────────────────────────────────────────
// The full-page story visual loops continuously on its own (no scroll-jack).
// The headline, subhead, and waitlist form sit in a normal section below it.

export function HeroSection() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <>
      <section aria-label="Product story" className="relative h-[100svh] w-full overflow-hidden bg-background">
        <StoryVisual className="h-full w-full" />
      </section>

      <PipelineScrollSection />

      <section aria-label="Hero" className="relative bg-background py-6xl">
        <Container className="w-full">
          <div className="mx-auto flex max-w-[720px] flex-col items-center gap-xl text-center">
            <SectionLabel>{HERO.eyebrow}</SectionLabel>

            <h1
              id="hero-headline"
              className="text-display-fluid font-sans font-semibold text-text-primary tracking-tight"
              style={{ whiteSpace: 'pre-line' }}
            >
              {HERO.headline}
            </h1>

            <p className="text-body-lg text-text-secondary leading-relaxed max-w-[560px]">
              {HERO.subheadline}
            </p>

            <div className="w-full max-w-[480px]">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <SuccessState key="success" />
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: DURATION.fast } }}
                  >
                    <WaitlistForm onSuccess={() => setSubmitted(true)} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
