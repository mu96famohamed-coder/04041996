import type { Metadata } from 'next'
import Link from 'next/link'
import { LANGS, type Lang, t, site, HREFLANG_MAP, getPageContent } from '@/lib/i18n'
import { LegalServiceSchema } from '@/components/SchemaMarkup'

interface Props { params: Promise<{ lang: Lang }> }
export async function generateStaticParams() { return LANGS.map((l) => ({ lang: l })) }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const seo = (getPageContent('/about') as any)?.seo
  return {
    title: seo?.meta_title?.[lang] ?? seo?.meta_title?.en,
    description: seo?.meta_description?.[lang] ?? seo?.meta_description?.en,
    alternates: {
      canonical: `https://www.enotarydubai.ae/${lang}/about/`,
      'x-default': `https://www.enotarydubai.ae/en/about/`,
        languages: Object.fromEntries(LANGS.map((l) => [HREFLANG_MAP[l], `https://www.enotarydubai.ae/${l}/about/`])),
    },
    openGraph: {
      title: seo?.meta_title?.[lang] ?? seo?.meta_title?.en,
      description: seo?.meta_description?.[lang] ?? seo?.meta_description?.en,
      url: `https://www.enotarydubai.ae/${lang}/about/`,
      siteName: 'E-Notary Dubai',
      locale: ({ en: 'en_US', ar: 'ar_AE', ru: 'ru_RU', zh: 'zh_CN', es: 'es_ES' } as Record<string, string>)[lang],
      type: 'website',
    },
  }
}

const L = {
  h1:       { en: 'About E-Notary Dubai', ar: 'عن E-Notary Dubai', ru: 'О E-Notary Dubai', zh: '关于E-Notary Dubai', es: 'Sobre E-Notary Dubai' },
  sub:      { en: 'Dubai\'s notary facilitation service — not a law firm.', ar: 'خدمة دعم وتنسيق التوثيق في دبي — وليست مكتب محاماة.', ru: 'Служба нотариальной поддержки в Дубае — не юридическая фирма.', zh: '迪拜公证支持与协调服务——非律师事务所。', es: 'Servicio de soporte notarial en Dubái — no es un bufete de abogados.' },
  what_h:   { en: 'What We Do', ar: 'ما نفعله', ru: 'Что мы делаем', zh: '我们的服务', es: 'Qué Hacemos' },
  what_p:   { en: 'E-Notary Dubai prepares and coordinates all document notarizations in the UAE. All actual notarization is performed by licensed UAE Notary Public authorities (Dubai Courts or the UAE Ministry of Justice). We do not provide legal advice — we provide expert document preparation, correct formatting, and full coordination so your documents are prepared correctly for submission.', ar: 'E-Notary Dubai تُعد وتنسق جميع توثيقات المستندات في الإمارات. يُنفَّذ التوثيق الفعلي بواسطة كتّاب العدل المرخصين (محاكم دبي أو وزارة العدل الإماراتية). لا نقدم استشارات قانونية — نقدم إعداد متخصص وتنسيق كامل لتُجهَّز مستنداتك بشكل صحيح للتقديم.', ru: 'E-Notary Dubai готовит и координирует все нотариальные заверения в ОАЭ. Фактическое заверение выполняется лицензированными нотариальными органами ОАЭ. Мы не даем юридических консультаций — мы обеспечиваем профессиональную подготовку документов.', zh: 'E-Notary Dubai准备和协调阿联酋所有文件的公证工作。实际公证由持牌阿联酋公证机构执行。我们不提供法律建议——我们提供专业的文件准备和全程协调。', es: 'E-Notary Dubai prepara y coordina todas las notarizaciones de documentos en los EAU. La notarización real es realizada por autoridades notariales con licencia de los EAU. No proporcionamos asesoramiento legal.' },
  why_h:    { en: 'Why E-Notary Dubai?', ar: 'لماذا E-Notary Dubai؟', ru: 'Почему E-Notary Dubai?', zh: '为什么选择E-Notary Dubai？', es: '¿Por qué E-Notary Dubai?' },
  cta_h:    { en: 'Ready to Start?', ar: 'مستعد للبدء؟', ru: 'Готовы начать?', zh: '准备好开始了吗？', es: '¿Listo para Comenzar?' },
  cta_p:    { en: 'WhatsApp us — tell us what you need, we reply in 5 minutes with the exact cost and timeline.', ar: 'راسلنا على واتساب — أخبرنا بما تحتاج، نرد في 5 دقائق بالتكلفة الدقيقة والجدول الزمني.', ru: 'Напишите нам в WhatsApp — расскажите, что вам нужно, мы ответим за 5 минут.', zh: '通过WhatsApp联系我们——告诉我们您需要什么，我们将在5分钟内回复。', es: 'Escríbanos por WhatsApp — díganos lo que necesita, le respondemos en 5 minutos.' },
  wa_btn:   { en: 'Start on WhatsApp', ar: 'ابدأ عبر واتساب', ru: 'Начать в WhatsApp', zh: '通过WhatsApp开始', es: 'Iniciar en WhatsApp' },
}

