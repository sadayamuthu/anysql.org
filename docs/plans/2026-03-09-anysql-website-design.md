# anySQL Website Design

**Date:** 2026-03-09
**Project:** anysql.org
**Goal:** Developer landing page + documentation hub for the anySQL open-source library

---

## Overview

Build `anysql.org` as a static React website consistent with the opengpl.org template — same stack, same design system, same component structure. The site converts AI engineers into installers and serves as the documentation home.

---

## Tech Stack

- **Framework:** React 18 + Vite
- **Styling:** Tailwind CSS + PostCSS
- **Routing:** React Router v6 (HashRouter, for GitHub Pages compatibility)
- **Deployment:** GitHub Pages (CNAME → anysql.org)
- **Linting:** ESLint

---

## Design System (matches opengpl.org exactly)

### Color Tokens (`tailwind.config.js`)

```js
colors: {
  space:        '#050A14',   // darkest background (body)
  surface:      '#0D1424',   // card/section backgrounds
  subtle:       '#1E2D4A',   // borders, dividers
  'accent-blue': '#4F8EF7',  // primary accent
  'accent-cyan': '#00D4FF',  // secondary accent / highlights
  'text-primary': '#F0F6FF', // main text
  'text-muted':   '#7A90B0', // secondary / placeholder text
}
```

### Typography
- Font: **Inter** (weights 300–700, via Google Fonts)

### Custom Utilities (`index.css`)
```css
.glow-cyan { box-shadow: 0 0 20px rgba(0, 212, 255, 0.3); }
.glow-blue { box-shadow: 0 0 20px rgba(79, 142, 247, 0.3); }
```

---

## Project Structure

```
anysql.org/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Docs.jsx
│   │   ├── Queries.jsx
│   │   ├── Schema.jsx
│   │   └── Cli.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
├── package.json
└── CNAME
```

---

## Routing

```jsx
// HashRouter routes
/          → Home
/docs      → Docs
/queries   → Queries
/schema    → Schema
/cli       → Cli
*          → Home (fallback)
```

---

## Component Specifications

### Navbar.jsx
- Sticky, `z-50`, `bg-surface`, `border-b border-subtle`
- Logo: `⚡ anySQL` in `text-accent-cyan`
- Links: Home · Docs · Queries · Schema · CLI · GitHub (external, with arrow)
- Max-width: `max-w-5xl mx-auto`, height: `h-16`
- Hover: `text-text-muted` → `text-text-primary` with `transition-colors duration-200`
- Active route: `text-accent-cyan`

### Footer.jsx
- `© 2025 · anySQL is Apache 2.0 · by OpenAstra`
- Links: Docs · Queries · Schema · CLI · GitHub
- Same subtle/muted/cyan hover styling as Navbar

---

## Page Specifications

### Home.jsx — 7 sections

#### 1. Hero
- Version badge: `v0.1 · Alpha`
- Headline: `"From vibes to queries."` (large, `text-text-primary`)
- Subheadline: `"SQL analytics for LLM responses, agent traces, and RAG pipelines. Powered by DuckDB. Zero config."`
- CTAs:
  - Primary: `pip install anysql` (copyable code block with cyan border)
  - Secondary: `Read the Docs →` (link to `/docs`)

#### 2. The Query Nobody Else Has Built
- Section title: `"The cross-layer JOIN nobody has built"`
- Syntax-highlighted SQL block showing the RAG+eval join from the README:
```sql
SELECT r.query_id,
       MAX(r.similarity_score) AS retrieval_quality,
       e.score                 AS answer_quality
FROM rag.chunks r
JOIN eval.results e ON r.query_id = e.query_id
GROUP BY r.query_id, e.score
```
- Caption: `"Find out if your RAG pipeline is failing at retrieval or generation — with one query."`

#### 3. Why anySQL — 3 feature cards
| Card | Icon | Title | Body |
|------|------|-------|------|
| 1 | 🔍 | SQL over AI telemetry | Query LLM responses, evals, agent traces, and RAG chunks with standard SQL — no new query language to learn |
| 2 | ⚡ | Zero configuration | DuckDB in-memory + SQLite persistence. `pip install anysql` and you're querying in 30 seconds |
| 3 | 🔗 | Cross-layer JOINs | The only tool that puts LLM cost, eval scores, agent traces, and RAG quality in the same queryable store |

#### 4. The 5 Use Cases — grid of 5 cards
| # | Title | One-liner |
|---|-------|-----------|
| UC1 | LLM Cost Analysis | `AVG(cost_usd)` by model, date, task type |
| UC2 | Prompt Regression | Catch score drops across prompt versions before they hit prod |
| UC3 | A/B Feature Testing | Compare pipeline performance across feature flags with SQL GROUP BY |
| UC4 | Agent Tracing | Query every tool call, step order, error, and human override |
| UC5 | RAG Quality | Join retrieval similarity scores with eval scores in one query |

#### 5. Quick Start — code walkthrough
Three-step code block (tabbed or sequential):
```python
# 1. Install
pip install anysql

# 2. Wrap your client
from anysql.adapters.openai import WrappedOpenAI
client = WrappedOpenAI(db_path="anysql.db")

# 3. Query
db.query("SELECT model, AVG(cost_usd) FROM llm_responses GROUP BY model")
```

#### 6. Ecosystem badges
Row of logos/badges: OpenAI · Anthropic/Claude · LangChain · DuckDB · SQLite · PyArrow

#### 7. GitHub CTA banner
`"anySQL is open source. Star us on GitHub →"`
Dark card with cyan glow, GitHub link.

---

### Docs.jsx
- Getting started (install, first query)
- Architecture overview (the ASCII diagram from the README)
- Adapters section (OpenAI, Claude, Generic)
- Tracers section (AgentTracer, RAGTracer)
- Context decorator (`@anysql.context`)
- Links to Queries and Schema pages

### Queries.jsx
- Render the canonical SQL query library (from `docs/QUERIES.md` or inlined)
- Grouped by use case: UC1–UC5
- Syntax-highlighted code blocks per query

### Schema.jsx
- One section per table (6 tables)
- Table name, description, field list with types and nullability
- Badge showing which use cases each table supports

### Cli.jsx
- `anysql query "<sql>"` usage
- `anysql stats` usage
- Options/flags reference
- Example outputs

---

## Deployment

- `vite.config.js`: `base: './'` for GitHub Pages asset paths
- `CNAME`: `anysql.org`
- GitHub Actions workflow: push to `main` → build → deploy to `gh-pages` branch

---

## Success Criteria

1. Visitor can copy `pip install anysql` from the hero in one click
2. The cross-layer JOIN SQL example is visible above the fold on desktop
3. All 5 use cases are discoverable from the home page
4. Docs page has enough to get started without leaving the site
5. Site is consistent with opengpl.org visual identity
