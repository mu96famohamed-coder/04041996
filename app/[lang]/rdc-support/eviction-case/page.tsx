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
  const seo = (getPageContent('/rdc-support/eviction-case') as any)?.seo
  return {
    title:       seo?.meta_title?.[lang]       ?? seo?.meta_title?.en,
    description: seo?.meta_description?.[lang] ?? seo?.meta_description?.en,
    openGraph: {
      title:       seo?.meta_title?.[lang]       ?? seo?.meta_title?.en,
      description: seo?.meta_description?.[lang] ?? seo?.meta_description?.en,
      url: `https://www.enotarydubai.ae/${lang}/rdc-support/eviction-case/`,
      siteName: 'E-Notary Dubai',
      locale: ({ en: 'en_US', ar: 'ar_AE', ru: 'ru_RU', zh: 'zh_CN', es: 'es_ES' } as Record<string, string>)[lang],
      type: 'website',
    },
    alternates: {
      canonical: `https://www.enotarydubai.ae/${lang}/rdc-support/eviction-case/`,
      languages: {
        ...Object.fromEntries(LANGS.map((l) => [HREFLANG_MAP[l], `https://www.enotarydubai.ae/${l}/rdc-support/eviction-case/`])),
        'x-default': `https://www.enotarydubai.ae/en/rdc-support/eviction-case/`,
      },
    },
  }
}

export default async function Page({ params }: Props) {
  const { lang } = await params
  const seo = (getPageContent('/rdc-support/eviction-case') as any)?.seo
  return (
    <>
      <LegalServiceSchema lang={lang} path="/rdc-support/eviction-case" />
      <ServicePage
        lang={lang}
        title={seo?.h1}
        description={seo?.meta_description}
        authority={seo?.authority}
        waMessage={(seo?.wa_message?.[lang] ?? seo?.wa_message?.en) as string}
        faqItems={getPageFaq('/rdc-support/eviction-case')}
        richBlocks={getPageBlocks('/rdc-support/eviction-case')}
        hideQrBadge
        preparedStat
        noTimeline
        relatedServices={[
          { href: `/${lang}/legal-notice/eviction`,     label: { en: 'Eviction Notice',     ar: 'إنذار الإخلاء',      ru: 'Уведомление о выселении', zh: '驱逐通知',     es: 'Aviso de Desalojo' } },
          { href: `/${lang}/rdc-support/rent-claim`,    label: { en: 'Unpaid Rent Claim',   ar: 'المطالبة بالأجرة',   ru: 'Взыскание аренды',        zh: '追讨拖欠租金', es: 'Alquiler Impagado' } },
          { href: `/${lang}/rdc-support`,               label: { en: 'RDC Support',         ar: 'مركز فض المنازعات الإيجارية', ru: 'Поддержка RDC',  zh: 'RDC支持',      es: 'Apoyo RDC' } },
        ]}
      />
    </>
  )
}
