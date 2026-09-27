import Link from 'next/link'
import { Icon } from './Icon'
import { waLink, type SiteLinks } from '@/lib/site'

export function Footer({ links, courses }: { links: SiteLinks; courses: { title: string; slug: string }[] }) {
  return (
    <footer>
      <svg className="foot-art" viewBox="0 0 200 200" aria-hidden="true">
        <g fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
          <path d="M100 190V10" />
          <path d="M100 150c-30-8-52-30-58-62 30 6 52 28 58 62z" /><path d="M100 150c30-8 52-30 58-62-30 6-52 28-58 62z" />
          <path d="M100 105c-22-8-38-26-40-50 22 6 37 24 40 50z" /><path d="M100 105c22-8 38-26 40-50-22 6-37 24-40 50z" />
          <path d="M100 62c-14-6-24-18-25-34 14 4 24 16 25 34z" /><path d="M100 62c14-6 24-18 25-34-14 4-24 16-25 34z" />
        </g>
      </svg>
      <div className="wrap">
        <div className="foot-contact">
          <a href={`tel:${links.phoneTel}`}><span className="fc-ico"><Icon name="phone" /></span><span><small>Call us</small><b>{links.phoneDisplay}</b></span></a>
          <a href={waLink(links.whatsapp, 'Hi! I have a question about your courses and services.')} target="_blank" rel="noopener"><span className="fc-ico"><Icon name="chat" /></span><span><small>WhatsApp</small><b>Chat with us</b></span></a>
          <a href={links.directions} target="_blank" rel="noopener"><span className="fc-ico"><Icon name="pin" /></span><span><small>Location</small><b>{links.address}</b></span></a>
        </div>
        <div className="f-grid">
          <div>
            <Link href="/" className="brand"><span className="mono">P</span><span className="brand-name">Poonam Beauty<small>Academy · Sonipat</small></span></Link>
            <p style={{ maxWidth: '34ch' }}>Transform your passion into a profession with practical, certified beauty training.</p>
            <div className="socials">
              <a href={links.instagram} target="_blank" rel="noopener" aria-label="Instagram"><Icon name="ig" /></a>
              <a href={links.youtube} target="_blank" rel="noopener" aria-label="YouTube"><Icon name="yt" /></a>
              <a href={links.googleProfile} target="_blank" rel="noopener" aria-label="Google Business Profile"><Icon name="star" /></a>
            </div>
          </div>
          <div>
            <h4>Explore</h4>
            <ul>
              <li><Link href="/about">About us</Link></li>
              <li><Link href="/services">Salon services</Link></li>
              <li><Link href="/courses">Courses</Link></li>
              <li><Link href="/gallery">Student gallery</Link></li>
              <li><Link href="/reviews">Reviews</Link></li>
              <li><Link href="/contact">Admissions</Link></li>
            </ul>
          </div>
          <div>
            <h4>Courses</h4>
            <ul>{courses.map((c) => <li key={c.slug}><Link href={`/courses/${c.slug}`}>{c.title}</Link></li>)}</ul>
          </div>
          <div>
            <h4>Visit</h4>
            <ul>
              <li>{links.address}</li>
              {links.hours ? <li>{links.hours}</li> : null}
              <li><a href={`tel:${links.phoneTel}`}>{links.phoneDisplay}</a></li>
              <li><a href={links.directions} target="_blank" rel="noopener">Get directions →</a></li>
              <li><a href={links.googleReviewLink} target="_blank" rel="noopener">Leave a Google review →</a></li>
            </ul>
          </div>
        </div>
        <div className="f-bottom">
          <span>© {new Date().getFullYear()} Poonam Beauty Academy, Sonipat</span>
          <span><Link href="/contact">Privacy</Link></span>
        </div>
      </div>
    </footer>
  )
}
