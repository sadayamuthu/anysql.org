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
          pip install anysql
          <CopyButton text="pip install anysql" />
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

export default function Home() {
  return (
    <div>
      <Hero />
      <JoinSection />
    </div>
  )
}
