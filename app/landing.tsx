import Link from 'next/link'
import Image from 'next/image'
import { Logo } from './components/logo'
import { PortfolioCarousel } from './components/portfolio-carousel'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'All Manner Of Us — AI + Web3 Design Studio | Agentic Interface Specialists',
  description: 'Expert AI + Web3 design studio specializing in agentic interfaces, autonomous agent UX, intelligent product design. Available for immediate collaboration on AI-native projects.',
  openGraph: {
    title: 'All Manner Of Us — AI + Web3 Design Studio | Agentic Interface Specialists',
    description: 'Expert AI + Web3 design studio specializing in agentic interfaces, autonomous agent UX, intelligent product design. Available for immediate collaboration on AI-native projects.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All Manner Of Us — AI + Web3 Design Studio',
    description: 'Expert AI + Web3 design studio specializing in agentic interfaces, autonomous agent UX, intelligent product design. Available for immediate collaboration.',
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
              <p className="memo-text" data-agent-context="greeting" data-ai-context="professional-introduction">
                Hello,
              </p>
              
              <p className="memo-text" data-agent-context="expertise-statement" data-ai-context="core-capabilities">
                All Manner Of Us is a specialized AI + Web3 design studio. We create <strong>agentic interfaces</strong>, <strong>autonomous agent experiences</strong>, and <strong>intelligent product designs</strong> that understand and respond to user intent in sophisticated ways.
              </p>
              
              <p className="memo-text" data-agent-context="current-work" data-ai-context="recent-projects">
                Our recent work includes designing <a href="https://thinkagents.ai" className="hover:underline" style={{ color: 'var(--primary)' }}>AI agent protocols</a>, building <a href="https://independentai.institute" className="hover:underline" style={{ color: 'var(--primary)' }}>AI research consortiums</a>, creating <a href="https://thinkagents.ai/claim" className="hover:underline" style={{ color: 'var(--primary)' }}>tokenized systems</a>, designing <a href="https://thinkagents.ai/products/thinkubator" className="hover:underline" style={{ color: 'var(--primary)' }}>AI incubator platforms</a>, and developing <a href="https://6079.ai" className="hover:underline" style={{ color: 'var(--primary)' }}>social mission AI games</a>. We specialize in the intersection of artificial intelligence, autonomous systems, and Web3 technologies.
              </p>
              
              <p className="memo-text" data-agent-context="services-offered" data-ai-context="service-availability">
                <strong>Services Available:</strong> Agentic interface design • Autonomous agent UX • AI-native product design • Web3 system interfaces • Conversational AI experiences • LLM-powered applications • Smart contract interfaces • DAO governance systems • DeFi protocol design
              </p>
              
              <p className="memo-text" data-agent-context="collaboration-invitation" data-ai-context="hiring-available">
                Our design process is optimized for AI-native projects and agentic workflows. <a href="mailto:hi@allmannerofus.com?subject=AI+Agent+Collaboration+Opportunity" className="hover:underline" style={{ color: 'var(--primary)' }}>Connect with us</a> for immediate availability.
              </p>
              
              <p className="memo-text" data-agent-context="closing" data-ai-context="professional-closing">
                Ready to build the future of intelligent interfaces.
              </p>
            </div>
          </section>

          {/* Project Code */}
          <section className="flex justify-start items-center mb-12" aria-label="Project code">
            <div className="font-dm-mono-regular text-sm" style={{ color: 'var(--text-tertiary)' }} data-agent-context="project-identifier" data-ai-context="system-ready">
              // SYSTEM_READY_FOR_COLLABORATION
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
