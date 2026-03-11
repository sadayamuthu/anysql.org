# Nav Restructure Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rename Docs→SDK, add Server and UI coming-soon pages, convert Docs nav entry into a hover dropdown (Schema/Queries/CLI), and wire all homepage product cards to their pages.

**Architecture:** Surgical file changes on the `develop` branch — rename `Docs.jsx` to `Sdk.jsx`, create `Server.jsx` and `Ui.jsx`, update `Navbar.jsx` with a Tailwind group-hover dropdown, update `App.jsx` routing, update `Home.jsx` product links. No new dependencies.

**Tech Stack:** React 18, React Router v6, Tailwind CSS, Vite

**Spec:** `docs/superpowers/specs/2026-03-11-nav-restructure-design.md`

---

## Chunk 1: Routing — Sdk page + remove /docs

### Task 1: Rename Docs→Sdk and update routing

**Files:**
- Create: `src/pages/Sdk.jsx` (copy of Docs.jsx with title updated)
- Delete: `src/pages/Docs.jsx`
- Modify: `src/App.jsx`

- [ ] **Step 1: Create Sdk.jsx from Docs.jsx content**

Create `src/pages/Sdk.jsx` with the full content of `Docs.jsx` (all sections — Installation, Architecture, Adapters, Tracers, Context Decorator, Running Queries are kept), changing only:
- The function name from `Docs` to `Sdk`
- The `<h1>` text from `"Documentation"` to `"anysql-sdk"`
- The subtitle from `"Get started with anySQL in minutes."` to `"SQL analytics for LLM responses, agent traces, and RAG pipelines."`
- Add the available badge (same style as `Proxy.jsx`) above the `<h1>`

Full file content for `src/pages/Sdk.jsx`:

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

export default function Sdk() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="inline-block mb-4 px-3 py-1 rounded-full border border-accent-cyan text-xs text-accent-cyan font-mono">
        available · v0.1.0
      </div>
      <h1 className="text-4xl font-bold text-text-primary mb-4">anysql-sdk</h1>
      <p className="text-text-muted mb-12 text-lg">SQL analytics for LLM responses, agent traces, and RAG pipelines.</p>

      <Section title="Installation">
        <CodeBlock code="pip install anysql-sdk" />
        <p className="text-text-muted text-sm">Optional extras:</p>
        <CodeBlock code={`pip install anysql-sdk[openai]      # OpenAI adapter
pip install anysql-sdk[anthropic]   # Claude adapter
pip install anysql-sdk[langchain]   # LangChain tracer
pip install anysql-sdk[all]         # Everything`} />
      </Section>

      <Section title="Architecture">
        <p className="text-text-muted mb-4 leading-relaxed">
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
        <p className="text-text-muted mb-4">Drop-in wrappers that auto-capture telemetry from your LLM clients.</p>
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
      </Section>

      <Section title="Tracers">
        <p className="text-text-muted mb-4">Instrument agent and RAG pipelines for full trace capture.</p>
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
        <p className="text-text-muted mb-4">Tag all telemetry within a code block with feature flags or segments.</p>
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
        <p className="text-text-muted text-sm">
          Table names in SQL use underscores: <code className="text-text-primary font-mono">llm_responses</code>,{' '}
          <code className="text-text-primary font-mono">eval_results</code>,{' '}
          <code className="text-text-primary font-mono">pipeline_runs</code>,{' '}
          <code className="text-text-primary font-mono">agent_tool_calls</code>,{' '}
          <code className="text-text-primary font-mono">agent_trace</code>,{' '}
          <code className="text-text-primary font-mono">rag_chunks</code>.
        </p>
      </Section>
    </div>
  )
}
```

- [ ] **Step 2: Delete Docs.jsx**

```bash
rm /Users/karthik/git-new/anysql.org/src/pages/Docs.jsx
```

- [ ] **Step 3: Update App.jsx**

Read `src/App.jsx`. Replace:
```jsx
import Docs    from './pages/Docs'
```
With:
```jsx
import Sdk     from './pages/Sdk'
import Server  from './pages/Server'
import Ui      from './pages/Ui'
```

Replace the `/docs` route:
```jsx
<Route path="/docs"    element={<Docs />} />
```
With:
```jsx
<Route path="/sdk"     element={<Sdk />} />
<Route path="/server"  element={<Server />} />
<Route path="/ui"      element={<Ui />} />
```

Note: `Server.jsx` and `Ui.jsx` don't exist yet — they'll be stubs for now and filled in Task 2.

- [ ] **Step 4: Create Server.jsx and Ui.jsx stubs** (so App.jsx compiles)

`src/pages/Server.jsx`:
```jsx
export default function Server() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-text-primary mb-4">anysql-server</h1>
      <p className="text-text-muted text-lg">Coming soon.</p>
    </div>
  )
}
```

`src/pages/Ui.jsx`:
```jsx
export default function Ui() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-text-primary mb-4">anysql-ui</h1>
      <p className="text-text-muted text-lg">Coming soon.</p>
    </div>
  )
}
```

- [ ] **Step 5: Lint check**

```bash
cd /Users/karthik/git-new/anysql.org && npm run lint 2>&1 | grep -v "Invalid option" | head -20
```

Expected: no errors related to our changes.

- [ ] **Step 6: Commit**

```bash
git add src/pages/Sdk.jsx src/pages/Server.jsx src/pages/Ui.jsx src/App.jsx
git rm src/pages/Docs.jsx
git commit -m "feat: rename Docs to Sdk, add Server/Ui stubs, update routing"
```

---

## Chunk 2: Navbar — dropdown + new links

### Task 2: Update Navbar with SDK, Server, UI links and Docs dropdown

**Files:**
- Modify: `src/components/Navbar.jsx`

- [ ] **Step 1: Rewrite Navbar.jsx**

Replace the entire content of `src/components/Navbar.jsx` with:

```jsx
import { Link, useLocation } from 'react-router-dom'

