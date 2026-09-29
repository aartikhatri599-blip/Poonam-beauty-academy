import type { Metadata } from 'next'
import Link from 'next/link'
import { Icon } from '@/components/Icon'
import { Photo } from '@/components/Photo'
import { getCourses, getPhotos, getServiceCategories, getSettings, mediaUrl } from '@/lib/data'
import { toSiteLinks, waLink } from '@/lib/site'

const kFmt = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(n % 1000 ? 1 : 0).replace('.0', '')}K+` : `${n}+`)

export const metadata: Metadata = { title: 'About Us', description: 'The story of Poonam Beauty Academy and founder Poonam Mehla, Kache Quarter, Sonipat.' }

const DEFAULT_TOUR = [
  { src: '/images/studio-2.jpg', caption: 'Hair wash & styling floor' },
  { src: '/images/studio-1.jpg', caption: 'Makeup stations' },
  { src: '/images/studio-3.jpg', caption: 'Styling stations' },
  { src: '/images/class-1.jpg', caption: 'Live practical sessions' },
  { src: '/images/counselling-1.jpg', caption: 'Admission counselling' },
]

export default async function AboutPage() {
  const [settings, photos, courses, services] = await Promise.all([getSettings(), getPhotos(), getCourses(), getServiceCategories()])
  const links = toSiteLinks(settings)
  const tour = photos.studioTour?.length
    ? photos.studioTour.map((t) => ({ src: mediaUrl(t.image, 'card'), caption: t.caption || '' }))
    : DEFAULT_TOUR
  const serviceCount = services.reduce((n, s) => n + (s.items?.length || 0), 0)
  const portrait = mediaUrl(photos.founderPortrait) || '/images/poonam-mehla.jpg'
  const tourPhoto = (i: number, fallback: string) => tour[i]?.src || fallback
  const followers = settings.stats?.instagramFollowers ?? 4000
  const posts = settings.stats?.postsShared ?? 970

  return (
    <div className="page on">
      {/* About hero: text + photo collage */}
      <section className="p-hero about-hero">
        <div className="wrap about-hero-grid">
          <div className="reveal">
            <div className="crumbs"><Link href="/">Home</Link> / About</div>
            <span className="eyebrow">About us</span>
            <h1>Crafting professional beauty experts</h1>
            <p className="lead">A founder-led academy in the heart of Sonipat, built to turn a passion for beauty into a real income.</p>
            <div className="btn-row mt-24">
              <Link href="/contact" className="btn btn-primary">Book a Free Demo Class <Icon name="arrow" /></Link>
              <a className="btn btn-ghost" href={waLink(links.whatsapp, "Hi! I'd like to know more about Poonam Beauty Academy.")} target="_blank" rel="noopener"><Icon name="chat" />Chat on WhatsApp</a>
            </div>
            <ul className="about-facts">
              <li><Icon name="pin" />Kache Quarter, Sonipat</li>
              <li><Icon name="crown" />Founder-led by Poonam Mehla</li>
              <li><Icon name="brush" />100% practical training</li>
            </ul>
          </div>
          <div className="about-collage reveal" aria-hidden="true">
            <div className="ac-ring" />
            {/* Main arch: the owner at her studio; the bride sits in the round frame */}
            <Photo src="/images/poonam-mehla-portrait.jpg" caption="Poonam Mehla · Founder" className="arch ac-main ac-owner" keepCaption posTop />
            <Photo src={tourPhoto(4, '/images/counselling-1.jpg')} caption="Admission counselling" className="ac-card" keepCaption posTop />
            <Photo src={mediaUrl(photos.bridalPortfolio?.[0]?.image, 'card') || '/images/bridal-6.jpg'} className="ac-circle ac-bride" />
          </div>
        </div>
      </section>

      {/* Our story */}
      <section className="sec">
        <div className="wrap story-grid">
          <div className="story-photos reveal">
            <Photo src={mediaUrl(photos.aboutStory, 'card') || '/images/class-1.jpg'} caption="Bridal prep with students" className="sp-main" keepCaption posTop />
            <Photo src={mediaUrl(photos.founderStudio, 'card') || '/images/studio-1.jpg'} caption="Our studio" className="sp-small" keepCaption />
            <div className="sp-chip"><b>100%</b><span>practical, on real models</span></div>
          </div>
          <div className="reveal">
            <span className="eyebrow">Our story</span>
            <h2>From a bridal studio to a classroom</h2>
            <p>Poonam Beauty Academy is the teaching side of <b>Poonam Mehla Makeover</b>, makeup artist Poonam Mehla&apos;s bridal and beauty studio at Kache Quarter, Sonipat.</p>
            <p>Students learn inside a working studio, on the same bridal, party and hair looks Poonam creates for her own clients and shares every week with thousands of followers on Instagram and YouTube.</p>
            <p>The goal is simple: help women in Sonipat and nearby towns turn their love of beauty into a skill they can earn from — as a freelancer, in a salon, or in a parlour of their own.</p>
            <div className="signature">
              <Photo src={portrait} alt="Poonam Mehla" className="sig-avatar"><span className="mono">PM</span></Photo>
              <div><b className="sig-name">Poonam Mehla</b><span>Founder &amp; Lead Trainer</span></div>
            </div>
            <div className="btn-row">
              <a className="btn btn-primary" href={links.instagram} target="_blank" rel="noopener"><Icon name="ig" />Follow on Instagram</a>
              <a className="btn btn-ghost" href={links.youtube} target="_blank" rel="noopener"><Icon name="yt" />Watch on YouTube</a>
            </div>
          </div>
        </div>
      </section>

      <section className="sec tint">
        <div className="wrap">
          <div className="mv">
            <div className="hl reveal"><div className="hl-ico"><Icon name="heart" /></div><h3>Our mission</h3><p>To empower individuals in Sonipat and surrounding areas with high-quality, practical training in makeup, hair styling and beauty culture — enabling them to build successful independent careers.</p></div>
            <div className="hl reveal"><div className="hl-ico"><Icon name="spark" /></div><h3>Our vision</h3><p>To become Haryana&apos;s premier and most trusted beauty education academy, recognised for skill development and employment placement.</p></div>
          </div>
        </div>
      </section>

      <section className="counters">
        <div className="wrap counter-grid">
          <div className="counter reveal"><span className="c-ico"><Icon name="ig" /></span><b data-count={followers} data-suffix="+">{kFmt(followers)}</b><span>Instagram followers</span></div>
          <div className="counter reveal"><span className="c-ico"><Icon name="play" /></span><b data-count={posts} data-suffix="+">{posts}+</b><span>Looks &amp; reels shared</span></div>
          <div className="counter reveal"><span className="c-ico"><Icon name="spark" /></span><b data-count={serviceCount} data-suffix="+">{serviceCount}+</b><span>Beauty services</span></div>
          <div className="counter reveal"><span className="c-ico"><Icon name="award" /></span><b data-count={courses.length}>{courses.length}</b><span>Certified career courses</span></div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="sec-head center reveal"><span className="eyebrow">Why choose us</span><h2>Everything you need to go pro</h2></div>
          <div className="why">
            <div className="hl reveal"><div className="hl-ico"><Icon name="brush" /></div><h3>Hands-on practice</h3><p>Work on real models every week, not just demos.</p></div>
            <div className="hl reveal"><div className="hl-ico"><Icon name="users" /></div><h3>Expert trainers</h3><p>Taught by working artists who do bridal bookings every season.</p></div>
            <div className="hl reveal"><div className="hl-ico"><Icon name="sofa" /></div><h3>Professional studio</h3><p>Well-lit stations and pro-grade products to train on.</p></div>
            <div className="hl reveal"><div className="hl-ico"><Icon name="award" /></div><h3>Certification</h3><p>A certificate on completion to show clients and employers.</p></div>
            <div className="hl reveal"><div className="hl-ico"><Icon name="brief" /></div><h3>Career support</h3><p>Help with portfolios, freelancing and salon set-up.</p></div>
            <div className="hl reveal"><div className="hl-ico"><Icon name="cal" /></div><h3>Flexible batches</h3><p>Timings that work for students and homemakers alike.</p></div>
          </div>
          <div className="center mt-40"><Link href="/contact" className="btn btn-primary">Book a Free Demo Class <Icon name="arrow" /></Link></div>
        </div>
      </section>

      <section className="sec tint">
        <div className="wrap">
          <div className="sec-head reveal"><span className="eyebrow">Facility tour</span><h2>Inside our Kache Quarter studio</h2></div>
          <div className="tour reveal">
            {tour.slice(0, 5).map((t, i) => (
              <Photo key={i} src={t.src} caption={t.caption} tone={['', 't2', 't3', 't3', ''][i]} keepCaption posTop={i >= 3} />
            ))}
          </div>
          <div className="mt-24"><a className="btn btn-ghost" href={links.directions} target="_blank" rel="noopener"><Icon name="pin" />Get Directions</a></div>
        </div>
      </section>

      {/* Closing call to action */}
      <section className="bridal-banner">
        <Photo src={mediaUrl(photos.bridalPortfolio?.[2]?.image, 'card') || '/images/bridal-3.jpg'} className="bb-photo" posTop />
        <div className="wrap bb-inner reveal">
          <span className="eyebrow">Start your journey</span>
          <h2 className="display">Your beauty career<br />starts here</h2>
          <p>Visit the studio for a free demo class, meet Poonam Mehla&apos;s team and see how we teach.</p>
          <div className="btn-row mt-24">
            <Link href="/contact" className="btn btn-primary"><Icon name="cal" />Book a Free Demo Class</Link>
            <a className="btn btn-light" href={waLink(links.whatsapp, "Hi! I'd like to book a free demo class.")} target="_blank" rel="noopener"><Icon name="chat" />WhatsApp us</a>
          </div>
        </div>
      </section>
    </div>
  )
}
