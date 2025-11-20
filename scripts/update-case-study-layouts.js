const fs = require('fs');
const path = require('path');

const caseStudiesDir = path.join(__dirname, '../app/content/case-studies');
const files = fs.readdirSync(caseStudiesDir).filter(f => f.endsWith('.mdx'));

// Layout strategy based on number of images and context
const layoutStrategies = {
  '6079-ai.mdx': ['full', 'full', 'full', 'full', 'full'], // Dashboard, Home, Game, 404, Nav - all important
  'think-agents.mdx': ['full', 'full', '2col', '2col', 'full', 'full'], // Hero, Dashboard, Claim (2col pair), Thinkubator, Token (2col pair)
  'souls.mdx': ['2col', '2col', 'full', 'full'], // First 3 are similar (2col), then marketing
  'thinkos.mdx': ['full', '2col', '2col'], // Browser full, extensions together
  'hammock.mdx': ['full'], // Single image
  'janes-dine-inn.mdx': ['full'], // Single image
  // Add more as needed
};

files.forEach(filename => {
  const filePath = path.join(caseStudiesDir, filename);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Find the Project Images section
  const imagesSectionMatch = content.match(/(## Project Images\n)([\s\S]*?)(?=\n## |$)/);
  if (!imagesSectionMatch) return;
  
  const imagesSection = imagesSectionMatch[2];
  const imageLines = imagesSection.split('\n').filter(line => line.trim().startsWith('!['));
  
  // Get layout strategy for this file
  const strategy = layoutStrategies[filename] || imageLines.map(() => 'full');
  
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
  console.log(`Updated ${filename}`);
});

console.log('Done updating case study layouts');