const DOC_LINKS = [
  { label: 'Schema',  to: '/schema' },
  { label: 'Queries', to: '/queries' },
  { label: 'CLI',     to: '/cli' },
]

export default function Navbar() {
  const { pathname } = useLocation()
  const docsActive = ['/schema', '/queries', '/cli'].includes(pathname)

  return (
    <nav className="sticky top-0 z-50 bg-surface border-b border-subtle">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="text-lg font-semibold text-text-primary hover:text-accent-cyan transition-colors duration-200">
          anySQL
        </Link>
        <div className="flex items-center gap-8">
          {[
            { label: 'SDK',    to: '/sdk' },
            { label: 'Proxy',  to: '/proxy' },
            { label: 'Server', to: '/server' },
            { label: 'UI',     to: '/ui' },
          ].map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              className={`text-sm transition-colors duration-200 ${
                pathname === to ? 'text-accent-cyan' : 'text-text-muted hover:text-text-primary'
              }`}
            >
              {label}
            </Link>
          ))}

          {/* Docs dropdown */}
          <div className="relative group">
            <button
              className={`text-sm transition-colors duration-200 flex items-center gap-1 ${
                docsActive ? 'text-accent-cyan' : 'text-text-muted hover:text-text-primary'
              }`}
            >
              Docs
              <svg className="w-3 h-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute right-0 top-full pt-2 hidden group-hover:block z-50">
              <div className="bg-surface border border-subtle rounded-lg py-1 min-w-[120px] shadow-lg">
                {DOC_LINKS.map(({ label, to }) => (
                  <Link
                    key={to}
                    to={to}
                    className={`block px-4 py-2 text-sm transition-colors duration-200 ${
                      pathname === to ? 'text-accent-cyan' : 'text-text-muted hover:text-text-primary'
                    }`}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <a
            href="https://github.com/sadayamuthu/anysql"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-text-muted hover:text-text-primary transition-colors duration-200"
            aria-label="GitHub repository"
          >
            GitHub ↗
          </a>
        </div>
      </div>
    </nav>
  )
}
```

- [ ] **Step 2: Lint check**

```bash
cd /Users/karthik/git-new/anysql.org && npm run lint 2>&1 | grep -v "Invalid option" | head -20
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/Navbar.jsx
git commit -m "feat: add Docs hover dropdown, SDK/Server/UI nav links"
```

---

## Chunk 3: Server and UI pages + Homepage links

### Task 3: Build Server and UI pages, update homepage

**Files:**
- Modify: `src/pages/Server.jsx`
- Modify: `src/pages/Ui.jsx`
- Modify: `src/pages/Home.jsx`

- [ ] **Step 1: Write full Server.jsx**

Replace `src/pages/Server.jsx` with:

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

export default function Server() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="inline-block mb-4 px-3 py-1 rounded-full border border-subtle text-xs text-text-muted font-mono">
        coming soon
      </div>
      <div className="bg-surface border border-subtle rounded-lg px-5 py-4 mb-10 text-sm text-text-muted">
        This package is not yet released. Details below reflect the planned design.
      </div>
      <h1 className="text-4xl font-bold text-text-primary mb-4">anysql-server</h1>
      <p className="text-text-muted mb-12 text-lg">
        REST API server for querying anySQL data over HTTP from any language or tool.
      </p>

      <Section title="What is anysql-server?">
        <p className="text-text-muted leading-relaxed">
          anysql-server exposes your local anySQL DuckDB data over HTTP, so you can query LLM telemetry
          from dashboards, scripts, or any language without a Python runtime.
          It will be available as a standalone package on PyPI.
        </p>
        <CodeBlock code={`# Planned install
pip install anysql-server

# Planned import
import anysql_server`} />
      </Section>

      <Section title="Planned capabilities">
        <ul className="space-y-3 text-text-muted text-sm leading-relaxed">
          <li className="flex gap-3">
            <span className="text-accent-cyan mt-0.5">→</span>
            <span>HTTP endpoints to run SQL queries against your local DuckDB data</span>
          </li>
          <li className="flex gap-3">
            <span className="text-accent-cyan mt-0.5">→</span>
            <span>Query anySQL telemetry from any language — no Python runtime required</span>
          </li>
          <li className="flex gap-3">
            <span className="text-accent-cyan mt-0.5">→</span>
            <span>Used by anysql-ui (port 4243) as its data backend</span>
          </li>
          <li className="flex gap-3">
            <span className="text-accent-cyan mt-0.5">→</span>
            <span>Independent package — own versioning, own PyPI release</span>
          </li>
        </ul>
      </Section>
    </div>
  )
}
```

- [ ] **Step 2: Write full Ui.jsx**

Replace `src/pages/Ui.jsx` with:

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

export default function Ui() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="inline-block mb-4 px-3 py-1 rounded-full border border-subtle text-xs text-text-muted font-mono">
        coming soon
      </div>
      <div className="bg-surface border border-subtle rounded-lg px-5 py-4 mb-10 text-sm text-text-muted">
        This package is not yet released. Details below reflect the planned design.
      </div>
      <h1 className="text-4xl font-bold text-text-primary mb-4">anysql-ui</h1>
      <p className="text-text-muted mb-12 text-lg">
        Monaco SQL editor and pre-built dashboards at <code className="text-text-primary font-mono">localhost:4243</code>.
      </p>

      <Section title="What is anysql-ui?">
        <p className="text-text-muted leading-relaxed">
          anysql-ui is a browser-based interface for querying and visualising your anySQL data.
          It runs locally at port 4243, backed by anysql-server, and requires no cloud account or configuration.
          It is Phase 4 of the anySQL platform roadmap.
        </p>
        <CodeBlock code={`# Planned install
pip install anysql-ui

# Planned usage
anysql-ui start   # opens http://localhost:4243`} />
      </Section>

      <Section title="Planned capabilities">
        <ul className="space-y-3 text-text-muted text-sm leading-relaxed">
          <li className="flex gap-3">
            <span className="text-accent-cyan mt-0.5">→</span>
            <span>Monaco SQL editor with autocomplete over your anySQL tables</span>
          </li>
          <li className="flex gap-3">
            <span className="text-accent-cyan mt-0.5">→</span>
            <span>Pre-built dashboards for LLM cost, latency, and usage by model and feature</span>
          </li>
          <li className="flex gap-3">
            <span className="text-accent-cyan mt-0.5">→</span>
            <span>Runs entirely locally — no cloud, no data leaves your machine</span>
          </li>
          <li className="flex gap-3">
            <span className="text-accent-cyan mt-0.5">→</span>
            <span>Backed by anysql-server on port 4242/4243</span>
          </li>
        </ul>
      </Section>
    </div>
  )
}
```

- [ ] **Step 3: Update Home.jsx product links**

In `src/pages/Home.jsx` make these three targeted changes:

**3a. Fix Hero "Read the Docs" link** (line ~40 in the `Hero` function):
```jsx
// Change:
<Link to="/docs" ...>Read the Docs →</Link>
// To:
<Link to="/sdk" ...>Read the Docs →</Link>
```

**3b. Update PRODUCTS array `to` values** (three changes):
```jsx
// anysql-sdk:    to: '/docs'  →  to: '/sdk'
// anysql-server: to: null     →  to: '/server'
// anysql-ui:     to: null     →  to: '/ui'
```

**3c. Update card className** — since server/ui now have `to` values, the existing `to ? ... : 'opacity-60'` logic would remove the dimming. Keep the coming-soon visual treatment by switching the className condition to use `status` instead of `to`:
```jsx
// Change:
to ? 'border-subtle hover:border-accent-blue cursor-pointer' : 'border-subtle opacity-60'
// To:
status === 'available'
  ? 'border-subtle hover:border-accent-blue cursor-pointer'
  : 'border-subtle hover:border-accent-blue cursor-pointer opacity-60'
