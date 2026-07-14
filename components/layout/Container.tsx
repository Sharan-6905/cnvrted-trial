import type { ElementType, ReactNode, ComponentPropsWithoutRef } from 'react'

/**
 * Container — fluid horizontal margin wrapper used by every section.
 *
 * Margins scale with the viewport instead of capping out at a fixed
 * max-width, so content keeps using the available width on large screens:
 *   - Outer horizontal margin: 5% of viewport width on each side
 *   - Centered: mx-auto
 *
 * The `as` prop allows rendering as any HTML element (div, section, header, footer, nav)
 * so the Container itself doesn't impose incorrect semantic structure.
 *
 * Usage:
 *   <Container>...</Container>                          renders a <div>
 *   <Container as="section" id="hero">...</Container>  renders a <section>
 *   <Container as="nav" aria-label="...">...</Container>
 */

type ContainerProps<T extends ElementType = 'div'> = {
  as?: T
  children: ReactNode
  className?: string
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>

export function Container<T extends ElementType = 'div'>({
  as,
  children,
  className = '',
  ...rest
}: ContainerProps<T>) {
  const Tag = (as ?? 'div') as ElementType

  return (
    <Tag
      className={[
        'mx-auto',
        'w-full',
        // Fluid horizontal padding: 5% of viewport width each side
        'px-[5%]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...(rest as object)}
    >
      {children}
    </Tag>
  )
}
