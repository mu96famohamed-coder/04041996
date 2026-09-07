import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'E-Notary Dubai — Notary Support Dubai',
  description: 'Professional notary support services in Dubai, UAE',
  // Google Search reads rel="icon" and does not support SVG as a favicon format
  // (supported list: BMP, GIF, ICO, PNG, JPEG, PPM, TIFF — Search Central, 2026-08-28).
  // A single rel="icon" pointing at the multi-size ICO (16/32/48/96) avoids any
  // ambiguity about which declaration Google picks up.
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
  },
}

// Root layout — intentionally minimal.
// The real <html> and <body> tags are rendered by app/[lang]/layout.tsx
// which handles lang, dir, fonts, Navbar, Footer, and GA.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
