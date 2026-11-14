import PackageLayout from '../components/PackageLayout'
import { CodeBlock, Section, InlineCode } from '../components/ui'

export default function Ui() {
  return (
    <PackageLayout
      to="/ui"
      lede={<>Monaco SQL editor and pre-built dashboards at <InlineCode>localhost:4243</InlineCode>.</>}
      note="This package is not yet released. Details below reflect the planned design."
    >

      <Section title="What is anysql-ui?">
        <p className="text-ink-muted leading-relaxed">
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
        <ul className="space-y-3 text-ink-muted text-sm leading-relaxed">
          <li className="flex gap-3">
            <span className="text-acc mt-0.5">→</span>
            <span>Monaco SQL editor with autocomplete over your anySQL tables</span>
          </li>
          <li className="flex gap-3">
            <span className="text-acc mt-0.5">→</span>
            <span>Pre-built dashboards for LLM cost, latency, and usage by model and feature</span>
          </li>
          <li className="flex gap-3">
            <span className="text-acc mt-0.5">→</span>
            <span>Runs entirely locally — no cloud, no data leaves your machine</span>
          </li>
          <li className="flex gap-3">
            <span className="text-acc mt-0.5">→</span>
            <span>Backed by anysql-server on port 4243</span>
          </li>
        </ul>
      </Section>
    </PackageLayout>
  )
}
