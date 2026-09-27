import type { Metadata } from 'next'
import { ThankYou } from '@/components/ThankYou'
import { getSettings } from '@/lib/data'
import { toSiteLinks } from '@/lib/site'

export const metadata: Metadata = { title: 'Thank you', robots: { index: false } }

export default async function ThankYouPage() {
  const links = toSiteLinks(await getSettings())
  return (
    <div className="page on">
      <section className="sec">
        <ThankYou whatsapp={links.whatsapp} directions={links.directions} instagram={links.instagram} handle={links.instagramHandle} />
      </section>
    </div>
  )
}
