'use client'

import Image from 'next/image'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

interface WordmarkLogoProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function Logo({ size = 'md', className = '' }: LogoProps) {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  }

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className={`${sizeClasses[size]} ${className}`} style={{ backgroundColor: 'var(--background)' }} />
    )
  }

  // Determine which logo to use based on theme
  const logoSrc = resolvedTheme === 'dark' ? '/logo-dark-mode.svg' : '/logo-light-mode.svg'

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <Image
        src={logoSrc}
        alt="All Manner Of Us Logo"
        width={32}
        height={32}
        className="w-full h-full transition-colors duration-200"
      />
    </div>
  )
}

export function WordmarkLogo({ size = 'md', className = '' }: WordmarkLogoProps) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const sizeClasses = {
    sm: 'w-24 h-6',
    md: 'w-32 h-8',
    lg: 'w-40 h-10'
  }

  // Use custom className if provided, otherwise use sizeClasses
  const containerClasses = className ? className : sizeClasses[size]

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className={containerClasses} style={{ backgroundColor: 'var(--background)' }} />
    )
  }

  // Determine which logo to use based on theme
  const logoSrc = resolvedTheme === 'dark' ? '/logo-wordmark-dark-mode.svg' : '/logo-wordmark-light-mode.svg'

  return (
    <div className={containerClasses}>
      <img
        src={logoSrc}
        alt="All Manner Of Us"
        className="h-full w-auto transition-colors duration-200"
      />
    </div>
  )
} 