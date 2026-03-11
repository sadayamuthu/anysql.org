# anySQL Website Update Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update the anySQL website to reflect the 4-package platform (sdk, proxy, server, ui) with a products grid on the homepage and a new dedicated `/proxy` page.

**Architecture:** Surgical updates to existing React/Vite/Tailwind site — add `ProductsSection` to homepage, new `Proxy.jsx` page, update `Navbar`, `App.jsx`, and `Docs.jsx`. No new dependencies.

**Tech Stack:** React 18, React Router v6, Tailwind CSS, Vite

**Spec:** `docs/superpowers/specs/2026-03-10-anysql-website-update-design.md`

---

## Chunk 1: Routing + Navbar

### Task 1: Create empty Proxy page + wire routing

**Files:**
- Create: `src/pages/Proxy.jsx`
- Modify: `src/App.jsx`
- Modify: `src/components/Navbar.jsx`

- [ ] **Step 1: Create minimal Proxy page stub**

Create `src/pages/Proxy.jsx` with a placeholder:

```jsx
export default function Proxy() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-text-primary mb-4">anysql-proxy</h1>
      <p className="text-text-muted text-lg">Coming soon.</p>
    </div>
  )
}
```

- [ ] **Step 2: Add Proxy import and route in App.jsx**

In `src/App.jsx`, add the import after the Cli import:
```jsx
import Proxy  from './pages/Proxy'
```

Add the route after the CLI route:
```jsx
<Route path="/proxy"   element={<Proxy />} />
```

- [ ] **Step 3: Add Proxy link to Navbar**

In `src/components/Navbar.jsx`, update `NAV_LINKS` to insert Proxy between Docs and Queries:
```jsx
const NAV_LINKS = [
  { label: 'Docs',    to: '/docs' },
  { label: 'Proxy',   to: '/proxy' },
  { label: 'Queries', to: '/queries' },
  { label: 'Schema',  to: '/schema' },
  { label: 'CLI',     to: '/cli' },
]
```

- [ ] **Step 4: Lint and build**

```bash
cd /Users/karthik/git-new/anysql.org
npm run lint
npm run build
```

Expected: no errors, `dist/` created successfully.

- [ ] **Step 5: Verify in dev server**

```bash
npm run dev
```

Open `http://localhost:5173/#/proxy` — should show "anysql-proxy" heading. Navbar should show "Proxy" link between Docs and Queries.

- [ ] **Step 6: Commit**

```bash
git add src/pages/Proxy.jsx src/App.jsx src/components/Navbar.jsx
git commit -m "feat: add /proxy route and navbar link"
```

---

## Chunk 2: Homepage — ProductsSection

### Task 2: Add ProductsSection to homepage

**Files:**
- Modify: `src/pages/Home.jsx`

- [ ] **Step 1: Add ProductsSection component**

In `src/pages/Home.jsx`, add the following component above the `JoinSection` function:

```jsx
const PRODUCTS = [
  {
    name: 'anysql-sdk',
    status: 'available',
    description: 'SQL analytics for LLM responses, agent traces, and RAG pipelines. Powered by DuckDB. Zero configuration.',
    install: 'pip install anysql-sdk',
    to: '/docs',
  },
  {
    name: 'anysql-proxy',
    status: 'available',
    description: 'Local IDE LLM proxy — intercept, log, and query your AI coding assistant usage from Cursor, Claude Code, Windsurf, and VS Code.',
    install: 'pip install anysql-proxy',
    to: '/proxy',
  },
  {
    name: 'anysql-server',
    status: 'coming soon',
    description: 'REST API server for querying anySQL data over HTTP. Query your AI telemetry from any language or tool.',
    install: null,
    to: null,
  },
  {
    name: 'anysql-ui',
    status: 'coming soon',
    description: 'Monaco SQL editor and pre-built dashboards at localhost:4243. Query and visualize without leaving your machine.',
    install: null,
    to: null,
  },
]

function ProductsSection() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-semibold text-text-primary mb-3 text-center">
        The anySQL platform.
      </h2>
      <p className="text-text-muted text-center mb-10">Four packages. One local analytics layer for your AI stack.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {PRODUCTS.map(({ name, status, description, install, to }) => {
          const card = (
            <div
              className={`bg-surface border rounded-xl p-6 flex flex-col gap-3 transition-colors duration-200 ${
                to ? 'border-subtle hover:border-accent-blue cursor-pointer' : 'border-subtle opacity-60'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm font-semibold text-text-primary">{name}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full border font-mono ${
                  status === 'available'
                    ? 'border-accent-cyan text-accent-cyan'
                    : 'border-subtle text-text-muted'
                }`}>
                  {status}
                </span>
              </div>
              <p className="text-text-muted text-sm leading-relaxed">{description}</p>
              {install && (
                <pre className="bg-space rounded-lg px-4 py-2 text-xs text-text-primary font-mono mt-auto">
                  {install}
                </pre>
              )}
              {!install && (
                <p className="text-xs text-text-muted font-mono mt-auto">Coming soon</p>
              )}
            </div>
          )

          return to ? (
            <Link key={name} to={to} className="no-underline">
              {card}
            </Link>
          ) : (
            <div key={name}>{card}</div>
          )
        })}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Insert ProductsSection into the Home layout**

In the `Home` default export, add `<ProductsSection />` between `<Hero />` and `<JoinSection />`:

```jsx
export default function Home() {
  return (
    <div>
      <Hero />
      <ProductsSection />
      <JoinSection />
      <WhySection />
      <UseCasesSection />
      <QuickStartSection />
      <GitHubCTA />
    </div>
  )
}
```

- [ ] **Step 3: Update Quick Start code samples**

In the `QuickStartSection` steps array, update step 2 from the old `WrappedOpenAI` style to the current API:

```jsx
{
  label: '2. Wrap your client',
  code: `import anysql

db = anysql.init()

# OpenAI
client = anysql.openai(openai.OpenAI())

# Anthropic
client = anysql.claude(anthropic.Anthropic())`,
},
```

Also update step 1 to add the openai import context:
```jsx
{
  label: '1. Install',
  code: 'pip install anysql-sdk',
},
```

Step 3 (query) remains unchanged.

- [ ] **Step 4: Lint and build**

```bash
npm run lint
npm run build
```

Expected: no errors.

- [ ] **Step 5: Verify in dev server**

```bash
npm run dev
```

Open `http://localhost:5173/` — should show the 4-card products grid between the hero and the cross-layer JOIN section. Clicking `anysql-sdk` card navigates to `/docs`. Clicking `anysql-proxy` card navigates to `/proxy`.

