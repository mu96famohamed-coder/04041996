import Link from 'next/link'
import type { Metadata } from 'next'
import { type Lang, t, services, steps, faq, cta, site, trust_badges, LANGS, getPageContent } from '@/lib/i18n'
import FAQSection from '@/components/FAQSection'
import { FAQSchema, LegalServiceSchema } from '@/components/SchemaMarkup'
import AcceptedByMarquee from '@/components/AcceptedByMarquee'


export async function generateMetadata({ params }: { params: Promise<{ lang: Lang }> }): Promise<Metadata> {
  const { lang } = await params
  const seo = (getPageContent('/') as any)?.seo
  return {
    title: seo?.meta_title?.[lang] ?? seo?.meta_title?.en,
    description: seo?.meta_description?.[lang] ?? seo?.meta_description?.en,
    robots: 'index, follow',
    openGraph: {
      title:       seo?.meta_title?.[lang]       ?? seo?.meta_title?.en,
      description: seo?.meta_description?.[lang] ?? seo?.meta_description?.en,
      url: `https://www.enotarydubai.ae/${lang}/`,
      siteName: 'E-Notary Dubai',
      locale: ({ en: 'en_US', ar: 'ar_AE', ru: 'ru_RU', zh: 'zh_CN', es: 'es_ES' } as Record<string, string>)[lang],
      type: 'website',
    },
    alternates: {
      canonical: `https://www.enotarydubai.ae/${lang}/`,
      languages: {
        'en-AE': 'https://www.enotarydubai.ae/en/',
        'ar-AE': 'https://www.enotarydubai.ae/ar/',
        'ru-AE': 'https://www.enotarydubai.ae/ru/',
        'zh-Hans-AE': 'https://www.enotarydubai.ae/zh/',
        'es-AE': 'https://www.enotarydubai.ae/es/',
        'x-default': 'https://www.enotarydubai.ae/en/',
      },
    },
  }
}

export async function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }))
}

interface Props { params: Promise<{ lang: Lang }> }

const WA_ICON = <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884"/></svg>

