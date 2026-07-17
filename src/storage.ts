import type { Contribution } from './types'

const KEY = 'impact_dashboard_contributions'

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
