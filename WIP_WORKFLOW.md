# WIP Workflow Guide

This project now uses a simple `WIP` constant to control which version of the site is displayed.

## How it works

- **WIP = true**: Shows the minimal landing page (no navbar, just hero, portfolio, about, and footer)
- **WIP = false**: Shows the full site with all sections and navbar

## Files

- `app/layout.tsx` - Contains the `WIP` constant and conditional navbar display
- `app/page.tsx` - Always shows the landing page (simplified approach)
- `app/landing.tsx` - The minimal landing page component
- `scripts/toggle-wip.sh` - Script to easily toggle between modes

## Usage

### Option 1: Use the toggle script (Recommended)
```bash
./scripts/toggle-wip.sh
```

### Option 2: Manually edit the constant
Edit `app/layout.tsx` and change:
```typescript
const WIP = true   // Shows landing page (no navbar)
const WIP = false  // Shows full site (with navbar)
```

## Current Setup

- **Development server**: Running on port 7007
- **Current mode**: WIP = true (showing minimal landing page)
- **Content**: Hero section, portfolio carousel, about section, and footer
- **No navbar**: Clean, minimal design
- **No horizontal scrolling**: Fixed with proper container classes

## Landing Page Structure

When WIP = true, the site shows:
1. **Hero section** - Name, title, and description
2. **Portfolio carousel** - Your work showcase
3. **About section** - Full about content
4. **Footer** - "Ready to work?" section and contact info

## Switching to Full Site

To show the full site with all sections and navbar:
1. Set `WIP = false` in `app/layout.tsx`
2. The navbar will appear
3. All sections will be available (contact, expertise, experience, etc.)

## Benefits

- ✅ **Simple toggle** - One constant controls everything
- ✅ **No horizontal scrolling** - Proper responsive design
- ✅ **Clean landing page** - Minimal, focused design
- ✅ **Easy to maintain** - Single source of truth for WIP mode
