import { useState } from 'react'
import type { Contribution } from './types'
import { loadContributions, saveContributions } from './storage'
import { buildSampleContributions } from './sampleData'
import SummaryCards from './components/SummaryCards'
import ContributionForm from './components/ContributionForm'
import ContributionList from './components/ContributionList'
import Toolbar from './components/Toolbar'

export default function App() {
  const [contributions, setContributions] = useState<Contribution[]>(loadContributions)

  function handleAdd(c: Contribution) {
    const updated = [c, ...contributions]
    setContributions(updated)
    saveContributions(updated)
  }

  function handleLoadSample() {
    if (contributions.length > 0) {
      const ok = window.confirm(
        'You already have contributions saved.\n\nAdd the 10 sample contributions alongside your existing data?'
      )
      if (!ok) return
    }
    const samples = buildSampleContributions()
    const updated = [...samples, ...contributions]
    setContributions(updated)
    saveContributions(updated)
  }

  function handleClear() {
    const ok = window.confirm('Delete all contributions? This cannot be undone.')
    if (!ok) return
    setContributions([])
    saveContributions([])
  }

  return (
    <div className="dashboard">
      <header className="header">
        <span className="header-eyebrow">IBM Bob Starter Kit</span>
        <h1>Champion Impact Tracker</h1>
        <p className="header-sub">
          Log your contributions. Keep your evidence. See your impact.
        </p>
        <p className="header-built">Built with IBM Bob</p>
      </header>

      <SummaryCards contributions={contributions} />

      <Toolbar
        hasData={contributions.length > 0}
        onLoadSample={handleLoadSample}
        onClear={handleClear}
      />

      <div className="columns">
        <ContributionForm onAdd={handleAdd} />
        <ContributionList contributions={contributions} />
      </div>

      <footer className="attribution">
        <span>Created by Noor Aftab, IBM Champion</span>
        <span className="attribution-divider">·</span>
        <span>A Skilium learning initiative</span>
      </footer>
    </div>
  )
}
