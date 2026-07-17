import { useState, useMemo } from 'react'
import type { Contribution, TabId } from '../types'
import { loadProfile } from '../storage'
import ProfileCard from './ProfileCard'
import SummaryCards from './SummaryCards'
import { HoursChart, CategoryChart } from './Charts'
import ContributionList from './ContributionList'

type Quarter = 'Full Year' | 'Q1' | 'Q2' | 'Q3' | 'Q4'
const QUARTERS: Quarter[] = ['Full Year', 'Q1', 'Q2', 'Q3', 'Q4']

function getQuarter(dateIso: string): 'Q1' | 'Q2' | 'Q3' | 'Q4' {
  const m = parseInt(dateIso.slice(5, 7), 10)
  if (m <= 3) return 'Q1'
  if (m <= 6) return 'Q2'
  if (m <= 9) return 'Q3'
  return 'Q4'
}

function getYear(dateIso: string) {
  return parseInt(dateIso.slice(0, 4), 10)
}

const currentYear = new Date().getFullYear()

function lastUpdated(contributions: Contribution[]): string {
  if (contributions.length === 0) return 'No contributions yet'
  const sorted = [...contributions].sort((a, b) => b.date.localeCompare(a.date))
  const d = sorted[0].date
  const [y, m, day] = d.split('-')
  return new Date(Number(y), Number(m) - 1, Number(day)).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric',
  })
}

interface NextStep {
  text: string
  action?: string
}

function buildNextSteps(contributions: Contribution[]): NextStep[] {
  const steps: NextStep[] = []

  const missingEvidence = contributions.filter(c => !c.evidence).length
  if (missingEvidence > 0 && steps.length < 3) {
    steps.push({ text: `${missingEvidence} contribution${missingEvidence > 1 ? 's are' : ' is'} missing an evidence link. Adding one strengthens your impact story.` })
  }

  const hasSpeaking = contributions.some(c => c.category === 'Speaking')
  const hasWriting   = contributions.some(c => c.category === 'Writing')
  if (hasSpeaking && !hasWriting && steps.length < 3) {
    steps.push({ text: 'You have speaking contributions — turning one into a blog post can reach a much wider audience.' })
  }

  const usedCategories = new Set(contributions.map(c => c.category))
  const allCategories = ['Speaking', 'Mentoring', 'Writing', 'Training', 'Open Source', 'Community'] as const
  const unused = allCategories.filter(c => !usedCategories.has(c))
  if (unused.length > 0 && steps.length < 3) {
    steps.push({ text: `You haven't logged anything under ${unused[0]} yet — even one entry can round out your profile.` })
  }

  if (steps.length === 0) {
    steps.push({ text: 'Your impact is looking strong. Copy your summary to share it with your nomination.' })
  }

  return steps.slice(0, 3)
}

interface Props {
  contributions: Contribution[]
  isDemoMode: boolean
  onViewDemo: () => void
  onReturnToTracker: () => void
  onNavigate: (tab: TabId) => void
}

