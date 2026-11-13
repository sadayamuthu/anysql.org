import PackageLayout from '../components/PackageLayout'
import { CodeBlock, Section } from '../components/ui'

const CLI_COMMANDS = [
  { cmd: 'anysql-proxy start',         desc: 'Start the proxy on localhost:4242' },
  { cmd: 'anysql-proxy stop',          desc: 'Stop the running proxy process' },
  { cmd: 'anysql-proxy status',        desc: 'Show whether proxy is running and which port' },
  { cmd: 'anysql-proxy setup cursor',  desc: 'Auto-configure Cursor to use the proxy' },
  { cmd: 'anysql-proxy setup claude-code', desc: 'Append ANTHROPIC_BASE_URL to ~/.zshrc' },
  { cmd: 'anysql-proxy setup windsurf',desc: 'Auto-configure Windsurf custom API endpoint' },
  { cmd: 'anysql-proxy setup vscode',  desc: 'Write apiBase to Continue config.json' },
  { cmd: 'anysql-proxy keys',          desc: 'Manage encrypted API key storage' },
]

export default function Proxy() {
  return (
    <PackageLayout
      to="/proxy"
      lede={<>Local IDE LLM proxy: intercept, log, and query your AI coding assistant usage.</>}
    >

      <Section title="Install">
        <CodeBlock code="pip install anysql-proxy" />
      </Section>

      <Section title="How it works">
        <p className="text-ink-muted mb-4 leading-relaxed">
          The proxy runs on <code className="font-mono text-[0.9em] px-1 py-0.5 rounded-sm bg-card border border-rule">localhost:4242</code>. Configure your IDE to point its LLM base URL there. Every request is forwarded to the real provider with zero added latency — and logged non-blocking to <code className="font-mono text-[0.9em] px-1 py-0.5 rounded-sm bg-card border border-rule">~/.anysql/ide.duckdb</code>.
        </p>
        <CodeBlock code={`IDE → POST http://localhost:4242/v1/chat/completions
          ↓
     anysql-proxy
          ↓ logs to ~/.anysql/ide.duckdb  (non-blocking)
          ↓ forwards to api.openai.com or api.anthropic.com
          ↓ streams response back to IDE
IDE receives tokens with zero added latency`} />
        <p className="text-ink-muted text-sm leading-relaxed">
          The proxy detects which IDE sent each request via User-Agent fingerprinting and extracts file path, language, and git branch from the prompt body — giving you queryable developer workflow context alongside LLM cost data.
        </p>
      </Section>

      <Section title="IDE Setup">
        <p className="text-ink-muted mb-4">Run the setup command for your IDE — it writes the config automatically:</p>
        <CodeBlock code={`anysql-proxy setup cursor        # Cursor: override OpenAI base URL
anysql-proxy setup claude-code   # Claude Code: appends to ~/.zshrc
anysql-proxy setup windsurf      # Windsurf: custom API endpoint
anysql-proxy setup vscode        # VS Code + Continue: config.json`} />
        <p className="text-ink-muted text-sm mb-4">Or configure manually:</p>
        <div className="space-y-3">
          {[
            { ide: 'Cursor', setting: 'Settings → Override OpenAI Base URL', value: 'http://localhost:4242' },
            { ide: 'Claude Code', setting: 'Shell environment', value: 'export ANTHROPIC_BASE_URL=http://localhost:4242' },
            { ide: 'Windsurf', setting: 'Settings → Custom API Endpoint', value: 'http://localhost:4242' },
            { ide: 'VS Code (Continue)', setting: 'config.json', value: '"apiBase": "http://localhost:4242"' },
          ].map(({ ide, setting, value }) => (
            <div key={ide} className="bg-card border border-rule rounded-sm p-4">
              <p className="text-sm font-semibold text-ink mb-1">{ide}</p>
              <p className="text-xs text-ink-muted mb-2">{setting}</p>
              <code className="text-xs text-acc font-mono">{value}</code>
            </div>
          ))}
        </div>
      </Section>

      <Section title="CLI Reference">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-rule">
                <th className="text-left text-ink-muted font-medium pb-3 pr-6">Command</th>
                <th className="text-left text-ink-muted font-medium pb-3">Description</th>
              </tr>
            </thead>
            <tbody>
              {CLI_COMMANDS.map(({ cmd, desc }) => (
                <tr key={cmd} className="border-b border-rule last:border-0">
                  <td className="py-3 pr-6">
                    <code className="text-acc font-mono text-xs">{cmd}</code>
                  </td>
                  <td className="py-3 text-ink-muted">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Schema">
        <p className="text-ink-muted mb-4">
          Two tables written to <code className="font-mono text-[0.9em] px-1 py-0.5 rounded-sm bg-card border border-rule">~/.anysql/ide.duckdb</code>:
        </p>
        <p className="text-sm font-semibold text-ink mb-2">llm_responses</p>
        <CodeBlock code={`response_id       VARCHAR   -- unique request ID
model             VARCHAR   -- e.g. gpt-4o, claude-sonnet-4-6
prompt_tokens     INTEGER
completion_tokens INTEGER
total_tokens      INTEGER
cost_usd          DOUBLE
latency_ms        INTEGER
created_at        TIMESTAMP`} />
        <p className="text-sm font-semibold text-ink mb-2 mt-6">ide_context</p>
        <CodeBlock code={`context_id        VARCHAR   -- unique context ID
response_id       VARCHAR   -- FK → llm_responses
ide_name          VARCHAR   -- cursor | claude_code | windsurf | vscode_continue | zed
request_type      VARCHAR   -- chat | completion | debug | explain | review | generate
file_path         VARCHAR   -- active file at time of request
language          VARCHAR   -- detected language
git_repo          VARCHAR
git_branch        VARCHAR
lines_of_context  INTEGER
has_error_context BOOLEAN
suggestion_length INTEGER
created_at        TIMESTAMP`} />
        <p className="text-ink-muted text-sm mt-4">
          Query with DuckDB directly: <code className="font-mono text-[0.9em] px-1 py-0.5 rounded-sm bg-card border border-rule">duckdb ~/.anysql/ide.duckdb</code>
        </p>
      </Section>
    </PackageLayout>
  )
}