const H = {
  h1: { en:'Notary Public Dubai — POA, Attestation & Legal Notices', ar:'كاتب العدل دبي — وكالات، تصديق وإنذارات قانونية', ru:'Нотариальная поддержка в Дубае — доверенности, легализация и уведомления', zh:'迪拜公证支持 — 授权书、认证及法律通知', es:'Soporte Notarial en Dubái — Poderes, Autenticación y Notificaciones' },
  sub: { en:'Professional drafting, notarization, and attestation — same-day, fully online. Trusted by individuals and corporations across the UAE.', ar:'صياغة وتوثيق وتصديق احترافي — في نفس اليوم، أونلاين بالكامل. موثوق به من الأفراد والشركات في جميع أنحاء الإمارات.', ru:'Профессиональное составление, заверение и легализация — в тот же день, полностью онлайн. Доверяют физические и юридические лица по всем ОАЭ.', zh:'专业起草、公证和认证服务——当日完成，全程在线。深受阿联酋个人及企业信赖。', es:'Redacción, notarización y autenticación profesional — el mismo día, totalmente en línea. Con la confianza de particulares y empresas en todo los EAU.' },
  b1: { en:'Same-Day Service', ar:'خدمة نفس اليوم', ru:'В тот же день', zh:'当日服务', es:'Servicio el Mismo Día' },
  b2: { en:'Fully Online', ar:'أونلاين بالكامل', ru:'Полностью онлайн', zh:'全程在线', es:'Totalmente en Línea' },
  b3: { en:'Via Dubai Courts & MOJ', ar:'عبر محاكم دبي ووزارة العدل', ru:'Через Суды Дубая и Минюст', zh:'经迪拜法院与司法部办理', es:'Vía Tribunales de Dubái y MOJ' },
  start: { en:'Start on WhatsApp', ar:'ابدأ عبر واتساب', ru:'Начать в WhatsApp', zh:'通过WhatsApp开始', es:'Iniciar en WhatsApp' },
  all_svc: { en:'View All Services', ar:'جميع الخدمات', ru:'Все услуги', zh:'查看所有服务', es:'Ver Todos los Servicios' },
  accepted: { en:'Authorities We Prepare Documents For', ar:'جهات نُجهّز المستندات لتقديمها إليها', ru:'Органы, для которых мы готовим документы', zh:'我们为以下机构准备文件', es:'Autoridades para las que preparamos documentos' },
  poa_h: { en:'Power of Attorney', ar:'خدمات الوكالة الرسمية', ru:'Доверенность (POA)', zh:'授权委托书', es:'Poder Notarial (POA)' },
  poa_s: { en:'All types — drafted, notarized, delivered same day', ar:'جميع الأنواع — صياغة وتوثيق وتسليم في نفس اليوم', ru:'Все виды — составление, заверение и доставка в тот же день', zh:'所有类型——当日起草、公证并送达', es:'Todos los tipos — redactados, notarizados y entregados el mismo día' },
  all_poa: { en:'View all POA types →', ar:'← جميع أنواع الوكالات', ru:'Все виды доверенностей →', zh:'查看所有授权类型 →', es:'Ver todos los tipos de POA →' },
  corp_h: { en:'Corporate & Commercial Documents', ar:'مستندات الشركات والتجارة', ru:'Корпоративные и коммерческие документы', zh:'企业及商业文件', es:'Documentos Corporativos y Comerciales' },
  corp_s: { en:'Company formation, governance, and restructuring documents — notarized same day', ar:'مستندات تأسيس الشركات والحوكمة وإعادة الهيكلة — توثيق في نفس اليوم', ru:'Документы для регистрации, управления и реструктуризации компаний — заверение в тот же день', zh:'公司成立、治理及重组文件——当日公证', es:'Documentos de constitución, gobernanza y reestructuración empresarial — notarizados el mismo día' },
  all_corp: { en:'View all corporate services →', ar:'← جميع خدمات الشركات', ru:'Все корпоративные услуги →', zh:'查看所有企业服务 →', es:'Ver todos los servicios corporativos →' },
  attest_h: { en:'Attestation & Authentication', ar:'التصديق والمصادقة', ru:'Легализация и аутентификация', zh:'认证与鉴证', es:'Autenticación y Legalización' },
  tenancy_h: { en:'Tenancy & Legal Notices', ar:'الإيجار والإنذارات القانونية', ru:'Аренда и юридические уведомления', zh:'租赁及法律通知', es:'Arrendamiento y Notificaciones Legales' },
  remote_h: { en:'Remote & Online Services', ar:'الخدمات عن بُعد وأونلاين', ru:'Удалённые и онлайн услуги', zh:'远程及在线服务', es:'Servicios Remotos y en Línea' },
  mobile_t: { en:'Mobile Notary', ar:'كاتب عدل متنقل', ru:'Выездной нотариус', zh:'上门公证服务', es:'Notario Móvil' },
  mobile_d: { en:'We come to your home, office, or hotel in Dubai.', ar:'نأتي إلى منزلك أو مكتبك أو فندقك في دبي.', ru:'Мы приедем к вам домой, в офис или отель в Дубае.', zh:'我们上门前往您在迪拜的住所、办公室或酒店。', es:'Vamos a su hogar, oficina u hotel en Dubái.' },
  how_h: { en:'How It Works — 5 Steps, Fully Online', ar:'كيف تسير المعاملة — 5 خطوات أونلاين', ru:'Как это работает — 5 шагов, онлайн', zh:'服务流程 — 5个步骤，全程在线', es:'Cómo Funciona — 5 Pasos, en Línea' },
  how_s: { en:'From document submission to delivery — you approve the draft before we notarize anything.', ar:'من تقديم المستندات حتى التسليم — توافق على المسودة قبل أي توثيق.', ru:'От подачи до доставки — вы утверждаете черновик перед заверением.', zh:'从文件提交到交付——公证前须先确认草稿。', es:'Desde la presentación hasta la entrega — aprueba el borrador antes de que notaricemos.' },
  wnp_h: { en:'What Is a Notary Public in Dubai?', ar:'من هو كاتب العدل في دبي؟', ru:'Кто такой нотариус в Дубае?', zh:'什么是迪拜公证人？', es:'¿Qué Es un Notario Público en Dubái?' },
  wnp_a: { en:'A Notary Public in Dubai is a government official who verifies the identities of signatories and notarizes legal documents such as powers of attorney, affidavits and contracts. A notary does not give legal advice. Notarization happens through Dubai Courts or the UAE Ministry of Justice via a video call. E-Notary Dubai is a notary support service: we draft your document and prepare it for that appointment.', ar:'كاتب العدل في دبي موظف حكومي يختص بالتحقق من هويات الموقِّعين وتوثيق الوثائق القانونية مثل الوكالات والإقرارات والعقود، ولا يقدّم استشارات قانونية. يتم التوثيق عبر محاكم دبي أو وزارة العدل الإماراتية بمكالمة فيديو. وE-Notary Dubai خدمة دعم توثيق: نصيغ مستندك ونجهّزه لهذا الموعد.', ru:'Нотариус в Дубае — государственный служащий, который проверяет личности подписантов и заверяет юридические документы: доверенности, аффидевиты, договоры. Юридических консультаций он не даёт. Заверение проходит по видеозвонку через Суды Дубая или Министерство юстиции ОАЭ. E-Notary Dubai — служба нотариальной поддержки: мы составляем документ и готовим его к этой встрече.', zh:'迪拜的公证人是政府官员，负责核实签署人身份并对授权委托书、宣誓书、合同等法律文件进行公证，但不提供法律建议。公证通过迪拜法院或阿联酋司法部的视频通话完成。E-Notary Dubai 是公证支持服务：我们起草您的文件并为该环节做好准备。', es:'Un Notario Público en Dubái es un funcionario gubernamental que verifica las identidades de los firmantes y notariza documentos legales como poderes notariales, declaraciones juradas y contratos; no presta asesoramiento legal. La notarización se realiza a través de los Tribunales de Dubái o el Ministerio de Justicia de los EAU mediante videollamada. E-Notary Dubai es un servicio de apoyo notarial: redactamos su documento y lo preparamos para esa cita.' },
  faq_h: { en:'Frequently Asked Questions', ar:'الأسئلة الشائعة', ru:'Часто задаваемые вопросы', zh:'常见问题', es:'Preguntas Frecuentes' },
  faq_all: { en:'View all FAQs', ar:'عرض كل الأسئلة', ru:'Все вопросы', zh:'查看所有常见问题', es:'Ver todas las preguntas' },
  now5: { en:'Start Now — Reply in 5 Minutes', ar:'ابدأ الآن — رد خلال 5 دقائق', ru:'Начать — ответ за 5 минут', zh:'立即开始 — 5分钟内回复', es:'Comenzar — Respuesta en 5 Minutos' },
  same_day: { en:'Same-Day', ar:'نفس اليوم', ru:'День в день', zh:'当日', es:'Mismo Día' },
}

const UNIFIED_CARD_STYLE = 'from-slate-500/10 to-slate-500/5 border-slate-200 hover:border-slate-300'
const POA_COLORS = [UNIFIED_CARD_STYLE]
const CORP_COLORS = [UNIFIED_CARD_STYLE]

const CORP_SERVICES = [
  { slug: 'moa', en: 'MOA Notarization', ar: 'توثيق عقد التأسيس', ru: 'Нотариальное заверение MOA', zh: 'MOA公证', es: 'Notarización de MOA', desc_en: 'Company formation & DED registration', desc_ar: 'تأسيس الشركة وتسجيل DED', desc_ru: 'Регистрация компании в DED', desc_es: 'Constitución y registro DED' },
  { slug: 'board-resolution', en: 'Board Resolution', ar: 'قرار مجلس الإدارة', ru: 'Решение совета директоров', zh: '董事会决议', es: 'Resolución del Directorio', desc_en: 'Bank account opening & signatory authority', desc_ar: 'فتح حساب بنكي وصلاحيات التوقيع', desc_ru: 'Открытие счёта и полномочия подписи', desc_es: 'Apertura de cuenta y autoridad de firma' },
  { slug: 'moa-amendment', en: 'MOA Amendment', ar: 'تعديل عقد التأسيس', ru: 'Поправка к MOA', zh: 'MOA修订', es: 'Enmienda al MOA', desc_en: 'Change name, activities, capital or shareholders', desc_ar: 'تغيير الاسم أو الأنشطة أو رأس المال أو المساهمين', desc_ru: 'Изменение названия, деятельности, капитала', desc_es: 'Cambio de nombre, actividades, capital' },
  { slug: 'share-transfer', en: 'Share Transfer', ar: 'نقل الحصص', ru: 'Передача акций', zh: '股权转让', es: 'Transferencia de Acciones', desc_en: 'Transfer of ownership between shareholders', desc_ar: 'نقل الملكية بين المساهمين', desc_ru: 'Переход прав собственности между акционерами', desc_es: 'Transferencia de propiedad entre accionistas' },
  { slug: 'shareholder-agreement', en: 'Shareholder Agreement', ar: 'اتفاقية المساهمين', ru: 'Акционерное соглашение', zh: '股东协议', es: 'Acuerdo de Accionistas', desc_en: 'Rights, dividends, exit clauses & disputes', desc_ar: 'الحقوق والأرباح وبنود الخروج والنزاعات', desc_ru: 'Права, дивиденды, выход и споры', desc_es: 'Derechos, dividendos, salida y disputas' },
  { slug: 'liquidation', en: 'Company Liquidation', ar: 'تصفية الشركة', ru: 'Ликвидация компании', zh: '公司清算', es: 'Liquidación de Empresa', desc_en: 'Closure, deregistration & final settlement', desc_ar: 'إغلاق الشركة وشطبها والتسوية النهائية', desc_ru: 'Закрытие, дерегистрация, расчёты', desc_es: 'Cierre, baja y liquidación final' },
  { slug: 'contract', en: 'Commercial Contract', ar: 'عقد تجاري', ru: 'Коммерческий договор', zh: '商业合同', es: 'Contrato Comercial', desc_en: 'Service agreements & business partnerships', desc_ar: 'اتفاقيات الخدمات والشراكات التجارية', desc_ru: 'Договоры услуг и деловые партнёрства', desc_es: 'Acuerdos de servicio y asociaciones comerciales' },
]

