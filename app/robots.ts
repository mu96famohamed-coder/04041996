import { MetadataRoute } from 'next'

// Explicit allowances for AI/answer-engine crawlers. Named rules take
// precedence over the wildcard for the agents that support them.
const AI_CRAWLERS = [
  'OAI-SearchBot',
  'PerplexityBot',
  'Claude-SearchBot',
  'Claude-User',
  'Google-Extended',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: ['/'],
        disallow: ['/api/'],
      })),
      {
        userAgent: '*',
        allow: ['/', '/_next/static/'],
        disallow: ['/api/'],
      },
    ],
    sitemap: 'https://www.enotarydubai.ae/sitemap.xml',
    host: 'https://www.enotarydubai.ae',
  }
}
