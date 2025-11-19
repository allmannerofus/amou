'use client'

import { useEffect, useState, useRef, useCallback } from 'react'

interface PortfolioImage {
  id: string
  src: string
  alt: string
  title: string
  aspectRatio?: 'portrait' | 'landscape' | 'square' | 'wide' // Fallback if auto-detection fails
}


// AMOU portfolio images (updated with new portfolio folder)
const portfolioImages: PortfolioImage[] = [
  {
    id: '1',
    src: '/portfolio/6079-Dashboard.png',
    alt: '6079 - Dashboard',
    title: '6079',
  },
  {
    id: '2',
    src: '/portfolio/6079-home.png',
    alt: '6079 - Home Interface',
    title: '6079',
  },
  {
    id: '3',
    src: '/portfolio/6079-nodeshifter.png',
    alt: '6079 - NodeShifter',
    title: '6079',
  },
  {
    id: '36',
    src: '/portfolio/6079-404.jpg',
    alt: '6079 - 404',
    title: '6079',
  },
  {
    id: '37',
    src: '/portfolio/6079-Navigation.png',
    alt: '6079 - Navigation',
    title: '6079',
  },
  {
    id: '4',
    src: '/portfolio/think-agents.png',
    alt: 'THINK Agents - AI Platform',
    title: 'THINK Agents',
  },
  {
    id: '5',
    src: '/portfolio/think-agents-ai-dashboard.png',
    alt: 'THINK Agents - AI Dashboard',
    title: 'THINK Agents',
  },
  {
    id: '6',
    src: '/portfolio/think-agents-claim.png',
    alt: 'THINK Agents - Claim',
    title: 'THINK Agents',
  },
  {
    id: '8',
    src: '/portfolio/thinkagents-ai-products-thinkubator.png',
    alt: 'THINK Agents - Thinkubator Products',
    title: 'THINK Agents',
  },
  {
    id: '9',
    src: '/portfolio/think-agents-token-claimed.png',
    alt: 'THINK Agents - Token',
    title: 'THINK Agents',
  },
  {
    id: '10',
    src: '/portfolio/think-agents-token-claimed-2.png',
    alt: 'THINK Agents - Token 2',
    title: 'THINK Agents',
  },
  {
    id: '11',
    src: '/portfolio/SOULS-1c.jpg',
    alt: 'Souls - Collection 1',
    title: 'Souls',
  },
  {
    id: '12',
    src: '/portfolio/SOULS-2c.jpg',
    alt: 'Souls - Collection 2',
    title: 'Souls',
  },
  {
    id: '13',
    src: '/portfolio/SOULS-3c.jpg',
    alt: 'Souls - Collection 3',
    title: 'Souls',
  },
  {
    id: '39',
    src: '/portfolio/SOULS-Marcom-Home.jpg',
    alt: 'Souls Marcom',
    title: 'Souls',
  },
  {
    id: '38',
    src: '/portfolio/monkz-xyz-studio.png',
    alt: 'Mindful Monkz Studio',
    title: 'Mindful Monkz',
  },
  {
    id: '15',
    src: '/portfolio/ThinkOS-Browser-Landing.png',
    alt: 'ThinkOS Browser',
    title: 'ThinkOS',
  },
  {
    id: '16',
    src: '/portfolio/ThinkOS-Extension.png',
    alt: 'ThinkOS Extension',
    title: 'ThinkOS',
  },
  {
    id: '17',
    src: '/portfolio/ThinkOS-Extension-2.png',
    alt: 'ThinkOS Extension 2',
    title: 'ThinkOS',
  },
  {
    id: '18',
    src: '/portfolio/wire-network.png',
    alt: 'Wire Network',
    title: 'Wire Network',
  },
  {
    id: '19',
    src: '/portfolio/iai.png',
    alt: 'IAI',
    title: 'IAI',
  },
  {
    id: '20',
    src: '/portfolio/mor-swap.png',
    alt: 'MOR Swap',
    title: 'MOR Swap',
  },
  {
    id: '21',
    src: '/portfolio/indeed.png',
    alt: 'Indeed',
    title: 'Indeed',
  },
  {
    id: '22',
    src: '/portfolio/HCA.png',
    alt: 'HCA Healthcare',
    title: 'HCA Healthcare',
  },
  {
    id: '23',
    src: '/portfolio/underoath.png',
    alt: 'Underoath',
    title: 'Underoath',
  },
  {
    id: '24',
    src: '/portfolio/son-lux.png',
    alt: 'Son Lux',
    title: 'Son Lux',
  },
  {
    id: '25',
    src: '/portfolio/wistia-talking-too-loud.png',
    alt: 'Wistia',
    title: 'Wistia',
  },
  {
    id: '26',
    src: '/portfolio/wistia-talking-loud-web.webp',
    alt: 'Wistia Web',
    title: 'Wistia',
  },
  {
    id: '28',
    src: '/portfolio/avaere.png',
    alt: 'Avaere',
    title: 'Avaere',
  },
  {
    id: '29',
    src: '/portfolio/w-co.jpeg',
    alt: 'W-Co',
    title: 'W-Co',
  },
  {
    id: '30',
    src: '/portfolio/lemburg-house.jpeg',
    alt: 'Lemburg House',
    title: 'Lemburg House',
  },
  {
    id: '31',
    src: '/portfolio/janes-dine-inn.avif',
    alt: 'Jane\'s Dine Inn',
    title: 'Jane\'s Dine Inn',
  },
  {
    id: '32',
    src: '/portfolio/hammock-litv.webp',
    alt: 'Hammock',
    title: 'Hammock',
  },
  {
    id: '33',
    src: '/portfolio/mutemath-playdead.webp',
    alt: 'Mutemath',
    title: 'Mutemath',
  },
  {
    id: '34',
    src: '/portfolio/creative-market-video.webp',
    alt: 'Creative Market',
    title: 'Creative Market',
  },
  {
    id: '35',
    src: '/portfolio/oakwood-public-market.webp',
    alt: 'Oakwood Public Market',
    title: 'Oakwood Public Market',
  }
]

