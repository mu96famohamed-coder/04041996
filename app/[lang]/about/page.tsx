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
      languages: {
        ...Object.fromEntries(LANGS.map((l) => [HREFLANG_MAP[l], `https://www.enotarydubai.ae/${l}/about/`])),
        'x-default': `https://www.enotarydubai.ae/en/about/`,
      },
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
  what_p:   { en: 'E-Notary Dubai prepares documents and coordinates the relevant notary, attestation, translation and filing process. Where official notarization or attestation is required, approval is issued by the competent authority or licensed provider — not by E-Notary Dubai. We are not a law firm and do not provide legal advice.', ar: 'E-Notary Dubai تُعد المستندات وتنسق مسار التوثيق أو التصديق أو الترجمة أو التقديم المناسب. وعندما يلزم اعتماد رسمي، يصدر من الجهة المختصة أو مقدم الخدمة المرخص — وليس من E-Notary Dubai. لسنا مكتب محاماة ولا نقدم استشارات قانونية.', ru: 'E-Notary Dubai готовит документы и координирует соответствующие нотариальные, аттестационные, переводческие и подачные процедуры. Официальное заверение или аттестация выдаётся компетентным органом или лицензированным провайдером, а не E-Notary Dubai. Мы не юридическая фирма и не даём юридических консультаций.', zh: 'E-Notary Dubai 负责文件准备，并协调相应的公证、认证、翻译及提交流程。需要官方批准时，由主管机关或持牌服务方作出，而不是由 E-Notary Dubai 作出。我们不是律师事务所，也不提供法律意见。', es: 'E-Notary Dubai prepara documentos y coordina la vía de notarización, atestación, traducción y presentación que corresponda. La aprobación oficial la emite la autoridad competente o proveedor autorizado, no E-Notary Dubai. No somos un bufete ni prestamos asesoramiento jurídico.' },
  why_h:    { en: 'Why E-Notary Dubai?', ar: 'لماذا E-Notary Dubai؟', ru: 'Почему E-Notary Dubai?', zh: '为什么选择E-Notary Dubai？', es: '¿Por qué E-Notary Dubai?' },
  cta_h:    { en: 'Ready to Start?', ar: 'مستعد للبدء؟', ru: 'Готовы начать?', zh: '准备好开始了吗？', es: '¿Listo para Comenzar?' },
  cta_p:    { en: 'WhatsApp us — tell us what you need and we will review the request, quote and estimated timeline for the service.', ar: 'راسلنا على واتساب — أخبرنا بما تحتاج، وسنراجع الطلب ونوضح عرض السعر والمدة التقديرية بحسب الخدمة.', ru: 'Напишите нам в WhatsApp — расскажите, что нужно, и мы проверим запрос, расчёт и ориентировочный срок.', zh: '通过WhatsApp告诉我们您的需求，我们会审核请求并说明报价和预计时间。', es: 'Escríbanos por WhatsApp — díganos qué necesita y revisaremos la solicitud, cotización y plazo estimado.' },
  wa_btn:   { en: 'Start on WhatsApp', ar: 'ابدأ عبر واتساب', ru: 'Начать в WhatsApp', zh: '通过WhatsApp开始', es: 'Iniciar en WhatsApp' },
}

