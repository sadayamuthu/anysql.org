const TABLES = [
  {
    name: 'llm.responses',
    sqlName: 'llm_responses',
    useCases: ['UC1', 'UC2'],
    description: 'One row per LLM API call. Captures model, tokens, cost, latency, and response content.',
    fields: [
      { name: 'response_id',       type: 'string',    nullable: false, note: 'UUID or provider ID' },
      { name: 'model',             type: 'string',    nullable: false, note: '"gpt-4o", "claude-sonnet-4-6"' },
      { name: 'prompt',            type: 'string',    nullable: false, note: 'Last user message' },
      { name: 'content',           type: 'string',    nullable: true,  note: 'Assistant response text' },
      { name: 'prompt_tokens',     type: 'int32',     nullable: true,  note: '' },
      { name: 'completion_tokens', type: 'int32',     nullable: true,  note: '' },
      { name: 'cost_usd',          type: 'float64',   nullable: true,  note: 'Calculated from token pricing' },
      { name: 'latency_ms',        type: 'int32',     nullable: true,  note: '' },
      { name: 'task_type',         type: 'string',    nullable: true,  note: '"summarization","code","classification"' },
      { name: 'session_id',        type: 'string',    nullable: true,  note: '' },
      { name: 'created_at',        type: 'timestamp', nullable: false, note: '' },
    ],
  },
  {
    name: 'eval.results',
    sqlName: 'eval_results',
    useCases: ['UC1', 'UC2', 'UC5'],
    description: 'Evaluation scores per response or pipeline run. Supports multi-dimensional scoring.',
    fields: [
      { name: 'eval_id',        type: 'string',    nullable: false, note: '' },
      { name: 'response_id',    type: 'string',    nullable: true,  note: 'FK → llm.responses' },
      { name: 'query_id',       type: 'string',    nullable: true,  note: 'FK → rag.chunks (UC5 join key)' },
      { name: 'prompt_version', type: 'string',    nullable: true,  note: '"v1","v2" for regression' },
      { name: 'model',          type: 'string',    nullable: true,  note: '' },
      { name: 'score',          type: 'float64',   nullable: true,  note: '0.0–1.0' },
      { name: 'passed',         type: 'bool',      nullable: true,  note: '' },
      { name: 'evaluated_at',   type: 'timestamp', nullable: false, note: '' },
    ],
  },
  {
    name: 'pipeline.runs',
    sqlName: 'pipeline_runs',
    useCases: ['UC3'],
    description: 'One row per pipeline execution. Tracks cost, latency, feature flags, and status.',
    fields: [
      { name: 'run_id',           type: 'string',    nullable: false, note: '' },
      { name: 'feature_flag',     type: 'string',    nullable: true,  note: '@context(feature="x") tag' },
      { name: 'user_segment',     type: 'string',    nullable: true,  note: '' },
      { name: 'total_tokens',     type: 'int32',     nullable: true,  note: '' },
      { name: 'total_cost_usd',   type: 'float64',   nullable: true,  note: '' },
      { name: 'total_latency_ms', type: 'int32',     nullable: true,  note: '' },
      { name: 'status',           type: 'string',    nullable: true,  note: '"success","error","timeout"' },
      { name: 'started_at',       type: 'timestamp', nullable: false, note: '' },
    ],
  },
  {
    name: 'agent.tool_calls',
    sqlName: 'agent_tool_calls',
    useCases: ['UC4'],
    description: 'Every tool invocation by an agent. Captures input, output, latency, and errors.',
    fields: [
      { name: 'call_id',      type: 'string',    nullable: false, note: '' },
      { name: 'session_id',   type: 'string',    nullable: false, note: '' },
      { name: 'step_order',   type: 'int32',     nullable: false, note: '' },
      { name: 'tool_name',    type: 'string',    nullable: false, note: '' },
      { name: 'tool_input',   type: 'string',    nullable: true,  note: 'JSON string' },
      { name: 'tool_output',  type: 'string',    nullable: true,  note: 'JSON string' },
      { name: 'status',       type: 'string',    nullable: false, note: '"success","error","timeout"' },
      { name: 'latency_ms',   type: 'int32',     nullable: true,  note: '' },
      { name: 'called_at',    type: 'timestamp', nullable: false, note: '' },
    ],
  },
  {
    name: 'agent.trace',
    sqlName: 'agent_trace',
    useCases: ['UC4'],
    description: 'Full session replay — every step an agent took, in order.',
    fields: [
      { name: 'trace_id',       type: 'string',    nullable: false, note: '' },
      { name: 'session_id',     type: 'string',    nullable: false, note: '' },
      { name: 'step_order',     type: 'int32',     nullable: false, note: '' },
      { name: 'step_type',      type: 'string',    nullable: true,  note: '"llm_call","tool_call","human"' },
      { name: 'human_override', type: 'bool',      nullable: true,  note: '' },
      { name: 'timestamp',      type: 'timestamp', nullable: false, note: '' },
    ],
  },
  {
    name: 'rag.chunks',
    sqlName: 'rag_chunks',
    useCases: ['UC5'],
    description: 'Retrieved chunks per query. Similarity scores enable RAG quality analysis.',
    fields: [
      { name: 'retrieval_id',     type: 'string',    nullable: false, note: '' },
      { name: 'query_id',         type: 'string',    nullable: false, note: 'Links to eval.results.query_id' },
      { name: 'chunk_id',         type: 'string',    nullable: false, note: '' },
      { name: 'source_doc',       type: 'string',    nullable: true,  note: '' },
      { name: 'similarity_score', type: 'float64',   nullable: true,  note: '' },
      { name: 'rank',             type: 'int32',     nullable: true,  note: '' },
      { name: 'embedding_model',  type: 'string',    nullable: true,  note: '' },
      { name: 'retrieved_at',     type: 'timestamp', nullable: false, note: '' },
    ],
  },
]

export default function Schema() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-text-primary mb-4">Schema</h1>
      <p className="text-text-muted mb-12 text-lg">
        6 canonical PyArrow tables. All adapters and tracers normalize to these schemas.
        Use underscored names in SQL (e.g. <code className="text-text-primary font-mono">llm_responses</code>).
      </p>
      <div className="space-y-12">
        {TABLES.map((table) => (
          <div key={table.name} className="bg-surface border border-subtle rounded-xl p-6">
            <div className="flex items-start justify-between mb-2">
              <h2 className="text-xl font-semibold text-accent-cyan font-mono">{table.name}</h2>
              <div className="flex gap-2">
                {table.useCases.map((uc) => (
                  <span key={uc} className="text-xs px-2 py-0.5 rounded-full border border-subtle text-text-muted font-mono">{uc}</span>
                ))}
              </div>
            </div>
            <p className="text-text-muted text-sm mb-4">{table.description}</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-subtle text-left">
                    <th className="pb-2 pr-6 text-text-muted font-medium">Field</th>
                    <th className="pb-2 pr-6 text-text-muted font-medium">Type</th>
                    <th className="pb-2 pr-6 text-text-muted font-medium">Nullable</th>
                    <th className="pb-2 text-text-muted font-medium">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {table.fields.map((f) => (
                    <tr key={f.name} className="border-b border-subtle/50 last:border-0">
                      <td className="py-2 pr-6 font-mono text-text-primary">{f.name}</td>
                      <td className="py-2 pr-6 font-mono text-accent-blue text-xs">{f.type}</td>
                      <td className="py-2 pr-6 text-text-muted">{f.nullable ? 'yes' : 'no'}</td>
                      <td className="py-2 text-text-muted text-xs">{f.note || ''}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
