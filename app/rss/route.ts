import { baseUrl } from 'app/sitemap'

export async function GET() {
  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
        <title>All Manner Of Us</title>
        <link>${baseUrl}</link>
        <description>All Manner Of Us RSS feed</description>
    </channel>
  </rss>`

  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'text/xml',
    },
  })
}
