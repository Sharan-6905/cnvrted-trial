import type { MDXComponents } from 'mdx/types'

const components: MDXComponents = {
  h1: ({ children }) => (
    <h1 className="text-h2 font-semibold text-text-primary mt-12 mb-4 first:mt-0">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-h3 font-semibold text-text-primary mt-10 mb-3">{children}</h2>
  ),
  p: ({ children }) => (
    <p className="text-body-lg text-text-secondary leading-[1.75] mb-6">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="list-disc pl-5 text-body-lg text-text-secondary leading-relaxed mb-5 space-y-1">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal pl-5 text-body-lg text-text-secondary leading-relaxed mb-5 space-y-1">{children}</ol>
  ),
  a: ({ children, href }) => (
    <a href={href} className="text-text-primary underline underline-offset-2 hover:text-accent transition-colors">
      {children}
    </a>
  ),
  strong: ({ children }) => <strong className="text-text-primary font-semibold">{children}</strong>,
  em: ({ children }) => <em className="italic">{children}</em>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-border pl-4 text-body-lg text-text-tertiary italic mb-5">
      {children}
    </blockquote>
  ),
}

export function useMDXComponents(): MDXComponents {
  return components
}
