import type { Contribution } from '../types'

interface Props {
  contributions: Contribution[]
}

function IconContributions() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  )
}

function IconPeople() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

function IconClock() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

function IconEvidence() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  )
}

export default function SummaryCards({ contributions }: Props) {
  const totalContributions = contributions.length
  const totalPeopleReached = contributions.reduce((sum, c) => sum + c.peopleReached, 0)
  const totalHours = contributions.reduce((sum, c) => sum + c.hoursContributed, 0)
  const evidenceReady = contributions.filter(c => c.evidence && c.evidence.trim().length > 0).length

  return (
    <div className="cards">
      <div className="card">
        <div className="card-icon card-icon--blue">
          <IconContributions />
        </div>
        <div className="card-label">Total Contributions</div>
        <div className="card-value">{totalContributions}</div>
      </div>
      <div className="card">
        <div className="card-icon card-icon--indigo">
          <IconPeople />
        </div>
        <div className="card-label">People Reached</div>
        <div className="card-value">{totalPeopleReached.toLocaleString()}</div>
      </div>
      <div className="card">
        <div className="card-icon card-icon--cyan">
          <IconClock />
        </div>
        <div className="card-label">Hours Contributed</div>
        <div className="card-value">{totalHours}</div>
      </div>
      <div className="card">
        <div className="card-icon card-icon--green">
          <IconEvidence />
        </div>
        <div className="card-label">Evidence Ready</div>
        <div className="card-value">{evidenceReady}</div>
      </div>
    </div>
  )
}