const WHY_POINTS = [
  { en: 'Same-day service — most documents done in hours, not days', ar: 'خدمة نفس اليوم — معظم المستندات تُنجز في ساعات لا أيام', ru: 'Услуга в тот же день — большинство документов за часы', zh: '当日服务——大多数文件数小时内完成', es: 'Servicio el mismo día — la mayoría de los documentos en horas' },
  { en: 'Drafted in the correct format for the correct authority', ar: 'صياغة بالصيغة الصحيحة للجهة الصحيحة', ru: 'Составление в правильном формате для нужного органа', zh: '按正确格式为正确机构起草', es: 'Redactados en el formato correcto para la autoridad correcta' },
  { en: 'Fully remote — no office visits required, service from anywhere in the world', ar: 'خدمة عن بُعد بالكامل — لا زيارات مكتبية، الخدمة من أي مكان في العالم', ru: 'Полностью удалённо — без визитов в офис, обслуживание по всему миру', zh: '全程远程——无需到访，全球均可服务', es: 'Totalmente remoto — sin visitas a la oficina, servicio desde cualquier lugar' },
  { en: 'Bilingual Arabic/English — all documents in both languages as required by UAE law', ar: 'ثنائي اللغة عربي/إنجليزي — جميع المستندات بالغتين كما يشترط القانون الإماراتي', ru: 'Двуязычность арабский/английский — все документы по закону ОАЭ', zh: '阿英双语——按阿联酋法律要求提供双语文件', es: 'Bilingüe árabe/inglés — documentos en ambos idiomas según la ley de los EAU' },
  { en: 'Documents used before UAE authorities — DLD, RTA, MOFA, Dubai Courts, banks', ar: 'مستندات تُستخدم أمام جهات الإمارات — دائرة الأراضي، هيئة الطرق، الخارجية، محاكم دبي، البنوك', ru: 'Документы используются в органах ОАЭ — DLD, RTA, MOFA, суды Дубая, банки', zh: '文件用于向阿联酋各机构提交——土地局、交通局、外交部、迪拜法院、银行', es: 'Documentos que se utilizan ante las autoridades de los EAU — DLD, RTA, MOFA, Tribunales de Dubái, bancos' },
  { en: 'WhatsApp support 7 days — we reply in 5 minutes', ar: 'دعم واتساب 7 أيام — نرد في 5 دقائق', ru: 'WhatsApp поддержка 7 дней — отвечаем за 5 минут', zh: 'WhatsApp全天候7日支持——5分钟内回复', es: 'Soporte por WhatsApp 7 días — respondemos en 5 minutos' },
  { en: 'Transparent pricing — exact cost confirmed before you proceed', ar: 'أسعار شفافة — التكلفة الدقيقة تُؤكَّد قبل البدء', ru: 'Прозрачные цены — точная стоимость подтверждается до начала', zh: '透明定价——开始前确认精确费用', es: 'Precios transparentes — costo exacto confirmado antes de proceder' },
]

