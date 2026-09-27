import type { GlobalConfig } from 'payload'

const photo = (name: string, label: string, description?: string) => ({
  name,
  label,
  type: 'upload' as const,
  relationTo: 'media' as const,
  admin: description ? { description } : undefined,
})

const captionedList = (name: string, label: string, description: string) => ({
  name,
  label,
  type: 'array' as const,
  admin: { description },
  fields: [photo('image', 'Photo'), { name: 'caption', type: 'text' as const }],
})

export const SitePhotos: GlobalConfig = {
  slug: 'site-photos',
  label: 'Site Photos',
  admin: { group: 'Settings', description: 'Photos used in fixed places on the website. Empty spots fall back to the built-in photos.' },
  access: { read: () => true },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Homepage',
          fields: [
            photo('founderPortrait', 'Founder portrait (round)', 'Square photo of Poonam Mehla, face centred.'),
            photo('heroBridal', 'Small bridal photo in the hero'),
            photo('founderStudio', 'Founder section: studio photo'),
            photo('founderClass', 'Founder section: at work with students'),
            captionedList('bridalPortfolio', 'Bridal portfolio row', 'Up to 5 bridal looks. The first one is shown larger.'),
          ],
        },
        {
          label: 'About',
          fields: [
            photo('aboutStory', 'Our story photo'),
            captionedList('studioTour', 'Studio tour', '5 photos of the studio. The first is shown large.'),
          ],
        },
        {
          label: 'Services',
          fields: [
            captionedList('servicesCollage', 'Services header photos', '2 photos: the large arch photo, then the small tilted card (e.g. the studio).'),
            photo('bridalBanner', 'Bridal booking banner'),
          ],
        },
      ],
    },
  ],
}
