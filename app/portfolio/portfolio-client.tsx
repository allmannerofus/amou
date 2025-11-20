'use client'

import { PortfolioOrganic } from '../components/portfolio-organic'
import { Logo } from '../components/logo'
import { useEffect, useState } from 'react'

export default function PortfolioPageClient() {
  const [logoVisible, setLogoVisible] = useState(false)
  const [textVisible, setTextVisible] = useState(false)
  const [imagesVisible, setImagesVisible] = useState(false)

  useEffect(() => {
    // Logo slides in first
    const logoTimer = setTimeout(() => {
      setLogoVisible(true)
    }, 100)

    // Text fades in after logo
    const textTimer = setTimeout(() => {
      setTextVisible(true)
    }, 400)

    // Images fade in after text
    const imagesTimer = setTimeout(() => {
      setImagesVisible(true)
    }, 700)

    return () => {
      clearTimeout(logoTimer)
      clearTimeout(textTimer)
      clearTimeout(imagesTimer)
    }
  }, [])

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)', color: 'var(--text)' }} data-page="portfolio">
      {/* Hero Section */}
      <section className="border-b border-transparent pb-[20px] md:pb-[34px] pt-[60px] md:pt-[100px] px-8 md:px-20" data-page-transition="hero-section">
        <div className="flex flex-col md:flex-row gap-8 md:gap-[60px] lg:gap-[132px] items-start">
          {/* Logo */}
          <div 
            className="hidden md:flex items-center justify-end min-h-[44px]" 
            data-page-transition="hero-logo"
            style={{
              opacity: logoVisible ? 1 : 0,
              transform: logoVisible ? 'translateX(0)' : 'translateX(-100px)',
              transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
            }}
          >
            <Logo size="lg" className="w-10 h-10" />
          </div>
          
          {/* Hero Content */}
          <div 
            className="flex flex-col gap-6 md:gap-[30px]"
            style={{
              opacity: textVisible ? 1 : 0,
              transition: 'opacity 0.5s ease-out',
            }}
          >
            <p className="font-xanh-mono text-[18px] md:text-[24px] leading-[1.5] max-w-[613px]" style={{ color: 'var(--text)' }}>
              We dream up, design, and ship interfaces, websites, and software applications that connect with your audience and empower them to move.
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <div 
        className="px-8 md:px-20 py-12"
        data-page-transition="portfolio-grid"
        style={{
          opacity: imagesVisible ? 1 : 0,
          transition: 'opacity 0.5s ease-out',
        }}
      >
        <PortfolioOrganic />
      </div>
    </div>
  )
}

