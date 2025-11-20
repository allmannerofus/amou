# SEO & Metadata Recommendations for All Manner Of Us

## ✅ Implemented Fixes

### Critical Issues Fixed

1. **Base URL Correction** ✅
   - Fixed `sitemap.ts` to use `https://allmannerofus.com` instead of `https://zachmcnair.com`
   - This affects all metadata, canonical URLs, and structured data

2. **Case Study Metadata** ✅
   - Added `generateMetadata()` function to case study pages
   - Includes Open Graph images, Twitter cards, and canonical URLs
   - Automatically extracts featured images from case study content

3. **Complete Sitemap** ✅
   - Expanded sitemap to include:
     - All case studies
     - All blog posts
     - Portfolio page
     - Blog listing page
   - Added appropriate priorities and change frequencies

4. **Portfolio Page Metadata** ✅
   - Added metadata export for portfolio page
   - Separated client component to allow server-side metadata generation

5. **Canonical URLs** ✅
   - Added canonical URLs to all pages:
     - Case studies
     - Blog posts
     - Blog listing
     - Portfolio

6. **Structured Data (JSON-LD)** ✅
   - Added structured data for case studies (CreativeWork schema)
   - Enhanced blog posts with BlogPosting schema
   - Includes proper author, publisher, and image information

7. **RSS Feed Branding** ✅
   - Updated RSS feeds from "Zvpply" to "All Manner Of Us"

8. **OG Route Branding** ✅
   - Updated default title in OG image route

## 📋 Additional Recommendations

### High Priority

1. **Google Search Console Verification**
   - Update the placeholder in `app/layout.tsx` line 118:
     ```typescript
     verification: {
       google: 'your-google-verification-code', // Replace with actual code
     },
     ```
   - Add your Google Search Console verification code

2. **Image Optimization**
   - Ensure all images in case studies have descriptive alt text
   - Consider adding `width` and `height` attributes to images for better Core Web Vitals
   - Optimize images (WebP format, proper sizing) for better performance

3. **Meta Descriptions**
   - Review all case study descriptions to ensure they're:
     - 150-160 characters (optimal length)
     - Compelling and include relevant keywords
     - Unique for each page

4. **Breadcrumbs Structured Data**
   - Consider adding breadcrumb navigation with structured data:
     ```json
     {
       "@type": "BreadcrumbList",
       "itemListElement": [...]
     }
     ```

### Medium Priority

5. **Open Graph Images**
   - Consider generating dynamic OG images for each case study using the `/og` route
   - Currently using static image; dynamic images with case study title would be better

6. **Article Dates**
   - Blog posts have dates, but case studies don't
   - Consider adding `datePublished` to case study frontmatter for better freshness signals

7. **Tags/Categories**
   - Case studies have tags in frontmatter but they're not being used in structured data keywords
   - Already implemented in structured data ✅

8. **Internal Linking**
   - Add more internal links between related case studies
   - Link from portfolio page to individual case studies
   - Add "Related Case Studies" section

9. **Schema Markup for Services**
   - Consider adding Service schema markup to homepage
   - Could help with local/industry-specific searches

### Low Priority / Future Enhancements

10. **Video Structured Data**
    - If you add video case studies, add VideoObject schema

11. **FAQ Schema**
    - If you add an FAQ section, use FAQPage schema

12. **Local Business Schema**
    - If you want to appear in local searches, add LocalBusiness schema with Austin location

13. **Performance Optimization**
    - Consider lazy loading images below the fold
    - Implement image CDN if not already using one
    - Monitor Core Web Vitals

14. **Analytics & Tracking**
    - Ensure Google Analytics is properly configured (already have Vercel Analytics ✅)
    - Set up conversion tracking for contact form submissions

15. **Social Media Profiles**
    - Add more social profiles to structured data if available
    - Currently only has Twitter/X

## 🔍 Technical SEO Checklist

- [x] Unique title tags on all pages
- [x] Meta descriptions on all pages
- [x] Open Graph tags
- [x] Twitter Card tags
- [x] Canonical URLs
- [x] Structured data (JSON-LD)
- [x] XML sitemap
- [x] robots.txt
- [x] Mobile-friendly (responsive design)
- [ ] Image alt text audit (verify all images have descriptive alt text)
- [ ] Page speed optimization
- [ ] HTTPS (should be handled by Vercel)
- [ ] 404 page (check if exists)

## 📊 Monitoring & Maintenance

1. **Regular Audits**
   - Run Google Search Console reports monthly
   - Check for crawl errors
   - Monitor search performance

2. **Content Updates**
   - Keep case studies updated with fresh content
   - Add new case studies regularly
   - Update portfolio as projects complete

3. **Link Building**
   - Reach out to clients for backlinks
   - Guest post on design/tech blogs
   - Share case studies on social media

## 🎯 Target Keywords (Already in Metadata)

Your metadata already includes excellent keyword targeting:
- AI design studio, AI interface design
- Web3 design, DeFi UX design
- Product design, UX design, UI design
- Brand design, design systems

Consider creating content around these keywords to improve rankings.

## 📝 Notes

- All critical SEO issues have been addressed
- The site now has proper metadata on all pages
- Structured data will help with rich snippets in search results
- Sitemap includes all important pages for better crawling

## 🚀 Next Steps

1. Replace Google verification placeholder
2. Audit and optimize image alt text
3. Set up Google Search Console
4. Monitor search performance
5. Consider adding breadcrumbs navigation
6. Generate dynamic OG images for case studies

