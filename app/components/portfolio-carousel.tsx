'use client'

import { useEffect, useState } from 'react'

interface PortfolioImage {
  id: string
  src: string
  alt: string
  title: string
  aspectRatio?: 'portrait' | 'landscape' | 'square' | 'wide' // Fallback if auto-detection fails
}

interface PortfolioImageWithDimensions extends PortfolioImage {
  naturalWidth?: number
  naturalHeight?: number
  calculatedAspectRatio?: 'portrait' | 'landscape' | 'square' | 'wide'
}

// AMOU portfolio images (updated with cropped versions)
const portfolioImages: PortfolioImage[] = [
  {
    id: '1',
    src: '/portfolio/6079ai.png',
    alt: '6079ai - Social Mission Game',
    title: '6079ai',
    aspectRatio: 'landscape'
  },
  {
    id: '2',
    src: '/portfolio/avaere.png',
    alt: 'Avære - A Filmmaker\'s Brand',
    title: 'Avære',
    aspectRatio: 'landscape'
  },
  {
    id: '3',
    src: '/portfolio/HCA.png',
    alt: 'HCA Healthcare - Humanizing Healthcare',
    title: 'HCA Healthcare',
    aspectRatio: 'landscape'
  },
  {
    id: '4',
    src: '/portfolio/iai.png',
    alt: 'Independent AI Institute',
    title: 'Independent AI Institute',
    aspectRatio: 'landscape'
  },
  {
    id: '5',
    src: '/portfolio/indeed.png',
    alt: 'Indeed - Balancing The Art & Science Of Recruiting',
    title: 'Indeed',
    aspectRatio: 'landscape'
  },
  {
    id: '6',
    src: '/portfolio/lemburg-house.jpeg',
    alt: 'Lemburg House - Building a Legacy',
    title: 'Lemburg House',
    aspectRatio: 'landscape'
  },
  {
    id: '7',
    src: '/portfolio/mor-swap.png',
    alt: 'Morpheus - MOR Token Swap',
    title: 'Morpheus',
    aspectRatio: 'landscape'
  },
  {
    id: '8',
    src: '/portfolio/son-lux.png',
    alt: 'Son Lux - Remnants',
    title: 'Son Lux',
    aspectRatio: 'landscape'
  },
  {
    id: '9',
    src: '/portfolio/think-agents-claim.png',
    alt: 'Think Agent Protocol - Claim Interface',
    title: 'Think Agent Protocol',
    aspectRatio: 'landscape'
  },
  {
    id: '10',
    src: '/portfolio/think-agents-dashboard.png',
    alt: 'Think Agent Protocol - Dashboard',
    title: 'Think Agent Protocol',
    aspectRatio: 'landscape'
  },
  {
    id: '11',
    src: '/portfolio/think-agents-thinkubator.png',
    alt: 'Think Agent Protocol - Thinkubator',
    title: 'Think Agent Protocol',
    aspectRatio: 'landscape'
  },
  {
    id: '12',
    src: '/portfolio/think-agents-token-claimed.png',
    alt: 'Think Agent Protocol - Token Claimed',
    title: 'Think Agent Protocol',
    aspectRatio: 'landscape'
  },
  {
    id: '13',
    src: '/portfolio/think-agents.png',
    alt: 'Think Agent Protocol - Main Interface',
    title: 'Think Agent Protocol',
    aspectRatio: 'landscape'
  },
  {
    id: '14',
    src: '/portfolio/underoath.png',
    alt: 'Underoath - Erase Me',
    title: 'Underoath',
    aspectRatio: 'landscape'
  },
  {
    id: '15',
    src: '/portfolio/w-co.jpeg',
    alt: 'WeWork - Community',
    title: 'WeWork',
    aspectRatio: 'landscape'
  },
  {
    id: '16',
    src: '/portfolio/wire-network.png',
    alt: 'Wire Network - Blockchain Infrastructure',
    title: 'Wire Network',
    aspectRatio: 'landscape'
  },
  {
    id: '17',
    src: '/portfolio/wistia-talking-too-loud.png',
    alt: 'Wistia - Talking Too Loud',
    title: 'Wistia',
    aspectRatio: 'landscape'
  },
  {
    id: '18',
    src: '/portfolio/wistia-ttl.png',
    alt: 'Wistia - Talking Too Loud Landing',
    title: 'Wistia',
    aspectRatio: 'landscape'
  }
]

// Calculate aspect ratio from actual image dimensions
const calculateAspectRatio = (width: number, height: number): 'portrait' | 'landscape' | 'square' | 'wide' => {
  const ratio = width / height
  
  if (ratio < 0.8) {
    return 'portrait'
  } else if (ratio > 1.5) {
    return 'wide'
  } else if (ratio > 1.1) {
    return 'landscape'
  } else if (ratio < 0.95) {
    return 'portrait'
  } else {
    return 'square'
  }
}

// Get card dimensions based on 1080x760 aspect ratio (1.42:1)
const getCardDimensions = () => {
  // Calculate width based on height to maintain 1080x760 aspect ratio
  // Mobile: height 192px (h-48) -> width = 192 * 1.42 = 272px
  // Desktop: height 288px (h-72) -> width = 288 * 1.42 = 409px
  return {
    width: 'w-[272px] md:w-[409px]', // Exact widths for 1080x760 ratio
    height: 'h-48 md:h-72' // 192px mobile, 288px desktop
  }
}