const SERVICES = [
  { en: 'All types of Power of Attorney (General, Real Estate, Vehicle, Bank, Court, Corporate)', ar: 'جميع أنواع الوكالات (العامة، العقارية، المركبات، المصرفية، القضائية، الشركاتية)', ru: 'Все виды доверенностей (общие, недвижимость, транспорт, банк, суд, корпоративные)', zh: '所有类型授权委托书（一般、房产、车辆、银行、法院、企业）', es: 'Todos los tipos de Poderes Notariales', href: 'power-of-attorney' },
  { en: 'Affidavits and Sworn Statements', ar: 'الإقرارات والتصريحات', ru: 'Аффидевиты и присяжные заявления', zh: '宣誓书及宣誓声明', es: 'Declaraciones Juradas', href: 'affidavit' },
  { en: 'Signature Authentication', ar: 'تصديق التوقيع', ru: 'Удостоверение подписи', zh: '签名认证', es: 'Autenticación de Firma', href: 'signature-notarization' },
  { en: 'Certified True Copies', ar: 'النسخ طبق الأصل', ru: 'Заверенные копии', zh: '核证副本', es: 'Copias Certificadas', href: 'certified-true-copy' },
  { en: 'Last Will & Testament', ar: 'الوصية الأخيرة', ru: 'Завещание', zh: '遗嘱', es: 'Testamento', href: 'last-will-testament-dubai' },
  { en: 'MOFA Attestation & Embassy Attestation', ar: 'تصديق وزارة الخارجية وتصديق السفارات', ru: 'Легализация МИД и посольств', zh: '外交部认证与使馆认证', es: 'Atestación MOFA y de embajadas', href: 'attestation/mofa' },
  { en: 'Legal Translation (certified & court-accepted)', ar: 'الترجمة القانونية (معتمدة ومقبولة للمحاكم)', ru: 'Юридический перевод (сертифицированный, принимаемый судами)', zh: '法律翻译（认证且获法院接受）', es: 'Traducción Legal (certificada y aceptada por tribunales)', href: 'legal-translation' },
  { en: 'Eviction Notices (Article 25 compliant, Tableegh delivery)', ar: 'إشعارات الإخلاء (متوافقة مع المادة 25، تسليم عبر تبليغ)', ru: 'Уведомления о выселении (статья 25, доставка Tableegh)', zh: '驱逐通知（符合第25条，经Tableegh送达）', es: 'Avisos de Desalojo (Artículo 25, entrega por Tableegh)', href: 'legal-notice/eviction' },
  { en: 'Legal Notices (all types)', ar: 'الإنذارات القانونية (جميع الأنواع)', ru: 'Юридические уведомления (все виды)', zh: '法律通知（所有类型）', es: 'Notificaciones Legales (todos los tipos)', href: 'legal-notice' },
  { en: 'RDC Support (Rental Disputes Centre)', ar: 'دعم مركز فض النزاعات الإيجارية', ru: 'Поддержка RDC (Центр по арендным спорам)', zh: 'RDC支持（租赁纠纷中心）', es: 'Soporte RDC (Centro de Disputas de Arrendamiento)', href: 'rdc-support' },
  { en: 'Remote E-Notary via video call (Dubai Courts approved)', ar: 'التوثيق الإلكتروني عن بُعد (معتمد من محاكم دبي)', ru: 'Удалённый е-нотариус по видеосвязи (одобрено Dubai Courts)', zh: '远程视频公证（迪拜法院认可）', es: 'E-Notario Remoto por videollamada (aprobado por Dubai Courts)', href: 'e-notary' },
  { en: 'Corporate Documents (MOA, Board Resolutions, Share Transfers)', ar: 'مستندات الشركات (عقد التأسيس، قرارات مجلس الإدارة، نقل الحصص)', ru: 'Корпоративные документы (MOA, решения совета, передача акций)', zh: '企业文件（章程、董事会决议、股权转让）', es: 'Documentos Corporativos (MOA, Resoluciones del Directorio, Transferencias)', href: 'corporate/board-resolution' },
]

