'use client'
import { useEffect, useRef, useState } from 'react'
import { Icon } from './Icon'

declare global {
  interface Window { instgrm?: { Embeds: { process: () => void } } }
}

let scriptRequested = false
function processEmbeds() {
  if (window.instgrm) { window.instgrm.Embeds.process(); return }
  if (scriptRequested) return
  scriptRequested = true
  const s = document.createElement('script')
  s.src = 'https://www.instagram.com/embed.js'
  s.async = true
  s.onload = () => window.instgrm?.Embeds.process()
  document.body.appendChild(s)
}

/** Official Instagram reel embeds, loaded only when the section nears the viewport. */
export function Reels({ codes, swipe }: { codes: string[]; swipe?: boolean }) {
  const box = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = box.current
    if (!el) return
    const io = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) { setVisible(true); io.disconnect() } }, { rootMargin: '400px 0px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => { if (visible) processEmbeds() }, [visible, codes])

  return (
    <div className={`reels${swipe ? ' swipe' : ''}`} ref={box}>
      {visible && codes.map((code) => (
        <div className="reel" key={code}>
          <blockquote className="instagram-media" data-instgrm-permalink={`https://www.instagram.com/reel/${code}/?utm_source=ig_embed`} data-instgrm-version="14">
            <a className="reel-fallback" href={`https://www.instagram.com/reel/${code}/`} target="_blank" rel="noopener">
              <Icon name="play" /><span>Watch this reel on Instagram</span>
            </a>
          </blockquote>
        </div>
      ))}
    </div>
  )
}
