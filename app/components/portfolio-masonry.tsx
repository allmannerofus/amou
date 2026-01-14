'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import portfolioData from '../lib/portfolio.json'

interface PortfolioItem {
  id: string
  src: string
  alt: string
  title: string
  client: string
  metatags: string[]
  aspectRatio?: 'portrait' | 'square' | 'landscape' | 'wide' | 'ultra-wide' // Optional - not used in masonry layout
  hidden?: boolean
  caseStudyUrl?: string
  projectId?: string
}

// Portfolio data loaded from JSON file for easy management
const portfolioItems: PortfolioItem[] = portfolioData as PortfolioItem[]

export function PortfolioMasonry() {
  const [visibleItems, setVisibleItems] = useState<PortfolioItem[]>([])
  const [revealedItems, setRevealedItems] = useState<Set<string>>(new Set())
  const itemRefs = useRef<Map<string, HTMLDivElement>>(new Map())

  useEffect(() => {
    // Filter out hidden items
    const filtered = portfolioItems.filter(item => !item.hidden)
    
    // Shuffle the items using Fisher-Yates algorithm
    const shuffled = [...filtered]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    
    setVisibleItems(shuffled)
    
    // Preload first 6 images to prevent layout shift on mobile
    const preloadImages = shuffled.slice(0, 6)
    preloadImages.forEach((item) => {
      const img = new Image()
      img.src = item.src
    })
  }, [])

  // Intersection Observer for fade-in on scroll
  useEffect(() => {
    if (visibleItems.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const itemId = entry.target.getAttribute('data-item-id')
            if (itemId) {
              setRevealedItems((prev) => new Set(prev).add(itemId))
              observer.unobserve(entry.target)
            }
          }
        })
      },
      {
        threshold: 0.1, // Trigger when 10% of item is visible
        rootMargin: '0px 0px -50px 0px', // Start animation slightly before item enters viewport
      }
    )

    // Use requestAnimationFrame to ensure refs are set after render
    const rafId = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        itemRefs.current.forEach((ref) => {
          if (ref) {
            // Check if already in viewport
            const rect = ref.getBoundingClientRect()
            const isInViewport = rect.top < window.innerHeight && rect.bottom > 0
            if (isInViewport) {
              const itemId = ref.getAttribute('data-item-id')
              if (itemId) {
                setRevealedItems((prev) => new Set(prev).add(itemId))
              }
            } else {
              observer.observe(ref)
            }
          }
        })
      })
    })

    return () => {
      cancelAnimationFrame(rafId)
      itemRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref)
      })
    }
  }, [visibleItems])

  return (
    <div className="columns-1 md:columns-2 lg:columns-3 gap-4 md:gap-6 space-y-4 md:space-y-6">
      {visibleItems.map((item) => {
        const CardContent = () => (
          <div className="group">
            {/* Image with hover overlay */}
            <div className="relative w-full">
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-auto"
                loading={visibleItems.indexOf(item) < 6 ? "eager" : "lazy"}
                decoding="async"
                fetchPriority={visibleItems.indexOf(item) < 6 ? "high" : "low"}
              />
              
              {/* Dim overlay */}
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
              
              {/* View Case Study button */}
              {item.caseStudyUrl && (
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="px-[15px] py-[5px] rounded-[2px] font-vt323 text-base md:text-lg uppercase leading-[1.5] transition-colors gradient-border-button">
                    {item.caseStudyUrl.startsWith('/') ? 'VIEW CASE STUDY' : 'VIEW LIVE SITE'}
                  </div>
                </div>
              )}
            </div>
            
            {/* Content */}
            <div className="px-0 py-4">
              {/* Title */}
              <p className="font-instrument-serif text-base md:text-lg uppercase leading-[1.5] mb-2 no-underline" style={{ color: 'var(--text)' }}>
                {item.title}
              </p>
              
              {/* Client Name */}
              <p className="font-vt323 text-base uppercase mb-1 no-underline" style={{ color: 'var(--text-tertiary)' }}>
                {item.client}
              </p>
              
              {/* Metatags */}
              <p className="font-vt323 text-base capitalize no-underline" style={{ color: 'var(--text-tertiary)' }}>
                {item.metatags.join(', ')}
              </p>
            </div>
          </div>
        )

        const isRevealed = revealedItems.has(item.id)

        return (
          <div
            key={item.id}
            ref={(el) => {
              if (el) itemRefs.current.set(item.id, el)
            }}
            data-item-id={item.id}
            className={`break-inside-avoid mb-4 md:mb-6 transition-opacity duration-700 ease-out ${
              isRevealed ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              transform: isRevealed ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
            }}
          >
            {item.caseStudyUrl ? (
              item.caseStudyUrl.startsWith('/') ? (
                <Link
                  href={item.caseStudyUrl}
                  className="block cursor-pointer no-underline hover:no-underline focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 rounded-sm"
                  style={{ textDecoration: 'none' }}
                >
                  <CardContent />
                </Link>
              ) : (
                <a
                  href={item.caseStudyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block cursor-pointer no-underline hover:no-underline focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 rounded-sm"
                  style={{ textDecoration: 'none' }}
                >
                  <CardContent />
                </a>
              )
            ) : (
              <CardContent />
            )}
          </div>
        )
      })}
    </div>
  )
}

