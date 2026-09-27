import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  admin: { group: 'Settings' },
  access: { read: () => true },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Contact',
          fields: [
            {
              name: 'contact',
              type: 'group',
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'phoneDisplay', type: 'text', defaultValue: '+91 99969 65685', admin: { description: 'As shown on the site' } },
                    { name: 'phoneTel', type: 'text', defaultValue: '+919996965685', admin: { description: 'For tap-to-call, no spaces' } },
                    { name: 'whatsapp', type: 'text', defaultValue: '919996965685', admin: { description: 'Country code + number, no + or spaces' } },
                  ],
                },
                { name: 'email', type: 'email' },
                { name: 'address', type: 'text', defaultValue: 'Kache Quarter, Sonipat, Haryana' },
                { name: 'hours', type: 'text', defaultValue: 'Mon–Sun · 9:00 AM – 8:00 PM' },
              ],
            },
          ],
        },
        {
          label: 'Links & map',
          fields: [
            {
              name: 'links',
              type: 'group',
              fields: [
                { name: 'instagram', type: 'text', defaultValue: 'https://www.instagram.com/poonam__beauty_academy/' },
                { name: 'instagramHandle', type: 'text', defaultValue: '@poonam__beauty_academy' },
                { name: 'youtube', type: 'text', defaultValue: 'https://www.youtube.com/@Offlicalpoonammehla' },
                { name: 'googleProfile', type: 'text', admin: { description: 'Google Business Profile link' }, defaultValue: 'https://www.google.com/maps/search/?api=1&query=Poonam+Beauty+Academy+Kache+Quarter+Sonipat' },
                { name: 'googleReviewLink', type: 'text', admin: { description: '"Ask for review" short link from the Google profile' }, defaultValue: 'https://www.google.com/maps/search/?api=1&query=Poonam+Beauty+Academy+Kache+Quarter+Sonipat' },
                { name: 'directions', type: 'text', defaultValue: 'https://www.google.com/maps/dir/?api=1&destination=Poonam+Beauty+Academy+Kache+Quarter+Sonipat' },
                { name: 'mapEmbed', type: 'text', defaultValue: 'https://www.google.com/maps?q=Kache+Quarter,+Sonipat,+Haryana&output=embed' },
              ],
            },
            {
              name: 'rating',
              label: 'Google rating',
              type: 'group',
              admin: { description: 'Copy from the Google Business Profile. Leave empty to hide.' },
              fields: [
                { type: 'row', fields: [{ name: 'score', type: 'number', min: 1, max: 5 }, { name: 'count', type: 'number', min: 0 }] },
              ],
            },
          ],
        },
        {
          label: 'Homepage',
          fields: [
            {
              name: 'announcements',
              label: 'Announcement ticker',
              type: 'array',
              admin: { description: 'Scrolling messages at the very top of every page.' },
              fields: [
                { type: 'row', fields: [{ name: 'text', type: 'text', required: true }, { name: 'link', type: 'text', admin: { description: 'e.g. /contact or tel:+91…' } }] },
              ],
            },
            {
              name: 'stats',
              type: 'group',
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'instagramFollowers', type: 'number', defaultValue: 4000 },
                    { name: 'postsShared', type: 'number', defaultValue: 970 },
                  ],
                },
              ],
            },
            {
              name: 'reels',
              label: 'Instagram reels',
              type: 'array',
              admin: { description: 'Code after /reel/ in the Instagram link. The first 6 show on the homepage, all show in the gallery.' },
              fields: [{ name: 'code', type: 'text', required: true }],
            },
            { name: 'brochure', type: 'upload', relationTo: 'media', admin: { description: 'Course brochure PDF for the "Download Brochure" button.' } },
          ],
        },
        {
          label: 'Notifications',
          fields: [
            {
              name: 'notifications',
              type: 'group',
              fields: [
                {
                  name: 'enquiryEmail',
                  type: 'text',
                  admin: { description: 'Where new enquiry emails are sent. Separate several addresses with commas.' },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
