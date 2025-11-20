'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Logo } from './logo'
import { PortfolioOrganic } from './portfolio-organic'
import { useTheme } from 'next-themes'
import { useEffect, useState, useMemo } from 'react'

// Client logo mapping: [clientName, blackLogoFile, whiteLogoFile]
const clientLogos: Array<[string, string, string]> = [
  ['Morpheus', 'Morpheus-Black.svg', 'Morpheus-White.svg'],
  ['indeed', 'Indeed-Black.svg', 'Indeed-White.svg'],
  ['think agents', 'Think-Black.svg', 'Think-White.svg'],
  ['Son Lux', 'son-lux-black.svg', 'son-lux-white.svg'],
  ['Lemburg House', 'Lemburg-House-Black.svg', 'Lemburg-House-White.svg'],
  ['HCA Healthcare', 'HCA-Black.svg', 'HCA-White.svg'],
  ['Hammock', 'Hammock-Black.svg', 'Hammock-White.svg'],
  ['6079ai', '6079ai-Black.svg', '6079ai-White.svg'],
  ['EMI', 'EMI-Black.svg', 'EMI-white.svg'],
  ['Funsize', 'Funsize-black.svg', 'Funsize-White.svg'],
  ['IAI', 'IAI-Black.svg', 'IAI-White.svg'],
  ['Mindful Monkz', 'Mindful-Monkz-Black.svg', 'Mindful-Monkz-White.svg'],
  ['Oakwood Public Market', 'Oakwood-Public-Market-Blue.svg', 'Oakwood-Public-Market-White.svg'],
  ['PayPal', 'PayPal-Black.svg', 'PayPal-White.svg'],
  ['WeWork', 'WeWork-Black.svg', 'WeWork-White.svg'],
  ['Zagat', 'Zagat-Black.svg', 'Zagat-White.svg'],
]

// Shuffle function using Fisher-Yates algorithm
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

const services = [
  {
    number: '01',
    title: 'Brand Identity',
    description: 'Visual identity systems that act as a representation of your brand'
  },
  {
    number: '02',
    title: 'Digital Products',
    description: 'Interfaces that feel human and work beautifully on any device'
  },
  {
    number: '03',
    title: 'Web Design & Development',
    description: 'Websites crafted and built with care, precision, and soul'
  },
  {
    number: '04',
    title: 'Art Direction',
    description: 'Creative vision that guides every detail of your project'
  }
]


