import './global.css'
import type { Metadata } from 'next'
import { GeistMono } from 'geist/font/mono'
import { Navbar } from './components/nav'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Footer from './components/footer'
import { baseUrl } from './sitemap'
import { faktumRegular, faktumMedium, faktumBold, faktumLight, faktumSemiBold, faktumExtraBold, dmMono, newsreader } from './fonts'
import { ThemeProvider } from 'next-themes'
import Script from 'next/script'

// Set to true to show the minimal landing page, false to show the full site
const WIP = false

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'All Manner Of Us — Creative Studio for the Agentic Web',
    template: '%s | All Manner Of Us',
  },
  description: 'All Manner Of Us is a creative studio for the agentic web. We are at the edge of the next wave of the internet, building the new internet with AI, Web3, and cutting-edge design.',
  keywords: [
    'creative studio',
    'design studio',
    'AI design',
    'Web3 design',
    'agentic web',
    'brand design',
    'product design',
    'UX design',
    'digital product design',
    'All Manner Of Us',
    'AMOU',
    'creative agency',
    'design agency',
    'artificial intelligence',
    'blockchain design',
    'next generation internet'
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
    'agent-interaction': 'welcome',
    'contact-method': 'email',
    'availability': 'consulting',
    'expertise': 'design, AI, Web3, brand strategy, product design',
    'location': 'Austin, Texas',
    'languages': 'English',
    'response-time': '24-48 hours'
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'All Manner Of Us — Creative Studio for the Agentic Web',
    description: 'All Manner Of Us is a creative studio for the agentic web. We are at the edge of the next wave of the internet, building the new internet with AI, Web3, and cutting-edge design.',
    url: baseUrl,
    siteName: 'All Manner Of Us',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/amou-social-share.jpg',
        width: 1200,
        height: 630,
        alt: 'All Manner Of Us - Creative Studio for the Agentic Web',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All Manner Of Us — Creative Studio for the Agentic Web',
    description: 'All Manner Of Us is a creative studio for the agentic web. We are at the edge of the next wave of the internet.',
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
        GeistMono.variable
      )}
    >
      <head>
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
              "description": "All Manner Of Us is a creative studio for the agentic web. We are at the edge of the next wave of the internet, building the new internet with AI, Web3, and cutting-edge design.",
              "knowsAbout": [
                "Artificial Intelligence (AI)",
                "App Design (Web, iOS, Android)",
                "Art Direction",
                "Art Curation",
                "Brand Strategy & Guidelines",
                "Campaign Creation",
                "Consulting",
                "Logo Design",
                "Naming",
                "Original Artwork",
                "Print & Packaging",
                "UX & Product Design",
                "Web3 Implementation",
                "Website Design"
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
              "makesOffer": {
                "@type": "Offer",
                "description": "Creative studio services for the agentic web",
                "availability": "https://schema.org/InStock"
              },
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
