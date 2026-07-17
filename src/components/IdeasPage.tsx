import { useState, useEffect } from 'react'
import type { Contribution, Category } from '../types'
import ProfileCard from './ProfileCard'

interface Idea {
  id: string
  title: string
  description: string
  category: IdeaCategory
  icon: string
  action: string
}

type IdeaCategory = 'Speaking' | 'Writing' | 'Mentoring' | 'Open Source' | 'Community'
type FilterTab = 'All' | IdeaCategory

const FILTER_TABS: FilterTab[] = ['All', 'Speaking', 'Writing', 'Mentoring', 'Open Source', 'Community']

const IDEAS: Idea[] = [
  // Speaking
  { id: 'sp1', category: 'Speaking', icon: '🎤', title: 'Local meetup talk', description: 'A 15–20 min talk at a local tech group.', action: 'Find a meetup' },
  { id: 'sp2', category: 'Speaking', icon: '💬', title: 'Join a panel', description: 'Lower-pressure than solo talks; explore topics with peers.', action: 'Browse panels' },
  { id: 'sp3', category: 'Speaking', icon: '🍱', title: 'Lunch-and-learn', description: 'Internal session that counts as a contribution.', action: 'Schedule it' },
  // Writing
  { id: 'wr1', category: 'Writing', icon: '📝', title: 'Getting-started tutorial', description: 'A short how-to on a tool you know well.', action: 'Start writing' },
  { id: 'wr2', category: 'Writing', icon: '🔍', title: 'Lessons-learned post', description: 'Sharing what went wrong is often the most useful content.', action: 'Draft it' },
  { id: 'wr3', category: 'Writing', icon: '📖', title: 'IBM documentation fix', description: 'Clarify a confusing page or add a missing example.', action: 'Find an issue' },
  // Mentoring
  { id: 'me1', category: 'Mentoring', icon: '🧭', title: 'SkillsBuild mentoring', description: 'A few hours/month guiding someone through certification.', action: 'Sign up' },
  { id: 'me2', category: 'Mentoring', icon: '🕐', title: 'Weekly office hours', description: 'A 30-min standing slot for people with questions.', action: 'Set a slot' },
  { id: 'me3', category: 'Mentoring', icon: '📄', title: 'Review a CV or portfolio', description: 'Practical feedback can help a junior land their next role.', action: 'Volunteer' },
  // Open Source
  { id: 'os1', category: 'Open Source', icon: '📚', title: 'Fix a docs issue', description: 'Docs PRs are welcoming and help every developer who follows.', action: 'Browse issues' },
  { id: 'os2', category: 'Open Source', icon: '🐛', title: 'Report and triage bugs', description: 'A well-written bug report saves maintainers significant time.', action: 'Find a project' },
  { id: 'os3', category: 'Open Source', icon: '🔎', title: 'Review a pull request', description: 'Thoughtful code review is one of the most valuable contributions.', action: 'Open GitHub' },
  // Community
  { id: 'co1', category: 'Community', icon: '🗓', title: 'Organise a community event', description: 'Even a small virtual event creates space to connect and learn.', action: 'Plan it' },
  { id: 'co2', category: 'Community', icon: '🏅', title: 'Nominate a colleague', description: 'Sharing the Champion programme is itself a contribution.', action: 'Nominate' },
  { id: 'co3', category: 'Community', icon: '💡', title: 'Answer forum questions', description: 'A few helpful replies can reach thousands of readers.', action: 'Go to forums' },
]

const SAVED_KEY = 'idea_vault_saved'

function loadSaved(): Set<string> {
  try {
    const raw = localStorage.getItem(SAVED_KEY)
    return raw ? new Set(JSON.parse(raw) as string[]) : new Set()
  } catch {
    return new Set()
  }
}

function persistSaved(saved: Set<string>) {
  localStorage.setItem(SAVED_KEY, JSON.stringify([...saved]))
}

type Suggestion = { text: string }

