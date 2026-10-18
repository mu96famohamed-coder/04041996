import articleData from '@/content/articles.json'

// The only source of article text, translations, dates and metadata.
export const articles = articleData

// Preserve the previous route/related-link order. New article keys are appended
// automatically; editors never need to update this list to publish a new post.
const PRESERVED_ROUTE_ORDER: string[] = [
  "how-to-get-poa-dubai",
  "power-of-attorney-types-dubai",
  "difference-between-general-and-special-poa-uae",
  "poa-for-banking-uae-guide",
  "corporate-poa-vs-individual-poa-uae",
  "mofa-attestation-guide",
  "eviction-notice-requirements-dubai",
  "whatsapp-eviction-notice-dubai-valid",
  "rdc-filing-guide-dubai",
  "how-to-attend-rdc-hearing-dubai-2026",
  "last-will-testament-dubai-expats",
  "travelling-minor-child-uae-rules",
  "notary-public-vs-lawyer-dubai",
  "notarize-documents-without-visiting-uae",
  "affidavit-dubai-complete-guide",
  "corporate-documents-dubai",
  // Existing article URLs previously omitted from the sitemap, now included.
  "poa-cancellation-dubai-revoke",
  "special-power-of-attorney-uae-guide"
]

const records = articles as unknown as Record<string, Record<string, unknown>>
for (const slug of PRESERVED_ROUTE_ORDER) {
  if (!Object.prototype.hasOwnProperty.call(records, slug)) {
    throw new Error(`Existing article "${slug}" is missing from content/articles.json. Restore its original key to preserve its URL.`)
  }
}

for (const [slug, article] of Object.entries(records)) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error(`Invalid article key "${slug}" in content/articles.json. Use lowercase letters, numbers and hyphens.`)
  }
  if (!article || typeof article !== 'object' || typeof article.title_en !== 'string' || !article.title_en.trim()) {
    throw new Error(`Article "${slug}" must have a non-empty title_en in content/articles.json.`)
  }
  for (const field of ['date', 'date_updated']) {
    const value = article[field]
    if (value === undefined) continue
    if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value) || Number.isNaN(Date.parse(value)) || new Date(value).toISOString().slice(0, 10) !== value) {
      throw new Error(`Article "${slug}" has an invalid ${field}. Use a real date in YYYY-MM-DD format.`)
    }
  }
}

const preserved = new Set(PRESERVED_ROUTE_ORDER)

// Shared by static page generation, related links and sitemap generation.
// Adding an article requires editing content/articles.json only, then rebuilding.
export const ARTICLE_SLUGS: string[] = [
  ...PRESERVED_ROUTE_ORDER,
  ...Object.keys(records).filter((slug) => !preserved.has(slug)),
]
