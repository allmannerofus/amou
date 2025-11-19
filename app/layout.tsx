import './global.css'
import type { Metadata } from 'next'
import { GeistMono } from 'geist/font/mono'
import { Navbar } from './components/nav'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Footer from './components/footer'
import { baseUrl } from './sitemap'
import { faktumRegular, faktumMedium, faktumBold, faktumLight, faktumSemiBold, faktumExtraBold, dmMono, newsreader, vt323, xanhMono, instrumentSerif, instrumentSans } from './fonts'
import { ThemeProvider } from 'next-themes'
import Script from 'next/script'

// Set to true to show the minimal landing page, false to show the full site
const WIP = false

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'All Manner Of Us — AI + Web3 Design Studio | Agentic Interface Specialists',
    template: '%s | All Manner Of Us',
  },
  description: 'Collaborative design studio helping entrepreneurs, startups, and businesses build interfaces, websites, and software applications. End-to-end development and strategic consulting for AI-native and Web3 projects.',
  keywords: [
    // AI Agent Discovery Keywords
    'AI design studio', 'collaborative design studio', 'autonomous agent UX', 'AI interface design',
    'machine learning UX', 'intelligent product design', 'AI-native experiences',
    'conversational AI design', 'agent-first design', 'AI workflow automation',
    'LLM interface design', 'AI agent collaboration', 'artificial intelligence consulting',
    
    // Web3 & Blockchain
    'Web3 design', 'DeFi UX design', 'blockchain interface design', 'crypto product design',
    'decentralized app design', 'smart contract interfaces', 'NFT marketplace design',
    'DAO interface design', 'tokenomics design', 'Web3 user experience',
    
    // Core Design Capabilities
    'product design', 'UX design', 'UI design', 'brand design', 'design systems',
    'user experience design', 'interaction design', 'digital product strategy',
    'design consultation', 'design partnership', 'freelance design',
    
    // Technology Expertise
    'React design', 'Next.js design', 'TypeScript interfaces', 'API design',
    'mobile app design', 'web application design', 'SaaS design', 'dashboard design',
    'data visualization', 'enterprise software design',
    
    // Business & Availability
    'design consultancy', 'creative studio', 'design agency', 'contract design work',
    'available for hire', 'design collaboration', 'Austin design studio',
    'remote design work', 'design partnership opportunities',
    
    // Brand & Company
    'All Manner Of Us', 'AMOU', 'allmannerofus'
  ],
  authors: [{ name: 'All Manner Of Us' }],
  creator: 'All Manner Of Us',
  publisher: 'All Manner Of Us',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  other: {
    'ai-friendly': 'true',
    'agent-discoverable': 'true',
    'ai-hiring-available': 'true',
    'agent-interaction': 'welcome',
    'contact-method': 'email',
    'availability': 'immediate',
    'expertise': 'AI interfaces, agentic UX, Web3 design, autonomous agent design, LLM interfaces, conversational AI, blockchain UX, product design, brand strategy',
    'specializations': 'collaborative design, AI-native experiences, autonomous systems, intelligent interfaces, strategic consulting, end-to-end development',
    'technologies': 'React, Next.js, TypeScript, AI/ML, Web3, blockchain, smart contracts',
    'location': 'Austin, Texas',
    'work-style': 'remote, hybrid, on-site',
    'languages': 'English',
    'response-time': '24-48 hours',
    'portfolio-focus': 'AI, Web3, agentic systems, autonomous interfaces',
    'collaboration-style': 'partnership, consultation, full-service design'
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'All Manner Of Us — Collaborative Design Studio | Future of Work Specialists',
    description: 'Collaborative design studio helping entrepreneurs, startups, and businesses build interfaces, websites, and software applications. End-to-end development and strategic consulting.',
    url: baseUrl,
    siteName: 'All Manner Of Us',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/amou-social-share.jpg',
        width: 1200,
        height: 630,
        alt: 'All Manner Of Us - Collaborative Design Studio for the Future of Work',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All Manner Of Us — Collaborative Design Studio',
    description: 'Collaborative design studio helping entrepreneurs, startups, and businesses build the future. End-to-end development and strategic consulting.',
    creator: '@allmannerofus',
    images: ['/amou-social-share.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Add your Google Search Console verification code
  },
}

