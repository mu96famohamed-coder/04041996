import type { Metadata } from 'next'
import { LANGS, type Lang, getPageContent, getPageBlocks, getPageFaq, getServiceFaq, HREFLANG_MAP } from '@/lib/i18n'
import ServicePage from '@/components/ServicePage'
import { LegalServiceSchema } from '@/components/SchemaMarkup'
import { relatedFor, breadcrumbFor } from '@/lib/serviceLinks'

interface Props { params: Promise<{ lang: Lang }> }

export async function generateStaticParams() {
  return LANGS.map((l) => ({ lang: l }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const seo = (getPageContent('/rdc-support') as any)?.seo
  return {
    title:       seo?.meta_title?.[lang]       ?? seo?.meta_title?.en,
    description: seo?.meta_description?.[lang] ?? seo?.meta_description?.en,
    openGraph: {
      title:       seo?.meta_title?.[lang]       ?? seo?.meta_title?.en,
      description: seo?.meta_description?.[lang] ?? seo?.meta_description?.en,
      url: `https://www.enotarydubai.ae/${lang}/rdc-support/`,
      siteName: 'E-Notary Dubai',
      locale: ({ en: 'en_US', ar: 'ar_AE', ru: 'ru_RU', zh: 'zh_CN', es: 'es_ES' } as Record<string, string>)[lang],
      type: 'website',
    },
    alternates: {
      canonical: `https://www.enotarydubai.ae/${lang}/rdc-support/`,
      languages: {
        ...Object.fromEntries(LANGS.map((l) => [HREFLANG_MAP[l], `https://www.enotarydubai.ae/${l}/rdc-support/`])),
        'x-default': `https://www.enotarydubai.ae/en/rdc-support/`,
      },
    },
  }
}

export default async function Page({ params }: Props) {
  const { lang } = await params
  const seo = (getPageContent('/rdc-support') as any)?.seo
  let faqItems = getPageFaq('/rdc-support')
  if (faqItems.length === 0) {
    faqItems = getServiceFaq('rdc_support')
  }
  return (
    <>
      <LegalServiceSchema lang={lang} path="/rdc-support" />
      <ServicePage
        lang={lang}
        title={seo?.h1}
        description={seo?.meta_description}
        authority={seo?.authority}
        waMessage={(seo?.wa_message?.[lang] ?? seo?.wa_message?.en) as string}
        faqItems={faqItems}
        richBlocks={getPageBlocks('/rdc-support')}
        relatedServices={[
          { href: `/${lang}/rdc-support/eviction-case`, label: { en: 'Eviction Case', ar: 'دعوى الإخلاء', ru: 'Дело о выселении', zh: '驱逐诉讼', es: 'Demanda de Desalojo' } },
          { href: `/${lang}/rdc-support/rent-claim`,    label: { en: 'Unpaid Rent Claim', ar: 'المطالبة بالأجرة', ru: 'Взыскание аренды', zh: '追讨拖欠租金', es: 'Alquiler Impagado' } },
          { href: `/${lang}/rdc-support/offer-and-deposit`, label: { en: 'Offer and Deposit', ar: 'العرض والإيداع', ru: 'Оферта и депонирование', zh: '提存申请', es: 'Oferta y Consignación' } },
          { href: `/${lang}/power-of-attorney/court`,    label: { en: 'Court Case POA',      ar: 'وكالة قضائية',     ru: 'Судебная доверенность',     zh: '法院授权书',   es: 'Poder Judicial' } },
        ]}
      breadcrumb={breadcrumbFor(lang, '/rdc-support')}
      />
    </>
  )
}
