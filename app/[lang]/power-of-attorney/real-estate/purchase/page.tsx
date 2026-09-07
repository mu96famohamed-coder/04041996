import type { Metadata } from 'next'
import { LANGS, type Lang, getPageContent, getPageBlocks, getPageFaq, HREFLANG_MAP } from '@/lib/i18n'
import ServicePage from '@/components/ServicePage'
import { LegalServiceSchema } from '@/components/SchemaMarkup'
import { relatedFor, breadcrumbFor } from '@/lib/serviceLinks'

interface Props { params: Promise<{ lang: Lang }> }

export async function generateStaticParams() {
  return LANGS.map((l) => ({ lang: l }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const seo = (getPageContent('/power-of-attorney/real-estate/purchase') as any)?.seo
  return {
    title:       seo?.meta_title?.[lang]       ?? seo?.meta_title?.en,
    description: seo?.meta_description?.[lang] ?? seo?.meta_description?.en,
    openGraph: {
      title:       seo?.meta_title?.[lang]       ?? seo?.meta_title?.en,
      description: seo?.meta_description?.[lang] ?? seo?.meta_description?.en,
      url: `https://www.enotarydubai.ae/${lang}/power-of-attorney/real-estate/purchase/`,
      siteName: 'E-Notary Dubai',
      locale: ({ en: 'en_US', ar: 'ar_AE', ru: 'ru_RU', zh: 'zh_CN', es: 'es_ES' } as Record<string, string>)[lang],
      type: 'website',
    },
    alternates: {
      canonical: `https://www.enotarydubai.ae/${lang}/power-of-attorney/real-estate/purchase/`,
      languages: {
        ...Object.fromEntries(LANGS.map((l) => [HREFLANG_MAP[l], `https://www.enotarydubai.ae/${l}/power-of-attorney/real-estate/purchase/`])),
        'x-default': `https://www.enotarydubai.ae/en/power-of-attorney/real-estate/purchase/`,
      },
    },
  }
}

export default async function Page({ params }: Props) {
  const { lang } = await params
  const seo = (getPageContent('/power-of-attorney/real-estate/purchase') as any)?.seo
  return (
    <>
      <LegalServiceSchema lang={lang} path="/power-of-attorney/real-estate/purchase" />
      <ServicePage
        lang={lang}
        title={seo?.h1}
        description={seo?.meta_description}
        authority={seo?.authority}
        waMessage={(seo?.wa_message?.[lang] ?? seo?.wa_message?.en) as string}
        faqItems={getPageFaq('/power-of-attorney/real-estate/purchase')}
        richBlocks={getPageBlocks('/power-of-attorney/real-estate/purchase')}
        relatedServices={[
          { href: `/${lang}/power-of-attorney/real-estate/handover`, label: { en: 'Property Handover POA', ar: 'وكالة استلام عقار', ru: 'Доверенность на приёмку', zh: '房产交付授权书', es: 'POA de Entrega de Inmueble' } },
          { href: `/${lang}/power-of-attorney/real-estate/sale`, label: { en: 'Property Sale POA', ar: 'وكالة بيع عقار', ru: 'Доверенность на продажу', zh: '房产出售授权书', es: 'POA de Venta de Inmueble' } },
          { href: `/${lang}/power-of-attorney/real-estate`, label: { en: 'Real Estate POA', ar: 'الوكالة العقارية', ru: 'Доверенность на недвижимость', zh: '房地产授权书', es: 'POA Inmobiliario' } },
        ]}
      breadcrumb={breadcrumbFor(lang, '/power-of-attorney/real-estate/purchase')}
      />
    </>
  )
}
