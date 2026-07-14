'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Target, Sparkle, EnvelopeSimpleOpen, Database, CheckCircle } from '@phosphor-icons/react'

function SalesforceMark() {
  return (
    <svg viewBox="0 0 24 17" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ height: 20, width: 'auto', display: 'block' }}>
      <path
        fill="#00A1E0"
        d="M10 1.8a5.1 5.1 0 0 1 3.1-.9c1.6 0 3 .9 3.7 2.1a5.3 5.3 0 0 1 2.1-.4c2.9 0 5.3 2.4 5.3 5.3s-2.4 5.3-5.3 5.3c-.3 0-.7 0-1-.1a3.3 3.3 0 0 1-3.3 1.9 3.3 3.3 0 0 1-1.6-.4 3.8 3.8 0 0 1-3.8 2.4 3.9 3.9 0 0 1-3.9-2.6H5a5.3 5.3 0 0 1 0-10.6c.6 0 1.1.1 1.6.3A4.6 4.6 0 0 1 10 1.8z"
      />
    </svg>
  )
}

function HubSpotMark() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ height: 20, width: 20, display: 'block' }}>
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
    icon: Target,
    description: 'The moment an account crosses the intent threshold, CNVRTED assigns a 0–100 score so your reps know exactly who to prioritise first.',
    example: (
      <div className="relative flex w-full flex-col items-center justify-center p-2">
        <div className="w-full max-w-sm rounded-2xl border border-white/20 bg-black p-6 shadow-2xl">
          <div className="flex items-end justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">Target Account</p>
              <p className="mt-1 text-xl md:text-2xl font-bold text-white tracking-tight">Acme Corp</p>
            </div>
            <div className="text-right">
              <span className="inline-block rounded bg-white px-2 py-0.5 font-mono text-[9px] font-bold tracking-widest text-black">
                HIGH INTENT
              </span>
              <p className="mt-2 font-mono text-4xl md:text-5xl font-bold tracking-tighter text-white">92</p>
            </div>
          </div>
          <div className="mt-8 h-1 w-full overflow-hidden rounded-full bg-white/10">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '92%' }}
              transition={{ duration: 1.2, ease: 'easeOut', delay: 0.1 }}
              className="h-full bg-white shadow-[0_0_15px_white]"
            />
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'summary',
    label: 'AI Summary',
    icon: Sparkle,
    description: 'CNVRTED writes a plain-English summary of why the account is in-market right now — no digging through a dozen browser tabs.',
    example: (
      <div className="relative flex w-full items-center justify-center p-2">
        <div className="w-full max-w-sm overflow-hidden rounded-2xl border border-white/20 bg-black shadow-2xl">
          <div className="border-b border-white/10 bg-white/5 px-4 py-3 flex items-center gap-2">
            <Sparkle weight="fill" className="text-white/70 h-4 w-4" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-white/70">Intelligence Briefing</span>
          </div>
          <div className="p-6">
            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base md:text-lg leading-relaxed text-white/90"
            >
              Acme Corp just raised a <span className="text-white font-semibold border-b border-white/30">+$25M Series B</span> and opened <span className="text-white font-semibold border-b border-white/30">12 sales roles</span>. They are actively scaling GTM and likely evaluating new tooling now.
            </motion.p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'outreach',
    label: 'Personalized Outreach',
    icon: EnvelopeSimpleOpen,
    description: 'A ready-to-send outreach draft is generated, tailored to the exact signal that flagged the account in the first place.',
    example: (
      <div className="relative flex w-full items-center justify-center p-2">
        <div className="w-full max-w-md overflow-hidden rounded-2xl border border-white/20 bg-black shadow-2xl">
          <div className="border-b border-white/10 bg-white/5 px-4 py-3 flex gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <div className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <div className="h-2.5 w-2.5 rounded-full bg-white/20" />
          </div>
          <div className="border-b border-white/10 p-4 font-mono text-[10px] md:text-xs text-white/50">
            <div className="flex gap-4 mb-2"><span className="w-12 md:w-16">To:</span> <span className="text-white">sarah@acmecorp.com</span></div>
            <div className="flex gap-4"><span className="w-12 md:w-16">Subject:</span> <span className="text-white font-semibold">Scaling outbound after your Series B?</span></div>
          </div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="p-6 text-sm leading-relaxed text-white/80 font-sans"
          >
            Hi Sarah — congrats on the recent raise.<br/><br/>
            Saw you're hiring 12 new AEs. Happy to share how teams your size ramp pipeline fast with real-time intent...
          </motion.div>
        </div>
      </div>
    ),
  },
  {
    id: 'crm',
    label: 'CRM Sync',
    icon: Database,
    description: 'The account and all of its context sync straight into Salesforce or HubSpot — right where your team already works.',
    example: (
      <div className="relative flex w-full flex-col items-center justify-center p-2">
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center mb-6">
           <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-black shadow-[0_0_30px_rgba(255,255,255,0.1)]">
             <Database size={28} className="text-white" />
           </div>
           
           {/* Animated Data Particles */}
           <div className="flex md:flex-row flex-col gap-2 relative">
             <motion.div className="h-1.5 w-1.5 md:h-1.5 md:w-6 rounded-full bg-white" initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }} transition={{ duration: 1, repeat: Infinity }} style={{ transformOrigin: 'left' }} />
             <motion.div className="h-1.5 w-1.5 md:h-1.5 md:w-6 rounded-full bg-white" initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }} transition={{ duration: 1, repeat: Infinity, delay: 0.3 }} style={{ transformOrigin: 'left' }} />
             <motion.div className="h-1.5 w-1.5 md:h-1.5 md:w-6 rounded-full bg-white" initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }} transition={{ duration: 1, repeat: Infinity, delay: 0.6 }} style={{ transformOrigin: 'left' }} />
           </div>

           <div className="flex gap-3">
             <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-black shadow-[0_0_30px_rgba(255,255,255,0.1)]">
               <SalesforceMark />
             </div>
             <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-black shadow-[0_0_30px_rgba(255,255,255,0.1)]">
               <HubSpotMark />
             </div>
           </div>
        </div>
        <p className="font-mono text-[10px] tracking-[0.2em] text-white/50 uppercase text-center mt-2">Syncing payload to CRM</p>
      </div>
    ),
  },
  {
    id: 'pipeline',
    label: 'Pipeline Created',
    icon: CheckCircle,
    description: 'A new opportunity lands in your pipeline with the signal, score and summary attached — timed to exactly when they’re ready to buy.',
    example: (
      <div className="relative flex w-full items-center justify-center p-2">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="w-full max-w-sm rounded-2xl border border-white bg-black p-6 shadow-[0_0_40px_rgba(255,255,255,0.15)]"
        >
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-widest text-white/50 mb-1.5">New Opportunity</p>
              <p className="text-lg md:text-xl font-bold text-white tracking-tight">Acme Corp — Expansion</p>
            </div>
            <CheckCircle weight="fill" className="text-white h-6 w-6" />
          </div>
          <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-wider text-white/40 mb-1">Stage</p>
              <p className="text-sm md:text-base font-medium text-white">Discovery</p>
            </div>
            <div>
              <p className="font-mono text-[9px] uppercase tracking-wider text-white/40 mb-1">Amount</p>
              <p className="text-sm md:text-base font-medium text-white">$48,000 ARR</p>
            </div>
          </div>
        </motion.div>
      </div>
    ),
  },
] as const

