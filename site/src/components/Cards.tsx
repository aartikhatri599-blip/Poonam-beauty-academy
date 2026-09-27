import Link from 'next/link'
import { Icon } from './Icon'
import { Photo } from './Photo'
import { LEVEL_LABEL, waLink } from '@/lib/site'

export type CourseCardData = {
  slug: string
  title: string
  level: string
  image: string | null
  highlights: string[]
  duration?: string | null
}

const TONES = ['', 't2', 't3']

export function CourseCard({ c, i, whatsapp }: { c: CourseCardData; i: number; whatsapp: string }) {
  return (
    <article className="card reveal">
      <div style={{ position: 'relative' }}>
        <Photo src={c.image} caption={c.title} tone={TONES[i % 3]} />
        <span className="lvl">{LEVEL_LABEL[c.level] || c.level}</span>
      </div>
      <div className="card-body">
        <div className="meta">
          <span className="chip"><Icon name="clock" />Duration: {c.duration || 'ask us'}</span>
          <span className="chip"><Icon name="award" />Certificate</span>
        </div>
        <h3>{c.title}</h3>
        <ul className="ticks">{c.highlights.map((h) => <li key={h}><Icon name="check" />{h}</li>)}</ul>
        <div className="btn-row" style={{ marginTop: 'auto', paddingTop: 8 }}>
          <Link className="btn btn-primary" href={`/courses/${c.slug}`} style={{ flex: 1 }}>Inquire Now</Link>
          <a
            className="icon-btn"
            href={waLink(whatsapp, `Hi! I want details of the ${c.title} course.`)}
            target="_blank"
            rel="noopener"
            aria-label={`Ask about ${c.title} on WhatsApp`}
            style={{ color: 'var(--wa-ink)', background: '#E7F9EE', borderColor: '#CDEFD9' }}
          >
            <Icon name="chat" />
          </a>
        </div>
      </div>
    </article>
  )
}

export type ReviewCardData = { id: number | string; name: string; course?: string | null; quote: string; rating?: number | null; source?: string | null }

export function ReviewCard({ r }: { r: ReviewCardData }) {
  const stars = Math.max(1, Math.min(5, Math.round(r.rating || 5)))
  return (
    <article className="rv reveal">
      <span className="stars" aria-label={`${stars} out of 5 stars`}>{Array.from({ length: stars }, (_, i) => <Icon key={i} name="star" />)}</span>
      <p>“{r.quote}”</p>
      <div className="who">
        <span className="avatar">{r.name.charAt(0)}</span>
        <div><b>{r.name}</b>{r.course ? <span>{r.course}</span> : null}</div>
        {r.source === 'google' ? <span className="g-logo"><span>G</span></span> : null}
      </div>
    </article>
  )
}

/** Shown instead of fake reviews when none have been added yet. */
export function NoReviewsYet({ reviewLink }: { reviewLink: string }) {
  return (
    <div className="empty-note reveal">
      <p style={{ margin: '0 0 12px' }}>Reviews from our students will appear here soon.</p>
      <a className="btn btn-ghost" href={reviewLink} target="_blank" rel="noopener"><Icon name="star" />Studied with us? Leave a Google review</a>
    </div>
  )
}
