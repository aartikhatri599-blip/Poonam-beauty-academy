import { postgresAdapter } from '@payloadcms/db-postgres'
import { resendAdapter } from '@payloadcms/email-resend'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Courses } from './collections/Courses'
import { ServiceCategories } from './collections/ServiceCategories'
import { Packages } from './collections/Packages'
import { GalleryItems } from './collections/GalleryItems'
import { Reviews } from './collections/Reviews'
import { SuccessStories } from './collections/SuccessStories'
import { Faqs } from './collections/Faqs'
import { Enquiries } from './collections/Enquiries'
import { SiteSettings } from './globals/SiteSettings'
import { SitePhotos } from './globals/SitePhotos'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '',
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: '– Poonam Beauty Academy',
    },
  },
  collections: [Enquiries, Courses, ServiceCategories, Packages, GalleryItems, Reviews, SuccessStories, Faqs, Media, Users],
  globals: [SiteSettings, SitePhotos],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  // NeonDB (serverless Postgres). Use the pooled connection string from the Neon dashboard.
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  // Resend sends enquiry emails. Without an API key, Payload logs emails to the console instead.
  ...(process.env.RESEND_API_KEY
    ? {
        email: resendAdapter({
          defaultFromAddress: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
          defaultFromName: process.env.RESEND_FROM_NAME || 'Poonam Beauty Academy',
          apiKey: process.env.RESEND_API_KEY,
        }),
      }
    : {}),
  sharp,
  plugins: [],
})
