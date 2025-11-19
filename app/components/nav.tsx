'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { DarkModeToggle } from './dark-mode-toggle'
import { WordmarkLogo } from './logo'
import { useTheme } from 'next-themes'
import { useEffect } from 'react'

export function Navbar() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <header className="sticky top-0 z-[60]" style={{ 
        background: 'linear-gradient(to bottom, rgba(254, 252, 244, 1) 0%, rgba(254, 252, 244, 1) 40%, rgba(254, 252, 244, 0.98) 50%, rgba(254, 252, 244, 0.95) 60%, rgba(254, 252, 244, 0.85) 70%, rgba(254, 252, 244, 0.7) 80%, rgba(254, 252, 244, 0.5) 85%, rgba(254, 252, 244, 0.3) 90%, rgba(254, 252, 244, 0.15) 95%, rgba(254, 252, 244, 0) 100%)',
        paddingBottom: '120px'
      }}>
        {/* Gradient Strip at Top */}
        <div className="gradient-bar h-[8px] w-full" />
        
        <nav className="flex items-center justify-between pt-[20px] pb-0 px-8 md:px-20 border-b border-transparent relative z-50">
          <Link 
            href="/" 
            className="no-underline hover:no-underline active:no-underline focus:no-underline focus:outline-none"
          >
            <WordmarkLogo className="h-[24px] md:h-[18px] lg:h-[24px] w-auto" />
          </Link>
          <div className="flex items-center gap-[20px]">
            <div className="flex items-center justify-center">
              <DarkModeToggle />
            </div>
          <Link
            href="mailto:zach@allmannerofus.com?subject=Let's work together"
            className="px-[15px] py-[5px] rounded-[2px] font-vt323 text-base md:text-lg uppercase leading-[1.5] transition-colors gradient-border-button"
          >
            Let's work together
          </Link>
          </div>
        </nav>
      </header>
    )
  }

  const bgColor = resolvedTheme === 'dark' ? '5, 6, 7' : '254, 252, 244'
  
  return (
      <header className="sticky top-0 z-[60]" style={{ 
        background: `linear-gradient(to bottom, rgba(${bgColor}, 1) 0%, rgba(${bgColor}, 1) 40%, rgba(${bgColor}, 0.98) 50%, rgba(${bgColor}, 0.95) 60%, rgba(${bgColor}, 0.85) 70%, rgba(${bgColor}, 0.7) 80%, rgba(${bgColor}, 0.5) 85%, rgba(${bgColor}, 0.3) 90%, rgba(${bgColor}, 0.15) 95%, rgba(${bgColor}, 0) 100%)`,
        paddingBottom: '120px',
        pointerEvents: 'none'
      }}>
      {/* Gradient Strip at Top */}
      <div className="gradient-bar h-[8px] w-full" />
      
      <nav className={`relative flex items-center justify-between px-8 md:px-20 border-b border-transparent transition-all duration-300 ${isScrolled ? 'pt-2 md:pt-[20px] pb-0' : 'pt-[20px] pb-0'}`} style={{ marginBottom: '-120px', zIndex: 50, pointerEvents: 'auto' }}>
        {/* Left - Brand Name */}
        <Link 
          href="/" 
          className="relative z-50 no-underline hover:no-underline active:no-underline focus:no-underline focus:outline-none"
          style={{ pointerEvents: 'auto' }}
        >
          <WordmarkLogo className="h-[24px] md:h-[18px] lg:h-[24px] w-auto" />
        </Link>
        
        {/* Center - Navigation Links (Desktop only) */}
        <div className="hidden md:flex items-center justify-evenly flex-1 relative z-50" style={{ pointerEvents: 'auto' }}>
          <Link 
            href="/portfolio" 
            className="font-vt323 text-base md:text-lg uppercase leading-[1.5] gradient-text-underline relative z-50"
            style={{ pointerEvents: 'auto' }}
          >
            Portfolio
          </Link>
          <Link 
            href="/" 
            className="font-vt323 text-base md:text-lg uppercase leading-[1.5] gradient-text-underline relative z-50"
            style={{ pointerEvents: 'auto' }}
          >
            About
          </Link>
          <Link 
            href="mailto:zach@allmannerofus.com" 
            className="font-vt323 text-base md:text-lg uppercase leading-[1.5] gradient-text-underline relative z-50"
            style={{ pointerEvents: 'auto' }}
          >
            Email
          </Link>
        </div>
        
        {/* Right - Dark Mode Toggle & CTA */}
        <div className="flex items-center gap-[20px] relative z-50">
          <div className="flex items-center justify-center">
            <DarkModeToggle />
          </div>
          <Link
            href="mailto:zach@allmannerofus.com?subject=Let's work together"
            className="hidden md:block px-[15px] py-[5px] rounded-[2px] font-vt323 text-base md:text-lg uppercase leading-[1.5] transition-colors gradient-border-button"
          >
            Let's work together
          </Link>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-1 w-10 h-10 flex items-center justify-center relative"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
            style={{ color: 'var(--text)' }}
          >
            <svg className="w-8 h-8 absolute" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ 
              opacity: isMobileMenuOpen ? 0 : 1,
              transform: isMobileMenuOpen ? 'rotate(90deg)' : 'rotate(0deg)',
              transition: 'opacity 0.3s ease-out, transform 0.3s ease-out'
            }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg className="w-8 h-8 absolute" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ 
              opacity: isMobileMenuOpen ? 1 : 0,
              transform: isMobileMenuOpen ? 'rotate(0deg)' : 'rotate(-90deg)',
              transition: 'opacity 0.3s ease-out, transform 0.3s ease-out'
            }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <>
          <div 
            className="md:hidden fixed inset-0 z-30"
            style={{ 
              top: '100px',
              backgroundColor: 'var(--background)',
              pointerEvents: 'auto'
            }}
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
          
          <div 
            className="md:hidden fixed left-0 right-0 bottom-0 z-50 px-8 py-6 space-y-4" 
            style={{ 
              top: '120px',
              pointerEvents: 'auto'
            }}
            onClick={(e) => {
              // Only close menu if clicking the background, not the links
              if (e.target === e.currentTarget) {
                setIsMobileMenuOpen(false)
              }
            }}
          >
          <Link 
            href="/portfolio" 
            className="block transition-colors mobile-nav-link font-vt323 text-lg uppercase"
            style={{
              color: pathname === '/portfolio' ? 'var(--primary)' : 'var(--text)',
              transition: 'color 0.2s',
              pointerEvents: 'auto',
              position: 'relative',
              zIndex: 60
            }}
            onMouseEnter={(e) => {
              if (pathname !== '/portfolio') {
                e.currentTarget.style.color = 'var(--primary)'
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = pathname === '/portfolio' ? 'var(--primary)' : 'var(--text)'
            }}
            onClick={(e) => {
              setIsMobileMenuOpen(false)
              // Allow the link navigation to proceed
              e.stopPropagation()
            }}
          >
            Portfolio
          </Link>
          <Link 
            href="/" 
            className="block transition-colors mobile-nav-link font-vt323 text-lg uppercase"
            style={{
              color: pathname === '/' ? 'var(--primary)' : 'var(--text)',
              transition: 'color 0.2s',
              pointerEvents: 'auto',
              position: 'relative',
              zIndex: 60
            }}
            onMouseEnter={(e) => {
              if (pathname !== '/') {
                e.currentTarget.style.color = 'var(--primary)'
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = pathname === '/' ? 'var(--primary)' : 'var(--text)'
            }}
            onClick={(e) => {
              setIsMobileMenuOpen(false)
              // Allow the link navigation to proceed
              e.stopPropagation()
            }}
          >
            About
          </Link>
          <Link 
            href="mailto:zach@allmannerofus.com" 
            className="block transition-colors mobile-nav-link font-vt323 text-lg uppercase"
            style={{
              color: 'var(--text)',
              transition: 'color 0.2s',
              pointerEvents: 'auto',
              position: 'relative',
              zIndex: 60
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--primary)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--text)'
            }}
            onClick={(e) => {
              setIsMobileMenuOpen(false)
              // Allow the link navigation to proceed
              e.stopPropagation()
            }}
          >
            Email
          </Link>
        </div>
        </>
      )}
    </header>
  )
}
