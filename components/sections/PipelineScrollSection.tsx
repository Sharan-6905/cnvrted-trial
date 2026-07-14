'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

/**
 * The pipeline payoff (Score → Summary → Outreach → CRM → Pipeline Created)
 * as a clickable horizontal timeline: each node explains that step and shows
 * a concrete example below — matching the FlowchartSection interaction.
 */

function SalesforceMark() {
  return (
    <svg viewBox="0 0 24 17" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ height: 14, width: 'auto', display: 'block' }}>
      <path
        fill="#00A1E0"
        d="M10 1.8a5.1 5.1 0 0 1 3.1-.9c1.6 0 3 .9 3.7 2.1a5.3 5.3 0 0 1 2.1-.4c2.9 0 5.3 2.4 5.3 5.3s-2.4 5.3-5.3 5.3c-.3 0-.7 0-1-.1a3.3 3.3 0 0 1-3.3 1.9 3.3 3.3 0 0 1-1.6-.4 3.8 3.8 0 0 1-3.8 2.4 3.9 3.9 0 0 1-3.9-2.6H5a5.3 5.3 0 0 1 0-10.6c.6 0 1.1.1 1.6.3A4.6 4.6 0 0 1 10 1.8z"
      />
    </svg>
  )
}

function HubSpotMark() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ height: 14, width: 14, display: 'block' }}>
      <path
        fill="#FF7A59"
        d="M18.164 7.93V5.084a2.198 2.198 0 0 0 1.267-1.978v-.067A2.2 2.2 0 0 0 17.238.84h-.067a2.2 2.2 0 0 0-2.193 2.199v.067c0 .854.463 1.601 1.153 2.001v2.822a6.239 6.239 0 0 0-3.05 1.34l-8.06-6.276c.052-.192.09-.39.093-.598A2.462 2.462 0 1 0 2.65 4.858c.542 0 1.037-.17 1.456-.446l7.93 6.176a6.246 6.246 0 0 0-.093 1.064c0 1.008.294 1.947.793 2.747l-2.414 2.414a2.02 2.02 0 0 0-.593-.098 2.033 2.033 0 1 0 2.033 2.033c0-.206-.036-.402-.093-.593l2.388-2.388a6.279 6.279 0 1 0 8.622-9.09c-.855-.53-1.847-.85-2.909-.912ZM17.203 18.29a3.617 3.617 0 1 1 0-7.234 3.617 3.617 0 0 1 0 7.234Z"
      />
    </svg>
  )
}

const PIPELINE_STEPS = [
  {
    id: 'score',
    label: 'Intent Score',
    description: 'The moment an account crosses the intent threshold, CNVRTED assigns a 0–100 score so your reps know exactly who to prioritise first.',
    example: (
      <div className="w-full max-w-[400px] rounded-xl border p-4 flex flex-col gap-3" style={{ borderColor: 'var(--color-accent)', background: 'var(--color-surface-raised)' }}>
        <div className="flex items-center justify-between">
          <span className="font-semibold text-text-primary">Acme Corp</span>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-accent text-on-accent">HIGH INTENT</span>
            <span className="text-2xl font-bold tabular-nums text-text-primary">92</span>
          </div>
        </div>
        <div className="h-1.5 w-full rounded-full overflow-hidden" style={{ background: 'var(--color-border)' }}>
          <div className="h-full rounded-full bg-accent" style={{ width: '92%' }} />
        </div>
      </div>
    ),
  },
  {
    id: 'summary',
    label: 'AI Summary',
    description: 'CNVRTED writes a plain-English summary of why the account is in-market right now — no digging through a dozen browser tabs.',
    example: (
      <div className="w-full max-w-[400px] rounded-xl border border-border bg-surface-raised p-4 flex flex-col gap-2">
        <p className="text-[10px] font-mono uppercase tracking-widest text-text-tertiary">AI summary</p>
        <p className="text-sm text-text-secondary leading-relaxed">
          Acme Corp just raised a $25M Series B and opened 12 sales roles — they’re scaling GTM and likely evaluating tooling now.
        </p>
      </div>
    ),
  },
  {
    id: 'outreach',
    label: 'Personalized Outreach',
    description: 'A ready-to-send outreach draft is generated, tailored to the exact signal that flagged the account in the first place.',
    example: (
      <div className="w-full max-w-[400px] rounded-xl border border-border bg-surface-raised p-4 flex flex-col gap-2">
        <p className="text-[10px] font-mono uppercase tracking-widest text-text-tertiary">Draft outreach</p>
        <p className="text-xs text-text-tertiary">Subject: Scaling outbound after your Series B?</p>
        <p className="text-sm text-text-secondary leading-relaxed">
          “Hi Sarah — congrats on the raise. Saw you’re hiring 12 AEs; happy to share how teams your size ramp pipeline fast…”
        </p>
      </div>
    ),
  },
  {
    id: 'crm',
    label: 'CRM',
    description: 'The account and all of its context sync straight into Salesforce or HubSpot — right where your team already works.',
    example: (
      <div className="w-full max-w-[400px] rounded-xl border border-border bg-surface-raised p-4 flex flex-col gap-3">
        <span className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-text-tertiary">
          <SalesforceMark />
          <HubSpotMark />
          Synced
        </span>
        <div className="flex items-center justify-between rounded-lg border border-border px-3 py-2">
          <span className="text-sm font-medium text-text-primary">Acme Corp</span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded" style={{ background: 'var(--color-accent-dim)', color: 'var(--color-accent)' }}>Score 92</span>
        </div>
      </div>
    ),
  },
  {
    id: 'pipeline',
    label: 'Pipeline Created',
    description: 'A new opportunity lands in your pipeline with the signal, score and summary attached — timed to exactly when they’re ready to buy.',
    example: (
      <div className="w-full max-w-[400px] rounded-xl border p-4 flex flex-col gap-3" style={{ borderColor: 'var(--color-accent)', background: 'var(--color-surface-raised)' }}>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-text-primary">Acme Corp — New Business</span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-accent text-on-accent">OPEN</span>
        </div>
        <div className="flex justify-between text-[11px] text-text-tertiary">
          <span>Stage: Discovery</span>
          <span>Owner: You</span>
          <span>$48k ARR</span>
        </div>
      </div>
    ),
  },
] as const

