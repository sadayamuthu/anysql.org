import { Link } from 'react-router-dom'
import Citation from '../components/Citation'
import { Button, CodeBlock, CopyButton, Eyebrow, Status } from '../components/ui'
import { GITHUB, PACKAGES } from '../data/packages'

const HERO_CODE = `# wrap once, query forever
import anysql

db = anysql.init()
client = anysql.claude(db).wrap(anthropic_client)

df = db.query("""
  SELECT model, AVG(cost_usd)
  FROM llm_responses GROUP BY model
""")`

const JOIN_SQL = `SELECT r.query_id,
       MAX(r.similarity_score) AS retrieval_quality,
       e.score                 AS answer_quality
FROM rag.chunks r
JOIN eval.results e ON r.query_id = e.query_id
GROUP BY r.query_id, e.score`

const WHY = [
  { title: 'SQL over AI telemetry', body: 'Query LLM responses, evals, agent traces, and RAG chunks with standard SQL. No new query language to learn.' },
  { title: 'Zero configuration', body: "DuckDB in-memory plus SQLite persistence. pip install anysql-sdk and you're querying in 30 seconds." },
  { title: 'Cross-layer JOINs', body: 'The only tool that puts LLM cost, eval scores, agent traces, and RAG quality in the same queryable store.' },
]

const USE_CASES = [
  { id: 'UC1', title: 'LLM Cost Analysis', body: "AVG(cost_usd) by model, date, and task type. Know exactly what you're spending.", query: 'SELECT model, AVG(cost_usd) as avg_cost\nFROM llm_responses\nGROUP BY model\nORDER BY avg_cost DESC' },
  { id: 'UC2', title: 'Prompt Regression', body: 'Catch score drops across prompt versions before they hit production.', query: 'SELECT prompt_version, AVG(score) as avg_score\nFROM eval_results\nGROUP BY prompt_version\nORDER BY prompt_version' },
  { id: 'UC3', title: 'A/B Feature Testing', body: 'Compare pipeline performance across feature flags with SQL GROUP BY.', query: 'SELECT feature_flag, AVG(total_cost_usd)\nFROM pipeline_runs\nGROUP BY feature_flag' },
  { id: 'UC4', title: 'Agent Tracing', body: 'Query every tool call, step order, error, and human override across sessions.', query: 'SELECT tool_name, COUNT(*), AVG(latency_ms)\nFROM agent_tool_calls\nGROUP BY tool_name' },
  { id: 'UC5', title: 'RAG Quality', body: 'Join retrieval similarity scores with eval scores to pinpoint pipeline failures.', query: 'SELECT chunk_id, similarity_score, e.score\nFROM rag_chunks r\nJOIN eval_results e ON r.query_id = e.query_id' },
]

const STEPS = [
  { label: 'Install', code: 'pip install anysql-sdk' },
  { label: 'Wrap your client', code: 'import anysql\ndb = anysql.init()\n\n# OpenAI\nclient = anysql.openai(db).wrap(openai_client)\n# Anthropic\nclient = anysql.claude(db).wrap(anthropic_client)' },
  { label: 'Query', code: 'db.query("""\n  SELECT model, AVG(cost_usd) AS avg_cost,\n         AVG(score)    AS avg_score\n  FROM llm_responses r\n  JOIN eval_results e\n    ON r.response_id = e.response_id\n  GROUP BY model ORDER BY avg_score DESC\n""")' },
]

function Section({ id, label, title, lede, children }) {
  return (
    <section id={id} aria-labelledby={`${id}-label`} className="py-12 border-t border-rule scroll-mt-24">
      <Eyebrow id={`${id}-label`}>{label}</Eyebrow>
      {title && <h2 className="font-serif text-3xl sm:text-4xl leading-tight mt-3 max-w-3xl">{title}</h2>}
      {lede && <p className="text-ink-muted mt-2 max-w-2xl">{lede}</p>}
      <div className="mt-8">{children}</div>
    </section>
  )
}

