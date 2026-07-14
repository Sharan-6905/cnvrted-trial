import { CheckCircle } from '@phosphor-icons/react/dist/ssr'
import { TRUST_BAR } from '@/content/copy'

export function TrustBar() {
  return (
    <section aria-label="Built for revenue teams" className="border-y border-border bg-surface py-6">
      <div className="mx-auto w-full px-[5%]">
        <div className="flex flex-col items-center gap-4">
          <p className="text-caption font-mono text-text-tertiary uppercase tracking-[0.08em]">
            {TRUST_BAR.label}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {TRUST_BAR.roles.map((role) => (
              <div key={role} className="flex items-center gap-2">
                <CheckCircle weight="fill" size={16} className="text-accent shrink-0" />
                <span className="text-body text-text-secondary whitespace-nowrap">{role}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
