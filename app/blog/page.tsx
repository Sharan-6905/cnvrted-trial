import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { getAllPosts } from '@/lib/blog'
import { SignalMark } from '@/components/ui/SignalMark'

export const metadata: Metadata = {
  title: 'Blog - CNVRTED',
  description: 'Notes on outbound, buying signals, and why the lead list is dead.',
}

export default async function BlogIndexPage() {
  const posts = await getAllPosts()

  return (
    <>
      <Nav />
      <main>
        <section className="py-20 md:py-28 border-b border-border">
          <div className="mx-auto max-w-[1280px] px-6 md:px-10 lg:px-20 text-center">
            <h1 className="text-h1-fluid font-semibold text-text-primary mb-4">Blog</h1>
            <p className="text-body-lg text-text-secondary leading-relaxed max-w-[520px] mx-auto">
              Notes on outbound, buying signals, and why timing beats volume.
            </p>
          </div>
        </section>

        <section className="py-20 md:py-24">
          <div className="mx-auto max-w-[1000px] px-6 md:px-10 lg:px-20 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block rounded-xl border border-border bg-surface-raised overflow-hidden transition-colors hover:border-white/25"
              >
                <div className="relative aspect-[16/10] w-full bg-surface border-b border-border flex items-center justify-center overflow-hidden">
                  {post.image ? (
                    <Image
                      src={post.image}
                      alt=""
                      fill
                      sizes="(min-width: 640px) 480px, 100vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <SignalMark size={28} className="text-text-tertiary/40" />
                  )}
                </div>
                <div className="p-6">
                  <p className="text-caption text-text-tertiary font-mono mb-2">
                    {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                  <h2 className="text-h3 font-semibold text-text-primary mb-2 group-hover:text-accent transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-body text-text-secondary leading-relaxed">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
