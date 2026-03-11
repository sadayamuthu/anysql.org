function Section({ title, children }) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold text-text-primary mb-4 pb-2 border-b border-subtle">{title}</h2>
      {children}
    </section>
  )
}

function CodeBlock({ code }) {
  return (
    <pre className="bg-space border border-subtle rounded-lg p-5 overflow-x-auto text-sm leading-relaxed my-4">
      <code className="text-text-primary">{code}</code>
    </pre>
  )
}

export default function Ui() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="inline-block mb-4 px-3 py-1 rounded-full border border-subtle text-xs text-text-muted font-mono">
        coming soon
      </div>
      <div className="bg-surface border border-subtle rounded-lg px-5 py-4 mb-10 text-sm text-text-muted">
        This package is not yet released. Details below reflect the planned design.
      </div>
      <h1 className="text-4xl font-bold text-text-primary mb-4">anysql-ui</h1>
      <p className="text-text-muted mb-12 text-lg">
        Monaco SQL editor and pre-built dashboards at <code className="text-text-primary font-mono">localhost:4243</code>.
      </p>

      <Section title="What is anysql-ui?">
        <p className="text-text-muted leading-relaxed">
          anysql-ui is a browser-based interface for querying and visualising your anySQL data.
          It runs locally at port 4243, backed by anysql-server, and requires no cloud account or configuration.
          It is Phase 4 of the anySQL platform roadmap.
        </p>
        <CodeBlock code={`# Planned install
pip install anysql-ui

# Planned usage
anysql-ui start   # opens http://localhost:4243`} />
      </Section>

      <Section title="Planned capabilities">
        <ul className="space-y-3 text-text-muted text-sm leading-relaxed">
          <li className="flex gap-3">
            <span className="text-accent-cyan mt-0.5">→</span>
            <span>Monaco SQL editor with autocomplete over your anySQL tables</span>
          </li>
          <li className="flex gap-3">
            <span className="text-accent-cyan mt-0.5">→</span>
            <span>Pre-built dashboards for LLM cost, latency, and usage by model and feature</span>
          </li>
          <li className="flex gap-3">
            <span className="text-accent-cyan mt-0.5">→</span>
            <span>Runs entirely locally — no cloud, no data leaves your machine</span>
          </li>
          <li className="flex gap-3">
            <span className="text-accent-cyan mt-0.5">→</span>
            <span>Backed by anysql-server on port 4243</span>
          </li>
        </ul>
      </Section>
    </div>
  )
}
