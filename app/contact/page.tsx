import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact - CNVRTED',
  description: 'Get in touch with the CNVRTED team.',
}

const TEAM = [
  {
    name: 'Dhruv Pradeep',
    role: 'CEO',
    email: 'dhruvpradeep@cnvrted.com',
  },
  {
    name: 'Kailas Krsna',
    role: 'CTO',
    email: 'kailas@cnvrted.com',
  },
  {
    name: 'Sharan',
    role: 'COO',
    email: 'sharan@cnvrted.com',
  },
]

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main className="bg-background pt-24 min-h-screen">

        {/* Hero */}
        <section className="py-20 md:py-28 border-b border-border">
          <div className="mx-auto max-w-[1280px] px-6 md:px-10 lg:px-20">
            <div className="max-w-[640px]">
              <p className="text-caption font-mono text-text-tertiary uppercase tracking-[0.08em] mb-4" style={{ fontSize: 11 }}>
                CONTACT
              </p>
              <h1 className="text-display-fluid font-semibold text-text-primary leading-tight mb-6">
                Talk to us.
              </h1>
              <p className="text-body-lg text-text-secondary leading-relaxed">
                We are a small founding team. Reach out directly — no ticketing system, no support queue.
              </p>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 md:py-24">
          <div className="mx-auto max-w-[1280px] px-6 md:px-10 lg:px-20">
            <p className="text-caption font-mono text-text-tertiary uppercase tracking-[0.08em] mb-10" style={{ fontSize: 11 }}>
              THE TEAM
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-[800px]">
              {TEAM.map((person) => (
                <div
                  key={person.email}
                  className="rounded-2xl border border-border bg-surface p-6 flex flex-col gap-4"
                >
                  <div>
                    <p className="text-body font-semibold text-text-primary mb-0.5">{person.name}</p>
                    <span
                      className="text-caption font-mono uppercase tracking-widest px-2 py-0.5 rounded-full"
                      style={{ fontSize: 10, color: 'var(--color-accent)', backgroundColor: 'var(--color-accent-dim)' }}
                    >
                      {person.role}
                    </span>
                  </div>
                  <a
                    href={`mailto:${person.email}`}
                    className="text-body text-text-secondary hover:text-text-primary transition-colors duration-150 break-all"
                    style={{ fontSize: 13 }}
                  >
                    {person.email}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
