import fs from 'fs'
import path from 'path'

export interface PostMetadata {
  title: string
  date: string
  excerpt: string
  /** Optional cover image path (e.g. '/blog/my-post.jpg'). Falls back to a placeholder when omitted. */
  image?: string
}

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

export function getPostSlugs(): string[] {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''))
}

export async function getAllPosts(): Promise<(PostMetadata & { slug: string })[]> {
  const slugs = getPostSlugs()
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const { metadata } = (await import(`@/content/blog/${slug}.mdx`)) as { metadata: PostMetadata }
      return { slug, ...metadata }
    })
  )
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1))
}
