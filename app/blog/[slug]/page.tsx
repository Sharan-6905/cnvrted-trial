import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { getPostSlugs, type PostMetadata } from '@/lib/blog'

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

  return (
    <>
      <Nav />
      <main>
        <article className="py-20 md:py-28">
          <div className="mx-auto max-w-[720px] px-6 md:px-10 lg:px-20">
            <p className="text-caption text-text-tertiary font-mono mb-4">
              {new Date(metadata.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            <h1 className="text-h1-fluid font-semibold text-text-primary mb-10">{metadata.title}</h1>
            <Post />
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
