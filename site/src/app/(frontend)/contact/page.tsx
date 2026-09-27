import type { Metadata } from 'next'
import Link from 'next/link'
import { Icon } from '@/components/Icon'
import { LeadForm } from '@/components/LeadForm'
import { getCourses, getFaqs, getSettings } from '@/lib/data'
import { toSiteLinks, waLink } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Contact & Admissions',
  description: 'Book a free demo class at Poonam Beauty Academy, Kache Quarter, Sonipat. Call, WhatsApp or send an enquiry.',
}

export default async function ContactPage() {
  const [settings, courses, faqs] = await Promise.all([getSettings(), getCourses(), getFaqs()])
  const links = toSiteLinks(settings)

  return (
    <div className="page on">
      <section className="p-hero">
        <div className="wrap">
          <div className="crumbs"><Link href="/">Home</Link> / Contact &amp; Admissions</div>
          <span className="eyebrow">Admissions open</span>
          <h1>Start your beauty career</h1>
          <div className="btn-row mt-24">
            <a className="btn btn-wa" href={waLink(links.whatsapp, "Hi! I'd like to know about admissions.")} target="_blank" rel="noopener"><Icon name="chat" />WhatsApp</a>
            <a className="btn btn-ghost" href={`tel:${links.phoneTel}`}><Icon name="phone" />Call</a>
            <a className="btn btn-ghost" href={links.instagram} target="_blank" rel="noopener"><Icon name="ig" />Instagram DM</a>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap cta-grid" style={{ alignItems: 'start' }}>
          <div className="reveal"><LeadForm kind="full" courses={courses.map((c) => c.title)} /></div>
          <div className="reveal">
            <span className="eyebrow">Visit us</span>
            <h2>Kache Quarter, Sonipat</h2>
            <ul className="info-list">
              <li><span className="hl-ico"><Icon name="pin" /></span><span><b>Address</b>{links.address}</span></li>
              {links.hours ? <li><span className="hl-ico"><Icon name="clock" /></span><span><b>Hours</b>{links.hours}</span></li> : null}
              <li><span className="hl-ico"><Icon name="phone" /></span><span><b>Phone</b><a href={`tel:${links.phoneTel}`}>{links.phoneDisplay}</a></span></li>
              {links.email ? <li><span className="hl-ico"><Icon name="mail" /></span><span><b>Email</b><a href={`mailto:${links.email}`}>{links.email}</a></span></li> : null}
            </ul>
            {links.mapEmbed ? <iframe className="map" src={links.mapEmbed} title="Map to Poonam Beauty Academy" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /> : null}
            <div className="btn-row mt-24"><a className="btn btn-primary" href={links.directions} target="_blank" rel="noopener"><Icon name="pin" />Get Directions</a></div>
          </div>
        </div>
      </section>

      <section className="sec tint">
        <div className="wrap">
          <div className="sec-head center reveal"><span className="eyebrow">How to join</span><h2>Admission in 4 simple steps</h2></div>
          <div className="steps">
            <div className="step reveal"><b>Enquire</b><p className="small">WhatsApp, call or fill the form.</p></div>
            <div className="step reveal"><b>Free demo class</b><p className="small">Visit the studio and meet the trainer.</p></div>
            <div className="step reveal"><b>Choose your batch</b><p className="small">Pick the course and timing that suit you.</p></div>
            <div className="step reveal"><b>Enrol &amp; begin</b><p className="small">Get your kit and start practising.</p></div>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="sec-head reveal"><span className="eyebrow">Stay connected</span><h2>Follow our work</h2></div>
          <div className="why">
            <a className="hl reveal" href={links.instagram} target="_blank" rel="noopener" style={{ textDecoration: 'none', color: 'inherit' }}><div className="hl-ico"><Icon name="ig" /></div><h3>Instagram</h3><p>Daily reels of student looks and classes.</p></a>
            <a className="hl reveal" href={links.youtube} target="_blank" rel="noopener" style={{ textDecoration: 'none', color: 'inherit' }}><div className="hl-ico"><Icon name="yt" /></div><h3>YouTube</h3><p>Full tutorials from Poonam Mehla.</p></a>
            <a className="hl reveal" href={links.googleProfile} target="_blank" rel="noopener" style={{ textDecoration: 'none', color: 'inherit' }}><div className="hl-ico"><Icon name="star" /></div><h3>Google</h3><p>Read reviews and get directions.</p></a>
          </div>
          {faqs.length ? (
            <>
              <div className="sec-head mt-40 reveal"><span className="eyebrow">FAQ</span><h2>Common questions</h2></div>
              <div>
                {faqs.map((f) => (
                  <details className="acc" key={f.id}>
                    <summary>{f.question}<Icon name="chev" /></summary>
                    <div className="acc-body" style={{ paddingLeft: 20 }}>{f.answer}</div>
                  </details>
                ))}
              </div>
            </>
          ) : null}
        </div>
      </section>
    </div>
  )
}
