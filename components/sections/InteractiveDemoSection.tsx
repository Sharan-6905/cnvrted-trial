'use client'

import { useState, type FormEvent } from 'react'
import { AnimatePresence } from 'framer-motion'
import { INTERACTIVE_DEMO } from '@/content/copy'
import { SignalMark } from '@/components/ui/SignalMark'
import { CornerFrame } from '@/components/ui/CornerFrame'
import { Detect } from '@/components/ui/Detect'
import { Button } from '@/components/ui/Button'

// Simulated result — deterministic-ish so a given name always looks the same,
// without needing a real scan wired up yet.
function simulateSignal(input: string) {
  const clean = input.trim().replace(/^https?:\/\//, '').replace(/\/.*/, '')
  const name = clean.split('.')[0] || 'Unknown Co'
  const label = name.charAt(0).toUpperCase() + name.slice(1)

  let hash = 0
  for (let i = 0; i < clean.length; i++) hash = (hash * 31 + clean.charCodeAt(i)) % 1000
  const score = 58 + (hash % 38) // 58-95
  const intent = score >= 75 ? 'HIGH' : 'MEDIUM'

  const signalPool = [
    'Recent funding round detected',
    'Hiring activity up in the last 30 days',
    'Tech stack change flagged',
    'Leadership change detected',
    'Increased press mentions',
    'Job postings referencing new tooling',
  ]
  const picked = [signalPool[hash % signalPool.length], signalPool[(hash + 2) % signalPool.length]]

  return { label, score, intent, signals: picked }
}

export function InteractiveDemoSection() {
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ReturnType<typeof simulateSignal> | null>(null)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!input.trim()) return
    setLoading(true)
    setResult(null)
    // Brief simulated scan delay — under a second, never blocks the page.
    setTimeout(() => {
      setResult(simulateSignal(input))
      setLoading(false)
    }, 650)
  }

  return (
    <section aria-label="Interactive demo" className="bg-surface py-20 md:py-28 border-y border-border">
      <div className="mx-auto w-full max-w-[640px] px-[5%] flex flex-col items-center text-center gap-6">
        <p className="text-caption font-mono text-text-tertiary uppercase tracking-[0.08em]">{INTERACTIVE_DEMO.label}</p>
        <h2 className="text-h1-fluid text-text-primary">{INTERACTIVE_DEMO.headline}</h2>
        <p className="text-body text-text-secondary max-w-[480px]">{INTERACTIVE_DEMO.body}</p>

        <form onSubmit={handleSubmit} className="w-full flex flex-col sm:flex-row gap-3 mt-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={INTERACTIVE_DEMO.placeholder}
            aria-label={INTERACTIVE_DEMO.placeholder}
            className="flex-1 rounded-md border border-border bg-surface-raised px-4 py-3 text-body text-text-primary placeholder:text-text-tertiary focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          />
          <Button type="submit" disabled={loading || !input.trim()}>
            {INTERACTIVE_DEMO.cta}
          </Button>
        </form>

        <p className="text-caption text-text-tertiary">{INTERACTIVE_DEMO.disclaimer}</p>

        <div className="w-full min-h-[1px]">
          {loading && (
            <div className="flex items-center justify-center gap-2 py-8 text-caption text-text-tertiary">
              <SignalMark size={14} pulse />
              {INTERACTIVE_DEMO.loadingLabel}
            </div>
          )}

          <AnimatePresence mode="wait">
            {result && !loading && (
              <Detect key={result.label} triggerKey={result.label} className="mt-4 text-left">
                <CornerFrame className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-h3 font-semibold text-text-primary">{result.label}</h3>
                    <span className="text-h3 font-semibold text-text-primary tabular-nums">{result.score}</span>
                  </div>
                  <span
                    className={[
                      'inline-flex w-fit items-center gap-1 rounded-md text-mono-tag font-mono py-xs px-[0.625rem] leading-none',
                      result.intent === 'HIGH' ? 'bg-accent text-on-accent' : 'bg-accent-dim text-text-secondary',
                    ].join(' ')}
                  >
                    <SignalMark size={9} />
                    {result.intent === 'HIGH' ? 'HIGH INTENT' : 'MEDIUM INTENT'}
                  </span>
                  <div className="pt-3 mt-1 border-t border-border flex flex-col gap-1.5">
                    <p className="text-[10px] font-mono uppercase tracking-widest text-text-tertiary">Signals detected</p>
                    {result.signals.map((s) => (
                      <div key={s} className="flex items-start gap-1.5 text-caption text-text-secondary">
                        <SignalMark size={9} className="mt-0.5 shrink-0 text-text-tertiary" />
                        <span>{s}</span>
                      </div>
                    ))}
                  </div>
                </CornerFrame>
              </Detect>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
