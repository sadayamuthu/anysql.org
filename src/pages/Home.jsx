import { Link } from 'react-router-dom'
import { useState } from 'react'

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button
      onClick={copy}
      className="text-xs text-text-muted hover:text-accent-cyan transition-colors duration-200 ml-2"
    >
      {copied ? 'Copied!' : 'Copy'}
    </button>
  )
}

function Hero() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-24 text-center">
      <div className="inline-block mb-6 px-3 py-1 rounded-full border border-subtle text-xs text-text-muted">
        v0.1 · Alpha
      </div>
      <h1 className="text-5xl sm:text-6xl font-bold text-text-primary mb-6 leading-tight">
        From vibes to queries.
      </h1>
      <p className="text-xl text-text-muted max-w-2xl mx-auto mb-10">
        SQL analytics for LLM responses, agent traces, and RAG pipelines.
        Powered by DuckDB. Zero configuration.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <div className="flex items-center gap-2 px-5 py-3 rounded-lg border border-accent-cyan glow-cyan bg-surface font-mono text-sm text-text-primary">
          pip install anysql-sdk
          <CopyButton text="pip install anysql-sdk" />
        </div>
        <Link
          to="/docs"
          className="px-5 py-3 rounded-lg border border-subtle text-sm text-text-muted hover:text-text-primary hover:border-accent-blue transition-colors duration-200"
        >
          Read the Docs →
        </Link>
      </div>
    </section>
  )
}

function JoinSection() {
  const sql = `SELECT r.query_id,
       MAX(r.similarity_score) AS retrieval_quality,
       e.score                 AS answer_quality
FROM rag.chunks r
JOIN eval.results e ON r.query_id = e.query_id
GROUP BY r.query_id, e.score`

  return (
    <section className="max-w-5xl mx-auto px-6 py-16">
      <div className="bg-surface border border-subtle rounded-xl p-8">
        <h2 className="text-2xl font-semibold text-text-primary mb-3">
          The cross-layer JOIN nobody has built.
        </h2>
        <p className="text-text-muted mb-6">
          Find out if your RAG pipeline is failing at retrieval or generation — with one query.
        </p>
        <pre className="bg-space rounded-lg p-6 overflow-x-auto text-sm leading-relaxed">
          <code className="text-accent-cyan">{sql}</code>
        </pre>
        <p className="text-xs text-text-muted mt-4">
          This query joins <span className="text-text-primary font-mono">rag.chunks</span> and{' '}
          <span className="text-text-primary font-mono">eval.results</span> — two tables no existing tool puts in the same queryable store.
        </p>
      </div>
    </section>
  )
}

const WHY_CARDS = [
  {
    icon: '🔍',
    title: 'SQL over AI telemetry',
    body: 'Query LLM responses, evals, agent traces, and RAG chunks with standard SQL — no new query language to learn.',
  },
  {
    icon: '⚡',
    title: 'Zero configuration',
    body: "DuckDB in-memory + SQLite persistence. pip install anysql-sdk and you're querying in 30 seconds.",
  },
  {
    icon: '🔗',
    title: 'Cross-layer JOINs',
    body: 'The only tool that puts LLM cost, eval scores, agent traces, and RAG quality in the same queryable store.',
  },
]

