'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { Icon } from './Icon'
import { T, useLang, type StringKey } from './Lang'
import type { SiteLinks } from '@/lib/site'

const NAV: { href: string; key: StringKey }[] = [
  { href: '/', key: 'nav_home' },
  { href: '/about', key: 'nav_about' },
  { href: '/services', key: 'nav_services' },
  { href: '/courses', key: 'nav_courses' },
  { href: '/gallery', key: 'nav_gallery' },
  { href: '/reviews', key: 'nav_reviews' },
  { href: '/contact', key: 'nav_contact' },
]

export function Header({ links }: { links: SiteLinks }) {
  const pathname = usePathname()
  const { lang, setLang } = useLang()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [drawerTop, setDrawerTop] = useState(68)
  const hdr = useRef<HTMLElement>(null)

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href))

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // close the drawer on navigation
  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  const toggle = () => {
    if (!open && hdr.current) setDrawerTop(hdr.current.getBoundingClientRect().bottom)
    setOpen((o) => !o)
  }

  return (
    <>
      <header className={`hdr${scrolled ? ' scrolled' : ''}`} id="hdr" ref={hdr}>
        <div className="wrap">
          <Link href="/" className="brand" aria-label="Poonam Beauty Academy – home">
            <span className="mono">P</span>
            <span className="brand-name">Poonam Beauty<small>Academy · Sonipat</small></span>
          </Link>
          <nav className="nav" aria-label="Main">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className={isActive(n.href) ? 'active' : undefined}>
                <T k={n.key} />
              </Link>
            ))}
          </nav>
          <div className="lang" role="group" aria-label="Language">
            <button type="button" aria-pressed={lang === 'en'} onClick={() => setLang('en')}>EN</button>
            <button type="button" aria-pressed={lang === 'hi'} onClick={() => setLang('hi')}>हिं</button>
          </div>
          <a className="icon-btn call-btn" href={`tel:${links.phoneTel}`} aria-label="Call the academy"><Icon name="phone" /></a>
          <Link href="/contact" className="btn btn-primary"><T k="cta_demo" /></Link>
          <button className="icon-btn menu-btn" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="drawer" onClick={toggle}>
            <Icon name={open ? 'x' : 'menu'} />
          </button>
        </div>
      </header>

      <div className={`drawer${open ? ' open' : ''}`} id="drawer" style={{ top: drawerTop }}>
        {NAV.map((n) => (
          <Link key={n.href} className="dl" href={n.href}><T k={n.key} /></Link>
        ))}
        <Link href="/contact" className="btn btn-primary mt-24"><T k="cta_demo" /></Link>
        <div className="socials">
          <a href={links.instagram} target="_blank" rel="noopener" aria-label="Instagram"><Icon name="ig" /></a>
          <a href={links.youtube} target="_blank" rel="noopener" aria-label="YouTube"><Icon name="yt" /></a>
          <a href={links.googleProfile} target="_blank" rel="noopener" aria-label="Google reviews"><Icon name="star" /></a>
        </div>
      </div>
    </>
  )
}
