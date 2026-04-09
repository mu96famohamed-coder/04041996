import { MetadataRoute } from 'next'
import { LANGS, HREFLANG_MAP } from '@/lib/i18n'

const BASE = 'https://www.enotarydubai.ae'

const STATIC_PATHS = [
  '/',
  '/power-of-attorney',
  '/power-of-attorney/general',
  '/power-of-attorney/real-estate',
  '/power-of-attorney/real-estate/sale',
  '/power-of-attorney/real-estate/purchase',
  '/power-of-attorney/real-estate/management',
  '/power-of-attorney/vehicle',
  '/power-of-attorney/vehicle/sale',
  '/power-of-attorney/vehicle/export',
  '/power-of-attorney/vehicle/management',
  '/power-of-attorney/bank',
  '/power-of-attorney/special',
  '/power-of-attorney/court',
  '/power-of-attorney/child-travel',
  '/power-of-attorney/inheritance',
  '/power-of-attorney/company-formation',
  '/power-of-attorney/property-gifting',
  '/power-of-attorney/mohre',
  '/attestation/mofa',
  '/attestation/apostille',
  '/attestation/embassy',
  '/attestation/degree',
  '/attestation/marriage',
  '/eviction-notice',
  '/legal-notice',
  '/legal-notice/poa-cancellation',
  '/e-notary',
  '/mobile-notary',
  '/emergency-notary',
  '/legal-translation',
  '/legal-translation/court',
  '/rdc-support',
  '/what-is-tableegh',
  '/document-rejection',
  '/poa-cancellation',
  '/why-poa-rejected-dubai',
  '/affidavit',
  '/certified-true-copy',
  '/corporate/board-resolution',
  '/corporate/moa',
  '/corporate/moa-amendment',
  '/corporate/share-transfer',
  '/corporate/shareholder-agreement',
  '/corporate/contract',
  '/corporate/liquidation',
  '/last-will-testament-dubai',
  '/pricing',
  '/faq',
  '/about',
  '/contact',
  '/blog',
]

// Must stay in sync with BLOG_SLUGS in app/[lang]/blog/page.tsx
const BLOG_SLUGS = [
  'how-to-get-poa-dubai',
  'power-of-attorney-types-dubai',
  'difference-between-general-and-special-poa-uae',
  'how-to-cancel-poa-dubai',
  'poa-rejected-by-authority-what-to-do',
  'poa-for-banking-uae-guide',
  'corporate-poa-vs-individual-poa-uae',
  'power-of-attorney-property-sale-dubai',
  'dld-property-gift-transfer-dubai',
  'mofa-attestation-guide',
  'mofa-attestation-step-by-step-dubai',
  'mofa-attestation-uae-complete-guide-2026',
  'apostille-vs-attestation',
  'apostille-vs-embassy-attestation-uae-guide',
  'what-is-apostille-uae',
  'eviction-notice-dubai-guide',
  'eviction-notice-requirements-dubai',
  'whatsapp-eviction-notice-dubai-valid',
  'rdc-filing-guide-dubai',
  'how-to-attend-rdc-hearing-dubai-2026',
  'legal-translation-dubai-guide',
  'last-will-testament-dubai-expats',
  'travelling-minor-child-uae-rules',
  'same-day-notary-dubai',
  'notary-public-vs-lawyer-dubai',
  'notarize-documents-without-visiting-uae',
  'affidavit-dubai-complete-guide',
  'corporate-documents-dubai',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const path of STATIC_PATHS) {
    for (const lang of LANGS) {
      // Determine priority based on page importance for UAE notary SEO
      let priority = 0.7
      if (path === '/') priority = 1.0
      else if (path === '/power-of-attorney' || path === '/eviction-notice') priority = 0.95
      else if (path.startsWith('/power-of-attorney/')) priority = 0.9
      else if (path.startsWith('/attestation/') || path === '/poa-cancellation') priority = 0.88
      else if (path.startsWith('/corporate/') || path === '/legal-translation') priority = 0.85
      else if (['/e-notary','/mobile-notary','/emergency-notary','/rdc-support','/legal-notice','/affidavit','/certified-true-copy'].includes(path)) priority = 0.82
      else if (['/what-is-tableegh','/why-poa-rejected-dubai','/document-rejection','/last-will-testament-dubai'].includes(path)) priority = 0.8
      else if (['/faq','/pricing','/about','/contact','/blog'].includes(path)) priority = 0.65

      const cleanPath = path === '/' ? '' : path
      entries.push({
        url: `${BASE}/${lang}${cleanPath}/`,
        lastModified: new Date(),
        changeFrequency: path === '/' ? 'weekly' : ['faq','about','contact','pricing'].includes(path.slice(1)) ? 'monthly' : 'monthly',
        priority,
        alternates: {
          languages: Object.fromEntries(
            LANGS.map((l) => [HREFLANG_MAP[l], `${BASE}/${l}${cleanPath}/`])
          ),
        },
      })
    }
  }

  for (const slug of BLOG_SLUGS) {
    for (const lang of LANGS) {
      entries.push({
        url: `${BASE}/${lang}/blog/${slug}/`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      })
    }
  }

  return entries
}
