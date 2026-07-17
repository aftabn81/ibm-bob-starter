import type { Contribution } from '../types'
import ProfileCard from './ProfileCard'
import ContributionForm from './ContributionForm'
import ContributionList from './ContributionList'

interface Props {
  contributions: Contribution[]
  isDemoMode: boolean
  editTarget: Contribution | null
  onAdd: (c: Contribution) => void
  onUpdate: (c: Contribution) => void
  onCancelEdit: () => void
  onEdit: (c: Contribution) => void
  onDelete: (id: string) => void
  onReturnToTracker: () => void
}

export default function ContributionsPage({
  contributions,
  isDemoMode,
  editTarget,
  onAdd,
  onUpdate,
  onCancelEdit,
  onEdit,
  onDelete,
  onReturnToTracker,
}: Props) {
  return (
    <>
      <ProfileCard isDemoMode={isDemoMode} />

      <div className="columns">
        {!isDemoMode ? (
          <ContributionForm
            onAdd={onAdd}
            editTarget={editTarget}
            onUpdate={onUpdate}
            onCancelEdit={onCancelEdit}
          />
        ) : (
          <div className="panel demo-form-disabled" aria-hidden="true">
            <div className="panel-title">Add Contribution</div>
            <p className="demo-form-notice">
              Disabled in Demo Mode. Return to your tracker to add or edit contributions.
            </p>
          </div>
        )}

        <ContributionList
          contributions={contributions}
          onEdit={isDemoMode ? undefined : onEdit}
          onDelete={isDemoMode ? undefined : onDelete}
          isDemoMode={isDemoMode}
          onReturnToTracker={onReturnToTracker}
          showFilters
        />
      </div>
    </>
  )
}
