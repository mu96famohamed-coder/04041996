import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
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
