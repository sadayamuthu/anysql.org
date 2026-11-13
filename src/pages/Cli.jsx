import DocsLayout from '../components/DocsLayout'
import { CodeBlock, Section } from '../components/ui'

export default function Cli() {
  return (
    <DocsLayout
      title="CLI Reference"
      lede={<>The <code className="font-mono text-[0.9em] px-1 py-0.5 rounded-sm bg-card border border-rule">anysql</code> CLI lets you query and inspect your telemetry database from the terminal.</>}
      toc={[{ id: 'anysql-query', label: 'anysql query' }, { id: 'anysql-stats', label: 'anysql stats' }]}
    >

      <Section id="anysql-query" title="anysql query">
        <p className="text-ink-muted mb-2">Run any SQL query against your database and print results as a table.</p>
        <CodeBlock code={`anysql query "<SQL>" [--db PATH]`} />
        <p className="text-ink-muted mb-2">Examples:</p>
        <CodeBlock code={`# Average cost by model
anysql query "SELECT model, AVG(cost_usd) FROM llm_responses GROUP BY model"

# Use a specific database file
anysql query "SELECT COUNT(*) FROM llm_responses" --db ./my_project.db

# Cross-layer join
anysql query "SELECT r.query_id, MAX(r.similarity_score), e.score FROM rag_chunks r JOIN eval_results e ON r.query_id = e.query_id GROUP BY r.query_id, e.score"`} />
        <div className="bg-card border border-rule rounded-sm p-4 mt-4">
          <p className="text-sm font-semibold text-ink mb-2">Options</p>
          <table className="w-full text-sm">
            <tbody>
              <tr>
                <td className="py-2 pr-6 font-mono text-acc">--db PATH</td>
                <td className="py-2 text-ink-muted">Path to SQLite database (default: <code className="font-mono">anysql.db</code>)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="anysql-stats" title="anysql stats">
        <p className="text-ink-muted mb-2">Print row counts for all 6 tables.</p>
        <CodeBlock code="anysql stats [--db PATH]" />
        <p className="text-ink-muted mb-2">Example output:</p>
        <CodeBlock code={`Table                Rows
──────────────────── ────
llm_responses        1242
eval_results          891
pipeline_runs         203
agent_tool_calls     4401
agent_trace          4401
rag_chunks           9823`} />
      </Section>
    </DocsLayout>
  )
}
