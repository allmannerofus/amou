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
    // IMPORTANT: This effect only runs when pathname changes, not when children changes
    // This prevents it from running again after swap, which would affect the new page
    if (previousPathname.current !== pathname) {
      const container = containerRef.current
      
      // Check if navigating between case studies - if so, skip transition entirely
      const isCaseStudyToCaseStudy = 
        previousPathname.current?.startsWith('/case-studies/') && 
        pathname.startsWith('/case-studies/')
      
      if (isCaseStudyToCaseStudy) {
        // Skip transition for case study to case study navigation
        // Just swap immediately without any fade animations
        setDisplayChildren(children)
        previousPathname.current = pathname
        return
      }
      
      // Store the new children but don't display them yet
      // Use the children from props at the time pathname changes
      pendingChildrenRef.current = children
      
      if (container) {
        // CRITICAL: Only query the FIRST child (old page) before swap
        // After swap, the new page becomes the first child, so we must query before swap
        const currentPage = container.firstElementChild as HTMLElement
        
        if (currentPage && currentPage.hasAttribute('data-page')) {
          
          // Mark this as the "old page" so we can identify it later
          currentPage.setAttribute('data-is-old-page', 'true')
          
          // Normal flow - currentPage is the old page (first child)
          const heroLogo = currentPage.querySelector('[data-page-transition="hero-logo"]')
          const heroSection = currentPage.querySelector('[data-page-transition="hero-section"]')
          
          if (heroLogo) {
            // Step 1: Fade out images/content sections first (they appeared last at 700ms)
            // Find all sections except the hero section, but ONLY in the old page
            const allSections = currentPage.querySelectorAll('section')
            const contentSections: HTMLElement[] = []
            
            allSections.forEach((section) => {
              // Only affect sections that are children of the old page
              if (section !== heroSection && section.closest('[data-is-old-page="true"]') === currentPage) {
                contentSections.push(section as HTMLElement)
              }
            })
            
            // Also check for portfolio grid or other content containers
            const portfolioGrid = currentPage.querySelector('[data-page-transition="portfolio-grid"]')
            if (portfolioGrid && portfolioGrid.closest('[data-is-old-page="true"]') === currentPage) {
              contentSections.push(portfolioGrid as HTMLElement)
            }
            
            // Fade out content sections immediately (only old page sections)
            contentSections.forEach((section) => {
              section.style.transition = 'opacity 0.4s ease-out'
              section.style.opacity = '0'
            })
            
            // Step 2: Fade out hero text/content (appeared at 400ms)
            setTimeout(() => {
              // Double-check that currentPage is still the old page (hasn't been swapped yet)
              const stillOldPage = container.firstElementChild === currentPage && currentPage.getAttribute('data-is-old-page') === 'true'
              if (heroSection && stillOldPage) {
                // Find the hero content div (the one with text, not the logo container)
                const heroContent = Array.from(heroSection.querySelectorAll('.flex.flex-col')).find(
                  (el) => !el.closest('[data-page-transition="hero-logo"]')
                ) as HTMLElement | undefined
                
                if (heroContent && heroContent.closest('[data-is-old-page="true"]') === currentPage) {
                  heroContent.style.transition = 'opacity 0.4s ease-out'
                  heroContent.style.opacity = '0'
                }
              }
            }, 100)
            
            // Step 3: Fade out logo last while moving right to left (appeared first at 100ms)
            setTimeout(() => {
              // Double-check that currentPage is still the old page (hasn't been swapped yet)
              const stillOldPage = container.firstElementChild === currentPage && currentPage.getAttribute('data-is-old-page') === 'true'
              if (heroLogo && stillOldPage) {
                ;(heroLogo as HTMLElement).style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out'
                ;(heroLogo as HTMLElement).style.opacity = '0'
                ;(heroLogo as HTMLElement).style.transform = 'translateX(-200px)'
              }
            }, 300)
            
            // After all animations complete, swap content
            setTimeout(() => {
              setDisplayChildren(pendingChildrenRef.current)
              // Remove the old page marker after swap
              if (currentPage) {
                currentPage.removeAttribute('data-is-old-page')
              }
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
    }
    // Note: We don't update children here if pathname didn't change
    // This prevents the effect from running again after swap
  }, [pathname]) // Only depend on pathname, not children

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

