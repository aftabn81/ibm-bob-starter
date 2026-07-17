import { useState, useEffect, useId } from 'react'
import type { Category, Contribution } from '../types'

const CATEGORIES: Category[] = [
  'Speaking',
  'Mentoring',
  'Writing',
  'Training',
  'Open Source',
  'Community',
]

interface Props {
  onAdd: (c: Contribution) => void
  editTarget?: Contribution | null
  onUpdate?: (c: Contribution) => void
  onCancelEdit?: () => void
}

const today = new Date().toISOString().slice(0, 10)

const empty = {
  title: '',
  category: 'Speaking' as Category,
  date: today,
  peopleReached: '',
  hoursContributed: '',
  organisation: '',
  technology: '',
  description: '',
  evidence: '',
}

function toFormValues(c: Contribution) {
  return {
    title: c.title,
    category: c.category,
    date: c.date,
    peopleReached: String(c.peopleReached),
    hoursContributed: String(c.hoursContributed),
    organisation: c.organisation ?? '',
    technology: c.technology ?? '',
    description: c.description ?? '',
    evidence: c.evidence ?? '',
  }
}

export default function ContributionForm({ onAdd, editTarget, onUpdate, onCancelEdit }: Props) {
  const [form, setForm] = useState(empty)
  const [error, setError] = useState('')
  const [showDetails, setShowDetails] = useState(false)
  const errorId = useId()
  const titleId = useId()

  const isEditing = !!editTarget

  useEffect(() => {
    if (editTarget) {
      const vals = toFormValues(editTarget)
      setForm(vals)
      setError('')
      // Auto-expand if any detail field is populated
      if (vals.organisation || vals.technology || vals.description || vals.evidence) {
        setShowDetails(true)
      }
    } else {
      setForm(empty)
      setError('')
      setShowDetails(false)
    }
  }, [editTarget])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.title.trim()) {
      setError('Title is required.')
      return
    }
    if (!form.date) {
      setError('Date is required.')
      return
    }
    setError('')

    const contribution: Contribution = {
      id: editTarget ? editTarget.id : crypto.randomUUID(),
      title: form.title.trim(),
      category: form.category,
      date: form.date,
      peopleReached: form.peopleReached === '' ? 0 : Number(form.peopleReached),
      hoursContributed: form.hoursContributed === '' ? 0 : Number(form.hoursContributed),
      ...(form.organisation.trim() && { organisation: form.organisation.trim() }),
      ...(form.technology.trim()   && { technology:   form.technology.trim()   }),
      ...(form.description.trim()  && { description:  form.description.trim()  }),
      ...(form.evidence.trim()     && { evidence:      form.evidence.trim()     }),
    }

    if (isEditing && onUpdate) {
      onUpdate(contribution)
    } else {
      onAdd(contribution)
      setForm(empty)
      setShowDetails(false)
    }
  }

  return (
    <form className="panel" onSubmit={handleSubmit} noValidate aria-label={isEditing ? 'Edit Contribution' : 'Add Contribution'}>
      <div className="panel-title">{isEditing ? 'Edit Contribution' : 'Add Contribution'}</div>

      <div className="form-field">
        <label htmlFor={titleId}>Title *</label>
        <input
          id={titleId}
          type="text"
          value={form.title}
          placeholder="e.g. Talk at IBM TechXchange"
          required
          aria-required="true"
          aria-describedby={error ? errorId : undefined}
          onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
        />
      </div>

      <div className="form-field">
        <label htmlFor="category">Category *</label>
        <select
          id="category"
          value={form.category}
          required
          aria-required="true"
          onChange={e => setForm(f => ({ ...f, category: e.target.value as Category }))}
        >
          {CATEGORIES.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="form-field">
        <label htmlFor="date">Date *</label>
        <input
          id="date"
          type="date"
          value={form.date}
          required
          aria-required="true"
          aria-describedby={error ? errorId : undefined}
          onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
        />
      </div>

      <div className="form-field">
        <label htmlFor="peopleReached">People Reached</label>
        <input
          id="peopleReached"
          type="number"
          min="0"
          value={form.peopleReached}
          placeholder="0"
          onChange={e => setForm(f => ({ ...f, peopleReached: e.target.value }))}
        />
      </div>

      <div className="form-field">
        <label htmlFor="hoursContributed">Hours Contributed</label>
        <input
          id="hoursContributed"
          type="number"
          min="0"
          step="0.5"
          value={form.hoursContributed}
          placeholder="0"
          onChange={e => setForm(f => ({ ...f, hoursContributed: e.target.value }))}
        />
      </div>

      {/* Additional details (collapsed by default) */}
      <button
        type="button"
        className="btn-toggle-details"
        aria-expanded={showDetails}
        onClick={() => setShowDetails(s => !s)}
      >
        <svg
          width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
          aria-hidden="true"
          style={{ transform: showDetails ? 'rotate(90deg)' : 'none', transition: 'transform 0.15s' }}
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
        Additional details
      </button>

      {showDetails && (
        <div className="details-section">
          <div className="form-field">
            <label htmlFor="organisation">Organisation</label>
            <input
              id="organisation"
              type="text"
              value={form.organisation}
              placeholder="e.g. IBM, local meetup"
              onChange={e => setForm(f => ({ ...f, organisation: e.target.value }))}
            />
          </div>
          <div className="form-field">
            <label htmlFor="technology">Technology</label>
            <input
              id="technology"
              type="text"
              value={form.technology}
              placeholder="e.g. watsonx, Carbon, Kubernetes"
              onChange={e => setForm(f => ({ ...f, technology: e.target.value }))}
            />
          </div>
          <div className="form-field">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={form.description}
              placeholder="A short note about what you did"
              rows={3}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
            />
          </div>
          <div className="form-field">
            <label htmlFor="evidence">Evidence URL</label>
            <input
              id="evidence"
              type="url"
              value={form.evidence}
              placeholder="https://example.com/blog-post"
              onChange={e => setForm(f => ({ ...f, evidence: e.target.value }))}
            />
          </div>
        </div>
      )}

      {error && (
        <p id={errorId} role="alert" style={{ color: '#cf222e', fontSize: 13, marginBottom: 10 }}>{error}</p>
      )}

      <button className="btn-submit" type="submit">
        {isEditing ? 'Update Contribution' : 'Save Contribution'}
      </button>

      {isEditing && (
        <button
          className="btn-submit"
          type="button"
          style={{ marginTop: 8, background: '#6b7280' }}
          onClick={onCancelEdit}
        >
          Cancel Edit
        </button>
      )}
    </form>
  )
}
