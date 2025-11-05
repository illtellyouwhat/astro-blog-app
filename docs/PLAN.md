# PLAN

## Alignment Summary
- Blog mounts at `/blog` while existing Vite marketing SPA retains `/`.
- Deployment model: GitHub Pages (Model A) with canonical host `https://automationarchitech.com`.
- Astro blog keeps theme-agnostic content collections; astro-yi provides styling only.
- Reference file is available at `docs/astro_blog_pipeline_llm_reference_up_to_date.md`.

## Phase Outcomes
- [x] Phase 2 — Astro scaffold with MDX, sitemap, Tailwind baseline; build verified.
- [x] Phase 3 — Content collections (`posts`), authoring contract, hello-world seed post.
- [x] Phase 4 — astro-yi integration with theme adapters, tokens, assets.
- [x] Phase 5 — SEO head, canonical routing, JSON-LD, sitemap verification.
- [x] Phase 6 — GitHub Pages workflow and deployment playbook documented.
- [x] Phase 7 — Marketing site navigation now links to `/blog`.
- [x] Phase 8 — Local setup & test walkthrough published.
- [x] Phase 9 — Comments (Utterances) & analytics (Plausible) toggles shipped.
- [x] Phase 10 — Documentation finalized; summaries updated.

## Next Steps
- Establish repo secrets/variables (`SITE_URL`, Utterances, Plausible) before first deploy.
- Prepare production content and migrate any legacy posts into `src/content/posts/`.
