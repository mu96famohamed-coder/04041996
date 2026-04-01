import type { Metadata } from 'next'
import { LANGS, type Lang, getPageContent, getPageBlocks, getPageFaq } from '@/lib/i18n'
import ServicePage from '@/components/ServicePage'

interface Props { params: Promise<{ lang: Lang }> }

export async function generateStaticParams() {
  return LANGS.map((l) => ({ lang: l }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const seo = (getPageContent('/poa-cancellation') as any)?.seo
  return {
    title:       seo?.meta_title?.[lang]       ?? seo?.meta_title?.en,
    description: seo?.meta_description?.[lang] ?? seo?.meta_description?.en,
    alternates: {
      canonical: `https://enotarydubai.ae/${lang}/poa-cancellation/`,
      'x-default': `https://enotarydubai.ae/en/poa-cancellation/`,
        languages: Object.fromEntries(
        LANGS.map((l) => [`${l}-AE`, `https://enotarydubai.ae/${l}/poa-cancellation/`])
      ),
    },
  }
}

export default async function Page({ params }: Props) {
  const { lang } = await params
  const seo = (getPageContent('/poa-cancellation') as any)?.seo
  return (
    <ServicePage
      lang={lang}
      title={seo?.h1}
      description={seo?.meta_description}
      authority={seo?.authority}
      waMessage={(seo?.wa_message?.[lang] ?? seo?.wa_message?.en) as string}
      faqItems={getPageFaq('/poa-cancellation')}
      richBlocks={getPageBlocks('/poa-cancellation')}
    />
  )
}
