import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const username = 'zachmcnair'
    const apiKey = process.env.LASTFM_API_KEY
    
    console.log('=== LastFM Debug Info ===')
    console.log('Environment:', process.env.NODE_ENV)
    console.log('LastFM API Key exists:', !!apiKey)
    console.log('LastFM API Key length:', apiKey ? apiKey.length : 0)
    console.log('LastFM API Key first 4 chars:', apiKey ? apiKey.substring(0, 4) : 'N/A')
    console.log('LastFM Username:', username)
    console.log('All env vars with LASTFM:', Object.keys(process.env).filter(key => key.includes('LASTFM')))
    console.log('========================')
    
    if (!apiKey) {
      console.log('❌ No LastFM API key found - returning empty data')
      return NextResponse.json({
        recenttracks: {
          track: []
        }
      })
    }

    console.log('✅ LastFM API key found, making request...')

    const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json&limit=3`
    
    console.log('LastFM API URL:', url.replace(apiKey, '***'))
    
    const response = await fetch(url)
    
    console.log('LastFM API Response Status:', response.status)
    
    if (!response.ok) {
      const errorText = await response.text()
      console.log('❌ LastFM API Error Response:', errorText)
      throw new Error(`Last.fm API responded with status: ${response.status}: ${errorText}`)
    }
    
    const data = await response.json()
    
    console.log('✅ LastFM API Success Response:', JSON.stringify(data, null, 2))
    
    return NextResponse.json(data)
  } catch (error) {
    console.error('❌ Error fetching Last.fm data:', error)
    return NextResponse.json({
      recenttracks: {
        track: []
      }
    })
  }
} 