import { useState, useEffect, useRef } from 'react'
import type { Category, Contribution } from '../types'

interface Props {
  contributions: Contribution[]
  onEdit?: (c: Contribution) => void
  onDelete?: (id: string) => void
  onCopySummary?: (c: Contribution) => void
  isDemoMode?: boolean
  onReturnToTracker?: () => void
  /** When true, shows search + filter controls above the list */
  showFilters?: boolean
}

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
    day: 'numeric', month: 'short', year: 'numeric',
  })
}

function getQuarter(dateIso: string): 'Q1' | 'Q2' | 'Q3' | 'Q4' {
  const month = parseInt(dateIso.slice(5, 7), 10)
  if (month <= 3)  return 'Q1'
  if (month <= 6)  return 'Q2'
  if (month <= 9)  return 'Q3'
  return 'Q4'
}

function buildSummary(c: Contribution): string {
  const parts: string[] = []
  parts.push(`${c.category}: ${c.title}`)
  parts.push(`Date: ${formatDate(c.date)}`)
  if (c.peopleReached > 0)   parts.push(`People reached: ${c.peopleReached.toLocaleString()}`)
  if (c.hoursContributed > 0) parts.push(`Hours: ${c.hoursContributed}`)
  if (c.organisation)         parts.push(`Organisation: ${c.organisation}`)
  if (c.technology)           parts.push(`Technology: ${c.technology}`)
  if (c.description)          parts.push(`Notes: ${c.description}`)
  if (c.evidence)             parts.push(`Evidence: ${c.evidence}`)
  return parts.join('\n')
}

interface DeleteDialogProps {
  contribution: Contribution
  onConfirm: () => void
  onCancel: () => void
}

