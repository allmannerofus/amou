'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import portfolioData from '../lib/portfolio.json'

interface PortfolioItem {
  id: string
  src: string
  alt: string
  title: string
  client: string
  metatags: string[]
  aspectRatio?: 'portrait' | 'square' | 'landscape' | 'wide' | 'ultra-wide'
  hidden?: boolean
  featured?: boolean
  caseStudyUrl?: string
}

interface PortfolioOrganicProps {
  featuredOnly?: boolean
  limit?: number
}

export function PortfolioOrganic({ featuredOnly = false, limit }: PortfolioOrganicProps) {
  const [visibleItems, setVisibleItems] = useState<PortfolioItem[]>([])
  const [imageDimensions, setImageDimensions] = useState<Map<string, { width: number; height: number }>>(new Map())
  const itemRefs = useRef<Map<string, HTMLDivElement>>(new Map())
  const imageRefs = useRef<Map<string, HTMLImageElement>>(new Map())

  useEffect(() => {
    // Filter items
    let filtered = (portfolioData as PortfolioItem[]).filter(item => !item.hidden)
    
    if (featuredOnly) {
      filtered = filtered.filter(item => item.featured)
    }
    
    // Shuffle the array for random order (Fisher-Yates algorithm)
    const shuffled = [...filtered]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    
    // Limit if specified
    if (limit) {
      filtered = shuffled.slice(0, limit)
    } else {
      filtered = shuffled
    }
    
    setVisibleItems(filtered)
    
    // Preload first 6 images
    const preloadImages = filtered.slice(0, 6)
    preloadImages.forEach((item) => {
      const img = new Image()
      img.src = item.src
    })
  }, [featuredOnly, limit])

  // Handle image load to get dimensions (but don't reveal - let intersection observer handle that)
  useEffect(() => {
    const handleImageLoad = (itemId: string, img: HTMLImageElement) => {
      // Store dimensions only if not already set
      if (img.naturalWidth && img.naturalHeight) {
        setImageDimensions(prev => {
          if (prev.has(itemId)) {
            return prev // Already set, don't update
          }
          const next = new Map(prev)
          next.set(itemId, {
            width: img.naturalWidth,
            height: img.naturalHeight
          })
          return next
        })
      }
    }

    // Attach load handlers to all images
    imageRefs.current.forEach((img, itemId) => {
      if (img.complete && img.naturalWidth && img.naturalHeight) {
        handleImageLoad(itemId, img)
      } else {
        const loadHandler = () => handleImageLoad(itemId, img)
        img.addEventListener('load', loadHandler, { once: true })
      }
    })

    return () => {
      // Cleanup is handled by { once: true }
    }
  }, [visibleItems])


  // Determine grid column span based on actual image dimensions or aspect ratio
  const getColumnSpan = (item: PortfolioItem, index: number) => {
    // Use aspect ratio if explicitly set
    if (item.aspectRatio === 'wide' || item.aspectRatio === 'ultra-wide') {
      return 'md:col-span-2'
    }
    
    // Use actual image dimensions if available
    const dimensions = imageDimensions.get(item.id)
    if (dimensions) {
      const aspectRatio = dimensions.width / dimensions.height
      // Wide images (landscape, wider than 1.4:1) should span 2 columns
      // This catches landscape/wide images naturally
      if (aspectRatio > 1.4) {
        return 'md:col-span-2'
      }
    }
    
    // Fallback: Create varied pattern using item ID hash for consistency
    // This ensures the same item always gets the same span, but creates variety
    const idHash = parseInt(item.id) || index
    const hashValue = (idHash * 7 + index * 13) % 10
    
    // About 25% of items span 2 columns, creating visual variety
    if (hashValue < 2.5) {
      return 'md:col-span-2'
    }
    
    return 'md:col-span-1'
  }

  const PortfolioCard = ({ item, index }: { item: PortfolioItem; index: number }) => {
    const [isVisible, setIsVisible] = useState(false)
    const columnSpan = getColumnSpan(item, index)
    const observerRef = useRef<IntersectionObserver | null>(null)
    const cardRef = useRef<HTMLDivElement | null>(null)

    // Set up intersection observer
    useEffect(() => {
      const element = cardRef.current
      if (!element) return

      // Check if already in viewport on mount
      const checkViewport = () => {
        const rect = element.getBoundingClientRect()
        const isInViewport = rect.top < window.innerHeight + 200 && rect.bottom > -100
        
        if (isInViewport) {
          setIsVisible(true)
          return true
        }
        return false
      }

      // Check immediately
      if (checkViewport()) {
        return
      }

      // Set up observer for items not in viewport
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsVisible(true)
              if (observerRef.current) {
                observerRef.current.unobserve(entry.target)
              }
            }
          })
        },
        {
          threshold: 0.1,
          rootMargin: '100px 0px 0px 0px',
        }
      )

      observer.observe(element)
      observerRef.current = observer

      return () => {
        if (observerRef.current && element) {
          observerRef.current.unobserve(element)
        }
      }
    }, [])

    return (
      <div
        ref={(el) => {
          if (el) {
            itemRefs.current.set(item.id, el)
            cardRef.current = el
          }
        }}
        data-item-id={item.id}
        className={`col-span-1 ${columnSpan}`}
      >
        <div className="flex flex-col gap-[4px]">
          <div className="relative w-full overflow-hidden group">
            <img
              ref={(el) => {
                if (el) imageRefs.current.set(item.id, el)
              }}
              src={item.src}
              alt={item.alt}
              className="w-full h-auto object-contain"
              style={{
                opacity: 1,
                filter: isVisible ? 'blur(0px)' : 'blur(20px)',
                transition: 'filter 0.7s ease-out',
              }}
              loading={index < 6 ? "eager" : "lazy"}
              decoding="async"
              fetchPriority={index < 6 ? "high" : "low"}
            />
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
          </div>
          
          <div className="flex flex-col gap-[4px]">
            <div className="flex flex-col md:flex-row gap-[6px] md:gap-[10px] items-start">
              <p className="font-instrument-serif text-base md:text-lg uppercase leading-[1.5] tracking-[0.2052px]" style={{ color: 'var(--text)' }}>
                {item.title}
              </p>
              <p className="font-vt323 text-base uppercase" style={{ color: 'var(--text-tertiary)' }}>
                {item.client}
              </p>
            </div>
            <p className="font-vt323 text-base capitalize mt-[-2px]" style={{ color: 'var(--text-tertiary)' }}>
              {item.metatags?.join(', ')}
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {visibleItems.map((item, index) => (
        <PortfolioCard key={item.id} item={item} index={index} />
      ))}
    </div>
  )
}

