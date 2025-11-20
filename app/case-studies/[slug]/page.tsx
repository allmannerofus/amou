import { notFound } from 'next/navigation'
import { getPostBySlug, getAllPosts } from 'app/lib/mdx'
import { CaseStudyPageClient } from 'app/components/case-study-page-client'
import { Metadata } from 'next'
import { baseUrl } from 'app/sitemap'
import Script from 'next/script'

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

  // Extract description from content body
  const contentLines = caseStudy.content.split('\n')
  const initialDescription: string[] = []
  for (const line of contentLines) {
    if (line.startsWith('## ')) break
    if (line.trim() && !line.trim().startsWith('#')) {
      initialDescription.push(line.trim())
    }
  }
  const description = initialDescription.length > 0 
    ? initialDescription.join(' ') 
    : caseStudy.meta.description || `Case study: ${caseStudy.meta.title}`

  // Extract first image for Open Graph
  let ogImage: string | undefined
  let inImagesSection = false
  for (const line of contentLines) {
    if (line.startsWith('## Project Images')) {
      inImagesSection = true
      continue
    }
    if (inImagesSection && line.startsWith('## ')) {
      break
    }
    if (inImagesSection && line.trim()) {
      const imageMatch = line.match(/^!\[([^\]]*)\]\(([^)]+)\)/)
      if (imageMatch) {
        const [, , src] = imageMatch
        ogImage = src.startsWith('http') ? src : `${baseUrl}${src.startsWith('/') ? '' : '/'}${src}`
        break
      }
    }
  }

  const title = caseStudy.meta.client 
    ? `${caseStudy.meta.title} — ${caseStudy.meta.client}`
    : caseStudy.meta.title

  const url = `${baseUrl}/case-studies/${slug}`

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      images: ogImage ? [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: caseStudy.meta.title,
        }
      ] : [
        {
          url: `${baseUrl}/amou-social-share.jpg`,
          width: 1200,
          height: 630,
          alt: caseStudy.meta.title,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImage ? [ogImage] : [`${baseUrl}/amou-social-share.jpg`],
    },
  }
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params
  const caseStudy = getPostBySlug(slug, 'case-studies')

  if (!caseStudy || (caseStudy.meta.published === false && process.env.NODE_ENV !== 'development')) {
    notFound()
  }

  // Extract roles/deliverables from content
  const roles: string[] = []
  const lines = caseStudy.content.split('\n')
  let inRoleSection = false
  for (const line of lines) {
    if (line.startsWith('## Role / Deliverables')) {
      inRoleSection = true
      continue
    }
    if (inRoleSection && line.startsWith('## ')) {
      break
    }
    if (inRoleSection && line.trim() && !line.trim().startsWith('*') && !line.toLowerCase().includes('add roles')) {
      // Check if it's a JSON array format (handles various spacing)
      const trimmedLine = line.trim()
      if (trimmedLine.startsWith('[') && trimmedLine.endsWith(']')) {
        // Extract all roles from JSON array
        const rolesStr = trimmedLine.match(/"([^"]+)"/g)
        if (rolesStr) {
          roles.push(...rolesStr.map(r => r.replace(/"/g, '')))
        }
      } else {
        // Regular text line - add as role
        if (trimmedLine) {
          roles.push(trimmedLine)
        }
      }
    }
  }

  // Extract collaborators from content
  const collaborators: string[] = []
  let inCollaboratorsSection = false
  for (const line of lines) {
    if (line.startsWith('## Collaborators')) {
      inCollaboratorsSection = true
      continue
    }
    if (inCollaboratorsSection && line.startsWith('## ')) {
      break
    }
    if (inCollaboratorsSection && line.trim() && !line.trim().startsWith('*') && !line.toLowerCase().includes('optional') && !line.toLowerCase().includes('add collaborators')) {
      collaborators.push(line.trim())
    }
  }

  // Extract description from content body
  const contentLines = caseStudy.content.split('\n')
  const initialDescription: string[] = []
  for (const line of contentLines) {
    if (line.startsWith('## ')) break
    if (line.trim() && !line.trim().startsWith('#')) {
      initialDescription.push(line.trim())
    }
  }
  const displayDescription = initialDescription.length > 0 ? initialDescription.join(' ') : caseStudy.meta.description

  // Extract first image for featured image on mobile
  let featuredImage: { src: string; alt: string } | undefined
  let inImagesSection = false
  for (const line of contentLines) {
    if (line.startsWith('## Project Images')) {
      inImagesSection = true
      continue
    }
    if (inImagesSection && line.startsWith('## ')) {
      break
    }
    if (inImagesSection && line.trim()) {
      const imageMatch = line.match(/^!\[([^\]]*)\]\(([^)]+)\)/)
      if (imageMatch) {
        const [, alt, src] = imageMatch
        featuredImage = { src, alt: alt || '' }
        break
      }
    }
  }

  const url = `${baseUrl}/case-studies/${slug}`
  const ogImage = featuredImage?.src 
    ? (featuredImage.src.startsWith('http') ? featuredImage.src : `${baseUrl}${featuredImage.src.startsWith('/') ? '' : '/'}${featuredImage.src}`)
    : `${baseUrl}/amou-social-share.jpg`

  // Get all case studies for navigation
  const allCaseStudies = getAllPosts('case-studies')
  const currentIndex = allCaseStudies.findIndex(cs => cs.slug === slug)
  
  // Get previous and next case studies
  const previousCaseStudy = currentIndex > 0 ? allCaseStudies[currentIndex - 1] : null
  const nextCaseStudy = currentIndex < allCaseStudies.length - 1 ? allCaseStudies[currentIndex + 1] : null

  // Extract first image from previous/next case studies
  const extractFirstImage = (content: string): string | undefined => {
    let inImagesSection = false
    for (const line of content.split('\n')) {
      if (line.startsWith('## Project Images')) {
        inImagesSection = true
        continue
      }
      if (inImagesSection && line.startsWith('## ')) {
        break
      }
      if (inImagesSection && line.trim()) {
        const imageMatch = line.match(/^!\[([^\]]*)\]\(([^)]+)\)/)
        if (imageMatch) {
          const [, , src] = imageMatch
          return src
        }
      }
    }
    return undefined
  }

  const previous = previousCaseStudy ? {
    slug: previousCaseStudy.slug,
    title: previousCaseStudy.meta.title,
    client: previousCaseStudy.meta.client,
    image: extractFirstImage(previousCaseStudy.content),
  } : undefined

  const next = nextCaseStudy ? {
    slug: nextCaseStudy.slug,
    title: nextCaseStudy.meta.title,
    client: nextCaseStudy.meta.client,
    image: extractFirstImage(nextCaseStudy.content),
  } : undefined

  // Build structured data for case study
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": caseStudy.meta.title,
    "description": displayDescription || caseStudy.meta.description || '',
    "url": url,
    "image": ogImage,
    "creator": {
      "@type": "Organization",
      "name": "All Manner Of Us",
      "url": baseUrl
    },
    ...(caseStudy.meta.client && {
      "client": {
        "@type": "Organization",
        "name": caseStudy.meta.client
      }
    }),
    ...(roles.length > 0 && {
      "keywords": roles.join(", ")
    }),
    ...(caseStudy.meta.tags && caseStudy.meta.tags.length > 0 && {
      "about": caseStudy.meta.tags.map(tag => ({
        "@type": "Thing",
        "name": tag
      }))
    })
  }

  return (
    <>
      <Script
        id={`structured-data-${slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
      <CaseStudyPageClient
        title={caseStudy.meta.title}
        client={caseStudy.meta.client}
        roles={roles}
        description={displayDescription || ''}
        collaborators={collaborators}
        featuredImage={featuredImage}
        content={caseStudy.content}
        previous={previous}
        next={next}
        slug={slug}
      />
    </>
  )
} 