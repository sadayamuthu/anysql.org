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

export default function Home() {
  return (
    <div>
      <Hero />
    </div>
  )
}
