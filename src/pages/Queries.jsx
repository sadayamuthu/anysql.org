const QUERY_GROUPS = [
  {
    id: 'UC1',
    title: 'UC1 · LLM Cost Analysis',
    queries: [
      {
        title: 'Average cost by model',
        sql: `SELECT model,
       COUNT(*)          AS calls,
       AVG(cost_usd)     AS avg_cost,
       SUM(cost_usd)     AS total_cost
FROM llm_responses
GROUP BY model
ORDER BY total_cost DESC`,
      },
      {
        title: 'Cost by task type and model',
        sql: `SELECT task_type, model, AVG(cost_usd) AS avg_cost
FROM llm_responses
WHERE task_type IS NOT NULL
GROUP BY task_type, model
ORDER BY task_type, avg_cost DESC`,
      },
      {
        title: 'Daily spend trend',
        sql: `SELECT DATE(created_at) AS day,
       SUM(cost_usd)    AS daily_spend
FROM llm_responses
GROUP BY day
ORDER BY day`,
      },
    ],
  },
  {
    id: 'UC2',
    title: 'UC2 · Prompt Regression Detection',
    queries: [
      {
        title: 'Score by prompt version',
        sql: `SELECT prompt_version,
       COUNT(*)      AS evals,
       AVG(score)    AS avg_score,
       MIN(score)    AS min_score
FROM eval_results
WHERE prompt_version IS NOT NULL
GROUP BY prompt_version
ORDER BY prompt_version`,
      },
      {
        title: 'Pass rate by prompt version',
        sql: `SELECT prompt_version,
       SUM(CASE WHEN passed THEN 1 ELSE 0 END) * 100.0 / COUNT(*) AS pass_rate
FROM eval_results
GROUP BY prompt_version`,
      },
    ],
  },
  {
    id: 'UC3',
    title: 'UC3 · A/B Feature Testing',
    queries: [
      {
        title: 'Pipeline cost by feature flag',
        sql: `SELECT feature_flag,
       COUNT(*)              AS runs,
       AVG(total_cost_usd)   AS avg_cost,
       AVG(total_latency_ms) AS avg_latency_ms
FROM pipeline_runs
GROUP BY feature_flag`,
      },
    ],
  },
  {
    id: 'UC4',
    title: 'UC4 · Agent Tracing',
    queries: [
      {
        title: 'Tool usage frequency and latency',
        sql: `SELECT tool_name,
       COUNT(*)        AS calls,
       AVG(latency_ms) AS avg_latency_ms,
       SUM(CASE WHEN status = 'error' THEN 1 ELSE 0 END) AS errors
FROM agent_tool_calls
GROUP BY tool_name
ORDER BY calls DESC`,
      },
      {
        title: 'Sessions with human overrides',
        sql: `SELECT session_id, COUNT(*) AS override_count
FROM agent_tool_calls
WHERE human_override = true
GROUP BY session_id
ORDER BY override_count DESC`,
      },
    ],
  },
  {
    id: 'UC5',
    title: 'UC5 · RAG Quality',
    queries: [
      {
        title: 'Retrieval quality vs answer quality',
        sql: `SELECT r.query_id,
       MAX(r.similarity_score) AS retrieval_quality,
       e.score                 AS answer_quality
FROM rag_chunks r
JOIN eval_results e ON r.query_id = e.query_id
GROUP BY r.query_id, e.score
ORDER BY retrieval_quality DESC`,
      },
      {
        title: 'Top sources by similarity score',
        sql: `SELECT source_doc,
       COUNT(*)              AS retrievals,
       AVG(similarity_score) AS avg_similarity
FROM rag_chunks
GROUP BY source_doc
ORDER BY avg_similarity DESC`,
      },
    ],
  },
]

export default function Queries() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-text-primary mb-4">Query Library</h1>
      <p className="text-text-muted mb-12 text-lg">
        Canonical SQL queries for all 5 use cases. Copy and adapt for your setup.
      </p>
      <div className="space-y-14">
        {QUERY_GROUPS.map((group) => (
          <section key={group.id}>
            <h2 className="text-xl font-semibold text-text-primary mb-6 pb-2 border-b border-subtle">
              {group.title}
            </h2>
            <div className="space-y-6">
              {group.queries.map((q) => (
                <div key={q.title} className="bg-surface border border-subtle rounded-xl p-6">
                  <p className="text-sm font-medium text-text-primary mb-3">{q.title}</p>
                  <pre className="bg-space rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
                    <code className="text-accent-cyan">{q.sql}</code>
                  </pre>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
