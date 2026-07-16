'use client'

/**
 * MobileMenu — full-screen overlay for mobile navigation.
 * Spec: docs/05-homepage.md §1 (Mobile nav) + docs/08-ui-principles.md §3.2.
 *
 * Behaviour:
 *   - Renders as a fixed full-viewport overlay (bg-background, z-[48])
 *   - The Nav header (z-50) sits on top, keeping the wordmark, CTA, and X icon
 *     visible at all times per the spec ("Join the waitlist button remains
 *     visible in the collapsed mobile header bar at all times")
 *   - Nav items are vertically centered in the space below the header, at h2 scale
 *   - Close affordances: clicking the X in the nav header, clicking the backdrop,
 *     or pressing Escape (Escape is handled in Nav.tsx via a parent useEffect)
 *   - Focus is trapped inside while open; first focusable element receives focus
 *     on mount; focus returns to the hamburger button via the onClose callback
 *
 * Accessibility:
 *   - role="dialog" aria-modal="true" aria-label per WCAG 2.1 §2.1.2 (no keyboard trap)
 *   - Tab/Shift+Tab cycle within the menu
 *   - Escape handled by parent (Nav.tsx) — consistent with WCAG best practice
 *     of keeping Escape handling closest to the triggering element
 *
 * Animation:
 *   - Uses mobileMenuOverlay variants from lib/motion.ts (200ms opacity fade)
 *   - AnimatePresence in Nav.tsx handles mount/unmount
 */

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { mobileMenuOverlay, fadeInUp } from '@/lib/motion'
import { NAV } from '@/content/copy'

interface MobileMenuProps {
  id: string
  onClose: () => void
}

const FOCUSABLE_SELECTORS =
  'a[href], button:not([disabled]), input:not([disabled]), ' +
  'select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

export function MobileMenu({ id, onClose }: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null)

  // Focus trap: keep keyboard focus inside the menu while open
  useEffect(() => {
    const menu = menuRef.current
    if (!menu) return

    const focusable = Array.from(
      menu.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS)
    )
    if (focusable.length === 0) return

    // Move focus into menu on open
    focusable[0]?.focus()

    const trapFocus = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last.focus()
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', trapFocus)
    return () => document.removeEventListener('keydown', trapFocus)
  }, [])

  return (
    <motion.div
      id={id}
      ref={menuRef}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      variants={mobileMenuOverlay}
      initial="hidden"
      animate="visible"
      exit="exit"
      // Close when tapping the backdrop (anywhere outside the nav links)
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      className="fixed inset-0 z-[48] bg-background flex flex-col"
    >
      {/* Spacer: reserves the height of the fixed nav header above the overlay */}
      <div className="h-14 md:h-16 shrink-0" aria-hidden="true" />

      {/* Nav links: vertically centered in remaining viewport height */}
      <nav
        aria-label="Mobile navigation"
        className="flex-1 flex flex-col items-center justify-center gap-3xl px-xl"
      >
        <ul className="flex flex-col items-center gap-2xl list-none" role="list">
          {NAV.links.map((link, i) => (
            <motion.li
              key={link.label}
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: i * 0.06 }}
            >
              <a
                href={link.href}
                onClick={onClose}
                className={[
                  'text-h2 text-text-primary text-center block',
                  'hover:text-accent transition-colors duration-[110ms]',
                  'focus-visible:outline-none focus-visible:text-accent',
                  'focus-visible:underline focus-visible:underline-offset-4',
                  '[text-decoration-color:var(--color-accent)] [text-decoration-thickness:2px]',
                ].join(' ')}
              >
                {link.label}
              </a>
            </motion.li>
          ))}
        </ul>

      </nav>
    </motion.div>
  )
}
