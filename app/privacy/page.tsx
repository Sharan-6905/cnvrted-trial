import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy - CNVRTED',
  description: 'How CNVRTED collects, uses, and protects your data.',
}

const SECTIONS = [
  {
    title: 'What we collect',
    body: `When you join our waitlist, we collect your email address. When you use CNVRTED, we may collect information about how you interact with the product — pages visited, features used, and actions taken — to improve the experience.\n\nWe do not collect sensitive personal data. We do not sell your data to third parties. Ever.`,
  },
  {
    title: 'How we use it',
    body: `We use your email to contact you about early access, product updates, and relevant announcements. We use product usage data to understand how people use CNVRTED and to improve it.\n\nWe will never send you unsolicited marketing from third parties. If you joined the waitlist, you will only hear from us when access opens.`,
  },
  {
    title: 'Data we monitor on your behalf',
    body: `CNVRTED monitors public data sources — LinkedIn, Reddit, X, news outlets, job boards, and others — on behalf of our customers. All sources are publicly accessible. We do not access private accounts, private messages, or non-public data of any kind.`,
  },
  {
    title: 'Data storage and security',
    body: `Your data is stored securely using industry-standard practices. We use reputable third-party infrastructure providers. Access to your data is restricted to the CNVRTED team members who need it to operate the service.`,
  },
  {
    title: 'Third-party integrations',
    body: `CNVRTED integrates with CRM and sales tools including Salesforce, HubSpot, Outreach, and Apollo. When you connect these tools, data flows between CNVRTED and those platforms according to your configuration. We do not store your CRM data beyond what is needed to operate the integration.`,
  },
  {
    title: 'Your rights',
    body: `You can request to access, correct, or delete your personal data at any time. To do so, email us at dhruvpradeep@cnvrted.com. We will respond within 30 days.`,
  },
  {
    title: 'Changes to this policy',
    body: `We may update this policy from time to time. If we make material changes, we will notify you by email. Continued use of CNVRTED after any change constitutes acceptance of the updated policy.`,
  },
  {
    title: 'Contact',
    body: `Questions about privacy? Reach us at dhruvpradeep@cnvrted.com.`,
  },
]

export default function PrivacyPage() {
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
                Privacy Policy
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
