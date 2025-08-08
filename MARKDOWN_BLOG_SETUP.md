# Markdown Blog & Case Studies Setup

This document explains how to set up a markdown-based blog and case studies system for your Next.js site.

## Overview

The system allows you to:
- Write blog posts in markdown (.mdx files)
- Create case studies/portfolio pieces
- Auto-generate pages from markdown files
- Include metadata (title, date, tags, etc.)
- Support images and rich content
- Share content easily with built-in sharing buttons

## File Structure

```
app/
├── content/
│   ├── blog/           # Blog posts (.mdx files)
│   └── case-studies/   # Case studies (.mdx files)
├── lib/
│   └── mdx.ts         # Utilities for handling markdown
├── components/
│   ├── mdx.tsx        # MDX rendering components
│   └── share-buttons.tsx # Sharing functionality
├── feed/
│   └── route.ts       # RSS feed generation
└── blog/              # Blog pages
    ├── page.tsx       # Blog listing
    └── [slug]/
        └── page.tsx   # Individual blog post
```

## How to Enable

1. **Install dependencies** (already done):
   ```bash
   pnpm add next-mdx-remote gray-matter date-fns
   ```

2. **Create content** by adding .mdx files to the content directories.

## Writing Content

### Blog Post Example

Create a file: `app/content/blog/my-post.mdx`

```markdown
---
title: "My Blog Post Title"
date: "2024-01-15"
description: "A brief description of the post"
tags: ["AI", "Web3", "Design"]
published: true
---

# My Blog Post

This is the content of my blog post. You can use:

## Headers
- **Bold text**
- *Italic text*
- [Links](https://example.com)
- `Code snippets`

## Lists
- Item 1
- Item 2
- Item 3

## Code Blocks
```javascript
console.log("Hello World");
```

## Images
![Alt text](/path/to/image.jpg)
```

### Case Study Example

Create a file: `app/content/case-studies/my-project.mdx`

```markdown
---
title: "Project Name"
date: "2024-01-10"
description: "Description of the project"
tags: ["UX Design", "Product Design", "AI"]
published: true
---

# Project Name

## Overview
Project description and goals.

## The Challenge
What problems needed to be solved.

## My Role
What I was responsible for.

## Process
How I approached the project.

## Results
Outcomes and impact.
```

## Frontmatter Options

All .mdx files support frontmatter (the section between `---`):

- `title`: Post title (required)
- `date`: Publication date (YYYY-MM-DD format)
- `description`: Brief description for previews
- `tags`: Array of tags for categorization
- `image`: Featured image path
- `published`: Boolean to control visibility (default: true)

## Features

### ✅ Working Features
- Markdown rendering with custom styling
- Frontmatter metadata parsing
- Tag system for categorization
- Date formatting
- Dark mode support
- Responsive design
- SEO-friendly URLs
- Static site generation
- **Sharing buttons** on every post
- **RSS feed** for blog posts
- **Social media sharing** (Twitter, LinkedIn)

### 🔧 Technical Details
- Uses `next-mdx-remote` for rendering
- `gray-matter` for frontmatter parsing
- `date-fns` for date formatting
- Custom Tailwind styling
- TypeScript support

## Sharing Features

### Share Buttons Available:
- **Copy Markdown** - Copy formatted markdown
- **Copy Text** - Copy plain text version
- **Twitter** - Direct share to Twitter
- **LinkedIn** - Direct share to LinkedIn
- **Native Share** - Device's native sharing (mobile)

### RSS Feed:
- Available at `/feed`
- Auto-updates with new posts
- Perfect for readers and other platforms

## Navigation

The navigation includes links to:
- `/blog` - Blog listing page
- `/case-studies` - Case studies listing page

## Styling

All content uses your existing design system:
- Faktum font family
- Dark mode support
- Consistent spacing and typography
- Responsive design

## Adding Images

1. Place images in `app/content/images/`
2. Reference them in markdown: `![Alt text](/images/filename.jpg)`
3. Images are automatically optimized by Next.js

## Troubleshooting

### React Version Conflicts
If you encounter React version conflicts:
1. Check for duplicate React installations
2. Clear `.next` cache: `rm -rf .next`
3. Reinstall dependencies: `pnpm install`

### Build Errors
- Ensure all .mdx files have valid frontmatter
- Check that file paths are correct
- Verify TypeScript types are correct

## Next Steps

1. Add your first blog post
2. Customize styling as needed
3. Add more features like:
   - Search functionality
   - Tag filtering
   - Comments system
   - Analytics integration

## Example Content

I've created example files:
- `app/content/blog/hello-world.mdx` - Sample blog post
- `app/content/case-studies/ai-layer-labs.mdx` - Sample case study

These demonstrate the full range of markdown features and styling.

## Security Note

This setup is designed for public repositories and doesn't include any API keys or credentials. All sharing is done through standard web APIs and doesn't require any authentication. 