const WHY_POINTS = [
  { en: 'Priority preparation for urgent files — official completion depends on the competent authority', ar: 'أولوية في تجهيز الملفات العاجلة — والإنجاز الرسمي يعتمد على الجهة المختصة', ru: 'Приоритетная подготовка срочных файлов — официальные сроки зависят от компетентного органа', zh: '紧急文件可优先准备——官方完成时间取决于主管机关', es: 'Preparación prioritaria de expedientes urgentes — la finalización oficial depende de la autoridad' },
  { en: 'Drafted in the correct format for the correct authority', ar: 'صياغة بالصيغة الصحيحة للجهة الصحيحة', ru: 'Составление в правильном формате для нужного органа', zh: '按正确格式为正确机构起草', es: 'Redactados en el formato correcto para la autoridad correcta' },
  { en: 'Remote coordination where the official route permits; some transactions still require in-person steps', ar: 'تنسيق عن بُعد عندما يسمح المسار الرسمي؛ وبعض المعاملات تظل بحاجة إلى حضور شخصي', ru: 'Удалённая координация там, где это допускает официальный маршрут; некоторые сделки требуют личного присутствия', zh: '官方流程允许时可远程协调；部分交易仍需要本人到场', es: 'Coordinación remota cuando la vía oficial lo permite; algunos trámites requieren presencia personal' },
  { en: 'Arabic, English or bilingual preparation according to the transaction and receiving authority', ar: 'إعداد بالعربية أو الإنجليزية أو بصيغة ثنائية اللغة بحسب المعاملة والجهة المستلمة', ru: 'Арабский, английский или двуязычный формат — по требованиям сделки и принимающего органа', zh: '根据交易及接收机关要求采用阿拉伯语、英语或双语格式', es: 'Preparación en árabe, inglés o formato bilingüe según el trámite y la autoridad receptora' },
  { en: 'Documents used before UAE authorities — DLD, RTA, MOFA, Dubai Courts, banks', ar: 'مستندات تُستخدم أمام جهات الإمارات — دائرة الأراضي، هيئة الطرق، الخارجية، محاكم دبي، البنوك', ru: 'Документы используются в органах ОАЭ — DLD, RTA, MOFA, суды Дубая, банки', zh: '文件用于向阿联酋各机构提交——土地局、交通局、外交部、迪拜法院、银行', es: 'Documentos que se utilizan ante las autoridades de los EAU — DLD, RTA, MOFA, Tribunales de Dubái, bancos' },
  { en: 'Fast WhatsApp support — 7 days', ar: 'دعم سريع عبر واتساب — 7 أيام', ru: 'Быстрая поддержка в WhatsApp — 7 дней', zh: 'WhatsApp 快速支持——每周7天', es: 'Soporte rápido por WhatsApp — 7 días' },
  { en: 'Transparent pricing — exact cost confirmed before you proceed', ar: 'أسعار شفافة — التكلفة الدقيقة تُؤكَّد قبل البدء', ru: 'Прозрачные цены — точная стоимость подтверждается до начала', zh: '透明定价——开始前确认精确费用', es: 'Precios transparentes — costo exacto confirmado antes de proceder' },
]

