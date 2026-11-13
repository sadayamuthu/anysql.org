import PackageLayout from '../components/PackageLayout'
import { CodeBlock, Section } from '../components/ui'

export default function Sdk() {
  return (
    <PackageLayout
      to="/sdk"
      lede={<>SQL analytics for LLM responses, agent traces, and RAG pipelines.</>}
    >

      <Section title="Installation">
        <CodeBlock code="pip install anysql-sdk" />
        <p className="text-ink-muted text-sm">Optional extras:</p>
        <CodeBlock code={`pip install anysql-sdk[openai]      # OpenAI adapter
pip install anysql-sdk[anthropic]   # Claude adapter
pip install anysql-sdk[langchain]   # LangChain tracer
pip install anysql-sdk[all]         # Everything`} />
      </Section>

      <Section title="Architecture">
        <p className="text-ink-muted mb-4 leading-relaxed">
          anySQL wraps your existing AI clients and normalizes their outputs into 6 canonical PyArrow tables.
          Data is stored in-memory with DuckDB for fast SQL queries and persisted to SQLite across sessions.
        </p>
        <CodeBlock code={`User Code (Python)
    │
    ├── @anysql.context(feature="x")     ← context.py
    ├── anysql.openai() / anysql.claude()  ← adapters/
    ├── AgentTracer (LangChain)          ← tracers/agent.py
    └── RAGTracer.after_retrieval()      ← tracers/rag.py
              │
              ▼
    AnySQL.insert() ──→ SQLite  (persistence)
    AnySQL.query()  ──→ DuckDB  (in-memory SQL over Arrow tables)
              │
              ▼
    6 Canonical Tables
    ├── llm.responses
    ├── eval.results
    ├── pipeline.runs
    ├── agent.tool_calls
    ├── agent.trace
    └── rag.chunks`} />
      </Section>

      <Section title="Adapters">
        <p className="text-ink-muted mb-4">Drop-in wrappers that auto-capture telemetry from your LLM clients.</p>
        <CodeBlock code={`import anysql

db = anysql.init()

# OpenAI — transparent proxy, all calls auto-logged
client = anysql.openai(db).wrap(openai.OpenAI())
response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "Hello"}]
)

# Anthropic / Claude
client = anysql.claude(db).wrap(anthropic.Anthropic())
response = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Hello"}]
)

# Generic (any dict/JSON response)
from anysql_sdk.adapters.generic import GenericAdapter
adapter = GenericAdapter(db_path="anysql.db")
adapter.record(response_dict)`} />
      </Section>

      <Section title="Tracers">
        <p className="text-ink-muted mb-4">Instrument agent and RAG pipelines for full trace capture.</p>
        <CodeBlock code={`# LangChain agent tracer
from anysql.tracers.agent import AgentTracer
tracer = AgentTracer(db_path="anysql.db")
agent.run(prompt, callbacks=[tracer])

# RAG tracer
from anysql.tracers.rag import RAGTracer
tracer = RAGTracer(db_path="anysql.db")
chunks = retriever.retrieve(query)
tracer.after_retrieval(query_id, chunks)`} />
      </Section>

      <Section title="Context Decorator">
        <p className="text-ink-muted mb-4">Tag all telemetry within a code block with feature flags or segments.</p>
        <CodeBlock code={`import anysql

with anysql.context(feature="new-prompt-v2", segment="enterprise"):
    response = client.chat.completions.create(...)
    # All calls inside are tagged with feature="new-prompt-v2"`} />
      </Section>

      <Section title="Running Queries">
        <CodeBlock code={`import anysql

db = anysql.init()

# Any SQL — table names use underscores
df = db.query("""
  SELECT model,
         AVG(cost_usd)   AS avg_cost,
         AVG(score)      AS avg_score
  FROM llm_responses r
  JOIN eval_results e ON r.response_id = e.response_id
  GROUP BY model
  ORDER BY avg_score DESC
""")`} />
        <p className="text-ink-muted text-sm">
          Table names in SQL use underscores: <code className="font-mono text-[0.9em] px-1 py-0.5 rounded-sm bg-card border border-rule">llm_responses</code>,{' '}
          <code className="font-mono text-[0.9em] px-1 py-0.5 rounded-sm bg-card border border-rule">eval_results</code>,{' '}
          <code className="font-mono text-[0.9em] px-1 py-0.5 rounded-sm bg-card border border-rule">pipeline_runs</code>,{' '}
          <code className="font-mono text-[0.9em] px-1 py-0.5 rounded-sm bg-card border border-rule">agent_tool_calls</code>,{' '}
          <code className="font-mono text-[0.9em] px-1 py-0.5 rounded-sm bg-card border border-rule">agent_trace</code>,{' '}
          <code className="font-mono text-[0.9em] px-1 py-0.5 rounded-sm bg-card border border-rule">rag_chunks</code>.
        </p>
      </Section>
    </PackageLayout>
  )
}
