import type { Category, Contribution } from '../types'

interface Props {
  contributions: Contribution[]
}

// Per-category colour tokens — purely CSS class names
const CATEGORY_CLASS: Record<Category, string> = {
  Speaking:     'badge--speaking',
  Mentoring:    'badge--mentoring',
  Writing:      'badge--writing',
  Training:     'badge--training',
  'Open Source':'badge--opensource',
  Community:    'badge--community',
}

function formatDate(iso: string) {
  const [y, m, d] = iso.split('-')
  return new Date(Number(y), Number(m) - 1, Number(d)).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export default function ContributionList({ contributions }: Props) {
  if (contributions.length === 0) {
    return (
      <div className="panel">
        <div className="panel-title">Contributions</div>
        <div className="list-empty">
          <svg className="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="3" />
            <path d="M9 9h6M9 12h6M9 15h4" />
          </svg>
          <p className="empty-heading">No contributions yet</p>
          <p className="empty-hint">Use the form to log your first entry, or load sample data to explore.</p>
        </div>
      </div>
    )
  }

  const sorted = [...contributions].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <div className="panel">
      <div className="panel-title">Contributions <span className="panel-count">{contributions.length}</span></div>
      {sorted.map(c => (
        <div key={c.id} className="contrib-item">
          <div className="contrib-title">{c.title}</div>
          <div className="contrib-meta">
            <span className={`badge ${CATEGORY_CLASS[c.category]}`}>{c.category}</span>
            <span className="meta-date">{formatDate(c.date)}</span>
            {c.peopleReached > 0 && (
              <span className="meta-stat">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                {c.peopleReached.toLocaleString()}
              </span>
            )}
            {c.hoursContributed > 0 && (
              <span className="meta-stat">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                {c.hoursContributed}h
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
