import Link from 'next/link'
import { CourseCard, NoReviewsYet, ReviewCard } from '@/components/Cards'
import { Icon } from '@/components/Icon'
import { T } from '@/components/Lang'
import { LeadForm } from '@/components/LeadForm'
import { Photo } from '@/components/Photo'
import { Reels } from '@/components/Reels'
import { getCourses, getPhotos, getReviews, getServiceCategories, getSettings, mediaUrl, toCourseCards } from '@/lib/data'
import { reelsFrom, toSiteLinks, waLink } from '@/lib/site'

const DEFAULT_PORTFOLIO = [
  { src: '/images/bridal-6.jpg', caption: 'Bridal look at our studio' },
  { src: '/images/bridal-4.jpg', caption: 'Kundan bridal look' },
  { src: '/images/bridal-3.jpg', caption: 'Soft glam bride' },
  { src: '/images/bridal-5.jpg', caption: 'Bridal lehenga look' },
  { src: '/images/bridal-1.jpg', caption: 'HD bridal look' },
]

const kFmt = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(n % 1000 ? 1 : 0).replace('.0', '')}K+` : `${n}+`)

export default async function HomePage() {
  const [settings, photos, courses, services, reviews] = await Promise.all([
    getSettings(), getPhotos(), getCourses(), getServiceCategories(), getReviews(3),
  ])
  const links = toSiteLinks(settings)
  const portrait = mediaUrl(photos.founderPortrait) || '/images/poonam-mehla.jpg'
  const portfolio = photos.bridalPortfolio?.length
    ? photos.bridalPortfolio.map((p) => ({ src: mediaUrl(p.image, 'card'), caption: p.caption || '' }))
    : DEFAULT_PORTFOLIO
  const followers = settings.stats?.instagramFollowers ?? 4000
  const posts = settings.stats?.postsShared ?? 970
  const rating = settings.rating?.score && settings.rating?.count ? settings.rating : null

  return (
    <div className="page on">
      <section className="hero2">
        <div className="wrap hero2-grid">
          <div className="hero2-copy reveal">
            <span className="eyebrow"><Icon name="pin" style={{ width: 16, height: 16 }} /><T k="hero_eyebrow" /></span>
            <T k="hero_title" html as="h1" className="display" />
            <T k="hero_sub" as="p" className="hero2-sub" />
            <div className="btn-row">
              <Link href="/contact" className="btn btn-rose"><T k="cta_demo" /><Icon name="arrow" /></Link>
              <a className="btn btn-light" href={waLink(links.whatsapp, "Hi! I'd like to know more about your beauty courses.")} target="_blank" rel="noopener">
                <Icon name="chat" /><T k="cta_wa" />
              </a>
            </div>
            <a href="#founder" className="founder-row" data-scroll="founder">
              <Photo src={portrait} alt="Poonam Mehla" className="founder-avatar"><span className="mono">PM</span></Photo>
              <span><small>Founded &amp; taught by</small><b>Poonam Mehla</b><span>Makeup Artist · Founder &amp; Lead Trainer</span></span>
            </a>
          </div>

          <div className="hero2-visual reveal">
            <div className="arch-outline" />
            <Photo src={portrait} alt="Poonam Mehla" caption="Photo: Poonam Mehla" className="arch hero2-photo" />
            <Photo src={mediaUrl(photos.heroBridal, 'thumb') || '/images/bridal-1.jpg'} caption="Bridal look" className="hero2-mini float" />
            <div className="name-card float" style={{ animationDelay: '1.2s' }}>
              <span className="nc-sig">Poonam Mehla</span>
              <span className="small">Founder &amp; Lead Trainer</span>
            </div>
            <a className="stat-chip float" href={links.instagram} target="_blank" rel="noopener" style={{ animationDelay: '2.4s' }}>
              <span className="ig-dot"><Icon name="ig" /></span>
              <span><b>{kFmt(followers)}</b> followers<br /><span className="small">{links.instagramHandle}</span></span>
            </a>
          </div>
        </div>
        <a href="#homeHL" className="scroll-cue" data-scroll="homeHL" aria-label="Scroll to explore"><span>Scroll to explore</span><Icon name="chev" /></a>
      </section>

      <div className="ribbon" aria-hidden="true">
        <div className="ribbon-track">
          {[0, 1].flatMap((r) =>
            ['Bridal Makeup', 'HD Makeup', 'Airbrush', 'Hairstyling', 'Saree Draping', 'Nail Extensions', 'Nail Art', 'Skin Care'].map((s) => <span key={`${r}${s}`}>{s}</span>),
          )}
        </div>
      </div>

      <section className="sec" id="homeHL" style={{ paddingTop: 40 }}>
        <div className="wrap">
          <div className="hl-grid">
            <div className="hl reveal"><div className="hl-ico"><Icon name="brush" /></div><h3>100% Practical</h3><p>Hands-on practice on real models from day one.</p></div>
            <div className="hl reveal"><div className="hl-ico"><Icon name="award" /></div><h3>Certified Courses</h3><p>Graduate with a certificate you can show clients.</p></div>
            <div className="hl reveal"><div className="hl-ico"><Icon name="brief" /></div><h3>Job &amp; Salon Support</h3><p>Guidance to get hired, freelance or open your salon.</p></div>
            <div className="hl reveal"><div className="hl-ico"><Icon name="pin" /></div><h3>Central Location</h3><p>Easy to reach at Kache Quarter, Sonipat.</p></div>
          </div>
        </div>
      </section>

      <section className="statement" aria-label="Crafting professional beauty experts">
        <div className="st-row st-outline"><div className="st-track">
          {[0, 1].flatMap((r) => ['Crafting', 'Professional', 'Beauty', 'Experts'].map((w) => <span key={`${r}${w}`}>{w}</span>))}
        </div></div>
        <div className="st-row st-fill"><div className="st-track rev">
          {[0, 1].flatMap((r) => ['Bridal', 'Makeup', 'Hair', 'Nails', 'Mehndi', 'Skin'].map((w) => <span key={`${r}${w}`}>{w}</span>))}
        </div></div>
      </section>

      <section className="sec tint">
        <div className="wrap">
          <div className="sec-head reveal sec-head-row">
            <div><span className="eyebrow">Our programs</span><h2 style={{ margin: 0 }}>Courses that build careers</h2></div>
            <Link href="/courses" className="link-arrow">View all courses <Icon name="arrow" /></Link>
          </div>
          <div className="cards swipe">
            {toCourseCards(courses).map((c, i) => <CourseCard key={c.slug} c={c} i={i} whatsapp={links.whatsapp} />)}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="sec-head reveal sec-head-row">
            <div><span className="eyebrow">Salon &amp; bridal studio</span><h2 style={{ margin: 0 }}>Our beauty services</h2></div>
            <Link href="/services" className="link-arrow">See all services <Icon name="arrow" /></Link>
          </div>
          <div className="svc-tiles">
            {services.map((s) => (
              <Link key={s.id} className="svc-tile reveal" href={`/services#svc-${s.slug}`}>
                <span className="hl-ico"><Icon name={s.icon || 'spark'} /></span>
                <b>{s.name}</b>
                <span>{s.items?.length || 0} services</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="sec founder" id="founder">
        <div className="wrap founder-grid">
          {/* Founder collage: circular portrait layered over two framed, tilted photos */}
          <div className="mosaic founder-collage reveal">
            <div className="founder-ring" aria-hidden="true" />
            <Photo src={mediaUrl(photos.founderStudio, 'card') || '/images/studio-1.jpg'} caption="Poonam Mehla Makeover studio" tone="t2" className="m2" keepCaption />
            <Photo src={mediaUrl(photos.founderClass, 'card') || '/images/class-1.jpg'} caption="Bridal prep with students" tone="t3" className="m3" keepCaption posTop />
            <Photo src={portrait} alt="Poonam Mehla" caption="Poonam Mehla" className="m1" />
            <div className="founder-badge"><b>Poonam Mehla</b><span>Founder &amp; Lead Trainer</span></div>
          </div>
          <div className="reveal">
            <span className="eyebrow">Meet the founder</span>
            <h2 className="founder-name">Poonam Mehla</h2>
            <p className="founder-role">Makeup Artist · Founder &amp; Lead Trainer, Poonam Beauty Academy</p>
            <p className="lead">A working makeup artist from Sonipat who teaches the same bridal, party and hairstyling looks her clients book — and shares her work every week with thousands of followers on Instagram and YouTube.</p>
            <div className="stats">
              <div><b>{kFmt(followers)}</b><span>Instagram followers</span></div>
              <div><b>{posts}+</b><span>Looks &amp; reels shared</span></div>
              <div><b>{courses.length}</b><span>Career courses</span></div>
              <div><b>100%</b><span>Practical training</span></div>
            </div>
            <p className="quote">Crafting professional beauty experts.</p>
            <div className="btn-row">
              <a className="btn btn-primary" href={links.instagram} target="_blank" rel="noopener"><Icon name="ig" />Follow Poonam</a>
              <a className="btn btn-ghost" href={links.youtube} target="_blank" rel="noopener"><Icon name="yt" />YouTube</a>
              <Link href="/about" className="link-arrow" style={{ minHeight: 48 }}>Our story <Icon name="arrow" /></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="sec portfolio">
        <div className="wrap">
          <div className="sec-head reveal sec-head-row">
            <div><span className="eyebrow">Bridal portfolio</span><h2 style={{ margin: 0 }}>Brides styled at Poonam Mehla Makeover</h2></div>
            <Link href="/gallery" className="link-arrow">View full gallery <Icon name="arrow" /></Link>
          </div>
          {/* Moving bridal carousel: the photos repeat once so the loop is seamless */}
          <div className="bride-row bride-marquee reveal">
            <div className="bride-track">
              {[0, 1].flatMap((copy) =>
                portfolio.slice(0, 5).map((p, i) => (
                  <Photo
                    key={`${copy}-${i}`}
                    href="/gallery"
                    src={p.src}
                    caption={p.caption}
                    tone={['', 't2', 't3'][i % 3]}
                    className={i === 0 ? 'b-feature' : ''}
                    keepCaption
                    posTop
                    hidden={copy === 1}
                  />
                )),
              )}
            </div>
          </div>
          <div className="btn-row mt-24">
            <a className="btn btn-primary" href={waLink(links.whatsapp, "Hi! I'd like to book bridal makeup. Please share packages and available dates.")} target="_blank" rel="noopener"><Icon name="crown" />Book your bridal look</a>
            <Link href="/courses/bridal" className="btn btn-ghost">Learn bridal makeup</Link>
          </div>
        </div>
      </section>

      <section className="sec tint" id="igSection">
        <div className="wrap">
          <div className="ig-head reveal">
            <div><span className="eyebrow">Straight from our Instagram</span><h2 style={{ margin: 0 }}>Real students, real transformations</h2></div>
            <div className="btn-row"><a className="btn btn-primary" href={links.instagram} target="_blank" rel="noopener"><Icon name="ig" />Follow on Instagram</a></div>
          </div>
          <Reels codes={reelsFrom(settings).slice(0, 6)} swipe />
          <div className="center mt-24"><Link href="/gallery" className="link-arrow">See all reels in the gallery <Icon name="arrow" /></Link></div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="sec-head reveal sec-head-row">
            <div><span className="eyebrow">{rating ? `${rating.score} ★ on Google` : 'Reviews'}</span><h2 style={{ margin: 0 }}>What our students say</h2></div>
            <div className="btn-row"><Link href="/reviews" className="link-arrow">Read all reviews <Icon name="arrow" /></Link></div>
          </div>
          {reviews.length ? <div className="rv-grid">{reviews.map((r) => <ReviewCard key={r.id} r={r} />)}</div> : <NoReviewsYet reviewLink={links.googleReviewLink} />}
        </div>
      </section>

      <section className="sec">
        <div className="wrap loc">
          <div className="reveal">
            <span className="eyebrow">Visit us</span>
            <h2>Find us at Kache Quarter, Sonipat</h2>
            <ul className="info-list">
              <li><span className="hl-ico"><Icon name="pin" /></span><span><b>Address</b>{links.address}</span></li>
              {links.hours ? <li><span className="hl-ico"><Icon name="clock" /></span><span><b>Hours</b>{links.hours}</span></li> : null}
              <li><span className="hl-ico"><Icon name="phone" /></span><span><b>Phone</b><a href={`tel:${links.phoneTel}`}>{links.phoneDisplay}</a></span></li>
            </ul>
            <a className="btn btn-primary" href={links.directions} target="_blank" rel="noopener"><Icon name="pin" />Get Directions</a>
          </div>
          {links.mapEmbed ? <iframe className="map reveal" src={links.mapEmbed} title="Map to Poonam Beauty Academy, Kache Quarter, Sonipat" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /> : null}
        </div>
      </section>

      <section className="sec dark cta-band">
        <div className="wrap cta-grid">
          <div className="reveal">
            <span className="eyebrow">Free demo class</span>
            <h2 className="display">Your beauty career starts with one class</h2>
            <p style={{ maxWidth: '48ch' }}>Sit in on a live session, meet the trainer and see the studio — no fees, no pressure.</p>
            <div className="btn-row mt-24">
              <a className="btn btn-wa" href={waLink(links.whatsapp, "Hi! I'd like to book a free demo class.")} target="_blank" rel="noopener"><Icon name="chat" />Chat on WhatsApp</a>
              <a
                className="btn btn-light"
                href={links.brochure || waLink(links.whatsapp, 'Hi! Please send me your course brochure.')}
                {...(links.brochure ? { download: true } : { target: '_blank', rel: 'noopener' })}
              >
                <Icon name="down" />Download Brochure
              </a>
            </div>
          </div>
          <div className="reveal"><LeadForm kind="short" courses={courses.map((c) => c.title)} /></div>
        </div>
      </section>
    </div>
  )
}
