export type RegionKey = 'AMER' | 'EMEA' | 'APAC' | 'Other'

export const REGION_OPTIONS: { value: RegionKey; label: string }[] = [
  { value: 'AMER', label: 'Americas' },
  { value: 'EMEA', label: 'Europe, Middle East & Africa' },
  { value: 'APAC', label: 'Asia Pacific' },
  { value: 'Other', label: 'Other' },
]

/** Normalize any legacy free-text region to a RegionKey. */
export function normalizeRegion(raw: string | undefined): RegionKey {
  if (!raw) return 'Other'
  const KNOWN: RegionKey[] = ['AMER', 'EMEA', 'APAC', 'Other']
  if (KNOWN.includes(raw as RegionKey)) return raw as RegionKey
  return 'Other'
}

export interface Profile {
  name: string
  region: string          // stored value — may be legacy free-text; use normalizeRegion() before display
  expertise: string
  url: string
  photo: string           // base64 data-URI or empty string
}

export type Category =
  | 'Speaking'
  | 'Mentoring'
  | 'Writing'
  | 'Training'
  | 'Open Source'
  | 'Community'

export interface Contribution {
  id: string
  title: string
  category: Category
  date: string
  peopleReached: number
  hoursContributed: number
  // Optional additional details — absent on contributions saved before this version
  organisation?: string
  technology?: string
  description?: string
  evidence?: string       // URL
}

export type TabId = 'impact' | 'contributions' | 'ideas' | 'built-with' | 'about-skilium'