export default async function AboutPage({ params }: Props) {
  const { lang } = await params
  const waUrl = `https://wa.me/${site.phone.replace(/\D/g,'')}?text=${encodeURIComponent('I need notary support in Dubai')}`

  return (
    <div className="bg-white">
      <LegalServiceSchema lang={lang} path="/about" />
      {/* Hero */}
      <div className="hero-bg py-14">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-navy-700 flex items-center justify-center">
              <span className="font-serif font-bold text-gold-400 text-2xl">P</span>
            </div>
            <div>
              <div className="font-serif font-bold text-white text-xl">E-Notary Dubai</div>
              <div className="text-xs text-navy-400 uppercase tracking-widest">LICENSED NOTARY SUPPORT · DUBAI</div>
            </div>
          </div>
          <h1 className="font-serif text-3xl font-bold text-white sm:text-4xl mb-4">{t(L.h1, lang)}</h1>
          <p className="text-navy-300 text-base leading-relaxed max-w-2xl">{t(L.sub, lang)}</p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 lg:px-8 py-14 space-y-14">
        {/* What we do */}
        <div>
          <h2 className="gold-line font-serif text-2xl font-bold text-navy-900 mb-6 inline-block">{t(L.what_h, lang)}</h2>
          <p className="text-navy-600 leading-relaxed mb-6">{t(L.what_p, lang)}</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {SERVICES.map((svc, i) => (
              <Link key={i} href={`/${lang}/${svc.href}`}
                className="flex items-start gap-2 p-3 rounded-xl border border-navy-100 hover:border-gold-400/40 bg-navy-50 hover:bg-white transition-all group">
                <span className="text-gold-500 font-bold mt-0.5 shrink-0 text-sm">✓</span>
                <span className="text-sm text-navy-700 group-hover:text-navy-900">{t(svc, lang)}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Why E-Notary Dubai */}
        <div>
          <h2 className="gold-line font-serif text-2xl font-bold text-navy-900 mb-6 inline-block">{t(L.why_h, lang)}</h2>
          <div className="space-y-3">
            {WHY_POINTS.map((p, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-navy-50 rounded-xl border border-navy-100">
                <span className="text-gold-500 font-bold mt-0.5 shrink-0">✓</span>
                <p className="text-sm text-navy-700 leading-relaxed">{t(p, lang)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
          <p className="text-amber-800 text-sm leading-relaxed">
            {t({
              en: 'E-Notary Dubai is a document preparation and coordination service — not a law firm. We do not provide legal advice. All notarization is performed by UAE-licensed Notary Public authorities. © 2026 E-Notary Dubai · Dubai',
              ar: 'E-Notary Dubai خدمة إعداد وتنسيق مستندات — وليست مكتب محاماة. لا نقدم استشارات قانونية. يُنفَّذ التوثيق بواسطة كتّاب العدل المرخصين في الإمارات.'
            }, lang)}
          </p>
        </div>

        {/* CTA */}
        <div className="rounded-2xl bg-navy-900 p-10 text-center">
          <h2 className="font-serif text-2xl font-bold text-white mb-3">{t(L.cta_h, lang)}</h2>
          <p className="text-navy-300 text-sm mb-6 max-w-md mx-auto">{t(L.cta_p, lang)}</p>
          <a href={waUrl} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] text-white font-bold px-8 py-3.5 rounded-xl hover:bg-[#20b958] transition-colors text-sm">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884"/>
            </svg>
            {t(L.wa_btn, lang)}
          </a>
        </div>
      </div>
    </div>
  )
}
