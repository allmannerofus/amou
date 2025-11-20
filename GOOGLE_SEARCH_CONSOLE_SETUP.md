# Google Search Console Setup Guide

## Step 1: Add Your Property

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Click "Add Property"
3. Choose "URL prefix" and enter: `https://allmannerofus.com`
4. Click "Continue"

## Step 2: Verify Ownership

You have several verification options:

### Option A: HTML Tag (Easiest - Already in your code!)

1. Google will show you a meta tag like:
   ```html
   <meta name="google-site-verification" content="YOUR_CODE_HERE" />
   ```

2. You already have this in `app/layout.tsx` at line 118:
   ```typescript
   verification: {
     google: 'your-google-verification-code', // Replace with actual code
   },
   ```

3. Replace `'your-google-verification-code'` with the code Google provides
4. Deploy your changes
5. Click "Verify" in Google Search Console

### Option B: HTML File Upload

1. Download the HTML file Google provides
2. Upload it to your `public/` directory
3. Deploy and verify

### Option C: DNS Record

1. Add a TXT record to your domain's DNS
2. Google will provide the exact record to add

## Step 3: Submit Your Sitemap

Once verified:

1. In Google Search Console, go to "Sitemaps" in the left sidebar
2. Enter: `https://allmannerofus.com/sitemap.xml`
3. Click "Submit"

## Step 4: Monitor Performance

After a few days/weeks, you'll see:
- **Performance**: Search queries, clicks, impressions, CTR
- **Coverage**: Pages indexed, errors
- **Enhancements**: Rich results, mobile usability

## Step 5: Request Indexing (Optional)

For important pages:
1. Use the URL Inspection tool
2. Enter a page URL
3. Click "Request Indexing"

## Troubleshooting

- **Verification fails**: Make sure you deployed the changes with the verification code
- **Sitemap errors**: Check that `/sitemap.xml` is accessible
- **No data yet**: It can take a few days for data to appear

## Next Steps

Once set up:
- Monitor search performance monthly
- Fix any crawl errors
- Submit new content for indexing
- Review search queries to optimize content

