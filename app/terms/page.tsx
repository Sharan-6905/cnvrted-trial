import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service - CNVRTED',
  description: 'Terms and conditions for using CNVRTED.',
}

const SECTIONS = [
  {
    title: 'Acceptance of terms',
    body: `By accessing or using CNVRTED, you agree to be bound by these Terms of Service. If you do not agree, do not use the product. These terms apply to all users, including waitlist members and early access participants.`,
  },
  {
    title: 'What CNVRTED is',
    body: `CNVRTED is a B2B revenue intelligence platform that monitors public data sources to surface buying signals for sales teams. All data monitored by CNVRTED is publicly accessible. We do not access private, confidential, or non-public information.`,
  },
  {
    title: 'Acceptable use',
    body: `You may use CNVRTED only for lawful business purposes. You may not use CNVRTED to harass, stalk, or target individuals for personal purposes. You may not attempt to reverse-engineer, scrape, or extract data from the CNVRTED platform itself.\n\nCNVRTED is intended for use by sales, marketing, and revenue operations professionals in a business context.`,
  },
  {
    title: 'Early access',
    body: `During the early access period, features, pricing, and availability are subject to change without notice. We reserve the right to limit, suspend, or terminate access at any time. Early access does not constitute a binding commercial agreement.`,
  },
  {
    title: 'Intellectual property',
    body: `CNVRTED and all associated content, technology, and trademarks are owned by CNVRTED. You may not reproduce, distribute, or create derivative works from any part of CNVRTED without written permission.`,
  },
  {
    title: 'Limitation of liability',
    body: `CNVRTED is provided "as is." We make no warranties about the accuracy, completeness, or reliability of signals surfaced by the platform. We are not liable for any business decisions made based on CNVRTED output.\n\nTo the maximum extent permitted by law, CNVRTED's total liability to you for any claim arising from use of the platform is limited to the amount you paid us in the 12 months prior to the claim.`,
  },
  {
    title: 'Termination',
    body: `We may suspend or terminate your access to CNVRTED at any time for any reason, including violation of these terms. You may stop using CNVRTED at any time.`,
  },
  {
    title: 'Changes to these terms',
    body: `We may update these terms from time to time. Material changes will be communicated by email. Continued use after any update constitutes acceptance of the revised terms.`,
  },
  {
    title: 'Contact',
    body: `Questions about these terms? Email us at dhruvpradeep@cnvrted.com.`,
  },
]

export default function TermsPage() {
  return (
    <>
      <Nav />
      <main className="bg-background pt-24 min-h-screen">

        <section className="py-20 md:py-28 border-b border-border">
          <div className="mx-auto max-w-[1280px] px-6 md:px-10 lg:px-20">
            <div className="max-w-[640px]">
              <p className="text-caption font-mono text-text-tertiary uppercase tracking-[0.08em] mb-4" style={{ fontSize: 11 }}>
                LEGAL
              </p>
              <h1 className="text-display-fluid font-semibold text-text-primary leading-tight mb-4">
                Terms of Service
              </h1>
              <p className="text-body text-text-tertiary" style={{ fontSize: 13 }}>Last updated July 2025</p>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-[1280px] px-6 md:px-10 lg:px-20">
            <div className="max-w-[680px] flex flex-col gap-10">
              {SECTIONS.map((s) => (
                <div key={s.title}>
                  <h2 className="text-body font-semibold text-text-primary mb-3">{s.title}</h2>
                  {s.body.split('\n\n').map((para, i) => (
                    <p key={i} className="text-body text-text-secondary leading-relaxed mb-3 last:mb-0" style={{ fontSize: 14 }}>
                      {para}
                    </p>
                  ))}
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
