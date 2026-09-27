import type { CollectionConfig } from 'payload'
import { iconField } from '../fields/icon'

export const ServiceCategories: CollectionConfig = {
  slug: 'service-categories',
  labels: { singular: 'Service category', plural: 'Service categories' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'order', 'updatedAt'],
    group: 'Content',
    description: 'Salon services, grouped by category (Bridal, Hair, Nails…).',
  },
  access: { read: () => true },
  defaultSort: 'order',
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true, admin: { position: 'sidebar' } },
    { name: 'order', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
    iconField({ admin: { position: 'sidebar' } }),
    { name: 'image', type: 'upload', relationTo: 'media', admin: { description: 'Banner photo for this category. Use a photo that shows this service.' } },
    {
      name: 'imagePosition',
      type: 'select',
      defaultValue: 'top',
      options: [
        { label: 'Focus near the top (faces)', value: 'top' },
        { label: 'Centre (hands, nails, details)', value: 'center' },
      ],
      admin: { description: 'Which part of the photo stays visible in the banner crop.' },
    },
    { name: 'blurb', type: 'text', required: true },
    {
      name: 'items',
      label: 'Services',
      type: 'array',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'name', type: 'text', required: true },
            { name: 'note', type: 'text', admin: { description: 'Short description' } },
            { name: 'price', type: 'text', admin: { description: 'Optional, e.g. "₹2,500" or "from ₹999"' } },
          ],
        },
      ],
    },
  ],
}
