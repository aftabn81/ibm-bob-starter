import { useState, useEffect, useRef } from 'react'

interface Props {
  onClearAll: () => void
}

function ClearConfirmDialog({ onConfirm, onCancel }: { onConfirm: () => void; onCancel: () => void }) {
  const cancelRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    cancelRef.current?.focus()
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onCancel()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onCancel])

  return (
    <div className="dialog-backdrop" role="alertdialog" aria-modal="true"
      aria-labelledby="clear-dialog-title" aria-describedby="clear-dialog-desc">
      <div className="dialog-box">
        <p className="dialog-title" id="clear-dialog-title">Permanently delete all data?</p>
        <p className="dialog-body" id="clear-dialog-desc">
          This will permanently remove all your locally stored tracker data. This cannot be undone.
        </p>
        <div className="dialog-actions">
          <button ref={cancelRef} className="btn-dialog-cancel" type="button" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn-dialog-confirm" type="button" onClick={onConfirm}>
            Confirm Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Settings({ onClearAll }: Props) {
  const [confirmText, setConfirmText] = useState('')
  const [showDialog, setShowDialog] = useState(false)

  const isReady = confirmText === 'DELETE'

  function handleClearRequest() {
    if (!isReady) return
    setShowDialog(true)
  }

  function handleConfirm() {
    setShowDialog(false)
    setConfirmText('')
    onClearAll()
  }

  function handleCancel() {
    setShowDialog(false)
  }

  return (
    <section className="settings-section" aria-label="Settings">
      <div className="settings-section-title">Settings</div>

      <div className="danger-zone">
        <p className="danger-zone-title">Danger Zone</p>
        <p className="danger-zone-desc" id="danger-zone-desc">
          Permanently removes all locally stored tracker data. This action cannot be undone.
        </p>

        <div className="danger-confirm-row">
          <label htmlFor="danger-confirm-input">
            Type <strong>DELETE</strong> to enable
            <input
              id="danger-confirm-input"
              type="text"
              value={confirmText}
              onChange={e => setConfirmText(e.target.value)}
              aria-describedby="danger-zone-desc"
              autoComplete="off"
              spellCheck={false}
            />
          </label>
          <button
            className="btn-danger"
            type="button"
            disabled={!isReady}
            onClick={handleClearRequest}
            aria-describedby="danger-zone-desc"
          >
            Clear All Data
          </button>
        </div>
      </div>

      {showDialog && (
        <ClearConfirmDialog onConfirm={handleConfirm} onCancel={handleCancel} />
      )}
    </section>
  )
}
