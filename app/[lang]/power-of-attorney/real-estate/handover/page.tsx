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
  const seo = (getPageContent('/power-of-attorney/real-estate/handover') as any)?.seo
  return {
    title:       seo?.meta_title?.[lang]       ?? seo?.meta_title?.en,
    description: seo?.meta_description?.[lang] ?? seo?.meta_description?.en,
    openGraph: {
      title:       seo?.meta_title?.[lang]       ?? seo?.meta_title?.en,
      description: seo?.meta_description?.[lang] ?? seo?.meta_description?.en,
      url: `https://www.enotarydubai.ae/${lang}/power-of-attorney/real-estate/handover/`,
      siteName: 'E-Notary Dubai',
      locale: ({ en: 'en_US', ar: 'ar_AE', ru: 'ru_RU', zh: 'zh_CN', es: 'es_ES' } as Record<string, string>)[lang],
      type: 'website',
    },
    alternates: {
      canonical: `https://www.enotarydubai.ae/${lang}/power-of-attorney/real-estate/handover/`,
      languages: {
        ...Object.fromEntries(LANGS.map((l) => [HREFLANG_MAP[l], `https://www.enotarydubai.ae/${l}/power-of-attorney/real-estate/handover/`])),
        'x-default': `https://www.enotarydubai.ae/en/power-of-attorney/real-estate/handover/`,
      },
    },
  }
}

export default async function Page({ params }: Props) {
  const { lang } = await params
  const seo = (getPageContent('/power-of-attorney/real-estate/handover') as any)?.seo
  return (
    <>
      <LegalServiceSchema lang={lang} path="/power-of-attorney/real-estate/handover" />
      <ServicePage
        lang={lang}
        title={seo?.h1}
        description={seo?.meta_description}
        authority={seo?.authority}
        waMessage={(seo?.wa_message?.[lang] ?? seo?.wa_message?.en) as string}
        faqItems={getPageFaq('/power-of-attorney/real-estate/handover')}
        richBlocks={getPageBlocks('/power-of-attorney/real-estate/handover')}
        relatedServices={[
          { href: `/${lang}/power-of-attorney/real-estate/purchase`, label: { en: 'Property Purchase POA', ar: 'وكالة شراء عقار', ru: 'Доверенность на покупку', zh: '房产购买授权书', es: 'POA de Compra de Inmueble' } },
          { href: `/${lang}/power-of-attorney/real-estate`, label: { en: 'Real Estate POA', ar: 'الوكالة العقارية', ru: 'Доверенность на недвижимость', zh: '房地产授权书', es: 'POA Inmobiliario' } },
        ]}
      />
    </>
  )
}
