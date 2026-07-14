import Link from 'next/link'
import { NAV, FOOTER } from '@/content/copy'
import { WordmarkGlow } from '@/components/ui/WordmarkGlow'

const SOCIAL_LINKS = [
  {
    name: 'Instagram',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" style={{ width: 18, height: 18 }}>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: 'X',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ width: 16, height: 16 }}>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ width: 16, height: 16 }}>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.114 20.452H3.558V9h3.556v11.452z" />
      </svg>
    ),
  },
] as const

export function Footer() {
  return (
    <footer
      className="overflow-hidden bg-background"
      role="contentinfo"
    >
      {/* Top bar */}
      <div className="mx-auto w-full px-[5%] py-6 border-b border-border">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          {/* Social links */}
          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.name}
                href={social.href}
                aria-label={social.name}
                className="text-text-tertiary hover:text-text-primary transition-colors duration-[110ms]"
              >
                {social.icon}
              </a>
            ))}
          </div>

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
