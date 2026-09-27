import Link from 'next/link'
import { Icon } from './Icon'

type Props = {
  src?: string | null
  alt?: string
  caption?: string
  /** '' | 't2' | 't3' placeholder colour */
  tone?: string
  className?: string
  icon?: string
  /** keep the caption label visible on top of a real photo */
  keepCaption?: boolean
  /** focus the crop on faces near the top */
  posTop?: boolean
  href?: string
  /** decorative duplicate (e.g. the second copy in a looping carousel): hidden from screen readers and keyboard */
  hidden?: boolean
  children?: React.ReactNode
}

/** A photo frame. Shows the image when there is one, otherwise a styled placeholder with a caption. */
export function Photo({ src, alt, caption, tone = '', className = '', icon = 'img', keepCaption, posTop, href, hidden, children }: Props) {
  const cls = ['ph', tone, className, src ? 'has-img' : '', keepCaption ? 'keep-cap' : '', posTop ? 'pos-top' : '']
    .filter(Boolean)
    .join(' ')
  const inner = (
    <>
      {src ? <img className="photo" src={src} alt={alt || caption || ''} loading="lazy" decoding="async" /> : null}
      <div className="ph-ico"><Icon name={icon} /></div>
      {caption ? <span className="ph-cap">{caption}</span> : null}
      {children}
    </>
  )
  const a11y = hidden ? { 'aria-hidden': true, tabIndex: -1 } : {}
  if (href) return <Link href={href} className={cls} {...a11y}>{inner}</Link>
  return <div className={cls} {...a11y}>{inner}</div>
}
