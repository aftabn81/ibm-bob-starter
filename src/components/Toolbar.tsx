interface Props {
  hasData: boolean
  onLoadSample: () => void
  onClear: () => void
}

export default function Toolbar({ hasData, onLoadSample, onClear }: Props) {
  return (
    <div className="toolbar">
      <button
        className="btn-toolbar btn-sample"
        type="button"
        onClick={onLoadSample}
      >
        Load Sample Contributions
      </button>
      {hasData && (
        <button
          className="btn-toolbar btn-clear"
          type="button"
          onClick={onClear}
        >
          Clear All Data
        </button>
      )}
    </div>
  )
}
