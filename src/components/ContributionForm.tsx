import { useState } from 'react'
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
}

const today = new Date().toISOString().slice(0, 10)

const empty = {
  title: '',
  category: 'Speaking' as Category,
  date: today,
  peopleReached: '',
  hoursContributed: '',
}

export default function ContributionForm({ onAdd }: Props) {
  const [form, setForm] = useState(empty)
  const [error, setError] = useState('')

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
    onAdd({
      id: crypto.randomUUID(),
      title: form.title.trim(),
      category: form.category,
      date: form.date,
      peopleReached: form.peopleReached === '' ? 0 : Number(form.peopleReached),
      hoursContributed: form.hoursContributed === '' ? 0 : Number(form.hoursContributed),
    })
    setForm(empty)
  }

  return (
    <form className="panel" onSubmit={handleSubmit} noValidate>
      <div className="panel-title">Add Contribution</div>

      <div className="form-field">
        <label htmlFor="title">Title *</label>
        <input
          id="title"
          type="text"
          value={form.title}
          placeholder="e.g. Talk at IBM TechXchange"
          onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
        />
      </div>

      <div className="form-field">
        <label htmlFor="category">Category *</label>
        <select
          id="category"
          value={form.category}
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

      {error && (
        <p style={{ color: '#cf222e', fontSize: 13, marginBottom: 10 }}>{error}</p>
      )}

      <button className="btn-submit" type="submit">
        Save Contribution
      </button>
    </form>
  )
}
