const fs = require('fs');
const path = require('path');

const caseStudiesDir = path.join(__dirname, '../app/content/case-studies');
const files = fs.readdirSync(caseStudiesDir).filter(f => f.endsWith('.mdx'));

// Thoughtful layout strategies based on image count and context
const layoutStrategies = {
  '6079-ai.mdx': ['full', 'full', 'full', '2col', '2col'], // Dashboard, Home, NodeShifter full; 404 and Nav together
  'think-agents.mdx': ['full', 'full', '2col', '2col', '2col', '2col'], // Hero, Dashboard full; Claim/Thinkubator pair; Token pair
  'souls.mdx': ['3col', '3col', '3col', 'full'], // First 3 similar experiences in 3col; marketing full
  'thinkos.mdx': ['full', '2col', '2col'], // Browser full; extensions together
  'wistia.mdx': ['full', 'full'], // Both full width
  'mutemath.mdx': ['full'], // Single image
  'creative-market.mdx': ['full'], // Single image
  'hammock.mdx': ['full'], // Single image
  'janes-dine-inn.mdx': ['full'], // Single image
};

files.forEach(filename => {
  const filePath = path.join(caseStudiesDir, filename);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Find the Project Images section
  const imagesSectionMatch = content.match(/(## Project Images\n)([\s\S]*?)(?=\n## |$)/);
  if (!imagesSectionMatch) return;
  
  const imagesSection = imagesSectionMatch[2];
  const imageLines = imagesSection.split('\n').filter(line => line.trim().startsWith('!['));
  
  // Get layout strategy for this file, or use smart defaults
  let strategy = layoutStrategies[filename];
  
  if (!strategy) {
    // Smart defaults based on image count
    const imageCount = imageLines.length;
    if (imageCount === 1) {
      strategy = ['full'];
    } else if (imageCount === 2) {
      strategy = ['full', 'full'];
    } else if (imageCount === 3) {
      strategy = ['full', '2col', '2col']; // First full, next two together
    } else if (imageCount === 4) {
      strategy = ['full', '2col', '2col', 'full']; // First full, middle pair, last full
    } else if (imageCount >= 5) {
      // First full, then pairs
      strategy = ['full'];
      for (let i = 1; i < imageCount; i += 2) {
        if (i + 1 < imageCount) {
          strategy.push('2col', '2col');
        } else {
          strategy.push('full');
        }
      }
    }
  }
  
  // Update each image with layout
  let updatedImagesSection = '';
  imageLines.forEach((line, idx) => {
    const layout = strategy[idx] || 'full';
    if (line.match(/\)\{/)) {
      // Already has layout, replace it
      updatedImagesSection += line.replace(/\)\{[^}]+\}/, `){${layout}}`) + '\n\n';
    } else {
      // Add layout
      updatedImagesSection += line.replace(/\)$/, `){${layout}}`) + '\n\n';
    }
  });
  
  // Replace the images section
  content = content.replace(imagesSectionMatch[0], imagesSectionMatch[1] + updatedImagesSection.trim());
  
  fs.writeFileSync(filePath, content);
  console.log(`Updated ${filename} with layouts: ${strategy.join(', ')}`);
});

console.log('Done updating case study layouts');



