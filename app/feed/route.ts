import { getAllPosts } from 'app/lib/mdx'
import { baseUrl } from 'app/sitemap'

export async function GET() {
  const posts = getAllPosts('blog')
  
  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Zvpply Blog</title>
    <link>${baseUrl}/blog</link>
    <description>Thoughts on design, AI, Web3, and building products that matter.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed" rel="self" type="application/rss+xml" />
    ${posts.map((post) => `
    <item>
      <title><![CDATA[${post.meta.title}]]></title>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid>${baseUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.meta.date).toUTCString()}</pubDate>
      <description><![CDATA[${post.meta.description || ''}]]></description>
      ${post.meta.tags?.map(tag => `<category>${tag}</category>`).join('') || ''}
    </item>
    `).join('')}
  </channel>
</rss>`

  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
} 