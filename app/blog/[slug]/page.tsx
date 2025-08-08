import { notFound } from 'next/navigation'
import { getPostBySlug, getAllPosts } from 'app/lib/mdx'
import { SimpleContent } from 'app/components/simple-content'
import { ShareButtons } from 'app/components/share-buttons'
import { Metadata } from 'next'
import Link from 'next/link'
import { baseUrl } from 'app/sitemap'

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const posts = getAllPosts('blog')
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug, 'blog')
  
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.meta.title,
    description: post.meta.description,
    openGraph: {
      title: post.meta.title,
      description: post.meta.description,
      url: `${baseUrl}/blog/${slug}`,
      type: 'article',
      publishedTime: post.meta.date,
      tags: post.meta.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.meta.title,
      description: post.meta.description,
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug, 'blog')

  if (!post) {
    notFound()
  }

  const postUrl = `${baseUrl}/blog/${slug}`

  return (
    <article className="max-w-4xl mx-auto">
      <header className="mb-8">
        <Link 
          href="/blog" 
          className="text-blue-600 dark:text-blue-400 hover:underline mb-4 inline-block"
        >
          ← Back to Blog
        </Link>
        
        <h1 className="text-4xl font-faktum-medium tracking-tight mb-4">
          {post.meta.title}
        </h1>
        
        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
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
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            {post.meta.description}
          </p>
        )}
      </header>

      <SimpleContent content={post.content} />

      <ShareButtons 
        title={post.meta.title}
        url={postUrl}
        description={post.meta.description}
        tags={post.meta.tags}
      />
    </article>
  )
} 