interface Props {
  onViewDemo: () => void
  isDemoMode: boolean
}

export default function Toolbar({ onViewDemo, isDemoMode }: Props) {
  return (
    <div className="toolbar">
      <button
        className="btn-toolbar btn-sample"
        type="button"
        onClick={onViewDemo}
        disabled={isDemoMode}
        aria-disabled={isDemoMode}
        title={isDemoMode ? 'Return to your tracker to exit Demo Mode first' : undefined}
      >
        View Demo Dashboard
      </button>
    </div>
  )
}
