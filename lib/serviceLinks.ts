import { type Lang, t } from '@/lib/i18n'

// ─────────────────────────────────────────────────────────────────────────────
// Internal linking registry
//
// LABELS — the five-language name of every service page. Every string here is
// lifted verbatim from copy that already exists on the site (the /pricing
// service list, the homepage service cards, the footer link table, the navbar
// group headings). Nothing here is newly translated.
//
// RELATED — the curated sibling map that feeds the "Related Services" sidebar.
// BREADCRUMB — ancestor chain per page (Home is prepended by ServicePage).
// ─────────────────────────────────────────────────────────────────────────────

type L5 = Record<string, string>

export const LABELS: Record<string, L5> = {
  '/affidavit': { en: 'Affidavit', ar: 'إقرارات', ru: 'Аффидевиты', zh: '宣誓书', es: 'Declaraciones' },   // footer
  '/attestation/degree': { en: 'Degree Attestation', ar: 'تصديق الشهادات', ru: 'Легализация диплома', zh: '学历证书认证', es: 'Título Educativo' },   // footer
  '/attestation/embassy': { en: 'Embassy Attestation', ar: 'تصديق السفارة', ru: 'Легализация посольства', zh: '使馆认证', es: 'Atestación Embajada' },   // footer
  '/attestation/marriage': { en: 'Marriage Certificate', ar: 'تصديق عقد الزواج', ru: 'Свидетельство о браке', zh: '结婚证认证', es: 'Acta Matrimonio' },   // footer
  '/attestation/mofa': { en: 'MOFA Attestation', ar: 'تصديق الخارجية', ru: 'Легализация MOFA', zh: '外交部认证', es: 'Autenticación MOFA' },   // footer
  '/certified-true-copy': { en: 'Certified Copy', ar: 'نسخة طبق الأصل', ru: 'Заверенная копия', zh: '核证副本', es: 'Copia Compulsada' },   // footer
  '/corporate/board-resolution': { en: 'Board Resolution', ar: 'محضر اجتماع الشركاء', ru: 'Решение / протокол', zh: '决议与会议记录', es: 'Resolución y Acta' },   // navbar
  '/corporate/contract': { en: 'Commercial Contract', ar: 'عقد تجاري', ru: 'Коммерч. договор', zh: '商业合同', es: 'Contrato' },   // navbar
  '/corporate/liquidation': { en: 'Company Liquidation', ar: 'تصفية الشركة', ru: 'Ликвидация', zh: '公司清算', es: 'Liquidación' },   // navbar
  '/corporate/moa': { en: 'MOA Notarization', ar: 'توثيق عقد التأسيس', ru: 'Заверение MOA', zh: '章程公证', es: 'MOA' },   // navbar
  '/corporate/moa-amendment': { en: 'MOA Amendment', ar: 'تعديل عقد التأسيس', ru: 'Поправка MOA', zh: '章程修正', es: 'Enmienda MOA' },   // navbar
  '/corporate/share-transfer': { en: 'Share Transfer', ar: 'نقل الحصص', ru: 'Передача акций', zh: '股权转让', es: 'Acciones' },   // navbar
  '/corporate/shareholder-agreement': { en: 'Shareholder Agree.', ar: 'اتفاقية المساهمين', ru: 'Акционер. соглашение', zh: '股东协议', es: 'Acuerdo Acc.' },   // navbar
  '/document-rejection': { en: 'Document Rejected?', ar: 'وثيقة مرفوضة؟', ru: 'Документ отклонён?', zh: '文件被拒？', es: '¿Doc. Rechazado?' },   // footer
  '/e-notary': { en: 'E-Notary (Remote)', ar: 'الكاتب الإلكتروني', ru: 'Электронный нотариус', zh: '电子公证', es: 'E-Notario' },   // footer
  '/emergency-notary': { en: 'Same-Day Urgent', ar: 'توثيق عاجل نفس اليوم', ru: 'Срочно в тот же день', zh: '当日紧急公证', es: 'Urgente Mismo Día' },   // footer
  '/last-will-testament-dubai': { en: 'Last Will & Testament', ar: 'الوصية الأخيرة', ru: 'Завещание', zh: '遗嘱', es: 'Testamento' },   // footer
  '/legal-notice': { en: 'Legal Notice', ar: 'إنذار قانوني', ru: 'Юридическое уведомление', zh: '法律通知', es: 'Notificación Legal' },   // footer
  '/legal-notice/eviction': { en: 'Eviction Notice', ar: 'إشعار الإخلاء', ru: 'Уведомление о выселении', zh: '驱逐通知', es: 'Aviso de Desalojo' },   // footer
  '/legal-notice/poa-cancellation': { en: 'POA Cancellation Notice', ar: 'إنذار إلغاء وكالة', ru: 'Уведомление об отмене POA', zh: '撤销授权通知', es: 'Aviso Cancelación' },   // footer
  '/legal-translation': { en: 'Legal Translation', ar: 'ترجمة قانونية', ru: 'Юридический перевод', zh: '法律翻译', es: 'Traducción Legal' },   // footer
  '/legal-translation/court': { en: 'Court Document Translation', ar: 'ترجمة وثائق المحاكم', ru: 'Перевод судебных документов', zh: '法院文件翻译', es: 'Traducción de Documentos Judiciales' },   // homepage card
  '/mobile-notary': { en: 'Mobile Notary', ar: 'كاتب عدل متنقل', ru: 'Выездной нотариус', zh: '上门公证', es: 'Notario Móvil' },   // footer
  '/poa-cancellation': { en: 'POA Cancellation', ar: 'إلغاء الوكالة', ru: 'Отмена доверенности', zh: '撤销授权', es: 'Cancelación POA' },   // footer
  '/power-of-attorney': { en: 'Power of Attorney', ar: 'الوكالات الرسمية', ru: 'Доверенности', zh: '授权委托书', es: 'Poderes Notariales' },   // navbar group heading
  '/power-of-attorney/bank': { en: 'Bank POA', ar: 'وكالة بنكية', ru: 'Банковская доверенность', zh: '银行授权书', es: 'POA Bancario' },   // footer
  '/power-of-attorney/child-travel': { en: 'Child Travel Auth.', ar: 'إذن سفر طفل', ru: 'Разрешение на выезд ребёнка', zh: '儿童旅行授权', es: 'Viaje Menor' },   // footer
  '/power-of-attorney/company-formation': { en: 'Company Formation POA', ar: 'وكالة تأسيس شركة', ru: 'Доверенность на регистрацию', zh: '公司注册授权书', es: 'POA Empresa' },   // footer
  '/power-of-attorney/court': { en: 'Court Case POA', ar: 'وكالة قضائية', ru: 'Судебная', zh: '法院授权书', es: 'Judicial' },   // navbar
  '/power-of-attorney/general': { en: 'General POA', ar: 'وكالة عامة', ru: 'Генеральная доверенность', zh: '一般授权书', es: 'POA General' },   // footer
  '/power-of-attorney/inheritance': { en: 'Inheritance POA', ar: 'وكالة ميراث', ru: 'На наследство', zh: '继承授权书', es: 'Herencia' },   // navbar
  '/power-of-attorney/mohre': { en: 'MOHRE / Labour', ar: 'وكالة MOHRE', ru: 'MOHRE / Труд', zh: 'MOHRE劳工', es: 'MOHRE' },   // navbar
  '/power-of-attorney/property-gifting': { en: 'Property Gifting', ar: 'هبة عقار', ru: 'Дарение', zh: '房产赠与', es: 'Donación' },   // navbar
  '/power-of-attorney/real-estate': { en: 'Real Estate POA', ar: 'وكالة عقارية', ru: 'Доверенность на недвижимость', zh: '房地产授权书', es: 'POA Inmobiliario' },   // footer
  '/power-of-attorney/real-estate/handover': { en: 'Property Handover POA', ar: 'وكالة استلام عقار', ru: 'Доверенность на приёмку', zh: '房产交付授权书', es: 'POA de Entrega de Inmueble' },   // homepage card
  '/power-of-attorney/real-estate/management': { en: 'Property Management POA', ar: 'وكالة إدارة عقار', ru: 'Доверенность на управление', zh: '房产管理授权书', es: 'POA de Gestión de Inmueble' },   // homepage card
  '/power-of-attorney/real-estate/purchase': { en: 'Property Purchase POA', ar: 'وكالة شراء عقار', ru: 'Доверенность на покупку', zh: '房产购买授权书', es: 'POA de Compra de Inmueble' },   // homepage card
  '/power-of-attorney/real-estate/sale': { en: 'Property Sale POA', ar: 'وكالة بيع عقار', ru: 'Доверенность на продажу', zh: '房产出售授权书', es: 'POA de Venta de Inmueble' },   // homepage card
  '/power-of-attorney/special': { en: 'Special POA', ar: 'وكالة خاصة', ru: 'Специальная', zh: '特别授权书', es: 'POA Especial' },   // navbar
  '/power-of-attorney/vehicle': { en: 'Vehicle POA', ar: 'وكالة مركبة', ru: 'Доверенность на авто', zh: '车辆授权书', es: 'POA Vehículo' },   // footer
  '/power-of-attorney/vehicle/export': { en: 'Vehicle Export POA', ar: 'وكالة تصدير مركبة', ru: 'Доверенность на экспорт авто', zh: '车辆出口授权书', es: 'POA de Exportación de Vehículo' },   // homepage card
  '/power-of-attorney/vehicle/management': { en: 'Vehicle Management POA', ar: 'وكالة إدارة مركبة', ru: 'Доверенность на управление авто', zh: '车辆管理授权书', es: 'POA de Gestión de Vehículo' },   // homepage card
  '/power-of-attorney/vehicle/sale': { en: 'Vehicle Sale POA', ar: 'وكالة بيع مركبة', ru: 'Доверенность на продажу авто', zh: '车辆出售授权书', es: 'POA de Venta de Vehículo' },   // homepage card
  '/rdc-support': { en: 'RDC Support', ar: 'دعم مركز المنازعات', ru: 'Поддержка RDC', zh: 'RDC支持', es: 'Soporte RDC' },   // footer
  '/rdc-support/bounced-cheque': { en: 'Bounced Rent Cheque', ar: 'شيك إيجاري مرتجع', ru: 'Возвращённый чек', zh: '租金支票退票', es: 'Cheque Devuelto' },   // navbar
  '/rdc-support/contract-renewal': { en: 'Tenancy Renewal', ar: 'دعوى التجديد', ru: 'Продление аренды', zh: '租赁续约', es: 'Renovación' },   // navbar
  '/rdc-support/e-requests': { en: 'E-Requests', ar: 'الطلبات الإلكترونية', ru: 'Э-запросы', zh: '电子申请', es: 'Solicitudes Electrónicas' },   // navbar
  '/rdc-support/eviction-case': { en: 'Eviction Case', ar: 'دعوى الإخلاء', ru: 'Дело о выселении', zh: '驱逐诉讼', es: 'Demanda de Desalojo' },   // navbar
  '/rdc-support/execution': { en: 'Execution File', ar: 'ملف التنفيذ', ru: 'Исполнительное дело', zh: '执行案卷', es: 'Ejecución' },   // navbar
  '/rdc-support/offer-and-deposit': { en: 'Offer and Deposit', ar: 'العرض والإيداع', ru: 'Оферта и депонирование', zh: '提存申请', es: 'Oferta y Consignación' },   // navbar
  '/rdc-support/rent-claim': { en: 'Unpaid Rent Claim', ar: 'المطالبة بالأجرة', ru: 'Взыскание аренды', zh: '追讨拖欠租金', es: 'Alquiler Impagado' },   // navbar
  '/rdc-support/tenant-defence': { en: 'Responding to a Case', ar: 'الرد على دعوى', ru: 'Ответ на дело', zh: '应对诉讼', es: 'Responder a una Demanda' },   // navbar
  '/rdc-support/urgent-orders': { en: 'Urgent Orders', ar: 'الأوامر المستعجلة', ru: 'Срочные меры', zh: '紧急命令', es: 'Órdenes Urgentes' },   // navbar
  '/what-is-tableegh': { en: 'What is Tableegh?', ar: 'ما هو التبليغ؟', ru: 'Что такое Tableegh?', zh: '什么是Tableegh?', es: '¿Qué es Tableegh?' },   // footer
  '/why-poa-rejected-dubai': { en: 'Why POA Rejected?', ar: 'لماذا رُفضت الوكالة؟', ru: 'Почему отказали в POA?', zh: '为何授权被拒？', es: '¿Por Qué Rechazan?' },   // footer
}

