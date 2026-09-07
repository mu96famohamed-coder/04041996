import Link from 'next/link'
import { type Lang } from '@/lib/i18n'
import { LABELS } from '@/lib/serviceLinks'

// ─────────────────────────────────────────────────────────────────────────────
// Inline contextual links inside body copy.
//
// Syntax inside data/content.json:   [[/corporate/moa-amendment|MOA amendment]]
//
// Rules enforced here:
//   • Only internal paths that exist in LABELS become links. An unknown or
//     mistyped path renders as plain text — a broken link is not possible.
//   • The anchor text is returned untouched either way, so removing the
//     mechanism (or a single token) restores the original sentence exactly.
//   • stripLinks() gives the plain string for JSON-LD, where markup must not
//     leak into structured data.
// ─────────────────────────────────────────────────────────────────────────────

const TOKEN = /\[\[(\/[a-z0-9\-/]*)\|([^\]|]+)\]\]/g

/** Plain text with every token replaced by its anchor text. For JSON-LD. */
export function stripLinks(text: string): string {
  return text.replace(TOKEN, (_m, _path, anchor) => anchor)
}

/** Renders body copy, turning valid tokens into internal links. */
export function linkify(text: string, lang: Lang): React.ReactNode {
  if (!text || !text.includes('[[')) return text

  const nodes: React.ReactNode[] = []
  let cursor = 0
  let key = 0
  TOKEN.lastIndex = 0

  let m: RegExpExecArray | null
  while ((m = TOKEN.exec(text)) !== null) {
    const [full, path, anchor] = m
    if (m.index > cursor) nodes.push(text.slice(cursor, m.index))

    if (LABELS[path]) {
      nodes.push(
        <Link
          key={key++}
          href={`/${lang}${path}/`}
          className="text-gold-600 underline decoration-gold-400/60 underline-offset-2 hover:text-gold-500 transition-colors"
        >
          {anchor}
        </Link>
      )
    } else {
      nodes.push(anchor) // unknown target — plain text, never a broken link
    }
    cursor = m.index + full.length
  }
  if (cursor < text.length) nodes.push(text.slice(cursor))
  return nodes
}
