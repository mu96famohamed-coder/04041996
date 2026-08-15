import type { Metadata } from 'next'
import { LANGS, type Lang, getPageContent, getPageBlocks, getPageFaq, HREFLANG_MAP } from '@/lib/i18n'
import ServicePage from '@/components/ServicePage'
import { LegalServiceSchema } from '@/components/SchemaMarkup'

interface Props { params: Promise<{ lang: Lang }> }

export async function generateStaticParams() {
  return LANGS.map((l) => ({ lang: l }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const seo = (getPageContent('/rdc-support/contract-renewal') as any)?.seo
  return {
    title:       seo?.meta_title?.[lang]       ?? seo?.meta_title?.en,
    description: seo?.meta_description?.[lang] ?? seo?.meta_description?.en,
    openGraph: {
      title:       seo?.meta_title?.[lang]       ?? seo?.meta_title?.en,
      description: seo?.meta_description?.[lang] ?? seo?.meta_description?.en,
      url: `https://www.enotarydubai.ae/${lang}/rdc-support/contract-renewal/`,
      siteName: 'E-Notary Dubai',
      locale: ({ en: 'en_US', ar: 'ar_AE', ru: 'ru_RU', zh: 'zh_CN', es: 'es_ES' } as Record<string, string>)[lang],
      type: 'website',
    },
    alternates: {
      canonical: `https://www.enotarydubai.ae/${lang}/rdc-support/contract-renewal/`,
      languages: {
        ...Object.fromEntries(LANGS.map((l) => [HREFLANG_MAP[l], `https://www.enotarydubai.ae/${l}/rdc-support/contract-renewal/`])),
        'x-default': `https://www.enotarydubai.ae/en/rdc-support/contract-renewal/`,
      },
    },
  }
}

export default async function Page({ params }: Props) {
  const { lang } = await params
  const seo = (getPageContent('/rdc-support/contract-renewal') as any)?.seo
  return (
    <>
      <LegalServiceSchema lang={lang} path="/rdc-support/contract-renewal" />
      <ServicePage
        lang={lang}
        title={seo?.h1}
        description={seo?.meta_description}
        authority={seo?.authority}
        waMessage={(seo?.wa_message?.[lang] ?? seo?.wa_message?.en) as string}
        faqItems={getPageFaq('/rdc-support/contract-renewal')}
        richBlocks={getPageBlocks('/rdc-support/contract-renewal')}
        hideQrBadge
        preparedStat
        noTimeline
        relatedServices={[
          { href: `/${lang}/rdc-support/offer-and-deposit`, label: { en: 'Offer and Deposit', ar: 'العرض والإيداع', ru: 'Оферта и депонирование', zh: '提存申请', es: 'Oferta y Consignación' } },
          { href: `/${lang}/rdc-support/tenant-defence`, label: { en: 'Responding to a Case', ar: 'الرد على الدعوى', ru: 'Ответ на дело', zh: '应对诉讼', es: 'Responder a una Demanda' } },
          { href: `/${lang}/rdc-support`, label: { en: 'RDC Support', ar: 'مركز فض المنازعات الإيجارية', ru: 'Поддержка RDC', zh: 'RDC支持', es: 'Apoyo RDC' } },
        ]}
      />
    </>
  )
}
