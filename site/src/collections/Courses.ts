import type { CollectionConfig } from 'payload'

export const Courses: CollectionConfig = {
  slug: 'courses',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'level', 'order', 'updatedAt'],
    group: 'Content',
  },
  access: { read: () => true },
  defaultSort: 'order',
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { position: 'sidebar', description: 'Used in the web address, e.g. "bridal" → /courses/bridal' },
    },
    { name: 'order', type: 'number', defaultValue: 0, admin: { position: 'sidebar', description: 'Lower numbers show first.' } },
    {
      name: 'level',
      type: 'select',
      required: true,
      defaultValue: 'beginner',
      options: [
        { label: 'Beginner', value: 'beginner' },
        { label: 'Advanced', value: 'advanced' },
        { label: 'Short course', value: 'short' },
      ],
    },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'blurb', type: 'textarea', required: true, admin: { description: 'One or two sentences shown under the title.' } },
    {
      type: 'row',
      fields: [
        { name: 'duration', type: 'text', defaultValue: 'Ask us' },
        { name: 'batches', type: 'text', defaultValue: 'Flexible timings' },
        { name: 'fees', type: 'text', defaultValue: 'On WhatsApp', admin: { description: 'e.g. "₹15,000 (instalments available)"' } },
      ],
    },
    { name: 'highlights', type: 'array', labels: { singular: 'Highlight', plural: 'Highlights' }, fields: [{ name: 'text', type: 'text', required: true }] },
    { name: 'whoFor', label: 'Who this course is for', type: 'array', fields: [{ name: 'text', type: 'text', required: true }] },
    {
      name: 'modules',
      label: 'Curriculum modules',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
      ],
    },
    {
      name: 'reels',
      label: 'Instagram reels for this course',
      type: 'array',
      admin: { description: 'Paste the code after /reel/ in an Instagram reel link.' },
      fields: [{ name: 'code', type: 'text', required: true }],
    },
  ],
}
