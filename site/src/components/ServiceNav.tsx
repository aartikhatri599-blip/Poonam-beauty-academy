'use client'
import { useEffect, useState } from 'react'
import { Icon } from './Icon'

/** Sticky category bar on the Services page. Highlights the category you jump to. */
export function ServiceNav({ items }: { items: { slug: string; name: string; icon: string }[] }) {
  const [active, setActive] = useState<string | null>(null)

  const jump = (slug: string) => {
    const el = document.getElementById(`svc-${slug}`)
    if (!el) return
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 140, behavior: 'smooth' })
    history.replaceState(null, '', `#svc-${slug}`)
    setActive(slug)
  }

  // arriving from a homepage tile (/services#svc-nails): offset for the sticky bars
  useEffect(() => {
    const m = location.hash.match(/^#svc-(.+)$/)
    if (m) setTimeout(() => jump(m[1]), 80)
  }, [])

  return (
    <div className="filters svc-nav" role="group" aria-label="Service categories">
      {items.map((s) => (
        <button key={s.slug} type="button" aria-pressed={active === s.slug} onClick={() => jump(s.slug)}>
          <Icon name={s.icon} />{s.name}
        </button>
      ))}
    </div>
  )
}
