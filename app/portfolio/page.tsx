import { Metadata } from 'next'
import { PortfolioMasonry } from '../components/portfolio-masonry'

export const metadata: Metadata = {
  title: 'Portfolio — All Manner Of Us',
  description: 'Explore our portfolio featuring AI/Web3 projects, creative campaigns, and corporate design solutions. Including work for THINK Agents, 6079, Mindful Monkz, and other innovative brands.',
  openGraph: {
    title: 'Portfolio — All Manner Of Us',
    description: 'Explore our portfolio featuring AI/Web3 projects, creative campaigns, and corporate design solutions. Including work for THINK Agents, 6079, Mindful Monkz, and other innovative brands.',
    type: 'website',
  },
}

export default function PortfolioPage() {
  return (
    <div className="w-screen px-8 md:px-20 py-12">
      <PortfolioMasonry />
    </div>
  )
}

