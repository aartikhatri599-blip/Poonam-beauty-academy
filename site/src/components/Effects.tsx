'use client'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

/**
 * Page-wide behaviours from the original design:
 * - fade-in of `.reveal` elements when they scroll into view
 * - count-up numbers on `[data-count]`
 * - smooth scrolling for `[data-scroll="elementId"]` links
 * Re-runs on every navigation, and watches for content added later (filters, load more).
 */
export function Effects() {
  const pathname = usePathname()

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const revealIO = new IntersectionObserver(
      (entries) => entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add('in'); revealIO.unobserve(en.target) }
      }),
      { rootMargin: '0px 0px -40px' },
    )

    const countIO = new IntersectionObserver(
      (entries) => entries.forEach((en) => {
        if (!en.isIntersecting) return
        countIO.unobserve(en.target)
        const el = en.target as HTMLElement
        const end = Number(el.dataset.count)
        const suf = el.dataset.suffix || ''
        const fmt = (n: number) => (end >= 1000 && n >= 1000 ? (n / 1000).toFixed(n % 1000 ? 1 : 0).replace('.0', '') + 'K' : String(n))
        if (reduce) { el.textContent = fmt(end) + suf; return }
        const t0 = performance.now()
        const step = (t: number) => {
          const p = Math.min(1, (t - t0) / 1400)
          el.textContent = fmt(Math.round(end * (1 - Math.pow(1 - p, 3)))) + suf
          if (p < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
      }),
      { threshold: 0.5 },
    )

    const scan = () => {
      document.querySelectorAll('.reveal:not(.in)').forEach((el) => (reduce ? el.classList.add('in') : revealIO.observe(el)))
      document.querySelectorAll('[data-count]:not([data-counted])').forEach((el) => {
        el.setAttribute('data-counted', '1')
        countIO.observe(el)
      })
    }
    scan()
    const mo = new MutationObserver(scan)
    mo.observe(document.body, { childList: true, subtree: true })

    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLElement>('[data-scroll]')
      if (!a) return
      const target = document.getElementById(a.dataset.scroll || '')
      if (!target) return
      e.preventDefault()
      target.scrollIntoView({ behavior: 'smooth' })
    }
    document.addEventListener('click', onClick)

    return () => {
      revealIO.disconnect()
      countIO.disconnect()
      mo.disconnect()
      document.removeEventListener('click', onClick)
    }
  }, [pathname])

  return null
}