// Add IDs of images you want to hide here
const HIDDEN_IMAGE_IDS: string[] = []
// Example: '1', '5', '12'
// Add the IDs of images you want to hide

// Filter out hidden images
const visiblePortfolioImages = portfolioImages.filter(image => !HIDDEN_IMAGE_IDS.includes(image.id))

// Debug: Log which images are hidden and which are visible
console.log('Hidden image IDs:', HIDDEN_IMAGE_IDS)
console.log('Total portfolio images:', portfolioImages.length)
console.log('Visible portfolio images:', visiblePortfolioImages.length)
console.log('Hidden images:', portfolioImages.filter(image => HIDDEN_IMAGE_IDS.includes(image.id)).map(img => img.title))




export function PortfolioCarousel() {
  const [topRowImages, setTopRowImages] = useState<PortfolioImage[]>([])
  const [bottomRowImages, setBottomRowImages] = useState<PortfolioImage[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const topRowRef = useRef<HTMLDivElement>(null)
  const bottomRowRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>()

  // Create randomized rows with no duplicate images between rows
  const createRowImages = useCallback(() => {
    // Shuffle the portfolio images array using Fisher-Yates algorithm
    const shuffled = [...visiblePortfolioImages]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    
    // Split into two completely different sets - no overlap
    const half = Math.ceil(shuffled.length / 2)
    setTopRowImages(shuffled.slice(0, half)) // First half
    setBottomRowImages(shuffled.slice(half)) // Second half (completely different images)
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    createRowImages()
  }, [createRowImages])

  // JavaScript-based continuous scrolling
  useEffect(() => {
    if (!isLoaded || !topRowRef.current || !bottomRowRef.current) return

    const topRow = topRowRef.current
    const bottomRow = bottomRowRef.current
    const topScrollSpeed = 1.5 // pixels per frame for top row
    const bottomScrollSpeed = 1.125 // 25% slower than top row (1.5 * 0.75)
    let topPosition = 0
    let bottomPosition = 0

    const animate = () => {
      // Move top row left
      topPosition -= topScrollSpeed
      topRow.style.transform = `translateX(${topPosition}px)`

      // Move bottom row left (same direction but slower for visual variety)
      bottomPosition -= bottomScrollSpeed
      bottomRow.style.transform = `translateX(${bottomPosition}px)`

      // Get the total width of all images in each row
      const topImages = Array.from(topRow.children) as HTMLElement[]
      const bottomImages = Array.from(bottomRow.children) as HTMLElement[]
      
      // Calculate total width of one complete set of images
      let topRowWidth = 0
      let bottomRowWidth = 0
      
      // Only count the first set (not duplicates)
      const topSetCount = topImages.length / 2
      const bottomSetCount = bottomImages.length / 2
      
      // Get the actual gap from computed style (responsive: 12px on mobile, up to 20px on desktop)
      const topRowGap = parseInt(getComputedStyle(topRow).gap) || 20
      const bottomRowGap = parseInt(getComputedStyle(bottomRow).gap) || 20
      
      for (let i = 0; i < topSetCount; i++) {
        topRowWidth += topImages[i].offsetWidth + topRowGap
      }
      
      for (let i = 0; i < bottomSetCount; i++) {
        bottomRowWidth += bottomImages[i].offsetWidth + bottomRowGap
      }

      // Reset top row when it has scrolled one complete set width
      if (Math.abs(topPosition) >= topRowWidth) {
        topPosition = 0
        topRow.style.transform = `translateX(${topPosition}px)`
      }

      // Reset bottom row when it has scrolled one complete set width (same logic as top row)
      if (Math.abs(bottomPosition) >= bottomRowWidth) {
        bottomPosition = 0
        bottomRow.style.transform = `translateX(${bottomPosition}px)`
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isLoaded])

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading portfolio...</div>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="w-full overflow-hidden">
      {/* Top Row - Scrolls Left */}
      <div ref={topRowRef} className="flex mb-4" style={{ transform: 'translateX(0)', gap: 'clamp(12px, 4vw, 20px)' }}>
        {topRowImages.map((image) => (
          <div key={`top-${image.id}`} className="flex-shrink-0">
            <img
              src={image.src}
              alt={image.alt}
              title={image.title}
              className="portfolio-carousel-image"
              style={{ height: '288px', width: 'auto', maxWidth: 'none', display: 'block' }}
              loading="lazy"
            />
          </div>
        ))}
        {/* Duplicate for seamless loop */}
        {topRowImages.map((image) => (
          <div key={`top-duplicate-${image.id}`} className="flex-shrink-0">
            <img
              src={image.src}
              alt={image.alt}
              title={image.title}
              className="portfolio-carousel-image"
              style={{ height: '288px', width: 'auto', maxWidth: 'none', display: 'block' }}
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Bottom Row - Scrolls Left */}
      <div ref={bottomRowRef} className="flex" style={{ transform: 'translateX(0)', gap: 'clamp(12px, 4vw, 20px)' }}>
        {bottomRowImages.map((image) => (
          <div key={`bottom-${image.id}`} className="flex-shrink-0">
            <img
              src={image.src}
              alt={image.alt}
              title={image.title}
              className="portfolio-carousel-image"
              style={{ height: '288px', width: 'auto', maxWidth: 'none', display: 'block' }}
              loading="lazy"
            />
          </div>
        ))}
        {/* Duplicate for seamless loop */}
        {bottomRowImages.map((image) => (
          <div key={`bottom-duplicate-${image.id}`} className="flex-shrink-0">
            <img
              src={image.src}
              alt={image.alt}
              title={image.title}
              className="portfolio-carousel-image"
              style={{ height: '288px', width: 'auto', maxWidth: 'none', display: 'block' }}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  )
} 