'use client'

import { CaseStudyContent } from './case-study-content'
import { CaseStudyHero } from './case-study-hero'
import { CaseStudyNavigation } from './case-study-navigation'
import { useEffect, useState, useRef } from 'react'

interface CaseStudyPageClientProps {
  title: string
  client?: string
  roles: string[]
  description: string
  collaborators: string[]
  featuredImage?: { src: string; alt: string }
  content: string
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
  slug?: string // Add slug to help with remounting
}

export function CaseStudyPageClient({
  title,
  client,
  roles,
  description,
  collaborators,
  featuredImage,
  content,
  previous,
  next,
  slug,
}: CaseStudyPageClientProps) {
  const [textVisible, setTextVisible] = useState(false)
  const [imagesVisible, setImagesVisible] = useState(false)
  const contentSectionRef = useRef<HTMLElement>(null)
  const navDivRef = useRef<HTMLDivElement>(null)
  const pageContainerRef = useRef<HTMLDivElement>(null)
  const previousSlugRef = useRef<string | undefined>(undefined)

  // Force visibility with !important when state changes, and watch for changes
  useEffect(() => {
    if (!imagesVisible) return

    const forceVisibility = () => {
      if (contentSectionRef.current) {
        const opacity = window.getComputedStyle(contentSectionRef.current).opacity
        if (parseFloat(opacity) < 0.5) {
          contentSectionRef.current.style.setProperty('opacity', '1', 'important')
          contentSectionRef.current.style.setProperty('pointer-events', 'auto', 'important')
        }
      }
      if (navDivRef.current) {
        const opacity = window.getComputedStyle(navDivRef.current).opacity
        if (parseFloat(opacity) < 0.5) {
          navDivRef.current.style.setProperty('opacity', '1', 'important')
          navDivRef.current.style.setProperty('pointer-events', 'auto', 'important')
        }
      }
    }

    // Apply immediately
    forceVisibility()

    // Watch for style changes and re-apply
    const observers: MutationObserver[] = []
    
    if (contentSectionRef.current) {
      const observer = new MutationObserver(forceVisibility)
      observer.observe(contentSectionRef.current, { 
        attributes: true, 
        attributeFilter: ['style', 'class'] 
      })
      observers.push(observer)
    }
    
    if (navDivRef.current) {
      const observer = new MutationObserver(forceVisibility)
      observer.observe(navDivRef.current, { 
        attributes: true, 
        attributeFilter: ['style', 'class'] 
      })
      observers.push(observer)
    }

    // Also check periodically as a fallback
    const interval = setInterval(forceVisibility, 100)

    return () => {
      observers.forEach(obs => obs.disconnect())
      clearInterval(interval)
    }
  }, [imagesVisible])

  useEffect(() => {
    // Reset visibility when slug changes
    setTextVisible(false)
    setImagesVisible(false)
    
    // Check if this is initial mount (no previous slug) or navigation
    const isNavigation = previousSlugRef.current !== undefined && previousSlugRef.current !== slug
    const wasInitialMount = previousSlugRef.current === undefined
    previousSlugRef.current = slug
    
    if (wasInitialMount) {
      // Initial page load - use staggered animations
      const textTimer = setTimeout(() => {
        setTextVisible(true)
      }, 100)
      
      const imagesTimer = setTimeout(() => {
        setImagesVisible(true)
      }, 400)
      
      return () => {
        clearTimeout(textTimer)
        clearTimeout(imagesTimer)
      }
    } else {
      // Navigation - make visible immediately, but after a tiny delay to ensure DOM is ready
      // Use requestAnimationFrame to ensure we're after the template swap
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTextVisible(true)
          setImagesVisible(true)
          
          // Force visibility with !important immediately
          if (contentSectionRef.current) {
            contentSectionRef.current.style.setProperty('opacity', '1', 'important')
            contentSectionRef.current.style.setProperty('pointer-events', 'auto', 'important')
          }
          if (navDivRef.current) {
            navDivRef.current.style.setProperty('opacity', '1', 'important')
            navDivRef.current.style.setProperty('pointer-events', 'auto', 'important')
          }
        })
      })
    }
  }, [slug]) // Use slug as dependency

  // Mark as new page on mount to prevent template from affecting it
  useEffect(() => {
    if (pageContainerRef.current) {
      pageContainerRef.current.setAttribute('data-is-new-page', 'true')
    }
  }, [])

  return (
    <div 
      ref={pageContainerRef}
      className="min-h-screen" 
      style={{ backgroundColor: 'var(--background)', color: 'var(--text)' }} 
      data-page="case-study"
    >
      <CaseStudyHero 
        title={title}
        client={client}
        roles={roles}
        description={description}
        collaborators={collaborators}
        featuredImage={featuredImage}
        textVisible={textVisible}
      />

      {/* Case Study Content - Only Images */}
      <section 
        ref={contentSectionRef}
        className={`px-8 md:px-20 py-[60px] md:py-[80px] ${imagesVisible ? 'case-study-visible' : ''}`}
        data-page-transition="case-study-content"
        data-animated={imagesVisible ? 'true' : 'false'}
        style={{
          opacity: imagesVisible ? 1 : 0,
          transition: imagesVisible ? 'opacity 0.5s ease-out' : 'none',
          pointerEvents: imagesVisible ? 'auto' : 'none',
        }}
      >
        <CaseStudyContent content={content} />
      </section>

      {/* Navigation to Next/Previous Case Studies - Always visible */}
      <div 
        ref={navDivRef}
        className={imagesVisible ? 'case-study-visible' : ''}
        data-animated={imagesVisible ? 'true' : 'false'}
        style={{ 
          opacity: imagesVisible ? 1 : 0, 
          transition: imagesVisible ? 'opacity 0.5s ease-out' : 'none',
          pointerEvents: imagesVisible ? 'auto' : 'none',
        }}
      >
        <CaseStudyNavigation previous={previous} next={next} />
      </div>
    </div>
  )
}

