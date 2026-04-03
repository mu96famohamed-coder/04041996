import { type Lang } from '@/lib/i18n'

interface BreadcrumbItem {
  name: string
  url: string
}

interface FAQItem {
  q: Record<string, string>
  a: Record<string, string>
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function FAQSchema({ items, lang }: { items: FAQItem[]; lang: Lang }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q[lang] || item.q.en,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a[lang] || item.a.en,
      },
    })),
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function ServiceSchema({
  name, url, description,
}: {
  name: string; url: string; description: string
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name,
    url,
    description,
    provider: {
      '@type': 'Organization',
      name: 'E-Notary Dubai',
      url: 'https://enotarydubai.ae',
      telephone: '+971526883066',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Dubai',
        addressCountry: 'AE',
      },
    },
    areaServed: { '@type': 'City', name: 'Dubai' },
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    '@id': 'https://www.enotarydubai.ae/#business',
    name: 'E-Notary Dubai',
    alternateName: 'E-Notary Dubai',
    description: 'Private notary support service in Dubai — POA drafting, MOFA attestation, eviction notices, legal translation. Same-day service.',
    url: 'https://enotarydubai.ae',
    telephone: '+971526883066',
    email: 'info@enotarydubai.ae',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Business Bay',
      addressLocality: 'Dubai',
      addressRegion: 'Dubai',
      addressCountry: 'AE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 25.1850,
      longitude: 55.2590,
    },
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Sunday','Monday','Tuesday','Wednesday','Thursday'], opens: '09:00', closes: '18:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday'], opens: '10:00', closes: '15:00' },
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+971526883066',
      contactType: 'customer service',
      availableLanguage: ['English', 'Arabic', 'Russian', 'Chinese', 'Spanish'],
    },
    areaServed: {
      '@type': 'City',
      name: 'Dubai',
      sameAs: 'https://www.wikidata.org/wiki/Q612',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Notary Support Services',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Power of Attorney Dubai' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'MOFA Attestation Dubai' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Eviction Notice Dubai' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Legal Translation Dubai' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'E-Notary Dubai' } },
      ],
    },
    sameAs: [
      'https://wa.me/971526883066',
    ],
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
