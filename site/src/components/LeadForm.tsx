'use client'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { Icon } from './Icon'
import { submitEnquiry, type EnquiryInput } from '@/app/(frontend)/actions'

type Props = {
  kind: 'short' | 'full'
  courses: string[]
  defaultCourse?: string
}

type Errors = Partial<Record<keyof EnquiryInput | 'form', string>>

/** Enquiry form: validated in the browser and again on the server, saved to Payload, emailed via Resend. */
export function LeadForm({ kind, courses, defaultCourse = '' }: Props) {
  const full = kind === 'full'
  const router = useRouter()
  const pathname = usePathname()
  const [errors, setErrors] = useState<Errors>({})
  const [pending, start] = useTransition()

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = e.currentTarget
    const fd = new FormData(f)
    const data: EnquiryInput = {
      name: String(fd.get('name') || '').trim(),
      phone: String(fd.get('phone') || '').replace(/\D/g, ''),
      email: String(fd.get('email') || '').trim(),
      course: String(fd.get('course') || ''),
      message: String(fd.get('message') || '').trim(),
      consent: fd.get('consent') === 'on',
      website: String(fd.get('website') || ''),
      sourcePage: pathname,
    }

    // quick checks in the browser (the server checks again)
    const errs: Errors = {}
    if (data.name.length < 2) errs.name = 'Please enter your name'
    if (!/^[6-9]\d{9}$/.test(data.phone)) errs.phone = 'Please enter a 10-digit mobile number'
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errs.email = 'Please enter a valid email, or leave it empty'
    if (!data.course) errs.course = 'Please choose a course'
    if (!data.consent) errs.consent = 'Please tick to allow us to contact you'
    setErrors(errs)
    if (Object.keys(errs).length) {
      const first = f.querySelector<HTMLElement>(`[name="${Object.keys(errs)[0]}"]`)
      first?.focus()
      return
    }

    start(async () => {
      const res = await submitEnquiry(data)
      if (!res.ok) { setErrors(res.errors); return }
      try {
        sessionStorage.setItem('pba-enquiry', JSON.stringify({ name: data.name, phone: data.phone, course: data.course, message: data.message }))
      } catch {}
      f.reset()
      router.push('/thank-you')
    })
  }

  const clear = (field: keyof EnquiryInput) => () => errors[field] && setErrors((e) => ({ ...e, [field]: undefined }))
  const fieldCls = (field: keyof EnquiryInput) => `field${errors[field] ? ' invalid' : ''}`

  return (
    <form className="form lead-form" noValidate onSubmit={onSubmit}>
      <div>
        <h3 style={{ fontFamily: 'var(--serif)', fontSize: 24, lineHeight: '32px', color: 'var(--maroon)', margin: 0 }}>{full ? 'Enquiry form' : 'Book your free demo'}</h3>
        <p className="small" style={{ margin: '4px 0 0', color: 'var(--muted)' }}>We&apos;ll call you back within 2 working hours.</p>
      </div>
      <div className={fieldCls('name')}>
        <label htmlFor={`n-${kind}`}>Name</label>
        <input id={`n-${kind}`} name="name" autoComplete="name" maxLength={50} placeholder="Your full name" onInput={clear('name')} />
        <div className="err">{errors.name}</div>
      </div>
      <div className={fieldCls('phone')}>
        <label htmlFor={`p-${kind}`}>Mobile number</label>
        <div className="tel"><span>+91</span><input id={`p-${kind}`} name="phone" type="tel" inputMode="numeric" autoComplete="tel-national" maxLength={10} placeholder="10-digit number" onInput={clear('phone')} /></div>
        <div className="err">{errors.phone}</div>
      </div>
      {full ? (
        <div className={fieldCls('email')}>
          <label htmlFor={`e-${kind}`}>Email <span style={{ fontWeight: 400, color: 'var(--muted)' }}>(optional, for a confirmation email)</span></label>
          <input id={`e-${kind}`} name="email" type="email" autoComplete="email" maxLength={120} placeholder="you@example.com" onInput={clear('email')} />
          <div className="err">{errors.email}</div>
        </div>
      ) : null}
      <div className={fieldCls('course')}>
        <label htmlFor={`c-${kind}`}>Course</label>
        <select id={`c-${kind}`} name="course" defaultValue={defaultCourse} onChange={clear('course')}>
          <option value="">Select a course</option>
          {courses.map((c) => <option key={c}>{c}</option>)}
          <option>Salon / bridal service</option>
          <option>Not sure yet</option>
        </select>
        <div className="err">{errors.course}</div>
      </div>
      {full ? (
        <div className="field">
          <label htmlFor={`m-${kind}`}>Message / preferred time <span style={{ fontWeight: 400, color: 'var(--muted)' }}>(optional)</span></label>
          <textarea id={`m-${kind}`} name="message" maxLength={300} placeholder="E.g. evening batch preferred" />
        </div>
      ) : null}
      <input className="hp" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div className={fieldCls('consent')}>
        <label className="consent"><input type="checkbox" name="consent" onChange={clear('consent')} /> I agree to be contacted on WhatsApp / phone about my enquiry.</label>
        <div className="err">{errors.consent}</div>
      </div>
      {errors.form ? <p className="form-status err" role="alert">{errors.form}</p> : null}
      <button className="btn btn-primary" type="submit" disabled={pending}>
        {pending ? 'Sending…' : <>Book My Free Demo <Icon name="arrow" /></>}
      </button>
    </form>
  )
}