// Services with live pages that had no card in the homepage body.
// Card copy is condensed from each page's own meta description.

// RDC case-type pages — own homepage section.
const RDC_SERVICES = [
  { href: 'rdc-support/eviction-case',
    t: { en:'Eviction Case', ar:'دعوى الإخلاء', ru:'Дело о выселении', zh:'驱逐案件', es:'Caso de Desalojo' },
    d: { en:'Notice period expired and the tenant has not vacated. We prepare the case file and register it.', ar:'انتهت مهلة الإنذار ولم يُخلِ المستأجر. نجهّز ملف الدعوى ونقيّده.', ru:'Срок уведомления истёк, а арендатор не съехал. Готовим дело и регистрируем его.', zh:'通知期已届满而租客未搬离。我们备妥案卷并办理立案。', es:'El plazo del aviso venció y el inquilino no ha desalojado. Preparamos el expediente y lo registramos.' } },
  { href: 'rdc-support/rent-claim',
    t: { en:'Unpaid Rent Claim', ar:'المطالبة بالأجرة المتأخرة', ru:'Иск о задолженности по аренде', zh:'欠租索赔', es:'Reclamación de Alquiler Impagado' },
    d: { en:'A financial claim at the RDC does not need a notarized notice. We prepare the claim and its documents.', ar:'المطالبة المالية أمام المركز لا تستلزم إنذاراً عدلياً. نجهّز الدعوى ومستنداتها.', ru:'Денежный иск в RDC не требует нотариального уведомления. Готовим иск и документы.', zh:'向租赁纠纷中心提出金钱请求无需经公证的通知。我们备妥诉状与证据。', es:'Una reclamación económica ante el RDC no requiere aviso notarizado. Preparamos la demanda y sus documentos.' } },
  { href: 'rdc-support/bounced-cheque',
    t: { en:'Bounced Rental Cheque', ar:'الشيك الإيجاري المرتجع', ru:'Возвращённый арендный чек', zh:'租金退票', es:'Cheque de Alquiler Devuelto' },
    d: { en:'The RDC registers a cheque execution file to collect its value. We prepare the documents and submit it.', ar:'يقيّد المركز ملف تنفيذ الشيكات المرتجعة لتحصيل قيمتها. نجهّز المستندات ونقدّمها.', ru:'RDC открывает исполнительное дело по чеку для взыскания его суммы. Готовим документы и подаём.', zh:'租赁纠纷中心可就退票立执行案卷以追收票款。我们备妥文件并提交。', es:'El RDC registra un expediente de ejecución del cheque para cobrar su importe. Preparamos los documentos y lo presentamos.' } },
  { href: 'rdc-support/execution',
    t: { en:'Enforcing a Judgment', ar:'تنفيذ الأحكام الإيجارية', ru:'Исполнение решения', zh:'判决执行', es:'Ejecución de Sentencia' },
    d: { en:'A judgment nobody enforces changes nothing. We open the execution file and follow it through.', ar:'الحكم الذي لا يُنفَّذ لا يغيّر شيئاً. نفتح ملف التنفيذ ونتابعه حتى النهاية.', ru:'Неисполненное решение ничего не меняет. Открываем исполнительное дело и ведём его до конца.', zh:'无人执行的判决毫无意义。我们开立执行案卷并跟进到底。', es:'Una sentencia que nadie ejecuta no cambia nada. Abrimos el expediente de ejecución y lo seguimos.' } },
  { href: 'rdc-support/e-requests',
    t: { en:'Execution E-Requests', ar:'الطلبات الإلكترونية للتنفيذ', ru:'Электронные ходатайства', zh:'执行电子申请', es:'Solicitudes Electrónicas' },
    d: { en:'An execution file that sits still collects nothing. We prepare the e-requests and follow them.', ar:'ملف التنفيذ الساكن لا يحصّل شيئاً. نعِدّ الطلبات الإلكترونية ونتابعها.', ru:'Стоящее исполнительное дело ничего не взыщет. Готовим электронные ходатайства и ведём их.', zh:'停滞的执行案卷收不回任何款项。我们备妥电子申请并跟进。', es:'Un expediente de ejecución detenido no cobra nada. Preparamos las solicitudes electrónicas y las seguimos.' } },
  { href: 'rdc-support/contract-renewal',
    t: { en:'Tenancy Renewal Case', ar:'دعوى تجديد عقد الإيجار', ru:'Дело о продлении аренды', zh:'租约续期案件', es:'Caso de Renovación de Alquiler' },
    d: { en:'Renewal is a first-instance claim at the RDC and the judgment is enforceable. We review and prepare the file.', ar:'التجديد دعوى ابتدائية أمام المركز، والحكم الصادر بها قابل للتنفيذ. ندرس الملف ونجهّزه.', ru:'Продление — иск первой инстанции в RDC, решение подлежит исполнению. Изучаем и готовим дело.', zh:'续期属于租赁纠纷中心的一审案件，判决可强制执行。我们审阅并备妥案卷。', es:'La renovación es una demanda de primera instancia ante el RDC y la sentencia es ejecutable. Revisamos y preparamos el expediente.' } },
  { href: 'rdc-support/tenant-defence',
    t: { en:'Defending a Case', ar:'الرد على دعوى مرفوعة ضدك', ru:'Защита по делу', zh:'案件应诉', es:'Defensa de un Caso' },
    d: { en:'The reply is built from documents, not statements. We review the file and prepare the response.', ar:'الرد يُبنى على مستندات لا على أقوال. نراجع الملف ونجهّز الرد ومرفقاته.', ru:'Возражение строится на документах, а не на заявлениях. Изучаем дело и готовим ответ.', zh:'答辩须以文件为据，而非口头陈述。我们审阅案卷并备妥答辩及附件。', es:'La respuesta se construye con documentos, no con declaraciones. Revisamos el expediente y preparamos la contestación.' } },
  { href: 'rdc-support/urgent-orders',
    t: { en:'Urgent Petition Orders', ar:'الأوامر على العرائض', ru:'Срочные обеспечительные меры', zh:'紧急申请令', es:'Órdenes Urgentes' },
    d: { en:'Utilities cut off or damage that needs recording. A petition order is an interim measure binding on both sides.', ar:'انقطاع المرافق أو أضرار تحتاج إثباتاً. الأمر على عريضة إجراء وقتي ملزم للطرفين.', ru:'Отключены коммуникации или нужен акт об ущербе. Приказ по заявлению — обеспечительная мера для обеих сторон.', zh:'公用服务被切断或损害需固定证据。申请令是对双方均有约束力的临时措施。', es:'Suministros cortados o daños que deben acreditarse. La orden por petición es una medida provisional vinculante para ambas partes.' } },
  { href: 'rdc-support/offer-and-deposit',
    t: { en:'Offer and Deposit', ar:'العرض والإيداع', ru:'Предложение и депонирование', zh:'提存与交付', es:'Oferta y Consignación' },
    d: { en:'Landlord refusing your rent or cheques. The request puts the rent or the keys before the RDC judge.', ar:'المؤجر يرفض استلام الأجرة أو الشيكات. الطلب يعرض الأجرة أو المفاتيح على قاضي المركز.', ru:'Арендодатель отказывается принять плату или чеки. Заявление передаёт аренду или ключи судье RDC.', zh:'房东拒收租金或支票。该申请将租金或钥匙提交租赁纠纷中心法官。', es:'El propietario rechaza su alquiler o cheques. La solicitud pone el alquiler o las llaves ante el juez del RDC.' } },
]

