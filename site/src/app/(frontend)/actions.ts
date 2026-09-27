'use server'
import { headers } from 'next/headers'
import { getClient } from '@/lib/data'

export type EnquiryInput = {
  name: string
  phone: string
  email?: string
  course: string
  message?: string
  consent: boolean
  website?: string // honeypot: real people never fill this
  sourcePage?: string
}

export type EnquiryResult = { ok: true } | { ok: false; errors: Partial<Record<keyof EnquiryInput | 'form', string>> }

// Basic protection against form spam: at most 5 enquiries per IP per 10 minutes (per server instance).
const hits = new Map<string, number[]>()
function rateLimited(ip: string) {
  const now = Date.now()
  const recent = (hits.get(ip) || []).filter((t) => now - t < 10 * 60_000)
  recent.push(now)
  hits.set(ip, recent)
  return recent.length > 5
}

export async function submitEnquiry(input: EnquiryInput): Promise<EnquiryResult> {
  // Silently accept bots that fill the hidden field, without saving anything.
  if (input.website) return { ok: true }

  const name = String(input.name || '').trim().slice(0, 80)
  const phone = String(input.phone || '').replace(/\D/g, '').replace(/^91(?=\d{10}$)/, '')
  const email = String(input.email || '').trim().slice(0, 120)
  const course = String(input.course || '').trim().slice(0, 120)
  const message = String(input.message || '').trim().slice(0, 500)

  const errors: Partial<Record<keyof EnquiryInput, string>> = {}
  if (name.length < 2) errors.name = 'Please enter your name'
  if (!/^[6-9]\d{9}$/.test(phone)) errors.phone = 'Please enter a 10-digit mobile number'
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Please enter a valid email, or leave it empty'
  if (!course) errors.course = 'Please choose a course'
  if (!input.consent) errors.consent = 'Please tick to allow us to contact you'
  if (Object.keys(errors).length) return { ok: false, errors }

  const h = await headers()
  const ip = (h.get('x-forwarded-for') || '').split(',')[0].trim() || h.get('x-real-ip') || 'unknown'
  if (rateLimited(ip)) return { ok: false, errors: { form: 'Too many enquiries from this connection. Please WhatsApp or call us instead.' } }

  try {
    const payload = await getClient()
    await payload.create({
      collection: 'enquiries',
      overrideAccess: true, // the public cannot create enquiries directly; this validated action can
      data: {
        name,
        phone,
        email: email || undefined,
        course,
        message: message || undefined,
        consent: true,
        sourcePage: String(input.sourcePage || '').slice(0, 200),
        status: 'new',
      },
    })
    return { ok: true }
  } catch (err) {
    console.error('Failed to save enquiry', err)
    return { ok: false, errors: { form: 'Sorry, something went wrong. Please WhatsApp or call us instead.' } }
  }
}