export function PipelineScrollSection() {
  const [active, setActive] = useState<string>('score')
  const activeIndex = PIPELINE_STEPS.findIndex((s) => s.id === active)

  return (
    <section aria-label="From score to pipeline" className="relative bg-black py-24 md:py-32 overflow-hidden">
      
      {/* Background glow for depth */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.03),transparent_60%)]" />

      <div className="mx-auto w-full max-w-6xl px-[5%] relative z-10">

        {/* Header */}
        <div className="text-center mb-20 md:mb-24">
          <p className="text-caption font-mono text-white/50 uppercase tracking-[0.15em] mb-4">
            AFTER THE SIGNAL
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-white font-bold tracking-tight">
            From score to closed pipeline.
          </h2>
        </div>

        {/* Horizontal Timeline */}
        <div className="relative flex items-start justify-between mb-12 md:mb-20 px-2 md:px-12 w-full max-w-5xl mx-auto">
          {/* Connecting line behind the nodes */}
          <div className="absolute left-[10%] right-[10%] top-[1.25rem] h-[1px] bg-white/10" aria-hidden="true">
            {/* Animated progress bar over the line */}
            <motion.div 
              className="h-full bg-white"
              animate={{ width: `${(activeIndex / (PIPELINE_STEPS.length - 1)) * 100}%` }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            />
          </div>

          {PIPELINE_STEPS.map((step) => {
            const isActive = active === step.id
            const Icon = step.icon
            return (
              <button
                key={step.id}
                onClick={() => setActive(step.id)}
                className="relative flex flex-col items-center gap-3 md:gap-4 text-center focus:outline-none group z-10 w-20 md:w-32"
              >
                <div 
                  className={`flex h-10 w-10 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                    isActive 
                      ? 'border-white bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)] scale-110' 
                      : 'border-white/20 bg-black text-white/50 group-hover:text-white group-hover:border-white/50'
                  }`}
                >
                  <Icon weight={isActive ? 'fill' : 'regular'} className="h-5 w-5" />
                </div>
                <span 
                  className={`text-xs md:text-sm font-semibold tracking-tight transition-colors duration-300 ${
                    isActive ? 'text-white' : 'text-white/50 group-hover:text-white/80'
                  }`}
                >
                  {step.label}
                </span>
              </button>
            )
          })}
        </div>

        {/* Detail Panel */}
        <div className="relative w-full rounded-3xl border border-white/10 bg-[#050505] overflow-hidden min-h-[350px] md:min-h-[400px] shadow-2xl">
          {/* Very subtle grid background to sell the terminal/UI feel */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute inset-0 flex flex-col md:flex-row p-8 md:p-16 gap-8 md:gap-12"
            >
              {/* Left text column */}
              <div className="flex-1 flex flex-col justify-center max-w-[500px]">
                <p className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
                  {PIPELINE_STEPS.find(s => s.id === active)?.label}
                </p>
                <p className="text-base md:text-lg text-white/70 leading-relaxed">
                  {PIPELINE_STEPS.find(s => s.id === active)?.description}
                </p>
              </div>

              {/* Right cinematic example */}
              <div className="flex-1 flex items-center justify-center">
                {PIPELINE_STEPS.find((step) => step.id === active)?.example}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  )
}
