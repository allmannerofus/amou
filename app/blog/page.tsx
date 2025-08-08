import Link from 'next/link'
import { getAllPosts } from 'app/lib/mdx'
import { Metadata } from 'next'
import { baseUrl } from 'app/sitemap'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Thoughts on design, AI, Web3, and building products that matter.',
  alternates: {
    types: {
      'application/rss+xml': `${baseUrl}/feed`,
    },
  },
}

export default function BlogPage() {
  const posts = getAllPosts('blog')

  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-4xl font-faktum-medium tracking-tight">
            Blog
          </h1>
          <Link 
            href="/feed" 
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            RSS Feed
          </Link>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Thoughts on design, AI, Web3, and building products that matter.
        </p>
      </header>

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            No blog posts yet. Check back soon!
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {posts.map((post) => (
            <article key={post.slug} className="border-b border-gray-200 dark:border-gray-700 pb-8">
              <Link href={`/blog/${post.slug}`} className="group">
                <h2 className="text-2xl font-faktum-medium mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {post.meta.title}
                </h2>
              </Link>
              
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                <time dateTime={post.meta.date}>
                  {post.meta.date}
                </time>
                {post.meta.tags && post.meta.tags.length > 0 && (
                  <div className="flex gap-2">
                    {post.meta.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              
              {post.meta.description && (
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {post.meta.description}
                </p>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  )
} 