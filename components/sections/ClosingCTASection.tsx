'use client'

import { useState, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle } from '@phosphor-icons/react'
import { CLOSING_CTA } from '@/content/copy'
import { Button } from '@/components/ui/Button'
import { DURATION, EASE } from '@/lib/tokens'

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}

export function ClosingCTASection() {
  const emailId = useId()
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!isValidEmail(email)) { setError(CLOSING_CTA.error.invalidEmail); return }
    setError(null)
    setLoading(true)
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      })
      if (!res.ok) {
        const json = await res.json().catch(() => ({}))
        setError((json as { error?: string }).error ?? CLOSING_CTA.error.generic)
        return
      }
      setSubmitted(true)
    } catch {
      setError(CLOSING_CTA.error.generic)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      id="closing-cta"
      aria-label="Join the waitlist"
      className="bg-background py-20 md:py-28 border-t border-border"
    >
      <div className="mx-auto w-full px-[5%]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left: headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: DURATION.base, ease: EASE.default }}
            className="flex flex-col gap-4"
          >
            <p className="text-caption font-mono text-text-tertiary uppercase tracking-[0.08em]">
              {CLOSING_CTA.label}
            </p>
            <h2 className="text-h1-fluid text-text-primary" style={{ whiteSpace: 'pre-line' }}>
              {CLOSING_CTA.headline}
            </h2>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: DURATION.base, delay: 0.12, ease: EASE.default }}
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: DURATION.base, ease: EASE.default }}
                  className="flex flex-col gap-3"
                >
                  <p className="text-h3 font-medium text-text-primary">{CLOSING_CTA.success.heading}</p>
                  <p className="text-body text-text-secondary">{CLOSING_CTA.success.body}</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  noValidate
                  aria-label="Join the CNVRTED waitlist"
                  className="flex flex-col gap-3"
                >
                  <input
                    type="text"
                    name={CLOSING_CTA.form.honeypotName}
                    defaultValue=""
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="absolute opacity-0 pointer-events-none w-0 h-0 overflow-hidden"
                  />

                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1 min-w-0">
                      <label htmlFor={emailId} className="sr-only">{CLOSING_CTA.form.label}</label>
                      <input
                        id={emailId}
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={CLOSING_CTA.form.placeholder}
                        autoComplete="email"
                        required
                        disabled={loading}
                        className={[
                          'w-full rounded-md border bg-surface-raised px-4 py-3',
                          'text-body text-text-primary placeholder:text-text-tertiary',
                          'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                          'transition-colors duration-[200ms]',
                          error ? 'border-red-500' : 'border-border hover:border-text-tertiary',
                        ].join(' ')}
                      />
                    </div>
                    <Button type="submit" loading={loading} disabled={loading} className="shrink-0">
                      {CLOSING_CTA.form.cta}
                    </Button>
                  </div>

                  {error && (
                    <p role="alert" className="text-caption text-red-500">{error}</p>
                  )}

                  <div className="flex items-center gap-4 mt-1">
                    <span className="flex items-center gap-1.5 text-caption text-text-tertiary">
                      <CheckCircle weight="fill" size={14} className="text-accent" />
                      Be first to access
                    </span>
                    <span className="flex items-center gap-1.5 text-caption text-text-tertiary">
                      <CheckCircle weight="fill" size={14} className="text-accent" />
                      No spam. Ever.
                    </span>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
