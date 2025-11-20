#!/usr/bin/env node

/**
 * Quick script to audit image alt text in case studies
 * Run with: node scripts/audit-image-alt-text.js
 */

const fs = require('fs')
const path = require('path')

const caseStudiesDir = path.join(process.cwd(), 'app/content/case-studies')

function auditCaseStudy(slug) {
  const filePath = path.join(caseStudiesDir, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null

  const content = fs.readFileSync(filePath, 'utf8')
  const lines = content.split('\n')
  
  const issues = []
  let inImagesSection = false
  
  lines.forEach((line, index) => {
    if (line.startsWith('## Project Images')) {
      inImagesSection = true
      return
    }
    
    if (inImagesSection && line.startsWith('## ')) {
      inImagesSection = false
      return
    }
    
    if (inImagesSection) {
      // Match markdown image syntax: ![alt](src)
      const imageMatch = line.match(/^!\[([^\]]*)\]\(([^)]+)\)/)
      if (imageMatch) {
        const [, alt, src] = imageMatch
        if (!alt || alt.trim() === '') {
          issues.push({
            line: index + 1,
            src,
            issue: 'Missing alt text'
          })
        } else if (alt.length < 10) {
          issues.push({
            line: index + 1,
            src,
            alt,
            issue: 'Alt text too short (should be descriptive)'
          })
        }
      }
    }
  })
  
  return issues.length > 0 ? { slug, issues } : null
}

// Get all case study files
const files = fs.readdirSync(caseStudiesDir)
  .filter(f => f.endsWith('.mdx'))
  .map(f => f.replace('.mdx', ''))

console.log('🔍 Auditing image alt text in case studies...\n')

const results = files
  .map(slug => auditCaseStudy(slug))
  .filter(Boolean)

if (results.length === 0) {
  console.log('✅ All images have alt text!')
  process.exit(0)
}

console.log(`⚠️  Found ${results.length} case study(ies) with missing or short alt text:\n`)

results.forEach(({ slug, issues }) => {
  console.log(`📄 ${slug}.mdx`)
  issues.forEach(({ line, src, alt, issue }) => {
    console.log(`   Line ${line}: ${issue}`)
    console.log(`   Image: ${src}`)
    if (alt) console.log(`   Current alt: "${alt}"`)
    console.log('')
  })
})

console.log('\n💡 Tips:')
console.log('   - Alt text should describe what\'s in the image')
console.log('   - Include relevant context (e.g., "THINK Agents dashboard showing AI interface")')
console.log('   - Aim for 10-125 characters')
console.log('   - Avoid generic text like "image" or "screenshot"')

process.exit(results.length > 0 ? 1 : 0)

