import localFont from 'next/font/local'
import { DM_Mono } from 'next/font/google'
import { Newsreader } from 'next/font/google'
import { VT323 } from 'next/font/google'
import { Instrument_Serif } from 'next/font/google'
import { Instrument_Sans } from 'next/font/google'

export const faktumRegular = localFont({
  src: './content/fonts/Faktum Family/Rene Bieder - Faktum Regular.otf',
  variable: '--font-faktum-regular',
  display: 'swap',
})

export const faktumMedium = localFont({
  src: './content/fonts/Faktum Family/Rene Bieder - Faktum Medium.otf',
  variable: '--font-faktum-medium',
  display: 'swap',
})

export const faktumBold = localFont({
  src: './content/fonts/Faktum Family/Rene Bieder - Faktum Bold.otf',
  variable: '--font-faktum-bold',
  display: 'swap',
})

export const faktumLight = localFont({
  src: './content/fonts/Faktum Family/Rene Bieder - Faktum Light.otf',
  variable: '--font-faktum-light',
  display: 'swap',
})

export const faktumSemiBold = localFont({
  src: './content/fonts/Faktum Family/Rene Bieder - Faktum SemiBold.otf',
  variable: '--font-faktum-semibold',
  display: 'swap',
})

export const faktumExtraBold = localFont({
  src: './content/fonts/Faktum Family/Rene Bieder - Faktum ExtraBold.otf',
  variable: '--font-faktum-extrabold',
  display: 'swap',
})

export const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-mono',
  display: 'swap',
})

export const newsreader = Newsreader({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-newsreader',
  display: 'swap',
  style: ['normal', 'italic'],
})

export const vt323 = VT323({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-vt323',
  display: 'swap',
})

// Xanh Mono from Google Fonts
// Note: Next.js doesn't have Xanh Mono in their font list, so we'll load it via CSS
// The font will be loaded in layout.tsx via a link tag
export const xanhMono = {
  variable: '--font-xanh-mono',
  className: 'font-xanh-mono',
}

export const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-instrument-serif',
  display: 'swap',
  style: ['normal', 'italic'],
})

export const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-instrument-sans',
  display: 'swap',
}) 