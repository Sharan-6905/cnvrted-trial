'use client'

/**
 * Button — primary CTA. Spec: docs/04-design-system.md §8.1.
 *
 * Variants:
 *   primary  — solid accent background (default, used for all main CTAs)
 *   ghost    — transparent with accent border (reserved for secondary actions)
 *
 * When `href` is provided the component renders as <motion.a> instead of
 * <motion.button>. This allows nav CTAs and inline text-adjacent CTAs to
 * use the same visual as the button while being semantically correct anchor
 * elements (links navigate; buttons trigger actions).
 *
 * The loading state renders "Joining…" with an inline spinner (docs/06-motion.md §5.1).
 * The spinner is a CSS animation so it runs even under reduced-motion — the user
 * still needs feedback that a network request is in progress.
 *
 * Focus: white outline visible against the coloured button background, overriding
 * the global :focus-visible rule which uses the accent colour.
 */

import { motion } from 'framer-motion'
import { DURATION, EASE } from '@/lib/tokens'
import { UI } from '@/content/copy'

// ─── Shared visual classes ────────────────────────────────────────────────────

const base =
  'inline-flex items-center justify-center gap-2 rounded-md text-body font-sans font-medium transition-colors select-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2'

const variantClasses = {
  primary:
    'bg-accent text-on-accent hover:bg-accent-hover active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-accent',
  ghost:
    'bg-transparent text-accent border border-accent hover:bg-accent-dim active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed',
}

// ─── Shared content renderer ──────────────────────────────────────────────────

function ButtonContent({
  loading,
  children,
}: {
  loading: boolean
  children: React.ReactNode
}) {
  return (
    <>
      {loading && (
        <span
          className="inline-block h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin"
          aria-hidden="true"
        />
      )}
      <span>{loading ? UI.formSubmitting : children}</span>
    </>
  )
}

// ─── Prop types ───────────────────────────────────────────────────────────────

interface ButtonBaseProps {
  children: React.ReactNode
  disabled?: boolean
  loading?: boolean
  variant?: 'primary' | 'ghost'
  /** Reduces padding to fit the nav bar height (10px / 20px vs 12px / 24px) */
  compact?: boolean
  className?: string
  'aria-label'?: string
}

/** Renders as <button> when no href is provided. */
interface ButtonButtonProps extends ButtonBaseProps {
  href?: undefined
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
}

/** Renders as <a> when href is provided — semantically correct for navigation. */
interface ButtonAnchorProps extends ButtonBaseProps {
  href: string
  onClick?: () => void
  type?: undefined
}

type ButtonProps = ButtonButtonProps | ButtonAnchorProps

// ─── Component ───────────────────────────────────────────────────────────────

export function Button({
  children,
  disabled = false,
  loading = false,
  variant = 'primary',
  compact = false,
  className = '',
  'aria-label': ariaLabel,
  ...rest
}: ButtonProps) {
  const isDisabled = disabled || loading
  const padding = compact ? 'py-[10px] px-5' : 'py-3 px-6'
  const classes = [base, padding, variantClasses[variant], className]
    .filter(Boolean)
    .join(' ')

  const motionProps = {
    whileTap: isDisabled ? undefined : { scale: 0.98 as const },
    transition: { duration: DURATION.instant, ease: EASE.hover },
  }

  if ('href' in rest && rest.href !== undefined) {
    return (
      <motion.a
        href={rest.href}
        onClick={rest.onClick}
        aria-label={ariaLabel}
        aria-disabled={isDisabled || undefined}
        className={classes}
        {...motionProps}
      >
        <ButtonContent loading={loading}>{children}</ButtonContent>
      </motion.a>
    )
  }

  const { onClick, type } = rest as ButtonButtonProps
  return (
    <motion.button
      type={type ?? 'button'}
      onClick={onClick}
      disabled={isDisabled}
      aria-label={ariaLabel}
      aria-busy={loading || undefined}
      className={classes}
      {...motionProps}
    >
      <ButtonContent loading={loading}>{children}</ButtonContent>
    </motion.button>
  )
}