export function PortfolioCarousel() {
  const [isVisible, setIsVisible] = useState(false)
  const [imagesWithDimensions, setImagesWithDimensions] = useState<PortfolioImageWithDimensions[]>([])

  useEffect(() => {
    // Load images and get their dimensions
    const loadImageDimensions = async () => {
      const loadedImages: PortfolioImageWithDimensions[] = []
      
      for (const image of portfolioImages) {
        try {
          const img = new Image()
          
          await new Promise((resolve) => {
            img.onload = () => {
              if (img.naturalWidth > 10 && img.naturalHeight > 10) {
                const calculatedAspectRatio = calculateAspectRatio(img.naturalWidth, img.naturalHeight)
                loadedImages.push({
                  ...image,
                  naturalWidth: img.naturalWidth,
                  naturalHeight: img.naturalHeight,
                  calculatedAspectRatio
                })
              } else {
                // Fallback to manual aspect ratio if dimensions seem wrong
                loadedImages.push({
                  ...image,
                  calculatedAspectRatio: image.aspectRatio || 'landscape'
                })
              }
              resolve(true)
            }
            img.onerror = () => {
              console.error(`Failed to load image: ${image.src}`)
              // Fallback to manual aspect ratio if image fails to load
              loadedImages.push({
                ...image,
                calculatedAspectRatio: image.aspectRatio || 'landscape'
              })
              resolve(true)
            }
            
            img.src = image.src
          })
        } catch (error) {
          console.error(`Error loading image ${image.src}:`, error)
          loadedImages.push({
            ...image,
            calculatedAspectRatio: image.aspectRatio || 'landscape'
          })
        }
      }
      
      setImagesWithDimensions(loadedImages)
    }

    loadImageDimensions()
  }, [])

  useEffect(() => {
    // Trigger animation after component mounts and images are loaded
    const timer = setTimeout(() => setIsVisible(true), 500) // Increased delay to ensure images are loaded
    return () => clearTimeout(timer)
  }, [imagesWithDimensions])

  // Create independent random arrays for each row - ensure different content
  const createRowImages = (images: PortfolioImageWithDimensions[], isTopRow: boolean) => {
    if (images.length === 0) return []
    
    // Split the array into two halves
    const halfLength = Math.ceil(images.length / 2)
    
    if (isTopRow) {
      // Top row gets first half, shuffled
      const topHalf = images.slice(0, halfLength).sort(() => Math.random() - 0.5)
      return [...topHalf, ...topHalf, ...topHalf] // Triple the images for seamless loop
    } else {
      // Bottom row gets second half, shuffled
      const bottomHalf = images.slice(halfLength).sort(() => Math.random() - 0.5)
      return [...bottomHalf, ...bottomHalf, ...bottomHalf] // Triple the images for seamless loop
    }
  }

  const topRowImages = createRowImages(imagesWithDimensions, true)
  const bottomRowImages = createRowImages(imagesWithDimensions, false)

  if (imagesWithDimensions.length === 0) {
    return (
      <div className="relative overflow-visible py-8">
        <div className="flex justify-center items-center h-48">
          <div className="text-gray-500">Loading portfolio...</div>
        </div>
      </div>
    )
  }

  // Check if all images have dimensions (are loaded)
  const allImagesLoaded = imagesWithDimensions.every(img => img.naturalWidth && img.naturalHeight)
  
  if (!allImagesLoaded) {
    return (
      <div className="relative overflow-visible py-8">
        <div className="flex justify-center items-center h-48">
          <div className="text-gray-500">Loading images...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden py-8">
      {/* Top row - moves right */}
      <div className={`flex gap-4 mb-4 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex gap-4 animate-scroll-right">
          {topRowImages.map((image, index) => {
            const cardDimensions = getCardDimensions()
            return (
              <div key={`top-${index}`} className={`flex-shrink-0 ${cardDimensions.width} ${cardDimensions.height} overflow-hidden flex items-center justify-center`} style={{ backgroundColor: 'var(--background)' }}>
                <img 
                  src={image.src} 
                  alt={image.alt}
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => {
                    console.error(`Failed to load image: ${image.src}`)
                    e.currentTarget.style.display = 'none'
                  }}
                />
              </div>
            )
          })}
        </div>
      </div>

      {/* Bottom row - moves left */}
      <div className={`flex gap-4 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex gap-4 animate-scroll-left">
          {bottomRowImages.map((image, index) => {
            const cardDimensions = getCardDimensions()
            return (
              <div key={`bottom-${index}`} className={`flex-shrink-0 ${cardDimensions.width} ${cardDimensions.height} overflow-hidden flex items-center justify-center`} style={{ backgroundColor: 'var(--background)' }}>
                <img 
                  src={image.src} 
                  alt={image.alt}
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => {
                    console.error(`Failed to load image: ${image.src}`)
                    e.currentTarget.style.display = 'none'
                  }}
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
} 