export default function ImpactPage({ contributions, isDemoMode, onViewDemo, onReturnToTracker, onNavigate }: Props) {
  const [quarter, setQuarter] = useState<Quarter>('Full Year')

  const filtered = useMemo(() => {
    return contributions.filter(c => {
      if (getYear(c.date) !== currentYear) return false
      if (quarter === 'Full Year') return true
      return getQuarter(c.date) === quarter
    })
  }, [contributions, quarter])

  const nextSteps = useMemo(() => buildNextSteps(contributions), [contributions])
  const lastUpdate = lastUpdated(contributions)
  const isEmpty = filtered.length === 0
  // True zero: no contributions at all (not just filtered)
  const isAbsolutelyEmpty = contributions.length === 0
  const hasProfile = loadProfile() !== null

  return (
    <>
      <ProfileCard isDemoMode={isDemoMode} />

      {isDemoMode && (
        <div className="demo-mode-notice" role="status" aria-live="polite">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01"/></svg>
          Sample data is for preview only and is not saved to your tracker.
        </div>
      )}

      {/* Year + Quarter selector */}
      <div className="period-selector" role="group" aria-label="Filter by quarter">
        <span className="period-year">{currentYear}</span>
        {QUARTERS.map(q => (
          <button
            key={q}
            type="button"
            className={`period-btn${quarter === q ? ' period-btn--active' : ''}`}
            aria-pressed={quarter === q}
            onClick={() => setQuarter(q)}
          >
            {q}
          </button>
        ))}
      </div>

      <SummaryCards contributions={filtered} />

      {!isEmpty && (
        <p className="last-updated">Last updated: {lastUpdate}</p>
      )}

      {/* Absolute empty state: zero contributions total */}
      {isAbsolutelyEmpty && !isDemoMode ? (
        <div className="welcome-card">
          <p className="welcome-card-text">
            Your Champion Copilot is ready. Add your first contribution to begin building your impact story.
          </p>
          <div className="welcome-card-actions">
            <button
              className="btn-submit"
              type="button"
              onClick={() => onNavigate('contributions')}
            >
              Add First Contribution
            </button>
            {!hasProfile && (
              <button
                className="btn-submit btn-submit--secondary"
                type="button"
                onClick={() => onNavigate('contributions')}
              >
                Set Up Profile
              </button>
            )}
          </div>
        </div>
      ) : (
        <>
          {isEmpty && (
            <div className="empty-period-notice">
              {quarter === 'Full Year'
                ? 'Your tracker is ready. Add your first contribution to see your impact here.'
                : `Nothing logged in ${quarter} yet — that's fine, it's early days. Add a contribution whenever you're ready.`
              }
            </div>
          )}

          {/* Main two-column layout — only shown when there are contributions */}
          {!isEmpty && (
            <div className="impact-columns">
              <div className="impact-main">
                <HoursChart contributions={filtered} />
                <CategoryChart contributions={filtered} />

                <ContributionList
                  contributions={filtered.slice().sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5)}
                  isDemoMode={isDemoMode}
                  onReturnToTracker={onReturnToTracker}
                />
              </div>

              <div className="impact-side">
                <div className="panel">
                  <div className="panel-title">Your Next Steps</div>
                  {nextSteps.map((step, i) => (
                    <div key={i} className="next-step-item">
                      <span className="next-step-dot" aria-hidden="true" />
                      <span>{step.text}</span>
                    </div>
                  ))}
                </div>

                <div className="panel">
                  <div className="panel-title">Quick Actions</div>
                  <div className="quick-actions">
                    <button
                      className="btn-quick-action"
                      type="button"
                      onClick={() => onNavigate('contributions')}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                      Add Contribution
                    </button>
                    <button
                      className="btn-quick-action"
                      type="button"
                      onClick={() => onNavigate('contributions')}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                      View Contributions
                    </button>
                    {!isDemoMode && (
                      <button
                        className="btn-quick-action"
                        type="button"
                        onClick={() => {
                          if (contributions.length === 0) return
                          const total = contributions.length
                          const people = contributions.reduce((s, c) => s + c.peopleReached, 0)
                          const hours  = contributions.reduce((s, c) => s + c.hoursContributed, 0)
                          const text = `IBM Champion Impact Summary — ${currentYear}\nTotal contributions: ${total}\nPeople reached: ${people.toLocaleString()}\nHours contributed: ${hours}`
                          navigator.clipboard.writeText(text)
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                        Prepare Summary
                      </button>
                    )}
                    {!isDemoMode && (
                      <button
                        className="btn-quick-action btn-quick-action--demo"
                        type="button"
                        onClick={onViewDemo}
                        disabled={isDemoMode}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
                        View Demo Dashboard
                      </button>
                    )}
                    {isDemoMode && (
                      <button
                        className="btn-quick-action"
                        type="button"
                        onClick={onReturnToTracker}
                      >
                        Return to My Tracker
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  )
}
