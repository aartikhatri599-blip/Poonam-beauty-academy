import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ReviewCard } from '@/components/Cards'
import { Icon } from '@/components/Icon'
import { LeadForm } from '@/components/LeadForm'
import { Photo } from '@/components/Photo'
import { Reels } from '@/components/Reels'
import { getCourse, getCourses, getReviews, getSettings, mediaUrl } from '@/lib/data'
import { LEVEL_LABEL, reelsFrom, toSiteLinks, waLink } from '@/lib/site'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const c = await getCourse(slug)
  if (!c) return {}
  return { title: `${c.title} in Sonipat`, description: c.blurb }
}

export default async function CoursePage({ params }: Props) {
  const { slug } = await params
  const [c, courses, settings, reviews] = await Promise.all([getCourse(slug), getCourses(), getSettings(), getReviews(3)])
  if (!c) notFound()
  const links = toSiteLinks(settings)
  const others = courses.filter((o) => o.slug !== c.slug)
  const reels = c.reels?.length ? c.reels.map((r) => r.code) : reelsFrom(settings).slice(0, 3)

  return (
    <div className="page on">
      <section className="p-hero">
        <div className="wrap split" style={{ alignItems: 'center' }}>
          <div>
            <div className="crumbs"><Link href="/">Home</Link> / <Link href="/courses">Courses</Link> / {c.title}</div>
            <span className="chip">{LEVEL_LABEL[c.level] || c.level}</span>
            <h1 style={{ marginTop: 12 }}>{c.title}</h1>
            <p className="lead">{c.blurb}</p>
            <div className="facts">
              <div className="fact"><small>Duration</small><b>{c.duration || 'Ask us'}</b></div>
              <div className="fact"><small>Batches</small><b>{c.batches || 'Flexible timings'}</b></div>
              <div className="fact"><small>Fees</small><b>{c.fees || 'On WhatsApp'}</b></div>
              <div className="fact"><small>Certificate</small><b>Included</b></div>
            </div>
            <div className="btn-row">
              <a className="btn btn-primary" href="#cd-form" data-scroll="cd-form">Inquire Now <Icon name="arrow" /></a>
              <a className="btn btn-wa" href={waLink(links.whatsapp, `Hi! Please share fees, duration and batch timings for ${c.title}.`)} target="_blank" rel="noopener"><Icon name="chat" />Fees on WhatsApp</a>
            </div>
          </div>
          <div><Photo src={mediaUrl(c.image, 'card')} caption={c.title} className="arch trainer-ph" /></div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap split" style={{ alignItems: 'start' }}>
          <div>
            <span className="eyebrow">Who this is for</span><h2>Is this course for you?</h2>
            <ul className="ticks" style={{ fontSize: 16, lineHeight: '24px', gap: 12 }}>
              {(c.whoFor || []).map((w) => <li key={w.id}><Icon name="check" />{w.text}</li>)}
            </ul>
            <div className="mt-40"><span className="eyebrow">What you get</span>
              <div className="why" style={{ gridTemplateColumns: '1fr 1fr' }}>
                <div className="hl"><div className="hl-ico"><Icon name="brush" /></div><h3>Practice on models</h3></div>
                <div className="hl"><div className="hl-ico"><Icon name="spark" /></div><h3>Pro products kit</h3></div>
                <div className="hl"><div className="hl-ico"><Icon name="img" /></div><h3>Portfolio photos</h3></div>
                <div className="hl"><div className="hl-ico"><Icon name="award" /></div><h3>Certificate</h3></div>
              </div>
            </div>
          </div>
          <div>
            <span className="eyebrow">Curriculum</span><h2>What you&apos;ll learn</h2>
            {(c.modules || []).map((m, i) => (
              <details className="acc" key={m.id} open={i === 0}>
                <summary><span className="n">{String(i + 1).padStart(2, '0')}</span>{m.title}<Icon name="chev" /></summary>
                <div className="acc-body">{m.description}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="sec tint">
        <div className="wrap">
          <div className="ig-head">
            <div><span className="eyebrow">Student work</span><h2 style={{ margin: 0 }}>From our Instagram</h2></div>
            <a className="btn btn-ghost" href={links.instagram} target="_blank" rel="noopener"><Icon name="ig" />More on Instagram</a>
          </div>
          <Reels codes={reels} swipe />
        </div>
      </section>

      {reviews.length ? (
        <section className="sec">
          <div className="wrap">
            <div className="sec-head"><span className="eyebrow">Reviews</span><h2>From our alumni</h2></div>
            <div className="rv-grid">{reviews.map((r) => <ReviewCard key={r.id} r={r} />)}</div>
          </div>
        </section>
      ) : null}

      <section className="sec dark cta-band" id="cd-form">
        <div className="wrap cta-grid">
          <div>
            <span className="eyebrow">Enquire</span>
            <h2 className="display">Reserve your seat in the next batch</h2>
            {others.length ? (
              <p>Or explore: {others.map((o, i) => <span key={o.slug}>{i ? ' · ' : ''}<Link href={`/courses/${o.slug}`}>{o.title}</Link></span>)}</p>
            ) : null}
          </div>
          <div><LeadForm kind="short" courses={courses.map((x) => x.title)} defaultCourse={c.title} /></div>
        </div>
      </section>
    </div>
  )
}