export function HomePage() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [logoVisible, setLogoVisible] = useState(false)
  const [textVisible, setTextVisible] = useState(false)
  const [contentVisible, setContentVisible] = useState(false)

  // Shuffle logos once on mount
  const shuffledLogos = useMemo(() => shuffleArray(clientLogos), [])

  useEffect(() => {
    setMounted(true)
    
    // Logo slides in first
    const logoTimer = setTimeout(() => {
      setLogoVisible(true)
    }, 100)

    // Text fades in after logo
    const textTimer = setTimeout(() => {
      setTextVisible(true)
    }, 400)

    // Content sections fade in after text
    const contentTimer = setTimeout(() => {
      setContentVisible(true)
    }, 700)

    return () => {
      clearTimeout(logoTimer)
      clearTimeout(textTimer)
      clearTimeout(contentTimer)
    }
  }, [])

  const whatWeDoBg = mounted && resolvedTheme === 'dark' ? '#454594' : '#A4A4F1'
  const whatWeDoText = mounted && resolvedTheme === 'dark' ? '#FEFCF4' : '#0E0F12'

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)', color: 'var(--text)' }} data-page="home">

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
              A collaborative design studio that helps entrepreneurs, startups, and businesses build the future through thoughtful design and execution.
            </p>
            <Link
              href="mailto:zach@allmannerofus.com?subject=Let's work together"
              className="inline-block"
            >
              <span className="font-vt323 text-base md:text-lg uppercase leading-[1.5] gradient-text-hover-link relative inline-block" style={{ color: 'var(--text)' }}>
                Let's work together →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Client Showcase */}
      <section 
        className="pt-[20px] md:pt-[60px] pb-[60px] px-8 md:px-20"
        style={{
          opacity: contentVisible ? 1 : 0,
          transition: 'opacity 0.5s ease-out',
        }}
      >
        <div className="flex flex-col gap-[56px] items-center">
          <div className="flex flex-col gap-[10px] items-start w-full">
            <h3 className="font-vt323 text-[16px] uppercase leading-[50px] opacity-80" style={{ color: 'var(--text)' }}>
              A few of our favorite clients
            </h3>
            <div className="client-scroll-container">
              <div className="client-scroll-content">
                {/* First set of clients */}
                {shuffledLogos.map(([clientName, blackLogo, whiteLogo], index) => {
                  const logoSrc = mounted && resolvedTheme === 'dark' 
                    ? `/client-logos/${whiteLogo}` 
                    : `/client-logos/${blackLogo}`
                  
                  return (
                    <div
                      key={`first-${index}`}
                      className="client-item flex items-center justify-center"
                      style={{
                        marginRight: '40px',
                        height: '40px',
                        width: '120px',
                      }}
                    >
                      {mounted ? (
                        <Image
                          src={logoSrc}
                          alt={clientName}
                          width={120}
                          height={40}
                          className="client-logo-image"
                          style={{
                            maxHeight: '40px',
                            maxWidth: '120px',
                            width: 'auto',
                            height: 'auto',
                            objectFit: 'contain',
                          }}
                        />
                      ) : (
                        <div style={{ width: '120px', height: '40px' }} />
                      )}
                    </div>
                  )
                })}
                {/* Duplicate set for seamless loop */}
                {shuffledLogos.map(([clientName, blackLogo, whiteLogo], index) => {
                  const logoSrc = mounted && resolvedTheme === 'dark' 
                    ? `/client-logos/${whiteLogo}` 
                    : `/client-logos/${blackLogo}`
                  
                  return (
                    <div
                      key={`second-${index}`}
                      className="client-item flex items-center justify-center"
                      style={{
                        marginRight: '40px',
                        height: '40px',
                        width: '120px',
                      }}
                    >
                      {mounted ? (
                        <Image
                          src={logoSrc}
                          alt={clientName}
                          width={120}
                          height={40}
                          className="client-logo-image"
                          style={{
                            maxHeight: '40px',
                            maxWidth: '120px',
                            width: 'auto',
                            height: 'auto',
                            objectFit: 'contain',
                          }}
                        />
                      ) : (
                        <div style={{ width: '120px', height: '40px' }} />
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Showcase */}
      <section 
        className="py-[60px] md:py-[80px] px-8 md:px-20"
        style={{
          opacity: contentVisible ? 1 : 0,
          transition: 'opacity 0.5s ease-out',
        }}
      >
        <PortfolioOrganic featuredOnly={true} />
        
        <div className="mt-[60px] md:mt-[80px]">
          <Link
            href="/portfolio"
            className="flex items-center justify-center h-[34px] px-[15px] py-[5px] font-vt323 text-base md:text-lg uppercase leading-[1.5] transition-colors w-full gradient-border-button"
          >
            View more work
          </Link>
        </div>
      </section>

      {/* What We Do Section */}
      <section 
        className="py-[60px] md:py-[80px] px-8 md:px-20" 
        style={{ 
          backgroundColor: whatWeDoBg,
          opacity: contentVisible ? 1 : 0,
          transition: 'opacity 0.5s ease-out',
        }}
      >
        <div className="flex flex-col gap-[50px] md:gap-[76px]">
          <div className="flex flex-col gap-[10px] opacity-80">
            <h2 className="font-instrument-serif text-[48px] md:text-[96px] leading-[48px] md:leading-[96px] uppercase" style={{ color: whatWeDoText }}>
              What We Do
            </h2>
            <p className="font-xanh-mono text-[20px] md:text-[24px] leading-[1.5] max-w-[662px]" style={{ color: whatWeDoText }}>
              We dream up, design, and ship brands, websites, and software applications that connect with your audience and empower them to move.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[40px] md:gap-[96px]">
            {services.map((service, index) => (
              <div key={index} className="flex gap-[20px] md:gap-[24px] items-start opacity-80">
                <div className="h-[56px] md:h-[72px] opacity-20">
                  <p className="font-vt323 text-[56px] md:text-[72px] leading-[56px] md:leading-[72px] tracking-[0.123px]" style={{ color: whatWeDoText }}>
                    {service.number}
                  </p>
                </div>
                <div className="flex flex-col gap-[10px] md:gap-[12px] pt-[4px] md:pt-[8px]">
                  <h4 className="font-xanh-mono text-[24px] md:text-[30px] leading-[28px] md:leading-[36px] uppercase tracking-[-0.3545px]" style={{ color: whatWeDoText }}>
                    {service.title}
                  </h4>
                  <p className="font-instrument-sans text-[14px] md:text-[16px] leading-[24px] md:leading-[28px] opacity-60" style={{ color: whatWeDoText }}>
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


    </div>
  )
}

