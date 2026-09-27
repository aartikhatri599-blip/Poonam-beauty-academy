import type { CollectionConfig } from 'payload'
import { iconField } from '../fields/icon'

export const Packages: CollectionConfig = {
  slug: 'packages',
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'tag', 'order'], group: 'Content' },
  access: { read: () => true },
  defaultSort: 'order',
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'order', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
    iconField({ admin: { position: 'sidebar' } }),
    { name: 'tag', type: 'text', admin: { description: 'Optional label such as "Signature". Tagged packages are highlighted.' } },
    { name: 'price', type: 'text', admin: { description: 'Optional, e.g. "from ₹14,999"' } },
    { name: 'items', label: 'Included', type: 'array', fields: [{ name: 'text', type: 'text', required: true }] },
  ],
}
