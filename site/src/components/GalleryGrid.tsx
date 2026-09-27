'use client'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { Icon } from './Icon'
import { Photo } from './Photo'

export type GalleryItemData = {
  id: number | string
  title: string
  category: string
  image: string | null
  large: string | null
  credit?: string | null
  course?: { slug: string; title: string } | null
}

const TONES = ['', 't2', 't3']
const PAGE = 12

/** Student portfolio grid with category filters, "Load more" and a lightbox. */
export function GalleryGrid({ items, categories }: { items: GalleryItemData[]; categories: { label: string; value: string }[] }) {
  const [cat, setCat] = useState('all')
  const [shown, setShown] = useState(PAGE)
  const [open, setOpen] = useState<GalleryItemData | null>(null)
  const dialog = useRef<HTMLDialogElement>(null)

  const used = new Set(items.map((i) => i.category))
  const filters = [{ label: 'All', value: 'all' }, ...categories.filter((c) => used.has(c.value))]
  const list = items.filter((i) => cat === 'all' || i.category === cat)

  useEffect(() => {
    const d = dialog.current
    if (!d) return
    if (open && !d.open) d.showModal()
    if (!open && d.open) d.close()
  }, [open])

  return (
    <>
      <div className="filters" role="group" aria-label="Filter gallery">
        {filters.map((f) => (
          <button key={f.value} type="button" aria-pressed={cat === f.value} onClick={() => { setCat(f.value); setShown(PAGE) }}>{f.label}</button>
        ))}
      </div>
      <div className="g-grid">
        {list.slice(0, shown).map((g, i) => (
          <button key={g.id} className="g-item reveal" aria-label={`Open ${g.title}`} onClick={() => setOpen(g)}>
            <Photo src={g.image} caption={g.title} tone={TONES[i % 3]} posTop={Boolean(g.image)} />
          </button>
        ))}
      </div>
      {list.length > shown ? (
        <div className="center mt-40"><button className="btn btn-ghost" onClick={() => setShown((s) => s + PAGE)}>Load more</button></div>
      ) : null}

      <dialog className="lb" ref={dialog} onClose={() => setOpen(null)} onClick={(e) => { if (e.target === dialog.current) setOpen(null) }}>
        <button className="icon-btn" aria-label="Close" onClick={() => setOpen(null)}><Icon name="x" /></button>
        {open ? (
          <div>
            <Photo src={open.large || open.image} caption={open.title} />
            <div className="lb-bar">
              <span><b>{open.title}</b>{open.credit || open.course ? <><br /><span className="small">{[open.credit, open.course?.title].filter(Boolean).join(' · ')}</span></> : null}</span>
              {open.course ? <Link href={`/courses/${open.course.slug}`} onClick={() => setOpen(null)}>Inquire about this course →</Link> : null}
            </div>
          </div>
        ) : null}
      </dialog>
    </>
  )
}
