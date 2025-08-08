'use client'

import { useEffect, useState } from 'react'

interface Track {
  name: string
  artist: string
  album?: string
  url: string
  image?: string
  nowPlaying?: boolean
}

interface LastFmData {
  recenttracks: {
    track: Array<{
      name: string
      artist: { '#text': string }
      album: { '#text': string }
      url: string
      image: Array<{ '#text': string; size: string }>
      '@attr'?: { nowplaying: string }
    }>
  }
}

export function LastFmScrobbler() {
  const [tracks, setTracks] = useState<Track[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)

  const fetchRecentTracks = async () => {
    try {
      setError(null)
      const response = await fetch('/api/lastfm')
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data: LastFmData = await response.json()
      
      console.log('LastFM API response:', data) // Debug log
      
      if (data.recenttracks && data.recenttracks.track && data.recenttracks.track.length > 0) {
        const recentTracks = data.recenttracks.track.slice(0, 1).map(track => ({
          name: track.name,
          artist: track.artist['#text'],
          album: track.album['#text'],
          url: track.url,
          image: track.image.find(img => img.size === 'small')?.['#text'],
          nowPlaying: track['@attr']?.nowplaying === 'true'
        }))
        
        setTracks(recentTracks)
      } else {
        setError('No tracks found')
      }
    } catch (err) {
      console.error('Error fetching Last.fm data:', err)
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
      setIsUpdating(false)
    }
  }

  useEffect(() => {
    // Initial fetch
    fetchRecentTracks()

    // Set up polling every 30 seconds
    const interval = setInterval(() => {
      setIsUpdating(true)
      fetchRecentTracks()
    }, 30000) // 30 seconds

    // Cleanup interval on unmount
    return () => clearInterval(interval)
  }, [])

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded" style={{ backgroundColor: 'var(--raised)' }}></div>
        <div className="text-sm" style={{ color: 'var(--text)' }}>
          <div>Loading...</div>
          <div></div>
        </div>
      </div>
    )
  }

  // Show error state
  if (error) {
    return (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded" style={{ backgroundColor: 'var(--raised)' }}></div>
        <div className="text-sm" style={{ color: 'var(--text)' }}>
          <div>Error: {error}</div>
          <div></div>
        </div>
      </div>
    )
  }

  // Show actual track data or empty state
  if (tracks.length === 0) {
    return (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded" style={{ backgroundColor: 'var(--raised)' }}></div>
        <div className="text-sm" style={{ color: 'var(--text)' }}>
          <div>No recent tracks</div>
          <div></div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      {tracks.map((track, index) => (
        <div key={index} className="flex items-center gap-2">
          {track.image ? (
            <img 
              src={track.image} 
              alt={`${track.album} cover`}
              className="w-8 h-8 rounded object-cover"
            />
          ) : (
            <div className="w-8 h-8 rounded" style={{ backgroundColor: 'var(--raised)' }}></div>
          )}
          <div className="text-sm" style={{ color: 'var(--text)' }}>
            <div className="flex items-center gap-1">
              {track.name}
              {track.nowPlaying && (
                <span className="text-xs text-green-500 animate-pulse">●</span>
              )}
              {isUpdating && (
                <span className="text-xs opacity-50">⟳</span>
              )}
            </div>
            <div>{track.artist}</div>
          </div>
        </div>
      ))}
    </div>
  )
} 