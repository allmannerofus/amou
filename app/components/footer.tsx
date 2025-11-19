'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Logo } from './logo'
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

// Inline Weather Widget for footer
function WeatherWidgetInline() {
  const [weather, setWeather] = useState<{ condition: string; temperature: number | null } | null>(null)

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch('/api/weather')
        if (response.ok) {
          const data = await response.json()
          setWeather(data)
        } else {
          setWeather({ condition: 'Close To The Clouds', temperature: null })
        }
      } catch (error) {
        setWeather({ condition: 'Close To The Clouds', temperature: null })
      }
    }
    fetchWeather()
    const interval = setInterval(fetchWeather, 30 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  if (!weather) return <span className="inline">Close To The Clouds</span>
  
  return (
    <span className="inline">
      {weather.condition}{weather.temperature ? ` and ${weather.temperature}°F` : ''}
    </span>
  )
}

// Inline LastFM Scrobbler for footer
function LastFmScrobblerInline() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [track, setTrack] = useState<{ name: string; artist: string; image?: string } | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const fetchTrack = async () => {
      try {
        const response = await fetch('/api/lastfm')
        const data = await response.json()
        console.log('LastFM API Response:', JSON.stringify(data, null, 2))
        
        if (response.ok) {
          // Handle both single track object and array of tracks
          let trackData: any = null
          if (data.recenttracks?.track) {
            if (Array.isArray(data.recenttracks.track)) {
              trackData = data.recenttracks.track[0]
            } else {
              // Single track object (not an array)
              trackData = data.recenttracks.track
            }
          }
          
          if (trackData) {
            console.log('LastFM Track Data:', trackData)
            setTrack({
              name: trackData.name || 'Unknown Track',
              artist: trackData.artist?.['#text'] || trackData.artist?.name || trackData.artist || 'Unknown Artist',
              image: Array.isArray(trackData.image) 
                ? trackData.image.find((img: any) => img.size === 'large')?.['#text'] || trackData.image.find((img: any) => img.size === 'medium')?.['#text'] || trackData.image.find((img: any) => img.size === 'small')?.['#text']
                : trackData.image
            })
            setError(null)
          } else {
            console.warn('No tracks found in LastFM response. Full response:', data)
            setError('No tracks found')
          }
        } else {
          console.error('LastFM API error:', response.status, data)
          setError(`API error: ${response.status}`)
        }
      } catch (error) {
        console.error('Error fetching LastFM:', error)
        setError('Failed to fetch')
      }
    }
    fetchTrack()
    const interval = setInterval(fetchTrack, 30000)
    return () => clearInterval(interval)
  }, [])

  if (!track && !error) {
    return <div className="text-xs opacity-50">Loading...</div>
  }

  if (error) {
    console.error('LastFM Error:', error)
    return null
  }

  if (!track) return null

  const textColor = mounted && resolvedTheme === 'dark' ? '#FEFCF4' : '#0E0F12'

  if (!mounted) {
    return null
  }

  return (
    <div className="flex flex-col gap-[9px] items-center">
      <div 
        className="flex flex-col gap-[5px] items-center text-[14px] text-center tracking-[0.4px] uppercase leading-[1.1] whitespace-pre" 
        style={{ 
          color: textColor,
          fontFamily: "'VT323', 'Courier New', Courier, monospace"
        }}
      >
        <p className="relative shrink-0" style={{ color: textColor, fontFamily: "'VT323', 'Courier New', Courier, monospace" }}>{track.name}</p>
        <p className="relative shrink-0" style={{ color: textColor, fontFamily: "'VT323', 'Courier New', Courier, monospace" }}>{track.artist}</p>
      </div>
      {track.image && (
        <div className="w-[64px] h-[64px] relative">
          <img 
            src={track.image} 
            alt={`${track.artist} - ${track.name}`} 
            className="w-full h-full object-cover rounded" 
          />
        </div>
      )}
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="pt-[80px]" style={{ backgroundColor: 'var(--background)', color: 'var(--text)' }}>
      {/* Contact Section */}
      <section className="border-b border-transparent pb-[34px] pt-[100px] px-8 md:px-20">
        <div className="flex flex-col gap-[80px] items-center">
          <div className="flex items-center justify-end min-h-[44px]">
            <Logo size="lg" className="w-10 h-10" />
          </div>
          <div className="flex flex-col gap-[10px] items-center">
            <p className="font-xanh-mono text-[22px] md:text-[24px] leading-[1.5] text-center max-w-[613px]" style={{ color: 'var(--text)' }}>
              For all work inquires:
            </p>
            <Link
              href="mailto:zach@allmannerofus.com"
              className="inline-block group relative gradient-text-hover-link"
              style={{ color: 'var(--text)' }}
            >
              <span className="font-vt323 text-base md:text-lg uppercase leading-[1.5] text-center">
                zach@allmannerofus.com
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Weather & Music Section */}
      <div className="flex items-center justify-center pt-[60px] px-8 md:px-20 pb-[60px]">
        <div className="flex flex-col gap-[9px] items-center">
          <p className="font-instrument-serif text-[24px] md:text-[28px] leading-[1.3] text-center max-w-[312px]" style={{ color: 'var(--text-tertiary)' }}>
            The studio is <WeatherWidgetInline />, and we've been&nbsp;spinning:
          </p>
          <div className="flex flex-col gap-[9px] items-center">
            <LastFmScrobblerInline />
          </div>
        </div>
      </div>

      {/* Footer Bottom - Mobile */}
      <div className="flex flex-col md:hidden items-center px-8 py-[30px] gap-4">
        {/* 1. Social Links */}
        <div className="flex gap-[15.385px] items-center justify-center">
          <Link href="https://x.com/allmannerofus" target="_blank" rel="noopener noreferrer" className="h-5 w-[22.126px] hover:opacity-70 transition-opacity">
            <Image src="/X-Twitter.svg" alt="X/Twitter" width={22} height={20} className="w-full h-full" />
          </Link>
          <Link href="https://linkedin.com/company/allmannerofus" target="_blank" rel="noopener noreferrer" className="w-5 h-5 hover:opacity-70 transition-opacity">
            <Image src="/LinkedIn.svg" alt="LinkedIn" width={20} height={20} className="w-full h-full" />
          </Link>
          <Link href="https://instagram.com/allmannerofus" target="_blank" rel="noopener noreferrer" className="w-5 h-5 hover:opacity-70 transition-opacity">
            <Image src="/Instagram.svg" alt="Instagram" width={20} height={20} className="w-full h-full" />
          </Link>
        </div>
        
        {/* 2. all welcome. all ways. */}
        <p className="font-instrument-serif text-[14px] uppercase leading-[1.5] text-center" style={{ color: 'var(--text)' }}>
          all welcome. all ways.
        </p>
        
        {/* 3. all manner of us. */}
        <p className="font-instrument-serif text-[14px] uppercase leading-[1.5] text-center" style={{ color: 'var(--text)' }}>
          all manner of us.
        </p>
        
        {/* 4. Copyright */}
        <p className="font-vt323 text-[12px] uppercase leading-[1.5] tracking-[0.4px] text-center" style={{ color: 'var(--text)' }}>
          © {new Date().getFullYear()} all rights reserved. all wrongs restored.
        </p>
        
        {/* 5. you're ever seen. */}
        <p className="font-vt323 text-[12px] uppercase leading-[1.5] text-center tracking-[0.4px]" style={{ color: 'var(--text)' }}>
          you're ever seen.
        </p>
      </div>

      {/* Footer Bottom - Desktop */}
      <div className="hidden md:flex flex-row items-start justify-between px-8 md:px-20 py-[30px] gap-0">
        <div className="flex flex-col gap-[20px] w-[275px] items-start">
          <p className="font-instrument-serif text-[14px] uppercase leading-[1.5]" style={{ color: 'var(--text)' }}>
            all welcome. all ways.
          </p>
          <p className="font-vt323 text-[12px] uppercase leading-[1.5] tracking-[0.4px] text-left" style={{ color: 'var(--text)' }}>
            © {new Date().getFullYear()} all rights reserved. all wrongs restored.
          </p>
        </div>
        
        <div className="flex flex-col gap-[20px] items-center justify-center w-[251px]">
          <div className="flex gap-[15.385px] items-center justify-center">
            <Link href="https://x.com/allmannerofus" target="_blank" rel="noopener noreferrer" className="h-5 w-[22.126px] hover:opacity-70 transition-opacity">
              <Image src="/X-Twitter.svg" alt="X/Twitter" width={22} height={20} className="w-full h-full" />
            </Link>
            <Link href="https://linkedin.com/company/allmannerofus" target="_blank" rel="noopener noreferrer" className="w-5 h-5 hover:opacity-70 transition-opacity">
              <Image src="/LinkedIn.svg" alt="LinkedIn" width={20} height={20} className="w-full h-full" />
            </Link>
            <Link href="https://instagram.com/allmannerofus" target="_blank" rel="noopener noreferrer" className="w-5 h-5 hover:opacity-70 transition-opacity">
              <Image src="/Instagram.svg" alt="Instagram" width={20} height={20} className="w-full h-full" />
            </Link>
          </div>
        </div>
        
        <div className="flex flex-col gap-[20px] items-end w-[275px]">
          <p className="font-instrument-serif text-[14px] uppercase leading-[1.5]" style={{ color: 'var(--text)' }}>
            all manner of us.
          </p>
          <p className="font-vt323 text-[12px] uppercase leading-[1.5] text-right tracking-[0.4px]" style={{ color: 'var(--text)' }}>
            you're ever seen.
          </p>
        </div>
      </div>

      {/* Gradient Bar */}
      <div className="gradient-bar h-[8px] w-full" />
    </footer>
  )
}
