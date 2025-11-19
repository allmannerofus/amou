'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState, useRef } from 'react'

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [displayChildren, setDisplayChildren] = useState(children)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const previousPathname = useRef(pathname)
  const pendingChildrenRef = useRef<React.ReactNode>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Only transition if pathname actually changed
    if (previousPathname.current !== pathname) {
      const container = containerRef.current
      
      // Store the new children but don't display them yet
      pendingChildrenRef.current = children
      
      if (container) {
        const currentPage = container.querySelector('[data-page]')
        const heroLogo = container.querySelector('[data-page-transition="hero-logo"]')
        const heroSection = container.querySelector('[data-page-transition="hero-section"]')
        
        if (currentPage && heroLogo) {
          // Step 1: Fade out images/content sections first (they appeared last at 700ms)
          // Find all sections except the hero section
          const allSections = currentPage.querySelectorAll('section')
          const contentSections: HTMLElement[] = []
          
          allSections.forEach((section) => {
            if (section !== heroSection) {
              contentSections.push(section as HTMLElement)
            }
          })
          
          // Also check for portfolio grid or other content containers
          const portfolioGrid = currentPage.querySelector('[data-page-transition="portfolio-grid"]')
          if (portfolioGrid) {
            contentSections.push(portfolioGrid as HTMLElement)
          }
          
          // Fade out content sections immediately
          contentSections.forEach((section) => {
            section.style.transition = 'opacity 0.4s ease-out'
            section.style.opacity = '0'
          })
          
          // Step 2: Fade out hero text/content (appeared at 400ms)
          setTimeout(() => {
            if (heroSection) {
              // Find the hero content div (the one with text, not the logo container)
              const heroContent = Array.from(heroSection.querySelectorAll('.flex.flex-col')).find(
                (el) => !el.closest('[data-page-transition="hero-logo"]')
              ) as HTMLElement | undefined
              
              if (heroContent) {
                heroContent.style.transition = 'opacity 0.4s ease-out'
                heroContent.style.opacity = '0'
              }
            }
          }, 100)
          
          // Step 3: Fade out logo last while moving right to left (appeared first at 100ms)
          setTimeout(() => {
            if (heroLogo) {
              ;(heroLogo as HTMLElement).style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out'
              ;(heroLogo as HTMLElement).style.opacity = '0'
              ;(heroLogo as HTMLElement).style.transform = 'translateX(-200px)'
            }
          }, 300)
          
          // After all animations complete, swap content
          setTimeout(() => {
            setDisplayChildren(pendingChildrenRef.current)
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                setIsTransitioning(false)
              })
            })
          }, 800)
        } else {
          // Fallback to normal transition if no hero elements found
          setIsTransitioning(true)
          setTimeout(() => {
            setDisplayChildren(pendingChildrenRef.current)
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                setIsTransitioning(false)
              })
            })
          }, 150)
        }
      } else {
        // Fallback if no container
        setIsTransitioning(true)
        setTimeout(() => {
          setDisplayChildren(pendingChildrenRef.current)
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              setIsTransitioning(false)
            })
          })
        }, 150)
      }

      previousPathname.current = pathname
    } else {
      // Pathname didn't change, update children without transition
      setDisplayChildren(children)
      pendingChildrenRef.current = null
    }
  }, [pathname, children])

  return (
    <div
      ref={containerRef}
      className="transition-opacity duration-150 ease-in-out"
      style={{
        opacity: isTransitioning ? 0 : 1,
      }}
    >
      {displayChildren}
    </div>
  )
}

