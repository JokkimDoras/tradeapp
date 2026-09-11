# TradeVault — AI Project Guide

This document is the visual, product, and technical reference for AI-assisted work in this repository. Read it before changing UI, adding a page, or introducing a component.

## Product

TradeVault is a trade journaling and performance-management application for Forex traders. It is not a broker or trading terminal. Its purpose is to help users log trades, review execution quality, identify patterns, and improve their process.

Core areas include account selection, dashboard metrics, trade history, analytics, calendar review, strategies, news, settings, and the daily Trade Journal.

## Stack and structure

- Client: React 19, TypeScript, Vite, Tailwind CSS v4, React Router, Recharts, Lucide React and React Icons.
- Server: Node.js, Express, Supabase PostgreSQL and Supabase Auth.
- Client source: `client/src/`
  - `pages/`: route-level views.
  - `component/`: reusable UI grouped by feature.
  - `context/` and `hooks/`: shared state and accessors.
  - `services/`: API calls.
  - `types/`: shared TypeScript types.
- Server source: `server/src/`
  - `routes/`, `controllers/`, `middleware/`, `services/`, and `config/`.

The protected application shell is `client/src/component/DashboardLayout.tsx`. It provides the sidebar, account state, and trade state. Pages inside that shell should use the shared `Navbar` and retain the dashboard layout conventions.

## Design direction

The design was inspired by Vercel: quiet, high-contrast, minimal, functional, and product-focused. It should feel like a precise trading workstation, not a colorful consumer finance app.

### Typography

- Default UI font: Tailwind `font-sans` (the app's native system sans stack).
- Metadata, labels, compact stats, table headers, breadcrumbs, and technical language: `font-mono`.
- Headings: use `font-semibold` or `font-bold`, tight tracking (`tracking-tight`) for page titles.
- Technical labels: use uppercase with `text-[10px]` or `text-[11px]`, `font-semibold`, and `tracking-widest` or `tracking-[0.2em]`.
- Body copy: normally `text-sm`; helper copy is `text-xs` and muted.
- Do not introduce a web font unless the whole app is intentionally being rebranded.

### Core colors

Use Tailwind zinc colors as the primary visual system. Avoid arbitrary colors for ordinary UI.

| Role | Preferred classes / color |
| --- | --- |
| Page canvas | `bg-black`, `#000000` |
| Main text | `text-white`, `text-zinc-100` |
| Strong surface | `bg-zinc-950`, `#050505` |
| Raised/selected surface | `bg-zinc-900` |
| Sidebar surface | `bg-[#121212]` |
| Standard border | `border-zinc-900` |
| Interactive/input border | `border-zinc-800` |
| Secondary text | `text-zinc-400` or `text-zinc-500` |
| Quiet/helper text | `text-zinc-600` or `text-zinc-700` |
| Positive P&L/status | `text-emerald-400`, subtle `emerald-500/20` border |
| Negative P&L/status | `text-rose-400` or `text-rose-500`, subtle `rose-500/20` border |
| Neutral/breakeven | `text-yellow-400` only when meaningful |

Use semantic emerald and rose only for performance, outcomes, or destructive feedback. Do not use gradients, rainbow charts, saturated accent fills, or large colored backgrounds.

### Surfaces and layout

- Use thin one-pixel zinc borders instead of heavy shadows or cards with large color fills.
- Default radius is compact: `rounded-md` for controls and `rounded-lg` for panels. Avoid oversized pill-shaped UI unless it is a tiny status tag.
- Typical page spacing: `px-6 py-8` or `p-6`; major vertical groups use `gap-6` to `gap-8`.
- Main content commonly uses `w-full max-w-7xl mx-auto`.
- Tables and dense data use mono labels and `divide-y divide-zinc-900`.
- Keep the UI responsive. Stack controls and panels on small screens, then introduce multi-column grids at `sm`/`lg` breakpoints.

### Interactions

- Buttons: `border-zinc-800 bg-zinc-950 text-zinc-400`, hover to `border-zinc-700 text-zinc-200` or `text-white`.
- Primary action: `bg-zinc-100 text-black`, hover to white. It is intentionally neutral, not brand-blue.
- Inputs: dark background, `border-zinc-800`, compact mono values where the data is technical, and `focus:border-zinc-600`.
- Use quick, subtle `transition`/`transition-all` effects. Avoid bouncy or decorative animation.
- Use icons sparingly at 14–17px and pair unfamiliar actions with labels or tooltips.

## UI implementation rules

1. Reuse `Navbar`, sidebar state, account state, and trade context rather than building replacements.
2. Start a page with `min-h-screen bg-black text-zinc-100 font-sans antialiased`.
3. Preserve existing routes and account-aware route patterns. Dashboard, History, Calendar, and Analytics include account IDs; the journal is currently `/journal` and derives the selected account from context.
4. Fetch account-scoped trades through `useTrade()` and `fetchTradesData(selectedAccount.id)` when the page needs them.
5. Use Tailwind classes directly, matching existing components. Keep component-specific styles local unless a genuine global token is needed.
6. Keep empty, loading, error, and no-account states intentional and consistent with the muted dark UI.
7. Prefer actual trade data over static dashboard placeholders. Clearly label derived or locally stored data.
8. Maintain accessibility: visible focus styling, meaningful button labels, label form fields, and ensure icon-only buttons have `aria-label`.

## Data and behaviour

- Authentication is handled through Supabase Auth.
- The selected account is persisted in local storage by `AccountContext`.
- `TradeContext` owns cached trades and exposes fetch, create, update, and delete operations.
- Trade journal reflection entries are currently intentionally stored locally per account and date using keys shaped like `trade-journal:<account-id>:<YYYY-MM-DD>`. Do not present them as server-synced unless a backend persistence feature is added.
- P&L values should remain neutral when unavailable. Positive/negative colors should appear only once a closed trade has a known result.

## Validation before handoff

For client changes, run from `client/`:

```bash
npm.cmd run build
```

On this Windows setup, `npm` may be blocked by PowerShell's execution policy; `npm.cmd` is the reliable command. Do not overwrite or revert unrelated changes in a dirty worktree.

