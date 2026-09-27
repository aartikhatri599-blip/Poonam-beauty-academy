import type { CollectionConfig } from 'payload'

export const GALLERY_CATEGORIES = [
  { label: 'Bridal', value: 'bridal' },
  { label: 'Party', value: 'party' },
  { label: 'Hair', value: 'hair' },
  { label: 'Nails', value: 'nails' },
  { label: 'Classroom', value: 'classroom' },
  { label: 'Certification Day', value: 'certification' },
]

export const GalleryItems: CollectionConfig = {
  slug: 'gallery',
  labels: { singular: 'Gallery photo', plural: 'Gallery' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'order'],
    group: 'Content',
    description: 'Student portfolio. Only show real work by the academy and its students.',
  },
  access: { read: () => true },
  defaultSort: 'order',
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'category', type: 'select', required: true, defaultValue: 'bridal', options: GALLERY_CATEGORIES },
    { name: 'image', type: 'upload', relationTo: 'media', admin: { description: 'Leave empty to show a placeholder slot.' } },
    { name: 'course', type: 'relationship', relationTo: 'courses', admin: { description: 'Course linked from the enlarged photo.' } },
    { name: 'credit', type: 'text', admin: { description: 'Optional, e.g. student name.' } },
    { name: 'order', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
  ],
}