// Sub-pages under existing sections that had no card.
const EXTRA_POA2 = [
  { href: 'power-of-attorney/real-estate/sale',
    t: { en:'Property Sale POA', ar:'وكالة بيع عقار', ru:'Доверенность на продажу', zh:'房产出售授权书', es:'POA de Venta de Inmueble' },
    d: { en:'Your agent signs Form F, transfers at the DLD and hands you the Title Deed.', ar:'وكيلك يوقّع النموذج F وينقل الملكية لدى دائرة الأراضي ويسلّمك سند الملكية.', ru:'Поверенный подписывает Форму F, оформляет переход в DLD и передаёт вам титул.', zh:'代理人签署F表格、在土地局办理过户并将产权证书交付给您。', es:'Su agente firma el Formulario F, transfiere en el DLD y le entrega la escritura.' } },
  { href: 'power-of-attorney/real-estate/purchase',
    t: { en:'Property Purchase POA', ar:'وكالة شراء عقار', ru:'Доверенность на покупку', zh:'房产购买授权书', es:'POA de Compra de Inmueble' },
    d: { en:'Your agent signs the SPA, registers at the DLD and collects the Title Deed in your name.', ar:'وكيلك يوقّع عقد البيع ويسجّل لدى دائرة الأراضي ويستلم سند الملكية باسمك.', ru:'Поверенный подписывает SPA, регистрирует в DLD и получает титул на ваше имя.', zh:'代理人签署买卖合同、在土地局登记并以您的名义领取产权证书。', es:'Su agente firma el SPA, registra en el DLD y recoge la escritura a su nombre.' } },
  { href: 'power-of-attorney/real-estate/management',
    t: { en:'Property Management POA', ar:'وكالة إدارة عقار', ru:'Доверенность на управление', zh:'房产管理授权书', es:'POA de Gestión de Inmueble' },
    d: { en:'Ejari leases, rent collection into your account, tenants and disputes.', ar:'توقيع عقود إيجاري، وتحصيل الإيجار وإيداعه في حسابك، ومتابعة المستأجرين والمنازعات.', ru:'Договоры Ejari, сбор арендной платы на ваш счёт, арендаторы и споры.', zh:'Ejari 租约、收租入账、租客与纠纷处理。', es:'Contratos Ejari, cobro del alquiler en su cuenta, inquilinos y disputas.' } },
  { href: 'power-of-attorney/vehicle/sale',
    t: { en:'Vehicle Sale POA', ar:'وكالة بيع مركبة', ru:'Доверенность на продажу авто', zh:'车辆出售授权书', es:'POA de Venta de Vehículo' },
    d: { en:'Drafted for RTA ownership transfer procedures.', ar:'مُعدّة لإجراءات نقل الملكية لدى هيئة الطرق والمواصلات.', ru:'Составляется для процедур переоформления в RTA.', zh:'为道路交通局过户手续起草。', es:'Redactado para los trámites de transferencia de titularidad ante la RTA.' } },
  { href: 'power-of-attorney/vehicle/management',
    t: { en:'Vehicle Management POA', ar:'وكالة إدارة مركبة', ru:'Доверенность на управление авто', zh:'车辆管理授权书', es:'POA de Gestión de Vehículo' },
    d: { en:'Covers registration, fine payments and RTA transactions.', ar:'تغطي التسجيل ودفع المخالفات ومعاملات هيئة الطرق والمواصلات.', ru:'Охватывает регистрацию, оплату штрафов и операции в RTA.', zh:'涵盖登记、缴纳罚款及道路交通局各项业务。', es:'Cubre matriculación, pago de multas y trámites ante la RTA.' } },
  { href: 'power-of-attorney/vehicle/export',
    t: { en:'Vehicle Export POA', ar:'وكالة تصدير مركبة', ru:'Доверенность на экспорт авто', zh:'车辆出口授权书', es:'POA de Exportación de Vehículo' },
    d: { en:'Prepared for RTA and UAE Customs export procedures.', ar:'مُعدّة لإجراءات التصدير لدى هيئة الطرق والمواصلات والجمارك الإماراتية.', ru:'Подготовлена для экспортных процедур RTA и таможни ОАЭ.', zh:'为道路交通局及阿联酋海关出口手续备妥。', es:'Preparado para los trámites de exportación ante la RTA y la Aduana de los EAU.' } },
]

