import { useState, useEffect, useRef, useId } from 'react'
import type { Profile } from '../types'
import { REGION_OPTIONS, normalizeRegion } from '../types'
import { loadProfile, saveProfile } from '../storage'

function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map(w => w[0]?.toUpperCase() ?? '')
    .join('')
}

function resizeImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const url = URL.createObjectURL(file)
    img.onload = () => {
      const MAX = 256
      const scale = Math.min(1, MAX / Math.max(img.width, img.height))
      const w = Math.round(img.width * scale)
      const h = Math.round(img.height * scale)
      const canvas = document.createElement('canvas')
      canvas.width = w
      canvas.height = h
      const ctx = canvas.getContext('2d')!
      ctx.drawImage(img, 0, 0, w, h)
      URL.revokeObjectURL(url)
      resolve(canvas.toDataURL('image/jpeg', 0.82))
    }
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Image load failed')) }
    img.src = url
  })
}

const EMPTY_FORM: Profile = { name: '', region: 'Other', expertise: '', url: '', photo: '' }

export default function ProfileCard({ isDemoMode }: { isDemoMode: boolean }) {
  const [profile, setProfile] = useState<Profile | null>(() => loadProfile())
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState<Profile>(EMPTY_FORM)
  const [error, setError] = useState('')
  const [photoError, setPhotoError] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)
  const nameId = useId()
  const regionId = useId()
  const expertiseId = useId()
  const urlId = useId()

  useEffect(() => {
    if (editing) {
      // Normalize legacy region when entering edit mode
      const base = profile ?? EMPTY_FORM
      setForm({ ...base, region: normalizeRegion(base.region) })
      setError('')
      setPhotoError('')
    }
  }, [editing])

  async function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const allowed = ['image/jpeg', 'image/png', 'image/webp']
    if (!allowed.includes(file.type)) {
      setPhotoError('Only JPG, PNG, and WebP images are accepted.')
      return
    }
    if (file.size > 2 * 1024 * 1024) {
      setPhotoError('Image must be 2 MB or smaller.')
      return
    }
    setPhotoError('')
    try {
      const dataUrl = await resizeImage(file)
      setForm(f => ({ ...f, photo: dataUrl }))
    } catch {
      setPhotoError('Could not process the image. Please try another file.')
    }
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name.trim()) {
      setError('Full name is required.')
      return
    }
    const saved: Profile = { ...form, name: form.name.trim() }
    saveProfile(saved)
    setProfile(saved)
    setEditing(false)
  }

  function handleCancel() {
    setEditing(false)
  }

  // ── Edit form ────────────────────────────────────────────────
  if (editing) {
    return (
      <form className="profile-card profile-card--editing" onSubmit={handleSave} noValidate aria-label="Edit Profile">
        <div className="profile-edit-grid">
          {/* Avatar column */}
          <div className="profile-avatar-col">
            <div className="profile-avatar profile-avatar--edit">
              {form.photo
                ? <img src={form.photo} alt="Profile preview" />
                : <span className="profile-initials">{getInitials(form.name) || '?'}</span>
              }
            </div>
            <button
              className="btn-photo"
              type="button"
              onClick={() => fileRef.current?.click()}
            >
              {form.photo ? 'Change photo' : 'Upload photo'}
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              style={{ display: 'none' }}
              onChange={handlePhotoChange}
              aria-label="Upload profile photo"
            />
            {form.photo && (
              <button
                className="btn-photo btn-photo--remove"
                type="button"
                onClick={() => setForm(f => ({ ...f, photo: '' }))}
              >
                Remove photo
              </button>
            )}
            {photoError && <p className="profile-field-error">{photoError}</p>}
          </div>

          {/* Fields column */}
          <div className="profile-fields-col">
            <div className="form-field">
              <label htmlFor={nameId}>Full name *</label>
              <input id={nameId} type="text" value={form.name} required aria-required="true"
                placeholder="e.g. Noor Aftab"
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            </div>
            <div className="form-field">
              <label htmlFor={regionId}>Region</label>
              <select
                id={regionId}
                value={form.region}
                onChange={e => setForm(f => ({ ...f, region: e.target.value }))}
              >
                {REGION_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
            <div className="form-field">
              <label htmlFor={expertiseId}>Area of expertise</label>
              <input id={expertiseId} type="text" value={form.expertise}
                placeholder="e.g. AI, Cloud, Security"
                onChange={e => setForm(f => ({ ...f, expertise: e.target.value }))} />
            </div>
            <div className="form-field">
              <label htmlFor={urlId}>LinkedIn or website URL</label>
              <input id={urlId} type="url" value={form.url}
                placeholder="https://"
                onChange={e => setForm(f => ({ ...f, url: e.target.value }))} />
            </div>
            {error && <p className="profile-field-error" role="alert">{error}</p>}
          </div>
        </div>

        <div className="profile-edit-actions">
          <button className="btn-submit" type="submit">Save Profile</button>
          <button className="btn-submit" type="button"
            style={{ background: '#6b7280', marginLeft: 8 }}
            onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    )
  }

  // ── Display card ─────────────────────────────────────────────
  const p = profile
  const regionLabel = p ? normalizeRegion(p.region) : null

  return (
    <div className="profile-card">
      <div className="profile-display">
        <div className="profile-avatar">
          {p?.photo
            ? <img src={p.photo} alt={`${p.name} profile photo`} />
            : <span className="profile-initials">{p ? getInitials(p.name) || '?' : '?'}</span>
          }
        </div>
        <div className="profile-info">
          {p ? (
            <>
              <div className="profile-name-row">
                <span className="profile-name">{p.name}</span>
                <span className="badge-champion">IBM Champion</span>
              </div>
              {(regionLabel || p.expertise) && (
                <div className="profile-meta">
                  {[p.expertise, regionLabel].filter(Boolean).join(' · ')}
                </div>
              )}
              {p.url && (
                <a className="profile-url" href={p.url} target="_blank" rel="noopener noreferrer">
                  {p.url.replace(/^https?:\/\//, '')}
                </a>
              )}
            </>
          ) : (
            <div className="profile-empty">
              <span className="profile-empty-text">No profile set up yet.</span>
            </div>
          )}
        </div>
        {!isDemoMode && (
          <button
            className="btn-edit-profile"
            type="button"
            onClick={() => setEditing(true)}
            aria-label="Edit profile"
          >
            {p ? 'Edit Profile' : 'Set Up Profile'}
          </button>
        )}
      </div>
    </div>
  )
}
