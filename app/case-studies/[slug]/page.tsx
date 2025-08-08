import { notFound } from 'next/navigation'
import { getPostBySlug, getAllPosts } from 'app/lib/mdx'
import { SimpleContent } from 'app/components/simple-content'
import { ShareButtons } from 'app/components/share-buttons'
import { Metadata } from 'next'
import Link from 'next/link'
import { baseUrl } from 'app/sitemap'

interface CaseStudyPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const caseStudies = getAllPosts('case-studies')
  return caseStudies.map((caseStudy) => ({
    slug: caseStudy.slug,
  }))
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params
  const caseStudy = getPostBySlug(slug, 'case-studies')
  
  if (!caseStudy) {
    return {
      title: 'Case Study Not Found',
    }
  }

  return {
    title: caseStudy.meta.title,
    description: caseStudy.meta.description,
    openGraph: {
      title: caseStudy.meta.title,
      description: caseStudy.meta.description,
      url: `${baseUrl}/case-studies/${slug}`,
      type: 'article',
      publishedTime: caseStudy.meta.date,
      tags: caseStudy.meta.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: caseStudy.meta.title,
      description: caseStudy.meta.description,
    },
  }
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params
  const caseStudy = getPostBySlug(slug, 'case-studies')

  if (!caseStudy) {
    notFound()
  }

  const caseStudyUrl = `${baseUrl}/case-studies/${slug}`

  return (
    <article className="max-w-4xl mx-auto">
      <header className="mb-8">
        <Link 
          href="/case-studies" 
          className="text-blue-600 dark:text-blue-400 hover:underline mb-4 inline-block"
        >
          ← Back to Case Studies
        </Link>
        
        <h1 className="text-4xl font-faktum-medium tracking-tight mb-4">
          {caseStudy.meta.title}
        </h1>
        
        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
          <time dateTime={caseStudy.meta.date}>
            {caseStudy.meta.date}
          </time>
          {caseStudy.meta.tags && caseStudy.meta.tags.length > 0 && (
            <div className="flex gap-2">
              {caseStudy.meta.tags.map((tag) => (
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
        
        {caseStudy.meta.description && (
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            {caseStudy.meta.description}
          </p>
        )}
      </header>

      <SimpleContent content={caseStudy.content} />

      <ShareButtons 
        title={caseStudy.meta.title}
        url={caseStudyUrl}
        description={caseStudy.meta.description}
        tags={caseStudy.meta.tags}
      />
    </article>
  )
} 