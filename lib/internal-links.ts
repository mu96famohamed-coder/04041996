import fs from 'fs';
import path from 'path';

// ============ الأنواع ============
export type Locale = 'en' | 'ar' | 'ru' | 'zh' | 'es';

interface Term {
  en: string;
  ar: string;
  ru: string;
  zh: string;
  es: string;
}

interface Keyword {
  id: string;
  term: Term;
  targetUrl: string;
  enabled: boolean;
}

interface PageConfig {
  applyKeywords: string[];
}

interface Settings {
  maxLinksPerPage: number;
  excludeSelfLinks: boolean;
  linkFirstOccurrenceOnly: boolean;
  skipHeadings: boolean;
  minParagraphLength: number;
}

interface LinksFile {
  version: string;
  section: string;
  settings: Settings;
  doNotLink: string[];
  keywords: Keyword[];
  pages: Record<string, PageConfig>;
}

export interface ResolvedLink {
  keyword: string;
  targetUrl: string;
  keywordId: string;
}

export interface LinkSettings {
  skipHeadings: boolean;
  linkFirstOccurrenceOnly: boolean;
  minParagraphLength: number;
}

// ============ قراءة الملفات ============
const LINKS_DIR = path.join(process.cwd(), 'data');

let cachedFiles: LinksFile[] | null = null;

function loadAllLinkFiles(): LinksFile[] {
  if (cachedFiles) return cachedFiles;

  if (!fs.existsSync(LINKS_DIR)) {
    console.warn('[internal-links] Directory not found:', LINKS_DIR);
    return [];
  }

  const files = fs
    .readdirSync(LINKS_DIR)
    .filter((f) => f.startsWith('internal-links-') && f.endsWith('.json'));

  cachedFiles = files
    .map((file) => {
      try {
        const content = fs.readFileSync(path.join(LINKS_DIR, file), 'utf-8');
        return JSON.parse(content) as LinksFile;
      } catch (err) {
        console.error(`[internal-links] Failed to parse ${file}:`, err);
        return null;
      }
    })
    .filter((f): f is LinksFile => f !== null);

  return cachedFiles;
}

// ============ الدالة الرئيسية ============
export function getInternalLinks(
  locale: Locale,
  pagePath: string
): ResolvedLink[] {
  const allFiles = loadAllLinkFiles();
  if (allFiles.length === 0) return [];

  const allSettings: Settings[] = [];
  const allKeywords = new Map<string, Keyword>();
  const allDoNotLink: string[] = [];
  let pageConfig: PageConfig | null = null;

  const normalizedPagePath = normalizePath(pagePath);

  for (const file of allFiles) {
    allSettings.push(file.settings);
    allDoNotLink.push(...(file.doNotLink || []));

    for (const kw of file.keywords || []) {
      if (!allKeywords.has(kw.id)) {
        allKeywords.set(kw.id, kw);
      }
    }

    for (const [p, config] of Object.entries(file.pages || {})) {
      if (normalizePath(p) === normalizedPagePath) {
        pageConfig = config;
        break;
      }
    }
  }

  if (!pageConfig) return [];

  const settings: Settings = {
    maxLinksPerPage: Math.min(...allSettings.map((s) => s.maxLinksPerPage)),
    excludeSelfLinks: allSettings.some((s) => s.excludeSelfLinks),
    linkFirstOccurrenceOnly: allSettings.some((s) => s.linkFirstOccurrenceOnly),
    skipHeadings: allSettings.some((s) => s.skipHeadings),
    minParagraphLength: Math.max(
      ...allSettings.map((s) => s.minParagraphLength)
    ),
  };

  const doNotLinkSet = new Set(allDoNotLink.map((w) => w.toLowerCase()));

  const resolved: ResolvedLink[] = [];
  const seenTargets = new Set<string>();

  for (const keywordId of pageConfig.applyKeywords) {
    if (resolved.length >= settings.maxLinksPerPage) break;

    const kw = allKeywords.get(keywordId);
    if (!kw || !kw.enabled) continue;

    if (
      settings.excludeSelfLinks &&
      normalizePath(kw.targetUrl) === normalizedPagePath
    ) {
      continue;
    }

    if (seenTargets.has(kw.targetUrl)) continue;
    seenTargets.add(kw.targetUrl);

    const termInLocale = kw.term[locale];
    if (!termInLocale) continue;

    if (doNotLinkSet.has(termInLocale.toLowerCase())) continue;

    resolved.push({
      keyword: termInLocale,
      targetUrl: kw.targetUrl,
      keywordId: kw.id,
    });
  }

  return resolved;
}

// ============ دالة مساعدة ============
function normalizePath(p: string): string {
  let n = p.trim();
  if (!n.startsWith('/')) n = '/' + n;
  if (n.length > 1 && n.endsWith('/')) n = n.slice(0, -1);
  return n;
}