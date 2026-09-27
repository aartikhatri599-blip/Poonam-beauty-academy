/**
 * Loads the starting content (courses, services, packages, gallery, FAQs, settings, photos)
 * into the database. Run once after connecting NeonDB:
 *
 *   npm run seed            → only fills an empty database
 *   npm run seed -- --force → deletes the seeded content and loads it again
 *
 * Enquiries, reviews, success stories and admin users are never touched.
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload, type Payload } from 'payload'
import config from '../payload.config'
import { COURSES, FAQS, GALLERY, PACKAGES, SERVICES, SETTINGS } from './content'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const IMAGES = path.resolve(dirname, '../../public/images')
const force = process.argv.includes('--force')

const uploaded = new Map<string, number>()

/** Upload a photo once (local file in /public/images, or a remote URL) and return its Media id. */
async function media(payload: Payload, src: string | undefined, alt: string): Promise<number | undefined> {
  if (!src) return undefined
  if (uploaded.has(src)) return uploaded.get(src)
  try {
    let doc
    if (src.startsWith('http')) {
      const res = await fetch(src)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = Buffer.from(await res.arrayBuffer())
      const name = `${new URL(src).pathname.split('/').pop() || 'photo'}.jpg`
      doc = await payload.create({ collection: 'media', data: { alt }, file: { data, mimetype: 'image/jpeg', name, size: data.length } })
    } else {
      const filePath = path.join(IMAGES, src)
      if (!fs.existsSync(filePath)) throw new Error(`missing file ${filePath}`)
      doc = await payload.create({ collection: 'media', data: { alt }, filePath })
    }
    uploaded.set(src, doc.id)
    payload.logger.info(`  photo: ${src}`)
    return doc.id
  } catch (err) {
    payload.logger.warn(`  could not upload ${src}: ${(err as Error).message}`)
    return undefined
  }
}

async function run() {
  const payload = await getPayload({ config })
  const existing = await payload.count({ collection: 'courses' })
  if (existing.totalDocs > 0 && !force) {
    payload.logger.info('Content already exists, nothing to do. Run with --force to reload the starting content.')
    process.exit(0)
  }

  if (force) {
    payload.logger.info('Removing previously seeded content…')
    for (const collection of ['gallery', 'courses', 'service-categories', 'packages', 'faqs', 'media'] as const) {
      await payload.delete({ collection, where: { id: { exists: true } } })
    }
  }

  payload.logger.info('Seeding courses…')
  const courseIds: Record<string, number> = {}
  for (const [i, c] of COURSES.entries()) {
    const doc = await payload.create({
      collection: 'courses',
      data: {
        title: c.title,
        slug: c.slug,
        order: i,
        level: c.level,
        blurb: c.blurb,
        image: await media(payload, c.image, c.title),
        highlights: c.highlights.map((text) => ({ text })),
        whoFor: c.whoFor.map((text) => ({ text })),
        modules: c.modules.map(([title, description]) => ({ title, description })),
        reels: c.reels.map((code) => ({ code })),
      },
    })
    courseIds[c.slug] = doc.id
  }

  payload.logger.info('Seeding services…')
  for (const [i, s] of SERVICES.entries()) {
    await payload.create({
      collection: 'service-categories',
      data: {
        name: s.name,
        slug: s.slug,
        order: i,
        icon: s.icon,
        blurb: s.blurb,
        image: await media(payload, s.image, s.name),
        imagePosition: s.pos,
        items: s.items.map(([name, note]) => ({ name, note })),
      },
    })
  }

  payload.logger.info('Seeding packages…')
  for (const [i, p] of PACKAGES.entries()) {
    await payload.create({ collection: 'packages', data: { name: p.name, order: i, icon: p.icon, tag: p.tag, items: p.items.map((text) => ({ text })) } })
  }

  payload.logger.info('Seeding gallery…')
  for (const [i, g] of GALLERY.entries()) {
    await payload.create({
      collection: 'gallery',
      data: {
        title: g.title,
        category: g.category,
        order: i,
        image: await media(payload, g.image, g.title),
        course: g.course ? courseIds[g.course] : undefined,
      },
    })
  }

  payload.logger.info('Seeding FAQs…')
  for (const [i, [question, answer]] of FAQS.entries()) {
    await payload.create({ collection: 'faqs', data: { question, answer, order: i } })
  }

  payload.logger.info('Seeding site settings and photos…')
  await payload.updateGlobal({ slug: 'site-settings', data: SETTINGS })

  const list = async (items: { image?: string; caption: string }[]) =>
    Promise.all(items.map(async (p) => ({ image: await media(payload, p.image, p.caption), caption: p.caption })))

  await payload.updateGlobal({
    slug: 'site-photos',
    data: {
      founderPortrait: await media(payload, 'poonam-mehla.png', 'Poonam Mehla, founder of Poonam Beauty Academy'),
      heroBridal: await media(payload, 'bridal-1.jpg', 'HD bridal look'),
      founderStudio: await media(payload, 'studio-1.jpg', 'Poonam Mehla Makeover studio'),
      founderClass: await media(payload, 'class-1.jpg', 'Poonam Mehla with a bride and a student'),
      aboutStory: await media(payload, 'class-1.jpg', 'Poonam Mehla at work with students'),
      bridalBanner: await media(payload, 'bridal-1.jpg', 'HD bridal look'),
      bridalPortfolio: await list([
        { image: 'bridal-6.jpg', caption: 'Bridal look at our studio' },
        { image: 'bridal-4.jpg', caption: 'Kundan bridal look' },
        { image: 'bridal-3.jpg', caption: 'Soft glam bride' },
        { image: 'bridal-5.jpg', caption: 'Bridal lehenga look' },
        { image: 'bridal-1.jpg', caption: 'HD bridal look' },
      ]),
      studioTour: await list([
        { image: 'studio-2.jpg', caption: 'Hair wash & styling floor' },
        { image: 'studio-1.jpg', caption: 'Makeup stations' },
        { image: 'studio-3.jpg', caption: 'Styling stations' },
        { image: 'class-1.jpg', caption: 'Live practical sessions' },
        { image: 'counselling-1.jpg', caption: 'Admission counselling' },
      ]),
      servicesCollage: await list([
        { image: 'bridal-4.jpg', caption: 'Kundan bridal makeup' },
        { image: 'studio-1.jpg', caption: 'Our Kache Quarter studio' },
      ]),
    },
  })

  payload.logger.info('Done. Open /admin to create your admin account and edit the content.')
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
