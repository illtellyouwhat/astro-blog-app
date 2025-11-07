# LOGIC

## Bootstrapping Flow
- `package.json` scripts call `astro dev` / `astro build`. Entry point is `astro.config.mjs`.
- `astro.config.mjs` reads `SITE_URL` (default `https://automationarchitech.com`) and optional `BASE_PATH`. It derives:
  - `canonicalHost = origin + repoBase` (path portion of `SITE_URL`).
  - `base`: if `BASE_PATH` set, use it; else `/` when `SITE_URL` has no path (local/apex), otherwise use the path portion (e.g., `/astro-blog-app`).
- Astro serves files under `src/pages`. Keeping `src/pages/blog/index.astro` means the public route is `/blog/` regardless of the base.

## Runtime Dependencies
- Theme constants are overridden in `src/theme/consts.ts` (import alias in `astro.config.mjs`).
- SEO head and other components rely on `site.baseUrl` but now prepend URLs with helper `withBase()` that reuses `base` and respects env overrides.

## Deployment
- GitHub Pages workflow (`.github/workflows/deploy.yml`) exports `SITE_URL` from repo variables; if the repo path is `/astro-blog-app`, `base` becomes `/astro-blog-app` so final URLs are `…/astro-blog-app/blog/`.
- For local dev, run `npm run dev -- --host 0.0.0.0 --port 4321`; no env required because default base is `/` and routes map to `/blog/` via the filesystem.
- Optional `BASE_PATH` may be set to simulate subpath hosting without touching file structure.

## Path Summary
- `src/pages/blog/index.astro` → `/blog/`
- `src/pages/blog/[slug].astro` → `/blog/<slug>/`
- Assets from `public/` or theme are prefixed via `withBase` so they resolve under GitHub Pages (`/astro-blog-app/...`) or root (`/...`) automatically.