- [ ] **Step 6: Commit**

```bash
git add src/pages/Home.jsx
git commit -m "feat: add ProductsSection and update QuickStart on homepage"
```

---

## Chunk 3: Proxy Page

### Task 3: Build out the full Proxy page

**Files:**
- Modify: `src/pages/Proxy.jsx`

Replace the stub with the full page:

- [ ] **Step 1: Write the full Proxy page**

Replace `src/pages/Proxy.jsx` entirely with:

```jsx
function Section({ title, children }) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold text-text-primary mb-4 pb-2 border-b border-subtle">{title}</h2>
      {children}
    </section>
  )
}

function CodeBlock({ code }) {
  return (
    <pre className="bg-space border border-subtle rounded-lg p-5 overflow-x-auto text-sm leading-relaxed my-4">
      <code className="text-text-primary">{code}</code>
    </pre>
  )
}

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
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="inline-block mb-4 px-3 py-1 rounded-full border border-accent-cyan text-xs text-accent-cyan font-mono">
        available · v0.1.0
      </div>
      <h1 className="text-4xl font-bold text-text-primary mb-4">anysql-proxy</h1>
      <p className="text-text-muted mb-12 text-lg">
        Local IDE LLM proxy — intercept, log, and query your AI coding assistant usage.
      </p>

      <Section title="Install">
        <CodeBlock code="pip install anysql-proxy" />
      </Section>

      <Section title="How it works">
        <p className="text-text-muted mb-4 leading-relaxed">
          The proxy runs on <code className="text-text-primary font-mono">localhost:4242</code>. Configure your IDE to point its LLM base URL there. Every request is forwarded to the real provider with zero added latency — and logged non-blocking to <code className="text-text-primary font-mono">~/.anysql/ide.duckdb</code>.
        </p>
        <CodeBlock code={`IDE → POST http://localhost:4242/v1/chat/completions
          ↓
     anysql-proxy
          ↓ logs to ~/.anysql/ide.duckdb  (non-blocking)
          ↓ forwards to api.openai.com or api.anthropic.com
          ↓ streams response back to IDE
IDE receives tokens with zero added latency`} />
        <p className="text-text-muted text-sm leading-relaxed">
          The proxy detects which IDE sent each request via User-Agent fingerprinting and extracts file path, language, and git branch from the prompt body — giving you queryable developer workflow context alongside LLM cost data.
        </p>
      </Section>

      <Section title="IDE Setup">
        <p className="text-text-muted mb-4">Run the setup command for your IDE — it writes the config automatically:</p>
        <CodeBlock code={`anysql-proxy setup cursor        # Cursor: override OpenAI base URL
