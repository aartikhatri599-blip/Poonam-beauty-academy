import type { CollectionConfig } from 'payload'

export const SuccessStories: CollectionConfig = {
  slug: 'success-stories',
  labels: { singular: 'Success story', plural: 'Success stories' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'outcome', 'course'],
    group: 'Content',
    description: 'Alumni who started working or opened a salon. Shown on the Reviews page.',
  },
  access: { read: () => true },
  defaultSort: 'order',
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'outcome', type: 'text', required: true, admin: { description: 'e.g. "Now runs her own salon in Gohana"' } },
    { name: 'course', type: 'text' },
    { name: 'photo', type: 'upload', relationTo: 'media' },
    { name: 'videoUrl', type: 'text', admin: { description: 'Optional YouTube or Instagram link.' } },
    { name: 'order', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
  ],
}