function DeleteDialog({ contribution, onConfirm, onCancel }: DeleteDialogProps) {
  const cancelRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    cancelRef.current?.focus()
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onCancel()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onCancel])

  return (
    <div className="dialog-backdrop" role="alertdialog" aria-modal="true"
      aria-labelledby="del-dialog-title" aria-describedby="del-dialog-desc">
      <div className="dialog-box">
        <p className="dialog-title" id="del-dialog-title">Delete contribution?</p>
        <p className="dialog-body" id="del-dialog-desc">
          Are you sure you want to delete{' '}
          <span className="dialog-contrib-name">"{contribution.title}"</span>?
          {' '}This cannot be undone.
        </p>
        <div className="dialog-actions">
          <button ref={cancelRef} className="btn-dialog-cancel" type="button" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn-dialog-confirm" type="button" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

const CATEGORIES_ALL: Category[] = ['Speaking', 'Mentoring', 'Writing', 'Training', 'Open Source', 'Community']
const QUARTERS = ['Full Year', 'Q1', 'Q2', 'Q3', 'Q4'] as const

export default function ContributionList({
  contributions,
  onEdit,
  onDelete,
  onCopySummary,
  isDemoMode,
  onReturnToTracker,
  showFilters,
}: Props) {
  const [pendingDelete, setPendingDelete] = useState<Contribution | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [quarterFilter, setQuarterFilter] = useState<typeof QUARTERS[number]>('Full Year')
  const [categoryFilter, setCategoryFilter] = useState<Category | 'All'>('All')

  function handleCopy(c: Contribution) {
    const text = buildSummary(c)
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(c.id)
      setTimeout(() => setCopiedId(null), 2000)
    })
    onCopySummary?.(c)
  }

  const sorted = [...contributions].sort((a, b) => b.date.localeCompare(a.date))

  const filtered = sorted.filter(c => {
    if (quarterFilter !== 'Full Year' && getQuarter(c.date) !== quarterFilter) return false
    if (categoryFilter !== 'All' && c.category !== categoryFilter) return false
    if (search.trim()) {
      const q = search.toLowerCase()
      const haystack = [c.title, c.organisation ?? '', c.technology ?? '', c.description ?? ''].join(' ').toLowerCase()
      if (!haystack.includes(q)) return false
    }
    return true
  })

  if (contributions.length === 0 && !isDemoMode) {
    return (
      <div className="panel">
        <div className="panel-title">Contributions</div>
        <div className="list-empty">
          <svg className="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="3" />
            <path d="M9 9h6M9 12h6M9 15h4" />
          </svg>
          <p className="empty-heading">No contributions yet</p>
          <p className="empty-hint">Use the form to log your first entry, or view the demo dashboard to explore.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="panel">
      {isDemoMode && (
        <div className="demo-banner" role="status">
          <span className="demo-banner-label">Demo Mode — sample data only</span>
          <button className="btn-return" type="button" onClick={onReturnToTracker}>
            Return to My Tracker
          </button>
          <p className="demo-banner-notice">
            Sample data is for preview only and is not saved to your tracker.
          </p>
        </div>
      )}

      <div className="panel-title">
        Contributions <span className="panel-count">{contributions.length}</span>
      </div>

      {showFilters && (
        <div className="contrib-filters">
          <input
            className="contrib-search"
            type="search"
            placeholder="Search by title, organisation, technology…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            aria-label="Search contributions"
          />
          <div className="contrib-filter-row">
            <div className="filter-group">
              <label htmlFor="quarter-filter" className="filter-label">Quarter</label>
              <select
                id="quarter-filter"
                value={quarterFilter}
                onChange={e => setQuarterFilter(e.target.value as typeof QUARTERS[number])}
              >
                {QUARTERS.map(q => <option key={q} value={q}>{q}</option>)}
              </select>
            </div>
            <div className="filter-group">
              <label htmlFor="category-filter" className="filter-label">Category</label>
              <select
                id="category-filter"
                value={categoryFilter}
                onChange={e => setCategoryFilter(e.target.value as Category | 'All')}
              >
                <option value="All">All categories</option>
                {CATEGORIES_ALL.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            {(search || quarterFilter !== 'Full Year' || categoryFilter !== 'All') && (
              <button
                className="btn-clear-filters"
                type="button"
                onClick={() => { setSearch(''); setQuarterFilter('Full Year'); setCategoryFilter('All') }}
              >
                Clear filters
              </button>
            )}
          </div>
          {filtered.length !== contributions.length && (
            <p className="filter-result-count" aria-live="polite">
              Showing {filtered.length} of {contributions.length} contributions
            </p>
          )}
        </div>
      )}

      {filtered.length === 0 && contributions.length > 0 && (
        <div className="list-empty">
          <p className="empty-heading">No contributions match your filters</p>
          <p className="empty-hint">Try adjusting the search or filter options above.</p>
        </div>
      )}

      {filtered.map(c => (
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
            {c.evidence && (
              <a
                className="meta-evidence-link"
                href={c.evidence}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Evidence for "${c.title}" (opens in new tab)`}
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                </svg>
                Evidence
              </a>
            )}
          </div>
          <div className="contrib-actions">
            <button
              className="btn-row btn-copy"
              type="button"
              onClick={() => handleCopy(c)}
              aria-label={`Copy summary of "${c.title}"`}
            >
              {copiedId === c.id ? 'Copied!' : 'Copy Summary'}
            </button>
            {!isDemoMode && onEdit && (
              <button className="btn-row btn-edit" type="button" onClick={() => onEdit(c)}
                aria-label={`Edit "${c.title}"`}>
                Edit
              </button>
            )}
            {!isDemoMode && onDelete && (
              <button className="btn-row btn-delete-row" type="button"
                onClick={() => setPendingDelete(c)}
                aria-label={`Delete "${c.title}"`}>
                Delete
              </button>
            )}
          </div>
        </div>
      ))}

      {pendingDelete && (
        <DeleteDialog
          contribution={pendingDelete}
          onConfirm={() => {
            onDelete?.(pendingDelete.id)
            setPendingDelete(null)
          }}
          onCancel={() => setPendingDelete(null)}
        />
      )}
    </div>
  )
}
