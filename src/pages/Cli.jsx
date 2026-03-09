function CodeBlock({ code, cyan = false }) {
  return (
    <pre className="bg-space border border-subtle rounded-lg p-5 overflow-x-auto text-sm leading-relaxed my-4">
      <code className={cyan ? 'text-accent-cyan' : 'text-text-primary'}>{code}</code>
    </pre>
  )
}

function Section({ title, children }) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold text-text-primary mb-4 pb-2 border-b border-subtle">{title}</h2>
      {children}
    </section>
  )
}

export default function Cli() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-text-primary mb-4">CLI Reference</h1>
      <p className="text-text-muted mb-12 text-lg">
        The <code className="text-text-primary font-mono">anysql</code> CLI lets you query and inspect your telemetry database from the terminal.
      </p>

      <Section title="anysql query">
        <p className="text-text-muted mb-2">Run any SQL query against your database and print results as a table.</p>
        <CodeBlock cyan code={`anysql query "<SQL>" [--db PATH]`} />
        <p className="text-text-muted mb-2">Examples:</p>
        <CodeBlock code={`# Average cost by model
anysql query "SELECT model, AVG(cost_usd) FROM llm_responses GROUP BY model"

# Use a specific database file
anysql query "SELECT COUNT(*) FROM llm_responses" --db ./my_project.db

# Cross-layer join
anysql query "SELECT r.query_id, MAX(r.similarity_score), e.score FROM rag_chunks r JOIN eval_results e ON r.query_id = e.query_id GROUP BY r.query_id, e.score"`} />
        <div className="bg-surface border border-subtle rounded-lg p-4 mt-4">
          <p className="text-sm font-semibold text-text-primary mb-2">Options</p>
          <table className="w-full text-sm">
            <tbody>
              <tr>
                <td className="py-2 pr-6 font-mono text-accent-cyan">--db PATH</td>
                <td className="py-2 text-text-muted">Path to SQLite database (default: <code className="text-text-primary">anysql.db</code>)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="anysql stats">
        <p className="text-text-muted mb-2">Print row counts for all 6 tables.</p>
        <CodeBlock cyan code="anysql stats [--db PATH]" />
        <p className="text-text-muted mb-2">Example output:</p>
        <CodeBlock code={`Table                Rows
──────────────────── ────
llm_responses        1242
eval_results          891
pipeline_runs         203
agent_tool_calls     4401
agent_trace          4401
rag_chunks           9823`} />
      </Section>
    </div>
  )
}
