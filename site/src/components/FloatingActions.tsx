'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Icon } from './Icon'
import { T } from './Lang'
import { waLink } from '@/lib/site'

/** Mobile quick-action bar, floating WhatsApp button (desktop) and back-to-top button. */
export function FloatingActions({ whatsapp, phoneTel }: { whatsapp: string; phoneTel: string }) {
  const pathname = usePathname()
  const [barShow, setBarShow] = useState(false)
  const [topShow, setTopShow] = useState(false)
  const [typing, setTyping] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setBarShow(window.scrollY > 420 || pathname !== '/')
      setTopShow(window.scrollY > 900)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    // hide the bar while the on-screen keyboard is open
    const onIn = (e: FocusEvent) => { if ((e.target as HTMLElement).matches?.('input,select,textarea')) setTyping(true) }
    const onOut = () => setTyping(false)
    document.addEventListener('focusin', onIn)
    document.addEventListener('focusout', onOut)
    return () => {
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('focusin', onIn)
      document.removeEventListener('focusout', onOut)
    }
  }, [pathname])

  const wa = waLink(whatsapp, "Hi! I'm interested in your beauty courses.")
  return (
    <>
      <nav className={`mbar${barShow && !typing ? ' show' : ''}`} aria-label="Quick actions">
        <a className="m-wa" href={wa} target="_blank" rel="noopener"><Icon name="chat" />WhatsApp</a>
        <a className="m-call" href={`tel:${phoneTel}`}><Icon name="phone" /><T k="cta_call" /></a>
        <Link className="m-demo" href="/contact"><Icon name="cal" />Book Demo</Link>
      </nav>
      <button className={`to-top${topShow ? ' show' : ''}`} aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <Icon name="chev" />
      </button>
      <a className="wa-float" href={wa} target="_blank" rel="noopener" aria-label="Chat on WhatsApp"><Icon name="chat" /></a>
    </>
  )
}
