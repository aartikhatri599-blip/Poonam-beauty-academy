'use client'
import { createContext, useCallback, useContext, useEffect, useState } from 'react'

const STRINGS = {
  en: {
    nav_home: 'Home', nav_about: 'About', nav_services: 'Services', nav_courses: 'Courses', nav_gallery: 'Gallery', nav_reviews: 'Reviews', nav_contact: 'Contact',
    cta_demo: 'Book a Free Demo Class', cta_wa: 'Chat on WhatsApp', cta_call: 'Call', hero_eyebrow: 'Kache Quarter, Sonipat',
    hero_title: 'Transform your <em>passion</em> into a profession',
    hero_sub: '100% practical makeup, hair and beauty training in Sonipat — with a certificate, job support and a trainer you already follow on Instagram.',
  },
  hi: {
    nav_home: 'होम', nav_about: 'हमारे बारे में', nav_services: 'सर्विसेज़', nav_courses: 'कोर्स', nav_gallery: 'गैलरी', nav_reviews: 'रिव्यू', nav_contact: 'संपर्क',
    cta_demo: 'फ्री डेमो क्लास बुक करें', cta_wa: 'WhatsApp पर बात करें', cta_call: 'कॉल करें', hero_eyebrow: 'कच्चे क्वार्टर, सोनीपत',
    hero_title: 'अपने <em>शौक़</em> को बनाइए अपना प्रोफ़ेशन',
    hero_sub: 'सोनीपत में मेकअप, हेयर और ब्यूटी की 100% प्रैक्टिकल ट्रेनिंग — सर्टिफ़िकेट और जॉब सपोर्ट के साथ।',
  },
} as const

export type Lang = keyof typeof STRINGS
export type StringKey = keyof (typeof STRINGS)['en']

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({ lang: 'en', setLang: () => {} })

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en')
  useEffect(() => {
    try {
      const saved = localStorage.getItem('pba-lang')
      if (saved === 'hi') setLangState('hi')
    } catch {}
  }, [])
  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])
  const setLang = useCallback((l: Lang) => {
    setLangState(l)
    try { localStorage.setItem('pba-lang', l) } catch {}
  }, [])
  return <Ctx.Provider value={{ lang, setLang }}>{children}</Ctx.Provider>
}

export const useLang = () => useContext(Ctx)

/** Translated text. Use `html` only for our own trusted strings (e.g. <em> in the hero). */
export function T({ k, html, as: Tag = 'span', className }: { k: StringKey; html?: boolean; as?: 'span' | 'h1' | 'p'; className?: string }) {
  const { lang } = useLang()
  const text = STRINGS[lang][k]
  if (html) return <Tag className={className} dangerouslySetInnerHTML={{ __html: text }} />
  return <Tag className={className}>{text}</Tag>
}
