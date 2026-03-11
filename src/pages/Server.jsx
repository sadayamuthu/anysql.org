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

export default function Server() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="inline-block mb-4 px-3 py-1 rounded-full border border-subtle text-xs text-text-muted font-mono">
        coming soon
      </div>
      <div className="bg-surface border border-subtle rounded-lg px-5 py-4 mb-10 text-sm text-text-muted">
        This package is not yet released. Details below reflect the planned design.
      </div>
      <h1 className="text-4xl font-bold text-text-primary mb-4">anysql-server</h1>
      <p className="text-text-muted mb-12 text-lg">
        REST API server for querying anySQL data over HTTP from any language or tool.
      </p>

      <Section title="What is anysql-server?">
        <p className="text-text-muted leading-relaxed">
          anysql-server exposes your local anySQL DuckDB data over HTTP, so you can query LLM telemetry
          from dashboards, scripts, or any language without a Python runtime.
          It will be available as a standalone package on PyPI.
        </p>
        <CodeBlock code={`# Planned install
pip install anysql-server

# Planned import
import anysql_server`} />
      </Section>

      <Section title="Planned capabilities">
        <ul className="space-y-3 text-text-muted text-sm leading-relaxed">
          <li className="flex gap-3">
            <span className="text-accent-cyan mt-0.5">→</span>
            <span>HTTP endpoints to run SQL queries against your local DuckDB data</span>
          </li>
          <li className="flex gap-3">
            <span className="text-accent-cyan mt-0.5">→</span>
            <span>Query anySQL telemetry from any language — no Python runtime required</span>
          </li>
          <li className="flex gap-3">
            <span className="text-accent-cyan mt-0.5">→</span>
            <span>Used by anysql-ui (port 4243) as its data backend</span>
          </li>
          <li className="flex gap-3">
            <span className="text-accent-cyan mt-0.5">→</span>
            <span>Independent package — own versioning, own PyPI release</span>
          </li>
        </ul>
      </Section>
    </div>
  )
}
