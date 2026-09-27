import type { Metadata } from 'next'
import Link from 'next/link'
import { NoReviewsYet, ReviewCard } from '@/components/Cards'
import { Icon } from '@/components/Icon'
import { Photo } from '@/components/Photo'
import { getReviews, getSettings, getStories, mediaUrl } from '@/lib/data'
import { toSiteLinks, waLink } from '@/lib/site'

export const metadata: Metadata = { title: 'Reviews', description: 'Reviews and success stories from Poonam Beauty Academy students.' }

export default async function ReviewsPage() {
  const [settings, reviews, stories] = await Promise.all([getSettings(), getReviews(), getStories()])
  const links = toSiteLinks(settings)
  const rating = settings.rating?.score && settings.rating?.count ? settings.rating : null

  return (
    <div className="page on">
      <section className="p-hero">
        <div className="wrap">
          <div className="crumbs"><Link href="/">Home</Link> / Reviews</div>
          <span className="eyebrow">Reviews &amp; success stories</span>
          <h1>Loved by our students</h1>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="big-rating reveal">
            <span className="g-logo" style={{ width: 48, height: 48 }}><span style={{ width: 34, height: 34, fontSize: 18 }}>G</span></span>
            <div><div className="score">{rating ? Number(rating.score).toFixed(1) : '★'}</div></div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <b style={{ color: 'var(--maroon)' }}>Google reviews</b>
              <div className="small" style={{ color: 'var(--muted)' }}>{rating ? `Based on ${rating.count} reviews` : 'See what our students say on Google.'}</div>
            </div>
            <a className="btn btn-primary" href={links.googleReviewLink} target="_blank" rel="noopener"><Icon name="star" />Write a review on Google</a>
          </div>

          {stories.length ? (
            <>
              <div className="sec-head mt-40 reveal"><span className="eyebrow">Success stories</span><h2>From students to salon owners</h2></div>
              <div className="cards">
                {stories.map((s, i) => {
                  const card = (
                    <>
                      <div style={{ position: 'relative' }}><Photo src={mediaUrl(s.photo, 'card')} caption={s.name} tone={['', 't2', 't3'][i % 3]} icon={s.videoUrl ? 'play' : 'img'} posTop /></div>
                      <div className="card-body">
                        <h3>{s.name}</h3>
                        <span className="chip"><Icon name="brief" />{s.outcome}</span>
                        {s.course ? <p className="small" style={{ margin: 0, color: 'var(--muted)' }}>Course: {s.course}</p> : null}
                      </div>
                    </>
                  )
                  return s.videoUrl ? (
                    <a key={s.id} className="card reveal" href={s.videoUrl} target="_blank" rel="noopener" style={{ textDecoration: 'none', color: 'inherit' }}>{card}</a>
                  ) : (
                    <article key={s.id} className="card reveal">{card}</article>
                  )
                })}
              </div>
            </>
          ) : null}

          <div className="sec-head mt-40 reveal"><span className="eyebrow">Student reviews</span><h2>Recent reviews</h2></div>
          {reviews.length ? <div className="rv-grid">{reviews.map((r) => <ReviewCard key={r.id} r={r} />)}</div> : <NoReviewsYet reviewLink={links.googleReviewLink} />}
        </div>
      </section>

      <section className="sec tint center">
        <div className="wrap reveal">
          <h2>Be our next success story</h2>
          <div className="btn-row mt-24" style={{ justifyContent: 'center' }}>
            <Link href="/contact" className="btn btn-primary">Book a Free Demo Class</Link>
            <a className="btn btn-wa" href={waLink(links.whatsapp, 'Hi! I read your reviews and want to know more.')} target="_blank" rel="noopener"><Icon name="chat" />Chat on WhatsApp</a>
          </div>
        </div>
      </section>
    </div>
  )
}
