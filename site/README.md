# Poonam Beauty Academy – website

Next.js website with **Payload CMS** (admin at `/admin`), **NeonDB** (Postgres) and **Resend** (emails).

## Stack
| Part | Tool |
| --- | --- |
| Website + API | Next.js 16 (App Router), React 19 |
| CMS / admin | Payload 3 (runs inside the same Next.js app) |
| Database | NeonDB via `@payloadcms/db-postgres` |
| Email | Resend via `@payloadcms/email-resend` |

## First-time setup
1. Install Node.js 20+.
2. `npm install`
3. Copy `.env.example` to `.env` and fill in:
   - `DATABASE_URL`: Neon → project → Connection details → **Pooled connection** string.
   - `PAYLOAD_SECRET`: any long random string.
   - `RESEND_API_KEY`, `RESEND_FROM_EMAIL`: from Resend. Until your domain is verified in Resend, use `onboarding@resend.dev` as the sender; Resend then only delivers to your own Resend account email.
   - `ENQUIRY_NOTIFY_EMAIL`: who receives new-enquiry emails.
4. `npm run dev`, open http://localhost:3000/admin and **create the first admin user**. On the first run Payload creates the database tables automatically.
5. `npm run seed` to load the courses, services, packages, gallery, FAQs, settings and photos.

## Everyday use
- **Edit content:** `/admin`. Courses, Service categories (with prices), Packages, Gallery, Reviews, Success stories, FAQs, Site Settings (phone, WhatsApp, hours, links, ticker, Instagram reels, brochure) and Site Photos.
- **Enquiries:** every website form submission is saved under *Admissions → Enquiries* and emailed to the notification address. If the student entered an email, they get a confirmation too. Use the status field to track follow-ups.

## Scripts
| Command | What it does |
| --- | --- |
| `npm run dev` | Local development server |
| `npm run build` / `npm start` | Production build / serve |
| `npm run seed` | Load starting content into an empty database (`-- --force` reloads it) |
| `npm run generate:types` | Regenerate `src/payload-types.ts` after changing collections |
| `npm run payload migrate:create` / `migrate` | Database migrations for production |
| `npm run typecheck` | TypeScript check |

## Project layout
```
src/
  app/(frontend)/     website pages (home, about, services, courses, gallery, reviews, contact, thank-you)
  app/(payload)/      Payload admin + REST/GraphQL API (generated, don't edit)
  collections/        CMS collections (content types)
  globals/            Site Settings, Site Photos
  components/         Header, footer, cards, lead form, gallery, reels…
  email/              Enquiry email templates (Resend)
  seed/               Starting content + seed script
public/images/        Built-in photos (fallbacks when Site Photos are empty)
```

## Going live (later)
- **Hosting:** Vercel works well with Next.js + Payload. Add the same environment variables there.
- **Media uploads:** uploaded photos are stored on disk in `/media`, which is fine for a normal server but not for Vercel. Add a storage adapter (e.g. `@payloadcms/storage-vercel-blob` or S3) before deploying there.
- **Database migrations:** run `npm run payload migrate:create` locally and `npm run payload migrate` on deploy, instead of relying on development auto-sync.
- **Email domain:** verify the academy's domain in Resend and set `RESEND_FROM_EMAIL` to an address on it.