function buildSuggestions(contributions: Contribution[]): Suggestion[] {
  const suggestions: Suggestion[] = []

  const missingEvidence = contributions.filter(c => !c.evidence)
  if (missingEvidence.length > 0 && suggestions.length < 3) {
    const c = missingEvidence[0]
    suggestions.push({ text: `Add an evidence link to "${c.title}" to make it nomination-ready.` })
  }

  const hasSpeaking = contributions.some(c => c.category === 'Speaking')
  const hasWriting   = contributions.some(c => c.category === 'Writing')
  if (hasSpeaking && !hasWriting && suggestions.length < 3) {
    suggestions.push({ text: 'You have a speaking contribution — turning it into a blog post could reach a far wider audience.' })
  }

  const usedCategories = new Set(contributions.map(c => c.category))
  const allCategories: Category[] = ['Speaking', 'Mentoring', 'Writing', 'Training', 'Open Source', 'Community']
  const unused = allCategories.filter(c => !usedCategories.has(c))
  if (unused.length > 0 && suggestions.length < 3) {
    suggestions.push({ text: `You haven't logged a ${unused[0]} contribution yet. Even a small one rounds out your profile.` })
  }

  if (contributions.length > 0 && suggestions.length < 3) {
    suggestions.push({ text: 'Review your latest contributions and copy the summary to your nomination draft.' })
  }

  return suggestions.slice(0, 3)
}

interface Props {
  contributions: Contribution[]
  isDemoMode?: boolean
}

export default function IdeasPage({ contributions, isDemoMode = false }: Props) {
  const [saved, setSaved] = useState<Set<string>>(loadSaved)
  const [activeFilter, setActiveFilter] = useState<FilterTab>('All')
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    persistSaved(saved)
  }, [saved])

  function toggleSaved(id: string) {
    setSaved(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const suggestions = buildSuggestions(contributions)

  const filtered = activeFilter === 'All'
    ? IDEAS
    : IDEAS.filter(i => i.category === activeFilter)

  const visible = showAll ? filtered : filtered.slice(0, 6)
  const hasMore = filtered.length > 6 && !showAll

  return (
    <>
      <ProfileCard isDemoMode={isDemoMode} />

      <div className="ideas-page">
        <div className="ideas-header">
          <h2 className="ideas-vault-title">Idea Vault</h2>
          <p className="ideas-vault-sub">Inspiration for your next IBM Champion contribution.</p>
        </div>

        {/* Personalised recommendations */}
        {suggestions.length > 0 && (
          <div className="panel ideas-recommendations">
            <div className="panel-title">Recommended for You</div>
            {suggestions.map((s, i) => (
              <div key={i} className="suggestion-item">
                <span className="next-step-dot" aria-hidden="true" />
                <span>{s.text}</span>
              </div>
            ))}
          </div>
        )}

        {/* Compact filter tabs */}
        <div className="idea-filters" role="group" aria-label="Filter ideas by category">
          {FILTER_TABS.map(tab => (
            <button
              key={tab}
              type="button"
              className={`idea-filter-btn${activeFilter === tab ? ' idea-filter-btn--active' : ''}`}
              aria-pressed={activeFilter === tab}
              onClick={() => { setActiveFilter(tab); setShowAll(false) }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Idea grid */}
        <div className="idea-grid">
          {visible.map(idea => (
            <div key={idea.id} className={`idea-card${saved.has(idea.id) ? ' idea-card--saved' : ''}`}>
              <div className="idea-card-icon" aria-hidden="true">{idea.icon}</div>
              <div className="idea-card-category">{idea.category}</div>
              <div className="idea-card-title">{idea.title}</div>
              <div className="idea-card-desc">{idea.description}</div>
              <div className="idea-card-footer">
                <button
                  className={`btn-save-idea${saved.has(idea.id) ? ' btn-save-idea--saved' : ''}`}
                  type="button"
                  aria-pressed={saved.has(idea.id)}
                  onClick={() => toggleSaved(idea.id)}
                >
                  {saved.has(idea.id) ? '✓ Saved' : 'Save'}
                </button>
                <span className="idea-card-action">{idea.action}</span>
              </div>
            </div>
          ))}
        </div>

        {hasMore && (
          <button
            className="btn-show-more"
            type="button"
            onClick={() => setShowAll(true)}
          >
            Show {filtered.length - 6} more ideas
          </button>
        )}
      </div>
    </>
  )
}
