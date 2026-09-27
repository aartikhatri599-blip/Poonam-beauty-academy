import type { Metadata } from 'next'
import Link from 'next/link'
import { CourseList } from '@/components/CourseList'
import { Icon } from '@/components/Icon'
import { getCourses, getSettings, toCourseCards } from '@/lib/data'
import { toSiteLinks, waLink } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Beauty Courses in Sonipat',
  description: 'Practical, certified beauty courses: basic beauty culture, advanced bridal makeup & hairstyling, and nail art & extensions.',
}

export default async function CoursesPage() {
  const [settings, courses] = await Promise.all([getSettings(), getCourses()])
  const links = toSiteLinks(settings)
  return (
    <div className="page on">
      <section className="p-hero">
        <div className="wrap">
          <div className="crumbs"><Link href="/">Home</Link> / Courses</div>
          <span className="eyebrow">Our courses</span>
          <h1>Find the course that fits your goal</h1>
          <p className="lead">From your first foundation to HD bridal and nail extensions — every course is practical, certified and taught in small batches.</p>
        </div>
      </section>
      <section className="sec">
        <div className="wrap">
          <CourseList courses={toCourseCards(courses)} whatsapp={links.whatsapp} />
        </div>
      </section>
      <section className="sec tint">
        <div className="wrap center reveal">
          <h2>Not sure which course is right for you?</h2>
          <p className="lead">Tell us your goal and we&apos;ll suggest the best course and batch.</p>
          <div className="btn-row" style={{ justifyContent: 'center' }}>
            <a className="btn btn-wa" href={waLink(links.whatsapp, 'Hi! Can you help me choose the right course?')} target="_blank" rel="noopener"><Icon name="chat" />Ask on WhatsApp</a>
          </div>
        </div>
      </section>
    </div>
  )
}
