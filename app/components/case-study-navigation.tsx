'use client'

import Link from 'next/link'

interface CaseStudyNavigationProps {
  previous?: {
    slug: string
    title: string
    client?: string
    image?: string
  }
  next?: {
    slug: string
    title: string
    client?: string
    image?: string
  }
}

export function CaseStudyNavigation({ previous, next }: CaseStudyNavigationProps) {
  if (!previous && !next) return null

  return (
    <section className="px-8 md:px-20 py-[60px] md:py-[80px]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {/* Previous Case Study */}
        {previous ? (
          <Link 
            href={`/case-studies/${previous.slug}`}
            prefetch={true}
            className="group relative flex flex-col gap-4 p-6 md:p-8 rounded-lg transition-all hover:opacity-90 overflow-hidden"
            style={{ 
              backgroundColor: 'var(--background)',
            }}
          >
            {/* Background Image */}
            {previous.image && (
              <div 
                className="absolute inset-0 opacity-10 group-hover:opacity-15 transition-opacity"
                style={{
                  backgroundImage: `url(${previous.image.startsWith('/') ? previous.image : `/${previous.image}`})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
              />
            )}
            {/* Content */}
            <div className="relative z-10">
              <div className="flex items-center gap-2">
                <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 16 16" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className="transform group-hover:-translate-x-1 transition-transform"
                  style={{ color: 'var(--text-tertiary)' }}
                >
                  <path 
                    d="M10 12L6 8L10 4" 
                    stroke="currentColor" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="font-vt323 text-base uppercase no-underline" style={{ color: 'var(--text-tertiary)' }}>Previous</span>
              </div>
              <div className="flex flex-col gap-[4px] mt-4">
                <p className="font-instrument-serif text-base md:text-lg uppercase leading-[1.5] tracking-[0.2052px] no-underline group-hover:opacity-80 transition-opacity" style={{ color: 'var(--text)' }}>
                  {previous.title}
                </p>
              </div>
            </div>
          </Link>
        ) : (
          <div /> // Empty div for grid alignment
        )}

        {/* Next Case Study */}
        {next ? (
          <Link 
            href={`/case-studies/${next.slug}`}
            prefetch={true}
            className="group relative flex flex-col gap-4 p-6 md:p-8 rounded-lg transition-all hover:opacity-90 md:text-right overflow-hidden"
            style={{ 
              backgroundColor: 'var(--background)',
            }}
          >
            {/* Background Image */}
            {next.image && (
              <div 
                className="absolute inset-0 opacity-10 group-hover:opacity-15 transition-opacity"
                style={{
                  backgroundImage: `url(${next.image.startsWith('/') ? next.image : `/${next.image}`})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
              />
            )}
            {/* Content */}
            <div className="relative z-10">
              <div className="flex items-center gap-2 md:justify-end">
                <span className="font-vt323 text-base uppercase no-underline" style={{ color: 'var(--text-tertiary)' }}>Next</span>
                <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 16 16" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className="transform group-hover:translate-x-1 transition-transform"
                  style={{ color: 'var(--text-tertiary)' }}
                >
                  <path 
                    d="M6 12L10 8L6 4" 
                    stroke="currentColor" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="flex flex-col gap-[4px] mt-4">
                <p className="font-instrument-serif text-base md:text-lg uppercase leading-[1.5] tracking-[0.2052px] no-underline group-hover:opacity-80 transition-opacity" style={{ color: 'var(--text)' }}>
                  {next.title}
                </p>
              </div>
            </div>
          </Link>
        ) : (
          <div /> // Empty div for grid alignment
        )}
      </div>
    </section>
  )
}

