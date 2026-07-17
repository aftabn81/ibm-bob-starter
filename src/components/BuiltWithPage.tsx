interface Props {
  onBack: () => void
}

export default function BuiltWithPage({ onBack }: Props) {
  return (
    <section className="info-page">
      <div className="info-page-inner">
        <button
          className="btn-info-secondary"
          type="button"
          onClick={onBack}
          style={{ marginBottom: 24 }}
        >
          ← Back to Champion Copilot
        </button>

        <span className="info-eyebrow">Open source</span>
        <h2 className="info-heading">Built with IBM Bob</h2>
        <p className="info-subheading">From idea to working application</p>

        <ol className="build-steps" aria-label="Development stages">
          {(['Plan', 'Build', 'Test', 'Publish'] as const).map((step, i) => (
            <li key={step} className="build-step">
              <span className="build-step-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <span className="build-step-label">{step}</span>
            </li>
          ))}
        </ol>

        <p className="info-body">
          IBM Bob assisted every stage of this project — designing the application
          architecture, writing accessible React components, validating TypeScript
          types, and guiding end-to-end testing. The result is a fully client-side,
          privacy-first tracker with no backend or telemetry.
        </p>

        <div className="info-actions">
          <a
            className="btn-info-primary"
            href="https://github.com/aftabn81/ibm-bob-starter"
            target="_blank"
            rel="noopener noreferrer"
          >
            View GitHub
          </a>
          <a
            className="btn-info-secondary"
            href="https://www.linkedin.com/company/ibmbob/"
            target="_blank"
            rel="noopener noreferrer"
          >
            IBM Bob on LinkedIn
          </a>
        </div>

        <p className="info-footnote">
          Created by Noor Aftab, IBM Champion.
        </p>
        <p className="info-disclaimer">
          Independent community-built project; not an official IBM product.
        </p>
      </div>
    </section>
  )
}
