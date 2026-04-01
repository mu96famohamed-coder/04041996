import type { Metadata } from 'next'
import { LANGS, type Lang, getPageContent, getPageBlocks, getPageFaq } from '@/lib/i18n'
import ServicePage from '@/components/ServicePage'

interface Props { params: Promise<{ lang: Lang }> }

export async function generateStaticParams() {
  return LANGS.map((l) => ({ lang: l }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const seo = (getPageContent('/legal-translation/court') as any)?.seo
  return {
    title:       seo?.meta_title?.[lang]       ?? seo?.meta_title?.en,
    description: seo?.meta_description?.[lang] ?? seo?.meta_description?.en,
    alternates: {
      canonical: `https://enotarydubai.ae/${lang}/legal-translation/court/`,
      'x-default': `https://enotarydubai.ae/en/legal-translation/court/`,
        languages: Object.fromEntries(
        LANGS.map((l) => [`${l}-AE`, `https://enotarydubai.ae/${l}/legal-translation/court/`])
      ),
    },
  }
}

export default async function Page({ params }: Props) {
  const { lang } = await params
  const seo = (getPageContent('/legal-translation/court') as any)?.seo
  return (
    <ServicePage
      lang={lang}
      title={seo?.h1}
      description={seo?.meta_description}
      authority={seo?.authority}
      waMessage={(seo?.wa_message?.[lang] ?? seo?.wa_message?.en) as string}
      faqItems={getPageFaq('/legal-translation/court')}
      richBlocks={getPageBlocks('/legal-translation/court')}
    />
  )
}
