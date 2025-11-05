# SUMMARY_LOW

## File & Route Map
- `src/content/posts/*.{md,mdx}` → `/blog/{slug}/`
- `src/pages/blog/index.astro` → `/blog/`
- `src/pages/blog/[slug].astro` → static post routes via `getStaticPaths`
- `public/robots.txt` + sitemap integration produce `/blog/robots.txt` & `/blog/sitemap-index.xml`
- `architech-web-forge/src/components/Navigation.tsx` adds header link to `/blog/`

## Build & Deployment
- Astro config: `base="/blog"`, `trailingSlash="always"`, `output="static"`.
- `npm run build` outputs to `dist/`; GitHub Pages workflow uploads artifact.
- `SITE_URL` env ensures canonical + sitemap align with apex domain.
- `.nvmrc` pins Node 20; lockfile ensures reproducible installs.

## Cross-Repo Touchpoints
- Marketing site only references `/blog/` via anchor tag; no runtime dependency.
- Theme overrides live in `src/theme/consts.ts`, customizing astro-yi without forking.
- Comments/analytics controlled via env; operations team manages variables in repo settings.

## Residual Considerations
- Theme dependency warns on Astro 5 peer compatibility; harmless but track upstream updates.
- `astro check` requires optional install (`@astrojs/check`) if linting is desired.
