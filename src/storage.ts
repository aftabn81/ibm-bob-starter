import type { Contribution, Profile } from './types'

const KEY = 'impact_dashboard_contributions'
const PROFILE_KEY = 'impact_dashboard_profile'

export function loadContributions(): Contribution[] {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as Contribution[]) : []
  } catch {
    return []
  }
}

export function saveContributions(contributions: Contribution[]): void {
  localStorage.setItem(KEY, JSON.stringify(contributions))
}

export function loadProfile(): Profile | null {
  try {
    const raw = localStorage.getItem(PROFILE_KEY)
    return raw ? (JSON.parse(raw) as Profile) : null
  } catch {
    return null
  }
}

export function saveProfile(profile: Profile): void {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile))
}
