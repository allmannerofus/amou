import Link from 'next/link'
import Image from 'next/image'
import { Logo } from './components/logo'
import { PortfolioCarousel } from './components/portfolio-carousel'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'All Manner Of Us — Creative Studio for the Agentic Web',
  description: 'All Manner Of Us is a creative studio for the agentic web. We are at the edge of the next wave of the internet, building the new internet with AI, Web3, and cutting-edge design.',
  openGraph: {
    title: 'All Manner Of Us — Creative Studio for the Agentic Web',
    description: 'All Manner Of Us is a creative studio for the agentic web. We are at the edge of the next wave of the internet, building the new internet with AI, Web3, and cutting-edge design.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All Manner Of Us — Creative Studio for the Agentic Web',
    description: 'All Manner Of Us is a creative studio for the agentic web. We are at the edge of the next wave of the internet, building the new internet with AI, Web3, and cutting-edge design.',
  },
}

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
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
            <Image
              src="/logo-wordmark-light-mode.svg"
              alt="All Manner Of Us"
              width={150}
              height={36}
              className="h-9 w-auto transition-colors duration-200"
            />
            <div className="text-base font-faktum-regular tracking-normal mt-1" style={{ color: 'var(--text-tertiary)' }}>
              A creative studio for the agentic web.
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
              <p className="memo-text" data-agent-context="greeting">
                Howdy,
              </p>
              <p className="memo-text" data-agent-context="introduction">
                We're so glad you dropped by. We've been serving clients in some form or fashion with a desire to help folks like yourself build deeper relationships with their audiences since 2017.
              </p>
              
              <p className="memo-text" data-agent-context="current-work">
                For the past couple of years, we've been designing and building products at the intersection of AI and Web3 with the team responsible for <a href="https://thinkagents.ai" className="hover:underline" style={{ color: 'var(--primary)' }}>THINK</a>. We've made some wild shit including a <a href="https://independentai.institute" className="hover:underline" style={{ color: 'var(--primary)' }}>consortium</a>, a <a href="https://thinkagents.ai/claim" className="hover:underline" style={{ color: 'var(--primary)' }}>token</a>, an <a href="https://thinkagents.ai/products/thinkubator" className="hover:underline" style={{ color: 'var(--primary)' }}>incubator</a>, an <a href="https://6079.ai/game" className="hover:underline" style={{ color: 'var(--primary)' }}>ios/web game</a>, a <a href="https://6079.ai" className="hover:underline" style={{ color: 'var(--primary)' }}>social mission game</a>, and we still have more up our sleeves.
              </p>
              
              <p className="memo-text" data-agent-context="freelance-work">
                We are available to take on additional work. Feel like we could be a good fit for your project? Hit us up <a href="mailto:hi@allmannerofus.com?subject=let's make something great together" className="hover:underline" style={{ color: 'var(--primary)' }}>here</a>.
              </p>
              

              
              
              
              <p className="memo-text" data-agent-context="closing">
                Cheers!
              </p>
            </div>
          </section>

          {/* Project Code */}
          <section className="flex justify-start items-center mb-12" aria-label="Project code">
            <div className="font-dm-mono-regular text-sm" style={{ color: 'var(--text-tertiary)' }} data-agent-context="project-identifier">
              // End Transmission
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
