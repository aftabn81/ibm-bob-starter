interface Props {
  onBack: () => void
}

export default function AboutSkiliumPage({ onBack }: Props) {
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

        <span className="info-eyebrow">About</span>
        <h2 className="info-heading">Skilium AI</h2>
        <p className="info-subheading">The AI Skills Company</p>

        <p className="info-body">
          Skilium AI helps busy professionals and teams master practical AI, apply it to
          real work, and transform everyday workflows — without needing to become
          engineers first.
        </p>
        <p className="info-body">
          Founded by Noor Aftab — AI researcher, data scientist, two-time founder, IBM
          Champion, and Chair of NumFOCUS — Skilium combines technical depth, business
          leadership, and practical adoption experience. Noor has trained 1,000+
          professionals and contributed to 100+ global technology events.
        </p>

        <blockquote className="info-quote">
          Cut through the noise. Build the skills. Put AI to work.
        </blockquote>

        <div className="info-actions">
          <a
            className="btn-info-primary"
            href="https://skilium.ai"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit Skilium
          </a>
          <a
            className="btn-info-secondary"
            href="https://www.linkedin.com/company/skiliumai/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Follow Skilium
          </a>
        </div>
      </div>
    </section>
  )
}