anysql-proxy setup claude-code   # Claude Code: appends to ~/.zshrc
anysql-proxy setup windsurf      # Windsurf: custom API endpoint
anysql-proxy setup vscode        # VS Code + Continue: config.json`} />
        <p className="text-text-muted text-sm mb-4">Or configure manually:</p>
        <div className="space-y-3">
          {[
            { ide: 'Cursor', setting: 'Settings → Override OpenAI Base URL', value: 'http://localhost:4242' },
            { ide: 'Claude Code', setting: 'Shell environment', value: 'export ANTHROPIC_BASE_URL=http://localhost:4242' },
            { ide: 'Windsurf', setting: 'Settings → Custom API Endpoint', value: 'http://localhost:4242' },
            { ide: 'VS Code (Continue)', setting: 'config.json', value: '"apiBase": "http://localhost:4242"' },
          ].map(({ ide, setting, value }) => (
            <div key={ide} className="bg-surface border border-subtle rounded-lg p-4">
              <p className="text-sm font-semibold text-text-primary mb-1">{ide}</p>
              <p className="text-xs text-text-muted mb-2">{setting}</p>
              <code className="text-xs text-accent-cyan font-mono">{value}</code>
            </div>
          ))}
        </div>
      </Section>

      <Section title="CLI Reference">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-subtle">
                <th className="text-left text-text-muted font-medium pb-3 pr-6">Command</th>
                <th className="text-left text-text-muted font-medium pb-3">Description</th>
              </tr>
            </thead>
            <tbody>
              {CLI_COMMANDS.map(({ cmd, desc }) => (
                <tr key={cmd} className="border-b border-subtle last:border-0">
                  <td className="py-3 pr-6">
                    <code className="text-accent-cyan font-mono text-xs">{cmd}</code>
                  </td>
                  <td className="py-3 text-text-muted">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Schema">
        <p className="text-text-muted mb-4">
          Two tables written to <code className="text-text-primary font-mono">~/.anysql/ide.duckdb</code>:
        </p>
        <p className="text-sm font-semibold text-text-primary mb-2">llm_responses</p>
        <CodeBlock code={`response_id       VARCHAR   -- unique request ID
model             VARCHAR   -- e.g. gpt-4o, claude-sonnet-4-6
prompt_tokens     INTEGER
completion_tokens INTEGER
total_tokens      INTEGER
cost_usd          DOUBLE
latency_ms        INTEGER
created_at        TIMESTAMP`} />
        <p className="text-sm font-semibold text-text-primary mb-2 mt-6">ide_context</p>
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
        <p className="text-text-muted text-sm mt-4">
          Query with DuckDB directly: <code className="text-text-primary font-mono">duckdb ~/.anysql/ide.duckdb</code>
        </p>
      </Section>
    </div>
  )
}
```

- [ ] **Step 2: Lint and build**

```bash
npm run lint
npm run build
```

Expected: no errors.

- [ ] **Step 3: Verify in dev server**

```bash
npm run dev
```

Open `http://localhost:5173/#/proxy` — verify all sections render: header/badge, Install, How it works, IDE Setup, CLI Reference, Schema. Check the CLI table and IDE cards render correctly.

- [ ] **Step 4: Commit**

```bash
git add src/pages/Proxy.jsx
git commit -m "feat: build out full Proxy page with install, IDE setup, CLI ref, schema"
```

---

## Chunk 4: Docs Page Update

### Task 4: Update Docs adapters section to current API style

**Files:**
- Modify: `src/pages/Docs.jsx`

- [ ] **Step 1: Update Adapters section code sample**

In `src/pages/Docs.jsx`, replace the Adapters `CodeBlock` content (lines 61–72) with the current API style:

```jsx
<CodeBlock code={`import anysql

db = anysql.init()

# OpenAI — transparent proxy, all calls auto-logged
client = anysql.openai(openai.OpenAI())
response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "Hello"}]
)

# Anthropic / Claude
client = anysql.claude(anthropic.Anthropic())
response = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Hello"}]
)

# Generic (any dict/JSON response)
from anysql_sdk.adapters.generic import GenericAdapter
adapter = GenericAdapter(db_path="anysql.db")
adapter.record(response_dict)`} />
```

- [ ] **Step 2: Update Running Queries section**

Replace the `Running Queries` CodeBlock (line 99–112) with the current API style:

```jsx
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
```

- [ ] **Step 3: Lint and build**

```bash
npm run lint
npm run build
```

Expected: no errors.

- [ ] **Step 4: Verify in dev server**

```bash
npm run dev
```

Open `http://localhost:5173/#/docs` — Adapters section should show `anysql.init()` / `anysql.openai()` style. Running Queries section should show `db = anysql.init()`.

- [ ] **Step 5: Commit**

```bash
git add src/pages/Docs.jsx
git commit -m "fix: update Docs adapter and query examples to current API style"
```

---

## Final Verification

- [ ] **Full build check**

```bash
npm run lint && npm run build
```

Expected: clean lint, successful build with no warnings.

- [ ] **Smoke test all pages**

Start `npm run dev` and verify:
- `/` — hero, products grid (4 cards), JOIN section, why, use cases, quick start, CTA
- `/docs` — updated adapter examples show `anysql.init()` / `anysql.openai()`
- `/proxy` — all 6 sections present
- `/queries` — unchanged
- `/schema` — unchanged
- `/cli` — unchanged
- Navbar shows: Docs · Proxy · Queries · Schema · CLI · GitHub ↗
- Proxy card on homepage links to `/proxy`
- SDK card on homepage links to `/docs`
- Server/UI cards are dimmed with "coming soon"

- [ ] **Final commit (if any cleanup needed)**

```bash
git add -A
git commit -m "chore: final cleanup for website platform update"
```
