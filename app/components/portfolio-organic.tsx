'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
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
  projectId?: string
  category?: string
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
      
      // Step 1: Group by projectId (or fall back to client if projectId is not set)
      // and randomly select one item per project
      const projectGroups = new Map<string, PortfolioItem[]>()
      filtered.forEach(item => {
        const projectKey = item.projectId || item.client.toLowerCase().replace(/[^a-z0-9]/g, '-')
        if (!projectGroups.has(projectKey)) {
          projectGroups.set(projectKey, [])
        }
        projectGroups.get(projectKey)!.push(item)
      })
      
      // Randomly select one item from each project group
      const onePerProject = Array.from(projectGroups.values()).map(items => {
        return items[Math.floor(Math.random() * items.length)]
      })
      
      // Step 2: Prioritize getting one item per category, then resolve client conflicts
      // Priority categories: music, hospitality, ai, game, brand, web3
      const priorityCategories = ['music', 'hospitality', 'ai', 'game', 'brand', 'web3']
      const categoryGroups = new Map<string, PortfolioItem[]>()
      
      onePerProject.forEach(item => {
        if (item.category && priorityCategories.includes(item.category)) {
          if (!categoryGroups.has(item.category)) {
            categoryGroups.set(item.category, [])
          }
          categoryGroups.get(item.category)!.push(item)
        }
      })
      
      // Try to select one item per category, prioritizing items from clients not yet used
      const selected: PortfolioItem[] = []
      const usedClients = new Set<string>()
      const selectedCategories = new Set<string>()
      
      // First pass: for each category, try to find an item from an unused client
      priorityCategories.forEach(category => {
        const items = categoryGroups.get(category) || []
        if (items.length === 0) return
        
        // Try to find an item from an unused client
        const available = items.filter(item => !usedClients.has(item.client.toLowerCase()))
        const itemToAdd = available.length > 0 
          ? available[Math.floor(Math.random() * available.length)]
          : items[Math.floor(Math.random() * items.length)] // Fallback: use any item from this category
        
        selected.push(itemToAdd)
        usedClients.add(itemToAdd.client.toLowerCase())
        selectedCategories.add(category)
      })
      
      // Step 3: Resolve any remaining client conflicts
      // If a client appears multiple times, keep one item per client (prioritize keeping unique categories)
      const clientGroups = new Map<string, PortfolioItem[]>()
      selected.forEach(item => {
        const clientKey = item.client.toLowerCase()
        if (!clientGroups.has(clientKey)) {
          clientGroups.set(clientKey, [])
        }
        clientGroups.get(clientKey)!.push(item)
      })
      
      // First, collect all categories from items that don't have conflicts (single-item clients)
      const categoriesFromOtherClients = new Set<string>()
      clientGroups.forEach((items, clientKey) => {
        if (items.length === 1) {
          categoriesFromOtherClients.add(items[0].category || '')
        }
      })
      
      const resolved: PortfolioItem[] = []
      const finalUsedClients = new Set<string>()
      const finalCategories = new Set<string>()
      
      // Process single-item clients first
      clientGroups.forEach((items, clientKey) => {
        if (items.length === 1) {
          resolved.push(items[0])
          finalUsedClients.add(clientKey)
          finalCategories.add(items[0].category || '')
        }
      })
      
      // Then process clients with conflicts, prioritizing items that add new categories
      clientGroups.forEach((items, clientKey) => {
        if (items.length > 1) {
          // Find the item that adds a category not already represented
          let bestItem = items.find(item => !categoriesFromOtherClients.has(item.category || '')) || items[0]
          
          // If multiple items would add new categories, prefer one not in finalCategories
          for (const item of items) {
            if (!categoriesFromOtherClients.has(item.category || '') && !finalCategories.has(item.category || '')) {
              bestItem = item
              break
            }
          }
          
          resolved.push(bestItem)
          finalUsedClients.add(clientKey)
          finalCategories.add(bestItem.category || '')
        }
      })
      
      // Try to fill any missing categories from remaining items
      // Look at ALL items from projects, not just the selected ones
      const missingCategories = priorityCategories.filter(cat => !finalCategories.has(cat))
      if (missingCategories.length > 0 && resolved.length < 6) {
        // Get all items from all projects (before the one-per-project selection)
        const allProjectItems: PortfolioItem[] = []
        projectGroups.forEach((items) => {
          allProjectItems.push(...items)
        })
        
        const remainingItems = allProjectItems.filter(item => 
          item.category && 
          missingCategories.includes(item.category) &&
          !finalUsedClients.has(item.client.toLowerCase())
        )
        
        // Group by category and add one per missing category
        const remainingByCategory = new Map<string, PortfolioItem[]>()
        remainingItems.forEach(item => {
          if (!remainingByCategory.has(item.category!)) {
            remainingByCategory.set(item.category!, [])
          }
          remainingByCategory.get(item.category!)!.push(item)
        })
        
        missingCategories.forEach(category => {
          if (resolved.length >= 6) return
          const items = remainingByCategory.get(category) || []
          if (items.length > 0) {
            const selected = items[Math.floor(Math.random() * items.length)]
            resolved.push(selected)
            finalUsedClients.add(selected.client.toLowerCase())
            finalCategories.add(category)
          }
        })
      }
      
      filtered = resolved
      
      // Shuffle the final array for random order (Fisher-Yates algorithm)
      const shuffled = [...filtered]
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
      }
      
      // Limit to 6 items maximum on home page
      filtered = shuffled.slice(0, 6)
    } else {
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

    const cardContent = (
      <div className="flex flex-col gap-[4px] group">
        <div className="relative w-full overflow-hidden">
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
          {/* Dim overlay */}
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
          {/* View Case Study button - only show if caseStudyUrl exists */}
          {item.caseStudyUrl && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="px-[15px] py-[5px] rounded-[2px] font-vt323 text-base md:text-lg uppercase leading-[1.5] transition-colors gradient-border-button">
                {item.caseStudyUrl.startsWith('/') ? 'VIEW CASE STUDY' : 'VIEW LIVE SITE'}
              </div>
            </div>
          )}
        </div>
        
        <div className="flex flex-col gap-[4px]">
          <div className="flex flex-col md:flex-row gap-[6px] md:gap-[10px] items-start">
            <p className="font-instrument-serif text-base md:text-lg uppercase leading-[1.5] tracking-[0.2052px] no-underline" style={{ color: 'var(--text)' }}>
              {item.title}
            </p>
            <p className="font-vt323 text-base uppercase no-underline" style={{ color: 'var(--text-tertiary)' }}>
              {item.client}
            </p>
          </div>
          <p className="font-vt323 text-base capitalize mt-[-2px] no-underline" style={{ color: 'var(--text-tertiary)' }}>
            {item.metatags?.join(', ')}
          </p>
        </div>
      </div>
    )

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
        {item.caseStudyUrl ? (
          <Link 
            href={item.caseStudyUrl}
            className="block cursor-pointer no-underline hover:no-underline focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 rounded-sm"
            style={{ textDecoration: 'none' }}
          >
            {cardContent}
          </Link>
        ) : (
          cardContent
        )}
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

