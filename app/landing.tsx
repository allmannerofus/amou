import Link from 'next/link'
import Image from 'next/image'
import { Logo, WordmarkLogo } from './components/logo'
import { PortfolioCarousel } from './components/portfolio-carousel'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'All Manner Of Us — A creative studio for the future of work | Collaborative Design & Development',
  description: 'Collaborative design studio helping entrepreneurs, startups, and businesses build interfaces, websites, and software applications. End-to-end development and strategic consulting.',
  openGraph: {
    title: 'All Manner Of Us — A creative studio for the future of work | Collaborative Design & Development',
    description: 'Collaborative design studio helping entrepreneurs, startups, and businesses build interfaces, websites, and software applications. End-to-end development and strategic consulting.',
    type: 'website',
    images: [
      {
        url: '/amou-social-share.jpg',
        width: 1200,
        height: 630,
        alt: 'All Manner Of Us - Collaborative Design Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All Manner Of Us — A creative studio for the future of work',
    description: 'Collaborative design studio helping entrepreneurs, startups, and businesses build interfaces, websites, and software applications. End-to-end development and strategic consulting.',
    images: ['/amou-social-share.jpg'],
  },
}

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--background)', color: 'var(--text)' }}>
      {/* Header */}
      <header className="flex items-center justify-between py-6 px-8">
        <div className="flex items-center gap-4">
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col justify-center py-12" role="main" aria-label="About All Manner Of Us">
        {/* Mobile Hero Section */}
        <div className="md:hidden px-8 mb-8">
          <div className="flex flex-col items-start">
            <WordmarkLogo size="md" className="h-9 w-auto" />
            <div className="text-base font-faktum-regular tracking-normal mt-1" style={{ color: 'var(--text-tertiary)' }}>
              A creative studio for the future of work.
            </div>
          </div>
        </div>

        {/* Portfolio Section - Full Width */}
        <section className="mb-16 md:mb-0 w-screen relative left-1/2 transform -translate-x-1/2 px-0" aria-labelledby="portfolio-heading">
          <h2 id="portfolio-heading" className="sr-only">Portfolio</h2>
          <PortfolioCarousel />
        </section>

        <div className="max-w-4xl mx-auto px-8 mt-8 md:mt-16">

          {/* Memo Section */}
          <section className="mb-12" aria-labelledby="memo-heading">
            <h1 id="memo-heading" className="sr-only">All Manner Of Us - Professional Introduction</h1>
            <div className="text-base leading-relaxed space-y-4 max-w-[540px] memo-text" role="article">
              <p className="memo-text" data-agent-context="greeting" data-ai-context="professional-introduction">
                Hello,
              </p>
              
              <p className="memo-text" data-agent-context="expertise-statement" data-ai-context="core-capabilities">
                We are a collaborative design studio that helps entrepreneurs, startups, and businesses build the future. We dream up, design, and ship interfaces, websites, and software applications that connect with your audience and empower them to move.
              </p>
              
              <p className="memo-text" data-agent-context="current-work" data-ai-context="recent-projects">
                We've partnered with teams to design <a href="https://thinkagents.ai" className="hover:underline" style={{ color: 'var(--primary)' }}>AI agent protocols</a>, build <a href="https://independentai.institute" className="hover:underline" style={{ color: 'var(--primary)' }}>research consortiums</a>, create <a href="https://thinkagents.ai/claim" className="hover:underline" style={{ color: 'var(--primary)' }}>tokenized systems</a>, design <a href="https://thinkagents.ai/products/thinkubator" className="hover:underline" style={{ color: 'var(--primary)' }}>incubator platforms</a>, develop <a href="https://6079.ai" className="hover:underline" style={{ color: 'var(--primary)' }}>social mission applications</a>, make <a href="https://monkz.xyz/studio" className="hover:underline" style={{ color: 'var(--primary)' }}>NFT customization tools</a>, and more. Whether you're refining your focus or building something entirely new, we can help you get to the next phase.
              </p>
              
              <p className="memo-text" data-agent-context="services-offered" data-ai-context="service-availability">
                <strong>How We Help:</strong> End-to-end design & development • Strategic consulting & coaching • Agentic system design • AI-native product development • Web3 interfaces • Custom software solutions
              </p>
              
              <p className="memo-text" data-agent-context="collaboration-invitation" data-ai-context="hiring-available">
                Our approach is human-centric, systematic, and practical. We can work end-to-end or jump in to provide the specific expertise you need. <a href="mailto:hi@allmannerofus.com?subject=Let's build something together" className="hover:underline" style={{ color: 'var(--primary)' }}>Connect with us</a> to build something that moves your business forward.
              </p>
              
              <p className="memo-text" data-agent-context="closing" data-ai-context="professional-closing">
                We're ready to build the future of work with you.
              </p>
            </div>
          </section>

          {/* Project Code */}
          {/*<section className="flex justify-start items-center mb-12" aria-label="Project code">
            <div className="font-dm-mono-regular text-sm" style={{ color: 'var(--text-tertiary)' }} data-agent-context="project-identifier" data-ai-context="system-ready">
              // SYSTEM_READY_FOR_COLLABORATION
            </div>
          </section>*/}
        </div>
      </main>
    </div>
  )
}