function WhySection() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-semibold text-text-primary mb-10 text-center">
        Why anySQL?
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {WHY_CARDS.map(({ icon, title, body }) => (
          <div key={title} className="bg-surface border border-subtle rounded-xl p-6 hover:border-accent-blue transition-colors duration-200">
            <div className="text-3xl mb-4" aria-hidden="true">{icon}</div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">{title}</h3>
            <p className="text-text-muted text-sm leading-relaxed">{body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

const USE_CASES = [
  {
    id: 'UC1',
    title: 'LLM Cost Analysis',
    body: "AVG(cost_usd) by model, date, and task type. Know exactly what you're spending.",
    query: "SELECT model, AVG(cost_usd) as avg_cost\nFROM llm_responses\nGROUP BY model\nORDER BY avg_cost DESC",
  },
  {
    id: 'UC2',
    title: 'Prompt Regression',
    body: "Catch score drops across prompt versions before they hit production.",
    query: "SELECT prompt_version, AVG(score) as avg_score\nFROM eval_results\nGROUP BY prompt_version\nORDER BY prompt_version",
  },
  {
    id: 'UC3',
    title: 'A/B Feature Testing',
    body: 'Compare pipeline performance across feature flags with SQL GROUP BY.',
    query: "SELECT feature_flag, AVG(total_cost_usd)\nFROM pipeline_runs\nGROUP BY feature_flag",
  },
  {
    id: 'UC4',
    title: 'Agent Tracing',
    body: 'Query every tool call, step order, error, and human override across sessions.',
    query: "SELECT tool_name, COUNT(*), AVG(latency_ms)\nFROM agent_tool_calls\nGROUP BY tool_name",
  },
  {
    id: 'UC5',
    title: 'RAG Quality',
    body: 'Join retrieval similarity scores with eval scores to pinpoint pipeline failures.',
    query: "SELECT chunk_id, similarity_score, e.score\nFROM rag_chunks r\nJOIN eval_results e ON r.query_id = e.query_id",
  },
]

function UseCasesSection() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-semibold text-text-primary mb-3 text-center">
        5 use cases, one install.
      </h2>
      <p className="text-text-muted text-center mb-10">Everything an AI engineer needs to debug and optimize their stack.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {USE_CASES.map(({ id, title, body, query }) => (
          <div key={id} className="bg-surface border border-subtle rounded-xl p-6">
            <span className="text-xs font-mono text-accent-cyan mb-2 block">{id}</span>
            <h3 className="text-base font-semibold text-text-primary mb-2">{title}</h3>
            <p className="text-text-muted text-sm mb-4 leading-relaxed">{body}</p>
            <pre className="bg-space rounded p-3 text-xs text-text-muted overflow-x-auto">
              <code>{query}</code>
            </pre>
          </div>
        ))}
      </div>
    </section>
  )
}

function QuickStartSection() {
  const steps = [
    {
      label: '1. Install',
      code: 'pip install anysql-sdk',
    },
    {
      label: '2. Wrap your client',
      code: `from anysql.adapters.openai import WrappedOpenAI

client = WrappedOpenAI(db_path="anysql.db")
response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "Hello"}]
)`,
    },
    {
      label: '3. Query',
      code: `db.query("""
  SELECT model, AVG(cost_usd) as avg_cost, AVG(score) as avg_score
  FROM llm_responses r
  JOIN eval_results e ON r.response_id = e.response_id
  GROUP BY model ORDER BY avg_score DESC
""")`,
    },
  ]

  return (
    <section className="max-w-5xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-semibold text-text-primary mb-10 text-center">
        Up and running in 3 steps.
      </h2>
      <div className="space-y-4">
        {steps.map(({ label, code }) => (
          <div key={label} className="bg-surface border border-subtle rounded-xl p-6">
            <p className="text-sm font-semibold text-accent-cyan mb-3">{label}</p>
            <pre className="bg-space rounded-lg p-4 overflow-x-auto text-sm">
              <code className="text-text-primary">{code}</code>
            </pre>
          </div>
        ))}
      </div>
    </section>
  )
}

function GitHubCTA() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16">
      <div className="bg-surface border border-subtle rounded-xl p-10 text-center glow-blue">
        <h2 className="text-2xl font-semibold text-text-primary mb-4">
          anySQL is open source.
        </h2>
        <p className="text-text-muted mb-6">Apache 2.0. No lock-in. Contributions welcome.</p>
        <a
          href="https://github.com/sadayamuthu/anysql"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent-blue text-space font-semibold text-sm hover:opacity-90 transition-opacity duration-200"
        >
          Star us on GitHub ↗
        </a>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <div>
      <Hero />
      <JoinSection />
      <WhySection />
      <UseCasesSection />
      <QuickStartSection />
      <GitHubCTA />
    </div>
  )
}