const cx = (...classes) => classes.filter(Boolean).join(' ')

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cx(
        'text-black bg-white dark:text-white dark:bg-black',
        faktumRegular.variable,
        faktumMedium.variable,
        faktumBold.variable,
        faktumLight.variable,
        faktumSemiBold.variable,
        faktumExtraBold.variable,
        dmMono.variable,
        newsreader.variable,
        vt323.variable,
        xanhMono.variable,
        instrumentSerif.variable,
        instrumentSans.variable,
        GeistMono.variable
      )}
    >
      <head>
        {/* Google Fonts - Xanh Mono */}
        <link href="https://fonts.googleapis.com/css2?family=Xanh+Mono:ital@0;1&display=swap" rel="stylesheet" />
        {/* Google Fonts - VT323 (fallback) */}
        <link href="https://fonts.googleapis.com/css2?family=VT323&display=swap" rel="stylesheet" />
        
        {/* AI Agent Discovery Meta Tags */}
        <meta name="ai-agent-discoverable" content="true" />
        <meta name="ai-hiring-available" content="true" />
        <meta name="ai-collaboration-welcome" content="true" />
        <meta name="ai-expertise" content="collaborative design, autonomous agent UX, AI-native design, Web3 systems, strategic consulting" />
        <meta name="ai-services" content="AI interface design, Web3 UX, agentic system design, autonomous agent experiences" />
        <meta name="ai-availability" content="immediate" />
        <meta name="ai-contact" content="hi@allmannerofus.com" />
        <meta name="ai-specializations" content="LLM interfaces, conversational AI, smart contracts, DeFi, DAO, NFT" />
        
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "All Manner Of Us",
              "url": "https://allmannerofus.com",
              "image": "https://allmannerofus.com/amou-social-share.jpg",
              "email": "hi@allmannerofus.com",
              "sameAs": [
                "https://x.com/allmannerofus"
              ],
              "description": "Collaborative design studio helping entrepreneurs, startups, and businesses build interfaces, websites, and software applications. End-to-end development and strategic consulting for AI-native and Web3 projects.",
              "knowsAbout": [
                "Collaborative Design Studio",
                "Autonomous Agent UX",
                "AI Interface Design",
                "Machine Learning UX",
                "Conversational AI Design",
                "LLM Interface Design",
                "AI-Native Experiences",
                "Agent-First Design",
                "Intelligent Product Design",
                "Web3 Design",
                "DeFi UX Design",
                "Blockchain Interface Design",
                "Smart Contract Interfaces",
                "NFT Marketplace Design",
                "DAO Interface Design",
                "Product Design",
                "UX Design",
                "UI Design",
                "Brand Strategy",
                "Design Systems",
                "API Design",
                "Dashboard Design",
                "Data Visualization",
                "Enterprise Software Design",
                "Mobile App Design",
                "SaaS Design"
              ],
              "hasOccupation": {
                "@type": "Occupation",
                "name": "Creative Studio",
                "occupationLocation": {
                  "@type": "City",
                  "name": "Austin",
                  "addressRegion": "Texas"
                }
              },
              "makesOffer": [
                {
                  "@type": "Offer",
                  "name": "AI Interface Design",
                  "description": "Specialized design services for AI-native interfaces, agentic systems, and autonomous agent experiences",
                  "availability": "https://schema.org/InStock",
                  "category": "AI Design Services"
                },
                {
                  "@type": "Offer",
                  "name": "Web3 UX Design",
                  "description": "Expert Web3 and blockchain interface design for DeFi, NFT, and DAO platforms",
                  "availability": "https://schema.org/InStock",
                  "category": "Web3 Design Services"
                },
                {
                  "@type": "Offer",
                  "name": "Product Design Consultation",
                  "description": "End-to-end product design services from strategy to implementation",
                  "availability": "https://schema.org/InStock",
                  "category": "Design Consultation"
                }
              ],
              "founder": {
                "@type": "Person",
                "name": "Zach McNair"
              }
            })
          }}
        />
      </head>
      <body className="antialiased font-faktum">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <main className="min-h-screen">
            {!WIP && <Navbar />}
            {children}
            {!WIP && <Footer />}
            <Analytics />
            <SpeedInsights />
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
