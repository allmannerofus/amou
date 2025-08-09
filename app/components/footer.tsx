import Link from 'next/link'
import { WeatherWidget } from './weather'
import { LastFmScrobbler } from './lastfm'

export default function Footer() {
  return (
    <footer className="relative">
      {/* Main Footer Content */}
      <div className="py-12 pb-4 md:pb-12 px-8 md:px-20" style={{ backgroundColor: 'var(--background)' }}>
        <div className="max-w-7xl mx-auto md:max-w-none md:mx-0">
          {/* Top Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Left - Description */}
            <div>
              <p className="leading-relaxed max-w-[460px] text-base" style={{ color: 'var(--text)' }}>
                All Manner Of Us is a creative studio for the agentic web building for the next generation of digital platforms. We bridge the gap between brand and product design at the intersection of AI & Web3.
              </p>
            </div>

            {/* Right - Get In Touch */}
            <div className="md:flex md:justify-end">
              <div className="md:min-w-[240px]">
                <h2 className="text-sm font-faktum-medium mb-4" style={{ color: 'var(--text)' }}>Get In Touch</h2>
                <div className="space-y-2">
                  <a 
                    href="mailto:hi@allmannerofus.com" 
                    className="block hover:underline transition-colors text-sm"
                    style={{ color: 'var(--primary)' }}
                  >
                    hi@allmannerofus.com
                  </a>
                  <div className="flex items-center gap-4 mt-4">
                    <a href="https://x.com/allmannerofus" target="_blank" rel="noopener noreferrer" className="transition-colors hover:opacity-70" style={{ color: 'var(--text)' }}>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-4 md:mb-8">
            {/* Left - You're Ever Seen (desktop only) */}
            <div className="hidden md:flex items-end justify-start">
              <p className="italic text-2xl" style={{ fontFamily: 'var(--font-newsreader), Georgia, serif', fontWeight: 400, letterSpacing: '-0.2px', color: 'var(--text-secondary)' }}>
                You're Ever Seen™
              </p>
            </div>
            
            {/* Right - Currently Feeling */}
            <div className="flex justify-start md:justify-end">
              <div className="md:min-w-[240px]">
                <h3 className="text-sm font-faktum-medium mb-2" style={{ color: 'var(--text-tertiary)' }}>Currently Feeling</h3>
                <WeatherWidget />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* You're Ever Seen - Mobile only */}
      <div className="px-8 md:px-20 py-6 md:hidden" style={{ backgroundColor: 'var(--background)' }}>
        <div className="max-w-7xl mx-auto md:max-w-none md:mx-0">
          <p className="italic text-2xl" style={{ fontFamily: 'var(--font-newsreader), Georgia, serif', fontWeight: 400, letterSpacing: '-0.2px', color: 'var(--text-secondary)' }}>
            You're Ever Seen™
          </p>
        </div>
      </div>

      {/* Gradient Strip at Bottom */}
      <div className="gradient-bar-inverted h-2 w-full"></div>
    </footer>
  )
}