```

Note: the `<Link>` vs `<div>` branch in the return statement still uses `to` — since all 4 entries now have `to` values, all 4 will render as `<Link>` elements automatically. No change needed there.

- [ ] **Step 4: Lint check**

```bash
cd /Users/karthik/git-new/anysql.org && npm run lint 2>&1 | grep -v "Invalid option" | head -20
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add src/pages/Server.jsx src/pages/Ui.jsx src/pages/Home.jsx
git commit -m "feat: build Server and UI pages, update homepage product links"
```

---

## Final Verification

- [ ] **Full lint check**

```bash
cd /Users/karthik/git-new/anysql.org && npm run lint 2>&1 | grep -v "Invalid option"
```

Expected: clean.

- [ ] **Smoke test all routes**

Start `npm run dev` and verify:
- `/` — Hero "Read the Docs →" link goes to `/sdk`; products grid: all 4 cards clickable; SDK→`/sdk`, Proxy→`/proxy`, Server→`/server`, UI→`/ui`; coming-soon cards dimmed (`opacity-60`) but still clickable
- `/sdk` — heading "anysql-sdk", badge "available · v0.1.0", all sections present
- `/proxy` — unchanged, still works
- `/server` — "coming soon" badge, info banner, 2 sections
- `/ui` — "coming soon" badge, info banner, 2 sections
- `/schema`, `/queries`, `/cli` — unchanged
- Navbar: `SDK · Proxy · Server · UI · Docs ▾ · GitHub ↗`
- Hovering Docs shows dropdown with Schema, Queries, CLI
- Navigating to `/#/docs` falls through to Home (wildcard route)
