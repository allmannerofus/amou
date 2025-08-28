import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Austin, TX coordinates
    const lat = 30.2672
    const lon = -97.7431
    
    // Using OpenWeatherMap API
    const apiKey = process.env.OPENWEATHER_API_KEY
    
    if (!apiKey) {
      throw new Error('OPENWEATHER_API_KEY environment variable is not set')
    }
    

    
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`
    )
    
    if (!response.ok) {
      throw new Error('Weather API request failed')
    }
    
    const data = await response.json()
    
    // Map OpenWeatherMap conditions to our icon system
    const getIconFromWeatherCode = (code: number) => {
      if (code >= 200 && code < 300) return 'rain' // Thunderstorm
      if (code >= 300 && code < 400) return 'rain' // Drizzle
      if (code >= 500 && code < 600) return 'rain' // Rain
      if (code >= 600 && code < 700) return 'snow' // Snow
      if (code >= 700 && code < 800) return 'cloudy' // Atmosphere
      if (code === 800) return 'clear-day' // Clear
      if (code >= 801 && code < 900) return 'partly-cloudy' // Clouds
      return 'clear-day'
    }
    
    const getConditionFromWeatherCode = (code: number, description: string) => {
      if (code >= 200 && code < 300) return 'Thunderstorm'
      if (code >= 300 && code < 400) return 'Light Rain'
      if (code >= 500 && code < 600) return 'Rain'
      if (code >= 600 && code < 700) return 'Snow'
      if (code >= 700 && code < 800) return 'Foggy'
      if (code === 800) return 'Clear'
      if (code === 801) return 'Partly Cloudy'
      if (code === 802) return 'Partly Cloudy'
      if (code >= 803 && code < 900) return 'Cloudy'
      return description
    }
    
    return NextResponse.json({
      temperature: Math.round(data.main.temp),
      condition: getConditionFromWeatherCode(data.weather[0].id, data.weather[0].main),
      icon: getIconFromWeatherCode(data.weather[0].id)
    })
    
  } catch (error) {
    console.error('Weather API error:', error)
    
    // Return fallback data
    return NextResponse.json({
      temperature: null,
      condition: 'Close To The Clouds',
      icon: 'partly-cloudy'
    })
  }
}