const SERVICES: ({ href?: string } & Record<string, string>)[] = [
  { en: 'All types of Power of Attorney (General, Real Estate, Vehicle, Bank, Court, Corporate)', ar: 'جميع أنواع الوكالات (العامة، العقارية، المركبات، المصرفية، القضائية، وكالات الشركات)', ru: 'Все виды доверенностей (общие, недвижимость, транспорт, банк, суд, корпоративные)', zh: '所有类型授权委托书（一般、房产、车辆、银行、法院、企业）', es: 'Todos los tipos de Poderes Notariales', href: 'power-of-attorney' },
  { en: 'Affidavits and Sworn Statements', ar: 'الإقرارات والتصريحات', ru: 'Аффидевиты и присяжные заявления', zh: '宣誓书及宣誓声明', es: 'Declaraciones Juradas', href: 'affidavit' },
  { en: 'Signature Authentication', ar: 'تصديق التوقيع', ru: 'Удостоверение подписи', zh: '签名认证', es: 'Autenticación de Firma' },
  { en: 'Certified True Copies', ar: 'النسخ طبق الأصل', ru: 'Заверенные копии', zh: '核证副本', es: 'Copias Certificadas', href: 'certified-true-copy' },
  { en: 'Last Will & Testament', ar: 'الوصية الأخيرة', ru: 'Завещание', zh: '遗嘱', es: 'Testamento', href: 'last-will-testament-dubai' },
  { en: 'MOFA Attestation & Embassy Attestation', ar: 'تصديق وزارة الخارجية وتصديق السفارات', ru: 'Легализация МИД и посольств', zh: '外交部认证与使馆认证', es: 'Atestación MOFA y de embajadas', href: 'attestation/mofa' },
  { en: 'Legal Translation (MOJ-registered translator coordination where required)', ar: 'الترجمة القانونية (تنسيق مع مترجم مقيد بوزارة العدل عند الحاجة)', ru: 'Юридический перевод (координация с зарегистрированным переводчиком при необходимости)', zh: '法律翻译（需要时协调司法部注册译员）', es: 'Traducción Legal (coordinación con traductor registrado cuando corresponda)', href: 'legal-translation' },
  { en: 'Eviction Notices (Article 25 compliant, Tableegh delivery)', ar: 'إشعارات الإخلاء (متوافقة مع المادة 25، تسليم عبر تبليغ)', ru: 'Уведомления о выселении (статья 25, доставка Tableegh)', zh: '驱逐通知（符合第25条，经Tableegh送达）', es: 'Avisos de Desalojo (Artículo 25, entrega por Tableegh)', href: 'legal-notice/eviction' },
  { en: 'Legal Notices (all types)', ar: 'الإنذارات القانونية (جميع الأنواع)', ru: 'Юридические уведомления (все виды)', zh: '法律通知（所有类型）', es: 'Notificaciones Legales (todos los tipos)', href: 'legal-notice' },
  { en: 'RDC Support (Rental Disputes Centre)', ar: 'دعم مركز فض المنازعات الإيجارية', ru: 'Поддержка RDC (Центр по арендным спорам)', zh: 'RDC支持（租赁纠纷中心）', es: 'Soporte RDC (Centro de Disputas de Arrendamiento)', href: 'rdc-support' },
  { en: 'Remote E-Notary coordination where the official service permits electronic/video processing', ar: 'تنسيق التوثيق الإلكتروني عن بُعد عندما تسمح الخدمة الرسمية بالإجراء الإلكتروني/المرئي', ru: 'Координация удалённого e-Notary там, где официальный сервис допускает электронную/видео-процедуру', zh: '官方服务允许电子/视频办理时的远程电子公证协调', es: 'Coordinación de E-Notary remoto cuando el servicio oficial permite trámite electrónico/vídeo', href: 'e-notary' },
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
            {SERVICES.map((svc, i) => {
              const inner = (
                <>
                  <span className="text-gold-500 font-bold mt-0.5 shrink-0 text-sm">✓</span>
                  <span className="text-sm text-navy-700 group-hover:text-navy-900">{t(svc, lang)}</span>
                </>
              )
              const cls = "flex items-start gap-2 p-3 rounded-xl border border-navy-100 bg-navy-50 transition-all group"
              // an entry with no href has no page of its own — render it as plain text
              return svc.href ? (
                <Link key={i} href={`/${lang}/${svc.href}`}
                  className={cls + " hover:border-gold-400/40 hover:bg-white"}>
                  {inner}
                </Link>
              ) : (
                <div key={i} className={cls}>{inner}</div>
              )
            })}
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
              en: 'E-Notary Dubai is a document preparation and coordination service — not a law firm or government authority. We do not provide legal advice. Official notarization or attestation is issued by the competent authority or licensed provider. © 2026 E-Notary Dubai · Dubai',
              ar: 'E-Notary Dubai خدمة إعداد وتنسيق مستندات — وليست مكتب محاماة أو جهة حكومية. لا نقدم استشارات قانونية. يصدر التوثيق أو التصديق الرسمي من الجهة المختصة أو مقدم الخدمة المرخص.',
              ru: 'E-Notary Dubai — служба подготовки документов и координации, а не юридическая фирма или государственный орган. Мы не предоставляем юридические консультации. Официальное нотариальное заверение или аттестацию выдаёт компетентный орган или лицензированный провайдер.',
              zh: 'E-Notary Dubai 提供文件准备与流程协调服务，并非律师事务所或政府机关。我们不提供法律意见。正式公证或认证由主管机关或持牌服务方作出。',
              es: 'E-Notary Dubai es un servicio de preparación documental y coordinación, no un bufete ni una autoridad pública. No prestamos asesoramiento jurídico. La notarización o atestación oficial la emite la autoridad competente o un proveedor autorizado.'
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
