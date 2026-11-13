# anySQL.org: Research Lab Restyle

**Date:** 2026-11-13
**Status:** Approved (wireframe A1–A3, `openastra.org/.superpowers/brainstorm/…/anysql-opengpl-wire.html`)

## Intent

Restyle anysql.org to match the redesigned openastra.org (the "Research Lab" look),
so the OpenAstra family of sites reads as one family. anySQL keeps its own accent
color, **green `#2F6B4F`**, where OpenAstra uses rust.

## Goals

- Same design system as openastra.org: paper `#F6F3EC`, card `#FFFDF8`, ink `#1B1B1B`,
  rules, Newsreader serif / Inter / JetBrains Mono, thick rule under the nav,
  dark code blocks, numbered index rows.
- Header: `anySQL` wordmark ("SQL" in accent) · "An OpenAstra framework ↗" ·
  Packages ▾ (SDK, Proxy, Server, UI) · Schema · Queries · CLI · Cite (`/#cite`) · GitHub ↗.
- Home is restructured per wireframe A1: hero with code sample → numbered list of
  the 4 packages → cross-layer JOIN → Why → 3-step quick start → 5 use cases →
  Cite (Zenodo DOI) → open-source CTA. Footer: "An OpenAstra framework ·
  IV. Observability".
- Package pages (SDK, Proxy, Server, UI) share one `PackageLayout`: breadcrumb,
  number, mono H1, status (available vX / coming soon), lede, sections.
- Docs pages (Schema, Queries, CLI) share a `DocsLayout` with a sticky table of
  contents on the left (desktop).
- Queries get a Copy button per query.
- Cite block: `Sadayamuthu, K. (2026). anySQL: SQL Analytics for AI Systems
  (v0.1.1) [Software]. Zenodo. https://doi.org/10.5281/zenodo.23980548`, with
  Copy and BibTeX buttons and a clipboard fallback that reveals and selects the text.

## Non-goals

- No new routes. All 8 keep their paths (`/`, `/sdk`, `/proxy`, `/server`, `/ui`,
  `/queries`, `/schema`, `/cli`, plus `*`).
- No content rewrites beyond the fixes listed below.

## Anti-goals

- Losing any existing reference content (schema fields, queries, CLI commands,
  proxy setup, IDE settings).
- Dark-theme leftovers (`bg-space`, `text-accent-cyan` …) anywhere.

## Content fixes (verified against the anySQL README)

- Adapter wrapping is `anysql.openai(db).wrap(client)` /
  `anysql.claude(db).wrap(client)`. The current site's `anysql.openai(openai.OpenAI())`
  is stale. Fix it on Home and SDK.
- GitHub links use `https://github.com/sadayamuthu/anySQL`.

## Approaches

1. **Shared primitives + layouts, pages keep their data (chosen).** Add
   `components/ui.jsx` (CodeBlock, Section, Eyebrow, Pill, Button, CopyButton),
   `PackageLayout`, `DocsLayout` and `Citation`. Each page keeps its data arrays and
   swaps markup. Small diffs, and content is safe.
2. Port OpenAstra's data-driven model. Overkill: anySQL is a docs site whose
   pages have different shapes.
3. Token swap only (remap old color names to new values). Fast, but it keeps
   the old layout, so it's not the new design.

## Testing

Add Vitest + Testing Library + jsdom (none today). Tests cover: Navbar links and
the Packages menu, Footer family line, Home sections (4 packages link to their
pages, use cases, cite DOI link), each package page H1 and status, Schema lists
all 6 tables, Queries copy buttons, CLI commands, and the Citation clipboard and
fallback behavior. Fix the broken `npm run lint` script (the `--ext` flag is
invalid with flat config). `npm test`, `npm run lint` and `npm run build` must
pass, and every route must have no horizontal overflow at 375px.