export default function Home() {
  return (
    <div className="max-w-page mx-auto px-4 sm:px-6">
      {/* Hero */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 py-14 sm:py-20 items-start">
        <div>
          <Eyebrow>IV · Observability · v0.1 · Apache 2.0</Eyebrow>
          <h1 className="font-serif text-4xl sm:text-6xl leading-[1.05] tracking-tight mt-4">
            SQL analytics for <em className="text-acc">AI systems.</em>
          </h1>
          <p className="text-lg text-ink-muted mt-6 leading-relaxed max-w-xl">
            Query LLM responses, agent traces, and RAG pipelines with standard SQL. In-memory on
            DuckDB, persisted to SQLite, with zero configuration. From vibes to queries.
          </p>
          <div className="flex flex-wrap items-center gap-3 mt-8">
            <span className="inline-flex items-center gap-3 pl-4 pr-1.5 py-1.5 rounded-sm bg-ink text-paper font-mono text-sm">
              pip install anysql-sdk
              <CopyButton text="pip install anysql-sdk" label="Copy install command" className="border-paper/30 text-paper hover:border-paper" />
            </span>
            <Button to="/queries">Browse queries</Button>
          </div>
        </div>
        <div className="min-w-0">
          <CodeBlock code={HERO_CODE} className="!my-0" />
        </div>
      </section>

      <Section id="packages" label="The anySQL platform" title="Four packages. One local analytics layer for your AI stack.">
        <ul>
          {PACKAGES.map((p) => (
            <li key={p.to}>
              <Link to={p.to} className="group grid grid-cols-[2rem_1fr] sm:grid-cols-[2rem_11rem_1fr_auto] items-baseline gap-x-4 gap-y-1 py-4 border-b border-rule hover:border-acc transition-colors">
                <span className="font-mono text-xs text-ink-muted">{String(p.number).padStart(2, '0')}</span>
                <span className="font-mono font-medium group-hover:text-acc transition-colors">{p.name}</span>
                <span className="col-start-2 sm:col-start-auto text-sm text-ink-muted">{p.summary}</span>
                <span className="col-start-2 sm:col-start-auto"><Status status={p.status} /></span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="join" label="Cross-layer" title="The cross-layer JOIN nobody has built.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="min-w-0"><CodeBlock code={JOIN_SQL} className="!my-0" /></div>
          <div className="flex flex-col gap-4 text-ink-muted leading-relaxed">
            <p className="font-serif text-2xl text-ink leading-snug">Find out if your RAG pipeline is failing at retrieval or generation, with one query.</p>
            <p>
              This query joins <span className="font-mono text-ink">rag.chunks</span> and{' '}
              <span className="font-mono text-ink">eval.results</span>, two tables no existing tool puts in the same queryable store.
            </p>
          </div>
        </div>
      </Section>

      <Section id="why" label="Why anySQL?">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {WHY.map((w, i) => (
            <div key={w.title}>
              <p className="font-mono text-xs text-acc">{String(i + 1).padStart(2, '0')}</p>
              <h3 className="font-serif text-2xl mt-2">{w.title}</h3>
              <p className="text-ink-muted mt-2 leading-relaxed">{w.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="quick-start" label="Get started" title="Up and running in 3 steps.">
        <ol className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {STEPS.map((s, i) => (
            <li key={s.label} className="border border-dashed border-ink/30 rounded-sm p-4 min-w-0">
              <p className="font-mono text-xs text-acc">{i + 1}</p>
              <p className="font-medium mt-1">{s.label}</p>
              <CodeBlock code={s.code} className="!my-3 !p-4 !text-xs" />
            </li>
          ))}
        </ol>
      </Section>

      <Section id="use-cases" label="Use cases" title="5 use cases, one install." lede="Everything an AI engineer needs to debug and optimize their stack.">
        <ul>
          {USE_CASES.map((u) => (
            <li key={u.id} className="grid grid-cols-1 md:grid-cols-[3rem_1fr_1fr] gap-x-6 gap-y-2 py-5 border-b border-rule">
              <span className="font-mono text-xs text-acc pt-1">{u.id}</span>
              <div>
                <h3 className="font-serif text-xl">{u.title}</h3>
                <p className="text-sm text-ink-muted mt-1 leading-relaxed">{u.body}</p>
              </div>
              <div className="min-w-0"><CodeBlock code={u.query} className="!my-0 !p-3 !text-xs" /></div>
            </li>
          ))}
        </ul>
        <Link to="/queries" className="inline-block mt-4 text-sm hover:text-acc">The full query library →</Link>
      </Section>

      <Section id="cite" label="Cite anySQL">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card border border-rule rounded-sm p-5"><Citation /></div>
          <div className="border border-dashed border-ink/30 rounded-sm p-6 text-center flex flex-col items-center justify-center gap-2">
            <Eyebrow>Open source</Eyebrow>
            <p className="font-serif text-2xl">Apache 2.0. No lock-in.</p>
            <p className="text-sm text-ink-muted">Contributions welcome.</p>
            <Button href={GITHUB} variant="solid">Star on GitHub</Button>
          </div>
        </div>
      </Section>
    </div>
  )
}