const EXTRA_REMOTE2 = [
  { href: 'legal-translation/court',
    t: { en:'Court Document Translation', ar:'ترجمة وثائق المحاكم', ru:'Перевод судебных документов', zh:'法院文件翻译', es:'Traducción de Documentos Judiciales' },
    d: { en:'Judgments, evidence and pleadings translated through our sworn translator network.', ar:'ترجمة الأحكام والمذكرات والأدلة القضائية عبر شبكتنا من المترجمين المحلفين.', ru:'Решения, доказательства и состязательные бумаги — через сеть присяжных переводчиков.', zh:'判决书、证据与诉状，经我们的宣誓翻译网络翻译。', es:'Sentencias, pruebas y escritos traducidos mediante nuestra red de traductores jurados.' } },
]

const EXTRA_POA = [
  { href: 'power-of-attorney/real-estate/handover',
    t: { en:'Property Handover POA', ar:'وكالة استلام عقار', ru:'Доверенность на приёмку', zh:'房产交付授权书', es:'POA de Entrega de Inmueble' },
    d: { en:'Your agent receives the keys, signs the acceptance certificate and completes Title Deed registration.', ar:'وكيلك يستلم المفاتيح ويوقّع شهادة الاستلام ويستكمل تسجيل سند الملكية.', ru:'Поверенный получает ключи, подписывает акт приёмки и завершает регистрацию права собственности.', zh:'代理人领取钥匙、签署接收证明并完成产权证书登记。', es:'Su agente recibe las llaves, firma el acta de aceptación y completa el registro de la escritura.' } },
  { href: 'poa-cancellation',
    t: { en:'POA Cancellation', ar:'إلغاء الوكالة الرسمية', ru:'Отзыв доверенности', zh:'授权书撤销', es:'Cancelación de POA' },
    d: { en:'Preparing your cancellation documents for submission to the Notary Public.', ar:'تجهيز مستندات الإلغاء وتنسيق تقديمها لدى كاتب العدل.', ru:'Подготовка документов об отзыве для подачи нотариусу.', zh:'办理撤销文件并协调向公证人提交。', es:'Preparación de los documentos de cancelación para presentarlos al Notario Público.' } },
]

const EXTRA_ATTEST = [
  { href: 'certified-true-copy',
    t: { en:'Certified True Copy', ar:'النسخة طبق الأصل', ru:'Заверенная копия', zh:'认证副本', es:'Copia Certificada' },
    d: { en:'Passports, Emirates ID, degrees, title deeds and trade licences.', ar:'جوازات السفر والهوية الإماراتية والشهادات وسندات الملكية والرخص التجارية.', ru:'Паспорта, Emirates ID, дипломы, титулы и торговые лицензии.', zh:'护照、酋长国身份证、学位证、产权证书及贸易执照。', es:'Pasaportes, Emirates ID, títulos, escrituras y licencias comerciales.' } },
  { href: 'affidavit',
    t: { en:'Affidavit', ar:'الإقرارات الرسمية', ru:'Аффидевит', zh:'宣誓书', es:'Affidávit' },
    d: { en:'Affidavit of support, single status, income and NOC affidavits.', ar:'إقرار إعالة، أو عزوبية، أو دخل، أو تنازل.', ru:'Аффидевиты о поддержке, семейном положении, доходе и NOC.', zh:'资助宣誓书、单身状况、收入及无异议声明。', es:'Affidávits de manutención, estado civil, ingresos y NOC.' } },
]

const EXTRA_TENANCY = [
  { href: 'rdc-support',
    t: { en:'RDC Support', ar:'مركز فض النزاعات الإيجارية', ru:'Поддержка RDC', zh:'租赁纠纷中心支持', es:'Apoyo RDC' },
    d: { en:'We prepare Rental Disputes Centre cases, draft the documents and file them.', ar:'نجهّز قضايا مركز فض المنازعات الإيجارية ونصوغ المستندات ونقيّدها.', ru:'Готовим дела в Центре арендных споров, составляем документы и подаём их.', zh:'我们办理租赁纠纷中心案件、起草文件并提交立案。', es:'Preparamos casos del Centro de Disputas de Alquiler, redactamos los documentos y los presentamos.' } },
  { href: 'legal-notice/poa-cancellation',
    t: { en:'POA Cancellation Notice', ar:'إشعار إلغاء الوكالة', ru:'Уведомление об отзыве доверенности', zh:'授权书撤销通知', es:'Notificación de Cancelación de POA' },
    d: { en:'Formally notify your agent through the official Tableegh process via Dubai Courts.', ar:'إبلاغ وكيلك رسمياً عبر نظام التبليغ الرسمي لمحاكم دبي.', ru:'Официальное уведомление поверенного через систему Tableegh судов Дубая.', zh:'通过迪拜法院的官方 Tableegh 程序正式通知您的代理人。', es:'Notifique formalmente a su agente mediante el proceso oficial Tableegh de los Tribunales de Dubái.' } },
  { href: 'last-will-testament-dubai',
    t: { en:'Last Will & Testament', ar:'الوصية الأخيرة', ru:'Завещание', zh:'遗嘱', es:'Testamento' },
    d: { en:'Wills for non-Muslim expats, with registration through DIFC Courts or Dubai Courts.', ar:'وصايا لغير المسلمين، مع إجراءات التسجيل لدى محاكم مركز دبي المالي العالمي أو محاكم دبي.', ru:'Завещания для немусульман с регистрацией в судах DIFC или судах Дубая.', zh:'为非穆斯林外籍人士起草遗嘱，并在 DIFC 法院或迪拜法院办理登记。', es:'Testamentos para expatriados no musulmanes, con registro ante los Tribunales del DIFC o de Dubái.' } },
]

const EXTRA_REMOTE = [
  { href: 'emergency-notary',
    t: { en:'Same-Day Urgent Notary', ar:'توثيق عاجل نفس اليوم', ru:'Срочный нотариус в тот же день', zh:'当日加急公证', es:'Notaría Urgente el Mismo Día' },
    d: { en:'Expedited drafting and fast-track submission coordination for Dubai Courts and Federal Notary services.', ar:'صياغة عاجلة وتنسيق سريع للتقديم لدى كاتب العدل بمحاكم دبي أو وزارة العدل الإماراتية.', ru:'Ускоренное составление и координация подачи в суды Дубая и федеральную нотариальную службу.', zh:'加急起草并协调向迪拜法院及联邦公证服务快速提交。', es:'Redacción acelerada y coordinación de presentación rápida ante los Tribunales de Dubái y la Notaría Federal.' } },
]

