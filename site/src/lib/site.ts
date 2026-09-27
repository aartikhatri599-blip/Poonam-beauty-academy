import type { SiteSetting } from '@/payload-types'

/** Plain, client-safe subset of Site Settings used by links and buttons everywhere. */
export type SiteLinks = {
  phoneDisplay: string
  phoneTel: string
  whatsapp: string
  email: string
  address: string
  hours: string
  instagram: string
  instagramHandle: string
  youtube: string
  googleProfile: string
  googleReviewLink: string
  directions: string
  mapEmbed: string
  brochure: string | null
}

export function toSiteLinks(s: SiteSetting): SiteLinks {
  const brochure = s.brochure && typeof s.brochure === 'object' ? s.brochure.url ?? null : null
  return {
    phoneDisplay: s.contact?.phoneDisplay || '+91 99969 65685',
    phoneTel: s.contact?.phoneTel || '+919996965685',
    whatsapp: s.contact?.whatsapp || '919996965685',
    email: s.contact?.email || '',
    address: s.contact?.address || 'Kache Quarter, Sonipat, Haryana',
    hours: s.contact?.hours || '',
    instagram: s.links?.instagram || '#',
    instagramHandle: s.links?.instagramHandle || '@poonam__beauty_academy',
    youtube: s.links?.youtube || '#',
    googleProfile: s.links?.googleProfile || '#',
    googleReviewLink: s.links?.googleReviewLink || s.links?.googleProfile || '#',
    directions: s.links?.directions || '#',
    mapEmbed: s.links?.mapEmbed || '',
    brochure,
  }
}

export const waLink = (whatsapp: string, msg: string) => `https://wa.me/${whatsapp}?text=${encodeURIComponent(msg)}`

export const LEVEL_LABEL: Record<string, string> = { beginner: 'Beginner', advanced: 'Advanced', short: 'Short course' }

export const DEFAULT_REELS = [
  'DdoKGAtS3yi', 'Ddn1kVFSfwQ', 'DdmHbzmyBrN', 'DdjBaEcSwW4', 'Ddi_I5nSa5W', 'DdivbjjSL3V',
  'DdectICSogK', 'DdeXtyaSono', 'Dda8Eyvy3ua', 'DSCpv6-CeI6', 'DJRrqS_hsON', 'DFSUwuITnyU',
]

export const reelsFrom = (s: SiteSetting) => (s.reels?.length ? s.reels.map((r) => r.code) : DEFAULT_REELS)
