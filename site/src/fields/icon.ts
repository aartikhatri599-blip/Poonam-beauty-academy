import type { SelectField } from 'payload'

// Line icons available in the site's icon sprite (src/components/IconSprite.tsx)
export const ICONS = [
  'crown', 'scissors', 'drop', 'spark', 'hand', 'gem', 'flower', 'brush', 'award', 'brief',
  'heart', 'cal', 'users', 'sofa', 'img', 'play', 'ig', 'star', 'pin', 'clock',
] as const

export type IconName = (typeof ICONS)[number]

export const iconField = (overrides: Partial<SelectField> = {}): SelectField => ({
  name: 'icon',
  type: 'select',
  defaultValue: 'spark',
  options: ICONS.map((value) => ({ label: value, value })),
  admin: { description: 'Small line icon shown next to the title.' },
  ...overrides,
} as SelectField)
