import type { Metadata } from 'next'
import Link from 'next/link'
import { GALLERY_CATEGORIES } from '@/collections/GalleryItems'
import { GalleryGrid } from '@/components/GalleryGrid'
import { Icon } from '@/components/Icon'
import { Reels } from '@/components/Reels'
import { getGallery, getSettings, mediaUrl } from '@/lib/data'
import { reelsFrom, toSiteLinks } from '@/lib/site'

export const metadata: Metadata = { title: 'Student Gallery', description: 'Bridal looks, makeup, hairstyles and nail art by Poonam Beauty Academy students.' }

export default async function GalleryPage() {
  const [settings, gallery] = await Promise.all([getSettings(), getGallery()])
  const links = toSiteLinks(settings)
  const items = gallery.map((g) => ({
    id: g.id,
    title: g.title,
    category: g.category,
    image: mediaUrl(g.image, 'card'),
    large: mediaUrl(g.image),
    credit: g.credit,
    course: g.course && typeof g.course === 'object' ? { slug: g.course.slug, title: g.course.title } : null,
  }))

  return (
    <div className="page on">
      <section className="p-hero">
        <div className="wrap">
          <div className="crumbs"><Link href="/">Home</Link> / Gallery</div>
          <span className="eyebrow">Student gallery</span>
          <h1>Work created by our students</h1>
          <p className="lead">Bridal looks, party makeup, hairstyles and nail art — all done by students during training.</p>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="ig-head">
            <div className="ig-handle">
              <span className="ig-av"><span className="mono">P</span></span>
              <div><b style={{ color: 'var(--maroon)' }}>{links.instagramHandle}</b><div className="small" style={{ color: 'var(--muted)' }}>Reels from our classroom and bridal bookings</div></div>
            </div>
            <a className="btn btn-primary" href={links.instagram} target="_blank" rel="noopener"><Icon name="ig" />Follow on Instagram</a>
          </div>
          <Reels codes={reelsFrom(settings)} />
          <div className="center mt-40"><a className="btn btn-ghost" href={links.instagram} target="_blank" rel="noopener"><Icon name="ig" />See more on Instagram</a></div>
        </div>
      </section>

      <section className="sec tint">
        <div className="wrap">
          <div className="sec-head"><span className="eyebrow">Photo gallery</span><h2>Student portfolio</h2></div>
          {items.length ? <GalleryGrid items={items} categories={GALLERY_CATEGORIES} /> : <p className="empty-note">Photos coming soon.</p>}
        </div>
      </section>

      <section className="sec dark center">
        <div className="wrap reveal">
          <h2>Want to create looks like these?</h2>
          <p>Start with a free demo class this week.</p>
          <Link href="/contact" className="btn btn-rose mt-24">Book a Free Demo Class <Icon name="arrow" /></Link>
        </div>
      </section>
    </div>
  )
}
