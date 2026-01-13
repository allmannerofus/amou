# Portfolio Implementation Spec for zm-site

**Source:** `/Users/zachmcnair/repos/amou`  
**Target:** `@zm-site` repository  
**Purpose:** Migrate portfolio structure, build setup, components, animations, and content from `amou` to `zm-site`

---

## Table of Contents

1. [Overview](#overview)
2. [Git Workflow & Branch Strategy](#git-workflow--branch-strategy)
3. [Data Structure](#data-structure)
4. [Component Architecture](#component-architecture)
5. [Page Structure](#page-structure)
6. [Animations & Loading States](#animations--loading-states)
7. [Styling & CSS](#styling--css)
8. [Build Setup & Dependencies](#build-setup--dependencies)
9. [File Structure](#file-structure)
10. [Implementation Steps](#implementation-steps)
11. [Testing Checklist](#testing-checklist)
12. [Deployment & Merge Process](#deployment--merge-process)

---

## Overview

The portfolio system consists of:
- **PortfolioOrganic**: Main grid component with intelligent filtering, category-based selection, and intersection observer animations
- **PortfolioCarousel**: Horizontal scrolling carousel with two rows (used on homepage)
- **PortfolioMasonry**: Masonry layout with fade-in animations (alternative layout)
- **Portfolio Data**: JSON-based portfolio items with metadata
- **Page Animations**: Staggered logo, text, and image fade-in animations
- **Responsive Design**: Mobile-first with breakpoints at md (768px) and lg (1024px)

---

## Git Workflow & Branch Strategy

### Branch Strategy

**Important:** All portfolio implementation work must be done on a feature branch, NOT on `main` or `production` branches.

**Branch Naming Convention:**
```
feature/portfolio-implementation
```

### Workflow Steps

#### 1. Create Feature Branch

```bash
# Ensure you're on main and up to date
git checkout main
git pull origin main

# Create and switch to feature branch
git checkout -b feature/portfolio-implementation

# Push branch to remote (for preview deployments)
git push -u origin feature/portfolio-implementation
```

#### 2. Development on Feature Branch

All implementation work happens on the feature branch:
- Create new files
- Modify existing files
- Commit changes incrementally
- Push to remote for preview/testing

**Commit Strategy:**
```bash
# Commit incrementally as you complete each phase
git add .
git commit -m "feat: add portfolio.json data structure"
git push origin feature/portfolio-implementation

git add .
git commit -m "feat: implement PortfolioOrganic component"
git push origin feature/portfolio-implementation

# Continue with descriptive commits...
```

**Commit Message Format:**
- `feat:` - New features
- `fix:` - Bug fixes
- `style:` - Styling changes
- `refactor:` - Code refactoring
- `test:` - Testing additions

#### 3. Preview/Testing Deployment

**Vercel/Netlify Preview:**
- Most platforms automatically create preview deployments for feature branches
- Preview URL will be available after first push
- Test thoroughly on preview URL before merging

**Manual Preview Build:**
```bash
# Build locally to test
pnpm build

# Test production build locally
pnpm start
```

**Testing Checklist (on Preview):**
- [ ] All portfolio items display correctly
- [ ] Animations work smoothly
- [ ] Responsive design works on all devices
- [ ] Case study links work
- [ ] No console errors
- [ ] Performance is acceptable
- [ ] Images load correctly
- [ ] Dark mode works (if applicable)

#### 4. Code Review (if applicable)

If using pull requests:
- Create PR from `feature/portfolio-implementation` to `main`
- Request review if needed
- Address any feedback
- Re-test on preview after changes

#### 5. Merge to Production

**Only after thorough testing on preview:**

```bash
# Ensure feature branch is up to date
git checkout feature/portfolio-implementation
git pull origin main  # Get latest from main
git rebase main       # Or merge: git merge main

# Resolve any conflicts if they exist
# Test again after resolving conflicts

# Switch to main
git checkout main

# Merge feature branch
git merge feature/portfolio-implementation

# Push to production
git push origin main
```

**Alternative: Pull Request Merge**
- If using PR workflow, merge via GitHub/GitLab UI
- Ensure "Squash and merge" or "Rebase and merge" based on team preference

#### 6. Cleanup

After successful merge to production:

```bash
# Delete local feature branch
git branch -d feature/portfolio-implementation

# Delete remote feature branch
git push origin --delete feature/portfolio-implementation
```

### Branch Protection Rules

**If branch protection is enabled:**
- Feature branch should allow direct pushes for development
- `main` branch should require:
  - Pull request approval
  - Passing CI/CD checks
  - Up-to-date with base branch

### Continuous Integration

**If CI/CD is set up:**
- Feature branch should trigger preview builds
- Main branch should trigger production builds
- Ensure all tests pass before merging

### Rollback Plan

**If issues are found after merge:**

```bash
# Revert the merge commit
git revert -m 1 <merge-commit-hash>
git push origin main

# Or create hotfix branch
git checkout -b hotfix/portfolio-rollback
# Make fixes
git checkout main
git merge hotfix/portfolio-rollback
```

### Testing Environment Checklist

Before merging to production, verify on preview:

**Functional Testing:**
- [ ] Portfolio page loads correctly
- [ ] All images display
- [ ] Links work (internal and external)
- [ ] Animations perform smoothly
- [ ] No JavaScript errors in console
- [ ] No 404 errors for images/assets

**Visual Testing:**
- [ ] Layout looks correct on mobile (320px+)
- [ ] Layout looks correct on tablet (768px+)
- [ ] Layout looks correct on desktop (1024px+)
- [ ] Dark mode works (if applicable)
- [ ] Fonts load correctly
- [ ] Colors match design system

**Performance Testing:**
- [ ] Page load time < 3 seconds
- [ ] Images lazy load correctly
- [ ] No layout shifts (CLS)
- [ ] Smooth 60fps animations
- [ ] Lighthouse score > 90

**Browser Testing:**
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

---

## Data Structure

### Portfolio Item Interface

```typescript
interface PortfolioItem {
  id: string                    // Unique identifier
  src: string                   // Image path (relative to /public)
  alt: string                   // Image alt text
  title: string                 // Project title
  client: string                // Client name
  metatags: string[]            // Array of tags (e.g., ["Product Design", "UX Design"])
  aspectRatio?: 'portrait' | 'square' | 'landscape' | 'wide' | 'ultra-wide'  // Optional
  hidden?: boolean              // Hide from display
  featured?: boolean            // Show in featured/homepage view
  caseStudyUrl?: string         // Link to case study (internal) or external URL
  projectId?: string            // Group items by project
  category?: string             // Category for filtering (e.g., "ai", "web3", "music", "hospitality", "brand", "game")
}
```

### Portfolio JSON Location

**File:** `app/lib/portfolio.json`

**Structure:** Array of PortfolioItem objects

**Example Entry:**
```json
{
  "id": "1",
  "src": "/portfolio/6079-Dashboard.png",
  "alt": "6079 - Dashboard",
  "title": "Mission Control Dashboard",
  "client": "6079 AI",
  "metatags": ["Product Design", "Dashboard Design", "UX Design"],
  "hidden": false,
  "featured": true,
  "projectId": "6079-ai-platform",
  "category": "ai",
  "caseStudyUrl": "/case-studies/6079-ai"
}
```

**Key Features:**
- Items can be grouped by `projectId`
- `featured: true` items appear on homepage
- `category` used for intelligent filtering in featured view
- `caseStudyUrl` can be internal (`/case-studies/...`) or external (`https://...`)
- `hidden: true` items are filtered out

---

## Component Architecture

### 1. PortfolioOrganic Component

**File:** `app/components/portfolio-organic.tsx`

**Purpose:** Main portfolio grid with intelligent filtering and animations

**Key Features:**
- **Featured Mode**: When `featuredOnly={true}`, intelligently selects items:
  - Groups by `projectId` (or client if no projectId)
  - Selects one item per project randomly
  - Prioritizes categories: `music`, `hospitality`, `ai`, `game`, `brand`, `web3`
  - Ensures one item per category when possible
  - Resolves client conflicts (one item per client)
  - Limits to 6 items maximum
  - Shuffles final selection
- **Full Mode**: Shows all non-hidden items, shuffled
- **Dynamic Column Spanning**: 
  - Uses actual image dimensions to determine if item should span 2 columns
  - Falls back to aspect ratio if dimensions not available
  - Creates variety with hash-based pattern (~25% span 2 columns)
- **Intersection Observer**: 
  - Blur effect on images until visible
  - Smooth fade-in on scroll
  - Preloads first 6 images
- **Hover Effects**: 
  - Dim overlay (40% black)
  - "VIEW CASE STUDY" or "VIEW LIVE SITE" button appears
  - Gradient border button styling

**Props:**
```typescript
interface PortfolioOrganicProps {
  featuredOnly?: boolean  // Default: false
  limit?: number          // Optional limit for full mode
}
```

**Grid Layout:**
- Mobile: 1 column (`grid-cols-1`)
- Tablet: 3 columns (`md:grid-cols-3`)
- Desktop: 4 columns (`lg:grid-cols-4`)
- Gap: `gap-4 md:gap-6`

**Card Structure:**
```
<div className="col-span-1 md:col-span-2"> // Dynamic span
  <Link href={caseStudyUrl}> // If caseStudyUrl exists
    <div className="flex flex-col gap-[4px] group">
      <div className="relative w-full overflow-hidden">
        <img /> // Blur effect until visible
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40" /> // Dim overlay
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="gradient-border-button">VIEW CASE STUDY</div>
        </div>
      </div>
      <div className="flex flex-col gap-[4px]">
        <p className="font-instrument-serif">{title}</p>
        <p className="font-vt323">{client}</p>
        <p className="font-vt323">{metatags.join(', ')}</p>
      </div>
    </div>
  </Link>
</div>
```

### 2. PortfolioCarousel Component

**File:** `app/components/portfolio-carousel.tsx`

**Purpose:** Horizontal scrolling carousel (used on homepage)

**Key Features:**
- Two rows of images scrolling left
- Top row: 1.5px per frame
- Bottom row: 1.125px per frame (25% slower)
- Seamless infinite loop
- Images split into two non-overlapping sets
- Duplicate sets for seamless scrolling
- Responsive gap: `clamp(12px, 4vw, 20px)`
- Fixed height: 288px
- Auto width

**Animation:**
- Uses `requestAnimationFrame` for smooth scrolling
- Resets position when one complete set width is scrolled
- Pauses on hover (via CSS)

### 3. PortfolioMasonry Component

**File:** `app/components/portfolio-masonry.tsx`

**Purpose:** Alternative masonry layout

**Key Features:**
- CSS columns layout: 1 column (mobile), 2 columns (tablet), 3 columns (desktop)
- Intersection Observer for fade-in animations
- Same hover effects as PortfolioOrganic
- Shuffled order

---

## Page Structure

### Portfolio Page Client Component

**File:** `app/portfolio/portfolio-client.tsx`

**Structure:**
```typescript
'use client'

import { PortfolioOrganic } from '../components/portfolio-organic'
import { Logo } from '../components/logo'
import { useEffect, useState } from 'react'

export default function PortfolioPageClient() {
  const [logoVisible, setLogoVisible] = useState(false)
  const [textVisible, setTextVisible] = useState(false)
  const [imagesVisible, setImagesVisible] = useState(false)

  useEffect(() => {
    // Logo slides in first (100ms delay)
    setTimeout(() => setLogoVisible(true), 100)
    // Text fades in after logo (400ms delay)
    setTimeout(() => setTextVisible(true), 400)
    // Images fade in after text (700ms delay)
    setTimeout(() => setImagesVisible(true), 700)
  }, [])

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)', color: 'var(--text)' }}>
      {/* Hero Section */}
      <section className="border-b border-transparent pb-[20px] md:pb-[34px] pt-[60px] md:pt-[100px] px-8 md:px-20">
        <div className="flex flex-col md:flex-row gap-8 md:gap-[60px] lg:gap-[132px] items-start">
          {/* Logo - slides in from left */}
          <div 
            className="hidden md:flex items-center justify-end min-h-[44px]"
            style={{
              opacity: logoVisible ? 1 : 0,
              transform: logoVisible ? 'translateX(0)' : 'translateX(-100px)',
              transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
            }}
          >
            <Logo size="lg" className="w-10 h-10" />
          </div>
          
          {/* Hero Content - fades in */}
          <div 
            className="flex flex-col gap-6 md:gap-[30px]"
            style={{
              opacity: textVisible ? 1 : 0,
              transition: 'opacity 0.5s ease-out',
            }}
          >
            <p className="font-xanh-mono text-[18px] md:text-[24px] leading-[1.5] max-w-[613px]">
              We dream up, design, and ship brands, websites, and software applications that connect with your audience and empower them to move.
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <div 
        className="px-8 md:px-20 py-12"
        style={{
          opacity: imagesVisible ? 1 : 0,
          transition: 'opacity 0.5s ease-out',
        }}
      >
        <PortfolioOrganic />
      </div>
    </div>
  )
}
```

### Portfolio Page (Server Component)

**File:** `app/portfolio/page.tsx`

```typescript
import { Metadata } from 'next'
import { baseUrl } from '../sitemap'
import PortfolioPageClient from './portfolio-client'

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'A collection of design work for AI-native interfaces, Web3 platforms, and digital products.',
  alternates: {
    canonical: `${baseUrl}/portfolio`,
  },
  openGraph: {
    title: 'Portfolio — All Manner Of Us',
    description: 'A collection of design work for AI-native interfaces, Web3 platforms, and digital products.',
    url: `${baseUrl}/portfolio`,
    type: 'website',
    images: [
      {
        url: `${baseUrl}/amou-social-share.jpg`,
        width: 1200,
        height: 630,
        alt: 'All Manner Of Us Portfolio',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio — All Manner Of Us',
    description: 'A collection of design work for AI-native interfaces, Web3 platforms, and digital products.',
    images: [`${baseUrl}/amou-social-share.jpg`],
  },
}

export default function PortfolioPage() {
  return <PortfolioPageClient />
}
```

---

## Animations & Loading States

### Page Load Animations

**Sequence:**
1. **Logo** (100ms delay): Slides in from left (`translateX(-100px)` → `translateX(0)`)
2. **Text** (400ms delay): Fades in (`opacity: 0` → `opacity: 1`)
3. **Images** (700ms delay): Fades in (`opacity: 0` → `opacity: 1`)

**Implementation:**
- Use `useState` for visibility states
- Use `useEffect` with `setTimeout` for delays
- CSS transitions: `transition: 'opacity 0.5s ease-out, transform 0.5s ease-out'`

### Image Loading Animations

**PortfolioOrganic:**
- **Blur Effect**: Images start with `filter: blur(20px)`, transition to `blur(0px)` when visible
- **Intersection Observer**: 
  - Threshold: `0.1`
  - Root margin: `100px 0px 0px 0px`
  - Checks viewport on mount for immediate visibility
- **Preloading**: First 6 images preloaded with `new Image()`

**PortfolioMasonry:**
- **Fade-in**: `opacity: 0` → `opacity: 1`
- **Slide-up**: `translateY(20px)` → `translateY(0)`
- **Duration**: `0.7s ease-out`

### Carousel Animations

**PortfolioCarousel:**
- **Continuous Scroll**: `requestAnimationFrame` loop
- **Top Row Speed**: 1.5px per frame
- **Bottom Row Speed**: 1.125px per frame (25% slower)
- **Seamless Loop**: Resets when one complete set width is scrolled
- **Pause on Hover**: CSS `animation-play-state: paused`

---

## Styling & CSS

### Required CSS Classes

**Gradient Border Button:**
```css
.gradient-border-button {
  position: relative;
  background: var(--background);
  border-radius: 2px;
  transition: background-color 0.3s ease;
  isolation: isolate;
}

.gradient-border-button::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: 2px;
  background: linear-gradient(90deg, 
    #A4A4F1 0%, 
    #E0D9C3 50%, 
    #9B9581 74%, 
    #21232B 100%);
  background-size: 200% 100%;
  animation: animate-gradient-border 8s ease-in-out infinite;
  z-index: -2;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: destination-out;
  padding: 1px;
}

.gradient-border-button::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 2px;
  background: var(--background);
  z-index: -1;
  transition: background 0.3s ease;
}

.gradient-border-button:hover {
  color: var(--background);
}

.gradient-border-button:hover::after {
  background: linear-gradient(90deg, 
    #A4A4F1 0%, 
    #E0D9C3 50%, 
    #9B9581 74%, 
    #21232B 100%);
  background-size: 200% 100%;
  animation: animate-gradient-border 8s ease-in-out infinite;
}

@keyframes animate-gradient-border {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
```

**Portfolio Carousel Image:**
```css
.portfolio-carousel-image {
  height: 288px !important;
  width: auto !important;
  max-width: none !important;
  display: block;
}
```

**Client Scroll Animation:**
```css
@keyframes scroll-left {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.client-scroll-container {
  display: flex;
  overflow: hidden;
  width: 100%;
}

.client-scroll-content {
  display: flex;
  animation: scroll-left 40s linear infinite;
  will-change: transform;
}

.client-scroll-content:hover {
  animation-play-state: paused;
}
```

### Required Fonts

**Font Families:**
- `font-instrument-serif` - For titles
- `font-vt323` - For client names and metatags
- `font-xanh-mono` - For hero text

**Font Sizes:**
- Titles: `text-base md:text-lg`
- Client names: `text-base`
- Metatags: `text-base`
- Hero text: `text-[18px] md:text-[24px]`

### CSS Variables

**Required Variables:**
```css
:root {
  --background: #FEFCF4;  /* Light mode background */
  --text: #0E0F12;        /* Light mode text */
  --text-tertiary: #718096; /* Light mode tertiary text */
}

.dark {
  --background: #050607;  /* Dark mode background */
  --text: #FEFCF4;        /* Dark mode text */
  --text-tertiary: #9B9581; /* Dark mode tertiary text */
}
```

---

## Build Setup & Dependencies

### Package Manager

**Important:** This project uses `pnpm` as the package manager, NOT `npm`.

**Installation:**
```bash
# Install dependencies
pnpm install

# Development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

### Required Dependencies

**package.json:**
```json
{
  "dependencies": {
    "next": "canary",  // or latest stable
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "typescript": "5.3.3",
    "tailwindcss": "4.0.0-alpha.13",  // or latest
    "@tailwindcss/postcss": "4.0.0-alpha.13"
  }
}
```

**Install with pnpm:**
```bash
pnpm install
```

### Tailwind Configuration

**tailwind.config.js:**
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### PostCSS Configuration

**postcss.config.js:**
```javascript
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

---

## File Structure

```
zm-site/
├── app/
│   ├── lib/
│   │   └── portfolio.json          # Portfolio data
│   ├── components/
│   │   ├── portfolio-organic.tsx   # Main grid component
│   │   ├── portfolio-carousel.tsx  # Carousel component (optional)
│   │   ├── portfolio-masonry.tsx   # Masonry component (optional)
│   │   └── logo.tsx               # Logo component (if needed)
│   ├── portfolio/
│   │   ├── page.tsx               # Server component (metadata)
│   │   └── portfolio-client.tsx   # Client component (animations)
│   └── global.css                 # Styles
├── public/
│   └── portfolio/                 # Portfolio images
│       ├── 6079-Dashboard.png
│       ├── think-agents.png
│       └── ... (all portfolio images)
├── package.json
├── tailwind.config.js
└── postcss.config.js
```

---

## Implementation Steps

### Phase 0: Branch Setup (CRITICAL - DO THIS FIRST)

**⚠️ IMPORTANT: Create feature branch before any implementation**

1. **Create and switch to feature branch**
   ```bash
   git checkout main
   git pull origin main
   git checkout -b feature/portfolio-implementation
   git push -u origin feature/portfolio-implementation
   ```

2. **Verify branch is active**
   ```bash
   git branch  # Should show * feature/portfolio-implementation
   ```

3. **Confirm preview deployment**
   - Check that preview URL is available (Vercel/Netlify/etc.)
   - Bookmark preview URL for testing

**All subsequent work happens on this feature branch.**

### Phase 1: Setup & Data

1. **Create portfolio.json**
   - Copy structure from `amou/app/lib/portfolio.json`
   - Update image paths if needed
   - Ensure all required fields are present
   - **Commit:** `git commit -m "feat: add portfolio.json data structure"`

2. **Copy portfolio images**
   - Copy all images from `amou/public/portfolio/` to `zm-site/public/portfolio/`
   - Maintain same file names
   - **Commit:** `git commit -m "feat: add portfolio images"`

3. **Install dependencies**
   - Ensure Next.js, React, TypeScript, Tailwind are installed
   - Verify Tailwind v4 alpha or latest stable
   - Install with: `pnpm install`
   - **Commit:** `git commit -m "chore: ensure dependencies are installed"`

### Phase 2: Components

4. **Create PortfolioOrganic component**
   - Copy `app/components/portfolio-organic.tsx`
   - Update import paths for portfolio.json
   - Verify TypeScript interfaces match
   - Test filtering logic
   - **Commit:** `git commit -m "feat: implement PortfolioOrganic component"`
   - **Push & Test:** `git push origin feature/portfolio-implementation` (test on preview)

5. **Create PortfolioCarousel component** (if needed)
   - Copy `app/components/portfolio-carousel.tsx`
   - Update import paths
   - **Commit:** `git commit -m "feat: implement PortfolioCarousel component"`
   - **Push & Test:** `git push origin feature/portfolio-implementation` (test on preview)

6. **Create PortfolioMasonry component** (if needed)
   - Copy `app/components/portfolio-masonry.tsx`
   - Update import paths
   - **Commit:** `git commit -m "feat: implement PortfolioMasonry component"`
   - **Push & Test:** `git push origin feature/portfolio-implementation` (test on preview)

### Phase 3: Pages

7. **Create portfolio page structure**
   - Create `app/portfolio/page.tsx` (server component)
   - Create `app/portfolio/portfolio-client.tsx` (client component)
   - Update metadata with correct baseUrl
   - **Commit:** `git commit -m "feat: create portfolio page structure"`
   - **Push & Test:** `git push origin feature/portfolio-implementation` (test on preview)

8. **Implement animations**
   - Add useState hooks for visibility states
   - Add useEffect with setTimeout delays
   - Test animation sequence
   - **Commit:** `git commit -m "feat: implement portfolio page animations"`
   - **Push & Test:** `git push origin feature/portfolio-implementation` (test on preview)

### Phase 4: Styling

9. **Add CSS classes**
   - Copy gradient-border-button styles
   - Copy portfolio-carousel-image styles
   - Copy client-scroll styles (if needed)
   - Add font utility classes
   - **Commit:** `git commit -m "style: add portfolio CSS classes and animations"`
   - **Push & Test:** `git push origin feature/portfolio-implementation` (test on preview)

10. **Add CSS variables**
    - Ensure --background, --text, --text-tertiary are defined
    - Test dark mode if applicable
    - **Commit:** `git commit -m "style: add portfolio CSS variables"`
    - **Push & Test:** `git push origin feature/portfolio-implementation` (test on preview)

11. **Verify responsive design**
    - Test mobile (1 column) on preview
    - Test tablet (3 columns) on preview
    - Test desktop (4 columns) on preview
    - **Commit any fixes:** `git commit -m "fix: adjust responsive design"`
    - **Push & Test:** `git push origin feature/portfolio-implementation` (test on preview)

### Phase 5: Integration

12. **Integrate with homepage** (if needed)
    - Add `<PortfolioOrganic featuredOnly={true} />` to homepage
    - Or add `<PortfolioCarousel />` if using carousel
    - **Commit:** `git commit -m "feat: integrate portfolio on homepage"`
    - **Push & Test:** `git push origin feature/portfolio-implementation` (test on preview)

13. **Test case study links**
    - Verify internal links work (`/case-studies/...`) on preview
    - Verify external links work (if any) on preview
    - Test hover states on preview
    - **Commit any fixes:** `git commit -m "fix: update case study links"`
    - **Push & Test:** `git push origin feature/portfolio-implementation` (test on preview)

### Phase 6: Optimization & Final Testing

14. **Image optimization**
    - Verify lazy loading works on preview
    - Check preloading of first 6 images on preview
    - Test intersection observer performance on preview
    - **Commit any fixes:** `git commit -m "perf: optimize image loading"`
    - **Push & Test:** `git push origin feature/portfolio-implementation` (test on preview)

15. **Performance testing**
    - Test with many portfolio items on preview
    - Verify smooth animations on preview
    - Check for layout shifts on preview
    - Run Lighthouse audit on preview URL
    - **Commit any fixes:** `git commit -m "perf: improve animation performance"`
    - **Push & Test:** `git push origin feature/portfolio-implementation` (test on preview)

16. **Final testing on preview**
    - Complete full testing checklist (see below)
    - Test on multiple devices/browsers
    - Verify all edge cases
    - **Only proceed to merge if all tests pass**

---

## Testing Checklist

### Functionality
- [ ] Portfolio items display correctly
- [ ] Featured mode shows 6 items max
- [ ] Featured mode prioritizes categories correctly
- [ ] Full mode shows all non-hidden items
- [ ] Hidden items are filtered out
- [ ] Case study links work (internal and external)
- [ ] Hover effects work (dim overlay, button)
- [ ] Images load with blur effect
- [ ] Intersection observer triggers correctly

### Animations
- [ ] Logo slides in from left (100ms delay)
- [ ] Text fades in (400ms delay)
- [ ] Images fade in (700ms delay)
- [ ] Image blur effect works
- [ ] Carousel scrolls smoothly (if used)
- [ ] Carousel pauses on hover (if used)

### Responsive Design
- [ ] Mobile: 1 column grid
- [ ] Tablet: 3 column grid
- [ ] Desktop: 4 column grid
- [ ] Column spanning works (wide images)
- [ ] Text sizes adjust correctly
- [ ] Spacing adjusts correctly

### Styling
- [ ] Gradient border button displays correctly
- [ ] Gradient border animates on hover
- [ ] Fonts load correctly
- [ ] Dark mode works (if applicable)
- [ ] CSS variables work
- [ ] Hover states work

### Performance
- [ ] First 6 images preload
- [ ] Lazy loading works for below-fold images
- [ ] No layout shifts
- [ ] Smooth animations (60fps)
- [ ] No console errors

### Edge Cases
- [ ] Empty portfolio.json
- [ ] Missing images
- [ ] Items without caseStudyUrl
- [ ] Items without category
- [ ] Items without projectId
- [ ] All items hidden
- [ ] No featured items

---

## Deployment & Merge Process

### Pre-Merge Checklist

**Before merging to production, ensure:**

- [ ] All code is committed to feature branch
- [ ] All tests pass on preview deployment
- [ ] No console errors on preview
- [ ] Performance is acceptable (Lighthouse > 90)
- [ ] Responsive design works on all breakpoints
- [ ] All images load correctly
- [ ] All links work (internal and external)
- [ ] Animations are smooth (60fps)
- [ ] Dark mode works (if applicable)
- [ ] Code review completed (if required)
- [ ] Documentation updated (if needed)

### Merge Process

**Option 1: Pull Request (Recommended)**

```bash
# Ensure feature branch is up to date
git checkout feature/portfolio-implementation
git pull origin main
git rebase main  # Or: git merge main

# Resolve any conflicts
# Test again after resolving conflicts

# Push updated branch
git push origin feature/portfolio-implementation

# Create Pull Request via GitHub/GitLab UI
# - Title: "feat: implement portfolio system"
# - Description: Link to this spec
# - Request review if needed
# - Wait for approval
# - Merge via UI (squash/rebase/merge based on team preference)
```

**Option 2: Direct Merge (if no PR workflow)**

```bash
# Ensure feature branch is up to date
git checkout feature/portfolio-implementation
git pull origin main
git rebase main  # Or: git merge main

# Resolve any conflicts
# Test again after resolving conflicts

# Switch to main
git checkout main
git pull origin main

# Merge feature branch
git merge feature/portfolio-implementation

# Push to production
git push origin main
```

### Post-Merge Verification

**After merging to production:**

1. **Verify production deployment**
   - Check production URL
   - Verify portfolio page loads
   - Test key functionality
   - Monitor for errors

2. **Monitor for issues**
   - Check error tracking (Sentry, etc.)
   - Monitor performance metrics
   - Check analytics for errors

3. **Cleanup**
   ```bash
   # Delete local feature branch
   git branch -d feature/portfolio-implementation
   
   # Delete remote feature branch
   git push origin --delete feature/portfolio-implementation
   ```

### Rollback Procedure

**If issues are found after merge:**

```bash
# Option 1: Revert merge commit
git checkout main
git revert -m 1 <merge-commit-hash>
git push origin main

# Option 2: Create hotfix branch
git checkout -b hotfix/portfolio-rollback
# Make fixes
git add .
git commit -m "fix: rollback portfolio implementation"
git checkout main
git merge hotfix/portfolio-rollback
git push origin main
```

### Deployment Platforms

**Vercel:**
- Preview deployments auto-create for feature branches
- Production deployment triggers on `main` branch push
- Check Vercel dashboard for deployment status

**Netlify:**
- Preview deployments auto-create for feature branches
- Production deployment triggers on `main` branch push
- Check Netlify dashboard for deployment status

**Other Platforms:**
- Configure preview deployments for feature branches
- Ensure production only deploys from `main` branch

---

## Key Implementation Notes

### Intelligent Filtering Logic

The featured mode uses complex logic:
1. Group by `projectId` (or client if no projectId)
2. Randomly select one item per project
3. Group by category
4. Prioritize categories: `music`, `hospitality`, `ai`, `game`, `brand`, `web3`
5. Select one item per category from unused clients
6. Resolve client conflicts (keep one per client)
7. Fill missing categories if space available
8. Limit to 6 items
9. Shuffle final selection

### Column Spanning Logic

1. Check `aspectRatio` property first (if `wide` or `ultra-wide`, span 2)
2. Use actual image dimensions if available (aspect ratio > 1.4 = span 2)
3. Fall back to hash-based pattern (~25% span 2 columns)

### Image Loading Strategy

1. Preload first 6 images with `new Image()`
2. Use `loading="eager"` for first 6, `lazy` for rest
3. Use `fetchPriority="high"` for first 6, `low` for rest
4. Intersection Observer with 100px root margin for early loading
5. Blur effect until image is visible

### Animation Timing

- Logo: 100ms delay, 0.5s transition
- Text: 400ms delay, 0.5s transition
- Images: 700ms delay, 0.5s transition
- Image blur: 0.7s transition
- Hover overlay: 0.3s transition

---

## Customization Points

### Easy Customizations

1. **Featured item limit**: Change `6` in PortfolioOrganic component
2. **Priority categories**: Modify array in PortfolioOrganic component
3. **Animation delays**: Adjust setTimeout values in portfolio-client.tsx
4. **Grid columns**: Change Tailwind classes in PortfolioOrganic
5. **Image height (carousel)**: Change `288px` in CSS
6. **Scroll speeds**: Adjust `topScrollSpeed` and `bottomScrollSpeed` in PortfolioCarousel

### Advanced Customizations

1. **Filtering logic**: Modify featured mode selection algorithm
2. **Column spanning**: Adjust aspect ratio thresholds
3. **Animation curves**: Change transition timing functions
4. **Hover effects**: Modify overlay opacity and button styles

---

## Dependencies on Other Components

### Required Components

- **Logo component**: Used in portfolio page hero
  - Must accept `size="lg"` prop
  - Must accept `className` prop

### Optional Components

- **Case study pages**: If using internal case study links
- **Theme provider**: If using dark mode

---

## Migration Notes

### Path Updates

When copying files, update:
- Import paths for portfolio.json
- Import paths for components
- Image paths in portfolio.json (if structure differs)
- baseUrl in metadata (if different domain)

### Font Dependencies

Ensure these fonts are available:
- Instrument Serif (for titles)
- VT323 (for client names/metatags)
- Xanh Mono (for hero text)

If fonts differ, update:
- Font utility classes in CSS
- className values in components

---

## Success Criteria

The implementation is complete when:

1. ✅ Portfolio page displays all items correctly
2. ✅ Featured mode shows 6 diverse items on homepage
3. ✅ All animations work smoothly
4. ✅ Responsive design works on all breakpoints
5. ✅ Case study links work correctly
6. ✅ Hover effects work
7. ✅ Images load with blur effect
8. ✅ No console errors
9. ✅ Performance is smooth (60fps)
10. ✅ Code is clean and maintainable

---

## Questions to Resolve

Before implementation, clarify:

1. **Domain/Base URL**: What is the baseUrl for zm-site?
2. **Font availability**: Are the same fonts available, or need alternatives?
3. **Case studies**: Does zm-site have case study pages, or should links be removed?
4. **Homepage integration**: Should featured portfolio appear on homepage?
5. **Image optimization**: Should images be optimized (Next.js Image component)?
6. **Dark mode**: Does zm-site support dark mode?
7. **Logo component**: Does zm-site have a Logo component, or need to create one?
8. **Git workflow**: Does zm-site use pull requests or direct merges?
9. **Deployment platform**: What platform is used (Vercel, Netlify, etc.)?
10. **Branch protection**: Are there branch protection rules on `main`?
11. **CI/CD**: Is there CI/CD setup that needs to pass?
12. **Preview URLs**: How are preview deployments accessed?

---

## Additional Resources

**Source Files:**
- `app/lib/portfolio.json` - Portfolio data
- `app/components/portfolio-organic.tsx` - Main component
- `app/components/portfolio-carousel.tsx` - Carousel component
- `app/components/portfolio-masonry.tsx` - Masonry component
- `app/portfolio/portfolio-client.tsx` - Page client component
- `app/portfolio/page.tsx` - Page server component
- `app/global.css` - Styles
- `app/components/home-page.tsx` - Example usage on homepage

**Key Functions:**
- Fisher-Yates shuffle algorithm (for randomizing)
- Intersection Observer API (for animations)
- requestAnimationFrame (for carousel)
- Image preloading (for performance)

---

**End of Specification**

