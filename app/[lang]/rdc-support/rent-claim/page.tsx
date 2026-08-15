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
  const seo = (getPageContent('/rdc-support/rent-claim') as any)?.seo
  return {
    title:       seo?.meta_title?.[lang]       ?? seo?.meta_title?.en,
    description: seo?.meta_description?.[lang] ?? seo?.meta_description?.en,
    openGraph: {
      title:       seo?.meta_title?.[lang]       ?? seo?.meta_title?.en,
      description: seo?.meta_description?.[lang] ?? seo?.meta_description?.en,
      url: `https://www.enotarydubai.ae/${lang}/rdc-support/rent-claim/`,
      siteName: 'E-Notary Dubai',
      locale: ({ en: 'en_US', ar: 'ar_AE', ru: 'ru_RU', zh: 'zh_CN', es: 'es_ES' } as Record<string, string>)[lang],
      type: 'website',
    },
    alternates: {
      canonical: `https://www.enotarydubai.ae/${lang}/rdc-support/rent-claim/`,
      languages: {
        ...Object.fromEntries(LANGS.map((l) => [HREFLANG_MAP[l], `https://www.enotarydubai.ae/${l}/rdc-support/rent-claim/`])),
        'x-default': `https://www.enotarydubai.ae/en/rdc-support/rent-claim/`,
      },
    },
  }
}

export default async function Page({ params }: Props) {
  const { lang } = await params
  const seo = (getPageContent('/rdc-support/rent-claim') as any)?.seo
  return (
    <>
      <LegalServiceSchema lang={lang} path="/rdc-support/rent-claim" />
      <ServicePage
        lang={lang}
        title={seo?.h1}
        description={seo?.meta_description}
        authority={seo?.authority}
        waMessage={(seo?.wa_message?.[lang] ?? seo?.wa_message?.en) as string}
        faqItems={getPageFaq('/rdc-support/rent-claim')}
        richBlocks={getPageBlocks('/rdc-support/rent-claim')}
        hideQrBadge
        preparedStat
        noTimeline
        relatedServices={[
          { href: `/${lang}/rdc-support/bounced-cheque`, label: { en: 'Bounced Rent Cheque', ar: 'شيك إيجاري مرتجع',  ru: 'Возвращённый чек',        zh: '租金支票退票', es: 'Cheque Devuelto' } },
          { href: `/${lang}/rdc-support/eviction-case`,  label: { en: 'Eviction Case',       ar: 'دعوى الإخلاء',      ru: 'Дело о выселении',        zh: '驱逐诉讼',     es: 'Demanda de Desalojo' } },
          { href: `/${lang}/rdc-support`,                label: { en: 'RDC Support',         ar: 'مركز فض المنازعات الإيجارية', ru: 'Поддержка RDC', zh: 'RDC支持',      es: 'Apoyo RDC' } },
        ]}
      />
    </>
  )
}
