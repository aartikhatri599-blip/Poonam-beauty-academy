import Link from 'next/link'
import type { SiteLinks } from '@/lib/site'

type Item = { text: string; link?: string | null }

const DEFAULTS = (links: SiteLinks): Item[] => [
  { text: 'Admissions open for new batches', link: '/contact' },
  { text: 'Book your free demo class', link: '/contact' },
  { text: 'Bridal bookings open for the wedding season', link: '/services' },
  { text: `Call / WhatsApp ${links.phoneDisplay}`, link: `tel:${links.phoneTel}` },
]

function Item({ item, hidden }: { item: Item; hidden?: boolean }) {
  const aria = hidden ? { 'aria-hidden': true, tabIndex: -1 } : {}
  const text = `${item.text} ›`
  if (!item.link) return <a {...aria}>{text}</a>
  if (item.link.startsWith('/')) return <Link href={item.link} {...aria}>{text}</Link>
  return <a href={item.link} {...aria}>{text}</a>
}

/** Scrolling announcement bar above the header. The list repeats once so the loop is seamless. */
export function Ticker({ items, links }: { items?: Item[] | null; links: SiteLinks }) {
  const list = items?.length ? items : DEFAULTS(links)
  return (
    <div className="ticker" role="region" aria-label="Announcements">
      <div className="ticker-track">
        {list.map((it, i) => <Item key={`a${i}`} item={it} />)}
        {list.map((it, i) => <Item key={`b${i}`} item={it} hidden />)}
      </div>
    </div>
  )
}
