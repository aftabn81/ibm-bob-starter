import type { TabId } from '../types'

interface NavItem {
  id: TabId
  label: string
}

const ITEMS: NavItem[] = [
  { id: 'impact',        label: 'My Impact' },
  { id: 'contributions', label: 'Contributions' },
  { id: 'ideas',         label: 'Idea Vault' },
]

interface Props {
  active: TabId
  onChange: (tab: TabId) => void
}

export default function Nav({ active, onChange }: Props) {
  return (
    <nav className="app-nav" aria-label="Main navigation">
      <ul className="app-nav-list" role="list">
        {ITEMS.map(item => (
          <li key={item.id}>
            <button
              className={`app-nav-btn${active === item.id ? ' app-nav-btn--active' : ''}`}
              type="button"
              aria-current={active === item.id ? 'page' : undefined}
              onClick={() => onChange(item.id)}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
