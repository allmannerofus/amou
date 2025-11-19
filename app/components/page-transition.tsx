'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState, useRef } from 'react'

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [displayChildren, setDisplayChildren] = useState(children)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const previousPathname = useRef(pathname)

  useEffect(() => {
    // Only transition if pathname actually changed
    if (previousPathname.current !== pathname) {
      // Start fade out immediately
      setIsTransitioning(true)
      
      // After fade out completes, swap content and fade in
      const timer = setTimeout(() => {
        setDisplayChildren(children)
        // Use requestAnimationFrame to ensure DOM update happens before fade in
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setIsTransitioning(false)
          })
        })
      }, 150) // Wait for fade out to complete

      previousPathname.current = pathname

      return () => clearTimeout(timer)
    } else {
      // Pathname didn't change, update children without transition
      setDisplayChildren(children)
    }
  }, [pathname, children])

  return (
    <div
      className="transition-opacity duration-150 ease-in-out"
      style={{
        opacity: isTransitioning ? 0 : 1,
      }}
    >
      {displayChildren}
    </div>
  )
}

