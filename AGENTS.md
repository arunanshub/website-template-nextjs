<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Rendering and navigation (Next 16.4, `cacheComponents` + `partialPrefetching`)

Verify any claim here under `next build && next start`; `next dev` renders everything on demand and hides the difference.

- Navigation stages: a default `<Link>` loads the route's App Shell (one per route, shared by every slug, so it never holds per-URL content); `<Link prefetch={true}>` adds that URL's content; the click renders the rest.
- `params`/`searchParams` must be read inside `<Suspense>`, even when `generateStaticParams` lists every value; otherwise dev reports "URL data outside `<Suspense>`" and client navigations block. `export const instant = false` only silences that check (dev-only); it changes nothing at runtime.
- Put `'use cache'` on the data function (`load(slug)`), never on a page or a component that contains `<Suspense>`: a cached tree resolves as one unit, so its fallback never streams.
- `ensureStatic` decides what an unlisted param gets on its first request:
  - unset / `'shell'` / `'prefetch'`: fallback HTML at once, content streams in the same response, then cached. Unknown param → 200 + `noindex` (the shell has already gone out).
  - `'navigation'`: no fallback, waits for the full render. Unknown param → real 404. The build fails on any uncached async work (fetch, `setTimeout`, `connection()`, `cookies()`, server `searchParams`, `cacheLife` under 5 min expire), inside `<Suspense>` too.
  - `'shell'` vs `'prefetch'` only differ for `prefetch={true}` links: `'prefetch'` guarantees those prefetches are static too. Neither adds build validation.
- Listed params are prerendered in full under every level; a fallback seen on them comes from a client navigation (the App Shell), not the HTML.
- `prefetch()` / `navigation()` (`next/cache`) defer one subtree in a `<Suspense>`: `prefetch()` keeps it out of the App Shell, `navigation()` also out of per-link prefetches. Prerenders still include the content. `ensureStatic = 'shell'` / `'prefetch'` apply the same boundary route-wide.
- `io()` (`next/cache`) before `Date.now()`, `Math.random()`, `crypto.randomUUID()` or sync DB reads: suspends during prerender, no-op inside `'use cache'`, works in client components via `use(io())`, allowed under `'navigation'`. Prefer it to `connection()` (`next/server`), which stops prerendering entirely and fails `'navigation'`.
- `<Link prefetch={true}>` into a fully static page is served from the static cache (cheap); into a page with runtime data, it is a server render per visible link, so prefetch on hover, focus or touch instead (`prefetch={intent ? true : 'auto'}`).
