# SUMMARY_HIGH

## System Overview
- **Routing**: Marketing SPA (`architech-web-forge`) serves `/`; Astro blog (`astro-blog-app`) serves `/blog` with static output.
- **Content**: Markdown/MDX collections power posts; schema ensures canonical, hero, tags, and comment toggles remain theme-agnostic.
- **Presentation**: astro-yi theme supplies layout/components; brand tokens (`src/styles/tokens.css`) keep styling overrideable.
- **SEO & Metadata**: Central `SeoHead` handles canonical URLs, OG/Twitter, JSON-LD, Plausible analytics, and respects `SITE_URL` env.
- **Comments**: Utterances widget toggled via env + front matter, isolating comment system from theme internals.
- **Deployment**: GitHub Pages workflow builds and publishes `/blog` artifact; DNS points `blog.automationarchitech.com` CNAME to Pages. 

## Key Decisions
- Keep blog independent repo for reproducible builds; marketing repo only links via header.
- Use Astro content collections to decouple theme from data, enabling future theme swaps.
- Pin Node 20.x and package lockfile for deterministic CI/CD runs.
- Expose all external services (comments, analytics) through `PUBLIC_*` env vars for host-agnostic deploys.
