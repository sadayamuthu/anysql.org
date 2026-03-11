# anySQL Nav Restructure — Design Spec
**Date:** 2026-03-11
**Status:** Approved
**Scope:** Rename Docs→SDK, add Server/UI pages, Docs dropdown in navbar, update homepage product links

---

## 1. Overview

The current `/docs` route is SDK documentation and should be labelled SDK. A new Docs nav entry becomes a hover dropdown exposing the three reference pages (Schema, Queries, CLI). Server and UI get their own "coming soon" pages with details from the design doc.

---

## 2. File Changes

| File | Change |
|------|--------|
| `src/pages/Docs.jsx` → `src/pages/Sdk.jsx` | Rename only — content unchanged |
| `src/pages/Server.jsx` | New page — coming soon banner + server details |
| `src/pages/Ui.jsx` | New page — coming soon banner + UI details |
| `src/components/Navbar.jsx` | SDK link, Docs hover dropdown, Server + UI links |
| `src/App.jsx` | Add `/sdk`, `/server`, `/ui` routes; remove `/docs` route |
| `src/pages/Home.jsx` | SDK card → `/sdk`; Server card → `/server`; UI card → `/ui` |

---

## 3. Navbar

**Nav order:** `SDK · Proxy · Server · UI · Docs ▾ · GitHub ↗`

**Docs dropdown** (hover):
- Implemented with Tailwind `group` / `group-hover:block` — no JS state
- Dropdown panel: `absolute bg-surface border border-subtle rounded-lg` positioned below the Docs label
- Links: Schema (`/schema`), Queries (`/queries`), CLI (`/cli`)
- Active state: "Docs" label shows cyan when `pathname` is `/schema`, `/queries`, or `/cli`
- "Docs" label includes a `▾` chevron

---

## 4. Server Page (`/server`)

Sections in order:
1. **Coming soon banner** — muted badge + "This package is not yet released" note
2. **What is anysql-server?** — REST API server for querying anySQL data over HTTP. PyPI: `anysql-server`, import: `anysql_server`
3. **Planned capabilities** — HTTP endpoints to query DuckDB data from any language or tool

Pattern: same `Section` / `CodeBlock` helpers as `Proxy.jsx` and `Docs.jsx`.

---

## 5. UI Page (`/ui`)

Sections in order:
1. **Coming soon banner** — same muted treatment as Server page
2. **What is anysql-ui?** — Monaco SQL editor + pre-built dashboards at `localhost:4243`. Part of Phase 4 of the proxy roadmap.
3. **Planned capabilities** — browser-based SQL editor, cost/latency/usage dashboards, no config required

---

## 6. Homepage Products Grid

Update `PRODUCTS` array in `Home.jsx`:
- `anysql-sdk` card: `to: '/sdk'` (was `/docs`)
- `anysql-server` card: `to: '/server'` (was `null`)
- `anysql-ui` card: `to: '/ui'` (was `null`)

All 4 cards become clickable. Coming soon visual treatment (muted badge, `opacity-60`) unchanged.
