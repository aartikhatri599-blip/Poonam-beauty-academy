'use client'
import { useEffect, useState } from 'react'
import { Icon } from './Icon'
import { waLink } from '@/lib/site'

type Saved = { name: string; phone: string; course: string; message?: string }

/** Reads the just-sent enquiry from this tab's session storage (never from the URL). */
export function ThankYou({ whatsapp, directions, instagram, handle }: { whatsapp: string; directions: string; instagram: string; handle: string }) {
  const [saved, setSaved] = useState<Saved | null>(null)
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem('pba-enquiry')
      if (raw) setSaved(JSON.parse(raw))
    } catch {}
  }, [])

  const text = saved
    ? `Hi! I'd like to book a free demo class.\nName: ${saved.name}\nMobile: +91 ${saved.phone}\nCourse: ${saved.course}${saved.message ? `\nMessage: ${saved.message}` : ''}`
    : "Hi! I'd like to book a free demo class."

  return (
    <div className="wrap thanks">
      <div className="ok"><Icon name="check" /></div>
      <h1>{saved ? `Thank you, ${saved.name.split(' ')[0]}!` : 'Thank you!'}</h1>
      <p className="lead">We&apos;ll call you within 2 working hours to fix your free demo class.</p>
      <div className="btn-row mt-24" style={{ justifyContent: 'center' }}>
        <a className="btn btn-wa" href={waLink(whatsapp, text)} target="_blank" rel="noopener"><Icon name="chat" />Chat now on WhatsApp</a>
        <a className="btn btn-ghost" href={directions} target="_blank" rel="noopener"><Icon name="pin" />Get Directions</a>
      </div>
      <p className="mt-40 small" style={{ color: 'var(--muted)' }}>While you wait, see what our students are creating.</p>
      <a className="btn btn-primary" href={instagram} target="_blank" rel="noopener"><Icon name="ig" />Follow {handle}</a>
    </div>
  )
}
