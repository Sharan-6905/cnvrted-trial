import Link from 'next/link'
import { NAV, FOOTER } from '@/content/copy'
import { WordmarkGlow } from '@/components/ui/WordmarkGlow'

export function Footer() {
  return (
    <footer
      className="overflow-hidden bg-background"
      role="contentinfo"
    >
      {/* Top bar */}
      <div className="mx-auto max-w-[1280px] px-6 md:px-10 lg:px-20 py-6 border-b border-border">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          {/* Copyright */}
          <p className="text-caption text-text-tertiary">
            &copy; 2025 {NAV.brand}.
          </p>

          {/* Nav links */}
          <nav aria-label="Footer navigation" className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {FOOTER.legal.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-body text-text-secondary hover:text-text-primary transition-colors duration-[110ms]"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Giant outlined wordmark with cursor-follow spotlight */}
      <WordmarkGlow text={NAV.brand} />
    </footer>
  )
}
