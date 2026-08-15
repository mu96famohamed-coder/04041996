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
  const seo = (getPageContent('/rdc-support/bounced-cheque') as any)?.seo
  return {
    title:       seo?.meta_title?.[lang]       ?? seo?.meta_title?.en,
    description: seo?.meta_description?.[lang] ?? seo?.meta_description?.en,
    openGraph: {
      title:       seo?.meta_title?.[lang]       ?? seo?.meta_title?.en,
      description: seo?.meta_description?.[lang] ?? seo?.meta_description?.en,
      url: `https://www.enotarydubai.ae/${lang}/rdc-support/bounced-cheque/`,
      siteName: 'E-Notary Dubai',
      locale: ({ en: 'en_US', ar: 'ar_AE', ru: 'ru_RU', zh: 'zh_CN', es: 'es_ES' } as Record<string, string>)[lang],
      type: 'website',
    },
    alternates: {
      canonical: `https://www.enotarydubai.ae/${lang}/rdc-support/bounced-cheque/`,
      languages: {
        ...Object.fromEntries(LANGS.map((l) => [HREFLANG_MAP[l], `https://www.enotarydubai.ae/${l}/rdc-support/bounced-cheque/`])),
        'x-default': `https://www.enotarydubai.ae/en/rdc-support/bounced-cheque/`,
      },
    },
  }
}

export default async function Page({ params }: Props) {
  const { lang } = await params
  const seo = (getPageContent('/rdc-support/bounced-cheque') as any)?.seo
  return (
    <>
      <LegalServiceSchema lang={lang} path="/rdc-support/bounced-cheque" />
      <ServicePage
        lang={lang}
        title={seo?.h1}
        description={seo?.meta_description}
        authority={seo?.authority}
        waMessage={(seo?.wa_message?.[lang] ?? seo?.wa_message?.en) as string}
        faqItems={getPageFaq('/rdc-support/bounced-cheque')}
        richBlocks={getPageBlocks('/rdc-support/bounced-cheque')}
        hideQrBadge
        preparedStat
        noTimeline
        relatedServices={[
          { href: `/${lang}/rdc-support`,            label: { en: 'RDC Support',        ar: 'مركز فض المنازعات الإيجارية', ru: 'Поддержка RDC',        zh: 'RDC支持',   es: 'Apoyo RDC' } },
          { href: `/${lang}/legal-notice/eviction`,  label: { en: 'Eviction Notice',    ar: 'إنذار الإخلاء',               ru: 'Уведомление о выселении', zh: '驱逐通知', es: 'Aviso de Desalojo' } },
          { href: `/${lang}/power-of-attorney/court`,label: { en: 'Court Case POA',     ar: 'وكالة قضائية',                ru: 'Судебная доверенность',   zh: '法院授权书', es: 'Poder Judicial' } },
        ]}
      />
    </>
  )
}
