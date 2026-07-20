import { redirect } from 'next/navigation'
import { LANGS, type Lang } from '@/lib/i18n'

// Safe stub: the real 301 lives in next.config.mjs and fires before this route.
// This file exists only so a plain re-upload fully replaces the old apostille page
// without requiring a manual delete on GitHub.
export async function generateStaticParams() {
  return LANGS.map((l) => ({ lang: l }))
}

export default async function Page({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params
  redirect(`/${lang}/attestation/mofa/`)
}
