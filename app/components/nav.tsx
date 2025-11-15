'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { DarkModeToggle } from './dark-mode-toggle'
import { Logo } from './logo'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { useEffect } from 'react'

export function Navbar() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Determine which wordmark to use based on theme
  const wordmarkSrc = resolvedTheme === 'dark' ? '/logo-wordmark-dark-mode.svg' : '/logo-wordmark-light-mode.svg'

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <header className="relative">
        {/* Gradient Strip at Top */}
        <div className="gradient-bar h-2 w-full"></div>
        
        <nav className="flex items-center justify-between pt-8 md:pt-[100px] pb-6 px-8 md:px-20" style={{ backgroundColor: 'var(--background)' }}>
          {/* Left side - Logo and Name */}
          <div className="flex items-center gap-4">
            {/* Desktop & Tablet: Full name + tagline (md and above) */}
            <div className="hidden md:block text-4xl md:text-5xl font-faktum-medium tracking-tight mb-4 no-underline hover:no-underline" style={{ color: 'var(--text-secondary)' }}>
              All Manner Of Us
              <div className="text-base font-faktum-regular tracking-normal mt-2" style={{ color: 'var(--text-tertiary)' }}>
                A creative studio for the future of work.
              </div>
            </div>
            
            {/* Mobile: Just the icon logo (below md) */}
            <Logo size="md" className="w-10 h-10 md:hidden" />
          </div>
          
          {/* Right side - Theme Toggle and Logo */}
          <div className="flex items-center gap-4">
            <DarkModeToggle />
            <Logo size="md" className="w-10 h-10 hidden md:block" />
          </div>
        </nav>
      </header>
    )
  }

  return (
    <header className="fixed md:relative top-0 left-0 right-0 z-50 md:z-auto">
      {/* Gradient Strip at Top */}
      <div className="gradient-bar h-2 w-full"></div>
      
      <nav className="flex items-center justify-between pt-8 md:pt-[100px] pb-6 px-8 md:px-20 relative z-50" style={{ backgroundColor: 'var(--background)' }}>
        {/* Left side - Logo and Wordmark */}
        <div className="flex items-center gap-4 md:items-center">
          {/* Desktop & Tablet: Full logo + tagline (md and above) */}
          <div className="hidden md:flex md:flex-col md:items-start md:justify-center">
            <Link href="/" className="no-underline hover:no-underline">
              <Image
                src={wordmarkSrc}
                alt="All Manner Of Us"
                width={200}
                height={48}
                className="h-12 w-auto transition-colors duration-200"
              />
            </Link>
            <div className="text-base font-faktum-regular tracking-normal mt-2" style={{ color: 'var(--text-tertiary)' }}>
              A creative studio for the future of work.
            </div>
          </div>
          
          {/* Mobile: Just the icon logo (below md) */}
          <div className="md:hidden">
            <Link href="/">
              <Logo size="md" className="w-12 h-12" />
            </Link>
          </div>
        </div>
        
        {/* Right side - Desktop Navigation and Toggle */}
        <div className="hidden md:flex items-center gap-6">
          <Link 
            href="/" 
            className={`transition-colors hover:underline ${
              pathname === '/' ? 'font-medium' : ''
            }`}
            style={{ 
              color: pathname === '/' ? 'var(--primary)' : 'var(--text-secondary)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--primary)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = pathname === '/' ? 'var(--primary)' : 'var(--text-secondary)'
            }}
          >
            About
          </Link>
          <Link 
            href="/portfolio" 
            className={`transition-colors hover:underline ${
              pathname === '/portfolio' ? 'font-medium' : ''
            }`}
            style={{ 
              color: pathname === '/portfolio' ? 'var(--primary)' : 'var(--text-secondary)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--primary)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = pathname === '/portfolio' ? 'var(--primary)' : 'var(--text-secondary)'
            }}
          >
            Portfolio
          </Link>
          <Link 
            href="mailto:hi@allmannerofus.com" 
            className="transition-colors hover:underline"
            style={{ color: 'var(--text-secondary)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--primary)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--text-secondary)'
            }}
          >
            Email
          </Link>
          <DarkModeToggle />
        </div>

        {/* Mobile - Toggle and Hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <DarkModeToggle />
          <button
            className="p-1 w-10 h-10 flex items-center justify-center relative"
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
      <div className={`md:hidden fixed inset-0 z-30 transition-opacity duration-200 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        {/* Background that drops to bottom of viewport, but starts below header */}
        <div 
          className="fixed left-0 right-0 bottom-0"
          style={{ 
            top: '80px', // Start below the header area
            backgroundColor: 'var(--background)' 
          }}
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
        
        {/* Menu items that fade in one by one */}
        <div className="fixed left-0 right-0 bottom-0 z-40 px-8 py-6 space-y-4" style={{ 
          top: isMobileMenuOpen ? 'calc(5rem + 8px)' : '5rem',
          transition: 'top 0.2s ease-out',
          pointerEvents: isMobileMenuOpen ? 'auto' : 'none'
        }}>
          <Link 
            href="/" 
            className={`block transition-colors mobile-nav-link ${
              pathname === '/' 
                ? 'font-medium cursor-default' 
                : 'cursor-pointer'
            }`}
            style={{ 
              color: pathname === '/' ? 'var(--primary)' : 'var(--text-secondary)',
              textDecoration: pathname === '/' ? 'none !important' : 'none !important',
              backgroundColor: 'transparent !important',
              outline: 'none !important',
              border: 'none !important',
              boxShadow: 'none !important',
              pointerEvents: pathname === '/' ? 'none' : 'auto',
              opacity: isMobileMenuOpen ? 1 : 0,
              transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(10px)',
              transition: 'opacity 0.4s ease-out 0.1s, transform 0.4s ease-out 0.1s'
            }}
            onClick={() => {
              // Close menu immediately
              setIsMobileMenuOpen(false)
            }}
          >
            About
          </Link>
          <Link 
            href="/portfolio" 
            className={`block transition-colors mobile-nav-link ${
              pathname === '/portfolio' 
                ? 'font-medium cursor-default' 
                : 'cursor-pointer'
            }`}
            style={{ 
              color: pathname === '/portfolio' ? 'var(--primary)' : 'var(--text-secondary)',
              textDecoration: pathname === '/portfolio' ? 'none !important' : 'none !important',
              backgroundColor: 'transparent !important',
              outline: 'none !important',
              border: 'none !important',
              boxShadow: 'none !important',
              pointerEvents: pathname === '/portfolio' ? 'none' : 'auto',
              opacity: isMobileMenuOpen ? 1 : 0,
              transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(10px)',
              transition: 'opacity 0.4s ease-out 0.2s, transform 0.4s ease-out 0.2s'
            }}
            onClick={() => {
              // Close menu immediately
              setIsMobileMenuOpen(false)
            }}
          >
            Portfolio
          </Link>
          <Link 
            href="mailto:hi@allmannerofus.com" 
            className="block transition-colors mobile-nav-link"
            style={{ 
              color: 'var(--text-secondary)',
              backgroundColor: 'transparent !important',
              outline: 'none !important',
              border: 'none !important',
              boxShadow: 'none !important',
              opacity: isMobileMenuOpen ? 1 : 0,
              transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(10px)',
              transition: 'opacity 0.4s ease-out 0.3s, transform 0.4s ease-out 0.3s'
            }}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Email
          </Link>
        </div>
      </div>
    </header>
  )
}
