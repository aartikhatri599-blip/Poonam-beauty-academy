import type { Metadata } from 'next'
import Link from 'next/link'
import { Icon } from '@/components/Icon'
import { Photo } from '@/components/Photo'
import { ServiceNav } from '@/components/ServiceNav'
import { getPackages, getPhotos, getServiceCategories, getSettings, mediaUrl } from '@/lib/data'
import { toSiteLinks, waLink } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Bridal Makeup, Hair, Skin & Nail Services in Sonipat',
  description: 'Bridal and party makeup, hair, skin, nails, waxing and mehndi at Poonam Mehla Makeover, Kache Quarter, Sonipat.',
}

const DEFAULT_COLLAGE = ['/images/bridal-4.jpg', '/images/studio-1.jpg']

export default async function ServicesPage() {
  const [settings, photos, services, packages] = await Promise.all([getSettings(), getPhotos(), getServiceCategories(), getPackages()])
  const links = toSiteLinks(settings)
  const collage = photos.servicesCollage?.length ? photos.servicesCollage.map((p) => mediaUrl(p.image, 'card')) : DEFAULT_COLLAGE
  const total = services.reduce((n, s) => n + (s.items?.length || 0), 0)

  return (
    <div className="page on">
      <section className="p-hero svc-hero">
        <div className="wrap split" style={{ alignItems: 'center' }}>
          <div>
            <div className="crumbs"><Link href="/">Home</Link> / Services</div>
            <span className="eyebrow">Salon &amp; bridal studio</span>
            <h1>Beauty services by Poonam Mehla &amp; team</h1>
            <p className="lead">Bridal and party makeup, hair, skin, nails, waxing and mehndi at our Kache Quarter studio. Book on WhatsApp and we&apos;ll confirm your slot.</p>
            <div className="btn-row mt-24">
              <a className="btn btn-primary" href={waLink(links.whatsapp, "Hi! I'd like to book an appointment.")} target="_blank" rel="noopener"><Icon name="cal" />Book an appointment</a>
              <a className="btn btn-ghost" href={`tel:${links.phoneTel}`}><Icon name="phone" />Call the studio</a>
            </div>
            <div className="svc-stats">
              <div><b>{services.length}</b><span>service categories</span></div>
              <div><b>{total}+</b><span>beauty services</span></div>
              <div><b>{packages.length}</b><span>money-saving packages</span></div>
            </div>
          </div>
          {/* One strong makeup photo + the real studio, instead of a busy collage */}
          <div className="svc-hero-visual" aria-hidden="true">
            <div className="sh-ring" />
            <Photo src={collage[0]} className="arch sh-main" posTop />
            <Photo src={collage[1]} caption="Our Kache Quarter studio" className="sh-card" keepCaption />
          </div>
        </div>
      </section>

      <div className="svc-nav-wrap">
        <div className="wrap"><ServiceNav items={services.map((s) => ({ slug: s.slug, name: s.name, icon: s.icon || 'spark' }))} /></div>
      </div>

      <section className="sec" style={{ paddingTop: 32 }}>
        <div className="wrap">
          <p className="svc-note"><Icon name="spark" /><span>Prices depend on the look and products you choose. Tap <b>Enquire</b> on any service for today&apos;s rate on WhatsApp.</span></p>
          <div className="svc-list">
            {services.map((s) => (
              <article className="svc-card reveal" id={`svc-${s.slug}`} key={s.id}>
                <Photo src={mediaUrl(s.image, 'card')} className={`svc-banner ${s.imagePosition === 'center' ? 'pos-center' : 'pos-top'}`}>
                  <span className="svc-count">{s.items?.length || 0} services</span>
                  <header>
                    <span className="hl-ico"><Icon name={s.icon || 'spark'} /></span>
                    <div><h2 className="h3">{s.name}</h2><p>{s.blurb}</p></div>
                  </header>
                </Photo>
                <ul>
                  {(s.items || []).map((it) => (
                    <li key={it.id}>
                      <div><b>{it.name}</b>{it.note ? <span>{it.note}</span> : null}</div>
                      {it.price ? <em className="price">{it.price}</em> : null}
                      <a className="enq" href={waLink(links.whatsapp, `Hi! I'd like to book: ${it.name}. Please share the rate and available slots.`)} target="_blank" rel="noopener">Enquire</a>
                    </li>
                  ))}
                </ul>
                <a className="btn btn-ghost svc-book" href={waLink(links.whatsapp, `Hi! I'd like to book a ${s.name} service.`)} target="_blank" rel="noopener"><Icon name="chat" />Book {s.name}</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bridal-banner">
        <Photo src={mediaUrl(photos.bridalBanner, 'card') || '/images/bridal-1.jpg'} className="bb-photo" posTop />
        <div className="wrap bb-inner reveal">
          <span className="eyebrow">Bridal bookings open</span>
          <h2 className="display">Your wedding look,<br />crafted with care</h2>
          <p>HD or airbrush makeup, hairstyling, draping and finishing touches, all by Poonam Mehla&apos;s team. Book a trial and lock your date early.</p>
          <div className="btn-row mt-24">
            <a className="btn btn-primary" href={waLink(links.whatsapp, "Hi! I'd like to book a bridal makeup trial. My wedding date is: ")} target="_blank" rel="noopener"><Icon name="crown" />Book a bridal trial</a>
            <Link className="btn btn-light" href="/gallery">See bridal looks</Link>
          </div>
        </div>
      </section>

      {packages.length ? (
        <section className="sec tint">
          <div className="wrap">
            <div className="sec-head center reveal"><span className="eyebrow">Packages</span><h2>Save more with a package</h2><p className="lead">Combine services for your big day or festive season. Every package can be customised.</p></div>
            <div className="pkg-grid">
              {packages.map((p) => (
                <article className={`pkg reveal${p.tag ? ' featured' : ''}`} key={p.id}>
                  {p.tag ? <span className="pkg-tag">{p.tag}</span> : null}
                  <span className="hl-ico"><Icon name={p.icon || 'spark'} /></span>
                  <h3>{p.name}</h3>
                  {p.price ? <p style={{ margin: 0, fontWeight: 600 }}>{p.price}</p> : null}
                  <ul className="ticks">{(p.items || []).map((i) => <li key={i.id}><Icon name="check" />{i.text}</li>)}</ul>
                  <a className={`btn ${p.tag ? 'btn-rose' : 'btn-primary'}`} href={waLink(links.whatsapp, `Hi! Please share details of the ${p.name}.`)} target="_blank" rel="noopener">Get package price</a>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="sec">
        <div className="wrap">
          <div className="sec-head center reveal"><span className="eyebrow">How booking works</span><h2>Your appointment in 3 steps</h2></div>
          <div className="steps steps-3">
            <div className="step reveal"><b>Message us</b><p className="small">Send the service and date on WhatsApp, or call.</p></div>
            <div className="step reveal"><b>Get your quote &amp; slot</b><p className="small">We share the rate and confirm a time. Bridal dates need an advance booking.</p></div>
            <div className="step reveal"><b>Visit the studio</b><p className="small">Come to Kache Quarter, Sonipat. Ask us about bridal bookings at your venue.</p></div>
          </div>
        </div>
      </section>

      <section className="sec dark cta-band">
        <div className="wrap cta-grid">
          <div className="reveal">
            <span className="eyebrow">Love these looks?</span>
            <h2 className="display">Learn to do them yourself</h2>
            <p style={{ maxWidth: '48ch' }}>Every service on this page is taught in our practical courses. Turn it into your own income.</p>
          </div>
          <div className="btn-row reveal" style={{ justifyContent: 'flex-start' }}>
            <Link href="/courses" className="btn btn-rose">Explore courses <Icon name="arrow" /></Link>
            <Link href="/contact" className="btn btn-light">Book a Free Demo Class</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