export const RELATED: Record<string, string[]> = {
  // ── Power of attorney ──
  '/power-of-attorney': [
    '/power-of-attorney/general', '/power-of-attorney/special', '/power-of-attorney/real-estate',
    '/power-of-attorney/vehicle', '/power-of-attorney/bank', '/power-of-attorney/court',
    '/power-of-attorney/child-travel', '/power-of-attorney/inheritance',
    '/power-of-attorney/company-formation', '/power-of-attorney/property-gifting', '/power-of-attorney/mohre',
  ],
  '/power-of-attorney/general': ['/power-of-attorney/special', '/power-of-attorney/real-estate', '/power-of-attorney/bank', '/power-of-attorney/court', '/poa-cancellation'],
  '/power-of-attorney/special': ['/power-of-attorney/general', '/power-of-attorney/real-estate/sale', '/power-of-attorney/court', '/power-of-attorney/child-travel'],
  '/power-of-attorney/real-estate/sale': ['/power-of-attorney/real-estate', '/power-of-attorney/real-estate/purchase', '/power-of-attorney/real-estate/handover', '/power-of-attorney/property-gifting'],
  '/power-of-attorney/real-estate': ['/power-of-attorney/real-estate/sale', '/power-of-attorney/real-estate/purchase', '/power-of-attorney/real-estate/management', '/power-of-attorney/real-estate/handover', '/power-of-attorney/property-gifting', '/power-of-attorney/general'],
  '/power-of-attorney/real-estate/purchase': ['/power-of-attorney/real-estate', '/power-of-attorney/real-estate/sale', '/power-of-attorney/real-estate/management', '/power-of-attorney/property-gifting'],
  '/power-of-attorney/real-estate/handover': ['/power-of-attorney/real-estate', '/power-of-attorney/real-estate/management', '/power-of-attorney/real-estate/purchase'],
  '/power-of-attorney/real-estate/management': ['/power-of-attorney/real-estate', '/power-of-attorney/real-estate/purchase', '/power-of-attorney/real-estate/handover', '/rdc-support'],
  '/power-of-attorney/vehicle': ['/power-of-attorney/vehicle/sale', '/power-of-attorney/vehicle/export', '/power-of-attorney/vehicle/management', '/power-of-attorney/general'],
  '/power-of-attorney/vehicle/sale': ['/power-of-attorney/vehicle', '/power-of-attorney/vehicle/export', '/power-of-attorney/vehicle/management'],
  '/power-of-attorney/vehicle/export': ['/power-of-attorney/vehicle', '/power-of-attorney/vehicle/sale', '/power-of-attorney/vehicle/management'],
  '/power-of-attorney/vehicle/management': ['/power-of-attorney/vehicle', '/power-of-attorney/vehicle/sale', '/power-of-attorney/vehicle/export'],
  '/power-of-attorney/bank': ['/power-of-attorney/general', '/power-of-attorney/company-formation', '/corporate/board-resolution'],
  '/power-of-attorney/court': ['/rdc-support', '/legal-translation/court', '/legal-notice', '/poa-cancellation'],
  '/power-of-attorney/child-travel': ['/power-of-attorney/general', '/power-of-attorney/special', '/affidavit'],
  '/power-of-attorney/inheritance': ['/last-will-testament-dubai', '/power-of-attorney/general', '/power-of-attorney/court'],
  '/power-of-attorney/company-formation': ['/corporate/moa', '/corporate/board-resolution', '/power-of-attorney/mohre', '/power-of-attorney/bank'],
  '/power-of-attorney/property-gifting': ['/power-of-attorney/real-estate', '/power-of-attorney/real-estate/sale', '/power-of-attorney/real-estate/handover'],
  '/power-of-attorney/mohre': ['/power-of-attorney/company-formation', '/corporate/moa', '/e-notary'],
  '/poa-cancellation': ['/legal-notice/poa-cancellation', '/what-is-tableegh', '/power-of-attorney/general', '/why-poa-rejected-dubai'],

  // ── Corporate ──
  '/corporate/moa': ['/corporate/moa-amendment', '/corporate/board-resolution', '/corporate/share-transfer', '/power-of-attorney/company-formation'],
  '/corporate/moa-amendment': ['/corporate/moa', '/corporate/board-resolution', '/corporate/share-transfer'],
  '/corporate/board-resolution': ['/corporate/moa', '/corporate/moa-amendment', '/corporate/share-transfer', '/corporate/liquidation', '/power-of-attorney/bank'],
  '/corporate/share-transfer': ['/corporate/board-resolution', '/corporate/moa-amendment', '/corporate/shareholder-agreement'],
  '/corporate/shareholder-agreement': ['/corporate/share-transfer', '/corporate/contract', '/corporate/moa'],
  '/corporate/liquidation': ['/corporate/board-resolution', '/corporate/moa', '/corporate/share-transfer'],
  '/corporate/contract': ['/corporate/shareholder-agreement', '/corporate/moa', '/legal-translation'],

  // ── Attestation ──
  '/attestation/mofa': ['/attestation/embassy', '/attestation/degree', '/attestation/marriage', '/certified-true-copy'],
  '/attestation/embassy': ['/attestation/mofa', '/attestation/degree', '/attestation/marriage'],
  '/attestation/degree': ['/attestation/mofa', '/attestation/embassy', '/certified-true-copy'],
  '/attestation/marriage': ['/attestation/mofa', '/attestation/embassy', '/affidavit'],

  // ── Notarization & documents ──
  '/e-notary': ['/mobile-notary', '/emergency-notary', '/power-of-attorney', '/certified-true-copy'],
  '/mobile-notary': ['/e-notary', '/emergency-notary', '/power-of-attorney'],
  '/emergency-notary': ['/e-notary', '/mobile-notary', '/power-of-attorney'],
  '/certified-true-copy': ['/legal-translation', '/affidavit', '/power-of-attorney'],
  '/affidavit': ['/certified-true-copy', '/attestation/mofa', '/last-will-testament-dubai'],
  '/legal-translation': ['/legal-translation/court', '/attestation/mofa', '/certified-true-copy'],
  '/legal-translation/court': ['/legal-translation', '/power-of-attorney/court', '/rdc-support'],
  '/last-will-testament-dubai': ['/power-of-attorney/inheritance', '/affidavit', '/power-of-attorney'],

  // ── Tenancy & notices ──
  '/legal-notice': ['/legal-notice/eviction', '/legal-notice/poa-cancellation', '/what-is-tableegh', '/rdc-support'],
  '/legal-notice/eviction': ['/rdc-support/eviction-case', '/what-is-tableegh', '/legal-notice', '/rdc-support'],
  '/legal-notice/poa-cancellation': ['/poa-cancellation', '/what-is-tableegh', '/legal-notice'],
  '/what-is-tableegh': ['/legal-notice', '/legal-notice/eviction', '/legal-notice/poa-cancellation'],

  // ── Resources ──
  '/document-rejection': ['/why-poa-rejected-dubai', '/attestation/mofa', '/certified-true-copy', '/legal-translation'],
  '/why-poa-rejected-dubai': ['/power-of-attorney', '/poa-cancellation', '/document-rejection'],
}

