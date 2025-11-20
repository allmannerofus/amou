'use client'

import { Logo } from './logo'
import { useEffect, useState, useRef } from 'react'

interface CaseStudyHeroProps {
  title: string
  client?: string
  roles?: string[]
  description?: string
  collaborators?: string[]
  featuredImage?: { src: string; alt: string }
  textVisible?: boolean
}

export function CaseStudyHero({ title, client, roles, description, collaborators, featuredImage, textVisible = false }: CaseStudyHeroProps) {
  const [logoVisible, setLogoVisible] = useState(false)
  const heroContentRef = useRef<HTMLDivElement>(null)
  const isInitialMountRef = useRef(true)

  // Force visibility with !important when state changes
  useEffect(() => {
    if (textVisible && heroContentRef.current) {
      heroContentRef.current.style.setProperty('opacity', '1', 'important')
    }
  }, [textVisible])

  useEffect(() => {
    // Reset logo visibility when title changes (navigation)
    setLogoVisible(false)
    
    if (isInitialMountRef.current) {
      isInitialMountRef.current = false
      // Initial load - use animation
      const timer = setTimeout(() => {
        setLogoVisible(true)
      }, 100)
      return () => clearTimeout(timer)
    } else {
      // Navigation - make visible immediately
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setLogoVisible(true)
        })
      })
    }
  }, [title]) // Reset when title changes

  // Helper function to convert to title case
  const toTitleCase = (str: string) => {
    return str.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    })
  }

  return (
    <section className="border-b border-transparent pb-[20px] md:pb-[34px] pt-[60px] md:pt-[100px] px-8 md:px-20" data-page-transition="hero-section">
      <div className="flex flex-col md:flex-row gap-8 md:gap-[60px] lg:gap-[132px] items-start">
        {/* Logo - Hidden on tablet, shown on desktop */}
        <div 
          className="hidden lg:flex items-center justify-end min-h-[44px]" 
          data-page-transition="hero-logo"
          style={{
            opacity: logoVisible ? 1 : 0,
            transform: logoVisible ? 'translateX(0)' : 'translateX(-100px)',
            transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
          }}
        >
          <Logo size="lg" className="w-10 h-10" />
        </div>
        
        {/* Hero Content - Two Column Layout on Desktop, Single Column on Tablet/Mobile */}
        <div 
          ref={heroContentRef}
          className="flex-1 flex flex-col lg:flex-row gap-8 lg:gap-[132px] items-start"
          style={{
            opacity: textVisible ? 1 : 0,
            transition: textVisible ? 'opacity 0.5s ease-out' : 'none',
          }}
        >
          {/* Left: Featured Image (mobile only), Client, Tags, Description, Project Credits (on tablet/mobile) */}
          <div className="flex-1 flex flex-col gap-6">
            {/* Featured Image - Mobile only, above client name */}
            {featuredImage && (
              <div className="md:hidden relative w-full overflow-hidden mb-4">
                <img
                  src={featuredImage.src}
                  alt={featuredImage.alt}
                  className="w-full h-auto object-contain"
                  loading="eager"
                />
              </div>
            )}
            {client && (
              <h2 className="font-instrument-serif text-[48px] md:text-[64px] leading-[1.1] uppercase tracking-tight" style={{ color: 'var(--text)' }}>
                {client}
              </h2>
            )}
            {roles && roles.length > 0 && (
              <p className="font-vt323 text-base capitalize leading-none -mt-3" style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-vt323), VT323, monospace' }}>
                {roles.map((role, idx) => toTitleCase(role)).join(', ')}
              </p>
            )}
            {description && (
              <p className="font-xanh-mono text-[16px] md:text-[18px] lg:text-[24px] leading-[1.5] !font-xanh-mono md:mb-8 lg:mb-0" style={{ color: 'var(--text)', fontFamily: "'Xanh Mono', monospace" }}>
                {description}
              </p>
            )}
            {/* Project Credits - On tablet/mobile, show here. On desktop, show on right */}
            {collaborators && collaborators.length > 0 && (
              <div className="lg:hidden max-w-md">
                <h2 className="font-instrument-serif text-[24px] md:text-[32px] uppercase leading-[1.3] mb-2" style={{ color: 'var(--text)' }}>
                  Project Credits
                </h2>
                <div>
                  {collaborators.map((line, idx) => (
                    <p key={idx} className="mb-1 font-vt323 text-base md:text-lg uppercase leading-none" style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-vt323), VT323, monospace' }}>{line}</p>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Project Credits - Desktop only */}
          {collaborators && collaborators.length > 0 && (
            <div className="hidden lg:block flex-1 max-w-md">
              <h2 className="font-instrument-serif text-[24px] md:text-[32px] uppercase leading-[1.3] mb-2" style={{ color: 'var(--text)' }}>
                Project Credits
              </h2>
              <div>
                {collaborators.map((line, idx) => (
                  <p key={idx} className="mb-1 font-vt323 text-base md:text-lg uppercase leading-none" style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-vt323), VT323, monospace' }}>{line}</p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

