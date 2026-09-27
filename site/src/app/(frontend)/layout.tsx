import type { Metadata, Viewport } from 'next'
import { Noto_Sans_Devanagari, Playfair_Display, Poppins } from 'next/font/google'
import React from 'react'
import './styles.css'

import { Effects } from '@/components/Effects'
import { FloatingActions } from '@/components/FloatingActions'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { IconSprite } from '@/components/Icon'
import { LangProvider } from '@/components/Lang'
import { Ticker } from '@/components/Ticker'
import { getCourses, getSettings } from '@/lib/data'
import { toSiteLinks } from '@/lib/site'

// Content comes from Payload, so always render with the latest data.
export const dynamic = 'force-dynamic'

const serif = Playfair_Display({ subsets: ['latin'], weight: ['600', '700'], style: ['normal', 'italic'], variable: '--font-serif', display: 'swap' })
const sans = Poppins({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-sans', display: 'swap' })
const deva = Noto_Sans_Devanagari({ subsets: ['devanagari'], weight: ['400', '600'], variable: '--font-deva', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'),
  title: {
    default: 'Poonam Beauty Academy – Makeup & Beauty Courses in Sonipat',
    template: '%s – Poonam Beauty Academy',
  },
  description:
    '100% practical makeup, bridal, hair and nail art courses at Kache Quarter, Sonipat. Certified training with job and salon support. Book a free demo class.',
}

export const viewport: Viewport = { themeColor: '#3D2540', width: 'device-width', initialScale: 1, viewportFit: 'cover' }

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [settings, courses] = await Promise.all([getSettings(), getCourses()])
  const links = toSiteLinks(settings)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': ['EducationalOrganization', 'LocalBusiness'],
    name: 'Poonam Beauty Academy',
    slogan: 'Transform Your Passion into a Profession',
    telephone: links.phoneTel,
    address: { '@type': 'PostalAddress', streetAddress: 'Kache Quarter', addressLocality: 'Sonipat', addressRegion: 'Haryana', addressCountry: 'IN' },
    sameAs: [links.instagram, links.youtube].filter((u) => u && u !== '#'),
  }

  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${deva.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <IconSprite />
        <LangProvider>
          <a href="#main" className="hp" style={{ position: 'absolute' }}>Skip to content</a>
          <Ticker items={settings.announcements} links={links} />
          <Header links={links} />
          <main id="main">{children}</main>
          <Footer links={links} courses={courses.map((c) => ({ title: c.title, slug: c.slug }))} />
          <FloatingActions whatsapp={links.whatsapp} phoneTel={links.phoneTel} />
          <Effects />
        </LangProvider>
      </body>
    </html>
  )
}
