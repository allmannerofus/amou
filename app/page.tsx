import LandingPage from './landing'
import { HomePage } from './components/home-page'

// Set to true to show the minimal landing page, false to show the full site
const WIP = false

export default function Page() {
  // If WIP is true, show the minimal landing page
  if (WIP) {
    return <LandingPage />
  }

  // Show the new home page design
  return <HomePage />
}
