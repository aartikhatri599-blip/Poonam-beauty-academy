import 'server-only'
import { getPayload } from 'payload'
import config from '@payload-config'
import { cache } from 'react'
import type { Media, SiteSetting, SitePhoto } from '@/payload-types'

export const getClient = cache(() => getPayload({ config }))

export const getSettings = cache(async (): Promise<SiteSetting> => {
  const payload = await getClient()
  return payload.findGlobal({ slug: 'site-settings', depth: 1 })
})

export const getPhotos = cache(async (): Promise<SitePhoto> => {
  const payload = await getClient()
  return payload.findGlobal({ slug: 'site-photos', depth: 1 })
})

export const getCourses = cache(async () => {
  const payload = await getClient()
  const res = await payload.find({ collection: 'courses', sort: 'order', limit: 50, depth: 1 })
  return res.docs
})

export const getCourse = cache(async (slug: string) => {
  const payload = await getClient()
  const res = await payload.find({ collection: 'courses', where: { slug: { equals: slug } }, limit: 1, depth: 1 })
  return res.docs[0] ?? null
})

export const getServiceCategories = cache(async () => {
  const payload = await getClient()
  const res = await payload.find({ collection: 'service-categories', sort: 'order', limit: 50, depth: 1 })
  return res.docs
})

export const getPackages = cache(async () => {
  const payload = await getClient()
  const res = await payload.find({ collection: 'packages', sort: 'order', limit: 20, depth: 1 })
  return res.docs
})

export const getGallery = cache(async () => {
  const payload = await getClient()
  const res = await payload.find({ collection: 'gallery', sort: 'order', limit: 200, depth: 1 })
  return res.docs
})

export const getReviews = cache(async (limit = 50) => {
  const payload = await getClient()
  const res = await payload.find({ collection: 'reviews', sort: 'order', limit, depth: 0, where: { published: { equals: true } } })
  return res.docs
})

export const getStories = cache(async () => {
  const payload = await getClient()
  const res = await payload.find({ collection: 'success-stories', sort: 'order', limit: 12, depth: 1 })
  return res.docs
})

export const getFaqs = cache(async () => {
  const payload = await getClient()
  const res = await payload.find({ collection: 'faqs', sort: 'order', limit: 50, depth: 0 })
  return res.docs
})

/** Course docs → the plain shape the course cards need. */
export function toCourseCards(courses: Awaited<ReturnType<typeof getCourses>>) {
  return courses.map((c) => ({
    slug: c.slug,
    title: c.title,
    level: c.level,
    image: mediaUrl(c.image, 'card'),
    highlights: (c.highlights || []).map((h) => h.text),
    duration: c.duration,
  }))
}

/** URL of an uploaded image (preferring a resized version), or null. */
export function mediaUrl(m: number | Media | null | undefined, size?: 'card' | 'thumb'): string | null {
  if (!m || typeof m === 'number') return null
  if (size && m.sizes?.[size]?.url) return m.sizes[size]!.url!
  return m.url ?? null
}

export function mediaAlt(m: number | Media | null | undefined, fallback = ''): string {
  if (!m || typeof m === 'number') return fallback
  return m.alt || fallback
}
