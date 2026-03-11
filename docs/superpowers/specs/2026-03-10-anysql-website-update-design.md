# anySQL Website Update — Design Spec
**Date:** 2026-03-10
**Status:** Approved
**Scope:** Reflect monorepo + anysql-proxy in the website (Approach A — surgical updates)

---

## 1. Overview

The develop branch introduced a monorepo restructure and a new `anysql-proxy` package. The website needs to reflect the 4-package platform (sdk, proxy, server, ui) without disrupting the existing narrative.

**Approach:** Minimal surgical updates — add a products grid to the homepage, add a dedicated `/proxy` page, update nav and routing, and update Docs code samples to the current API style.

---

## 2. File Changes

| File | Change |
|------|--------|
| `src/pages/Home.jsx` | Add `ProductsSection` between Hero and JoinSection; update Quick Start code |
| `src/pages/Proxy.jsx` | New page — install, IDE setup, CLI reference, schema |
| `src/components/Navbar.jsx` | Add "Proxy" link between Docs and Queries |
| `src/App.jsx` | Add `/proxy` route and Proxy import |
| `src/pages/Docs.jsx` | Update adapter imports to current API style |

---

## 3. Homepage — ProductsSection

**Placement:** Between Hero and JoinSection.

**Title:** "The anySQL platform"

**Layout:** 2×2 grid (4-col on wide screens), one card per package.

| Card | Badge | Description | Link |
|------|-------|-------------|------|
| `anysql-sdk` | `available` (cyan) | SQL analytics for LLM responses, agent traces, RAG pipelines. `pip install anysql-sdk` | `/docs` |
| `anysql-proxy` | `available` (cyan) | Local IDE LLM proxy — intercept and query your AI coding assistant usage. `pip install anysql-proxy` | `/proxy` |
| `anysql-server` | `coming soon` (muted) | REST API server for querying anySQL data over HTTP | no link |
| `anysql-ui` | `coming soon` (muted) | Monaco SQL editor + pre-built dashboards at `localhost:4243` | no link |

**Quick Start update:** Replace `WrappedOpenAI(db_path=...)` style with current README API:
```python
db = anysql.init()
client = anysql.openai(openai_client)   # or anysql.claude(anthropic_client)
```

---

## 4. Proxy Page (`/proxy`)

Sections in order:

1. **Header** — title + one-liner
2. **Install** — `pip install anysql-proxy`
3. **How it works** — intercept flow: `IDE → proxy (localhost:4242) → provider → IDE`, non-blocking log to `~/.anysql/ide.duckdb`
4. **IDE Setup** — per-IDE config + `anysql-proxy setup <ide>` commands for Cursor, Claude Code, Windsurf, VS Code
5. **CLI Reference** — table: `start`, `stop`, `status`, `setup <ide>`, `keys`
6. **Schema** — `llm_responses` and `ide_context` tables with columns

---

## 5. Navbar

Add `{ label: 'Proxy', to: '/proxy' }` between Docs and Queries:

```
anySQL  |  Docs  Proxy  Queries  Schema  CLI  |  GitHub ↗
```

---

## 6. Docs Page Updates

Replace old adapter style:
```python
# OLD
from anysql.adapters.openai import WrappedOpenAI
client = WrappedOpenAI(db_path="anysql.db")
```

With current API:
```python
# NEW
import anysql
db = anysql.init()
client = anysql.openai(openai_client)
```

Same update for Claude adapter section.
