// Starting content, taken from the approved HTML design. Everything here can be edited later in /admin.

const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1200&q=75`

export const COURSES = [
  {
    slug: 'basic', title: 'Diploma in Basic Beauty Culture', level: 'beginner' as const,
    image: unsplash('1512496015851-a90fb38ba796'), // free Unsplash stock photo, replace with a real class photo
    blurb: 'Your foundation in skin, hair and everyday makeup — ideal if you are starting from zero.',
    highlights: ['Skin care & facials', 'Basic hair care & styling', 'Everyday & party makeup'],
    modules: [
      ['Beauty basics & hygiene', 'Tools, sanitation, skin types and client consultation.'],
      ['Skin care', 'Cleanup, facials, bleach and basic skin treatments.'],
      ['Hair care', 'Hair wash, head massage, blow-dry and basic cuts & styles.'],
      ['Everyday makeup', 'Base, eyes and lips for day and party looks.'],
      ['Salon practice', 'Threading, waxing, manicure & pedicure on real models.'],
    ] as [string, string][],
    whoFor: ['12th-pass students starting a beauty career', 'Anyone planning to open a home parlour', 'Beginners with no prior experience'],
    reels: ['DdectICSogK', 'DdeXtyaSono', 'Dda8Eyvy3ua'],
  },
  {
    slug: 'bridal', title: 'Advanced Bridal Makeup & Hairstyling', level: 'advanced' as const,
    image: 'bridal-2.jpg',
    blurb: 'Master the looks brides book: HD, airbrush, draping and bridal hairdos.',
    highlights: ['HD & airbrush makeup', 'Saree & dupatta draping', 'Bridal hairstyles'],
    modules: [
      ['Skin prep & colour theory', 'Priming, colour correction and choosing shades for Indian skin tones.'],
      ['HD makeup', 'Long-wear, camera-ready base and eye looks.'],
      ['Airbrush techniques', 'Airbrush machine handling and flawless finish.'],
      ['Bridal & engagement looks', 'North-Indian bridal, reception and engagement styles.'],
      ['Hairstyling', 'Buns, braids, curls and accessory setting.'],
      ['Draping & saree styling', 'Lehenga dupatta setting, saree draping styles.'],
      ['Portfolio shoot', 'Create and photograph your own bridal portfolio.'],
    ] as [string, string][],
    whoFor: ['Parlour owners who want bridal bookings', 'Makeup artists ready to go advanced', 'Basic course graduates'],
    reels: ['DdoKGAtS3yi', 'Ddn1kVFSfwQ', 'DdmHbzmyBrN'],
  },
  {
    slug: 'nails', title: 'Nail Art & Extension Masterclass', level: 'short' as const,
    image: unsplash('1632345031435-8727f6897d53'), // free Unsplash stock photo, replace with a real class photo
    blurb: 'A focused, high-earning skill: gel and acrylic extensions plus trending nail art.',
    highlights: ['Gel & acrylic extensions', 'Trending nail art designs', 'Nail care & hygiene'],
    modules: [
      ['Nail anatomy & hygiene', 'Prep, sanitation and safe product use.'],
      ['Gel extensions', 'Tips, forms, shaping and gel application.'],
      ['Acrylic extensions', 'Acrylic sculpting, filing and refills.'],
      ['Nail art', 'Ombre, French, chrome, stones and seasonal designs.'],
      ['Business basics', 'Pricing, photos for Instagram and repeat clients.'],
    ] as [string, string][],
    whoFor: ['Homemakers looking for flexible income', 'Students adding a quick skill', 'Salon staff expanding services'],
    reels: ['DdjBaEcSwW4', 'Ddi_I5nSa5W', 'DdivbjjSL3V'],
  },
]

export const SERVICES = [
  { slug: 'bridal', icon: 'crown' as const, image: 'bridal-2.jpg', pos: 'top' as const, name: 'Bridal & Makeup', blurb: 'Camera-ready looks for your wedding, functions and parties.', items: [
    ['Bridal makeup (HD)', 'Long-wear, photo-ready bridal look'], ['Airbrush bridal makeup', 'Flawless, lightweight finish'],
    ['Engagement & reception makeup', 'Soft glam or full glam'], ['Party makeup', 'Evening, festive and occasion looks'],
    ['Sider / family makeup', 'For bridesmaids, sisters and mothers'], ['Saree & dupatta draping', 'Lehenga, saree and dupatta setting'],
  ] as [string, string][] },
  { slug: 'hair', icon: 'scissors' as const, image: unsplash('1634449571017-5fecfd26ad76'), pos: 'top' as const, name: 'Hair', blurb: 'Cuts, styling and care, from everyday to bridal.', items: [
    ['Haircut & trim', 'Layers, feathers, fringes'], ['Blow-dry & ironing', 'Straight, bouncy or wavy'],
    ['Bridal & party hairstyles', 'Buns, braids, curls, accessories'], ['Hair spa', 'Deep nourishment for dry or frizzy hair'],
    ['Hair colour & highlights', 'Global colour, highlights, root touch-up'], ['Smoothening / keratin', 'Frizz-free, manageable hair'],
    ['Head massage', 'Oil massage for relaxation'],
  ] as [string, string][] },
  { slug: 'skin', icon: 'drop' as const, image: unsplash('1570172619644-dfd03ed5d881'), pos: 'top' as const, name: 'Skin & Facials', blurb: 'Glow treatments for every skin type.', items: [
    ['Cleanup', 'Quick deep-cleanse and refresh'], ['Fruit / gold facial', 'Classic glow facials'],
    ['Advanced / hydra facial', 'Hydration and bridal glow'], ['De-tan', 'Removes tan from face, neck and arms'],
    ['Bleach', 'Face and body'], ['Pre-bridal skin care', 'Series of treatments before the wedding'],
  ] as [string, string][] },
  { slug: 'wax', icon: 'spark' as const, image: unsplash('1733145820333-6fa6ed6f8f5d'), pos: 'center' as const, name: 'Waxing & Threading', blurb: 'Quick, hygienic grooming.', items: [
    ['Eyebrow threading', 'Shape and clean-up'], ['Upper lip, chin & forehead', 'Threading or wax'], ['Face waxing', 'Full face'],
    ['Arms & underarms waxing', 'Regular or Rica wax'], ['Legs waxing', 'Half or full legs'], ['Full body waxing', 'Complete package'],
  ] as [string, string][] },
  { slug: 'hands', icon: 'hand' as const, image: unsplash('1664643411326-6c589531be3c'), pos: 'center' as const, name: 'Hands & Feet', blurb: 'Pampering care for hands and feet.', items: [
    ['Manicure', 'Clean, shape and polish'], ['Pedicure', 'Soak, scrub and polish'],
    ['Spa manicure & pedicure', 'With mask and massage'], ['Foot massage', 'Relaxing massage'],
  ] as [string, string][] },
  { slug: 'nails', icon: 'gem' as const, image: unsplash('1754799670312-8e7da8e40ad7'), pos: 'center' as const, name: 'Nails', blurb: 'Extensions and nail art that last.', items: [
    ['Gel polish', 'Long-lasting glossy colour'], ['Gel extensions', 'Natural-looking length'], ['Acrylic extensions', 'Strong, sculpted nails'],
    ['Nail art', 'French, ombre, chrome, stones'], ['Refill & removal', 'Safe removal and refills'],
  ] as [string, string][] },
  { slug: 'mehndi', icon: 'flower' as const, image: unsplash('1732118400647-a81e3b37be87'), pos: 'center' as const, name: 'Mehndi', blurb: 'Traditional and modern henna designs.', items: [
    ['Bridal mehndi', 'Full hands and feet, detailed designs'], ['Party & festival mehndi', 'Karva Chauth, Teej, weddings'],
    ['Arabic & modern designs', 'Quick, elegant patterns'],
  ] as [string, string][] },
]

export const PACKAGES = [
  { name: 'Bridal Package', icon: 'crown' as const, tag: 'Signature', items: ['Bridal makeup (HD or airbrush)', 'Bridal hairstyle', 'Saree / dupatta draping', 'Nails & mehndi add-ons'] },
  { name: 'Pre-Bridal Package', icon: 'drop' as const, tag: undefined, items: ['Facials & de-tan', 'Full body waxing', 'Manicure & pedicure', 'Hair spa'] },
  { name: 'Party & Festive Glam', icon: 'spark' as const, tag: undefined, items: ['Party makeup', 'Hairstyle', 'Draping', 'Gel polish or nail art'] },
]

type G = { title: string; category: 'bridal' | 'party' | 'hair' | 'nails' | 'classroom' | 'certification'; image?: string; course?: string }
export const GALLERY: G[] = [
  { title: 'Bridal look at our studio', category: 'bridal', image: 'bridal-6.jpg', course: 'bridal' },
  { title: 'Kundan bridal look', category: 'bridal', image: 'bridal-4.jpg', course: 'bridal' },
  { title: 'Soft glam bridal look', category: 'bridal', image: 'bridal-3.jpg', course: 'bridal' },
  { title: 'Admission counselling', category: 'classroom', image: 'counselling-1.jpg', course: 'basic' },
  { title: 'Bridal lehenga look', category: 'bridal', image: 'bridal-5.jpg', course: 'bridal' },
  { title: 'HD bridal look', category: 'bridal', image: 'bridal-1.jpg', course: 'bridal' },
  { title: 'Live practical session', category: 'classroom', image: 'class-1.jpg', course: 'basic' },
  { title: 'Bridal look – red saree', category: 'bridal', image: 'bridal-2.jpg', course: 'bridal' },
  // empty slots to fill with real student work
  { title: 'Evening party makeup', category: 'party', course: 'basic' },
  { title: 'Bridal bun with florals', category: 'hair', course: 'bridal' },
  { title: 'Gel extensions – ombre', category: 'nails', course: 'nails' },
  { title: 'Certificate day', category: 'certification' },
  { title: 'Soft curls', category: 'hair', course: 'bridal' },
  { title: 'Chrome nail art', category: 'nails', course: 'nails' },
  { title: 'Glam smoky eye', category: 'party', course: 'basic' },
  { title: 'Airbrush demo', category: 'classroom', course: 'bridal' },
  { title: 'Braided updo', category: 'hair', course: 'bridal' },
  { title: 'French tips', category: 'nails', course: 'nails' },
  { title: 'Batch graduation', category: 'certification' },
]

export const FAQS: [string, string][] = [
  ['What are the fees? Can I pay in instalments?', 'Fees depend on the course and batch. Message us on WhatsApp for the current fee list and instalment options.'],
  ['What are the batch timings?', 'We run batches at different times of day. Ask us for the next batch that suits your schedule.'],
  ['Do I need any experience?', 'No. The Basic Beauty Culture diploma starts from zero. Advanced courses suit those with some basics.'],
  ['Will I get a certificate?', 'Yes, every student receives a certificate on successful completion.'],
  ['Which language is the class taught in?', 'Classes are taught in Hindi and English.'],
  ['What documents do I need to enrol?', 'A photo ID and a passport-size photo. We will confirm anything else when you visit.'],
]

export const SETTINGS = {
  announcements: [
    { text: 'Admissions open for new batches', link: '/contact' },
    { text: 'Book your free demo class', link: '/contact' },
    { text: 'Bridal bookings open for the wedding season', link: '/services' },
    { text: 'Call / WhatsApp +91 99969 65685', link: 'tel:+919996965685' },
  ],
  reels: ['DdoKGAtS3yi', 'Ddn1kVFSfwQ', 'DdmHbzmyBrN', 'DdjBaEcSwW4', 'Ddi_I5nSa5W', 'DdivbjjSL3V', 'DdectICSogK', 'DdeXtyaSono', 'Dda8Eyvy3ua', 'DSCpv6-CeI6', 'DJRrqS_hsON', 'DFSUwuITnyU'].map((code) => ({ code })),
  stats: { instagramFollowers: 4000, postsShared: 970 },
}