// Ancestor chain per page. Home is prepended by ServicePage itself.
// Clusters without a hub page (corporate, attestation) get a two-level trail.
export const BREADCRUMB: Record<string, string[]> = {
  '/power-of-attorney/real-estate/sale': ['/power-of-attorney', '/power-of-attorney/real-estate'],
  '/power-of-attorney/real-estate/purchase': ['/power-of-attorney', '/power-of-attorney/real-estate'],
  '/power-of-attorney/real-estate/handover': ['/power-of-attorney', '/power-of-attorney/real-estate'],
  '/power-of-attorney/real-estate/management': ['/power-of-attorney', '/power-of-attorney/real-estate'],
  '/power-of-attorney/vehicle/sale': ['/power-of-attorney', '/power-of-attorney/vehicle'],
  '/power-of-attorney/vehicle/export': ['/power-of-attorney', '/power-of-attorney/vehicle'],
  '/power-of-attorney/vehicle/management': ['/power-of-attorney', '/power-of-attorney/vehicle'],
  '/rdc-support/eviction-case': ['/rdc-support'],
  '/rdc-support/rent-claim': ['/rdc-support'],
  '/rdc-support/bounced-cheque': ['/rdc-support'],
  '/rdc-support/execution': ['/rdc-support'],
  '/rdc-support/e-requests': ['/rdc-support'],
  '/rdc-support/contract-renewal': ['/rdc-support'],
  '/rdc-support/tenant-defence': ['/rdc-support'],
  '/rdc-support/urgent-orders': ['/rdc-support'],
  '/rdc-support/offer-and-deposit': ['/rdc-support'],
  '/legal-notice/eviction': ['/legal-notice'],
  '/legal-notice/poa-cancellation': ['/legal-notice'],
  '/legal-translation/court': ['/legal-translation'],
}

/** Related-services sidebar entries for a page, or undefined when none are mapped. */
export function relatedFor(lang: Lang, path: string) {
  const list = RELATED[path]
  if (!list || list.length === 0) return undefined
  return list
    .filter((p) => LABELS[p])
    .map((p) => ({ label: LABELS[p], href: `/${lang}${p}` }))
}

/** Breadcrumb trail (ancestors + the page itself), labels resolved to `lang`. */
export function breadcrumbFor(lang: Lang, path: string) {
  if (!LABELS[path]) return undefined
  const chain = [...(BREADCRUMB[path] ?? []), path]
  return chain
    .filter((p) => LABELS[p])
    .map((p) => ({ label: t(LABELS[p], lang), href: p }))
}
