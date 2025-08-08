import Link from 'next/link'
import { getAllPosts } from 'app/lib/mdx'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Case Studies',
  description: 'Portfolio of design work and case studies.',
}

export default function CaseStudiesPage() {
  const caseStudies = getAllPosts('case-studies')

  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-12">
        <h1 className="text-4xl font-faktum-medium tracking-tight mb-4">
          Case Studies
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Portfolio of design work and case studies.
        </p>
      </header>

      {caseStudies.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            No case studies yet. Check back soon!
          </p>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2">
          {caseStudies.map((caseStudy) => (
            <article key={caseStudy.slug} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <Link href={`/case-studies/${caseStudy.slug}`} className="group">
                <h2 className="text-xl font-faktum-medium mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {caseStudy.meta.title}
                </h2>
              </Link>
              
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
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
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {caseStudy.meta.description}
                </p>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  )
} 