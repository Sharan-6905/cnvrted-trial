'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FAQ } from '@/content/copy'
import { SignalMark } from '@/components/ui/SignalMark'
import { EASE } from '@/lib/tokens'

function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false)
  const panelId = `faq-panel-${index}`

  return (
    <div className="border-b border-border">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className="w-full flex items-center justify-between gap-4 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <span className="flex items-center gap-3 text-body-lg font-medium text-text-primary">
          <SignalMark size={12} className="shrink-0 text-text-tertiary" />
          {question}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2, ease: EASE.default }}
          className="shrink-0 text-text-tertiary text-xl leading-none"
          aria-hidden="true"
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE.default }}
            className="overflow-hidden"
          >
            <p className="pb-5 pl-[27px] text-body text-text-secondary leading-relaxed max-w-[640px]">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function FAQSection() {
  return (
    <section aria-label="Frequently asked questions" className="bg-background py-20 md:py-28">
      <div className="mx-auto w-full max-w-[760px] px-[5%]">
        <div className="text-center mb-12">
          <p className="text-caption font-mono text-text-tertiary uppercase tracking-[0.08em] mb-3">{FAQ.label}</p>
          <h2 className="text-h1-fluid text-text-primary">{FAQ.headline}</h2>
        </div>
        <div>
          {FAQ.items.map((item, i) => (
            <FAQItem key={item.question} question={item.question} answer={item.answer} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
