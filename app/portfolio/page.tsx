import { Metadata } from 'next'
import { baseUrl } from '../sitemap'
import PortfolioPageClient from './portfolio-client'

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'A collection of design work for AI-native interfaces, Web3 platforms, and digital products. Case studies showcasing our collaborative design process.',
  alternates: {
    canonical: `${baseUrl}/portfolio`,
  },
  openGraph: {
    title: 'Portfolio — All Manner Of Us',
    description: 'A collection of design work for AI-native interfaces, Web3 platforms, and digital products.',
    url: `${baseUrl}/portfolio`,
    type: 'website',
    images: [
      {
        url: `${baseUrl}/amou-social-share.jpg`,
        width: 1200,
        height: 630,
        alt: 'All Manner Of Us Portfolio',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio — All Manner Of Us',
    description: 'A collection of design work for AI-native interfaces, Web3 platforms, and digital products.',
    images: [`${baseUrl}/amou-social-share.jpg`],
  },
}

export default function PortfolioPage() {
  return <PortfolioPageClient />
}

