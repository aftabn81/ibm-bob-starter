import type { Contribution } from './types'

// Dates are relative to the current year so sample data always feels recent.
function d(month: number, day: number): string {
  const year = new Date().getFullYear()
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

export const SAMPLE_CONTRIBUTIONS: Omit<Contribution, 'id'>[] = [
  {
    title: 'Keynote: Building AI Agents with IBM watsonx',
    category: 'Speaking',
    date: d(1, 18),
    peopleReached: 320,
    hoursContributed: 4,
  },
  {
    title: 'IBM TechXchange Panel — Responsible AI in the Enterprise',
    category: 'Speaking',
    date: d(3, 7),
    peopleReached: 210,
    hoursContributed: 3,
  },
  {
    title: 'Mentored junior developer on IBM Cloud Kubernetes Service',
    category: 'Mentoring',
    date: d(2, 12),
    peopleReached: 1,
    hoursContributed: 8,
  },
  {
    title: '6-week mentoring cohort — IBM SkillsBuild graduates',
    category: 'Mentoring',
    date: d(4, 3),
    peopleReached: 6,
    hoursContributed: 18,
  },
  {
    title: 'Blog post: Getting started with IBM watsonx.ai Prompt Lab',
    category: 'Writing',
    date: d(2, 28),
    peopleReached: 1840,
    hoursContributed: 5,
  },
  {
    title: 'Tutorial: Deploying a Node.js app to IBM Code Engine',
    category: 'Writing',
    date: d(5, 14),
    peopleReached: 970,
    hoursContributed: 4,
  },
  {
    title: 'IBM Cloud Essentials — half-day workshop (internal)',
    category: 'Training',
    date: d(3, 22),
    peopleReached: 28,
    hoursContributed: 4,
  },
  {
    title: 'Open source fix: accessibility issue in IBM Carbon Design System',
    category: 'Open Source',
    date: d(4, 19),
    peopleReached: 0,
    hoursContributed: 6,
  },
  {
    title: 'Organised IBM Developer monthly meetup — London',
    category: 'Community',
    date: d(5, 8),
    peopleReached: 75,
    hoursContributed: 5,
  },
  {
    title: 'IBM Champion nomination writeup and peer review',
    category: 'Community',
    date: d(6, 1),
    peopleReached: 12,
    hoursContributed: 2,
  },
]

export function buildSampleContributions(): Contribution[] {
  return SAMPLE_CONTRIBUTIONS.map(c => ({
    ...c,
    id: crypto.randomUUID(),
  }))
}
