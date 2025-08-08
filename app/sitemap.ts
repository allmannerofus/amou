export const baseUrl = 'https://zachmcnair.com'

export default async function sitemap() {
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
  ]

  return routes
}
