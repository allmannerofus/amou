import { PortfolioCarousel } from 'app/components/portfolio-carousel'
import { Logo } from './components/logo'
import LandingPage from './landing'

// Set to true to show the minimal landing page, false to show the full site
const WIP = true

export default function Page() {
  // If WIP is true, show the minimal landing page
  if (WIP) {
    return <LandingPage />
  }

  // Otherwise show the full site
  return (
    <>
      {/* Logo positioned on far right of browser */}
      <div className="fixed top-20 right-8 z-10">
        <Logo size="lg" className="w-12 h-12" />
      </div>

      <div className="pl-20">
        {/* Hero Section */}
        <section className="mb-16 relative">
          <h1 className="text-5xl md:text-6xl font-faktum-medium tracking-tight mb-4">
            All Manner Of Us
          </h1>
          
          <h2 className="text-xs font-dm-mono mb-6" style={{color: '#6b7280'}}>
            CREATIVE STUDIO FOR THE AGENTIC WEB
          </h2>

          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mb-8">
            We are at the edge of the next wave of the internet. Yesterday's technology is already outdated, and your user interface needs to adapt to what is here today and will come tomorrow. We are the studio you need to build the new internet.
          </p>
        </section>
      </div>

      {/* Portfolio Grid - Full Width */}
      <div className="w-screen relative left-1/2 transform -translate-x-1/2">
        <section id="portfolio" className="mb-20">
          <PortfolioCarousel />
        </section>
      </div>

      {/* About Section - Full Width Content Blade */}
      <div className="w-screen relative left-1/2 transform -translate-x-1/2 py-20 bg-gray-50 dark:bg-gray-900">
        <div className="pl-20">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="md:col-span-1">
              <h2 className="text-2xl font-faktum-medium text-gray-800 dark:text-gray-400">About</h2>
            </div>
            <div className="md:col-span-4">
              <div className="max-w-2xl">
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  All Manner Of Us is a creative studio for the agentic web. We are at the edge of the next wave of the internet, building the new internet with AI, Web3, and cutting-edge design.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  Our approach is human-centric, systematic, and practical. The result is work that connects with your audience and empowers them to move forward in the rapidly evolving digital landscape.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  We have directed and produced successful campaigns for enterprises, small businesses, and artists alike. We have been just as comfortable in a room of executives at Indeed, Wistia, and HCA Healthcare as well as in a room with Academy Award and Grammy-nominated musicians and artists.
                </p>
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section - Full Width Content Blade */}
      <div className="w-screen relative left-1/2 transform -translate-x-1/2 py-20 bg-white dark:bg-black">
        <div className="pl-20">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="md:col-span-1">
              <h2 className="text-2xl font-faktum-medium text-gray-800 dark:text-gray-400">Contact</h2>
            </div>
            <div className="md:col-span-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-gray-900 dark:text-white">Email</div>
                <div className="text-gray-900 dark:text-white">
                  <a href="mailto:hi@allmannerofus.com" className="hover:underline">hi@allmannerofus.com</a>
                </div>
                <div className="text-gray-900 dark:text-white">X / Twitter</div>
                <div className="text-gray-900 dark:text-white">
                  <a href="https://x.com/allmannerofus" target="_blank" rel="noopener noreferrer" className="hover:underline">@allmannerofus</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Expertise Section - Full Width Content Blade */}
      <div className="w-screen relative left-1/2 transform -translate-x-1/2 py-20 bg-gray-50 dark:bg-gray-900">
        <div className="pl-20">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="md:col-span-1">
              <h2 className="text-2xl font-faktum-medium text-gray-800 dark:text-gray-400">Expertise</h2>
            </div>
            <div className="md:col-span-4">
              <div className="max-w-2xl">
                <div className="flex flex-wrap gap-4">
                <div className="expertise-item">Artificial Intelligence (AI)</div>
                <div className="expertise-item">App Design (Web, iOS, Android)</div>
                <div className="expertise-item">Art Direction</div>
                <div className="expertise-item">Art Curation</div>
                <div className="expertise-item">Brand Strategy & Guidelines</div>
                <div className="expertise-item">Campaign Creation</div>
                <div className="expertise-item">Consulting</div>
                <div className="expertise-item">Logo Design</div>
                <div className="expertise-item">Naming</div>
                <div className="expertise-item">Original Artwork</div>
                <div className="expertise-item">Print & Packaging</div>
                <div className="expertise-item">UX & Product Design</div>
                <div className="expertise-item">Web3 Implementation</div>
                <div className="expertise-item">Website Design</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Select Clientele Section - Full Width Content Blade */}
      <div className="w-screen relative left-1/2 transform -translate-x-1/2 py-20 bg-white dark:bg-black">
        <div className="pl-20">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="md:col-span-1">
              <h2 className="text-2xl font-faktum-medium text-gray-800 dark:text-gray-400">Select Clientele</h2>
            </div>
            <div className="md:col-span-4">
              <div className="max-w-2xl">
                <div className="flex flex-wrap gap-4">
                <div className="expertise-item">6079ai</div>
                <div className="expertise-item">Alphi.xyz</div>
                <div className="expertise-item">Capital One</div>
                <div className="expertise-item">Creative Market</div>
                <div className="expertise-item">Funsize</div>
                <div className="expertise-item">Hammock</div>
                <div className="expertise-item">HCA Healthcare</div>
                <div className="expertise-item">Independent AI Institute</div>
                <div className="expertise-item">Indeed</div>
                <div className="expertise-item">Morpheus (mor.org)</div>
                <div className="expertise-item">mUTEMATH</div>
                <div className="expertise-item">Son Lux</div>
                <div className="expertise-item">Think Agent Protocol</div>
                <div className="expertise-item">underoath</div>
                <div className="expertise-item">Universal Music</div>
                <div className="expertise-item">WeWork</div>
                <div className="expertise-item">Wire Network</div>
                <div className="expertise-item">Wistia</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* All Manner Of Friends Section - Full Width Content Blade */}
      <div className="w-screen relative left-1/2 transform -translate-x-1/2 py-20 bg-gray-50 dark:bg-gray-900">
        <div className="pl-20">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="md:col-span-1">
              <h2 className="text-2xl font-faktum-medium text-gray-800 dark:text-gray-400">All Manner Of Friends</h2>
            </div>
            <div className="md:col-span-4">
              <div className="max-w-2xl">
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  Our Community of Collaborators
                </p>
                <div className="flex flex-wrap gap-4">
                <div className="expertise-item">Moyo Oyelola</div>
                <div className="expertise-item">Jesse Brian</div>
                <div className="expertise-item">Mike Anderson</div>
                <div className="expertise-item">John Clem</div>
                <div className="expertise-item">Jonny Ashcroft</div>
                <div className="expertise-item">Phraze</div>
                <div className="expertise-item">sway molina</div>
                <div className="expertise-item">Felix Eunson</div>
                <div className="expertise-item">Elizabeth Olmstead</div>
                <div className="expertise-item">Tyler Guinn</div>
                <div className="expertise-item">Sanetra & Peter Longno</div>
                <div className="expertise-item">Forest & Pine</div>
                <div className="expertise-item">Josh Taylor</div>
                <div className="expertise-item">Lora & Eric Kelley</div>
                <div className="expertise-item">Lindsay Brandt</div>
                <div className="expertise-item">Sarah "Skar" Karlan</div>
                <div className="expertise-item">Jeremiah Warren</div>
                <div className="expertise-item">Ryan Booth</div>
                <div className="expertise-item">Eric Ryan Anderson</div>
                <div className="expertise-item">Andrew Ryan Shepherd</div>
                <div className="expertise-item">Micah Bickham</div>
                <div className="expertise-item">Casey Williams</div>
                <div className="expertise-item">Sean Washington</div>
                <div className="expertise-item">Neil Sandoz</div>
                <div className="expertise-item">Logan Samperi</div>
                <div className="expertise-item">Stellina Stampouli</div>
                <div className="expertise-item">Richard Gil</div>
                <div className="expertise-item">Micah Bell</div>
                <div className="expertise-item">Latifah Alattas</div>
                <div className="expertise-item">J.D. Reeves</div>
                <div className="expertise-item">Funsize</div>
                <div className="expertise-item">Jessica Strelioff</div>
                <div className="expertise-item">Matt Yow</div>
                <div className="expertise-item">Gerren Lamson</div>
                <div className="expertise-item">Drew Small</div>
                <div className="expertise-item">Hakeem Adewumi</div>
                <div className="expertise-item">Nate Utesch</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
