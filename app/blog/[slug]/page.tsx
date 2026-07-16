import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { getPostSlugs, type PostMetadata } from '@/lib/blog'
import { SignalMark } from '@/components/ui/SignalMark'

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }))
}

async function loadPost(slug: string) {
  try {
    return (await import(`@/content/blog/${slug}.mdx`)) as {
      default: React.ComponentType
      metadata: PostMetadata
    }
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await loadPost(slug)
  if (!post) return {}
  return {
    title: `${post.metadata.title} - CNVRTED Blog`,
    description: post.metadata.excerpt,
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await loadPost(slug)
  if (!post) notFound()

  const { default: Post, metadata } = post

  const formattedDate = new Date(metadata.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <>
      <Nav />
      <main>
        <article className="pt-14 md:pt-16 pb-20 md:pb-28">
          <div className="mx-auto max-w-[1000px] px-6 md:px-10 lg:px-12">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-caption font-mono text-text-tertiary hover:text-text-primary transition-colors mt-10 mb-8"
            >
              ← Back to blog
            </Link>

            {/* Hero band */}
            <div className="relative aspect-[21/9] w-full rounded-xl overflow-hidden border border-border bg-surface-raised flex items-center justify-center mb-10">
              {metadata.image ? (
                <Image src={metadata.image} alt="" fill sizes="1000px" className="object-cover" priority />
              ) : (
                <SignalMark size={40} className="text-text-tertiary/40" />
              )}
            </div>

            {/* Meta + title */}
            <div className="max-w-[720px]">
              <p className="text-caption text-text-tertiary font-mono uppercase tracking-[0.08em] mb-4">
                {formattedDate}
              </p>
              <h1 className="text-h1-fluid font-semibold text-text-primary mb-4">{metadata.title}</h1>
              <p className="text-body-lg text-text-secondary leading-relaxed">{metadata.excerpt}</p>
            </div>

            <div className="h-px w-full bg-border my-10" />

            {/* Body copy — kept at a readable measure even though the frame is wide */}
            <div className="max-w-[720px]">
              <Post />
            </div>

            <div className="h-px w-full bg-border mt-4 mb-10" />

            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-caption font-mono text-text-tertiary hover:text-text-primary transition-colors"
            >
              ← Back to blog
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