export default async function HomePage({ params }: Props) {
  const { lang } = await params
  const waMsg = t({ en:'I need notary support in Dubai', ar:'أحتاج مساعدة في التوثيق بدبي', ru:'Мне нужна нотариальная поддержка', zh:'我需要迪拜公证支持', es:'Necesito soporte notarial en Dubái' }, lang)
  const waUrl = `https://wa.me/${site.phone.replace(/\D/g,'')}?text=${encodeURIComponent(waMsg)}`

  return (
    <>
      <LegalServiceSchema lang={lang} path="/" />
      <FAQSchema items={faq.general} lang={lang} />

      {/* HERO */}
      <section className="relative hero-bg overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{background:'radial-gradient(ellipse at 15% 50%, rgba(212,180,58,.06) 0%, transparent 60%), radial-gradient(ellipse at 85% 20%, rgba(74,106,138,.12) 0%, transparent 60%)'}} />
        <div className="relative mx-auto max-w-7xl px-4 lg:px-8 py-16 lg:py-24">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
            <div className="max-w-3xl">
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="badge-green">⚡ {t(H.b1,lang)}</span>
                <span className="badge-gold">{t(H.b2,lang)}</span>
                <span className="badge-navy">{t(H.b3,lang)}</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
                {t(H.h1, lang)}
              </h1>
              <p className="text-navy-300 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl">{t(H.sub, lang)}</p>
              <div className="flex flex-wrap gap-3">
                <a href={waUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#25D366] text-white font-bold px-7 py-3.5 rounded-xl hover:bg-[#20b958] transition-colors text-sm">{WA_ICON}{t(H.start, lang)}</a>
                <Link href={`/${lang}/power-of-attorney`} className="inline-flex items-center gap-2 bg-navy-800 text-navy-200 font-bold px-7 py-3.5 rounded-xl hover:bg-navy-700 transition-colors text-sm border border-navy-700">{t(H.all_svc, lang)}</Link>
              </div>
              {/* Stats */}
              <div className="flex flex-wrap gap-4 mt-8 pt-6 border-t border-navy-800">
                {[
                  {num:'5,000+', a:{en:'Documents',ar:'وثيقة',ru:'Документов',zh:'文件',es:'Documentos'}, b:{en:'Notarized',ar:'موثقة',ru:'Заверено',zh:'公证完成',es:'Notarizados'}},
                  {num:'5', a:{en:'Languages',ar:'لغات',ru:'Языков',zh:'种语言',es:'Idiomas'}, b:{en:'Supported',ar:'مدعومة',ru:'Поддержка',zh:'支持',es:'Soportados'}},
                  {num:'7', a:{en:'Days/Week',ar:'أيام أسبوعياً',ru:'Дней/неделю',zh:'天/周',es:'Días/Semana'}, b:{en:'Support',ar:'دعم',ru:'Поддержка',zh:'支持',es:'Soporte'}},
                ].map((s,i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="font-serif text-2xl font-bold text-gold-400">{s.num}</span>
                    <div className="text-xs text-navy-400 leading-tight">
                      <div className="text-white font-semibold">{t(s.a,lang)}</div>
                      <div>{t(s.b,lang)}</div>
                    </div>
                    {i < 3 && <div className="w-px bg-navy-700 self-stretch ms-2" />}
                  </div>
                ))}
              </div>
            </div>
            {/* Hero image */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="relative">
                <div className="absolute -inset-4 rounded-3xl" style={{background:'radial-gradient(ellipse at center, rgba(212,180,58,.07) 0%, transparent 70%)'}} />
                <img src="/assets/hero/poa-doc.png" alt="UAE Notary Document" className="relative w-[480px] xl:w-[500px] h-auto" style={{filter:'drop-shadow(0 0 40px rgba(212,180,58,.13))'}} />
              </div>
            </div>
          </div>
        </div>
        {/* Trust bar — infinite scrolling marquee */}
        <div className="relative border-t border-navy-800" dir="ltr">
          <AcceptedByMarquee
            variant="light"
            logoHeight={56}
            gap={14}
            speed={50}
            title={t(H.accepted, lang)}
            showTitle={true}
          />
        </div>
      </section>

      {/* What is a Notary Public — direct answer */}
      <section className="bg-white py-12 border-t border-navy-100">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <h2 className="gold-line font-serif text-2xl font-bold text-navy-900 sm:text-3xl mb-4">{t(H.wnp_h, lang)}</h2>
          <p className="text-navy-600 text-base leading-relaxed">{t(H.wnp_a, lang)}</p>
        </div>
      </section>

      {/* POA */}
      <section className="bg-white py-16 border-t border-navy-100">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <p className="overline-label mb-2">{t({en:'Most Requested',ar:'الأكثر طلباً',ru:'Наиболее востребовано',zh:'最受欢迎',es:'Más solicitado'}, lang)}</p>
              <h2 className="gold-line font-serif text-2xl font-bold text-navy-900 sm:text-3xl">{t(H.poa_h, lang)}</h2>
              <p className="mt-2 text-navy-500 text-sm">{t(H.poa_s, lang)}</p>
            </div>
            <Link href={`/${lang}/power-of-attorney`} className="shrink-0 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-600 hover:text-gold-600 transition-colors border border-navy-200 hover:border-gold-400/40 px-4 py-2 rounded-xl">
              {t(H.all_poa, lang)}
            </Link>
          </div>
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {services.poa.types.map((type, idx) => (
              <Link key={type.slug} href={`/${lang}/power-of-attorney/${type.slug}`}
                className={`group relative bg-gradient-to-br ${POA_COLORS[idx % POA_COLORS.length]} border rounded-2xl p-5 hover:-translate-y-0.5 transition-all duration-200 hover:shadow-lg`}>
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-bold text-navy-900 text-sm leading-snug group-hover:text-navy-700 flex-1 pe-2">{t(type.title, lang)}</h3>
                  <span className="shrink-0 text-xs font-semibold text-gold-600 bg-white/60 px-2 py-0.5 rounded-full border border-white/80">{t(H.same_day,lang)}</span>
                </div>
                <p className="text-xs text-navy-500 leading-relaxed mb-3 line-clamp-2">{t(type.desc, lang)}</p>
                <span className="text-xs text-gold-600 font-semibold group-hover:text-gold-500 transition-colors">{t(cta.learn_more, lang)} →</span>
              </Link>
            ))}
            {EXTRA_POA.map((svc, i) => (
              <Link key={svc.href} href={`/${lang}/${svc.href}`}
                className={`group relative bg-gradient-to-br ${POA_COLORS[(services.poa.types.length + i) % POA_COLORS.length]} border rounded-2xl p-5 hover:-translate-y-0.5 transition-all duration-200 hover:shadow-lg`}>
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-bold text-navy-900 text-sm leading-snug group-hover:text-navy-700 flex-1 pe-2">{t(svc.t, lang)}</h3>
                  <span className="shrink-0 text-xs font-semibold text-gold-600 bg-white/60 px-2 py-0.5 rounded-full border border-white/80">{t(H.same_day,lang)}</span>
                  {EXTRA_POA2.map((svc, i) => (
              <Link key={svc.href} href={`/${lang}/${svc.href}`}
                className={`group relative bg-gradient-to-br ${POA_COLORS[(services.poa.types.length + EXTRA_POA.length + i) % POA_COLORS.length]} border rounded-2xl p-5 hover:-translate-y-0.5 transition-all duration-200 hover:shadow-lg`}>
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-bold text-navy-900 text-sm leading-snug group-hover:text-navy-700 flex-1 pe-2">{t(svc.t, lang)}</h3>
                  <span className="shrink-0 text-xs font-semibold text-gold-600 bg-white/60 px-2 py-0.5 rounded-full border border-white/80">{t(H.same_day,lang)}</span>
                </div>
                <p className="text-xs text-navy-500 leading-relaxed mb-3 line-clamp-2">{t(svc.d, lang)}</p>
                <span className="text-xs text-gold-600 font-semibold group-hover:text-gold-500 transition-colors">{t(cta.learn_more, lang)} →</span>
              </Link>
            ))}
          </div>
                <p className="text-xs text-navy-500 leading-relaxed mb-3 line-clamp-2">{t(svc.d, lang)}</p>
                <span className="text-xs text-gold-600 font-semibold group-hover:text-gold-500 transition-colors">{t(cta.learn_more, lang)} →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CORPORATE */}
      <section className="bg-navy-50 py-16 border-t border-navy-100">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <p className="overline-label mb-2">{t({en:'For Corporate & Business Clients',ar:'للشركات وعملاء الأعمال',ru:'Для корпоративных клиентов',zh:'企业及商业客户',es:'Para Clientes Corporativos y Empresariales'}, lang)}</p>
              <h2 className="gold-line font-serif text-2xl font-bold text-navy-900 sm:text-3xl">{t(H.corp_h, lang)}</h2>
              <p className="mt-2 text-navy-500 text-sm">{t(H.corp_s, lang)}</p>
            </div>
            <Link href={`/${lang}/corporate/board-resolution`} className="shrink-0 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-600 hover:text-gold-600 transition-colors border border-navy-200 hover:border-gold-400/40 px-4 py-2 rounded-xl">
              {t(H.all_corp, lang)}
            </Link>
          </div>
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {CORP_SERVICES.map((svc, idx) => (
              <Link key={svc.slug} href={`/${lang}/corporate/${svc.slug}`}
                className={`group relative bg-gradient-to-br ${CORP_COLORS[idx % CORP_COLORS.length]} border rounded-2xl p-5 hover:-translate-y-0.5 transition-all duration-200 hover:shadow-lg`}>
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-bold text-navy-900 text-sm leading-snug group-hover:text-navy-700 flex-1 pe-2">
                    {(svc as any)[lang] || svc.en}
                  </h3>
                  <span className="shrink-0 text-xs font-semibold text-navy-500 bg-white/60 px-2 py-0.5 rounded-full border border-white/80">{t(H.same_day,lang)}</span>
                </div>
                <p className="text-xs text-navy-500 leading-relaxed mb-3">
                  {(svc as any)[`desc_${lang}`] || svc.desc_en}
                </p>
                <span className="text-xs text-gold-600 font-semibold group-hover:text-gold-500 transition-colors">{t(cta.learn_more, lang)} →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Attestation */}
      <section className="bg-white py-16 border-t border-navy-100">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <p className="overline-label mb-2">{t({en:'Government & Embassy',ar:'الحكومة والسفارة',ru:'Правительство и посольство',zh:'政府及大使馆',es:'Gobierno y Embajada'}, lang)}</p>
          <h2 className="gold-line font-serif text-2xl font-bold text-navy-900 sm:text-3xl mb-8">{t(H.attest_h, lang)}</h2>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
            {services.attestation.types.map((type) => (
              <Link key={type.slug} href={`/${lang}/attestation/${type.slug}`} className="service-card group">
                <h3 className="font-bold text-navy-900 text-sm mb-2 group-hover:text-navy-700">{t(type.title, lang)}</h3>
                <p className="text-xs text-navy-500 leading-relaxed mb-3">{t(type.desc, lang)}</p>
                <span className="text-xs font-semibold text-gold-600">{t(cta.learn_more, lang)} →</span>
              </Link>
            ))}
            {EXTRA_ATTEST.map((svc) => (
              <Link key={svc.href} href={`/${lang}/${svc.href}`} className="service-card group">
                <h3 className="font-bold text-navy-900 text-sm mb-2 group-hover:text-navy-700">{t(svc.t, lang)}</h3>
                <p className="text-xs text-navy-500 leading-relaxed mb-3">{t(svc.d, lang)}</p>
                <span className="text-xs font-semibold text-gold-600">{t(cta.learn_more, lang)} →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Tenancy */}
      <section className="bg-navy-50 py-16 border-t border-navy-100">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <p className="overline-label mb-2">{t({en:'Tenant & Landlord',ar:'مستأجر ومالك',ru:'Арендатор и арендодатель',zh:'租客及房东',es:'Inquilino y Propietario'}, lang)}</p>
          <h2 className="gold-line font-serif text-2xl font-bold text-navy-900 sm:text-3xl mb-8">{t(H.tenancy_h, lang)}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link href={`/${lang}/legal-notice/eviction`} className="service-card group">
              <h3 className="font-bold text-navy-900 text-sm mb-2">{t(services.eviction_notice.title, lang)}</h3>
              <p className="text-xs text-navy-500 leading-relaxed mb-3">{t(services.eviction_notice.desc, lang)}</p>
              <span className="text-xs font-semibold text-gold-600">{t(cta.learn_more, lang)} →</span>
            </Link>
            <Link href={`/${lang}/legal-notice`} className="service-card group">
              <h3 className="font-bold text-navy-900 text-sm mb-2">{t(services.legal_notice.title, lang)}</h3>
              <p className="text-xs text-navy-500 leading-relaxed mb-3">{t(services.legal_notice.desc, lang)}</p>
              <span className="text-xs font-semibold text-gold-600">{t(cta.learn_more, lang)} →</span>
            </Link>
            {EXTRA_TENANCY.map((svc) => (
              <Link key={svc.href} href={`/${lang}/${svc.href}`} className="service-card group">
                <h3 className="font-bold text-navy-900 text-sm mb-2">{t(svc.t, lang)}</h3>
                <p className="text-xs text-navy-500 leading-relaxed mb-3">{t(svc.d, lang)}</p>
                <span className="text-xs font-semibold text-gold-600">{t(cta.learn_more, lang)} →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* RDC — Rental Disputes Centre */}
      <section className="bg-white py-16 border-t border-navy-100">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mb-10">
            <p className="overline-label mb-2">{t({en:'Rental Disputes Settlement Centre',ar:'مركز فض المنازعات الإيجارية',ru:'Центр разрешения арендных споров',zh:'租赁纠纷解决中心',es:'Centro de Resolución de Disputas de Alquiler'}, lang)}</p>
            <h2 className="gold-line font-serif text-2xl font-bold text-navy-900 sm:text-3xl">{t({en:'RDC Case Support',ar:'دعم قضايا مركز فض المنازعات',ru:'Поддержка дел в RDC',zh:'租赁纠纷中心案件支持',es:'Apoyo en Casos del RDC'}, lang)}</h2>
            <p className="mt-2 text-navy-500 text-sm">{t({en:'Filing, defending and enforcing rental cases in Dubai.',ar:'تقييد القضايا الإيجارية في دبي والرد عليها وتنفيذها.',ru:'Подача, защита и исполнение арендных дел в Дубае.',zh:'在迪拜提起、应诉与执行租赁案件。',es:'Presentación, defensa y ejecución de casos de alquiler en Dubái.'}, lang)}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {RDC_SERVICES.map((svc) => (
              <Link key={svc.href} href={`/${lang}/${svc.href}`} className="service-card group">
                <h3 className="font-bold text-navy-900 text-sm mb-2 group-hover:text-navy-700">{t(svc.t, lang)}</h3>
                <p className="text-xs text-navy-500 leading-relaxed mb-3">{t(svc.d, lang)}</p>
                <span className="text-xs font-semibold text-gold-600">{t(cta.learn_more, lang)} →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Remote */}
      <section className="bg-navy-900 py-16 border-t border-navy-800">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <p className="overline-label mb-2 text-gold-500/70">{t({en:'No Office Visit Required',ar:'بدون زيارة مكتب',ru:'Без визита в офис',zh:'无需到访办公室',es:'Sin Visita Necesaria'}, lang)}</p>
          <h2 className="gold-line font-serif text-2xl font-bold text-white sm:text-3xl mb-8">{t(H.remote_h, lang)}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[services.e_notary, services.legal_translation].map((s) => (
              <Link key={s.slug} href={`/${lang}/${s.slug}`} className="service-card-dark group">
                <h3 className="font-bold text-white text-sm mb-2 group-hover:text-gold-400 transition-colors">{t(s.title, lang)}</h3>
                <p className="text-xs text-navy-400 leading-relaxed mb-3">{t(s.desc, lang)}</p>
                <span className="text-xs font-semibold text-gold-500">{t(cta.learn_more, lang)} →</span>
              </Link>
            ))}
            <Link href={`/${lang}/mobile-notary`} className="service-card-dark group">
              <h3 className="font-bold text-white text-sm mb-2 group-hover:text-gold-400 transition-colors">{t(H.mobile_t, lang)}</h3>
              <p className="text-xs text-navy-400 leading-relaxed">{t(H.mobile_d, lang)}</p>
            </Link>
            {EXTRA_REMOTE.map((svc) => (
              <Link key={svc.href} href={`/${lang}/${svc.href}`} className="service-card-dark group">
                <h3 className="font-bold text-white text-sm mb-2 group-hover:text-gold-400 transition-colors">{t(svc.t, lang)}</h3>
                <p className="text-xs text-navy-400 leading-relaxed mb-3">{t(svc.d, lang)}</p>
                <span className="text-xs font-semibold text-gold-500">{t(cta.learn_more, lang)} →</span>
              </Link>
            ))}
            {EXTRA_REMOTE2.map((svc) => (
              <Link key={svc.href} href={`/${lang}/${svc.href}`} className="service-card-dark group">
                <h3 className="font-bold text-white text-sm mb-2 group-hover:text-gold-400 transition-colors">{t(svc.t, lang)}</h3>
                <p className="text-xs text-navy-400 leading-relaxed mb-3">{t(svc.d, lang)}</p>
                <span className="text-xs font-semibold text-gold-500">{t(cta.learn_more, lang)} →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="bg-navy-900 py-14 border-t border-navy-800">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-serif text-2xl font-bold text-white sm:text-3xl">{t(H.how_h, lang)}</h2>
            <p className="mt-2 text-navy-400 text-sm">{t(H.how_s, lang)}</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-5">
            {steps.map((step) => (
              <div key={step.n} className="text-center">
                <div className={`mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl text-lg font-serif font-bold ${step.n===5?'bg-gold-400 text-navy-900':'bg-navy-800 border border-navy-700 text-gold-400'}`}>{step.n}</div>
                <h3 className="font-bold text-white text-xs mb-1">{t(step.title, lang)}</h3>
                <p className="text-xs text-navy-400 leading-relaxed">{t(step.desc, lang)}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <a href={waUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#25D366] text-white font-bold px-8 py-3.5 rounded-xl hover:bg-[#20b958] transition-colors text-sm">{WA_ICON}{t(H.now5, lang)}</a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-navy-50 py-14 border-t border-navy-100">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <div className="text-center mb-10">
            <h2 id="faq-heading" className="gold-line font-serif text-2xl font-bold text-navy-900 sm:text-3xl inline-block">{t(H.faq_h, lang)}</h2>
          </div>
          <FAQSection items={faq.general} lang={lang} />
          <div className="text-center mt-8">
            <Link href={`/${lang}/faq`} className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-600 hover:text-gold-500">
              {t(H.faq_all, lang)} <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
