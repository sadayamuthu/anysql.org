import PackageLayout from '../components/PackageLayout'
import { CodeBlock, Section } from '../components/ui'

export default function Server() {
  return (
    <PackageLayout
      to="/server"
      lede={<>REST API server for querying anySQL data over HTTP from any language or tool.</>}
      note="This package is not yet released. Details below reflect the planned design."
    >

      <Section title="What is anysql-server?">
        <p className="text-ink-muted leading-relaxed">
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
        <ul className="space-y-3 text-ink-muted text-sm leading-relaxed">
          <li className="flex gap-3">
            <span className="text-acc mt-0.5">→</span>
            <span>HTTP endpoints to run SQL queries against your local DuckDB data</span>
          </li>
          <li className="flex gap-3">
            <span className="text-acc mt-0.5">→</span>
            <span>Query anySQL telemetry from any language — no Python runtime required</span>
          </li>
          <li className="flex gap-3">
            <span className="text-acc mt-0.5">→</span>
            <span>Used by anysql-ui (port 4243) as its data backend</span>
          </li>
          <li className="flex gap-3">
            <span className="text-acc mt-0.5">→</span>
            <span>Independent package — own versioning, own PyPI release</span>
          </li>
        </ul>
      </Section>
    </PackageLayout>
  )
}