export function PipelineScrollSection() {
  const [active, setActive] = useState<string>('score')
  const activeStep = PIPELINE_STEPS.find((s) => s.id === active)

  return (
    <section aria-label="From score to pipeline" className="relative bg-background py-20 md:py-28">
      <div className="mx-auto w-full px-[5%]">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-caption font-mono text-text-tertiary uppercase tracking-[0.08em] mb-3">
            AFTER THE SIGNAL
          </p>
          <h2 className="text-h2 text-text-primary font-semibold">
            From score to closed pipeline.
          </h2>
        </div>

        {/* Timeline of clickable nodes */}
        <div className="relative flex items-start">
          {/* Connecting line behind the nodes */}
          <div className="absolute left-0 right-0 top-2 h-px bg-border" aria-hidden="true" />

          {PIPELINE_STEPS.map((step) => {
            const isActive = active === step.id
            return (
              <button
                key={step.id}
                onClick={() => setActive(step.id)}
                className="relative flex flex-1 min-w-0 flex-col items-center gap-3 px-2 text-center focus:outline-none group"
              >
                <span
                  className="relative z-10 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors duration-200"
                  style={{
                    borderColor: isActive ? 'var(--color-accent)' : 'var(--color-border)',
                    backgroundColor: isActive ? 'var(--color-accent)' : 'var(--color-surface-raised)',
                  }}
                />
                <span
                  className="flex flex-col items-center gap-1.5 text-body font-medium transition-colors duration-200 group-hover:text-text-primary"
                  style={{ color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-tertiary)' }}
                >
                  {step.label === 'CRM' && (
                    <span className="flex items-center gap-1.5">
                      <SalesforceMark />
                      <HubSpotMark />
                    </span>
                  )}
                  {step.label}
                </span>
              </button>
            )
          })}
        </div>

        {/* Detail panel — fills the section for the active step. Keyed so it
            re-plays its entrance each time a different step is selected. */}
        {activeStep && (
          <motion.div
            key={activeStep.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-14 min-h-[45vh] rounded-2xl border p-8 md:p-16 flex flex-col md:flex-row gap-8 md:gap-16 items-center justify-center"
            style={{
              backgroundColor: 'var(--color-accent-dim)',
              borderColor: 'rgba(44,196,187,0.25)',
            }}
          >
            <div className="flex-1 max-w-[560px]">
              <p className="text-h2 font-semibold text-text-primary mb-6">{activeStep.label}</p>
              <p className="text-body-lg text-text-secondary leading-relaxed">{activeStep.description}</p>
            </div>

            {/* Concrete example for this step */}
            <div className="flex-shrink-0 flex flex-col gap-2">
              <p className="text-caption font-mono uppercase tracking-widest text-text-tertiary" style={{ fontSize: 10 }}>
                Example
              </p>
              {activeStep.example}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
