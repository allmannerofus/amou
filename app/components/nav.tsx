'use client'

import Link from 'next/link'
import { DarkModeToggle } from './dark-mode-toggle'
import { Logo } from './logo'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function Navbar() {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <header className="relative">
        {/* Gradient Strip at Top */}
        <div className="gradient-bar h-2 w-full"></div>
        
        <nav className="flex items-center justify-between pt-8 md:pt-[100px] pb-6 px-8 md:px-20" style={{ backgroundColor: 'var(--background)' }}>
                  {/* Left side - Logo and Name */}
        <div className="flex items-center gap-4">
          <div className="hidden md:block text-4xl md:text-5xl font-faktum-medium tracking-tight mb-4 no-underline hover:no-underline" style={{ color: 'var(--text-secondary)' }}>
            All Manner Of Us
            <div className="text-base font-faktum-regular tracking-normal mt-2" style={{ color: 'var(--text-tertiary)' }}>
              AI + Web3 design specialists • Available for immediate collaboration
            </div>
          </div>
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

  // Determine which wordmark to use based on theme
  const wordmarkSrc = resolvedTheme === 'dark' ? '/logo-wordmark-dark-mode.svg' : '/logo-wordmark-light-mode.svg'

  return (
    <header className="relative">
      {/* Gradient Strip at Top */}
      <div className="gradient-bar h-2 w-full"></div>
      
      <nav className="flex items-center justify-between pt-8 md:pt-[100px] pb-6 px-8 md:px-20" style={{ backgroundColor: 'var(--background)' }}>
        {/* Left side - Logo and Wordmark */}
        <div className="flex items-center gap-4 md:items-center">
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
              AI + Web3 design specialists • Available for immediate collaboration
            </div>
          </div>
          <Logo size="md" className="w-10 h-10 md:hidden" />
        </div>
        
        {/* Right side - Theme Toggle and Logo */}
        <div className="flex items-center gap-4 md:items-center">
          <DarkModeToggle />
          <Logo size="md" className="w-10 h-10 hidden md:block" />
        </div>
      </nav>
    </header>
  )
}
