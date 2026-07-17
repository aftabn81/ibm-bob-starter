import { useState } from 'react'
import type { Contribution, TabId } from './types'
import { loadContributions, saveContributions } from './storage'
import { buildSampleContributions } from './sampleData'
import Nav from './components/Nav'
import ImpactPage from './components/ImpactPage'
import ContributionsPage from './components/ContributionsPage'
import IdeasPage from './components/IdeasPage'
import Settings from './components/Settings'
import BuiltWithPage from './components/BuiltWithPage'
import AboutSkiliumPage from './components/AboutSkiliumPage'

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('impact')
  const [contributions, setContributions] = useState<Contribution[]>(loadContributions)
  const [editTarget, setEditTarget] = useState<Contribution | null>(null)

  // Demo mode — separate state, never written to localStorage
  const [isDemoMode, setIsDemoMode] = useState(false)
  const [demoContributions, setDemoContributions] = useState<Contribution[]>([])

  // ── Real-data handlers ────────────────────────────────────
  function handleAdd(c: Contribution) {
    const updated = [c, ...contributions]
    setContributions(updated)
    saveContributions(updated)
  }

  function handleUpdate(c: Contribution) {
    const updated = contributions.map(x => x.id === c.id ? c : x)
    setContributions(updated)
    saveContributions(updated)
    setEditTarget(null)
  }

  function handleCancelEdit() {
    setEditTarget(null)
  }

  function handleDelete(id: string) {
    const updated = contributions.filter(x => x.id !== id)
    setContributions(updated)
    saveContributions(updated)
    if (editTarget?.id === id) setEditTarget(null)
  }

  function handleClearAll() {
    setContributions([])
    saveContributions([])
    setEditTarget(null)
  }

  // ── Demo mode handlers ────────────────────────────────────
  function handleViewDemo() {
    setDemoContributions(buildSampleContributions())
    setIsDemoMode(true)
  }

  function handleReturnToTracker() {
    setIsDemoMode(false)
    setDemoContributions([])
  }

  // Navigate to contributions tab and clear edit target
  function handleNavigate(tab: TabId) {
    setActiveTab(tab)
    if (tab !== 'contributions') setEditTarget(null)
  }

  const displayContributions = isDemoMode ? demoContributions : contributions

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>

      <div className="dashboard">
        <header className="header">
          <span className="header-eyebrow">IBM Bob Starter Kit</span>
          <h1>Champion Impact Tracker</h1>
          <p className="header-sub">
            Log your contributions. Keep your evidence. See your impact.
          </p>
          <p className="header-built">Built with IBM Bob</p>
        </header>

        <Nav active={activeTab} onChange={handleNavigate} />

        <main id="main-content">
          {activeTab === 'impact' && (
            <ImpactPage
              contributions={displayContributions}
              isDemoMode={isDemoMode}
              onViewDemo={handleViewDemo}
              onReturnToTracker={handleReturnToTracker}
              onNavigate={handleNavigate}
            />
          )}

          {activeTab === 'contributions' && (
            <>
              <ContributionsPage
                contributions={displayContributions}
                isDemoMode={isDemoMode}
                editTarget={editTarget}
                onAdd={handleAdd}
                onUpdate={handleUpdate}
                onCancelEdit={handleCancelEdit}
                onEdit={setEditTarget}
                onDelete={handleDelete}
                onReturnToTracker={handleReturnToTracker}
              />
              {!isDemoMode && (
                <Settings onClearAll={handleClearAll} />
              )}
            </>
          )}

          {activeTab === 'ideas' && (
            <IdeasPage contributions={displayContributions} isDemoMode={isDemoMode} />
          )}

          {activeTab === 'built-with' && <BuiltWithPage onBack={() => handleNavigate('impact')} />}
          {activeTab === 'about-skilium' && <AboutSkiliumPage onBack={() => handleNavigate('impact')} />}
        </main>

        <footer className="app-footer">
          <div className="app-footer-links">
            <button
              type="button"
              className="app-footer-btn"
              onClick={() => handleNavigate('built-with')}
            >
              Built with IBM Bob
            </button>
            <span className="app-footer-divider" aria-hidden="true">·</span>
            <button
              type="button"
              className="app-footer-btn"
              onClick={() => handleNavigate('about-skilium')}
            >
              About Skilium
            </button>
            <span className="app-footer-divider" aria-hidden="true">·</span>
            <a
              className="app-footer-link"
              href="https://github.com/aftabn81/ibm-bob-starter"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
        </footer>
      </div>
    </>
  )
}
