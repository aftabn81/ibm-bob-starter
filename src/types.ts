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
}
